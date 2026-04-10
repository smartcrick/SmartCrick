import SelectionCard from "./SelectionCard";

const ROLE_OPTIONS = [
  {
    value: "batter",
    title: "Batter",
    description: "Track scoring output, strike rotation, and workload through the innings.",
    meta: "Runs, balls, and situational context",
  },
  {
    value: "bowler",
    title: "Bowler",
    description: "Capture overs, wickets, and the match conditions around your spell.",
    meta: "Overs, wickets, and venue context",
  },
  {
    value: "allrounder",
    title: "All-Rounder",
    description: "Record both batting and bowling contributions in the same session.",
    meta: "Balanced capture across both disciplines",
  },
];

const PerformanceRoleStep = ({ value, onSelect }) => {
  return (
    <div className="performance-step">
      <div className="performance-step__hero-copy">
        <p className="performance-step__eyebrow">Step 1</p>
        <h2 className="performance-step__title">Choose the role that best fits this performance.</h2>
        <p className="performance-step__description">
          The role selection controls which stat groups appear in the details step.
        </p>
      </div>

      <fieldset className="performance-choice-group">
        <legend className="performance-choice-group__legend">Playing role</legend>
        <div className="performance-selection-grid">
          {ROLE_OPTIONS.map((option) => (
            <SelectionCard
              key={option.value}
              id={`performance-role-${option.value}`}
              name="performance-role"
              value={option.value}
              semantics="radio"
              title={option.title}
              description={option.description}
              meta={option.meta}
              isSelected={value === option.value}
              onSelect={() => onSelect(option.value)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default PerformanceRoleStep;
