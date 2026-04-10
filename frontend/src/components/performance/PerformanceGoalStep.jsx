import SelectionCard from "./SelectionCard";

const GOAL_OPTIONS = [
  {
    value: "batting",
    title: "Batting Goal",
    description: "Use this when the next review should prioritize batting execution.",
  },
  {
    value: "bowling",
    title: "Bowling Goal",
    description: "Choose this when the coaching focus is tied to bowling outcomes.",
  },
  {
    value: "fielding",
    title: "Fielding Goal",
    description: "Useful when the session review should emphasise movement and catching standards.",
  },
];

const PerformanceGoalStep = ({ draft, errors = {}, onChange }) => {
  const improvementAreaErrorId = errors.improvement_area ? "performance-goal-improvement-area-error" : undefined;

  return (
    <div className="performance-step">
      <div className="performance-step__hero-copy">
        <p className="performance-step__eyebrow">Step 4</p>
        <h2 className="performance-step__title">Set the coaching focus for this performance.</h2>
        <p className="performance-step__description">
          The goal step keeps the review intentional by pairing one focus type with a clear improvement area.
        </p>
      </div>

      <div className="performance-form-stack">
        <section className="performance-form-section">
          <div className="performance-form-section__heading">
            <h3>Goal type</h3>
            <p>Select the discipline that should shape the next round of analysis.</p>
          </div>

          <fieldset className="performance-choice-group">
            <legend className="performance-choice-group__legend">Goal discipline</legend>
            <div className="performance-selection-grid">
              {GOAL_OPTIONS.map((option) => (
                <SelectionCard
                  key={option.value}
                  id={`performance-goal-type-${option.value}`}
                  name="performance-goal-type"
                  value={option.value}
                  semantics="radio"
                  title={option.title}
                  description={option.description}
                  isSelected={draft.goal_type === option.value}
                  onSelect={() => onChange("goal_type", option.value)}
                />
              ))}
            </div>
          </fieldset>
        </section>

        <section className="performance-form-section">
          <div className="performance-form-section__heading">
            <h3>Improvement area</h3>
            <p>Be specific enough that a coach or future you can understand the target immediately.</p>
          </div>

          <label className="performance-field">
            <span className="performance-field__label">Focus area</span>
            <textarea
              id="performance-goal-improvement-area"
              name="improvement_area"
              className={`performance-input performance-input--textarea${
                errors.improvement_area ? " has-error" : ""
              }`}
              aria-invalid={Boolean(errors.improvement_area)}
              aria-describedby={improvementAreaErrorId}
              rows="5"
              placeholder="e.g. Sharpen back-foot response against short bowling and hold shape through contact."
              value={draft.improvement_area ?? ""}
              onChange={(event) => onChange("improvement_area", event.target.value)}
            />
            {errors.improvement_area ? (
              <p id={improvementAreaErrorId} className="performance-field__error" role="alert">
                {errors.improvement_area}
              </p>
            ) : null}
          </label>
        </section>
      </div>
    </div>
  );
};

export default PerformanceGoalStep;
