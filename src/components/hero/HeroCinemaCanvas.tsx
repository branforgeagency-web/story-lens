import React, { useRef, useEffect } from 'react';

interface HeroCinemaCanvasProps {
  blurAmount: number; // in pixels, 0 (tack sharp) to 12 (shallow bokeh)
  isReducedMotion?: boolean;
}

export const HeroCinemaCanvas: React.FC<HeroCinemaCanvasProps> = ({ blurAmount, isReducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!isReducedMotion) {
        time += 0.012;
      }
      const w = canvas.width;
      const h = canvas.height;

      // Base Obsidian Cinema Background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Moving atmospheric directional spotlight / headlights
      const centerX = w * 0.5 + Math.sin(time * 0.7) * (w * 0.18);
      const centerY = h * 0.52 + Math.cos(time * 0.5) * (h * 0.1);

      // Deep Gold Specular Ambient Bloom
      const radGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, w * 0.65);
      radGrad.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      radGrad.addColorStop(0.35, 'rgba(212, 175, 55, 0.04)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);

      // Anamorphic 2.39:1 Horizontal Lens Flare Streak (Gold & White)
      const streakY = centerY;
      const flareGrad = ctx.createLinearGradient(0, streakY - 1, w, streakY + 1);
      flareGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
      flareGrad.addColorStop(0.25, 'rgba(212, 175, 55, 0.15)');
      flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
      flareGrad.addColorStop(0.75, 'rgba(212, 175, 55, 0.15)');
      flareGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, streakY - 2, w, 4);

      // Secondary optical flare satellites
      const sat1X = w - centerX;
      const satGrad = ctx.createRadialGradient(sat1X, centerY, 2, sat1X, centerY, 40);
      satGrad.addColorStop(0, 'rgba(245, 226, 152, 0.25)');
      satGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = satGrad;
      ctx.beginPath();
      ctx.arc(sat1X, centerY, 40, 0, Math.PI * 2);
      ctx.fill();

      // Cinematography Frame Reticle (Golden section rule-of-thirds)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.33, 0);
      ctx.lineTo(w * 0.33, h);
      ctx.moveTo(w * 0.66, 0);
      ctx.lineTo(w * 0.66, h);
      ctx.moveTo(0, h * 0.33);
      ctx.lineTo(w, h * 0.33);
      ctx.moveTo(0, h * 0.66);
      ctx.lineTo(w, h * 0.66);
      ctx.stroke();

      // Center crosshair marker
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.beginPath();
      ctx.moveTo(w / 2 - 12, h / 2);
      ctx.lineTo(w / 2 + 12, h / 2);
      ctx.moveTo(w / 2, h / 2 - 12);
      ctx.lineTo(w / 2, h / 2 + 12);
      ctx.stroke();

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  return (
    <div
      className="relative w-full h-full overflow-hidden transition-all duration-300"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />
    </div>
  );
};
