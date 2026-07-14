"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

/**
 * Midnight-zone instrument wall. Readouts jitter every couple of seconds
 * to feel like live telemetry from the vessel.
 */

type Instrument = {
  k: string;
  base: number;
  jitter: number;
  decimals: number;
  unit: string;
};

const INSTRUMENTS: Instrument[] = [
  { k: "EXTERNAL PRESSURE", base: 381.2, jitter: 0.5, decimals: 1, unit: "bar" },
  { k: "WATER TEMP", base: 1.9, jitter: 0.08, decimals: 1, unit: "°C" },
  { k: "SONAR RETURN", base: 4102, jitter: 14, decimals: 0, unit: "ms" },
  { k: "HULL INTEGRITY", base: 100, jitter: 0, decimals: 0, unit: "%" },
  { k: "O₂ RESERVE", base: 71.4, jitter: 0.05, decimals: 1, unit: "hr" },
  { k: "BALLAST TRIM", base: -0.4, jitter: 0.15, decimals: 1, unit: "°" },
];

const HEADLINE_STATS = [
  { label: "DIVES LOGGED", value: 61 },
  { label: "MAX DEPTH REACHED (m)", value: 3802 },
  { label: "SEAFLOOR MAPPED (km²)", value: 2340 },
];

export default function Telemetry() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState(() => INSTRUMENTS.map((i) => i.base));

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setValues(
        INSTRUMENTS.map(
          (ins) => ins.base + (Math.random() - 0.5) * 2 * ins.jitter
        )
      );
    }, 2000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="telemetry"
      className="relative scroll-mt-24 border-t border-bone/10 bg-void px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.4em] text-lure">
            MIDNIGHT ZONE · 1,000 TO 3,800 m
          </p>
          <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Total darkness.
            <br />
            Total instrumentation.
          </h2>
          <p className="font-body mt-6 max-w-xl text-base font-light leading-relaxed text-bone/60">
            At this depth the pressure equals a car parked on your thumbnail.
            Every reading below updates live from the vessel. Nothing down
            here is left to chance.
          </p>
        </Reveal>

        {/* live instrument grid */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 md:grid-cols-3">
          {INSTRUMENTS.map((ins, i) => (
            <Reveal key={ins.k} delay={i * 0.06} className="h-full">
              <div className="group h-full bg-trench p-6 transition-colors duration-300 hover:bg-trench/60 md:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-bone/40">
                    {ins.k}
                  </p>
                  <span
                    className="h-1 w-1 rounded-full bg-lumen/60 group-hover:animate-ping"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-mono mt-3 text-xl tabular-nums text-lumen transition-colors md:text-2xl">
                  {values[i].toLocaleString(undefined, {
                    minimumFractionDigits: ins.decimals,
                    maximumFractionDigits: ins.decimals,
                  })}
                  <span className="ml-1.5 text-sm text-lumen/50">
                    {ins.unit}
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* mission counters */}
        <div className="mt-20 grid gap-10 border-t border-bone/10 pt-14 sm:grid-cols-3">
          {HEADLINE_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center sm:text-left">
                <p className="font-display text-4xl font-extrabold text-bone md:text-5xl">
                  <CountUp value={s.value} />
                </p>
                <p className="font-mono mt-2 text-[10px] tracking-[0.25em] text-bone/40">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
