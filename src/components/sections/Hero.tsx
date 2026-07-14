"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* caustic light from the surface */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(92,242,224,0.14),transparent_70%)]" />

      {/* swaying god-rays */}
      <div
        className="light-rays pointer-events-none absolute -top-[10%] left-1/2 h-[70vh] w-[140vw] -translate-x-1/2 opacity-60"
        style={{
          background:
            "repeating-linear-gradient(100deg, transparent 0px, transparent 90px, rgba(92,242,224,0.045) 120px, transparent 180px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
        aria-hidden="true"
      />

      {/* sonar rings */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        {[0, 1.3, 2.6].map((delay) => (
          <span
            key={delay}
            className="sonar-ring absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lumen/20"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-mono text-[11px] tracking-[0.4em] text-lumen"
      >
        DIVE 62 · SURFACE · 0 m
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-6 max-w-5xl text-center text-4xl font-black leading-[1.04] md:text-6xl lg:text-7xl"
      >
        THE MAP ENDS
        <br />
        <span className="text-lumen [text-shadow:0_0_60px_rgba(92,242,224,0.35)]">
          WHERE WE BEGIN
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="font-body mt-8 max-w-xl text-center text-base font-light leading-relaxed text-bone/70 md:text-lg"
      >
        Eighty percent of the ocean has never been seen by human eyes. Pelagic
        builds the vessels, instruments, and expeditions that are changing
        that, one descent at a time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton href="#specimens">BEGIN THE DESCENT ↓</MagneticButton>
        <MagneticButton href="#dives" variant="ghost">
          VIEW DIVE LOG
        </MagneticButton>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="font-mono absolute bottom-8 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-bone/40"
      >
        <span>SCROLL TO DIVE</span>
        <span className="block h-8 w-px bg-gradient-to-b from-lumen/60 to-transparent" />
      </motion.div>
    </section>
  );
}
