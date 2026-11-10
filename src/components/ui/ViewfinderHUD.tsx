import React from 'react';
import { motion } from 'framer-motion';
import { CursorMode } from '@/hooks/use-viewfinder-cursor';

interface ViewfinderHUDProps {
  x: number;
  y: number;
  mode: CursorMode;
  label?: string;
  isVisible: boolean;
  focalLength?: string;
  aperture?: string;
}

export const ViewfinderHUD: React.FC<ViewfinderHUDProps> = ({
  x,
  y,
  mode,
  label,
  isVisible,
  focalLength = '35mm',
  aperture = 'f/1.4',
}) => {
  if (!isVisible) return null;

  const isExpanded = mode !== 'default';

  return (
    <div
      className="pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {/* Center crosshair dot */}
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />

      {/* Main Reticle Ring */}
      <motion.div
        animate={{
          width: isExpanded ? 100 : 44,
          height: isExpanded ? 100 : 44,
          borderColor: isExpanded ? 'rgba(212, 175, 55, 0.9)' : 'rgba(212, 175, 55, 0.4)',
          backgroundColor: isExpanded ? 'rgba(5, 5, 5, 0.85)' : 'rgba(5, 5, 5, 0.1)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative flex items-center justify-center rounded-full border border-[#D4AF37]/40 backdrop-blur-[2px]"
      >
        {/* Reticle tick marks & Camera Focus Brackets matching reticle design */}
        {!isExpanded && (
          <>
            <span className="absolute -top-2 left-1/2 h-2 w-[1.5px] -translate-x-1/2 bg-white" />
            <span className="absolute -bottom-2 left-1/2 h-2 w-[1.5px] -translate-x-1/2 bg-white" />
            <span className="absolute -left-2 top-1/2 h-[1.5px] w-2 -translate-y-1/2 bg-white" />
            <span className="absolute -right-2 top-1/2 h-[1.5px] w-2 -translate-y-1/2 bg-white" />

            {/* Inner Corner Brackets [ ] */}
            <span className="absolute left-2.5 top-2.5 h-2 w-2 border-l-[1.5px] border-t-[1.5px] border-white" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 border-r-[1.5px] border-t-[1.5px] border-white" />
            <span className="absolute bottom-2.5 left-2.5 h-2 w-2 border-b-[1.5px] border-l-[1.5px] border-white" />
            <span className="absolute bottom-2.5 right-2.5 h-2 w-2 border-b-[1.5px] border-r-[1.5px] border-white" />
          </>
        )}

        {/* Action Label on hover */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center font-mono text-[9px] font-bold uppercase tracking-wider text-[#D4AF37]"
          >
            <span>{label || (mode === 'play' ? 'PLAY REEL' : 'DISCOVER')}</span>
            <span className="mt-0.5 text-[7px] text-white/60">4K • 24FPS</span>
          </motion.div>
        )}
      </motion.div>

      {/* Viewfinder Telemetry Readout (Fixed relative to reticle) */}
      {!isExpanded && (
        <div className="absolute left-7 top-7 flex flex-col whitespace-nowrap font-mono text-[8px] tracking-widest text-[#D4AF37]/90 select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-rec-blink" />
            <span className="text-white/80">REC</span>
            <span className="text-white/40">|</span>
            <span>{focalLength}</span>
            <span>{aperture}</span>
          </div>
          <div className="text-[7px] text-white/40 tracking-wider">
            RAW 8K • 180° • ISO 800
          </div>
        </div>
      )}
    </div>
  );
};
