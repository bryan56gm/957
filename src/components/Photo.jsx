import { useState } from "react";
import { photoUrl } from "../data/media";

// Lazy photo over a warm gradient, so a slow or failed image never leaves a hole.
export function Photo({ name, width = 800, className = "", alt = "", eager = false }) {
  const [state, setState] = useState("loading");
  const src = photoUrl(name, width);
  return (
    <div className={`photo ${state === "loaded" ? "loaded" : ""} ${className}`}>
      {src && state !== "failed" && (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onLoad={() => setState("loaded")} onError={() => setState("failed")} />
      )}
    </div>
  );
}
