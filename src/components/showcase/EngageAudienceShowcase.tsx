"use client";

import React from "react";
import { motion } from "framer-motion";

const SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=85",
];

const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export function EngageAudienceShowcase() {
  const images = Array.isArray(SHOWCASE_IMAGES) ? SHOWCASE_IMAGES : [];

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] px-5 text-center text-white border-t border-[rgba(212,175,55,0.15)]">
      {/* Soft Luxury Gold/Amber Background Glows (Story Lens Theme) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Center Champagne Glow */}
        <div className="absolute left-1/2 top-[-200px] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[#D4AF37]/15 blur-[120px]" />

        {/* Bottom Left Deep Amber Glow */}
        <div className="absolute bottom-[-220px] left-[-150px] h-[500px] w-[500px] rounded-full bg-[#B48214]/12 blur-[130px]" />

        {/* Bottom Right Warm Gold Glow */}
        <div className="absolute bottom-[-180px] right-[-150px] h-[460px] w-[460px] rounded-full bg-[#F5E298]/10 blur-[130px]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 flex -translate-y-24 flex-col items-center sm:-translate-y-28 md:-translate-y-32">
        {/* Pill Badge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/35 bg-[#121216]/85 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-[2px] text-[#D4AF37] shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md sm:text-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          Join over 100,000 happy creators &amp; visionaries
        </motion.div>

        {/* Architectural Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 20,
            delay: 0.08,
          }}
          className="max-w-5xl font-['Syne',sans-serif] text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[84px]"
        >
          Engage Audiences
          <br />
          with{" "}
          <span className="bg-gradient-to-r from-white via-[#E5C158] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]">
            Stunning Videos
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInVariants}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl text-base leading-7 text-[#888892] sm:text-lg"
        >
          Boost your brand with high-impact short videos and cinematic reels
          created by talented professionals ready to move your business forward.
        </motion.p>

        {/* Story Lens Gold CTA Button */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInVariants}
          transition={{ delay: 0.52 }}
        >
          <motion.a
            href="mailto:hello@storylens.studio"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 18px 45px rgba(212, 175, 55, 0.45)",
            }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold uppercase tracking-[2px] text-[#050505] shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all hover:bg-[#F5E298] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            <span>Get Started</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom image marquee */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[32%] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)] sm:h-[36%] md:h-[42%]">
        <motion.div
          className="flex w-max items-end"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1}
              className="flex shrink-0 items-end gap-4 pr-4"
            >
              {images.map((src, imageIndex) => {
                const rotation = imageIndex % 2 === 0 ? -2 : 4;
                const offset =
                  imageIndex % 3 === 0
                    ? "translateY(16px)"
                    : imageIndex % 3 === 1
                      ? "translateY(0px)"
                      : "translateY(10px)";

                return (
                  <motion.div
                    key={`${groupIndex}-${imageIndex}`}
                    whileHover={
                      groupIndex === 0
                        ? {
                            y: -14,
                            rotate: 0,
                            scale: 1.03,
                          }
                        : undefined
                    }
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 20,
                    }}
                    className="pointer-events-auto relative h-48 w-36 shrink-0 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[#111115] shadow-[0_20px_55px_rgba(0,0,0,0.85)] transition-colors hover:border-[#D4AF37] sm:h-56 sm:w-42 md:h-64 md:w-48"
                    style={{
                      transform: `rotate(${rotation}deg) ${offset}`,
                    }}
                  >
                    <img
                      src={src}
                      alt={
                        groupIndex === 0
                          ? `Story Lens showcase ${imageIndex + 1}`
                          : ""
                      }
                      loading={imageIndex < 4 ? "eager" : "lazy"}
                      draggable={false}
                      className="h-full w-full select-none object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default EngageAudienceShowcase;
