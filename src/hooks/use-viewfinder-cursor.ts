import { useState, useEffect } from 'react';

export type CursorMode = 'default' | 'play' | 'discover' | 'drag' | 'clapper';

export function useViewfinderCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return {
    position,
    cursorMode,
    cursorLabel,
    isHoveringInteractive,
    isVisible: isVisible && !isTouchDevice,
    setCursorMode,
    setCursorLabel,
    setIsHoveringInteractive,
  };
}
