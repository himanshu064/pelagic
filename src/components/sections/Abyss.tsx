import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export default function Abyss() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[85vh] scroll-mt-24 flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      {/* angler-lure glow rising from the seafloor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(255,180,84,0.1),transparent_70%)]" />

      <Reveal>
        <p className="font-mono text-center text-[11px] tracking-[0.4em] text-lumen">
          ABYSSAL PLAIN · 3,800 m · SEAFLOOR REACHED
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display mt-6 max-w-4xl text-center text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
          The bottom is only
          <br />
          <span className="text-lure [text-shadow:0_0_60px_rgba(255,180,84,0.35)]">
            the beginning.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="font-body mx-auto mt-6 max-w-md text-center text-base font-light leading-relaxed text-bone/60">
          Charter a research seat, license our instrument data, or bring a
          camera crew where none has been before.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-10 flex justify-center">
          <MagneticButton href="mailto:expeditions@pelagic.example">
            BOOK AN EXPEDITION BRIEFING
          </MagneticButton>
        </div>
      </Reveal>

      <footer className="font-mono absolute bottom-6 left-1/2 flex w-full max-w-6xl -translate-x-1/2 items-center justify-between px-6 text-[10px] tracking-[0.2em] text-bone/30">
        <span>© 2026 PELAGIC EXPEDITION SYSTEMS</span>
        <span className="hidden md:block">
          27.9881° N · 86.9250° E · INVERTED
        </span>
        <span className="hidden sm:block">SURFACE ↑</span>
      </footer>
    </section>
  );
}
