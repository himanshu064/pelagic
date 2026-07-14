const STATS = [
  { text: "61 DIVES LOGGED", accent: "lumen" },
  { text: "4,000 m HULL RATING", accent: "lure" },
  { text: "12 SPECIES FIRST OBSERVED", accent: "lumen" },
  { text: "2,340 km² SEAFLOOR MAPPED", accent: "lure" },
  { text: "0 INCIDENTS", accent: "lumen" },
] as const;

export default function StatMarquee() {
  return (
    <section className="relative z-20 border-y border-bone/10 bg-trench/60 py-5">
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="font-mono marquee-track flex w-max gap-14 whitespace-nowrap text-sm text-bone/60">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-14" aria-hidden={copy === 1}>
              {STATS.map((s) => (
                <span key={s.text} className="flex items-center gap-14">
                  <span>{s.text}</span>
                  <span
                    className={s.accent === "lumen" ? "text-lumen" : "text-lure"}
                  >
                    ◆
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
