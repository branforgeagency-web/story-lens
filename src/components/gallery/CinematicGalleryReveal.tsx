"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import React, { useLayoutEffect, useMemo, useRef } from "react";

export interface CinematicGalleryRevealProps {
  images?: string[];
  brand?: string;
  heading?: string;
  buttonLabel?: string;
  footerText?: string;
  showcaseHeading?: string;
  contactHeading?: string;
  embedded?: boolean;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
];

const clampProgress = (value: number, start: number, end: number) =>
  gsap.utils.clamp(0, 1, (value - start) / (end - start));

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

export function CinematicGalleryReveal({
  images,
  brand = "STORY LENS // 26",
  heading = "Culture moves fast. We capture the moments worth remembering.",
  buttonLabel = "Enter the archive",
  footerText = "24.00 FPS // 8K RAW MASTER",
  showcaseHeading = "The New Energy",
  contactHeading = "Make Something Iconic",
  embedded = false,
}: CinematicGalleryRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const galleryImages = useMemo(() => {
    const customImages = images?.filter(Boolean).slice(0, 9) ?? [];
    return [
      ...customImages,
      ...DEFAULT_IMAGES.slice(customImages.length),
    ].slice(0, 9);
  }, [images]);

  const headingWords = useMemo(() => heading.trim().split(/\s+/), [heading]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const content = root.querySelector<HTMLElement>(".cgr-content");
    const hero = root.querySelector<HTMLElement>(".cgr-hero");
    const heroInner = root.querySelector<HTMLElement>(".cgr-hero-inner");
    const gallery = root.querySelector<HTMLElement>(".cgr-gallery");
    const mark = root.querySelector<HTMLElement>(".cgr-mark");
    const footer = root.querySelector<HTMLElement>(".cgr-footer");
    const button = root.querySelector<HTMLElement>(".cgr-button");
    const overlay = root.querySelector<HTMLElement>(".cgr-overlay");

    const imageElements = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".cgr-card img")
    );
    const wordElements = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(".cgr-word")
    );

    if (
      !content ||
      !hero ||
      !heroInner ||
      !gallery ||
      !mark ||
      !footer ||
      !button ||
      !overlay
    ) {
      return;
    }

    let lenis: Lenis | null = null;
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let heroTrigger: ScrollTrigger | null = null;

    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(gallery, { scale: 0.52 });
        gsap.set(imageElements, { scale: 1 });
        gsap.set([...wordElements, button], { opacity: 1, y: 0 });
        gsap.set(footer, { opacity: 0 });
        gsap.set(mark, { scale: 1 });
        return;
      }

      const scroller = embedded ? root : undefined;
      const getViewportHeight = () =>
        embedded ? root.clientHeight : window.innerHeight;

      let startingMarkScale = window.innerWidth <= 900 ? 2.2 : 5.7;

      gsap.set([...wordElements, button], {
        opacity: 0,
        y: 14,
      });

      if (embedded) {
        lenis = new Lenis({
          wrapper: root,
          content,
          lerp: 0.08,
          smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const updateSmoothScroll = (time: number) => {
          lenis?.raf(time);
          animationFrame = requestAnimationFrame(updateSmoothScroll);
        };
        animationFrame = requestAnimationFrame(updateSmoothScroll);
      }

      heroTrigger = ScrollTrigger.create({
        trigger: hero,
        scroller,
        start: "top top",
        end: () => `+=${getViewportHeight() * 3.7}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onRefresh: () => {
          startingMarkScale = window.innerWidth <= 900 ? 2.2 : 5.7;
        },

        onUpdate: ({ progress }) => {
          const viewportHeight = getViewportHeight();

          const galleryProgress = clampProgress(progress, 0, 0.7);

          const isMobile = window.innerWidth <= 900;
          const targetGalleryScale = isMobile ? 0.32 : 0.36;

          gsap.set(gallery, {
            scale: mix(1, targetGalleryScale, galleryProgress),
          });

          gsap.set(imageElements, {
            scale: mix(1.28, 1, galleryProgress),
          });

          const markScale = mix(startingMarkScale, 1, galleryProgress);
          const markTravel = viewportHeight - mark.offsetHeight - 48;

          gsap.set(mark, {
            scale: markScale,
            y: -markTravel * galleryProgress,
          });

          const footerProgress = clampProgress(progress, 0.04, 0.24);

          gsap.set(footer, {
            opacity: mix(1, 0, footerProgress),
            scale: mix(1, 0.78, footerProgress),
            filter: `blur(${mix(0, 18, footerProgress)}px)`,
          });

          const revealItems = [...wordElements, button];
          const revealStart = 0.13;
          const revealEnd = 0.62;
          const revealSpacing =
            (revealEnd - revealStart) / Math.max(revealItems.length, 1);

          revealItems.forEach((element, index) => {
            const itemStart = revealStart + revealSpacing * index;
            const itemProgress = clampProgress(
              progress,
              itemStart,
              itemStart + revealSpacing * 3
            );

            gsap.set(element, {
              opacity: itemProgress,
              y: mix(14, 0, itemProgress),
            });
          });

          const handoffProgress = clampProgress(progress, 0.78, 1);

          gsap.set(heroInner, {
            yPercent: mix(0, -24, handoffProgress),
            scale: mix(1, 0.96, handoffProgress),
          });

          gsap.set(overlay, {
            opacity: mix(0, 0.94, handoffProgress),
          });
        },
      });

      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(root);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      heroTrigger?.kill();
      resizeObserver?.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      lenis?.destroy();
      context.revert();
    };
  }, [embedded, galleryImages]);

  const columns = [
    galleryImages.slice(0, 3),
    galleryImages.slice(3, 6),
    galleryImages.slice(6, 9),
  ];

  return (
    <div
      ref={rootRef}
      className={`cgr-root ${embedded ? "cgr-embedded" : ""}`}
      id="gallery-reveal"
    >
      <style>{styles}</style>

      <main className="cgr-content">
        <section className="cgr-hero">
          <div className="cgr-hero-inner">
            <div className="cgr-gallery" aria-hidden="true">
              {columns.map((column, columnIndex) => (
                <div className="cgr-column" key={`column-${columnIndex}`}>
                  {column.map((source, imageIndex) => {
                    const globalIndex = columnIndex * 3 + imageIndex;
                    return (
                      <figure
                        className="cgr-card"
                        key={`${source}-${globalIndex}`}
                      >
                        <img
                          src={source}
                          alt=""
                          draggable={false}
                          loading={globalIndex < 3 ? "eager" : "lazy"}
                          decoding="async"
                        />
                        <span className="cgr-card-shine" />
                      </figure>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="cgr-mark">{brand}</div>

            <div className="cgr-copy">
              <p className="cgr-kicker">
                INDEPENDENT CINEMATIC ARCHIVE // 24 FPS
              </p>

              <h1>
                {headingWords.map((word, index) => (
                  <span className="cgr-word" key={`${word}-${index}`}>
                    {word}
                  </span>
                ))}
              </h1>

              <a className="cgr-button" href="mailto:hello@storylens.studio">
                <span>{buttonLabel}</span>
                <span className="cgr-button-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <p className="cgr-footer">{footerText}</p>
          </div>

          <div className="cgr-overlay" />
        </section>
      </main>
    </div>
  );
}

export default CinematicGalleryReveal;

const styles = `
.cgr-root {
  position: relative;
  width: 100%;
  color: #ffffff;
  background: #050505;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow: hidden;
}

.cgr-root,
.cgr-root * {
  box-sizing: border-box;
}

.cgr-root * {
  margin: 0;
  padding: 0;
}

.cgr-root.cgr-embedded {
  height: 100svh;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

.cgr-content {
  position: relative;
  width: 100%;
}

.cgr-hero {
  position: relative;
  width: 100%;
  height: 100svh;
  background: #050505;
  overflow: hidden;
}

.cgr-hero-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: center top;
  will-change: transform;
}

.cgr-gallery {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  width: calc(300% + 2rem);
  height: calc(300svh + 2rem);
  gap: 1.25rem;
  transform: translate(-50%, -50%);
  transform-origin: center;
  will-change: transform;
}

.cgr-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 1.25rem;
}

.cgr-card {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #111115;
  border-radius: 14px;
  border: 1px solid rgba(212, 175, 55, 0.18);
  isolation: isolate;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
}

.cgr-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.28);
  filter: saturate(1.08) contrast(1.06);
  user-select: none;
  will-change: transform;
}

.cgr-card::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(212, 175, 55, 0.08),
    transparent 35%,
    rgba(0, 0, 0, 0.45)
  );
}

.cgr-card-shine {
  position: absolute;
  top: -40%;
  left: -80%;
  z-index: 3;
  width: 45%;
  height: 180%;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(212, 175, 55, 0.25),
    transparent
  );
  transform: rotate(15deg);
}

.cgr-mark {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  z-index: 5;
  color: #ffffff;
  font-family: 'Bebas Neue', 'Anton', sans-serif;
  font-size: clamp(1.4rem, 2.2vw, 2.2rem);
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1;
  transform: scale(5.7);
  transform-origin: bottom left;
  white-space: nowrap;
  will-change: transform;
  text-shadow: 0 4px 25px rgba(0, 0, 0, 0.9);
}

.cgr-copy {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  display: flex;
  width: min(880px, calc(100% - 3rem));
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  text-align: center;
  transform: translate(-50%, -50%);
}

.cgr-kicker {
  color: #D4AF37;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
}

.cgr-copy h1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.27em;
  color: #ffffff;
  font-family: 'Syne', sans-serif;
  font-size: clamp(2rem, 4.4vw, 4.8rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.02;
  text-wrap: balance;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.85);
}

.cgr-word {
  display: inline-block;
  opacity: 0;
  will-change: opacity, transform;
}

.cgr-button {
  display: inline-flex;
  min-height: 56px;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 999px;
  padding: 0.75rem 0.75rem 0.75rem 1.75rem;
  color: #050505;
  background: #D4AF37;
  box-shadow: 0 14px 45px rgba(212, 175, 55, 0.35);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.15rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  opacity: 0;
  transition: transform 220ms ease, background-color 220ms ease, box-shadow 220ms ease;
  will-change: opacity, transform;
  cursor: pointer;
}

.cgr-button-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  color: #D4AF37;
  background: #050505;
  transition: transform 220ms ease;
}

.cgr-button:hover {
  background: #F5E298;
  box-shadow: 0 18px 55px rgba(212, 175, 55, 0.55);
  transform: translateY(-3px) scale(1.02);
}

.cgr-button:hover .cgr-button-icon {
  transform: rotate(15deg);
}

.cgr-footer {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  z-index: 4;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.75rem, 1.1vw, 0.95rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  will-change: opacity, transform, filter;
}

.cgr-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: #050505;
  opacity: 0;
  will-change: opacity;
}

@media (max-width: 900px) {
  .cgr-gallery {
    width: calc(335% + 1.5rem);
    height: calc(300svh + 1.5rem);
    gap: 0.75rem;
  }
  .cgr-column {
    gap: 0.75rem;
  }
  .cgr-mark {
    bottom: 1.5rem;
    left: 1.5rem;
    transform: scale(2.2);
  }
  .cgr-copy {
    width: calc(100% - 2rem);
    gap: 1.4rem;
  }
  .cgr-copy h1 {
    font-size: clamp(2rem, 7.5vw, 3.5rem);
    line-height: 1.05;
  }
  .cgr-footer {
    right: auto;
    bottom: 12svh;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
  }
}

@media (hover: hover) {
  .cgr-card:hover img {
    filter: saturate(1.18) contrast(1.08);
  }
  .cgr-card:hover .cgr-card-shine {
    animation: cgr-shine 850ms ease forwards;
  }
}

@keyframes cgr-shine {
  from { left: -80%; }
  to { left: 145%; }
}

@media (prefers-reduced-motion: reduce) {
  .cgr-button,
  .cgr-card-shine {
    transition: none;
    display: none;
  }
}
`;
