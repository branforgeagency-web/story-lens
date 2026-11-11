import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
});

export const MenuIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const ArrowDownIcon = ({ size = 12, ...p }: IconProps) => (
  <svg {...base(size)} strokeLinejoin="round" {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export const ArrowRightIcon = ({ size = 15, ...p }: IconProps) => (
  <svg {...base(size)} strokeLinejoin="round" {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ChevronUpIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size)} strokeLinejoin="round" {...p}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
