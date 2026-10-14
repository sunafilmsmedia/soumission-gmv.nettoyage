export function Skyline() {
  return (
    <div className="skyline">
      <svg
        className="skyline-svg"
        viewBox="0 0 900 140"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <line x1="0" y1="130" x2="900" y2="130" className="skyline-ground" />

        {/* Maison */}
        <g className="skyline-building">
          <path d="M15 92 L55 58 L95 92" />
          <path d="M24 88 V130 H86 V88" />
          <rect x="45" y="106" width="20" height="24" />
        </g>

        {/* Tour de bureaux */}
        <g className="skyline-building">
          <rect x="130" y="22" width="70" height="108" />
          <line x1="130" y1="48" x2="200" y2="48" />
          <line x1="130" y1="72" x2="200" y2="72" />
          <line x1="130" y1="96" x2="200" y2="96" />
          <line x1="165" y1="22" x2="165" y2="130" />
        </g>

        {/* Commerce / vitrine */}
        <g className="skyline-building">
          <rect x="225" y="92" width="90" height="38" />
          <line x1="225" y1="104" x2="315" y2="104" />
          <line x1="248" y1="104" x2="248" y2="130" />
          <line x1="292" y1="104" x2="292" y2="130" />
        </g>

        {/* Entrepôt / industriel */}
        <g className="skyline-building">
          <rect x="345" y="78" width="100" height="52" />
          <path d="M345 78 L370 58 L395 78 L420 58 L445 78" />
          <line x1="430" y1="40" x2="430" y2="58" />
        </g>

        {/* Immeuble locatif / condo */}
        <g className="skyline-building">
          <rect x="475" y="34" width="64" height="96" />
          <line x1="475" y1="58" x2="539" y2="58" />
          <line x1="475" y1="80" x2="539" y2="80" />
          <line x1="475" y1="102" x2="539" y2="102" />
          <line x1="507" y1="34" x2="507" y2="130" />
        </g>

        {/* Clinique / bâtiment santé */}
        <g className="skyline-building">
          <rect x="565" y="64" width="78" height="66" />
          <line x1="597" y1="80" x2="611" y2="80" />
          <line x1="604" y1="73" x2="604" y2="87" />
        </g>

        {/* Chantier / après-construction */}
        <g className="skyline-building">
          <path d="M665 130 V84 M665 84 L700 68 M700 68 L735 84 M735 84 V130" />
          <line x1="665" y1="108" x2="735" y2="108" />
        </g>

        {/* Petit immeuble */}
        <g className="skyline-building">
          <rect x="765" y="70" width="84" height="60" />
          <line x1="765" y1="90" x2="849" y2="90" />
          <line x1="765" y1="110" x2="849" y2="110" />
        </g>
      </svg>

      <img className="skyline-broom" src="/broom.png" alt="" aria-hidden="true" />
    </div>
  );
}
