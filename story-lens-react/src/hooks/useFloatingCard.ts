import { useEffect, type RefObject } from 'react';

/**
 * Makes `card` chase the mouse across `section` with a smooth lerp and a velocity-based tilt.
 * The animation loop only runs while the pointer is inside the section.
 */
export function useFloatingCard(
  section: RefObject<HTMLElement>,
  card: RefObject<HTMLElement>,
): void {
  useEffect(() => {
    const sectionEl = section.current;
    const cardEl = card.current;
    if (!sectionEl || !cardEl) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let running = false;
    let raf = 0;

    const loop = () => {
      x += (mouseX - x) * 0.12;
      y += (mouseY - y) * 0.12;
      const tilt = Math.max(-12, Math.min(12, (mouseX - x) * 0.15));
      cardEl.style.left = `${x.toFixed(1)}px`;
      cardEl.style.top = `${y.toFixed(1)}px`;
      cardEl.style.transform = `translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg)`;
      if (running) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      start();
    };
    const onLeave = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    sectionEl.addEventListener('mousemove', onMove, { passive: true });
    sectionEl.addEventListener('mouseleave', onLeave);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      sectionEl.removeEventListener('mousemove', onMove);
      sectionEl.removeEventListener('mouseleave', onLeave);
    };
  }, [section, card]);
}
