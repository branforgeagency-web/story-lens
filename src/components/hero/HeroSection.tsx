import React, { useState } from 'react';
import { HeroCinemaCanvas } from './HeroCinemaCanvas';
import { FollowFocusScrub } from './FollowFocusScrub';
import { soundEngine } from '@/lib/audio';

interface HeroSectionProps {
  onOpenShowreelModal: () => void;
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenShowreelModal,
  onHoverAction,
  onHoverEnd,
}) => {
  const [focusBlur, setFocusBlur] = useState<number>(0);
  const [currentDistance, setCurrentDistance] = useState<string>('3.0m');

  const handleFocusChange = (blur: number, markLabel: string) => {
    setFocusBlur(blur);
    setCurrentDistance(markLabel);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* Editorial Top Coordinate Rail */}
      <div className="relative z-10 max-w-[1500px] mx-auto w-full flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-[#D4AF37] uppercase pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span>STORY LENS ATELIER // VANCOUVER • LONDON • DUBAI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-white/40">
          <span>LAT: 49.2827° N</span>
          <span>•</span>
          <span>LONG: 123.1207° W</span>
          <span>•</span>
          <span>SENSOR: 35.4MP LARGE FORMAT</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <span>FOCUS RING:</span>
          <span className="text-[#D4AF37] font-semibold">{currentDistance}</span>
        </div>
      </div>

      {/* Asymmetrical Editorial Broadside */}
      <div className="relative z-10 max-w-[1500px] mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Monumental Typographic Authority */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-4 flex items-center gap-2">
            <span>[ 01 // PRODUCTION ARCHITECTURE ]</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl tracking-[-0.035em] leading-[0.98] text-white uppercase font-normal mb-6">
            Visceral<br />
            Perspectives.<br />
            <span className="italic font-light text-[#E5C158]">Cinematic Intent.</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-silver/80 leading-[1.8] font-light max-w-lg mb-8">
            Story Lens is an independent creative production studio. We translate brand moments into feeling-driven motion pictures across commercial cinema, high-converting 9:16 vertical campaigns, 140km/h acrobatic FPV chase tracking, and virtual production soundstages.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => {
                soundEngine.playShutterClick();
                onOpenShowreelModal();
              }}
              onMouseEnter={() => onHoverAction?.('WATCH 8K REEL')}
              onMouseLeave={onHoverEnd}
              className="flex items-center gap-3 px-6 py-3 rounded-none border border-[#D4AF37] bg-[#D4AF37] text-[#050505] font-mono text-[11px] font-semibold tracking-wider uppercase hover:bg-white hover:border-white transition-colors"
            >
              <span>Launch Master Cut</span>
              <span className="text-[10px]">▶</span>
            </button>

            <a
              href="#vault"
              onClick={() => soundEngine.playShutterClick()}
              onMouseEnter={() => onHoverAction?.('VIEW WORKS')}
              onMouseLeave={onHoverEnd}
              className="flex items-center gap-2 px-6 py-3 rounded-none border border-white/[0.15] bg-[#0A0A0C] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] font-mono text-[11px] tracking-wider uppercase transition-colors"
            >
              <span>Selected Works</span>
              <span className="text-xs">↓</span>
            </a>
          </div>

          {/* Technical Camera Package Spec */}
          <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 font-mono text-[9px] text-white/50">
            <div>
              <span className="block text-white/30 mb-0.5">PRIMARY OPTICS</span>
              <span className="text-white font-medium">Cooke Anamorphic /i 2.0x</span>
            </div>
            <div>
              <span className="block text-white/30 mb-0.5">CAMERA PACKAGE</span>
              <span className="text-white font-medium">ARRI Alexa 35 & RED 8K</span>
            </div>
            <div>
              <span className="block text-white/30 mb-0.5">HIGH-SPEED UNIT</span>
              <span className="text-white font-medium">Phantom Flex 4K (1000fps)</span>
            </div>
            <div>
              <span className="block text-white/30 mb-0.5">AERIAL PURSUIT</span>
              <span className="text-white font-medium">140km/h Custom Heavy FPV</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed 21:9 Anamorphic Canvas Viewport */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative w-full aspect-[21/9] sm:aspect-[2.39/1] border border-white/[0.12] bg-[#030304] overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            {/* Live Procedural Lighting Canvas */}
            <HeroCinemaCanvas blurAmount={focusBlur} />

            {/* Viewfinder Telemetry Overlay */}
            <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between">
              {/* Top Viewfinder Bar */}
              <div className="flex items-center justify-between font-mono text-[9px] tracking-widest text-white/70">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-rec-blink" />
                  <span className="text-white">REC</span>
                  <span className="text-[#D4AF37] ml-2">RAW 8K • 180.0° • ISO 800</span>
                </div>
                <div className="text-white/50">
                  COOKE ANAMORPHIC 65MM T2.3
                </div>
              </div>

              {/* Viewfinder Framing Reticle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </div>
              </div>

              {/* Play Trigger in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={() => {
                    soundEngine.playShutterClick();
                    onOpenShowreelModal();
                  }}
                  onMouseEnter={() => onHoverAction?.('WATCH 8K')}
                  onMouseLeave={onHoverEnd}
                  aria-label="Play Master Showreel"
                  className="h-16 w-16 rounded-full border border-[#D4AF37]/50 bg-[#050505]/80 backdrop-blur-md flex items-center justify-center text-[#D4AF37] hover:scale-110 hover:bg-[#D4AF37] hover:text-[#050505] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <span className="text-sm ml-1">▶</span>
                </button>
              </div>

              {/* Bottom Viewfinder Bar */}
              <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-white/60">
                <div>DCI 4K THEATRICAL CUT</div>
                <div className="text-[#D4AF37]">TIME: 00:01:24:18</div>
              </div>
            </div>
          </div>

          {/* Follow Focus Scrub Bar (Directly attached to canvas viewport) */}
          <div className="mt-3">
            <FollowFocusScrub
              onFocusChange={handleFocusChange}
              onHoverAction={onHoverAction}
              onHoverEnd={onHoverEnd}
            />
          </div>
        </div>
      </div>

      {/* Bottom Architectural Metadata Bar */}
      <div className="relative z-10 max-w-[1500px] mx-auto w-full pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-[9px] font-mono text-white/40 gap-4">
        <div>PRODUCTION CALL // ATELIER A01</div>
        <div className="flex items-center gap-6 text-[#D4AF37]">
          <span>VANCOUVER SOUNDSTAGE</span>
          <span>•</span>
          <span>MAYFAIR LONDON ALPHA</span>
          <span>•</span>
          <span>DUBAI AL QUOZ</span>
        </div>
        <div>ACES 1.3 COLOR WORKFLOW // 100% IN-HOUSE</div>
      </div>
    </section>
  );
};
