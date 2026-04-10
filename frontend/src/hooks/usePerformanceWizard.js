import { useMemo, useState } from "react";

const STEP_KEYS = ["welcome", "role", "session", "details", "goal", "upload"];

const isMissingValue = (value) => value === "" || value === null || value === undefined;

export function getStepErrors(stepKey, draft) {
  if (stepKey === "role" && isMissingValue(draft.role)) return { role: "Select a role to continue." };
  if (stepKey === "session" && isMissingValue(draft.session_type)) {
    return { session_type: "Select a session type to continue." };
  }
  if (stepKey === "details") {
    const errors = {};
    if (isMissingValue(draft.date)) errors.date = "Date is required.";
    if (draft.session_type === "match" && isMissingValue(draft.opponent)) {
      errors.opponent = "Opponent is required.";
    }
    if (draft.session_type === "match" && isMissingValue(draft.venue)) {
      errors.venue = "Venue is required.";
    }
    if (draft.role !== "bowler" && isMissingValue(draft.runs)) errors.runs = "Runs are required.";
    if (draft.role !== "bowler" && isMissingValue(draft.balls)) errors.balls = "Balls are required.";
    if (draft.role !== "batter" && isMissingValue(draft.overs)) errors.overs = "Overs are required.";
    if (draft.role !== "batter" && isMissingValue(draft.wickets)) errors.wickets = "Wickets are required.";
    return errors;
  }
  if (stepKey === "goal" && isMissingValue(draft.improvement_area)) {
    return { improvement_area: "Add a focus area to continue." };
  }
  return {};
}

export function usePerformanceWizard() {
  const [index, setIndex] = useState(0);

  const steps = useMemo(
    () =>
      STEP_KEYS.map((key, stepIndex) => ({
        key,
        index: stepIndex,
        progress: stepIndex === 0 ? 0 : stepIndex / (STEP_KEYS.length - 1),
      })),
    [],
  );
  const roleStepIndex = steps.findIndex((step) => step.key === "role");

  const currentStep = steps[index];

  return {
    steps,
    currentStep,
    index,
    start() {
      setIndex(roleStepIndex >= 0 ? roleStepIndex : 0);
    },
    goNext() {
      setIndex((current) => Math.min(current + 1, steps.length - 1));
    },
    goBack() {
      setIndex((current) => Math.max(current - 1, 0));
    },
    goTo(stepKey) {
      const nextIndex = steps.findIndex((step) => step.key === stepKey);
      if (nextIndex >= 0) {
        setIndex(nextIndex);
      }
    },
  };
}
