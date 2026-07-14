"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * 3D specimen card: spring-physics tilt, cursor-tracked glare sheen,
 * and a translateZ content layer for real parallax depth.
 */

export default function TiltCard({
  name,
  latin,
  depthRange,
  note,
  glow,
  index,
}: {
  name: string;
  latin: string;
  depthRange: string;
  note: string;
  glow: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const reduced = useReducedMotion();

  const glare = useMotionTemplate`radial-gradient(320px circle at ${glareX}% ${glareY}%, rgba(220,237,239,0.08), transparent 60%)`;

  return (
    <div ref={ref} style={{ perspective: 900 }} className="h-full">
      <motion.article
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          if (reduced) return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 14);
          rx.set(-(py - 0.5) * 14);
          glareX.set(px * 100);
          glareY.set(py * 100);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="group relative h-full overflow-hidden rounded-2xl border border-lumen/15 bg-trench/80 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-lumen/40"
      >
        {/* glow bloom, top-right */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: glow }}
        />
        {/* cursor-tracked glare sheen */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />

        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] tracking-[0.3em] text-lumen/70">
              SPECIMEN LOG
            </p>
            <p className="font-mono text-[10px] tabular-nums text-bone/30">
              N°{String(index + 1).padStart(3, "0")}
            </p>
          </div>
          <h3 className="font-display mt-3 text-2xl font-bold text-bone">
            {name}
          </h3>
          <p className="font-body mt-1 text-sm italic text-bone/50">{latin}</p>
          <div className="font-mono mt-6 flex items-center justify-between border-t border-bone/10 pt-4 text-xs text-bone/70">
            <span>RANGE</span>
            <span className="text-lumen">{depthRange}</span>
          </div>
          <p className="font-body mt-4 text-sm leading-relaxed text-bone/70">
            {note}
          </p>
        </div>
      </motion.article>
    </div>
  );
}
