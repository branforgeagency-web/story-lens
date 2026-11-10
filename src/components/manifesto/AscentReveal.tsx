"use client";
import React, { useEffect, useRef } from "react";

/*
  Story Lens — Ascent Editorial Text Reveal
  Characters slide in from the right with a skewX ease, staggered by position
  within each line (column-by-column cascade).
  Obsidian Black & Champagne Gold Luxury Media House Theme.
*/

const STAGGER = 38; // ms per character delay

// Split one line into char spans with column-staggered delay
function SplitLine({ text }: { text: string }) {
  let ci = 0;
  return (
    <div className="ar-line">
      {[...text].map((ch, i) =>
        ch === " " ? (
          <span key={i} aria-hidden="true">&nbsp;</span>
        ) : (
          <span
            key={i}
            className="ar-ch"
            style={{ transitionDelay: `${ci++ * STAGGER}ms` }}
          >
            {ch}
          </span>
        )
      )}
    </div>
  );
}

export interface AscentRevealProps {
  id?: string;
}

export const AscentReveal: React.FC<AscentRevealProps> = ({ id = "manifesto" }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = root.querySelectorAll<HTMLElement>(".ar-section");

    if (reduced) {
      sections.forEach((s) => s.classList.add("is-visible"));
      return;
    }

    // Instant-reset helper: disables transitions, removes is-visible, then
    // re-enables transitions after two rAF frames so chars snap to start position silently while offscreen
    function instantReset(section: HTMLElement) {
      section.classList.add("ar-no-trans");
      section.classList.remove("is-visible");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => section.classList.remove("ar-no-trans"))
      );
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const section = e.target as HTMLElement;
          if (e.isIntersecting) {
            section.classList.add("is-visible");
          } else {
            // Re-arms animation when scrolling away (both up and down)
            instantReset(section);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -2% 0px" }
    );

    sections.forEach((s) => io.observe(s));

    return () => io.disconnect();
  }, []);

  return (
    <section className="ar-root" id={id} ref={rootRef}>
      {/* Editorial Viewfinder Header Chrome */}
      <div className="ar-chrome">
        <div className="ar-chrome-left">
          <span className="ar-mark">STORY LENS®</span>
          <span className="ar-tag">// CINEMATIC MANIFESTO</span>
        </div>
        <div className="ar-chrome-right">
          <span className="ar-tag">24 FPS · 8K RAW MASTER · DCI SCOPE</span>
        </div>
      </div>

      {/* 1 — Hero: The Signal Is Visceral */}
      <div className="ar-section ar-section-hero">
        <div className="ar-section-inner">
          <span className="ar-kicker">01 // THE MANIFESTO</span>
          <h2 className="ar-display">
            <SplitLine text="THE FRAME" />
            <SplitLine text="IS VISCERAL" />
          </h2>
          <p className="ar-sub">
            Every lens choice is an emotional contract. We turn raw moments into enduring cinematic perspective.
          </p>
        </div>
      </div>

      {/* 2 — Right-aligned: Built For The Big Screen */}
      <div className="ar-section ar-section-right">
        <div className="ar-section-inner">
          <span className="ar-kicker">02 // 8K RAW OPTICS</span>
          <h2 className="ar-large">
            <SplitLine text="BUILT FOR" />
            <SplitLine text="THE BIG SCREEN" />
          </h2>
          <p className="ar-sub">
            Custom anamorphic glass. High-velocity FPV drone tracking. Soundstage lighting shaped with unyielding intention.
          </p>
        </div>
      </div>

      {/* 3 — Statement: Every Story Earns Its Entrance */}
      <div className="ar-section">
        <div className="ar-section-inner">
          <span className="ar-kicker">03 // PHILOSOPHY</span>
          <h2 className="ar-medium">
            <SplitLine text="EVERY STORY" />
            <SplitLine text="EARNS ITS" />
            <SplitLine text="ENTRANCE" />
          </h2>
          <p className="ar-sub">
            No filler frames. No synthetic shortcuts. Only authentic human stories translated into monumental imagery.
          </p>
        </div>
      </div>

      {/* 4 — Outro: Story Lens Media House */}
      <div className="ar-section ar-section-outro">
        <div className="ar-section-inner">
          <h2 className="ar-display ar-accent">
            <SplitLine text="STORY LENS" />
          </h2>
          <h3 className="ar-large">
            <SplitLine text="MEDIA HOUSE" />
          </h3>
          <p className="ar-meta">EST. 2024 — INDEPENDENT CINEMATIC ARCHIVE // 24 FPS</p>
        </div>
      </div>
    </section>
  );
};

export default AscentReveal;
