import { useEffect, type RefObject } from 'react';
import { clamp, clampProgress, mix } from '@/lib';

export interface GalleryRevealRefs {
  stage: RefObject<HTMLElement>;
  sticky: RefObject<HTMLElement>;
  heroInner: RefObject<HTMLElement>;
  gallery: RefObject<HTMLElement>;
  mark: RefObject<HTMLElement>;
  footer: RefObject<HTMLElement>;
  button: RefObject<HTMLElement>;
  overlay: RefObject<HTMLElement>;
}

/**
 * Pinned cinematic gallery: as the (tall) stage scrolls, a 3×3 grid zooms out, the brand
 * mark travels up, the copy reveals word-by-word and the stage hands off to the next section.
 */
export function useGalleryReveal(refs: GalleryRevealRefs): void {
  useEffect(() => {
    const stage = refs.stage.current;
    const sticky = refs.sticky.current;
    const heroInner = refs.heroInner.current;
    const gallery = refs.gallery.current;
    const mark = refs.mark.current;
    const footer = refs.footer.current;
    const button = refs.button.current;
    const overlay = refs.overlay.current;
    if (!stage || !sticky || !heroInner || !gallery || !mark || !footer || !overlay) return;

    const cardImages = Array.from(gallery.querySelectorAll<HTMLElement>('.cgr-card img'));
    const words = Array.from(stage.querySelectorAll<HTMLElement>('.cgr-word'));
    const revealItems = [...words, button].filter((el): el is HTMLElement => !!el);

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollDist = stage.offsetHeight - viewportHeight;
      if (scrollDist <= 0) return;

      const progress = clamp(-rect.top / scrollDist, 0, 1);
      const isMobile = window.innerWidth <= 900;
      const startingMarkScale = isMobile ? 2.2 : 5.0;

      // Fail-safe pinning on top of CSS `position: sticky`.
      const stickyRect = sticky.getBoundingClientRect();
      if (rect.top <= 0 && rect.top >= -scrollDist && Math.abs(stickyRect.top) > 4) {
        sticky.style.transform = `translateY(${-rect.top}px)`;
      } else {
        sticky.style.transform = '';
      }

      // 1. Gallery zoom & settle into the 3×3 composition (0 → 0.70)
      const galleryProgress = clampProgress(progress, 0, 0.7);
      const galleryScale = mix(1.0, isMobile ? 0.32 : 0.36, galleryProgress);
      gallery.style.transform = `translate(-50%, -50%) scale(${galleryScale.toFixed(3)})`;
      const imgScale = mix(1.28, 1.0, galleryProgress);
      cardImages.forEach((img) => {
        img.style.transform = `scale(${imgScale.toFixed(3)})`;
      });

      // 2. Brand mark travel & scale
      const markScale = mix(startingMarkScale, 1.0, galleryProgress);
      const markTravel = viewportHeight - (mark.offsetHeight || 42) - 64;
      mark.style.transform = `translateY(${(-markTravel * galleryProgress).toFixed(1)}px) scale(${markScale.toFixed(3)})`;

      // 3. Footer blur & fade (0.03 → 0.22)
      const footerProgress = clampProgress(progress, 0.03, 0.22);
      footer.style.opacity = mix(1, 0, footerProgress).toFixed(2);
      footer.style.transform = `scale(${mix(1, 0.8, footerProgress).toFixed(3)})`;
      footer.style.filter = `blur(${mix(0, 16, footerProgress).toFixed(1)}px)`;

      // 4. Word-by-word reveal (0.12 → 0.65)
      const revealStart = 0.12;
      const revealEnd = 0.65;
      const spacing = (revealEnd - revealStart) / Math.max(revealItems.length, 1);
      revealItems.forEach((el, i) => {
        const start = revealStart + spacing * i;
        const p = clampProgress(progress, start, start + spacing * 2.5);
        el.style.opacity = p.toFixed(2);
        el.style.transform = `translateY(${mix(16, 0, p).toFixed(1)}px)`;
      });
      if (button) {
        const start = revealStart + spacing * (revealItems.length - 1);
        const p = clampProgress(progress, start, start + spacing * 2.5);
        button.style.pointerEvents = p > 0.5 ? 'auto' : 'none';
      }

      // 5. Final hand-off (0.78 → 1.0)
      const handoff = clampProgress(progress, 0.78, 1.0);
      heroInner.style.transform = `translateY(${mix(0, -16, handoff).toFixed(1)}%) scale(${mix(1.0, 0.95, handoff).toFixed(3)})`;
      overlay.style.opacity = mix(0, 0.96, handoff).toFixed(2);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [refs]);
}
