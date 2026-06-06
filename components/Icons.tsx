import type { SVGProps, ReactElement } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
    </svg>
  );
}

// Equipment icons (line style, slightly larger viewBox usage)
export function FridgeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M6 10h12M10 5v2M10 13v3" />
    </svg>
  );
}

export function CoolerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M12 4v16M8 11v2M16 11v2" />
    </svg>
  );
}

export function FreezerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function IceIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3h4l3 4-3 4h-4L7 7l3-4Z" />
      <path d="M10 13h4l3 4-3 4h-4l-3-4 3-4Z" />
    </svg>
  );
}

export function OvenIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8h18M7 5.5h.01M11 5.5h.01" />
      <rect x="7" y="11" width="10" height="7" rx="1" />
    </svg>
  );
}

export function FryerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 9h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" />
      <path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M8 13h8" />
    </svg>
  );
}

export function GrillIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16l-1.5 7a4 4 0 0 1-4 3H9.5a4 4 0 0 1-4-3L4 7Z" />
      <path d="M8 17l-1 4M16 17l1 4M9 4v1M12 3v2M15 4v1" />
    </svg>
  );
}

export function StoveIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8" r="2" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  );
}

const ICONS: Record<string, (props: IconProps) => ReactElement> = {
  refrigerator: FridgeIcon,
  cooler: CoolerIcon,
  freezer: FreezerIcon,
  ice: IceIcon,
  oven: OvenIcon,
  fryer: FryerIcon,
  grill: GrillIcon,
  stove: StoveIcon,
  wrench: WrenchIcon,
};

export function ServiceIcon({
  name,
  ...props
}: { name: string } & IconProps) {
  const Icon = ICONS[name] ?? WrenchIcon;
  return <Icon {...props} />;
}
