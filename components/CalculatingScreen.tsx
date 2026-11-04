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
      <img src="/broom.png" alt="" aria-hidden="true" className="calculating-broom" />
      <p className="calculating-text">{text}</p>
    </div>
  );
}
