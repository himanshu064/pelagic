"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Magnetic CTA: the button leans toward the cursor with spring physics.
 */

export default function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const reduced = useReducedMotion();

  const classes =
    variant === "primary"
      ? "bg-lumen text-ink shadow-[0_0_40px_rgba(92,242,224,0.35)] hover:shadow-[0_0_70px_rgba(92,242,224,0.55)]"
      : "border border-lumen/40 text-lumen hover:border-lumen hover:shadow-[0_0_40px_rgba(92,242,224,0.2)]";

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className={`font-mono inline-block cursor-pointer rounded-full px-9 py-4 text-sm font-medium tracking-[0.15em] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-lure ${classes}`}
    >
      {children}
    </Tag>
  );
}
