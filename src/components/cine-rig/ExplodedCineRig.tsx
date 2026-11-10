import React, { useState } from 'react';
import { CineRigElement } from '@/types';
import { Layers, Cpu, Eye, Shield, Sliders } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

const CINE_RIG_PARTS: CineRigElement[] = [
  {
    id: 'optics-front',
    partNumber: 'MOD-01',
    name: 'Front Anamorphic Cylinder',
    category: 'OPTICS',
    specs: '65mm T2.3 / 2x Horizontal Anamorphic Squeeze',
    description: 'Bespoke cylindrical glass element that produces natural horizontal flare streaks and signature oval background bokeh.',
    pipelineStage: 'Anamorphic Cinematography',
    explodedOffset: -140,
  },
  {
    id: 'iris-assembly',
    partNumber: 'MOD-02',
    name: '8-Blade Mechanical Iris',
    category: 'APERTURE',
    specs: 'Stepless Clickless De-Clicked Cine Gear T1.4 - T22',
    description: 'Precision-machined blackened titanium blades delivering butter-smooth focal transitions and controlled optical diffraction.',
    pipelineStage: 'Optical Depth Sculpting',
    explodedOffset: -70,
  },
  {
    id: 'optical-block',
    partNumber: 'MOD-03',
    name: 'Internal Spherical Core',
    category: 'OPTICS',
    specs: 'Rare-Earth Fluorite Multi-Coating System',
    description: 'Corrects chromatic aberration while retaining cinematic organic skin glow and micro-contrast rendition.',
    pipelineStage: 'Light Transmission',
    explodedOffset: 0,
  },
  {
    id: 'sensor-chassis',
    partNumber: 'MOD-04',
    name: 'Sensor Core Block',
    category: 'SENSOR',
    specs: 'Large-Format 35.4MP VistaVision Active Thermal Baffle',
    description: '17 stops of usable latitude capturing subtle shadow nuances from pure obsidian black to specular highlights.',
    pipelineStage: 'High-Fidelity Color Grading',
    explodedOffset: 70,
  },
  {
    id: 'cage-rigging',
    partNumber: 'MOD-05',
    name: 'Carbon Rigging & DIT',
    category: 'RIGGING',
    specs: 'Integrated CRMX Wireless Focus & SDI Monitoring',
    description: 'High-rigidity aerospace carbon chassis engineered for rapid transitions between gimbal, crane, and 140km/h chase rigs.',
    pipelineStage: 'High-Speed Precision On-Set',
    explodedOffset: 140,
  },
];

interface ExplodedCineRigProps {
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const ExplodedCineRig: React.FC<ExplodedCineRigProps> = ({
  onHoverAction,
  onHoverEnd,
}) => {
  const [explosionProgress, setExplosionProgress] = useState<number>(0.65); // 0 = locked together, 1 = fully exploded
  const [selectedPart, setSelectedPart] = useState<CineRigElement>(CINE_RIG_PARTS[0]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExplosionProgress(val);
    soundEngine.playFocusTick();
  };

  return (
    <section id="cine-rig" className="relative w-full py-28 px-6 bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              <span>02 // THE EXPLODED CINE-RIG</span>
              <span className="text-white/30">—</span>
              <span className="text-white/60">INTERACTIVE OPTICAL BREAKDOWN</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              Anatomy of Mastery
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#0A0A0E] border border-white/[0.08] px-5 py-3 rounded-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[#D4AF37]">
              <Sliders className="h-4 w-4" />
              <span>SCRUB EXPLODED VIEW:</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explosionProgress}
              onChange={handleSliderChange}
              className="w-44 accent-[#D4AF37] cursor-pointer"
            />
            <span className="font-mono text-xs text-white">
              {Math.round(explosionProgress * 100)}%
            </span>
          </div>
        </div>

        {/* 3D Exploded Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Visual Stage */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[560px] rounded-2xl border border-white/[0.08] bg-[#070709] flex items-center justify-center overflow-hidden shadow-2xl p-6">
            {/* Background Perspective Grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="rigGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rigGrid)" />
              </svg>
            </div>

            {/* Central Axis Alignment Beam */}
            <div className="absolute left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent pointer-events-none" />

            {/* 3D Floating Elements Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {CINE_RIG_PARTS.map((part) => {
                const currentOffset = part.explodedOffset * explosionProgress;
                const isSelected = selectedPart.id === part.id;

                return (
                  <div
                    key={part.id}
                    onClick={() => {
                      soundEngine.playShutterClick();
                      setSelectedPart(part);
                    }}
                    onMouseEnter={() => onHoverAction?.(part.name.toUpperCase())}
                    onMouseLeave={onHoverEnd}
                    style={{
                      transform: `translateX(${currentOffset}px) scale(${isSelected ? 1.05 : 1})`,
                    }}
                    className={`absolute cursor-pointer transition-all duration-300 flex flex-col items-center group`}
                  >
                    {/* Module Graphic Ring */}
                    <div
                      className={`relative w-28 sm:w-36 h-48 sm:h-64 rounded-xl border flex flex-col items-center justify-between p-3 backdrop-blur-md transition-all duration-300 ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#121216]/90 shadow-[0_0_30px_rgba(212,175,55,0.35)]'
                          : 'border-white/[0.12] bg-[#050505]/70 hover:border-white/40'
                      }`}
                    >
                      <span className="font-mono text-[8px] text-[#D4AF37] tracking-wider uppercase">
                        {part.partNumber}
                      </span>

                      {/* Internal Optical Element Symbol */}
                      <div className="my-auto flex flex-col items-center">
                        <div className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full border border-dashed flex items-center justify-center transition-colors ${
                          isSelected ? 'border-[#D4AF37]' : 'border-white/30 group-hover:border-white/60'
                        }`}>
                          <div className={`h-6 w-6 rounded-full ${isSelected ? 'bg-[#D4AF37]' : 'bg-white/20'}`} />
                        </div>
                      </div>

                      <span className="font-mono text-[8px] text-white/70 tracking-wider text-center line-clamp-1 uppercase">
                        {part.category}
                      </span>
                    </div>

                    {/* Part Label Badge */}
                    <div className="mt-3 px-2 py-0.5 rounded bg-[#0A0A0C] border border-white/[0.08] font-mono text-[9px] text-white/80 whitespace-nowrap">
                      {part.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[9px] text-white/40">
              <span>AXIS: OPTICAL CENTERLINE</span>
              <span className="text-[#D4AF37]">CLICK ANY MODULE TO INSPECT</span>
            </div>
          </div>

          {/* Right Column: Deep Technical Inspector & Pipeline Step */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-2xl border border-[#D4AF37]/30 bg-[#0A0A0E] shadow-xl">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#D4AF37] uppercase mb-4">
                <span>MODULE // {selectedPart.partNumber}</span>
                <span className="px-2 py-0.5 rounded bg-[#121216] border border-[#D4AF37]/20">
                  {selectedPart.category}
                </span>
              </div>

              <h3 className="font-display text-3xl text-white uppercase tracking-tight mb-2">
                {selectedPart.name}
              </h3>

              <div className="font-mono text-xs text-[#E5C158] mb-4">
                SPEC: {selectedPart.specs}
              </div>

              <p className="font-sans text-sm text-silver/80 leading-relaxed font-light mb-6">
                {selectedPart.description}
              </p>

              {/* Accompanying Pipeline Step */}
              <div className="p-4 rounded-xl bg-[#050505] border border-white/[0.08]">
                <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">
                  STORY LENS PROPRIETARY PIPELINE ALIGNMENT:
                </div>
                <div className="font-mono text-xs text-white font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span>{selectedPart.pipelineStage}</span>
                </div>
              </div>
            </div>

            {/* 3-Step Production Pipeline Bar */}
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#070709] flex flex-col gap-3 font-mono text-xs">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                // END-TO-END EXECUTION CYCLE
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F14] border border-white/[0.04]">
                <span className="text-[#D4AF37]">01. PRE-PRODUCTION</span>
                <span className="text-white/70">Scripting & Anamorphic Pre-Viz</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F14] border border-white/[0.04]">
                <span className="text-[#D4AF37]">02. CINEMATOGRAPHY</span>
                <span className="text-white/70">8K ARRI & 140km/h FPV Operations</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F14] border border-white/[0.04]">
                <span className="text-[#D4AF37]">03. COLOR & SOUND</span>
                <span className="text-white/70">ACES DaVinci Resolve & Dolby Atmos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
