"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ServiceItem {
  id: string;
  index: string;
  name: string;
  desc: string;
  media: string;
  badge: string;
  title: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "videography",
    index: "01",
    name: "VIDEOGRAPHY",
    desc: "END-TO-END VIDEO PRODUCTION SHAPED AROUND THE STORY.",
    media: "reel/reel-1.png",
    badge: "8K RAW MASTER // 24 FPS",
    title: "Commercial & Brand Cinema",
  },
  {
    id: "photography",
    index: "02",
    name: "PHOTOGRAPHY",
    desc: "CAMPAIGN, PRODUCT, AND EDITORIAL IMAGERY WITH CINEMATIC INTENT.",
    media: "reel/reel-4.png",
    badge: "CAMPAIGN & EDITORIAL // 100MP",
    title: "Editorial & Product Stills",
  },
  {
    id: "social-content",
    index: "03",
    name: "SOCIAL CONTENT",
    desc: "PLATFORM-NATIVE STORIES TOLD BESPOKE FOR YOUR BRAND.",
    media: "reel/reel-2.png",
    badge: "9:16 VERTICAL // 120 FPS HIGH-SPEED",
    title: "Bespoke Platform Stories",
  },
  {
    id: "creative-direction",
    index: "04",
    name: "CREATIVE DIRECTION",
    desc: "CONCEPT AND VISUAL DIRECTION THAT CONNECTS EVERY FRAME.",
    media: "reel/reel-3.png",
    badge: "CONCEPT TO MASTER // ART DIRECTION",
    title: "Visual Direction & Cohesion",
  },
];

export const CapabilitiesSection: React.FC<{ onSelectService?: (service: string) => void }> = ({
  onSelectService,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMedia, setActiveMedia] = useState<ServiceItem>(SERVICES[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  // Smooth lerp physics
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isHoveringSection) setIsHoveringSection(true);
  }, [isHoveringSection]);

  useEffect(() => {
    if (!isHoveringSection) return;

    const loop = () => {
      setCurrentPos((prev) => {
        const dx = (mousePos.x - prev.x) * 0.12;
        const dy = (mousePos.y - prev.y) * 0.12;
        return { x: prev.x + dx, y: prev.y + dy };
      });
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHoveringSection, mousePos]);

  const handleRowEnter = (index: number, service: ServiceItem) => {
    setHoveredIndex(index);
    setActiveMedia(service);
  };

  const deltaX = (mousePos.x - currentPos.x) * 0.15;
  const tilt = Math.max(-12, Math.min(12, deltaX));

  return (
    <section
      ref={containerRef}
      id="services"
      className="velour-capabilities-section relative overflow-hidden bg-[#0A0A0C] py-24 sm:py-32 px-6 sm:px-12 md:px-16 border-t border-[rgba(212,175,55,0.15)] text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHoveringSection(false);
        setHoveredIndex(null);
      }}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/4 right-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1540px]">
        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-6 font-mono text-xs uppercase tracking-[2px]">
          <div className="flex items-center gap-3 text-[#D4AF37] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
            <span>05 // CAPABILITIES & DISCIPLINES</span>
          </div>
          <div className="flex gap-6 text-white/50">
            <span>VANCOUVER • LONDON • DUBAI</span>
            <span className="text-[#D4AF37]">24.00 FPS MASTER ARCHIVE</span>
          </div>
        </div>

        {/* Services Rows List */}
        <div className={`velour-cap-list flex flex-col ${hoveredIndex !== null ? "has-hovered-child" : ""}`}>
          {SERVICES.map((service, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={service.id}
                className={`velour-cap-row group relative cursor-pointer transition-all duration-400 ${
                  isHovered ? "is-hovered" : ""
                }`}
                onMouseEnter={() => handleRowEnter(idx, service)}
                onClick={() => onSelectService?.(service.name)}
              >
                {/* 1px Hairline divider */}
                <div
                  className={`h-[1px] w-full transition-all duration-500 ${
                    isHovered ? "bg-[#D4AF37]/50" : "bg-white/12"
                  }`}
                />

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-7 sm:py-10 md:py-12 gap-4 md:gap-8">
                  {/* Huge Bold Title (Bebas Neue / Anton) */}
                  <div className="overflow-hidden">
                    <h2
                      className={`font-['Bebas_Neue',Anton,sans-serif] text-[clamp(3.6rem,8.4vw,8.8rem)] leading-[0.88] uppercase transition-all duration-400 ${
                        isHovered
                          ? "translate-x-4 text-white drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]"
                          : "text-[#F2EFE9]"
                      }`}
                    >
                      {service.name}
                    </h2>
                  </div>

                  {/* Right Column: Number + Description + Arrow */}
                  <div className="flex items-center gap-5 sm:gap-8 max-w-[480px] shrink-0 text-left">
                    <span
                      className={`font-mono text-xs font-bold transition-all duration-300 ${
                        isHovered ? "text-[#D4AF37] scale-110" : "text-white/60"
                      }`}
                    >
                      {service.index}
                    </span>
                    <p
                      className={`m-0 font-mono text-[11px] sm:text-xs leading-[1.55] tracking-[1.5px] uppercase transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-white/80"
                      }`}
                    >
                      {service.desc}
                    </p>
                    <span
                      className={`text-lg text-[#D4AF37] transition-all duration-300 ${
                        isHovered ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 -translate-x-3 -rotate-12"
                      }`}
                    >
                      ↗
                    </span>
                  </div>
                </div>

                {/* Bottom line for final row */}
                {idx === SERVICES.length - 1 && (
                  <div className="h-[1px] w-full bg-white/12" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Media Cursor Card */}
      <div
        className={`velour-floating-card fixed pointer-events-none z-[9999] overflow-hidden rounded-xl border border-[#D4AF37]/40 bg-[#050505] shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.2)] transition-opacity duration-300 ${
          isHoveringSection && hoveredIndex !== null ? "opacity-100" : "opacity-0"
        } hidden md:block`}
        style={{
          left: `${currentPos.x}px`,
          top: `${currentPos.y}px`,
          transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
          width: "clamp(280px, 25vw, 380px)",
          height: "clamp(185px, 16vw, 245px)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={activeMedia.media}
            alt={activeMedia.title}
            className="h-full w-full object-cover transition-transform duration-500 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-black/10" />
          <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[1.5px] text-[#D4AF37]">
              [ {activeMedia.badge} ]
            </span>
            <span className="font-headline text-[13px] font-bold uppercase text-white tracking-[0.5px]">
              {activeMedia.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
