"use client";

export function ProgressBar({
  current,
  total,
  onBack,
  showBack,
}: {
  current: number;
  total: number;
  onBack: () => void;
  showBack: boolean;
}) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="top-bar">
      {showBack ? (
        <button
          type="button"
          className="back-button"
          aria-label="Retour"
          onClick={onBack}
        >
          ←
        </button>
      ) : (
        <div style={{ width: 40, flexShrink: 0 }} />
      )}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">
        Étape {current} sur {total}
      </span>
    </div>
  );
}
