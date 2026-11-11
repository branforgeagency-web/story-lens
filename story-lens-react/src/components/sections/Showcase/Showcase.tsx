import { FallbackImage } from '@/components/ui/FallbackImage';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { CONTACT_HREF } from '@/data/navigation';
import { showcaseCards } from '@/data/showcase';
import { playShutter } from '@/lib';
import './Showcase.css';

export function Showcase() {
  return (
    <section className="sl-showcase-section" id="showcase">
      <div className="sl-showcase-glow-stage" aria-hidden="true">
        <div className="sl-glow-top" />
        <div className="sl-glow-bottom-left" />
        <div className="sl-glow-bottom-right" />
      </div>

      <div className="sl-showcase-center-content">
        <div className="sl-showcase-badge">
          <span className="sl-badge-dot" />
          <span>JOIN OVER 100,000 HAPPY CREATORS &amp; VISIONARIES</span>
        </div>

        <h2 className="sl-showcase-headline">
          ENGAGE AUDIENCES
          <br />
          WITH <span className="sl-gold-shimmer">STUNNING VIDEOS</span>
        </h2>

        <p className="sl-showcase-sub">
          Boost your brand with high-impact short videos and cinematic reels created by talented
          professionals ready to move your business forward.
        </p>

        <div className="sl-showcase-cta-wrap">
          <a href={CONTACT_HREF} className="sl-btn-showcase-cta" onClick={playShutter}>
            <span>GET STARTED</span>
            <ArrowRightIcon strokeLinejoin="round" />
          </a>
        </div>
      </div>

      <div className="sl-showcase-marquee-stage">
        <div className="sl-marquee-track">
          {/* Set 1 (primary) and Set 2 (seamless infinite clone) */}
          {[false, true].map((isClone) => (
            <div key={String(isClone)} className="sl-marquee-group" aria-hidden={isClone || undefined}>
              {showcaseCards.map((card, i) => (
                <div
                  key={card.title}
                  className="sl-marquee-card"
                  style={{ transform: card.transform }}
                  data-title={isClone ? undefined : card.title}
                  onClick={playShutter}
                >
                  <FallbackImage
                    src={card.image}
                    fallback={card.fallback}
                    alt={isClone ? '' : `Creative showcase ${i + 1}`}
                    loading={isClone ? 'lazy' : card.loading}
                  />
                  <div className="sl-marquee-card-vignette" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
