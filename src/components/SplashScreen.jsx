import { useEffect, useState } from "react";

const VISIBLE_MS = 1600;
const FADE_MS = 450;

// Brand moment on launch. index.html paints the same logo statically, so there is no blank frame.
export function SplashScreen() {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const fade = setTimeout(() => setPhase("out"), VISIBLE_MS);
    const done = setTimeout(() => setPhase("gone"), VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div className={`splash ${phase === "out" ? "out" : ""}`} aria-hidden="true">
      <div className="splash-glow" />
      <img className="splash-logo" src="/icons/logo.png" alt="" />
      <div className="splash-bar"><span /></div>
      <p className="splash-tag">Esterri d’Àneu · Pallars Sobirà</p>
    </div>
  );
}
