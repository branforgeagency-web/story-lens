import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '@/lib/audio';

interface ApertureIrisShutterProps {
  onComplete?: () => void;
}

export const ApertureIrisShutter: React.FC<ApertureIrisShutterProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Automatically trigger shutter open after optical calibration
    const timer1 = setTimeout(() => {
      soundEngine.playShutterClick();
      setIsOpen(true);
    }, 700);

    const timer2 = setTimeout(() => {
      setIsDismissed(true);
      onComplete?.();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (isDismissed) return null;

  // 8 mechanical iris blades rotating outward
  const bladeCount = 8;
  const blades = Array.from({ length: bladeCount });

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#050505] pointer-events-none overflow-hidden"
        >
          {/* Circular Aperture Housing */}
          <div className="relative h-[120vmax] w-[120vmax] flex items-center justify-center">
            {blades.map((_, index) => {
              const rotation = (360 / bladeCount) * index;
              return (
                <motion.div
                  key={index}
                  initial={{ transform: `rotate(${rotation}deg) translateY(0%) scale(1)` }}
                  animate={
                    isOpen
                      ? {
                          transform: `rotate(${rotation + 25}deg) translateY(-120%) scale(1.1)`,
                          opacity: 0,
                        }
                      : {
                          transform: `rotate(${rotation}deg) translateY(0%) scale(1)`,
                          opacity: 1,
                        }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.77, 0, 0.175, 1],
                  }}
                  className="absolute origin-bottom h-[60vmax] w-[60vmax] bg-[#070709] border-l border-[#D4AF37]/20 shadow-2xl"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                  }}
                />
              );
            })}

            {/* Central Calibrating Reticle */}
            <motion.div
              animate={isOpen ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute z-10 flex flex-col items-center justify-center text-center font-mono"
            >
              <div className="h-16 w-16 rounded-full border border-[#D4AF37] flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
                <div className="h-8 w-8 rounded-full border border-dashed border-[#D4AF37]/60" />
              </div>
              <span className="mt-4 text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">
                CALIBRATING IRIS // T1.4
              </span>
              <span className="mt-1 text-[8px] tracking-[0.2em] text-white/50 uppercase">
                STORY LENS MASTER OPTICS
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
