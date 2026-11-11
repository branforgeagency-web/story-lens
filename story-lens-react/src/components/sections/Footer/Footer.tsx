import { useRef } from 'react';
import { logos } from '@/assets';
import { bokeh, sceneLayersBack, sceneLayersFront } from '@/data/footerScene';
import { CONTACT_EMAIL, CONTACT_HREF, footerNavGroups } from '@/data/navigation';
import { useFooterParallax, useWorldClock } from '@/hooks';
import type { CSSVars } from '@/lib';
import './Footer.css';

const Layer = ({ name, src, depth }: { name: string; src: string; depth: number }) => (
  <img
    className={`slf-layer slf-l-${name}`}
    src={src}
    alt=""
    draggable={false}
    style={{ '--depth': depth } as CSSVars}
  />
);

export function Footer() {
  const pageRef = useRef<HTMLElement>(null);
  const london = useWorldClock('Europe/London');
  const dubai = useWorldClock('Asia/Dubai');
  useFooterParallax(pageRef);

  return (
    <section className="slf-page" id="slFooter" ref={pageRef}>
      {/* Illustrated scene, back → front, each layer with its own parallax depth */}
      <div className="slf-scene" aria-hidden="true">
        {sceneLayersBack.map((l) => (
          <Layer key={l.name} {...l} />
        ))}

        <div className="slf-mist slf-mist-1" />
        <div className="slf-mist slf-mist-2" />

        <svg className="slf-birds" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className="slf-bird slf-bird-1">
            <path d="M9 38C15 31 22 31 29 37C36 30 44 29 52 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </g>
          <g className="slf-bird slf-bird-2">
            <path d="M72 56C77 51 82 51 87 55C92 50 97 50 102 54" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          </g>
          <g className="slf-bird slf-bird-3">
            <path d="M125 26C130 20 136 20 141 25C146 20 152 20 157 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>

        {sceneLayersFront.map((l) => (
          <Layer key={l.name} {...l} />
        ))}
        <div className="slf-scene-shade" />
      </div>

      {/* Floating gold bokeh */}
      <div className="slf-bokeh-layer" aria-hidden="true">
        {bokeh.map((b, i) => (
          <span
            key={i}
            className={`slf-bokeh slf-bokeh-${i + 1}`}
            style={{ '--l': b.left, '--t': b.top, '--s': b.size, '--d': b.delay, '--dur': b.duration } as CSSVars}
          />
        ))}
      </div>

      <div className="slf-message">
        <p className="slf-eyebrow">
          <span />
          Every frame has a story
        </p>
        <h2 className="slf-headline">
          <span>Brand moments,</span>
          <span>shaped into cinema</span>
          <span>
            worth <em>remembering.</em>
          </span>
        </h2>
      </div>

      <footer className="slf-content">
        <div className="slf-main">
          <div className="slf-brand-col">
            <a className="slf-brand" href="#hero-banner" aria-label="Story Lens home">
              <img src={logos.dark} alt="Story Lens" className="slf-brand-logo" />
            </a>
            <p className="slf-copyright">
              &copy; 2026 Story Lens Productions Ltd.
              <span>Independent production studio — Vancouver • London • Dubai</span>
            </p>
          </div>

          <nav className="slf-nav" aria-label="Footer navigation">
            {footerNavGroups.map((group, i) => (
              <div className="slf-nav-group" key={i}>
                {group.map((link) => (
                  <a href={link.href} key={link.href}>
                    <span />
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          <div className="slf-contact-col">
            <a className="slf-cta" href={CONTACT_HREF}>
              <span className="slf-cta-text">START A PROJECT</span>
              <span className="slf-cta-arrow">↗</span>
            </a>
            <a className="slf-mail" href={CONTACT_HREF}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="slf-bottom">
          <div className="slf-clocks">
            <span>
              LONDON <b>{london}</b>
            </span>
            <span>
              DUBAI <b>{dubai}</b>
            </span>
          </div>
          <div className="slf-line">
            <span />
          </div>
          <div className="slf-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.5" y="5" width="19" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
                <path d="M10 9.2v5.6l4.8-2.8L10 9.2z" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
