"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Atmosphere from "@/components/Atmosphere";
import Seal from "@/components/Seal";
import { links, socials } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger);

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const romans = ["I", "II", "III", "IV", "V", "VI"];

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-[0.65rem] uppercase tracking-luxe text-gold/60">{title}</h4>
      <div className="mt-3 h-px w-8 bg-gold/25" />
      <nav className="mt-4 flex flex-col gap-2.5">{children}</nav>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      {...ext}
      className="group inline-flex w-fit items-center text-sm text-white/55 transition-colors hover:text-white"
    >
      {/* Gold dash slides in on hover — transform-only, space reserved. */}
      <span className="mr-2 h-px w-4 origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
      {children}
    </a>
  );
}

const challenges = [
  {
    tier: "3-Day",
    title: "Master Your Rights Challenge",
    dates: "August 8 – 10, 2026",
    blurb: "A focused, live intensive to master your rights, fast.",
    href: links.challenge3Day,
  },
  {
    tier: "5-Day",
    title: "Master Your Rights Challenge",
    dates: "September 15 – 19, 2026",
    blurb: "The deep-dive format — equity, law, and private wealth in full.",
    href: links.challenge5Day,
  },
];

const pathways = [
  { tag: "Tax-Free", title: "Private Church Strategy", body: "Lawfully grow and protect your wealth tax-free — private strategies studied by top earners.", cta: "Unlock the Tax-Free Strategy", href: links.taxFree },
  { tag: "Course", title: "Secure the Car", body: "The signature course on securing your property through lawful, private process.", cta: "Start the Course", href: links.secureTheCar },
  { tag: "1:1", title: "Coaching & Consulting", body: "Book a private session for tailored lawful and equity insights. Limited appointments.", cta: "Request Your Appointment", href: links.appointment },
  { tag: "Store", title: "Digital Products", body: "Courses, templates, and private-wealth resources — the tools for true financial freedom.", cta: "Shop the Resources", href: links.shop },
  { tag: "Community", title: "Black Sheep Community", body: "Join the members-only community moving differently — support, accountability, and access.", cta: "Join the Community", href: links.blackSheep },
  { tag: "Coming Soon", title: "Financial Literacy for Real Life", body: "Equity, wealth building, and financial literacy the simple way. New program.", cta: "Get on the List", href: links.newsletter },
];

export default function Homepage() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(q("[data-enter], [data-depth], [data-sweep]"), {
          clearProps: "all",
        });
        gsap.set(".atmo-articles", { opacity: 1 });
        return;
      }

      // --- Parallax depth: layers drift at scroll-scrubbed speeds ---
      (q("[data-depth]") as HTMLElement[]).forEach((el) => {
        const d = parseFloat(el.dataset.depth || "0");
        const scene = el.closest(".scene");
        gsap.fromTo(
          el,
          { yPercent: -d },
          {
            yPercent: d,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // --- Light sweep: a bright bar passes across each scene on scroll ---
      (q("[data-sweep]") as HTMLElement[]).forEach((el) => {
        const scene = el.closest(".scene");
        gsap.fromTo(
          el,
          { xPercent: -130, opacity: 0 },
          {
            xPercent: 130,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // --- Continuous atmosphere grade: one trigger per scene fades its tint
      //     up as it enters center and down as it leaves, so neighbouring
      //     grades crossfade into a single continuous journey. ---
      (q(".scene") as HTMLElement[]).forEach((scene) => {
        const name = scene.dataset.scene;
        if (!name) return;
        const layer = document.querySelector(`.atmo-${name}`) as HTMLElement;
        if (!layer) return;
        ScrollTrigger.create({
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (st) => {
            const o = 1 - Math.abs(st.progress - 0.5) * 2; // triangle 0→1→0
            gsap.set(layer, { opacity: Math.max(0, o) });
          },
        });
      });

      // Drift the ambient light slightly with scroll for life.
      gsap.to(".atmo-drift", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { start: "top top", end: "bottom bottom", scrub: true },
      });

      // --- Scene entrances (unique per chapter) ---
      const onEnter = (trigger: Element) => ({
        scrollTrigger: { trigger, start: "top 72%", once: true },
      });

      // I. Founder — portrait wipes in, credentials rise.
      const f = q("[data-scene='founder']")[0];
      if (f) {
        gsap.fromTo(
          f.querySelector(".portrait"),
          { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
          { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.1, ease: "power3.out", ...onEnter(f) }
        );
        gsap.from(f.querySelectorAll(".f-line"), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          ...onEnter(f),
        });
      }

      // II. Challenge — heading pulls focus, cards rise.
      const c = q("[data-scene='challenge']")[0];
      if (c) {
        gsap.from(c.querySelector(".c-head"), {
          y: 24,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          ease: "power3.out",
          ...onEnter(c),
        });
        gsap.from(c.querySelectorAll(".c-card"), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: c, start: "top 60%", once: true },
        });
      }

      // III. Services — the statement focuses in (scale + blur pull).
      const s = q("[data-scene='services']")[0];
      if (s) {
        gsap.fromTo(
          s.querySelector(".s-head"),
          { scale: 1.14, opacity: 0, filter: "blur(14px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", ...onEnter(s) }
        );
        gsap.from(s.querySelector(".s-cta"), {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: s, start: "top 55%", once: true },
        });
      }

      // IV. Articles — the charter is dealt out card by card.
      const a = q("[data-scene='articles']")[0];
      if (a) {
        gsap.from(a.querySelector(".a-head"), {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          ...onEnter(a),
        });
        gsap.from(a.querySelectorAll(".a-card"), {
          y: 70,
          opacity: 0,
          rotateX: -12,
          transformOrigin: "50% 0%",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: a, start: "top 62%", once: true },
        });
      }

      // V. Newsletter — the message blooms.
      const n = q("[data-scene='newsletter']")[0];
      if (n) {
        gsap.from(n.querySelectorAll(".n-line"), {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          ...onEnter(n),
        });
      }

      // VI. Final — the seal is set, the decree resolves.
      const fin = q("[data-scene='final']")[0];
      if (fin) {
        gsap.from(fin.querySelector(".seal-wrap"), {
          scale: 0.7,
          opacity: 0,
          rotate: -25,
          duration: 1.2,
          ease: "power3.out",
          ...onEnter(fin),
        });
        gsap.from(fin.querySelectorAll(".fin-line"), {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: fin, start: "top 58%", once: true },
        });
      }

      // --- Narrative spine: the gold thread fills with progress ---
      gsap.to(".spine-fill", {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <Atmosphere />

      {/* Narrative spine */}
      <div className="pointer-events-none fixed left-5 top-0 z-30 hidden h-full w-px bg-white/8 md:block">
        <div className="spine-fill h-full w-full origin-top scale-y-0 bg-gradient-to-b from-gold-bright via-gold to-transparent" />
      </div>

      <main className="relative z-10">
        {/* I. The Founder */}
        <section
          data-scene="founder"
          id="founder"
          className="scene relative flex min-h-screen items-center overflow-hidden py-28"
        >
          <div
            data-depth="14"
            className="pointer-events-none absolute -left-20 top-10 h-[70vmin] w-[70vmin] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(120,70,160,0.28) 0%, rgba(5,5,5,0) 70%)" }}
          />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="8" />
          <div
            data-sweep
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen"
            style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,70,0.10), transparent)" }}
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[0.85fr_1fr]">
            <div className="relative mx-auto w-full max-w-xs" data-depth="-6">
              <div className="pointer-events-none absolute -inset-6 rounded-full" style={{ background: "radial-gradient(circle, rgba(120,70,160,0.4) 0%, rgba(5,5,5,0) 70%)" }} />
              <Image
                src="/amyr-hero-portrait.jpg"
                alt="Amyr Samah El, founder of Matisse Academy"
                width={654}
                height={963}
                className="portrait relative aspect-[4/5] rounded-2xl border border-white/10 object-cover object-top shadow-2xl"
              />
            </div>
            <div>
              <p className="f-line mb-5 text-xs uppercase tracking-luxe text-gold/70">
                I · The Founder
              </p>
              <h2 className="f-line font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
                Amyr Samah El
              </h2>
              <p className="f-line mt-4 text-xs uppercase tracking-[0.25em] text-gold-gradient">
                Private Trust &amp; Wealth Protection Strategist
              </p>
              <div className="f-line rule-luxe my-8 max-w-[8rem]" />
              <p className="f-line max-w-md text-lg leading-relaxed text-white/65">
                &ldquo;I guide individuals and families to protect their assets,
                minimize liabilities, and secure generational wealth through
                private trusts and lawful strategies.&rdquo;
              </p>
              <a href={links.appointment} {...ext} className="f-line press mt-9 inline-block rounded-full border border-gold/40 px-7 py-3 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10">
                Work With Amyr
              </a>
            </div>
          </div>
        </section>

        {/* II. The Summons */}
        <section
          data-scene="challenge"
          id="challenge"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-28"
        >
          <div data-depth="16" className="pointer-events-none absolute left-1/2 top-0 h-[55vmin] w-[85vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.3) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="8" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,70,0.12), transparent)" }} />

          <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
            <div className="c-head" data-depth="-5">
              <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">II · The Summons</p>
              <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
                The <span className="text-gold-gradient">Master Your Rights</span> Challenge
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
                An immersive challenge on equity, law, and private wealth — taught live. Choose the format that fits you.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
              {challenges.map((c) => (
                <div key={c.tier} className="c-card card flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-8 py-10 text-left backdrop-blur-sm">
                  <span className="font-serif text-5xl text-gold-gradient">{c.tier}</span>
                  <h3 className="mt-4 font-serif text-xl text-white">{c.title}</h3>
                  <p className="mt-1 text-sm font-medium text-gold-bright">{c.dates}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{c.blurb}</p>
                  <a href={c.href} {...ext} className="press mt-6 inline-block self-start rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-luxe text-black">Secure My Spot</a>
                </div>
              ))}
            </div>
            <a href={links.events} {...ext} className="c-card mt-12 inline-block text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white">
              See all upcoming events →
            </a>
          </div>
        </section>

        {/* III. The Doctrine */}
        <section
          data-scene="services"
          id="services"
          className="scene relative flex min-h-screen items-center overflow-hidden py-28 text-center"
        >
          <div data-depth="14" className="pointer-events-none absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(58,58,128,0.32) 0%, rgba(5,5,5,0) 66%)" }} />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(120,120,200,0.10), transparent)" }} />

          <div className="relative mx-auto max-w-5xl px-6">
            <p className="s-head mb-6 text-xs uppercase tracking-luxe text-gold/70">III · The Doctrine</p>
            <h2 className="s-head mx-auto max-w-3xl font-serif text-3xl leading-[1.12] text-white sm:text-5xl">
              Education, mentorship, and strategic guidance for those seeking mastery in equity, law, commerce, and private wealth.
            </h2>
            <a href={links.services} {...ext} className="s-cta press mt-10 inline-block rounded-full border border-gold/40 px-7 py-3 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10">
              Explore Our Services
            </a>
          </div>
        </section>

        {/* IV. The Charter */}
        <section
          data-scene="articles"
          className="scene relative overflow-hidden border-t border-white/5 py-28"
        >
          <div data-depth="12" className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[95vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(108,60,150,0.26) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="7" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,80,0.10), transparent)" }} />

          <div className="relative mx-auto max-w-6xl px-6" style={{ perspective: "1200px" }}>
            <div className="a-head mb-14 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">IV · The Charter</p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                Six articles, one path to private mastery.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pathways.map((p, i) => (
                <article key={p.title} className="a-card card flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-8 py-10 backdrop-blur-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl leading-none text-gold-gradient">{romans[i]}</span>
                    <span className="text-[0.65rem] uppercase tracking-luxe text-gold/70">{p.tag}</span>
                  </div>
                  <div className="rule-luxe my-5" />
                  <h3 className="font-serif text-2xl text-white">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{p.body}</p>
                  <a href={p.href} {...ext} className="mt-7 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white">{p.cta} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* V. The Correspondence */}
        <section
          data-scene="newsletter"
          className="scene relative flex min-h-[70vh] items-center overflow-hidden py-24 text-center"
        >
          <div data-depth="12" className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(180,132,52,0.26) 0%, rgba(5,5,5,0) 68%)" }} />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,160,80,0.1), transparent)" }} />

          <div className="relative mx-auto max-w-2xl px-6">
            <p className="n-line mb-4 text-xs uppercase tracking-luxe text-gold/70">V · The Correspondence</p>
            <h2 className="n-line font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
              Equity, law, and private wealth — straight to your inbox.
            </h2>
            <a href={links.newsletter} {...ext} className="n-line press mt-8 inline-block rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-luxe text-black">
              Join the Newsletter
            </a>
          </div>
        </section>

        {/* VI. The Seal */}
        <section
          data-scene="final"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-32 text-center"
        >
          <div data-depth="10" className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(120,70,160,0.26) 0%, rgba(5,5,5,0) 66%)" }} />

          <div className="relative mx-auto max-w-2xl px-6">
            <div className="seal-wrap mb-10 flex justify-center">
              <Image
                src="/logo-3d.png"
                alt="Matisse Academy"
                width={760}
                height={507}
                className="h-40 w-auto object-contain drop-shadow-[0_0_50px_rgba(120,70,160,0.4)]"
              />
            </div>
            <p className="fin-line mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
              VI · The Seal — Matthew 4:19 · KJV 1611
            </p>
            <h2 className="fin-line mx-auto max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
              Notice is the heart of <span className="text-gold-gradient">equity.</span>
            </h2>
            <p className="fin-line mx-auto mt-5 max-w-lg text-sm text-white/50">
              Begin your path to mastery in private wealth and lawful strategy.
            </p>
            <a href={links.challenge3Day} {...ext} className="fin-line press mt-10 inline-block rounded-full bg-gold px-9 py-3 text-xs uppercase tracking-luxe text-black">
              Secure My Spot
            </a>
          </div>
        </section>

        {/* Footer — the colophon */}
        <footer className="relative z-10 overflow-hidden border-t border-gold/15">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(217,164,65,0.6), transparent)" }}
          />
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo-3d.png"
                    alt="Matisse Academy"
                    width={200}
                    height={133}
                    className="h-12 w-auto object-contain"
                  />
                  <span className="font-serif text-xl tracking-wide text-gold-gradient">
                    Matisse Academy
                  </span>
                </div>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/45">
                  Education, mentorship, and strategy in equity, law, commerce,
                  and private wealth — with Amyr Samah El.
                </p>
                <p className="mt-6 font-serif text-lg italic text-white/70">
                  &ldquo;Notice is the heart of equity.&rdquo;
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold/50">
                  Matthew 4:19 · KJV 1611
                </p>
              </div>

              {/* Programs */}
              <FooterCol title="Programs">
                <FooterLink href={links.challenge3Day}>The Challenge</FooterLink>
                <FooterLink href={links.services}>Services</FooterLink>
                <FooterLink href={links.shop}>Digital Store</FooterLink>
                <FooterLink href={links.appointment}>1:1 Coaching</FooterLink>
                <FooterLink href={links.events}>Events</FooterLink>
              </FooterCol>

              {/* Access */}
              <FooterCol title="Access">
                <FooterLink href={links.taxFree}>Tax-Free Strategy</FooterLink>
                <FooterLink href={links.secureTheCar}>Secure the Car</FooterLink>
                <FooterLink href={links.blackSheep}>Black Sheep</FooterLink>
                <FooterLink href={links.affiliate}>Affiliates</FooterLink>
                <FooterLink href={links.newsletter}>Newsletter</FooterLink>
              </FooterCol>

              {/* Connect + sigil */}
              <div>
                <FooterCol title="Connect">
                  <FooterLink href={socials.instagram}>Instagram</FooterLink>
                  <FooterLink href={socials.youtube}>YouTube</FooterLink>
                  <FooterLink href={socials.tiktok}>TikTok</FooterLink>
                  <FooterLink href={socials.facebook}>Facebook</FooterLink>
                </FooterCol>
                <div className="mt-8 hidden md:block">
                  <Seal size={72} />
                </div>
              </div>
            </div>

            {/* Disclaimer plate */}
            <div className="mt-16 rounded-xl border border-white/8 bg-white/[0.015] px-6 py-5">
              <p className="text-[0.72rem] leading-relaxed text-white/35">
                <span className="font-medium uppercase tracking-luxe text-gold/50">Disclaimer — </span>
                For informational purposes only. We are not BAR-card licensed
                enrollees, nor is any content herein legal, tax, or financial advice.
              </p>
            </div>

            {/* Bottom bar */}
            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-xs uppercase tracking-luxe text-white/40 sm:flex-row">
              <span>© {new Date().getFullYear()} Matisse Academy · Amyr Samah El</span>
              <span className="text-gold/45">All rights reserved</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
