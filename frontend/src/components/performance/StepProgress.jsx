const clampProgress = (progress) => {
  if (typeof progress !== "number" || Number.isNaN(progress)) return 0;
  return Math.min(Math.max(progress, 0), 1);
};

const toDisplayStep = (step) => {
  if (!step) return "";
  if (typeof step === "string") return step;
  return step.label ?? step.title ?? step.key ?? "";
};

const StepProgress = ({ currentStep, stepIndex = 0, totalSteps = 1, progress = 0, steps = [] }) => {
  const normalizedProgress = clampProgress(progress);
  const currentDisplay = toDisplayStep(currentStep);

  return (
    <div className="performance-step-progress" aria-label="Wizard progress">
      <div className="performance-step-progress__summary">
        <div>
          <p className="performance-step-progress__eyebrow">Progress</p>
          <h2 className="performance-step-progress__title">
            Step {Math.min(stepIndex + 1, totalSteps)} of {totalSteps}
          </h2>
        </div>
        {currentDisplay ? <p className="performance-step-progress__current">{currentDisplay}</p> : null}
      </div>

      <div
        className="performance-step-progress__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(normalizedProgress * 100)}
      >
        <span className="performance-step-progress__fill" style={{ width: `${normalizedProgress * 100}%` }} />
      </div>

      {steps.length ? (
        <div className="performance-step-progress__steps">
          {steps.map((step, index) => {
            const label = toDisplayStep(step);
            const isActive = index === stepIndex;
            const isComplete = index < stepIndex;

            return (
              <div
                key={step.key ?? label ?? index}
                className={`performance-step-progress__step${isActive ? " is-active" : ""}${
                  isComplete ? " is-complete" : ""
                }`}
              >
                <span className="performance-step-progress__step-index">{index + 1}</span>
                <span className="performance-step-progress__step-label">{label}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default StepProgress;
