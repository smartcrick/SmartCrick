const renderFieldError = (message, errorId) => {
  if (!message) return null;
  return (
    <p id={errorId} className="performance-field__error" role="alert">
      {message}
    </p>
  );
};

const getFieldAccessibilityProps = (fieldName, errors) => {
  const hasError = Boolean(errors[fieldName]);

  return {
    id: `performance-details-${fieldName}`,
    name: fieldName,
    "aria-invalid": hasError,
    "aria-describedby": hasError ? `performance-details-${fieldName}-error` : undefined,
  };
};

const PerformanceDetailsStep = ({ draft, errors = {}, onChange }) => {
  const showMatchFields = draft.session_type === "match";
  const showBattingFields = draft.role !== "bowler";
  const showBowlingFields = draft.role !== "batter";

  const dateFieldProps = getFieldAccessibilityProps("date", errors);
  const opponentFieldProps = getFieldAccessibilityProps("opponent", errors);
  const venueFieldProps = getFieldAccessibilityProps("venue", errors);
  const runsFieldProps = getFieldAccessibilityProps("runs", errors);
  const ballsFieldProps = getFieldAccessibilityProps("balls", errors);
  const oversFieldProps = getFieldAccessibilityProps("overs", errors);
  const wicketsFieldProps = getFieldAccessibilityProps("wickets", errors);

  return (
    <div className="performance-step">
      <div className="performance-step__hero-copy">
        <p className="performance-step__eyebrow">Step 3</p>
        <h2 className="performance-step__title">Add the session details with a clean, grouped form.</h2>
        <p className="performance-step__description">
          The field groups adapt to the selected role and session type while keeping the layout stable.
        </p>
      </div>

      <div className="performance-form-stack">
        <section className="performance-form-section">
          <div className="performance-form-section__heading">
            <h3>Session details</h3>
            <p>Anchor the performance with the date and context fields needed for review.</p>
          </div>

          <div className="performance-form-grid">
            <label className="performance-field">
              <span className="performance-field__label">Date</span>
              <input
                {...dateFieldProps}
                className={`performance-input${errors.date ? " has-error" : ""}`}
                type="date"
                value={draft.date ?? ""}
                onChange={(event) => onChange("date", event.target.value)}
              />
              {renderFieldError(errors.date, "performance-details-date-error")}
            </label>

            {showMatchFields ? (
              <>
                <label className="performance-field">
                  <span className="performance-field__label">Opponent</span>
                  <input
                    {...opponentFieldProps}
                    className={`performance-input${errors.opponent ? " has-error" : ""}`}
                    type="text"
                    placeholder="e.g. Lahore Lions"
                    value={draft.opponent ?? ""}
                    onChange={(event) => onChange("opponent", event.target.value)}
                  />
                  {renderFieldError(errors.opponent, "performance-details-opponent-error")}
                </label>

                <label className="performance-field">
                  <span className="performance-field__label">Venue</span>
                  <input
                    {...venueFieldProps}
                    className={`performance-input${errors.venue ? " has-error" : ""}`}
                    type="text"
                    placeholder="e.g. National Stadium"
                    value={draft.venue ?? ""}
                    onChange={(event) => onChange("venue", event.target.value)}
                  />
                  {renderFieldError(errors.venue, "performance-details-venue-error")}
                </label>
              </>
            ) : null}
          </div>
        </section>

        {showBattingFields ? (
          <section className="performance-form-section">
            <div className="performance-form-section__heading">
              <h3>Batting output</h3>
              <p>Use simple counting stats so the captured record stays easy to review and save.</p>
            </div>

            <div className="performance-form-grid performance-form-grid--compact">
              <label className="performance-field">
                <span className="performance-field__label">Runs</span>
                <input
                  {...runsFieldProps}
                  className={`performance-input${errors.runs ? " has-error" : ""}`}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="0"
                  value={draft.runs ?? ""}
                  onChange={(event) => onChange("runs", event.target.value)}
                />
                {renderFieldError(errors.runs, "performance-details-runs-error")}
              </label>

              <label className="performance-field">
                <span className="performance-field__label">Balls</span>
                <input
                  {...ballsFieldProps}
                  className={`performance-input${errors.balls ? " has-error" : ""}`}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="0"
                  value={draft.balls ?? ""}
                  onChange={(event) => onChange("balls", event.target.value)}
                />
                {renderFieldError(errors.balls, "performance-details-balls-error")}
              </label>
            </div>
          </section>
        ) : null}

        {showBowlingFields ? (
          <section className="performance-form-section">
            <div className="performance-form-section__heading">
              <h3>Bowling output</h3>
              <p>Capture workload and wicket impact without forcing extra complexity into the step.</p>
            </div>

            <div className="performance-form-grid performance-form-grid--compact">
              <label className="performance-field">
                <span className="performance-field__label">Overs</span>
                <input
                  {...oversFieldProps}
                  className={`performance-input${errors.overs ? " has-error" : ""}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                  value={draft.overs ?? ""}
                  onChange={(event) => onChange("overs", event.target.value)}
                />
                {renderFieldError(errors.overs, "performance-details-overs-error")}
              </label>

              <label className="performance-field">
                <span className="performance-field__label">Wickets</span>
                <input
                  {...wicketsFieldProps}
                  className={`performance-input${errors.wickets ? " has-error" : ""}`}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="0"
                  value={draft.wickets ?? ""}
                  onChange={(event) => onChange("wickets", event.target.value)}
                />
                {renderFieldError(errors.wickets, "performance-details-wickets-error")}
              </label>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default PerformanceDetailsStep;
