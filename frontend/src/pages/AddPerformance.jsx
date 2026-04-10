import { useMemo, useState } from "react";

import PerformanceDetailsStep from "../components/performance/PerformanceDetailsStep";
import PerformanceGoalStep from "../components/performance/PerformanceGoalStep";
import PerformanceRoleStep from "../components/performance/PerformanceRoleStep";
import PerformanceSessionStep from "../components/performance/PerformanceSessionStep";
import PerformanceUploadStep from "../components/performance/PerformanceUploadStep";
import PerformanceWelcomeStep from "../components/performance/PerformanceWelcomeStep";
import PerformanceWizardShell from "../components/performance/PerformanceWizardShell";
import { usePerformanceDraft } from "../hooks/usePerformanceDraft";
import { usePerformancePersistence } from "../hooks/usePerformancePersistence";
import { getStepErrors, usePerformanceWizard } from "../hooks/usePerformanceWizard";

const STEP_COPY = {
  welcome: {
    sidebarTitle: "Build each performance record through one guided flow.",
    sidebarDescription:
      "Start with the welcome state, move through the structured steps, and save context before video upload.",
    progressLabel: "Welcome",
    primaryActionLabel: "",
  },
  role: {
    sidebarTitle: "Set the role first so the stat groups stay relevant.",
    sidebarDescription: "The wizard narrows the details form based on the discipline selected here.",
    progressLabel: "Role",
    primaryActionLabel: "Continue",
  },
  session: {
    sidebarTitle: "Capture the session framing before the detailed stats.",
    sidebarDescription: "Match sessions include extra context fields. Practice sessions stay lighter.",
    progressLabel: "Session",
    primaryActionLabel: "Continue",
  },
  details: {
    sidebarTitle: "Save the structured performance details before moving to goals.",
    sidebarDescription: "This step creates or updates the performance record and returns the performance ID.",
    progressLabel: "Details",
    primaryActionLabel: "Save Details",
  },
  goal: {
    sidebarTitle: "Add the coaching focus that should guide the next review.",
    sidebarDescription: "The goal save is linked to the performance record created in the details step.",
    progressLabel: "Goal",
    primaryActionLabel: "Save Goal",
  },
  upload: {
    sidebarTitle: "Finish the record by uploading the supporting session clip.",
    sidebarDescription: "File selection stays in the step content while the shell action area handles the upload.",
    progressLabel: "Upload",
    primaryActionLabel: "Upload Video",
  },
};

const buildPerformancePayload = (draft) => ({
  role: draft.role,
  session_type: draft.session_type,
  date: draft.date,
  opponent: draft.session_type === "match" ? draft.opponent : "",
  venue: draft.session_type === "match" ? draft.venue : "",
  runs: draft.role !== "bowler" ? draft.runs : "",
  balls: draft.role !== "bowler" ? draft.balls : "",
  overs: draft.role !== "batter" ? draft.overs : "",
  wickets: draft.role !== "batter" ? draft.wickets : "",
});

const buildGoalPayload = (draft) => ({
  goal_type: draft.goal_type,
  improvement_area: draft.improvement_area,
});

const AddPerformance = () => {
  const { draft, updateField, patchDraft, resetDraft } = usePerformanceDraft();
  const wizard = usePerformanceWizard();
  const { currentStep, steps, index, start, goNext, goBack } = wizard;
  const { savePerformanceDetails, saveGoal, uploadVideo, isSaving, error, clearError } = usePerformancePersistence();
  const [performanceId, setPerformanceId] = useState(null);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const stepConfig = STEP_COPY[currentStep.key] ?? STEP_COPY.welcome;
  const derivedErrors = useMemo(() => getStepErrors(currentStep.key, draft), [currentStep.key, draft]);
  const errors = showValidationErrors ? derivedErrors : {};
  const displaySteps = useMemo(
    () =>
      steps.map((step) => ({
        ...step,
        label: STEP_COPY[step.key]?.progressLabel ?? step.key,
      })),
    [steps],
  );

  const resetTransientState = () => {
    setShowValidationErrors(false);
    clearError();
  };

  const resetWizardRun = () => {
    resetDraft();
    setPerformanceId(null);
    setIsUploadComplete(false);
    resetTransientState();
  };

  const handleFieldChange = (name, value) => {
    updateField(name, value);
    clearError();
  };

  const handleStart = () => {
    resetWizardRun();
    start();
  };

  const handleBack = () => {
    if (currentStep.key === "role") {
      resetWizardRun();
    } else {
      resetTransientState();
    }

    goBack();
  };

  const handleContinue = async () => {
    const stepErrors = getStepErrors(currentStep.key, draft);

    if (Object.keys(stepErrors).length > 0) {
      setShowValidationErrors(true);
      clearError();
      return;
    }

    try {
      if (currentStep.key === "details") {
        const nextPerformanceId = await savePerformanceDetails(buildPerformancePayload(draft), performanceId);
        setPerformanceId(nextPerformanceId);
      }

      if (currentStep.key === "goal") {
        await saveGoal(buildGoalPayload(draft), performanceId);
      }
    } catch {
      setShowValidationErrors(false);
      return;
    }

    resetTransientState();
    goNext();
  };

  const handleUpload = async () => {
    if (!draft.video || !performanceId || isUploadComplete) {
      return;
    }

    try {
      await uploadVideo(performanceId, draft.video);
    } catch {
      setIsUploadComplete(false);
      setShowValidationErrors(false);
      return;
    }

    setIsUploadComplete(true);
    setShowValidationErrors(false);
  };

  const renderCurrentStep = () => {
    if (currentStep.key === "welcome") {
      return <PerformanceWelcomeStep onStart={handleStart} />;
    }

    if (currentStep.key === "role") {
      return <PerformanceRoleStep value={draft.role} onSelect={(value) => handleFieldChange("role", value)} />;
    }

    if (currentStep.key === "session") {
      return (
        <PerformanceSessionStep
          value={draft.session_type}
          onSelect={(value) => handleFieldChange("session_type", value)}
        />
      );
    }

    if (currentStep.key === "details") {
      return <PerformanceDetailsStep draft={draft} errors={errors} onChange={handleFieldChange} />;
    }

    if (currentStep.key === "goal") {
      return <PerformanceGoalStep draft={draft} errors={errors} onChange={handleFieldChange} />;
    }

    return (
      <PerformanceUploadStep
        selectedFile={draft.video}
        onFileChange={(file) => {
          patchDraft({ video: file });
          setIsUploadComplete(false);
          clearError();
        }}
        isComplete={isUploadComplete}
      />
    );
  };

  const shellActions =
    currentStep.key === "welcome" ? null : (
      <>
        <button type="button" className="performance-secondary-button" onClick={handleBack} disabled={isSaving}>
          Back
        </button>
        <button
          type="button"
          className="performance-primary-button"
          onClick={currentStep.key === "upload" ? handleUpload : handleContinue}
          disabled={
            isSaving ||
            (currentStep.key === "upload" ? !draft.video || !performanceId || isUploadComplete : false)
          }
        >
          {currentStep.key === "upload" && isSaving
            ? "Uploading..."
            : currentStep.key === "upload" && isUploadComplete
              ? "Upload Complete"
              : stepConfig.primaryActionLabel}
        </button>
      </>
    );

  return (
    <PerformanceWizardShell
      title={stepConfig.sidebarTitle}
      description={stepConfig.sidebarDescription}
      currentStep={stepConfig.progressLabel}
      stepIndex={index}
      totalSteps={displaySteps.length}
      progress={currentStep.progress}
      steps={displaySteps}
      error={error}
      isSaving={isSaving}
      actions={shellActions}
    >
      {renderCurrentStep()}
    </PerformanceWizardShell>
  );
};

export default AddPerformance;
