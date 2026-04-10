const PerformanceWelcomeStep = ({ onStart }) => {
  return (
    <div className="performance-step performance-step--welcome">
      <div className="performance-step__hero-copy">
        <p className="performance-step__eyebrow">Performance capture</p>
        <h2 className="performance-step__title">Build a clean performance record before analysis begins.</h2>
        <p className="performance-step__description">
          Walk through the essentials once. Role, session context, key stats, focus area, and video all stay in one
          focused flow built for quick, confident setup.
        </p>
      </div>

      <div className="performance-welcome-step__grid">
        <div className="performance-surface-card">
          <p className="performance-surface-card__label">What you will add</p>
          <ul className="performance-checklist">
            <li>Role and session framing</li>
            <li>Structured batting or bowling details</li>
            <li>Coaching focus area and video upload</li>
          </ul>
        </div>

        <div className="performance-surface-card performance-surface-card--accent">
          <p className="performance-surface-card__label">Why this helps</p>
          <p className="performance-surface-card__copy">
            A guided setup keeps every session consistent, so your analysis and visual dashboards can rely on cleaner
            input data.
          </p>
          <button type="button" className="performance-primary-button" onClick={onStart}>
            Start Performance Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceWelcomeStep;
