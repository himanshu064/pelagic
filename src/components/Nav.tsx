"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const LINKS = [
  { href: "#specimens", label: "SPECIMENS" },
  { href: "#telemetry", label: "TELEMETRY" },
  { href: "#dives", label: "DIVE LOG" },
  { href: "#contact", label: "CONTACT" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 top-0 z-40 flex w-full items-center justify-between px-6 py-5 transition-all duration-500 md:px-10 ${
        scrolled
          ? "bg-ink/70 shadow-[0_1px_0_rgba(92,242,224,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <a
        href="#top"
        className="font-display text-lg font-black tracking-[0.2em] text-bone outline-none transition-colors hover:text-lumen focus-visible:text-lumen"
      >
        PELAGIC
      </a>

      <nav className="font-mono hidden items-center gap-8 text-[11px] tracking-[0.2em] md:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-bone/50 outline-none transition-colors hover:text-lumen focus-visible:text-lumen"
          >
            {l.label}
          </a>
        ))}
        <span className="flex items-center gap-2 text-lumen/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lumen opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lumen" />
          </span>
          DIVE 62 LIVE
        </span>
      </nav>

      <span className="font-mono text-[11px] tracking-[0.25em] text-bone/50 md:hidden">
        DIVE 62
      </span>
    </motion.header>
  );
}
