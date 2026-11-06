import { AppLogo } from "./Icons";

// Imitation of a lock-screen notification sliding from the top.
export function PushBanner({ push, onTap, onDismiss }) {
  return (
    <div className={`push ${push ? "show" : ""}`} role="alert" aria-live="assertive">
      {push && (
        <button key={push.id} className="push-card" onClick={() => (push.action ? onTap(push) : onDismiss())}>
          <AppLogo className="push-icon" />
          <span className="push-text">
            <span className="push-app">957 GASTROBAR <em>· ara</em></span>
            <b>{push.title}</b>
            <span>{push.body}</span>
          </span>
        </button>
      )}
    </div>
  );
}
