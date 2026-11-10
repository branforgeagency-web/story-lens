import React from 'react';
import { MetricProof } from '@/types';
import { RawToGradeSlider } from './RawToGradeSlider';

const PROOF_METRICS: MetricProof[] = [
  {
    id: 'awards',
    value: '48',
    suffix: '+',
    label: 'International Film Awards',
    context: 'Cannes Lions, D&AD Yellow Pencils, British Arrows & Clio Grand Prix',
  },
  {
    id: 'views',
    value: '1.2',
    suffix: 'B+',
    label: 'Organic Social Impressions',
    context: 'Across luxury automotive, horology, and high-conversion vertical campaigns',
  },
  {
    id: 'inhouse',
    value: '100',
    suffix: '%',
    label: 'In-House Production Fleet',
    context: 'Zero outsourced camera packages; proprietary optics & DCI grading suites',
  },
  {
    id: 'speed',
    value: '140',
    suffix: ' km/h',
    label: 'FPV Pursuit Top Velocity',
    context: 'High-speed closed circuit aerial tracking with RED 6K global shutter',
  },
];

interface DirectorsLedgerProps {
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const DirectorsLedger: React.FC<DirectorsLedgerProps> = ({
  onHoverAction,
  onHoverEnd,
}) => {
  return (
    <section id="ledger" className="relative w-full py-28 px-6 lg:px-12 bg-[#050505] border-t border-white/[0.08]">
      <div className="max-w-[1500px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-3 flex items-center gap-2">
              <span>[ 04 // THE DIRECTOR'S LEDGER ]</span>
              <span className="text-white/20">—</span>
              <span className="text-white/50">VERIFIED METRICS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-[-0.03em] font-normal">
              Verified Distinction
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-silver/70 max-w-md font-light leading-relaxed">
            Every camera roll is accounted for. We substantiate creative prestige through measurable commercial velocity and global film honors.
          </p>
        </div>

        {/* High-Contrast Editorial Metrics Broadside */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] mb-24">
          {PROOF_METRICS.map((metric, idx) => (
            <div
              key={metric.id}
              className="p-8 sm:p-10 bg-[#070709] hover:bg-[#0C0C10] transition-colors flex flex-col justify-between"
            >
              <div className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase mb-8 flex items-center justify-between">
                <span>// METRIC 0{idx + 1}</span>
                <span className="text-white/20">✛</span>
              </div>

              <div>
                <div className="font-display text-5xl sm:text-6xl lg:text-7xl text-white font-normal tracking-[-0.03em] mb-3 flex items-baseline">
                  <span>{metric.value}</span>
                  <span className="text-[#D4AF37] text-3xl sm:text-4xl ml-1 font-light">{metric.suffix}</span>
                </div>
                <h4 className="font-display text-base text-white uppercase tracking-wider mb-2">
                  {metric.label}
                </h4>
                <p className="font-sans text-xs text-silver/50 font-light leading-relaxed">
                  {metric.context}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabbed Case Study: RAW to Master Grade Alchemy */}
        <div className="border border-white/[0.1] bg-[#07070A] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.25em] block mb-2">
              [ OPTICAL SCIENCE DEMONSTRATION // DAVINCI YRGB MASTER THEATER ]
            </span>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight mb-4 font-normal">
              From Sensor Latitude to Master Color Alchemy
            </h3>
            <p className="font-sans text-xs sm:text-sm text-silver/80 leading-[1.8] font-light">
              We do not apply off-the-shelf LUTs. Our colorists calibrate custom film stock emulations in DaVinci Resolve with sub-perceptual tone curves to give your brand an irreplaceable cinematic signature across both wide-gamut DCI theatrical projections and high-converting mobile displays.
            </p>
          </div>

          <RawToGradeSlider
            onHoverAction={onHoverAction}
            onHoverEnd={onHoverEnd}
          />
        </div>
      </div>
    </section>
  );
};
