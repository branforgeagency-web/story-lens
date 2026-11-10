import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';

interface ClapperSlateContactProps {
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const ClapperSlateContact: React.FC<ClapperSlateContactProps> = ({
  onHoverAction,
  onHoverEnd,
}) => {
  const [isClapping, setIsClapping] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scene] = useState<string>('01A');
  const [take, setTake] = useState<number>(1);
  const [roll] = useState<string>('A01');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    email: '',
    service: 'Commercial Cinema (8K ARRI & Cooke)',
    budget: '$15,000 — $35,000 (Commercial)',
    brief: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger Clapper Arm Snap Animation & Authentic Audio Sound!
    setIsClapping(true);
    soundEngine.playClapperSnap();

    setTimeout(() => {
      setTake((prev) => prev + 1);
      setIsClapping(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <section id="slate" className="relative w-full py-28 px-6 lg:px-12 bg-[#08080B] border-t border-white/[0.08]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-3 flex items-center justify-center gap-2">
            <span>[ 05 // THE PRODUCTION SLATE ]</span>
            <span className="text-white/20">—</span>
            <span className="text-white/50">DIRECT COMMISSION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-[-0.03em] font-normal mb-4">
            Call Action On Your Vision
          </h2>
          <p className="font-sans text-xs sm:text-sm text-silver/70 max-w-lg mx-auto font-light leading-relaxed">
            Fill in the production slate below. When ready, transmit your brief directly to lock production dates with our director's atelier.
          </p>
        </div>

        {/* The Digital Film Slate (Clapperboard) */}
        <div className="relative border border-white/[0.12] bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden">
          {/* Top Clapper Sticks (Black & White Chevrons) */}
          <div className="relative h-14 w-full bg-[#121216] border-b-2 border-black flex items-center overflow-hidden">
            {/* Lower stationary stick */}
            <div className="w-full h-full flex">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full skew-x-[-35deg] ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#121216]'
                  }`}
                />
              ))}
            </div>

            {/* Upper Hinged Clapper Stick */}
            <div
              style={{
                transformOrigin: 'left bottom',
                transform: isClapping ? 'rotate(0deg)' : 'rotate(-16deg)',
                transition: 'transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)',
              }}
              className="absolute -top-1 left-0 right-0 h-14 bg-[#121216] border-b-2 border-black flex shadow-2xl z-20"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full skew-x-[-35deg] ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#121216]'
                  }`}
                />
              ))}
            </div>

            {/* Clapper Hinge Bolt */}
            <div className="absolute left-3 top-3 h-4 w-4 rounded-full bg-[#D4AF37] border-2 border-black z-30 shadow-md" />
          </div>

          {/* Slate Body */}
          <div className="p-8 sm:p-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Slate Telemetry Header Row */}
                <div className="grid grid-cols-4 gap-3 font-mono text-center pb-6 border-b border-white/[0.08]">
                  <div className="p-3 bg-[#0A0A0E] border border-white/[0.06]">
                    <span className="text-[9px] text-white/40 block">SCENE</span>
                    <span className="text-sm font-bold text-[#D4AF37]">{scene}</span>
                  </div>
                  <div className="p-3 bg-[#0A0A0E] border border-white/[0.06]">
                    <span className="text-[9px] text-white/40 block">TAKE</span>
                    <span className="text-sm font-bold text-white">{take}</span>
                  </div>
                  <div className="p-3 bg-[#0A0A0E] border border-white/[0.06]">
                    <span className="text-[9px] text-white/40 block">ROLL</span>
                    <span className="text-sm font-bold text-white">{roll}</span>
                  </div>
                  <div className="p-3 bg-[#0A0A0E] border border-white/[0.06]">
                    <span className="text-[9px] text-white/40 block">FPS</span>
                    <span className="text-sm font-bold text-[#D4AF37]">24.00</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] mb-2">
                      [ PRODUCTION / BRAND ENTITY ]
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vance Automotive Group"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-[#09090C] border border-white/[0.1] text-white text-xs font-mono focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] mb-2">
                      [ PRODUCER DIRECT EMAIL ]
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@vance.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#09090C] border border-white/[0.1] text-white text-xs font-mono focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] mb-2">
                      [ PRIMARY PRODUCTION DISCIPLINE ]
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#09090C] border border-white/[0.1] text-white text-xs font-mono focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                    >
                      <option>Commercial Cinema (8K ARRI & Cooke)</option>
                      <option>Ad Reel Campaign (9:16 High-Velocity Native)</option>
                      <option>High-Speed Aerial & FPV Drone Unit (140km/h)</option>
                      <option>Virtual Soundstage & Bolt X Robotic Motion</option>
                      <option>Turnkey Full-Spectrum Production</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] mb-2">
                      [ ESTIMATED PRODUCTION CAPITAL ]
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#09090C] border border-white/[0.1] text-white text-xs font-mono focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                    >
                      <option>$7,500 — $15,000 (Ad Reels & Social Campaign)</option>
                      <option>$15,000 — $35,000 (Commercial Cinema Spot)</option>
                      <option>$35,000 — $75,000 (Global Brand Manifesto)</option>
                      <option>$75,000+ (Annual Brand Studio Partnership)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] mb-2">
                    [ PROJECT BRIEF & CREATIVE TREATMENT ]
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Outline your creative treatment, desired timeline, target locations, or reference films..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full px-4 py-3 bg-[#09090C] border border-white/[0.1] text-white text-xs font-mono focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                  />
                </div>

                {/* Submit Clapper Action Button */}
                <button
                  type="submit"
                  onMouseEnter={() => onHoverAction?.('CLAP SLATE')}
                  onMouseLeave={onHoverEnd}
                  className="w-full mt-2 py-4 border border-[#D4AF37] bg-[#D4AF37] text-[#050505] font-mono text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-white hover:border-white transition-colors"
                >
                  <span>CLAP SLATE & TRANSMIT BRIEF</span>
                  <span>▶</span>
                </button>
              </form>
            ) : (
              /* Success Confirmation State */
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="font-mono text-xs text-[#D4AF37] tracking-widest uppercase mb-4">
                  // TAKE 0{take} LOGGED TO DIRECTOR'S DESK
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
                  SLATE CLAPPED // BRIEF TRANSMITTED
                </h3>
                <p className="font-sans text-xs sm:text-sm text-silver/80 max-w-md font-light leading-[1.8] mb-8">
                  Our executive producer will evaluate your brief against our current soundstage schedule and return a calibrated director's treatment within 12 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 border border-white/[0.15] text-xs font-mono text-white/70 hover:text-white hover:border-[#D4AF37] uppercase tracking-wider"
                >
                  LOG ANOTHER TAKE / RESET SLATE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
