import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { videos } from '@/assets';
import { FocusReticle } from '@/components/layout/FocusReticle';
import { MenuIcon } from '@/components/ui/Icons';
import { useMenu } from '@/context/MenuContext';
import { CONTACT_HREF } from '@/data/navigation';
import { useFocusReticle } from '@/hooks';
import { playShutter, scrollToId } from '@/lib';
import './Hero.css';

/** Banner: looping background video, top bar, bottom telemetry. The logo is <BrandMonument/>. */
export function Hero() {
  const { open } = useMenu();
  const heroRef = useRef<HTMLElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  useFocusReticle(heroRef, reticleRef);

  return (
    <section className="layr-banner-section" id="hero-banner" ref={heroRef}>
      {createPortal(<FocusReticle ref={reticleRef} />, document.body)}

      <div className="layr-banner-video-wrap" aria-hidden="true">
        <video
          className="layr-banner-video"
          src={videos.banner}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="layr-banner-video-shade" />
      </div>

      <div className="layr-top-bar">
        <div className="layr-top-left">
          <div className="layr-accent-square" title="Story Lens Core" />
        </div>

        <div className="layr-top-right">
          <div className="layr-framing-corner layr-corner-tl" />
          <div className="layr-framing-corner layr-corner-tr" />
          <div className="layr-framing-corner layr-corner-bl" />
          <div className="layr-framing-corner layr-corner-br" />

          <a href={CONTACT_HREF} className="btn-layr-project" onClick={playShutter}>
            START A PROJECT
          </a>

          <button
            className="btn-layr-menu"
            aria-label="Open Navigation Menu"
            onClick={() => {
              playShutter();
              open();
            }}
          >
            <span>MENU</span>
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Reserves vertical space; the real logo is the fixed <BrandMonument/>. */}
      <div className="layr-center-content">
        <div className="layr-brand-placeholder" aria-hidden="true" />
      </div>

      <div className="layr-bottom-bar">
        <div>
          <button
            className="layr-scroll-cta"
            aria-label="Scroll to featured works"
            onClick={() => {
              playShutter();
              scrollToId('editorial-reel');
            }}
          >
            <span className="layr-scroll-circle">↓</span>
            <span>SCROLL</span>
          </button>
        </div>

        <div className="layr-disciplines-center">COMMERCIAL. AD REELS. DRONE. STUDIO.</div>

        <div className="layr-manifesto-right">
          EVERY FRAME HAS A STORY. INDEPENDENT PRODUCTION STUDIO.
        </div>
      </div>
    </section>
  );
}

