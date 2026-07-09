/**
 * Fixed background "grade" for the homepage journey. Each scene owns one
 * tinted layer; Homepage's ScrollTrigger setup crossfades them as you move
 * through the narrative, so the color of the page flows continuously rather
 * than resetting per section. Purely decorative (behind everything).
 */
const layers: { name: string; css: string }[] = [
  {
    name: "founder",
    css: "radial-gradient(70% 60% at 28% 40%, rgba(91,42,134,0.5) 0%, rgba(5,5,5,0) 62%)",
  },
  {
    name: "challenge",
    css: "radial-gradient(75% 65% at 50% 32%, rgba(176,120,42,0.42) 0%, rgba(5,5,5,0) 60%)",
  },
  {
    name: "services",
    css: "radial-gradient(70% 60% at 68% 50%, rgba(58,58,128,0.46) 0%, rgba(5,5,5,0) 62%)",
  },
  {
    name: "articles",
    css: "radial-gradient(80% 70% at 50% 45%, rgba(108,60,150,0.4) 0%, rgba(150,110,40,0.14) 45%, rgba(5,5,5,0) 70%)",
  },
  {
    name: "newsletter",
    css: "radial-gradient(65% 55% at 50% 55%, rgba(180,132,52,0.4) 0%, rgba(5,5,5,0) 62%)",
  },
  {
    name: "final",
    css: "radial-gradient(60% 60% at 50% 48%, rgba(120,70,160,0.34) 0%, rgba(150,110,40,0.12) 45%, rgba(5,5,5,0) 72%)",
  },
];

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-void" aria-hidden>
      {layers.map((l) => (
        <div
          key={l.name}
          className={`atmo atmo-${l.name} absolute inset-0 opacity-0`}
          style={{ background: l.css }}
        />
      ))}
      {/* Slow-drifting light that keeps the grade alive. */}
      <div
        className="atmo-drift absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(150,110,60,0.18) 0%, rgba(5,5,5,0) 68%)",
        }}
      />
      {/* Constant edge vignette for depth. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, rgba(5,5,5,0) 55%, rgba(5,5,5,0.85) 100%)",
        }}
      />
    </div>
  );
}
