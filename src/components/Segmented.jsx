// Pill switch for a small set of options: [{ id, label, sub? }].
export function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented" role="radiogroup">
      {options.map((option) => (
        <button key={option.id} role="radio" aria-checked={option.id === value} className={option.id === value ? "on" : ""} onClick={() => onChange(option.id)}>
          <span>{option.label}</span>
          {option.sub && <small>{option.sub}</small>}
        </button>
      ))}
    </div>
  );
}
