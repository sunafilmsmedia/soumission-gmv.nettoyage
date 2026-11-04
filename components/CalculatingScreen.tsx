"use client";

import { useEffect } from "react";

export function CalculatingScreen({
  text,
  onDone,
  delayMs = 1800,
}: {
  text: string;
  onDone: () => void;
  delayMs?: number;
}) {
  useEffect(() => {
    const timeout = window.setTimeout(onDone, delayMs);
    return () => window.clearTimeout(timeout);
  }, [onDone, delayMs]);

  return (
    <div className="calculating">
      <div className="calculating-ring">
        <span className="calculating-ring-pulse" aria-hidden="true" />
        <img src="/broom.png" alt="" aria-hidden="true" className="calculating-broom" />
      </div>
      <p className="calculating-eyebrow">Analyse en cours</p>
      <p className="calculating-text shimmer-text">{text}</p>
      <div className="calculating-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
