import React, { useState } from 'react';
import { Project } from '@/types';
import { Play, ArrowUpRight, Film, SlidersHorizontal } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

const CURATED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Shadow Sprint',
    client: 'Porsche Motorsport',
    director: 'Story Lens Atelier',
    camera: 'ARRI ALEXA 35',
    format: '2.39:1 Anamorphic 4K',
    year: '2026',
    category: 'commercial',
    synopsis: 'A high-velocity night pursuit filmed across Alpine hairpins with high-speed chase vehicles and vintage Cooke anamorphic primes.',
    metrics: '$2.8M Campaign Media Value',
    tags: ['Automotive', 'Anamorphic', 'Night Exterior', 'ARRI Look'],
    aspectRatio: '2.39:1',
    colorGrade: {
      primaryTone: 'Tungsten Gold & Obsidian',
      lutName: 'SL_KODAK_5219_GOLD',
      ambientHex: '#D4AF37',
    },
  },
  {
    id: 'proj-2',
    title: 'L\'Heure d\'Or',
    client: 'Vacheron Constantin',
    director: 'Story Lens Atelier',
    camera: 'Phantom Flex 4K',
    format: '1000 FPS Ultra Macro',
    year: '2026',
    category: 'studio-macro',
    synopsis: 'Sub-millimeter horological precision capturing gold liquid splashes and balance-wheel escapements with Bolt X cinebot repeatable moves.',
    metrics: 'Grand Prix Design Award 2026',
    tags: ['Horology', 'High-Speed', 'Bolt X Robot', 'Macro Probe'],
    aspectRatio: '16:9',
    colorGrade: {
      primaryTone: 'Champagne Warmth & Platinum',
      lutName: 'SL_HOROLOGY_ACES_04',
      ambientHex: '#F5E298',
    },
  },
  {
    id: 'proj-3',
    title: 'Monolith Ridge',
    client: 'Nordic Architectural',
    director: 'Story Lens Atelier',
    camera: 'DJI Inspire 3 8K',
    format: '8K ProRes RAW Cinema',
    year: '2025',
    category: 'aerial-fpv',
    synopsis: 'Acrobatic aerial surveys tracking shear fjord cliff architecture in extreme wind envelopes with sub-millimeter GPS lock.',
    metrics: '14M+ Organic Impressions',
    tags: ['FPV Dive', '8K RAW', 'Highlands', 'Architectural'],
    aspectRatio: '2.39:1',
    colorGrade: {
      primaryTone: 'Cool Slate & Golden Horizon',
      lutName: 'SL_NORDIC_COAST_DLOG',
      ambientHex: '#9AD7E8',
    },
  },
  {
    id: 'proj-4',
    title: 'Velocità: Genesis',
    client: 'Velocità F1 Apparel',
    director: 'Story Lens Atelier',
    camera: 'RED V-Raptor 8K',
    format: '9:16 Vertical Viral Pack',
    year: '2026',
    category: 'ad-reel',
    synopsis: 'Algorithm-engineered high-impact vertical video ads with micro-second sensory hooks, match cuts, and custom spatial sound design.',
    metrics: '380% ROAS on Meta & TikTok',
    tags: ['Ad Reel', '9:16 Viral', 'Kinetic Cut', 'Sound Design'],
    aspectRatio: '9:16',
    colorGrade: {
      primaryTone: 'High-Contrast Cyber Gold',
      lutName: 'SL_VIRAL_RETENTION_02',
      ambientHex: '#E5C158',
    },
  },
  {
    id: 'proj-5',
    title: 'Aura of Obsidian',
    client: 'Noir Parfums Paris',
    director: 'Story Lens Atelier',
    camera: 'ARRI Alexa Mini LF',
    format: 'Tabletop High-Speed',
    year: '2025',
    category: 'commercial',
    synopsis: 'High-contrast lighting study on obsidian glass and amber perfume mist using synchronized strobe light arrays and motorized tilt-shift optics.',
    metrics: 'European Luxury Film Gold',
    tags: ['Beauty & Luxury', 'Lighting Study', 'Soundstage A', 'Dolby Atmos'],
    aspectRatio: '2.39:1',
    colorGrade: {
      primaryTone: 'Deep Obsidian & Amber Foil',
      lutName: 'SL_PARFUM_NOIR_CINE',
      ambientHex: '#C5A059',
    },
  },
];

interface ShowreelVaultProps {
  onSelectProject: (project: Project) => void;
  onHoverAction?: (label: string) => void;
  onHoverEnd?: () => void;
}

export const ShowreelVault: React.FC<ShowreelVaultProps> = ({
  onSelectProject,
  onHoverAction,
  onHoverEnd,
}) => {
  const [activeProject, setActiveProject] = useState<Project>(CURATED_PROJECTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all'
    ? CURATED_PROJECTS
    : CURATED_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="vault" className="relative w-full py-28 px-6 bg-[#0A0A0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              <span>01 // THE SHOWREEL VAULT</span>
              <span className="text-white/30">—</span>
              <span className="text-white/60">CURATED ARCHIVE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              Master Cinematography
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            {[
              { id: 'all', label: 'ALL WORKS' },
              { id: 'commercial', label: 'COMMERCIAL' },
              { id: 'ad-reel', label: 'AD REELS (9:16)' },
              { id: 'aerial-fpv', label: 'DRONE & FPV' },
              { id: 'studio-macro', label: 'STUDIO & TABLETOP' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playShutterClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat.id
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050505] font-semibold'
                    : 'border-white/[0.08] text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Dual-Column Vault Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Project List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {filteredProjects.map((project, idx) => {
              const isCurrent = project.id === activeProject.id;
              return (
                <div
                  key={project.id}
                  onClick={() => {
                    soundEngine.playShutterClick();
                    setActiveProject(project);
                  }}
                  onMouseEnter={() => {
                    setActiveProject(project);
                    onHoverAction?.('PREVIEW');
                  }}
                  onMouseLeave={onHoverEnd}
                  className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'border-[#D4AF37]/50 bg-[#121216] shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
                      : 'border-white/[0.06] bg-[#050505]/60 hover:border-white/[0.15] hover:bg-[#121216]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span className="text-[#D4AF37]">0{idx + 1} // {project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display text-2xl text-white group-hover:text-[#E5C158] transition-colors uppercase tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 font-mono text-[10px] text-white/60">
                    <span>{project.camera}</span>
                    <span>•</span>
                    <span className="text-[#D4AF37]/90">{project.format}</span>
                  </div>

                  {isCurrent && (
                    <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#D4AF37] font-semibold">
                        {project.metrics}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEngine.playShutterClick();
                          onSelectProject(project);
                        }}
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-white uppercase hover:text-[#D4AF37]"
                      >
                        <span>Launch Film</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Impact Pinned Preview Stage */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="relative rounded-2xl border border-[#D4AF37]/25 overflow-hidden bg-[#050505] shadow-2xl">
              {/* Top Film Slate Bar */}
              <div className="px-5 py-3 border-b border-white/[0.08] bg-[#0A0A0C] flex items-center justify-between font-mono text-[9px] tracking-wider text-white/70">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-rec-blink" />
                  <span>PREVIEW: {activeProject.client.toUpperCase()}</span>
                </div>
                <div className="text-[#D4AF37]">
                  LUT: {activeProject.colorGrade.lutName}
                </div>
              </div>

              {/* Main Media Visualizer Canvas */}
              <div
                onClick={() => {
                  soundEngine.playShutterClick();
                  onSelectProject(activeProject);
                }}
                onMouseEnter={() => onHoverAction?.('PLAY REEL')}
                onMouseLeave={onHoverEnd}
                className="relative aspect-video w-full bg-[#030304] flex items-center justify-center cursor-pointer group overflow-hidden"
              >
                {/* SVG Artistic Cinema Frame */}
                <svg viewBox="0 0 800 450" className="w-full h-full object-cover">
                  <defs>
                    <radialGradient id={`glow-${activeProject.id}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={activeProject.colorGrade.ambientHex} stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="streak" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor={activeProject.colorGrade.ambientHex} stopOpacity="0.8" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  
                  {/* Backdrop */}
                  <rect width="100%" height="100%" fill="#050505" />
                  <rect width="100%" height="100%" fill={`url(#glow-${activeProject.id})`} />

                  {/* Horizontal Anamorphic Ray */}
                  <rect x="0" y="223" width="800" height="4" fill="url(#streak)" />

                  {/* 2.39:1 Letterbox Lines */}
                  <line x1="0" y1="50" x2="800" y2="50" stroke="rgba(255,255,255,0.1)" strokeDasharray="4,4" />
                  <line x1="0" y1="400" x2="800" y2="400" stroke="rgba(255,255,255,0.1)" strokeDasharray="4,4" />

                  {/* Geometric Framing */}
                  <circle cx="400" cy="225" r="120" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" strokeDasharray="6,6" />
                  <circle cx="400" cy="225" r="40" fill="none" stroke={activeProject.colorGrade.ambientHex} strokeWidth="1.5" />
                  <line x1="380" y1="225" x2="420" y2="225" stroke="#FFFFFF" strokeWidth="1" />
                  <line x1="400" y1="205" x2="400" y2="245" stroke="#FFFFFF" strokeWidth="1" />
                </svg>

                {/* Center Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-16 w-16 rounded-full border border-[#D4AF37] bg-[#050505]/70 backdrop-blur-md flex items-center justify-center text-[#D4AF37] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#050505] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Bottom Overlay Tags */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-white/70">
                  <div className="flex gap-2">
                    {activeProject.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-[#0A0A0C]/90 border border-white/[0.08]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-[#D4AF37]">CLICK TO EXPAND SCREENING</div>
                </div>
              </div>

              {/* Technical Description & Metadata Drawer */}
              <div className="p-6 bg-[#0E0E12] border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-xl text-white uppercase tracking-wide">
                    {activeProject.title}
                  </h4>
                  <span className="font-mono text-xs text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                    {activeProject.format}
                  </span>
                </div>
                <p className="font-sans text-xs text-silver/80 leading-relaxed mb-4 font-light">
                  {activeProject.synopsis}
                </p>

                {/* Cine Specs Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06] font-mono text-[10px]">
                  <div>
                    <span className="text-white/40 block">DIRECTOR:</span>
                    <span className="text-white">{activeProject.director}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">CAMERA SYSTEM:</span>
                    <span className="text-[#D4AF37]">{activeProject.camera}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">COLOR SCIENCE:</span>
                    <span className="text-white/80">{activeProject.colorGrade.primaryTone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
