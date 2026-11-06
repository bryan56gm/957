import { MoonIcon, SunIcon } from "./Icons";

export function ThemeToggle({ onToggle, className = "" }) {
  return (
    <button className={`icon-btn theme-btn ${className}`} onClick={onToggle} aria-label="Tema">
      <MoonIcon />
      <SunIcon />
    </button>
  );
}
