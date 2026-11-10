import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Film } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    soundEngine.playShutterClick();
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#050505]/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#08080B] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        {/* Modal Top Telemetry Header */}
        <div className="px-6 py-3.5 border-b border-white/[0.08] bg-[#0A0A0E] flex items-center justify-between font-mono text-[10px] text-white/70">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-rec-blink" />
            <span className="text-[#D4AF37] font-semibold">{project.client.toUpperCase()}</span>
            <span className="text-white/40">|</span>
            <span>{project.title.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/50">{project.camera} • {project.format}</span>
            <button
              onClick={() => {
                soundEngine.playShutterClick();
                onClose();
              }}
              className="h-7 w-7 rounded-full border border-white/[0.1] flex items-center justify-center hover:bg-white/10 hover:text-[#D4AF37] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 16:9 / 2.39:1 Cinema Projection Screen */}
        <div className="relative w-full aspect-video bg-[#030304] flex items-center justify-center overflow-hidden">
          {/* Animated Canvas Cinema Simulation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 1280 720" className="w-full h-full object-cover">
              <defs>
                <radialGradient id="modalGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={project.colorGrade.ambientHex} stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#050505" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#030304" stopOpacity="1" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#modalGlow)" />
              {/* Dynamic Film Aperture Overlay */}
              <circle cx="640" cy="360" r="180" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" strokeDasharray="8,8" />
              <circle cx="640" cy="360" r="80" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <line x1="620" y1="360" x2="660" y2="360" stroke="#FFF" strokeWidth="2" />
              <line x1="640" y1="340" x2="640" y2="380" stroke="#FFF" strokeWidth="2" />
              <text x="640" y="420" fill="#FFFFFF" textAnchor="middle" fontFamily="Space Mono" fontSize="13" letterSpacing="3">
                {project.title.toUpperCase()}
              </text>
              <text x="640" y="445" fill={project.colorGrade.ambientHex} textAnchor="middle" fontFamily="Space Mono" fontSize="10" letterSpacing="2">
                NATIVE 8K DCI MASTER SCREENING
              </text>
            </svg>
          </div>

          {/* Letterbox Mask */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-black/90 border-b border-white/[0.04] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/90 border-t border-white/[0.04] pointer-events-none" />

          {/* Play/Pause Center Trigger */}
          <button
            onClick={() => {
              soundEngine.playShutterClick();
              setIsPlaying(!isPlaying);
            }}
            className="relative z-10 h-20 w-20 rounded-full border border-[#D4AF37] bg-[#050505]/70 backdrop-blur-md flex items-center justify-center text-[#D4AF37] hover:scale-105 hover:bg-[#D4AF37] hover:text-[#050505] transition-all"
          >
            {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
          </button>

          {/* Progress Scrubber */}
          <div className="absolute bottom-11 left-6 right-6 z-20">
            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls & Production Notes */}
        <div className="p-6 bg-[#08080C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>OFFICIAL CLIENT RELEASE // {project.year}</span>
            </div>
            <p className="font-sans text-xs text-silver/80 max-w-xl font-light">
              {project.synopsis}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playShutterClick();
                setIsMuted(!isMuted);
              }}
              className="px-4 py-2 rounded-full border border-white/[0.1] bg-[#0F0F14] text-white/80 hover:border-[#D4AF37]/50 font-mono text-xs flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5 text-[#D4AF37]" />}
              <span>{isMuted ? 'UNMUTE AUDIO' : 'SPATIAL DOLBY'}</span>
            </button>

            <a
              href="#slate"
              onClick={() => {
                soundEngine.playShutterClick();
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-[#D4AF37] text-[#050505] font-mono text-xs font-semibold uppercase hover:bg-white transition-colors"
            >
              Commission Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
