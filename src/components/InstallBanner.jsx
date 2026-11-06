import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { DotsIcon, DownloadIcon, PlusSquareIcon, ShareIcon } from "./Icons";
import { Sheet } from "./Sheet";

// Chrome only enables installation after ~30 s of engagement; wait a bit longer before giving up.
const NATIVE_WAIT_MS = 40000;

const STEPS = {
  ios: [
    { Icon: ShareIcon, key: "installIos1" },
    { Icon: PlusSquareIcon, key: "installIos2" },
    { Icon: DownloadIcon, key: "installIos3" }
  ],
  android: [
    { Icon: DotsIcon, key: "installAndroid1" },
    { Icon: PlusSquareIcon, key: "installAndroid2" },
    { Icon: DownloadIcon, key: "installAndroid3" }
  ]
};

// mode: "waiting" (native install not enabled yet) | "ready" (one tap installs) | "steps" (manual)
export function InstallBanner() {
  const { t } = useI18n();
  const { platform, canPromptNative, supportsNative, shouldOffer, promptInstall } = useInstallPrompt();
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (mode !== "waiting") return undefined;
    if (canPromptNative) {
      setMode("ready");
      return undefined;
    }
    const timer = setTimeout(() => setMode("steps"), NATIVE_WAIT_MS);
    return () => clearTimeout(timer);
  }, [mode, canPromptNative]);

  if (!shouldOffer) return null;

  const install = async () => {
    if (canPromptNative) {
      setMode(null);
      await promptInstall();
      return;
    }
    setMode(supportsNative ? "waiting" : "steps");
  };

  return (
    <>
      <button className="install-btn" onClick={install}><DownloadIcon /> {t("install")}</button>
      <Sheet open={mode !== null} onClose={() => setMode(null)}>
        <p className="display sheet-title">{t("install")}</p>
        {mode === "steps" && (
          <>
            <ol className="install-steps">
              {STEPS[platform === "ios" ? "ios" : "android"].map(({ Icon, key }) => (
                <li key={key}><span className="round-icon"><Icon /></span><span>{t(key)}</span></li>
              ))}
            </ol>
            <button className="btn-primary" onClick={() => setMode(null)}>{t("gotIt")}</button>
          </>
        )}
        {mode === "waiting" && (
          <>
            <div className="install-wait"><span className="spinner" aria-hidden="true" /><p className="sheet-body">{t("installWaiting")}</p></div>
            <button className="btn-ghost" onClick={() => setMode(null)}>{t("notNow")}</button>
          </>
        )}
        {mode === "ready" && (
          <>
            <div className="install-preview">
              <img src="/icons/icon-192.png" alt="" />
              <div><b>957</b><small>{t("installPreview")}</small></div>
            </div>
            <button className="btn-primary" onClick={install}>{t("installNow")}</button>
            <button className="btn-ghost" onClick={() => setMode(null)}>{t("notNow")}</button>
          </>
        )}
      </Sheet>
    </>
  );
}
