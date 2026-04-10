const SelectionCard = ({
  title,
  description,
  meta,
  badge,
  isSelected = false,
  onSelect,
  disabled = false,
  id,
  name,
  value,
  semantics = "button",
}) => {
  const isRadio = semantics === "radio";

  return (
    <label className={`performance-selection-card${isSelected ? " is-selected" : ""}${disabled ? " is-disabled" : ""}`}>
      {isRadio ? (
        <input
          className="performance-selection-card__input"
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isSelected}
          onChange={onSelect}
          disabled={disabled}
        />
      ) : null}

      <span className="performance-selection-card__body">
        <span className="performance-selection-card__header">
          <span className="performance-selection-card__title-wrap">
            <span className="performance-selection-card__title">{title}</span>
            {badge ? <span className="performance-selection-card__badge">{badge}</span> : null}
          </span>
          <span className="performance-selection-card__indicator" aria-hidden="true" />
        </span>

        {description ? <span className="performance-selection-card__description">{description}</span> : null}
        {meta ? <span className="performance-selection-card__meta">{meta}</span> : null}
      </span>
    </label>
  );
};

export default SelectionCard;
