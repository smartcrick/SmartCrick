import SelectionCard from "./SelectionCard";

const SESSION_OPTIONS = [
  {
    value: "match",
    title: "Match",
    description: "Use the full match context, including opponent and venue details.",
    meta: "Best for league, tournament, and fixture analysis",
  },
  {
    value: "practice",
    title: "Practice",
    description: "Keep the setup lighter while still capturing the session output and focus.",
    meta: "Best for nets, drills, and isolated skill work",
  },
];

const PerformanceSessionStep = ({ value, onSelect }) => {
  return (
    <div className="performance-step">
      <div className="performance-step__hero-copy">
        <p className="performance-step__eyebrow">Step 2</p>
        <h2 className="performance-step__title">Frame the session before entering the numbers.</h2>
        <p className="performance-step__description">
          Match sessions reveal extra context fields. Practice keeps the form focused and fast.
        </p>
      </div>

      <fieldset className="performance-choice-group">
        <legend className="performance-choice-group__legend">Session type</legend>
        <div className="performance-selection-grid performance-selection-grid--two-up">
          {SESSION_OPTIONS.map((option) => (
            <SelectionCard
              key={option.value}
              id={`performance-session-${option.value}`}
              name="performance-session"
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

export default PerformanceSessionStep;
