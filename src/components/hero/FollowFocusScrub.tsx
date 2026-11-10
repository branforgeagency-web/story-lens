import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';

interface FocusMark {
  label: string;
  distance: string;
  blur: number; // 0 is sharp, higher is shallow bokeh
  aperture: string;
}

const FOCUS_STOPS: FocusMark[] = [
  { label: '0.5m', distance: '0.5 METERS', blur: 7, aperture: 'f/1.2 SHALLOW' },
  { label: '0.8m', distance: '0.8 METERS', blur: 4.5, aperture: 'f/1.4 CLOSE-UP' },
  { label: '1.2m', distance: '1.2 METERS', blur: 2.5, aperture: 'f/2.0 PORTRAIT' },
  { label: '3.0m', distance: '3.0 METERS', blur: 0, aperture: 'f/2.8 SWEET SPOT' }, // True sharpness
  { label: '5.0m', distance: '5.0 METERS', blur: 1.5, aperture: 'f/4.0 MEDIUM' },
  { label: '∞', distance: 'INFINITY', blur: 3.5, aperture: 'f/5.6 HYPERFOCAL' },
];

interface FollowFocusScrubProps {
  onFocusChange: (blur: number, markLabel: string) => void;
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const FollowFocusScrub: React.FC<FollowFocusScrubProps> = ({
  onFocusChange,
  onHoverAction,
  onHoverEnd,
}) => {
  const [activeIndex, setActiveIndex] = useState(3); // Default at 3.0m (Tack Sharp)

  const handleSelectStop = (index: number) => {
    setActiveIndex(index);
    soundEngine.playFocusTick();
    onFocusChange(FOCUS_STOPS[index].blur, FOCUS_STOPS[index].label);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Telemetry Header */}
      <div className="flex items-center gap-3 font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase mb-2">
        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
        <span>CINE-LENS FOLLOW FOCUS</span>
        <span className="text-white/40">|</span>
        <span className="text-white">{FOCUS_STOPS[activeIndex].distance}</span>
        <span className="text-white/40">|</span>
        <span>{FOCUS_STOPS[activeIndex].aperture}</span>
      </div>

      {/* Draggable / Clickable Cine Gear Ring */}
      <div
        onMouseEnter={() => onHoverAction?.('PULL FOCUS')}
        onMouseLeave={onHoverEnd}
        className="relative flex items-center gap-1.5 p-2 bg-[#08080A]/90 border border-[#D4AF37]/20 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        {FOCUS_STOPS.map((stop, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={stop.label}
              onClick={() => handleSelectStop(index)}
              className={`relative px-3.5 py-1.5 rounded-full font-mono text-[11px] font-medium transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#D4AF37] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {/* Gear tick mark */}
              <span
                className={`h-2 w-[1px] ${
                  isActive ? 'bg-[#050505]' : 'bg-white/20'
                }`}
              />
              <span>{stop.label}</span>
            </button>
          );
        })}
      </div>
      <span className="mt-1.5 font-mono text-[8px] tracking-widest text-white/40 uppercase">
        SCRUB DIAL TO SHIFT OPTICAL DEPTH OF FIELD
      </span>
    </div>
  );
};
