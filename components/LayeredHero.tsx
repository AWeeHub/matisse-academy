"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger);

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const features = [
  {
    title: "World-Class Education",
    body: "Curated programs designed by industry leaders.",
    icon: (
      <path d="M4 19V7l8-3 8 3v12M4 19h16M4 19l8-3 8 3M8 11h.01M12 11h.01M16 11h.01" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Strategic Mentorship",
    body: "Learn from proven experts and thought leaders.",
    icon: (
      <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3zM6 18h12M8 21h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Exclusive Network",
    body: "Connect with high-achievers and future leaders.",
    icon: (
      <path d="M12 3l2.2 4.2H19l-4 3 1.6 4.8L12 12.6 7.4 15l1.6-4.8-4-3h4.8L12 3zM5 20h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Lasting Legacy",
    body: "Build influence. Create impact. Leave a legacy.",
    icon: (
      <path d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 13l-1.5 8L12 18l4.5 3L15 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

const socials = [
  { label: "IG", href: "https://instagram.com/amyr_law" },
  { label: "LI", href: "https://matisseacademy.com" },
  { label: "FB", href: "https://matisseacademy.com" },
];

/**
 * Layered-parallax photographic hero (prototype). A dark law-library scene
 * composited from depth planes — library background, brass scales midground,
 * law book + charter foreground, gold atmosphere — that drift on scroll and
 * lean toward the cursor for a real sense of depth (the "TikTok" layered feel).
 */
export default function LayeredHero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let removeTilt: (() => void) | undefined;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(q("[data-enter]"), { clearProps: "all", opacity: 1 });
        return;
      }

      // --- Entrance: layers resolve from black + blur, copy builds in. ---
      gsap.from(q(".lh-layer"), {
        opacity: 0,
        scale: 1.06,
        filter: "blur(14px)",
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from(q(".lh-line"), {
        opacity: 0,
        y: 34,
        filter: "blur(8px)",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.13,
        delay: 0.35,
      });
      gsap.from(q(".lh-feature"), {
        opacity: 0,
        y: 26,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.9,
      });

      // --- Scroll parallax: each plane drifts at a depth-scaled speed. ---
      (q("[data-depth]") as HTMLElement[]).forEach((el) => {
        const d = parseFloat(el.dataset.depth || "0");
        gsap.to(el, {
          yPercent: d,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --- Pointer parallax: planes lean toward the cursor, deeper planes
      //     travelling less, so the composite reads as layered depth. ---
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine) {
        const tilters = (q("[data-tilt]") as HTMLElement[]).map((el) => ({
          depth: parseFloat(el.dataset.tilt || "0"),
          x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" }),
        }));
        if (tilters.length) {
          const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            for (const t of tilters) {
              t.x(nx * t.depth * 34);
              t.y(ny * t.depth * 22);
            }
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          removeTilt = () => window.removeEventListener("pointermove", onMove);
        }
      }
    }, root);

    return () => {
      removeTilt?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative bg-void">
      <section className="relative h-screen w-full overflow-hidden">
        {/* ---------- LAYERED IMAGE STAGE (right-biased montage) ---------- */}
        <div className="pointer-events-none absolute inset-0">
          {/* Backmost: the library, soft + dark. */}
          <div className="lh-layer absolute inset-0" data-depth="14" data-tilt="0.12">
            <Image src="/bg-library.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-[0.55]" style={{ filter: "blur(2px) saturate(0.9)" }} />
          </div>

          {/* Gold aura behind the focal scales. */}
          <div
            className="lh-layer absolute right-[6%] top-1/2 h-[80vmin] w-[70vmin] -translate-y-1/2 rounded-full"
            data-depth="8"
            data-tilt="0.2"
            style={{ background: "radial-gradient(circle, rgba(196,140,52,0.34) 0%, rgba(120,70,160,0.12) 45%, rgba(5,5,5,0) 70%)" }}
          />

          {/* Columns, framing the right side. */}
          <div className="lh-layer absolute inset-y-0 right-[30%] w-[42vw] max-w-[720px]" data-depth="22" data-tilt="0.34">
            <Image src="/hero/columns.png" alt="" fill sizes="42vw" className="object-cover object-center opacity-40" style={{ maskImage: "linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)" }} />
          </div>

          {/* Midground focal: the brass scales. */}
          <div className="lh-layer absolute right-[4%] top-1/2 h-[78vh] w-[52vw] max-w-[820px] -translate-y-1/2" data-depth="34" data-tilt="0.55">
            <Image src="/hero/scales.jpg" alt="Scales of justice" fill sizes="52vw" className="object-contain object-center" style={{ maskImage: "radial-gradient(70% 80% at 55% 50%, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(70% 80% at 55% 50%, #000 55%, transparent 100%)" }} />
          </div>

          {/* Foreground: the law book + charter, lower-right, fastest plane. */}
          <div className="lh-layer absolute bottom-[8%] right-[6%] h-[46vh] w-[40vw] max-w-[620px]" data-depth="52" data-tilt="0.85">
            <Image src="/hero/law-book.png" alt="" fill sizes="40vw" className="object-contain object-bottom" style={{ maskImage: "radial-gradient(80% 80% at 55% 60%, #000 50%, transparent 100%)", WebkitMaskImage: "radial-gradient(80% 80% at 55% 60%, #000 50%, transparent 100%)" }} />
          </div>

          {/* Gold light rays from top-right (the window light). */}
          <div className="lh-layer absolute inset-0 mix-blend-screen opacity-70" data-depth="6" style={{ background: "linear-gradient(220deg, rgba(255,214,140,0.22) 0%, rgba(255,190,110,0.06) 26%, rgba(5,5,5,0) 52%)" }} />

          {/* Gold dust atmosphere. */}
          <div className="lh-layer absolute inset-0 mix-blend-screen opacity-50" data-depth="4" data-tilt="0.5">
            <Image src="/hero/particles.png" alt="" fill sizes="100vw" className="object-cover" />
          </div>
        </div>

        {/* ---------- LEGIBILITY SCRIMS ---------- */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.82) 30%, rgba(5,5,5,0.35) 55%, rgba(5,5,5,0) 78%)" }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(0deg, #050505 0%, rgba(5,5,5,0) 24%, rgba(5,5,5,0) 82%, rgba(5,5,5,0.6) 100%)" }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(130% 120% at 50% 45%, rgba(5,5,5,0) 55%, rgba(5,5,5,0.55) 100%)" }} />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* ---------- HEADER ---------- */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-8 py-6 md:px-14">
          <div className="lh-line flex items-center gap-3" data-enter>
            <Image src="/logo-mark.png" alt="Matisse Academy" width={150} height={100} className="h-10 w-auto object-contain" />
            <span className="font-serif text-lg tracking-wide text-gold-gradient">Matisse Academy</span>
          </div>
          <nav className="lh-line hidden items-center gap-8 text-[0.72rem] uppercase tracking-luxe text-white/60 lg:flex" data-enter>
            <a className="transition-colors hover:text-white" href="#">About</a>
            <a className="transition-colors hover:text-white" href="#">Programs</a>
            <a className="transition-colors hover:text-white" href="#">Events</a>
            <a className="transition-colors hover:text-white" href="#">Inside the Academy</a>
            <a className="transition-colors hover:text-white" href="#">Success Stories</a>
            <a className="transition-colors hover:text-white" href="#">Contact</a>
          </nav>
          <a href={links.challenge3Day} {...ext} className="lh-line btn-lux btn-lux-sm" data-enter>
            Secure My Spot <span aria-hidden>→</span>
          </a>
        </header>

        {/* ---------- SOCIAL RAIL ---------- */}
        <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex md:left-14">
          <div className="lh-line h-16 w-px bg-white/15" data-enter />
          {socials.map((s) => (
            <a key={s.label} href={s.href} {...ext} className="lh-line text-[0.62rem] uppercase tracking-luxe text-white/45 transition-colors hover:text-gold-bright" data-enter>
              {s.label}
            </a>
          ))}
          <div className="lh-line h-16 w-px bg-white/15" data-enter />
        </div>

        {/* ---------- CONTENT (left) ---------- */}
        <div className="relative z-20 flex h-full items-center">
          <div className="max-w-2xl px-8 md:pl-28 md:pr-6">
            <p className="lh-line mb-6 text-xs uppercase tracking-luxe text-gold/70" data-enter>
              III · The Doctrine
            </p>
            <h1 className="lh-line font-serif text-5xl leading-[1.04] text-white sm:text-6xl md:text-7xl" data-enter>
              A Legacy of <span className="text-gold-gradient">Excellence.</span>
              <br />A Future of <span className="text-gold-gradient">Impact.</span>
            </h1>
            <p className="lh-line mt-7 max-w-md text-base leading-relaxed text-white/60" data-enter>
              Education, mentorship, and strategic guidance for those seeking
              mastery in equity, law, commerce, and private wealth.
            </p>
            <a href={links.services} {...ext} className="lh-line btn-lux mt-10" data-enter>
              Explore Our Services <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* ---------- PAGER (right) ---------- */}
        <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex">
          {["01", "02", "03", "04", "05"].map((n, i) => (
            <span key={n} className={`lh-line text-[0.66rem] tracking-luxe ${i === 0 ? "text-gold-bright" : "text-white/35"}`} data-enter>
              {n}
            </span>
          ))}
        </div>

        {/* ---------- SCROLL CUE ---------- */}
        <div className="lh-line absolute bottom-8 left-8 z-30 flex flex-col items-start gap-2 text-white/45 md:left-14" data-enter>
          <span className="text-[0.62rem] uppercase tracking-luxe leading-tight">Scroll<br />to Discover</span>
        </div>

        {/* ---------- FEATURE ROW ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/8 bg-gradient-to-t from-void/95 to-transparent">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-6 px-8 py-7 md:grid-cols-4 md:px-14">
            {features.map((f) => (
              <div key={f.title} className="lh-feature flex items-start gap-3.5">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-7 w-7 shrink-0 text-gold-bright" aria-hidden>{f.icon}</svg>
                <div>
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/90">{f.title}</h3>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-white/45">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer so the scroll parallax has room to play in the preview. */}
      <section className="flex h-screen items-center justify-center">
        <p className="px-6 text-center font-serif text-2xl italic text-white/30">
          (Layered-hero preview — the rest of the page continues below.)
        </p>
      </section>
    </div>
  );
}
