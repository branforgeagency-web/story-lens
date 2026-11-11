import { useEffect, useRef, useState } from 'react';
import { playShutter, scrollToTop } from '@/lib';
import { ChevronUpIcon } from '@/components/ui/Icons';
import './ScrollProgress.css';

const RING_CIRCUMFERENCE = 157; // 2π × 25
const SHOW_AFTER_PX = 380;

/** Top gold progress line + floating back-to-top button with a progress ring. */
export function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (lineRef.current) lineRef.current.style.width = `${percent}%`;
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(
          RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * percent) / 100,
        );
      }
      setVisible(scrollTop > SHOW_AFTER_PX);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <div className="scroll-progress-line" ref={lineRef} />
      <button
        className={`floating-back-top${visible ? ' visible' : ''}`}
        aria-label="Back to top"
        onClick={() => {
          playShutter();
          scrollToTop();
        }}
      >
        <svg className="progress-ring" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="25" ref={ringRef} />
        </svg>
        <ChevronUpIcon />
      </button>
    </>
  );
}
