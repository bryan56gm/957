import { MinusIcon, PlusIcon } from "./Icons";

export function Stepper({ value, onChange, min = 0, max = 20, small = false }) {
  return (
    <div className={`stepper ${small ? "sm" : ""}`}>
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="−" disabled={value <= min && min > 0}><MinusIcon /></button>
      <span>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} aria-label="+" disabled={value >= max}><PlusIcon /></button>
    </div>
  );
}
