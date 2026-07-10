"use client";

import Image from "next/image";
import { useState } from "react";
import { links } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// The six programmes, each a slide. Images are drawn from the law/equity asset
// set (swap for richer per-programme art later).
const slides = [
  { no: "01", tag: "Tax-Free", name: "Private Church Strategy", blurb: "Lawfully grow and protect your wealth tax-free — the private strategies studied by top earners.", img: "/hero/hall.png", href: links.taxFree },
  { no: "02", tag: "Course", name: "Secure the Car", blurb: "The signature course on securing your property through lawful, private process.", img: "/hero/law-book.png", href: links.secureTheCar },
  { no: "03", tag: "1:1", name: "Coaching & Consulting", blurb: "Book a private session for tailored lawful and equity insight. Limited appointments.", img: "/hero/columns.png", href: links.appointment },
  { no: "04", tag: "Store", name: "Digital Products", blurb: "Courses, templates, and private-wealth resources — the tools for true financial freedom.", img: "/hero/library.png", href: links.shop },
  { no: "05", tag: "Community", name: "Black Sheep Community", blurb: "The members-only circle moving differently — support, accountability, and access.", img: "/hero/charter.png", href: links.blackSheep },
  { no: "06", tag: "Coming Soon", name: "Financial Literacy", blurb: "Equity, wealth building, and financial literacy — the simple way. A new programme.", img: "/hero/scales.jpg", href: links.newsletter },
];

const N = slides.length;

/**
 * 3D coverflow slider. Slides sit in perspective — the active one faces you,
 * neighbours angle back into depth — and slide/rotate between positions. Prev/
 * next + dot nav, and any side slide can be clicked to bring it forward.
 */
export default function Slider3D() {
  const [active, setActive] = useState(0);

  // Signed offset of slide i from the active one, wrapped to the nearest way
  // round the ring so the motion always takes the short path.
  const offsetOf = (i: number) => {
    let off = i - active;
    if (off > N / 2) off -= N;
    if (off < -N / 2) off += N;
    return off;
  };

  const styleFor = (i: number): React.CSSProperties => {
    const off = offsetOf(i);
    const abs = Math.abs(off);
    const x = off * 56; // % translate along the row
    const ry = off * -34; // deg — turn away from centre
    const z = -abs * 240; // px — recede
    const scale = off === 0 ? 1 : 0.82;
    return {
      transform: `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${ry}deg) scale(${scale})`,
      opacity: abs > 2 ? 0 : off === 0 ? 1 : 0.5,
      zIndex: 100 - abs,
      pointerEvents: abs > 2 ? "none" : "auto",
      filter: off === 0 ? "none" : "brightness(0.5)",
    };
  };

  const go = (dir: number) => setActive((a) => (a + dir + N) % N);
  const cur = slides[active];

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-void py-24">
      {/* Ambient stage glow. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.12) 0%, rgba(120,70,160,0.08) 40%, rgba(5,5,5,0) 70%)" }} />

      {/* Section heading. */}
      <div className="relative z-10 mx-auto mb-4 max-w-6xl px-8 text-center md:px-14">
        <p className="text-xs uppercase tracking-luxe text-gold/70">IV · The Programmes</p>
        <h2 className="mt-3 font-serif text-4xl text-white sm:text-5xl">
          Six paths to <span className="text-gold-gradient">private mastery.</span>
        </h2>
      </div>

      {/* ---------- 3D STAGE ---------- */}
      <div className="relative h-[62vh] w-full" style={{ perspective: "1800px" }}>
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {slides.map((s, i) => (
            <button
              key={s.no}
              type="button"
              aria-label={s.name}
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-1/2 h-full w-[42vw] max-w-[720px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all duration-700"
              style={{ ...styleFor(i), transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            >
              <Image src={s.img} alt={s.name} fill sizes="42vw" className="object-cover object-center" />
              {/* Grade + bottom scrim for the caption. */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0) 35%, rgba(5,5,5,0.55) 72%, rgba(5,5,5,0.92) 100%)" }} />
              <div className="absolute inset-0 mix-blend-color opacity-30" style={{ background: "linear-gradient(120deg, #3a2a60, #b0782a)" }} />

              {/* Caption — only legible on the active (front) slide. */}
              <div className="absolute inset-x-0 bottom-0 p-8 text-left">
                <span className="text-[0.65rem] uppercase tracking-luxe text-gold-bright">{s.no} · {s.tag}</span>
                <h3 className="mt-2 font-serif text-3xl leading-tight text-white">{s.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- ACTIVE CAPTION + CONTROLS ---------- */}
      <div className="relative z-10 mx-auto mt-8 flex max-w-3xl flex-col items-center gap-6 px-8 text-center">
        <p className="min-h-[3.2rem] max-w-xl text-sm leading-relaxed text-white/60">{cur.blurb}</p>

        <div className="flex items-center gap-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="press flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-bright transition-colors hover:bg-gold hover:text-black">
            <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((s, i) => (
              <button key={s.no} type="button" aria-label={`Go to ${s.name}`} onClick={() => setActive(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-gold-bright" : "w-1.5 bg-white/25 hover:bg-gold/60"}`} />
            ))}
          </div>

          <button type="button" onClick={() => go(1)} aria-label="Next" className="press flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-bright transition-colors hover:bg-gold hover:text-black">
            <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <a href={cur.href} {...ext} className="btn-lux mt-1">
          Discover <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
