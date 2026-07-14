"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cursor-reactive bioluminescent particle field.
 * Vanilla canvas with zero extra dependencies, DPR-aware for retina sharpness,
 * pauses when the tab is hidden, and respects prefers-reduced-motion.
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  hue: "cyan" | "amber";
  twinkle: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let raf = 0;
    let running = true;
    const particles: Particle[] = [];
    const pointer = { x: w / 2, y: h / 2, px: w / 2, py: h / 2, moved: false };

    const fitCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fitCanvas();

    const spawn = (x: number, y: number, burst = false): Particle => ({
      x,
      y,
      vx: (Math.random() - 0.5) * (burst ? 1.6 : 0.25),
      vy: -0.15 - Math.random() * (burst ? 1.3 : 0.35),
      r: burst ? 1 + Math.random() * 2.2 : 0.6 + Math.random() * 1.6,
      life: 0,
      maxLife: 160 + Math.random() * 220,
      hue: Math.random() < 0.88 ? "cyan" : "amber",
      twinkle: Math.random() * Math.PI * 2,
    });

    // ambient plankton
    const AMBIENT = reduced ? 45 : 100;
    for (let i = 0; i < AMBIENT; i++) {
      const p = spawn(Math.random() * w, Math.random() * h);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const onMove = (e: PointerEvent) => {
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.moved = true;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", fitCanvas);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVisibility);

    let t = 0;
    const tick = () => {
      if (!running) return;
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // cursor wake: spawn glowing motes scaled by pointer speed
      if (!reduced && pointer.moved && particles.length < 300) {
        const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
        const count = Math.min(1 + Math.floor(speed / 18), 4);
        for (let i = 0; i < count; i++) {
          particles.push(
            spawn(
              pointer.x + (Math.random() - 0.5) * 34,
              pointer.y + (Math.random() - 0.5) * 34,
              true
            )
          );
        }
        pointer.moved = false;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // gentle drift + slight attraction toward cursor
        if (!reduced) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 220 * 220) {
            const d = Math.sqrt(d2 + 1);
            p.vx += (dx / d) * 0.006;
            p.vy += (dy / d) * 0.006;
          }
        }
        p.x += p.vx + Math.sin(t + p.twinkle) * 0.08;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        const lt = p.life / p.maxLife;
        const fade = lt < 0.15 ? lt / 0.15 : 1 - (lt - 0.15) / 0.85;
        const shimmer = 0.75 + 0.25 * Math.sin(t * 3 + p.twinkle);
        const alpha = Math.max(fade, 0) * shimmer;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "cyan"
            ? `rgba(92, 242, 224, ${0.5 * alpha})`
            : `rgba(255, 180, 84, ${0.55 * alpha})`;
        ctx.fill();

        // soft halo on the larger motes
        if (p.r > 1.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle =
            p.hue === "cyan"
              ? `rgba(92, 242, 224, ${0.06 * alpha})`
              : `rgba(255, 180, 84, ${0.07 * alpha})`;
          ctx.fill();
        }

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > w + 10) {
          // recycle as ambient rising from below
          particles[i] = spawn(Math.random() * w, h + 5);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", fitCanvas);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
