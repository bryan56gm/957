import { AppLogo, BagIcon } from "./Icons";

export function TopBar({ title, cartCount, onOpenCart, onHome }) {
  return (
    <header className="topbar">
      <button className="topbar-brand" onClick={onHome} aria-label="957">
        <AppLogo className="topbar-mark" />
        <span className="display">{title}</span>
      </button>
      <span className="spacer" />
      <button className={`cart-btn ${cartCount ? "has" : ""}`} onClick={onOpenCart} aria-label="Cistella">
        <BagIcon />
        {cartCount > 0 && <span className="badge" key={cartCount}>{cartCount}</span>}
      </button>
    </header>
  );
}
