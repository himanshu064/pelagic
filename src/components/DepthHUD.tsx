"use client";

import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * Scroll-driven dive instrument. Counts down from 0 m to −3,800 m as the
 * page scrolls, with a segmented zone rail that lights up per ocean layer.
 */

export const MAX_DEPTH = 3800;

const ZONES = [
  { until: 0.3, label: "SUNLIGHT ZONE" },
  { until: 0.62, label: "TWILIGHT ZONE" },
  { until: 0.9, label: "MIDNIGHT ZONE" },
  { until: 1.01, label: "ABYSSAL PLAIN" },
];

export default function DepthHUD({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const [depth, setDepth] = useState(0);
  const [zoneIdx, setZoneIdx] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setDepth(Math.round(Math.min(Math.max(v, 0), 1) * MAX_DEPTH));
    setZoneIdx(Math.max(ZONES.findIndex((z) => v <= z.until), 0));
  });

  return (
    <div
      className="font-mono pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      aria-hidden="true"
    >
      {/* zone rail, one segment per ocean layer */}
      <div className="flex flex-col items-end gap-1.5">
        {ZONES.map((z, i) => (
          <div key={z.label} className="flex items-center gap-2">
            <span
              className={`block h-6 w-0.75 rounded-full transition-all duration-500 ${
                i === zoneIdx
                  ? "bg-lumen shadow-[0_0_12px_rgba(92,242,224,0.8)]"
                  : i < zoneIdx
                    ? "bg-lumen/40"
                    : "bg-bone/15"
              }`}
            />
          </div>
        ))}
      </div>

      {/* tick marks */}
      <div className="flex flex-col items-end gap-1.75">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="block h-px bg-lumen"
            style={{ width: i % 4 === 0 ? 22 : 10, opacity: 0.5 }}
          />
        ))}
      </div>

      {/* readout */}
      <div className="text-right">
        <div className="text-2xl font-medium tabular-nums text-lumen [text-shadow:0_0_24px_rgba(92,242,224,0.45)]">
          −{depth.toLocaleString()}
          <span className="ml-1 text-xs text-lumen/60">m</span>
        </div>
        <div className="mt-1 text-[10px] tracking-[0.25em] text-bone/50">
          {ZONES[zoneIdx].label}
        </div>
        <div className="mt-2 text-[9px] tracking-[0.2em] text-bone/30">
          {(depth * 0.1003).toFixed(1)} bar
        </div>
      </div>
    </div>
  );
}
