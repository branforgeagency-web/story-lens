import React, { useState } from 'react';
import { useLenis } from '@/hooks/use-lenis';
import { useViewfinderCursor } from '@/hooks/use-viewfinder-cursor';
import { ViewfinderHUD } from '@/components/ui/ViewfinderHUD';
import { Navigation } from '@/components/ui/Navigation';
import { ApertureIrisShutter } from '@/components/hero/ApertureIrisShutter';
import { HeroSection } from '@/components/hero/HeroSection';
import { ShowreelVault } from '@/components/works/ShowreelVault';
import { ProjectDetailModal } from '@/components/works/ProjectDetailModal';
import { ExplodedCineRig } from '@/components/cine-rig/ExplodedCineRig';
import { VirtualProductionGrid } from '@/components/studio/VirtualProductionGrid';
import { DirectorsLedger } from '@/components/ledger/DirectorsLedger';
import { ClapperSlateContact } from '@/components/slate/ClapperSlateContact';
import { EngageAudienceShowcase } from '@/components/showcase/EngageAudienceShowcase';
import { CinematicGalleryReveal } from '@/components/gallery/CinematicGalleryReveal';
import { CapabilitiesSection } from '@/components/capabilities/CapabilitiesSection';
import { AscentReveal } from '@/components/manifesto/AscentReveal';
import { Footer } from '@/components/slate/Footer';
import { Project } from '@/types';

// Default showreel pseudo-project for direct hero launch
const MASTER_SHOWREEL_PROJECT: Project = {
  id: 'master-reel',
  title: '2026 Master Director\'s Reel',
  client: 'Story Lens Atelier',
  director: 'Story Lens Atelier',
  camera: 'ARRI Alexa 35 & RED 8K',
  format: '2.39:1 Anamorphic DCI',
  year: '2026',
  category: 'commercial',
  synopsis: 'A high-impact cinematic synthesis featuring high-velocity 140km/h vehicle pursuits, macro horological table-tops, 9:16 high-conversion viral hooks, and virtual production volume sets.',
  metrics: 'Over 120M+ Views & 48 International Awards',
  tags: ['Showreel', 'Automotive', 'Ad Reels', 'Soundstage', 'FPV'],
  aspectRatio: '2.39:1',
  colorGrade: {
    primaryTone: 'Kodak 5219 Master Gold Print',
    lutName: 'SL_MASTER_REEL_2026',
    ambientHex: '#D4AF37',
  },
};

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll engine
  useLenis();

  // Custom Camera Viewfinder HUD Cursor
  const {
    position,
    cursorMode,
    cursorLabel,
    isVisible: isCursorVisible,
    setCursorMode,
    setCursorLabel,
  } = useViewfinderCursor();

  // Selected project modal state
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenShowreelModal = (project?: Project) => {
    setActiveModalProject(project || MASTER_SHOWREEL_PROJECT);
    setIsModalOpen(true);
  };

  const handleHoverAction = (label: string) => {
    setCursorMode('play');
    setCursorLabel(label);
  };

  const handleHoverEnd = () => {
    setCursorMode('default');
    setCursorLabel('');
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-[#050505]">
      {/* High-Fashion Film Grain Overlay */}
      <div className="film-grain" />

      {/* Interactive Camera Viewfinder HUD Cursor */}
      <ViewfinderHUD
        x={position.x}
        y={position.y}
        mode={cursorMode}
        label={cursorLabel}
        isVisible={isCursorVisible}
        focalLength="35mm"
        aperture="f/1.4"
      />

      {/* Opening Mechanical Aperture Shutter */}
      <ApertureIrisShutter />

      {/* Luxury Navigation Header */}
      <Navigation
        onHoverAction={handleHoverAction}
        onHoverEnd={handleHoverEnd}
      />

      {/* Main Page Flow */}
      <main>
        {/* Hero Experience: The Aperture / Camera Reel with Follow Focus */}
        <HeroSection
          onOpenShowreelModal={() => handleOpenShowreelModal()}
          onHoverAction={handleHoverAction}
          onHoverEnd={handleHoverEnd}
        />

        {/* 01. The Showreel Vault (Curated Works) */}
        <ShowreelVault
          onSelectProject={(project) => handleOpenShowreelModal(project)}
          onHoverAction={handleHoverAction}
          onHoverEnd={handleHoverEnd}
        />

        {/* 02. Audience Engagement Marquee Showcase */}
        <EngageAudienceShowcase />

        {/* 03. Cinematic Gallery Reveal (3x3 Pinned Editorial Zoom) */}
        <CinematicGalleryReveal />

        {/* 05. Capabilities & Disciplines (Velour Productions Exact Architecture) */}
        <CapabilitiesSection />

        {/* 06. Ascent Editorial Film Manifesto (Staggered SkewX Character Reveal) */}
        <AscentReveal />

        {/* 04. The Exploded Cine-Rig (Interactive Breakdown) */}
        <ExplodedCineRig
          onHoverAction={handleHoverAction}
          onHoverEnd={handleHoverEnd}
        />

        {/* 03. Virtual Production & Studio Floor */}
        <VirtualProductionGrid
          onHoverAction={handleHoverAction}
          onHoverEnd={handleHoverEnd}
        />

        {/* 04. The Director's Ledger & RAW-to-Grade Slider */}
        <DirectorsLedger
          onHoverAction={handleHoverAction}
          onHoverEnd={handleHoverEnd}
        />

        {/* 05. The Slate / Contact Session (Clapperboard) */}
        <ClapperSlateContact
          onHoverAction={handleHoverAction}
          onHoverEnd={handleHoverEnd}
        />
      </main>

      {/* Architectural Footer */}
      <Footer />

      {/* Master Screening Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
