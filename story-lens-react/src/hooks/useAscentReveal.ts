import { useEffect, type RefObject } from 'react';

/**
 * Manifesto reveal: each `.ar-section` toggles `is-visible` as it scrolls into view and
 * silently resets (transitions off for two frames) when it leaves so it can replay.
 */
export function useAscentReveal(root: RefObject<HTMLElement>): void {
  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;
    const sections = Array.from(rootEl.querySelectorAll<HTMLElement>('.ar-section'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((s) => s.classList.add('is-visible'));
      return;
    }

    const instantReset = (section: HTMLElement) => {
      section.classList.add('ar-no-trans');
      section.classList.remove('is-visible');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => section.classList.remove('ar-no-trans'));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;
          if (entry.isIntersecting) section.classList.add('is-visible');
          else instantReset(section);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -2% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [root]);
}
