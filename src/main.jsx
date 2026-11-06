import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SplashScreen } from "./components/SplashScreen";
import { I18nProvider } from "./hooks/useI18n";
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/menu.css";
import "./styles/sheets.css";
import "./styles/overlays.css";
import "./styles/splash.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
    <SplashScreen />
  </StrictMode>
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
