import { useEffect, useState } from "react";
import { SCANNED_TABLE, TABLES } from "../data/venue";
import { useI18n } from "../hooks/useI18n";
import { CheckIcon, CloseIcon } from "./Icons";
import { Photo } from "./Photo";

const AUTO_SCAN_MS = 2600;

// Simulated camera: the frame "finds" the table QR after a couple of seconds.
export function TableScanner({ open, onClose, onConfirm }) {
  const { t } = useI18n();
  const [found, setFound] = useState(false);
  const zone = TABLES[SCANNED_TABLE];

  useEffect(() => {
    if (!open) {
      setFound(false);
      return undefined;
    }
    const timer = setTimeout(() => {
      setFound(true);
      navigator.vibrate?.(40);
    }, AUTO_SCAN_MS);
    return () => clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div className="overlay scanner">
      <Photo name="terrace" width={900} className="scanner-photo" eager />
      <span className="scanner-shade" />
      <header className="overlay-head light">
        <span className="icon-btn ghost" />
        <span className="display">{t("navTable")}</span>
        <button className="icon-btn" onClick={onClose} aria-label="×"><CloseIcon /></button>
      </header>
      {!found ? (
        <div className="scanner-body">
          <p className="display scanner-title">{t("scanTitle")}</p>
          <div className="frame">
            <i /><i /><i /><i />
            <div className="frame-qr">
              <svg viewBox="0 0 21 21" shapeRendering="crispEdges" aria-hidden="true">
                <path fill="#f4f1ec" d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM9 0h2v2H9zM9 4h3v3H9zM8 9h5v2H8zM14 9h2v3h-2zM17 9h4v2h-4zM9 13h2v2H9zM12 14h3v2h-3zM16 14h2v3h-2zM19 13h2v2h-2zM9 17h3v4H9zM13 18h2v3h-2zM17 19h4v2h-4zM2 9h3v3H2z" />
                <path fill="#161413" d="M1 1h5v5H1zM15 1h5v5h-5zM1 15h5v5H1z" />
                <path fill="#f4f1ec" d="M2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2z" />
              </svg>
            </div>
            <span className="scan-line" />
          </div>
          <p className="scanner-hint">{t("scanHint")}</p>
          <button className="btn-ghost light" onClick={() => setFound(true)}>{t("scanDemo")}</button>
        </div>
      ) : (
        <div className="scanner-body found">
          <span className="found-tick"><CheckIcon /></span>
          <p className="display scanner-title">{t("tableFound", { table: SCANNED_TABLE })}</p>
          <span className="pill light">{t(zone === "terrace" ? "zoneTerrace" : "zoneInside")}</span>
          {zone === "terrace" && <p className="scanner-hint">{t("terraceNote")}</p>}
          <button className="btn-primary" onClick={() => onConfirm({ type: "table", table: SCANNED_TABLE, zone })}>{t("startOrdering")}</button>
        </div>
      )}
    </div>
  );
}
