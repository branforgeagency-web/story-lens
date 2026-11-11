import { useEffect, type RefObject } from 'react';

interface ReelRefs {
  section: RefObject<HTMLElement>;
  container: RefObject<HTMLElement>;
  track: RefObject<HTMLElement>;
}

const AUTO_SPEED = -0.55;

/**
 * Editorial reel: a continuously drifting, infinitely wrapping strip of cards whose
 * scale depends on their horizontal position. Supports mouse-driven drift, drag/touch
 * scrolling, hover-pause and a small scroll-driven parallax.
 */
export function useReelEngine({ section, container, track }: ReelRefs): void {
  useEffect(() => {
    const sectionEl = section.current;
    const containerEl = container.current;
    const trackEl = track.current;
    if (!containerEl || !trackEl) return;

    const cards = Array.from(trackEl.querySelectorAll<HTMLElement>('.reel-card'));
    let isDragging = false;
    let isHoveringCard = false;
    let startX = 0;
    let scrollStart = 0;
    let mouseVelocity = 0;
    let raf = 0;

    // The track holds three identical sets so it can wrap seamlessly in both directions.
    const getSetLength = () => trackEl.scrollWidth / 3 || 1200;
    let setLength = getSetLength();
    let currentScroll = setLength;
    let targetScroll = setLength;
    containerEl.scrollLeft = currentScroll;

    const updateCardScales = () => {
      const containerRect = containerEl.getBoundingClientRect();
      const xMin = 30;
      const xMax = containerRect.width - 30;
      const minScale = 0.35;
      const maxScale = 1.08;
      const baseWidth = cards[0]?.offsetWidth || 220;
      const gap = 16;

      const rects = cards.map((c) => c.getBoundingClientRect()); // batch reads
      cards.forEach((card, i) => {
        const center = rects[i].left + rects[i].width / 2 - containerRect.left;
        const p = Math.max(0, Math.min(1, (center - xMin) / (xMax - xMin)));
        const scale = minScale + (maxScale - minScale) * Math.pow(p, 0.86);
        const margin = -(baseWidth - baseWidth * scale) / 2 + gap / 2;
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.marginLeft = `${margin.toFixed(1)}px`;
        card.style.marginRight = `${margin.toFixed(1)}px`;
      });
    };

    const animate = () => {
      setLength = getSetLength();

      if (!isDragging && !isHoveringCard) {
        targetScroll += AUTO_SPEED + mouseVelocity;
        if (targetScroll < setLength * 0.35) {
          targetScroll += setLength;
          currentScroll += setLength;
          containerEl.scrollLeft = currentScroll;
        } else if (targetScroll > setLength * 1.85) {
          targetScroll -= setLength;
          currentScroll -= setLength;
          containerEl.scrollLeft = currentScroll;
        }
      }

      currentScroll += (targetScroll - currentScroll) * 0.12;
      containerEl.scrollLeft = currentScroll;
      updateCardScales();
      mouseVelocity *= 0.94;
      raf = requestAnimationFrame(animate);
    };

    // --- pointer interaction -------------------------------------------------
    const onSectionMove = (e: MouseEvent) => {
      if (isDragging || !sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      mouseVelocity = ((e.clientX - rect.left) / rect.width - 0.5) * 2.2;
    };
    const onSectionLeave = () => {
      mouseVelocity = 0;
      isHoveringCard = false;
    };
    const onTrackOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('.reel-card')) isHoveringCard = true;
    };
    const onTrackOut = (e: MouseEvent) => {
      const to = e.relatedTarget as Element | null;
      if (!to || !to.closest('.reel-card')) isHoveringCard = false;
    };

    const beginDrag = (pageX: number) => {
      isDragging = true;
      startX = pageX - containerEl.offsetLeft;
      scrollStart = containerEl.scrollLeft;
      targetScroll = scrollStart;
    };
    const dragTo = (pageX: number) => {
      const walk = (pageX - containerEl.offsetLeft - startX) * 1.5;
      targetScroll = scrollStart - walk;
      currentScroll = targetScroll;
      containerEl.scrollLeft = targetScroll;
    };
    const endDrag = () => {
      isDragging = false;
      targetScroll = containerEl.scrollLeft;
      currentScroll = containerEl.scrollLeft;
    };

    const onMouseDown = (e: MouseEvent) => beginDrag(e.pageX);
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      dragTo(e.pageX);
    };
    const onMouseUp = () => {
      if (isDragging) endDrag();
    };
    const onTouchStart = (e: TouchEvent) => beginDrag(e.touches[0].pageX);
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging) dragTo(e.touches[0].pageX);
    };
    const onTouchEnd = () => endDrag();

    const onPageScroll = () => {
      if (!sectionEl) return;
      const rect = sectionEl.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.top < winH && rect.bottom > 0) {
        const factor = (winH - rect.top) / (winH + rect.height);
        targetScroll += (factor - 0.5) * 1.2;
      }
    };

    updateCardScales();
    raf = requestAnimationFrame(animate);

    sectionEl?.addEventListener('mousemove', onSectionMove);
    sectionEl?.addEventListener('mouseleave', onSectionLeave);
    trackEl.addEventListener('mouseover', onTrackOver);
    trackEl.addEventListener('mouseout', onTrackOut);
    containerEl.addEventListener('mousedown', onMouseDown);
    containerEl.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerEl.addEventListener('touchstart', onTouchStart, { passive: true });
    containerEl.addEventListener('touchmove', onTouchMove, { passive: true });
    containerEl.addEventListener('touchend', onTouchEnd);
    window.addEventListener('scroll', onPageScroll, { passive: true });
    window.addEventListener('resize', updateCardScales);

    return () => {
      cancelAnimationFrame(raf);
      sectionEl?.removeEventListener('mousemove', onSectionMove);
      sectionEl?.removeEventListener('mouseleave', onSectionLeave);
      trackEl.removeEventListener('mouseover', onTrackOver);
      trackEl.removeEventListener('mouseout', onTrackOut);
      containerEl.removeEventListener('mousedown', onMouseDown);
      containerEl.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      containerEl.removeEventListener('touchstart', onTouchStart);
      containerEl.removeEventListener('touchmove', onTouchMove);
      containerEl.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', onPageScroll);
      window.removeEventListener('resize', updateCardScales);
    };
  }, [section, container, track]);
}
