import { useMemo, useRef } from 'react';
import { FallbackImage } from '@/components/ui/FallbackImage';
import { GALLERY_HEADING, galleryColumns } from '@/data/gallery';
import { useGalleryReveal } from '@/hooks';
import './GalleryReveal.css';

export function GalleryReveal() {
  const stage = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const heroInner = useRef<HTMLDivElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLParagraphElement>(null);
  const button = useRef<HTMLAnchorElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const refs = useMemo(
    () => ({ stage, sticky, heroInner, gallery, mark, footer, button, overlay }),
    [],
  );
  useGalleryReveal(refs);

  return (
    <section className="cgr-pinned-stage" id="gallery-reveal" ref={stage}>
      <div className="cgr-sticky-viewport" ref={sticky}>
        <div className="cgr-hero-inner" ref={heroInner}>
          <div className="cgr-gallery" ref={gallery} aria-hidden="true">
            {galleryColumns.map((column, c) => (
              <div className="cgr-column" key={c}>
                {column.map((card) => (
                  <figure className="cgr-card" key={card.alt}>
                    <FallbackImage
                      src={card.image}
                      fallback={card.fallback}
                      alt={card.alt}
                      draggable={false}
                      loading={card.loading}
                    />
                    <span className="cgr-card-shine" />
                  </figure>
                ))}
              </div>
            ))}
          </div>

          <div className="cgr-mark" ref={mark}>
            STORY LENS // 26
          </div>

          <div className="cgr-copy">
            <p className="cgr-kicker">INDEPENDENT CINEMATIC ARCHIVE // 24 FPS</p>
            <h2 className="cgr-heading">
              {GALLERY_HEADING.map((word) => (
                <span className="cgr-word" key={word}>
                  {word}
                </span>
              ))}
            </h2>
            <a className="cgr-button" href="#services" ref={button}>
              <span>ENTER THE ARCHIVE</span>
              <span className="cgr-button-icon" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <p className="cgr-footer" ref={footer}>
            VANCOUVER • TORONTO • LONDON • DUBAI // 8K RAW MASTER
          </p>
        </div>

        <div className="cgr-overlay" ref={overlay} />
      </div>
    </section>
  );
}
