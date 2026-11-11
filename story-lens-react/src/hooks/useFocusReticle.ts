import { useEffect, type RefObject } from 'react';
import { playShutter } from '@/lib';

/**
 * Camera-focus reticle that replaces the cursor while the pointer is over the hero banner.
 * The reticle element is positioned imperatively (it follows the mouse every frame).
 */
export function useFocusReticle(
  heroRef: RefObject<HTMLElement>,
  reticleRef: RefObject<HTMLElement>,
): void {
  useEffect(() => {
    const hero = heroRef.current;
    const reticle = reticleRef.current;
    if (!hero || !reticle) return;

    let mouseX = -100;
    let mouseY = -100;
    let x = -100;
    let y = -100;
    let inside = false;
    let raf = 0;

    const render = () => {
      x += (mouseX - x) * 0.95;
      y += (mouseY - y) * 0.95;
      reticle.style.left = `${x.toFixed(1)}px`;
      reticle.style.top = `${y.toFixed(1)}px`;
      if (inside) raf = requestAnimationFrame(render);
    };

    const activate = (e: MouseEvent, snap: boolean) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (snap) {
        x = mouseX;
        y = mouseY;
      }
      inside = true;
      reticle.classList.add('is-active');
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    };

    const onEnter = (e: MouseEvent) => activate(e, true);
    const onMove = (e: MouseEvent) => {
      if (!inside) {
        activate(e, false);
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
      const overControl = !!(e.target as Element | null)?.closest('button, a');
      reticle.classList.toggle('is-hovering-btn', overControl);
    };
    const onLeave = () => {
      inside = false;
      reticle.classList.remove('is-active', 'is-hovering-btn');
    };
    const onDown = (e: MouseEvent) => {
      reticle.classList.add('is-focused');
      const el = e.target as Element | null;
      if (!el?.closest('button') && !el?.closest('a')) playShutter();
    };
    const onUp = () => reticle.classList.remove('is-focused');
    const onScroll = () => {
      if (!inside) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        inside = false;
        reticle.classList.remove('is-active');
      }
    };

    hero.addEventListener('mouseenter', onEnter);
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave);
    hero.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener('mouseenter', onEnter);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      hero.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, [heroRef, reticleRef]);
}
