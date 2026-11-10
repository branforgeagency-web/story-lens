import React, { useState, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

interface GradeScene {
  id: string;
  name: string;
  camera: string;
  lut: string;
  rawNote: string;
  gradeNote: string;
  goldTone: string;
}

const GRADE_SCENES: GradeScene[] = [
  {
    id: 'automotive',
    name: 'ALPINE PURSUIT // PORSCHE',
    camera: 'ARRI Alexa 35 LogC4',
    lut: 'SL_KODAK_5219_PRINT',
    rawNote: 'UNPROCESSED FLAT LOGC4 SENSOR LATITUDE',
    gradeNote: 'STORY LENS MASTER 35MM GOLD GRADE',
    goldTone: '#D4AF37',
  },
  {
    id: 'horology',
    name: 'TOURBILLON // VACHERON',
    camera: 'Phantom Flex 4K RAW',
    lut: 'SL_HOROLOGY_ACES_04',
    rawNote: '1000 FPS FLAT HIGH-SPEED RAW',
    gradeNote: 'CHAMPAGNE GOLD & SPECULAR CONTRAST',
    goldTone: '#F5E298',
  },
  {
    id: 'aerial',
    name: 'FJORD DIVE // ARCHITECTURAL',
    camera: 'DJI Inspire 3 ProRes RAW',
    lut: 'SL_NORDIC_DLOG_HERITAGE',
    rawNote: 'D-LOG CINEMA SENSOR CAPTURE',
    gradeNote: 'OBSIDIAN CLIFF & WARM SUNSET ACCENTS',
    goldTone: '#E5C158',
  },
];

interface RawToGradeSliderProps {
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const RawToGradeSlider: React.FC<RawToGradeSliderProps> = ({
  onHoverAction,
  onHoverEnd,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [activeScene, setActiveScene] = useState<GradeScene>(GRADE_SCENES[0]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const clamped = Math.max(2, Math.min(98, (offsetX / rect.width) * 100));
    setSliderPos(clamped);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    soundEngine.playFocusTick();
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Scene Preset Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          {GRADE_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => {
                soundEngine.playShutterClick();
                setActiveScene(scene);
              }}
              className={`px-3.5 py-1.5 rounded-full border transition-all uppercase ${
                activeScene.id === scene.id
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050505] font-semibold'
                  : 'border-white/[0.08] text-white/60 hover:text-white'
              }`}
            >
              {scene.name.split('//')[0]}
            </button>
          ))}
        </div>

        <div className="text-white/50 text-[10px]">
          DRAG TO REVEAL SENSOR TRANSFORMATION
        </div>
      </div>

      {/* Interactive Split Frame */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => onHoverAction?.('DRAG GRADE')}
        onMouseLeave={() => {
          setIsDragging(false);
          onHoverEnd?.();
        }}
        className="relative aspect-video w-full rounded-2xl border border-[#D4AF37]/30 overflow-hidden bg-[#050505] cursor-ew-resize select-none shadow-2xl"
      >
        {/* Layer 1: Master Grade (Full width background) */}
        <div className="absolute inset-0 w-full h-full">
          <svg viewBox="0 0 1000 562" className="w-full h-full object-cover">
            <defs>
              <radialGradient id="gradeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={activeScene.goldTone} stopOpacity="0.4" />
                <stop offset="60%" stopColor="#0D0D12" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#050505" stopOpacity="1" />
              </radialGradient>
              <linearGradient id="gradeAnamorphic" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor={activeScene.goldTone} stopOpacity="0.75" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#gradeGlow)" />
            {/* Cinematic Golden Streak */}
            <rect x="0" y="278" width="1000" height="6" fill="url(#gradeAnamorphic)" />
            {/* High Contrast Geometric Film Subject */}
            <circle cx="500" cy="281" r="140" fill="none" stroke={activeScene.goldTone} strokeWidth="2" />
            <circle cx="500" cy="281" r="90" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="6,6" />
            <line x1="470" y1="281" x2="530" y2="281" stroke="#FFF" strokeWidth="2" />
            <line x1="500" y1="251" x2="500" y2="311" stroke="#FFF" strokeWidth="2" />
          </svg>
          <div className="absolute bottom-6 right-6 font-mono text-[9px] text-[#D4AF37] bg-[#050505]/80 border border-[#D4AF37]/40 px-3 py-1.5 rounded uppercase tracking-wider backdrop-blur-md">
            {activeScene.gradeNote}
          </div>
        </div>

        {/* Layer 2: Raw Log Profile (Clipped to slider width) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || '100%' }}>
            <svg viewBox="0 0 1000 562" className="w-full h-full object-cover">
              {/* Flat Milky Log Background */}
              <rect width="100%" height="100%" fill="#26262B" />
              <circle cx="500" cy="281" r="140" fill="none" stroke="#5A5A62" strokeWidth="1" />
              <line x1="470" y1="281" x2="530" y2="281" stroke="#888892" strokeWidth="1" />
              <line x1="500" y1="251" x2="500" y2="311" stroke="#888892" strokeWidth="1" />
            </svg>
            <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/60 bg-[#1A1A1F]/90 border border-white/20 px-3 py-1.5 rounded uppercase tracking-wider backdrop-blur-md">
              {activeScene.rawNote}
            </div>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border-2 border-[#D4AF37] bg-[#050505] flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_#D4AF37]">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Metadata Readout */}
      <div className="flex flex-wrap items-center justify-between font-mono text-[10px] text-white/50 pt-2 border-t border-white/[0.06]">
        <div>CAMERA: <span className="text-white">{activeScene.camera}</span></div>
        <div>COLOR LUT: <span className="text-[#D4AF37]">{activeScene.lut}</span></div>
        <div>ACES 1.3 / DCI-P3 ARCHIVE</div>
      </div>
    </div>
  );
};
