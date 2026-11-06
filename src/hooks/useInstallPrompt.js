import { useCallback, useEffect, useState } from "react";

// Chrome can fire `beforeinstallprompt` before React mounts: capture it at import time.
let deferredPrompt = null;
const listeners = new Set();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    listeners.forEach((listener) => listener());
  });
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function detectPlatform() {
  const ua = window.navigator.userAgent;
  const isIpadOs = /Macintosh/.test(ua) && window.navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || isIpadOs) {
    return { platform: "ios", browser: /CriOS|FxiOS|EdgiOS/.test(ua) ? "other" : "safari" };
  }
  if (/Android/.test(ua)) {
    if (/Firefox|MiuiBrowser|XiaoMi|UCBrowser|OPR\//.test(ua)) return { platform: "android", browser: "other" };
    return { platform: "android", browser: /SamsungBrowser/.test(ua) ? "samsung" : "chrome" };
  }
  return { platform: "desktop", browser: "other" };
}

// Mobile browser + app not installed → offer installation.
// Android Chrome gets the native prompt; iOS and other browsers get step-by-step instructions.
export function useInstallPrompt() {
  const [canPromptNative, setCanPromptNative] = useState(() => Boolean(deferredPrompt));
  const [installed, setInstalled] = useState(isStandalone);
  const [{ platform, browser }] = useState(detectPlatform);

  useEffect(() => {
    const update = () => setCanPromptNative(Boolean(deferredPrompt));
    const handleInstalled = () => setInstalled(true);
    listeners.add(update);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      listeners.delete(update);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  // Returns true when the native dialog was shown; false means "show manual steps".
  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;
    const event = deferredPrompt;
    deferredPrompt = null;
    setCanPromptNative(false);
    event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    return true;
  }, []);

  return {
    platform,
    browser,
    canPromptNative,
    supportsNative: platform === "android" && browser !== "other",
    shouldOffer: !installed && platform !== "desktop",
    promptInstall
  };
}
