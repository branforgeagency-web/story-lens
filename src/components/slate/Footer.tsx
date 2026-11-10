import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/lib/audio';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [londonTime, setLondonTime] = useState<string>('');
  const [dubaiTime, setDubaiTime] = useState<string>('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setLondonTime(now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour12: false }));
      setDubaiTime(now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Dubai', hour12: false }));
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.08] pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                <span className="font-display text-2xl font-semibold tracking-wider text-white uppercase">
                  STORY LENS
                </span>
              </div>
              <p className="font-sans text-xs text-silver/70 font-light leading-relaxed max-w-sm mb-6">
                A premier cinematic media production house crafting high-octane commercial cinematography, viral ad reels, high-velocity drone tracking, and virtual production soundstages.
              </p>
            </div>

            <div className="font-mono text-[10px] text-[#D4AF37]/80 uppercase tracking-widest">
              FORGED IN PRECISION // ARRI • RED • COOKE
            </div>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
              // ARCHIVE
            </h4>
            <ul className="flex flex-col gap-2.5 font-mono text-xs text-white/60">
              <li><a href="#vault" onClick={() => soundEngine.playShutterClick()} className="hover:text-white transition-colors">The Vault</a></li>
              <li><a href="#cine-rig" onClick={() => soundEngine.playShutterClick()} className="hover:text-white transition-colors">Cine-Rig Breakdown</a></li>
              <li><a href="#studio-floor" onClick={() => soundEngine.playShutterClick()} className="hover:text-white transition-colors">Soundstage Fleet</a></li>
              <li><a href="#ledger" onClick={() => soundEngine.playShutterClick()} className="hover:text-white transition-colors">Director's Ledger</a></li>
              <li><a href="#slate" onClick={() => soundEngine.playShutterClick()} className="hover:text-white transition-colors">Production Slate</a></li>
            </ul>
          </div>

          {/* Soundstage Locations */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
              // ATELIERS & SOUNDSTAGES
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-xs text-white/70">
              <li>
                <span className="text-white block font-medium">LONDON HEADQUARTERS</span>
                <span className="text-white/40">Mayfair W1K • Soundstage Alpha</span>
              </li>
              <li>
                <span className="text-white block font-medium">DUBAI CINE-STUDIO</span>
                <span className="text-white/40">Al Quoz Creative Quarter 1</span>
              </li>
              <li>
                <span className="text-white block font-medium">NEW YORK OPTICAL LAB</span>
                <span className="text-white/40">Brooklyn Navy Yard Stage 4</span>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
                // CONCIERGE
              </h4>
              <a
                href="mailto:directors@storylens.studio"
                className="font-mono text-xs text-[#D4AF37] hover:underline block mb-2"
              >
                directors@storylens.studio
              </a>
              <span className="font-mono text-[10px] text-white/40 block">
                VIP Private Desk: +44 20 7946 0912
              </span>
            </div>

            <div className="pt-4">
              <span className="px-2.5 py-1 rounded-full bg-[#121216] border border-[#D4AF37]/30 text-[9px] font-mono text-[#D4AF37]">
                STATUS: BOOKING Q1 / Q2
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Live Clocks & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/40">
          <div>
            &copy; {new Date().getFullYear()} STORY LENS PRODUCTIONS LTD. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <div>
              LONDON: <span className="text-[#D4AF37]">{londonTime || '12:00:00'}</span> GMT
            </div>
            <div>
              DUBAI: <span className="text-[#D4AF37]">{dubaiTime || '16:00:00'}</span> GST
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
