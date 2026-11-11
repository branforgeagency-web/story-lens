import { useRef } from 'react';
import { logos } from '@/assets';
import { ArrowDownIcon, MenuIcon } from '@/components/ui/Icons';
import { useMenu } from '@/context/MenuContext';
import { CONTACT_HREF } from '@/data/navigation';
import { reelCards } from '@/data/reel';
import { useReelEngine } from '@/hooks';
import { playShutter, scrollToId } from '@/lib';
import './EditorialReel.css';

/** The track repeats the card set three times so the drift can wrap seamlessly. */
const REEL_SETS = 3;

export function EditorialReel() {
  const { open } = useMenu();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useReelEngine({ section: sectionRef, container: containerRef, track: trackRef });

  return (
    <section className="layr-editorial-section" id="editorial-reel" ref={sectionRef}>
      <div className="reel-top-bar">
        <div className="reel-top-left">
          <img src={logos.dark} alt="Story Lens Media House" className="reel-top-logo" />
        </div>
        <div className="reel-top-right">
          <a href={CONTACT_HREF} className="btn-reel-project">
            START A PROJECT
          </a>
          <button
            className="btn-reel-menu"
            aria-label="Open Navigation Directory"
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

      <div className="reel-content-stage">
        <div className="reel-media-scroll-container" ref={containerRef}>
          <div className="reel-media-track" ref={trackRef}>
            {Array.from({ length: REEL_SETS }, (_, set) =>
              reelCards.map((card) => (
                <div
                  key={`${set}-${card.title}`}
                  className="reel-card"
                  data-title={card.title}
                  data-category={card.category}
                  onClick={playShutter}
                >
                  <div className="reel-card-img-wrap">
                    <img src={card.image} alt={card.alt} className="reel-card-img" />
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      </div>

      <div className="reel-bottom-bar">
        <button
          className="reel-scroll-cta"
          aria-label="Scroll to Layers Philosophy"
          onClick={() => {
            playShutter();
            scrollToId('showcase');
          }}
        >
          <span className="reel-scroll-circle">
            <ArrowDownIcon />
          </span>
          <span>SCROLL</span>
        </button>
        <div className="reel-tagline-right">PHOTO. VIDEO. CONTENT.</div>
      </div>
    </section>
  );
}
