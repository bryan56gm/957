// Bottom sheet with scrim. `tall` sheets fill most of the screen and scroll inside.
export function Sheet({ open, onClose, children, className = "", tall = false }) {
  return (
    <>
      <div className={`scrim ${open ? "show" : ""}`} onClick={onClose} />
      <div className={`sheet ${tall ? "tall" : ""} ${open ? "show" : ""} ${className}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="grab" />
        {open && children}
      </div>
    </>
  );
}
