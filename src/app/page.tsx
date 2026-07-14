"use client";

/**
 * PELAGIC / Descent: interactive deep-sea expedition landing page.
 *
 * The whole page is framed as a dive from 0 m to −3,800 m:
 *  - Cursor-reactive bioluminescent particle field (vanilla canvas)
 *  - Scroll-driven depth-meter HUD with zone rail + live pressure
 *  - The page literally darkens as you descend (scroll-linked overlay)
 *  - 3D tilt cards, magnetic CTAs, live telemetry, scroll-drawn dive log
 *  - Respects prefers-reduced-motion throughout
 */

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import ParticleField from "@/components/ParticleField";
import DepthHUD from "@/components/DepthHUD";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import StatMarquee from "@/components/sections/StatMarquee";
import Specimens from "@/components/sections/Specimens";
import Telemetry from "@/components/sections/Telemetry";
import DiveLog from "@/components/sections/DiveLog";
import Abyss from "@/components/sections/Abyss";

export default function Page() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // the water gets darker the deeper you go
  const darkness = useTransform(smooth, [0, 1], [0, 0.55]);

  return (
    <main className="font-body relative bg-ink text-bone">
      <ParticleField />
      <DepthHUD progress={smooth} />

      {/* descent darkness, deepens with scroll */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-5 bg-void"
        style={{ opacity: darkness }}
        aria-hidden="true"
      />

      {/* scroll progress line */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-0.5 w-full origin-left bg-linear-to-r from-lumen to-lure"
        style={{ scaleX: smooth }}
      />

      <Nav />

      <div className="relative z-20">
        <Hero />
        <StatMarquee />
        <Specimens />
        <Telemetry />
        <DiveLog />
        <Abyss />
      </div>
    </main>
  );
}
