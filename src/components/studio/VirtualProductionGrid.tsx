import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';

interface SoundstageFacility {
  id: string;
  code: string;
  name: string;
  classification: string;
  dimensions: string;
  power: string;
  ceiling: string;
  acousticRating: string;
  keyGear: string[];
  operationalRole: string;
  status: 'OPERATIONAL' | 'CURRENTLY SHOOTING' | 'MAINTENANCE';
}

const SOUNDSTAGE_FLEET: SoundstageFacility[] = [
  {
    id: 'stage-alpha',
    code: 'STG-01',
    name: 'Soundstage Alpha // LED Volume',
    classification: 'Virtual Production & Real-Time In-Camera VFX',
    dimensions: '24m (W) × 7m (H) 270° Curved Perimeter',
    power: '800A 3-Phase Camlock Matrix',
    ceiling: '9.5m Clear Grid with Motorized Battens',
    acousticRating: 'STC-65 Silent Stage Isolation',
    keyGear: [
      'ROE Visual Black Pearl 1.9mm LED Panels (7,680 Hz)',
      'Mark Roberts Motion Control (MRMC) Bolt X High-Speed Cinebot (9.7 m/s)',
      'Mo-Sys StarTracker Optical Lens Encoders',
      'Dual Unreal Engine 5.4 Render Clusters with Genlock Sync',
    ],
    operationalRole:
      'Engineered for large-scale automotive car commercials, high-velocity virtual environments, and continuous daylight simulation without environmental weather risk.',
    status: 'OPERATIONAL',
  },
  {
    id: 'stage-beta',
    code: 'STG-02',
    name: 'High-Velocity Drone & Chase Hangar',
    classification: 'Aerial Cinematography & FPV Vehicle Tracking',
    dimensions: '5,000 sq ft Prep Bay + Outdoor Circuit Access',
    power: '400A High-Current Rapid Lipo Station',
    ceiling: '6.0m Clearance with Drone Flight Test Net',
    acousticRating: 'Industrial Prep Bay',
    keyGear: [
      'Custom Carbon Fiber 8S Heavy-Lift FPV Drone (140 km/h Top Velocity)',
      'RED Komodo-X 6K Global Shutter Cinema Camera Rig',
      'DJI Inspire 3 with Zenmuse X9-8K Air Gimbal',
      'Tilta Nucleus-M Wireless Dual-Operator Focus & Framing Station',
    ],
    operationalRole:
      'High-speed chase vehicle tracking on closed racetracks, acrobatic cliff diving, and dynamic 9:16 high-impact viral content requiring instant acceleration.',
    status: 'OPERATIONAL',
  },
  {
    id: 'stage-gamma',
    code: 'STG-03',
    name: 'Horological Macro & Tabletop Suite',
    classification: 'High-Speed Fluidics & Sub-Millimeter Product Cinema',
    dimensions: '18m × 12m Dedicated Tabletop Cleanroom',
    power: '200A Regulated High-Frequency Lighting Bus',
    ceiling: '5.2m Optical Overhead Truss',
    acousticRating: 'STC-60 Isolated Sound Dampening',
    keyGear: [
      'Phantom Flex 4K High-Speed Sensor (1,000 FPS at 4K RAW)',
      'Laowa 24mm T14 2x Macro Probe & Periscope Prism Optics',
      'Spintec High-Speed Motorized Rotating Rain Deflector',
      'Solenoid-Controlled Fluid & Droplet Synchronization Matrix',
    ],
    operationalRole:
      'Extreme close-up horological escapements, luxury fragrance mist collisions, liquid splash dynamics, and jewelry macro cinematography.',
    status: 'CURRENTLY SHOOTING',
  },
  {
    id: 'stage-delta',
    code: 'STG-04',
    name: 'DaVinci Resolve Master Color & Atmos Suite',
    classification: 'DCI Color Calibration & 7.1.4 Spatial Mastering',
    dimensions: '12m × 8m Calibrated Screening Theater',
    power: 'Clean Pure Sine Isolation Transformer',
    ceiling: '4.0m Tuned Bass Trap Acoustic Array',
    acousticRating: 'NC-15 Master Screening Isolation',
    keyGear: [
      'Flanders Scientific XMP310 31" QD-OLED 1,000-Nit Reference Monitor',
      'Barco DP4K-P Post-Production DCI Laser Projector',
      'Genelec The Ones 7.1.4 Dolby Atmos Immersive Audio Monitoring',
      'DaVinci Resolve Advanced Panel with ACES 1.3 Color Engine',
    ],
    operationalRole:
      'Sub-perceptual color grading from RAW sensor Log data to final DCI 4K theatrical deliverables, custom film print stock calibrations, and spatial sound mastering.',
    status: 'OPERATIONAL',
  },
];

interface VirtualProductionGridProps {
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const VirtualProductionGrid: React.FC<VirtualProductionGridProps> = ({
  onHoverAction,
  onHoverEnd,
}) => {
  const [activeStage, setActiveStage] = useState<SoundstageFacility>(SOUNDSTAGE_FLEET[0]);

  return (
    <section id="studio-floor" className="relative w-full py-28 px-6 lg:px-12 bg-[#08080A] border-t border-white/[0.08]">
      <div className="max-w-[1500px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-3 flex items-center gap-2">
              <span>[ 03 // STUDIO FLOOR ]</span>
              <span className="text-white/20">—</span>
              <span className="text-white/50">PHYSICAL INFRASTRUCTURE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-[-0.03em] font-normal">
              Soundstage Fleet
            </h2>
          </div>
          <div className="font-mono text-[10px] text-white/50 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>FACILITY TELEMETRY: ALL STAGES ONLINE</span>
            </div>
            <div className="text-white/30">|</div>
            <div>LONDON • DUBAI • VANCOUVER</div>
          </div>
        </div>

        {/* Master Studio Blueprint Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SOUNDSTAGE_FLEET.map((stage) => {
              const isSelected = stage.id === activeStage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    soundEngine.playShutterClick();
                    setActiveStage(stage);
                  }}
                  onMouseEnter={() => onHoverAction?.(stage.code)}
                  onMouseLeave={onHoverEnd}
                  className={`p-6 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#121216] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                      : 'border-white/[0.08] bg-[#050505]/70 hover:border-white/[0.2] hover:bg-[#0E0E12]'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] mb-3">
                    <span className="text-[#D4AF37] tracking-widest">{stage.code}</span>
                    <span
                      className={`px-2 py-0.5 text-[8px] uppercase font-semibold ${
                        stage.status === 'OPERATIONAL'
                          ? 'text-emerald-400 bg-emerald-400/10'
                          : 'text-[#E5C158] bg-[#E5C158]/10'
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-white uppercase tracking-tight mb-2">
                    {stage.name}
                  </h3>

                  <p className="font-sans text-xs text-silver/70 font-light leading-relaxed mb-4">
                    {stage.classification}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[9px] text-white/40">
                    <span>CLEARANCE: {stage.ceiling.split(' ')[0]}</span>
                    <span className="text-[#D4AF37]">POWER: {stage.power.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Stage Blueprint & Technical Run-Sheet */}
          <div className="lg:col-span-7 sticky top-28 border border-white/[0.1] bg-[#050505] p-8 sm:p-10 shadow-2xl">
            {/* Stage Identification Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] font-mono text-[9px] text-white/50">
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold text-xs">{activeStage.code}</span>
                <span>// BLUEPRINT PROTOCOL</span>
              </div>
              <div className="text-white/40">STATUS: {activeStage.status}</div>
            </div>

            <div className="my-8">
              <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight mb-3">
                {activeStage.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-silver/80 font-light leading-[1.8] max-w-2xl mb-8">
                {activeStage.operationalRole}
              </p>
            </div>

            {/* Architectural Grid Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pb-8 mb-8 border-b border-white/[0.08] font-mono text-[10px]">
              <div className="p-4 bg-[#0A0A0E] border border-white/[0.06]">
                <span className="text-white/40 block mb-1">STAGE DIMENSIONS</span>
                <span className="text-white font-medium text-xs">{activeStage.dimensions}</span>
              </div>
              <div className="p-4 bg-[#0A0A0E] border border-white/[0.06]">
                <span className="text-white/40 block mb-1">GRID ELECTRICAL CAPACITY</span>
                <span className="text-[#D4AF37] font-medium text-xs">{activeStage.power}</span>
              </div>
              <div className="p-4 bg-[#0A0A0E] border border-white/[0.06]">
                <span className="text-white/40 block mb-1">CEILING & RIGGING CLEARANCE</span>
                <span className="text-white font-medium text-xs">{activeStage.ceiling}</span>
              </div>
              <div className="p-4 bg-[#0A0A0E] border border-white/[0.06]">
                <span className="text-white/40 block mb-1">ACOUSTIC ISOLATION</span>
                <span className="text-white font-medium text-xs">{activeStage.acousticRating}</span>
              </div>
            </div>

            {/* Dedicated Equipment Arsenal */}
            <div>
              <div className="font-mono text-[10px] tracking-widest text-[#D4AF37] uppercase mb-4">
                // ARSENAL & CALIBRATED HARDWARE
              </div>
              <ul className="grid grid-cols-1 gap-2.5 font-mono text-[11px] text-white/70">
                {activeStage.keyGear.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-[#0A0A0E] border border-white/[0.04]">
                    <span className="text-[#D4AF37] font-bold">0{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
