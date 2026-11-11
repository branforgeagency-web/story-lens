import { forwardRef } from 'react';
import './FocusReticle.css';

const BG = 'rgba(0,0,0,0.85)';
const FG = '#FFFFFF';

const TICKS: readonly [number, number, number, number][] = [
  [50, 8, 50, 28],
  [50, 72, 50, 92],
  [8, 50, 28, 50],
  [72, 50, 92, 50],
];

const BRACKETS: readonly [d: string, corner: string][] = [
  ['M 43 33 L 33 33 L 33 43', 'bracket-tl'],
  ['M 57 33 L 67 33 L 67 43', 'bracket-tr'],
  ['M 33 57 L 33 67 L 43 67', 'bracket-bl'],
  ['M 67 57 L 67 67 L 57 67', 'bracket-br'],
];

/** Camera focus crosshair that follows the cursor over the hero (positioned by `useFocusReticle`). */
export const FocusReticle = forwardRef<HTMLDivElement>(function FocusReticle(_, ref) {
  return (
    <div className="banner-focus-reticle" ref={ref} aria-hidden="true">
      <svg className="reticle-svg" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="32" className="reticle-ring-bg" stroke={BG} strokeWidth="4.5" />
        <circle cx="50" cy="50" r="32" className="reticle-ring" stroke={FG} strokeWidth="2.5" />

        {TICKS.map(([x1, y1, x2, y2]) => (
          <g key={`${x1}-${y1}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="reticle-tick-bg" stroke={BG} strokeWidth="4.5" strokeLinecap="round" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="reticle-tick" stroke={FG} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}

        {BRACKETS.map(([d, corner]) => (
          <g key={corner}>
            <path d={d} className="reticle-bracket-bg" stroke={BG} strokeWidth="4.5" />
            <path d={d} className={`reticle-bracket ${corner}`} stroke={FG} strokeWidth="2.5" />
          </g>
        ))}

        <circle cx="50" cy="50" r="2.2" className="reticle-center-dot" fill="#D4AF37" />
      </svg>
    </div>
  );
});
