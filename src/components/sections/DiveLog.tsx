"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";

/**
 * Expedition timeline: a luminous descent line draws itself as you scroll,
 * anchoring each logged dive.
 */

const DIVES = [
  {
    id: "DIVE 47",
    year: "2023",
    depth: "−980 m",
    title: "First intact Praya dubia footage",
    note: "A 40-meter siphonophore filmed end to end without disturbing the colony. This is the clip that put Pelagic on the map.",
  },
  {
    id: "DIVE 53",
    year: "2024",
    depth: "−2,150 m",
    title: "Hydrothermal vent field mapped",
    note: "Nine active chimneys charted in a single descent, with water chemistry sampled at each one.",
  },
  {
    id: "DIVE 58",
    year: "2025",
    depth: "−3,802 m",
    title: "Seafloor touchdown",
    note: "Hull certified to 4,000 m. The deepest point of the survey area reached with 71 hours of reserve.",
  },
  {
    id: "DIVE 61",
    year: "2026",
    depth: "−3,410 m",
    title: "Brine pool survey",
    note: "An underwater lake so dense our sonar read it as solid ground. Three new species logged on its shore.",
  },
];

export default function DiveLog() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section
      id="dives"
      className="relative scroll-mt-24 border-t border-bone/10 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.4em] text-lumen">
            EXPEDITION LOG · 2023 TO 2026
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Every descent,
            <br />
            on the record.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          {/* static guide line + scroll-drawn luminous line */}
          <div className="absolute left-1.75 top-0 h-full w-px bg-bone/10 md:left-1/2" />
          <motion.div
            className="absolute left-1.75 top-0 h-full w-px origin-top bg-linear-to-b from-lumen via-lumen to-lure shadow-[0_0_12px_rgba(92,242,224,0.6)] md:left-1/2"
            style={{ scaleY: line }}
          />

          <div className="space-y-16">
            {DIVES.map((d, i) => (
              <Reveal key={d.id} delay={0.05}>
                <div
                  className={`relative flex flex-col gap-3 pl-10 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:pr-14 md:text-right"
                      : "md:ml-auto md:pl-14"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`absolute left-0 top-1.5 flex h-3.75 w-3.75 items-center justify-center md:left-auto ${
                      i % 2 === 0
                        ? "md:right-[-7.5px]"
                        : "md:left-[-7.5px]"
                    }`}
                  >
                    <span className="absolute h-full w-full animate-ping rounded-full bg-lumen/30 [animation-duration:3s]" />
                    <span className="relative h-2 w-2 rounded-full bg-lumen shadow-[0_0_10px_rgba(92,242,224,0.9)]" />
                  </span>

                  <div
                    className={`font-mono flex items-center gap-3 text-[10px] tracking-[0.25em] text-bone/40 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="text-lumen">{d.id}</span>
                    <span>·</span>
                    <span>{d.year}</span>
                    <span>·</span>
                    <span className="text-lure">{d.depth}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-bone md:text-2xl">
                    {d.title}
                  </h3>
                  <p className="font-body text-sm font-light leading-relaxed text-bone/60">
                    {d.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
