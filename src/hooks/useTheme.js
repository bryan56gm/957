import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "957-theme";
const THEME_COLORS = { light: "#f4f1ec", dark: "#161413" };

function readInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Storage can be blocked; fall back to the dark brand theme.
  }
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors in private mode.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((current) => (current === "light" ? "dark" : "light")), []);

  return { theme, setTheme, toggleTheme };
}
