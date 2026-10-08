import type { StepIconKey } from "@/lib/types";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HouseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M8 23 L24 9 L40 23" />
      <path d="M12 20 V39 H36 V20" />
      <rect x="20" y="27" width="8" height="12" />
    </svg>
  );
}

function BuildingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="12" y="5" width="24" height="38" />
      <line x1="18" y1="12" x2="18" y2="12.1" />
      <line x1="24" y1="12" x2="24" y2="12.1" />
      <line x1="30" y1="12" x2="30" y2="12.1" />
      <line x1="18" y1="19" x2="18" y2="19.1" />
      <line x1="24" y1="19" x2="24" y2="19.1" />
      <line x1="30" y1="19" x2="30" y2="19.1" />
      <line x1="18" y1="26" x2="18" y2="26.1" />
      <line x1="24" y1="26" x2="24" y2="26.1" />
      <line x1="30" y1="26" x2="30" y2="26.1" />
      <rect x="20" y="33" width="8" height="10" />
    </svg>
  );
}

function DropletIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M24 6 C 31 17, 37 24, 37 31 A13 13 0 1 1 11 31 C11 24, 17 17, 24 6 Z" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="7" y="10" width="34" height="30" rx="3" />
      <line x1="7" y1="19" x2="41" y2="19" />
      <line x1="16" y1="5" x2="16" y2="14" />
      <line x1="32" y1="5" x2="32" y2="14" />
    </svg>
  );
}

function RulerIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M7 7 H17 M7 7 V17" />
      <path d="M41 7 H31 M41 7 V17" />
      <path d="M7 41 H17 M7 41 V31" />
      <path d="M41 41 H31 M41 41 V31" />
      <rect x="18" y="18" width="12" height="12" />
    </svg>
  );
}

function RepeatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M10 20 A14 14 0 0 1 36 13" />
      <path d="M36 13 V5 M36 13 H28" />
      <path d="M38 28 A14 14 0 0 1 12 35" />
      <path d="M12 35 V43 M12 35 H20" />
    </svg>
  );
}

function HandshakeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="7" y="17" width="34" height="21" rx="3" />
      <path d="M18 17 V12 a3 3 0 0 1 3-3 h6 a3 3 0 0 1 3 3 v5" />
      <line x1="7" y1="27" x2="41" y2="27" />
    </svg>
  );
}

function UserIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="24" cy="16" r="8" />
      <path d="M8 41 a16 16 0 0 1 32 0" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="14" y="4" width="20" height="40" rx="4" />
      <line x1="21" y1="37" x2="27" y2="37" />
    </svg>
  );
}

const ICONS: Record<StepIconKey, (props: IconProps) => React.JSX.Element> = {
  house: HouseIcon,
  building: BuildingIcon,
  droplet: DropletIcon,
  calendar: CalendarIcon,
  ruler: RulerIcon,
  repeat: RepeatIcon,
  handshake: HandshakeIcon,
  user: UserIcon,
  phone: PhoneIcon,
};

export function StepIcon({ icon, className }: { icon: StepIconKey; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}
