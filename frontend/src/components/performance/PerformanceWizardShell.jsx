import "../../css/performance-wizard.css";
import StepProgress from "./StepProgress";

const PerformanceWizardShell = ({
  eyebrow = "Performance Wizard",
  title,
  description,
  currentStep,
  stepIndex = 0,
  totalSteps = 1,
  progress = 0,
  steps = [],
  error = "",
  isSaving = false,
  actions = null,
  children,
}) => {
  return (
    <section className="performance-wizard-shell">
      <div className="performance-wizard-shell__backdrop" aria-hidden="true" />

      <div className="performance-wizard-shell__frame">
        <aside className="performance-wizard-shell__sidebar">
          <p className="performance-wizard-shell__eyebrow">{eyebrow}</p>
          {title ? <h1 className="performance-wizard-shell__title">{title}</h1> : null}
          {description ? <p className="performance-wizard-shell__description">{description}</p> : null}

          <StepProgress
            currentStep={currentStep}
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            progress={progress}
            steps={steps}
          />
        </aside>

        <div className="performance-wizard-shell__panel">
          {error ? (
            <div className="performance-wizard-shell__alert" role="alert">
              {error}
            </div>
          ) : null}

          <div className="performance-wizard-shell__content">{children}</div>

          {actions ? (
            <div className="performance-wizard-shell__actions">
              {isSaving ? <span className="performance-wizard-shell__saving">Saving progress...</span> : null}
              <div className="performance-wizard-shell__actions-inner">{actions}</div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PerformanceWizardShell;
