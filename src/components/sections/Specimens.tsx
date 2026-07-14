import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const SPECIMENS = [
  {
    name: "Glass Squid",
    latin: "Cranchiidae",
    depthRange: "200 to 1,000 m",
    note: "Nearly invisible. Its only opaque organs are shaded by built-in photophores that erase its own shadow.",
    glow: "#5CF2E0",
  },
  {
    name: "Anglerfish",
    latin: "Melanocetus johnsonii",
    depthRange: "1,000 to 3,000 m",
    note: "Hunts with a lure of glowing bacteria. Our amber accent light is calibrated to its exact wavelength.",
    glow: "#FFB454",
  },
  {
    name: "Giant Siphonophore",
    latin: "Praya dubia",
    depthRange: "700 to 1,000 m",
    note: "A colonial organism longer than a blue whale, first filmed intact by Pelagic's Dive 47 camera array.",
    glow: "#5CF2E0",
  },
];

export default function Specimens() {
  return (
    <section
      id="specimens"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.4em] text-lumen">
          TWILIGHT ZONE · 200 TO 1,000 m
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          Where sunlight fails,
          <br />
          the ocean makes its own.
        </h2>
        <p className="font-body mt-6 max-w-xl text-base font-light leading-relaxed text-bone/60">
          Ninety percent of twilight-zone life is bioluminescent. Every card
          below is a specimen our camera arrays met face to face. Tilt them to
          catch the light.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SPECIMENS.map((s, i) => (
          <Reveal key={s.name} delay={0.05 + i * 0.1} className="h-full">
            <TiltCard {...s} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
