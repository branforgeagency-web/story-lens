import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

interface NavigationProps {
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onHoverAction, onHoverEnd }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Live SMPTE 24fps Rolling Timecode
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const totalSec = Math.floor(elapsed / 1000);
      const frames = Math.floor((elapsed % 1000) / 41.66);
      const sec = totalSec % 60;
      const min = Math.floor(totalSec / 60) % 60;
      const hr = Math.floor(totalSec / 3600) % 24;

      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frames)}`);
    }, 41);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleToggleSound = () => {
    soundEngine.playShutterClick();
    const nextState = soundEngine.toggleMute();
    setIsMuted(nextState);
  };

  const navLinks = [
    { label: 'The Vault', href: '#vault', num: '01' },
    { label: 'Cine-Rig', href: '#cine-rig', num: '02' },
    { label: 'Studio Floor', href: '#studio-floor', num: '03' },
    { label: 'The Ledger', href: '#ledger', num: '04' },
    { label: 'The Slate', href: '#slate', num: '05' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => soundEngine.playShutterClick()}
            onMouseEnter={() => onHoverAction?.('INDEX')}
            onMouseLeave={onHoverEnd}
            className="group flex items-center gap-3.5 focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-sm p-1"
          >
            <div className="relative h-8 w-8 flex items-center justify-center border border-[#D4AF37]/30 rounded-full transition-transform duration-500 group-hover:rotate-90">
              <span className="absolute h-2 w-2 rounded-full bg-[#D4AF37]" />
              <span className="absolute h-4 w-4 border border-dashed border-[#D4AF37]/50 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider font-semibold text-white uppercase group-hover:text-[#D4AF37] transition-colors">
                STORY LENS
              </span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#D4AF37]/80 uppercase">
                CINEMATIC ATELIER
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundEngine.playShutterClick()}
                onMouseEnter={() => onHoverAction?.(link.label.toUpperCase())}
                onMouseLeave={onHoverEnd}
                className="group relative flex items-center gap-1.5 py-1 text-xs font-sans text-white/70 hover:text-white transition-colors uppercase tracking-wider"
              >
                <span className="font-mono text-[9px] text-[#D4AF37]/60 group-hover:text-[#D4AF37]">
                  {link.num}
                </span>
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Controls & Telemetry */}
          <div className="flex items-center gap-4">
            {/* Live SMPTE Timecode (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 border border-white/[0.08] px-3 py-1.5 rounded-full font-mono text-[10px] text-white/70 bg-[#0A0A0C]">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-rec-blink" />
              <span className="text-[#D4AF37]">{timecode}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              onMouseEnter={() => onHoverAction?.(isMuted ? 'UNMUTE' : 'MUTE')}
              onMouseLeave={onHoverEnd}
              aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-white/[0.08] bg-[#0A0A0C] text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#D4AF37]" />}
            </button>

            {/* CTA Button */}
            <a
              href="#slate"
              onClick={() => soundEngine.playShutterClick()}
              onMouseEnter={() => onHoverAction?.('COMMISSION')}
              onMouseLeave={onHoverEnd}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#121216] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050505] font-mono text-[11px] font-medium tracking-wider uppercase transition-all duration-300"
            >
              <span>Commission Slate</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => {
                soundEngine.playShutterClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full border border-white/[0.08] bg-[#0A0A0C] text-white/80"
              aria-label="Toggle Mobile Navigation"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-300">
          <div className="font-mono text-[10px] text-[#D4AF37] tracking-[0.2em] mb-8">
            // STORY LENS DIRECTORY
          </div>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundEngine.playShutterClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-2xl font-display text-white hover:text-[#D4AF37] tracking-wider uppercase border-b border-white/[0.08] pb-3"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#D4AF37]/60">{link.num}</span>
              </a>
            ))}
          </nav>
          <div className="mt-12 flex flex-col gap-4 font-mono text-xs text-white/60">
            <div>LONDON • DUBAI • NEW YORK</div>
            <div className="text-[#D4AF37]">{timecode}</div>
          </div>
        </div>
      )}
    </>
  );
};
