import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { logos } from '@/assets';
import { playShutter, scrollToTop } from '@/lib';
import './BrandMonument.css';

const TARGET_TOP = 28; // landing position inside the editorial section
const EXTRA_STICKY = 50; // px of extra scroll the logo stays fixed after the section arrives
const LEFT = 'clamp(24px, 4vw, 48px)';

/**
 * The big Story Lens logo. It starts large in the bottom-left of the hero, shrinks and
 * rises as you scroll, flips to its dark variant over the white editorial section, and
 * finally docks (via a portal) into that section so it scrolls away naturally.
 */
export function BrandMonument() {
  const [section, setSection] = useState<HTMLElement | null>(null);
  const [docked, setDocked] = useState(false);
  const dockedRef = useRef(false);
  const monumentRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSection(document.getElementById('editorial-reel'));
  }, []);

  const update = useCallback(() => {
    const el = monumentRef.current;
    if (!el || !section) return;

    const scrollY = window.scrollY || 0;
    const winH = window.innerHeight;
    const isMobile = window.innerWidth <= 900;
    const targetScale = isMobile ? 0.44 : 0.38;
    const sectionTop = section.offsetTop;
    const sectionRect = section.getBoundingClientRect();
    const reached = sectionRect.top <= -EXTRA_STICKY || scrollY >= sectionTop + EXTRA_STICKY;

    if (reached !== dockedRef.current) {
      dockedRef.current = reached;
      setDocked(reached);
    }

    if (!reached) {
      // Sticky phase — starts bottom-left, just above the hero's bottom bar.
      const logoH = wrapRef.current?.offsetHeight ?? 230;
      const bottomGap = isMobile ? 140 : 72;
      const initTop = Math.max(160, winH - logoH - bottomGap);

      const p = Math.min(1, Math.max(0, scrollY / Math.max(1, sectionTop)));
      const scale = 1 - p * (1 - targetScale);
      const top = initTop + (TARGET_TOP - initTop) * p;

      Object.assign(el.style, {
        position: 'fixed',
        top: `${top.toFixed(1)}px`,
        left: LEFT,
        transform: `scale(${scale.toFixed(3)})`,
        zIndex: '85',
      });
      el.classList.toggle('is-light-theme', sectionRect.top <= top + 45);
    } else {
      // Docked phase — a normal, scrolling child of the editorial section.
      Object.assign(el.style, {
        position: 'absolute',
        top: `${(TARGET_TOP + EXTRA_STICKY).toFixed(1)}px`,
        left: LEFT,
        transform: `scale(${targetScale})`,
        zIndex: '2',
      });
      el.classList.add('is-light-theme');
    }
  }, [section]);

  // Re-apply styles right after the portal moves the node (docked ⇄ sticky).
  useLayoutEffect(() => {
    update();
  }, [update, docked]);

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  if (!section) return null;

  return createPortal(
    <div
      ref={monumentRef}
      className="layr-brand-monument site-sticky-brand"
      title="Story Lens Media House"
    >
      <div
        ref={wrapRef}
        className="brand-monument-logo-wrap"
        onClick={() => {
          playShutter();
          scrollToTop();
        }}
      >
        <img src={logos.white} alt="Story Lens Media House" className="brand-logo-img brand-logo-white" />
        <img src={logos.dark} alt="Story Lens Media House" className="brand-logo-img brand-logo-dark" />
      </div>
    </div>,
    docked ? section : document.body,
  );
}
