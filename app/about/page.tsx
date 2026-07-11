import Image from "next/image";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";
import MobileNav from "@/components/MobileNav";
import VideoEmbed from "@/components/VideoEmbed";
import AboutHero from "@/components/AboutHero";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import { links } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// @amyrlaw: "What it looks like finding purpose through exclusive equity" —
// a story-driven clip that fits the founder page.
const FOUNDER_VIDEO_ID = "CrPE8cDMmfU";

const focus = [
  "Private Trusts",
  "Asset Protection",
  "Tax-Free Strategy",
  "Lawful Process",
  "Generational Wealth",
];

// His story as chapters — read as a timeline rather than a block of prose.
const journey = [
  {
    k: "01",
    title: "A courtroom of his own",
    body: "Amyr’s path began not in a classroom, but in a courtroom of his own. Facing his own warrants and traffic matters, he refused to accept that the system was closed to him — and started a lifelong study of Exclusive Equity Jurisprudence, the private body of law built on notice, remedy, and standing.",
  },
  {
    k: "02",
    title: "Remedy over conflict",
    body: "In the years since, he has devoted his practice to settling and closing matters of debt and obligation through lawful remedy — helping people move from conflict toward resolution, privately and lawfully.",
  },
  {
    k: "03",
    title: "Teaching what protects",
    body: "His focus spans traffic court, civil debt and obligation, and criminal misdemeanors — always with the same aim: to teach what protects, and to resolve rather than to fight.",
  },
];

const domains = [
  {
    n: "01",
    name: "Equity",
    desc: "The lens of fairness, rights, and remedy.",
    paths: ["M12 3 5 6v5c0 4.6 3 7.6 7 9 4-1.4 7-4.4 7-9V6l-7-3Z", "M12 9v5", "M9.5 11.5 12 14l2.5-2.5"],
  },
  {
    n: "02",
    name: "Law",
    desc: "Lawful power, protection, and strategy.",
    paths: ["M12 3v18", "M6 20h12", "M5 8h14", "M5 8 2.5 14a3 3 0 0 0 5 0L5 8Z", "M19 8l-2.5 6a3 3 0 0 0 5 0L19 8Z", "m5 8 7-2 7 2"],
  },
  {
    n: "03",
    name: "Commerce",
    desc: "Contracts, systems, and value in motion.",
    paths: ["M3 21h18", "M4 10h16", "M12 3 4 8h16l-8-5Z", "M6 10v8", "M10 10v8", "M14 10v8", "M18 10v8"],
  },
  {
    n: "04",
    name: "Private Wealth",
    desc: "Trusts, protection, and generational legacy.",
    paths: ["M4 19h16", "M4 8l4 4 4-7 4 7 4-4-2 11H6L4 8Z"],
  },
];

export const metadata = {
  title: "About · Amyr Samah El — Matisse Academy",
  description:
    "Amyr Samah El, Private Trust & Wealth Protection Strategist and founder of Matisse Academy.",
};

export default function AboutPage() {
  return (
    <div className="grain relative min-h-screen bg-void text-white">
      {/* Header — its own solid bar above the hero (not overlaying the parallax) */}
      <header className="relative z-50 flex items-center justify-between border-b border-gold/10 bg-void px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Matisse Academy"
            width={150}
            height={100}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="hidden font-serif text-lg tracking-wide text-gold-gradient sm:block">
            Matisse Academy
          </span>
        </Link>
        <NavMenu />
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex">
            <a href={links.challenge3Day} {...ext} className="btn-lux btn-lux-sm">
              Secure My Spot
            </a>
          </span>
          <MobileNav />
        </div>
      </header>

      <main className="relative z-10">
        {/* Founder hero — parallax key art */}
        <AboutHero ctaHref={links.appointment} ext={ext} />

        {/* Areas of focus — slim capabilities strip tight under the hero */}
        <section className="relative border-y border-gold/10 bg-white/[0.02] px-6 py-4">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {focus.map((f, i) => (
              <span key={f} className="flex items-center gap-4">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-gold/50" aria-hidden />
                )}
                <span className="text-[0.62rem] uppercase tracking-luxe text-white/55 transition-colors hover:text-white/85">
                  {f}
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* The Journey — editorial timeline */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-xs uppercase tracking-luxe text-gold/70">
                <span className="text-gold-bright">I</span> · The Journey
              </p>
              <h2 className="mt-3 max-w-xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                From his own courtroom to a private practice.
              </h2>
            </Reveal>
            <ol className="relative mt-14 space-y-14 border-l border-gold/25 pl-10">
              {journey.map((b, i) => (
                <Reveal as="li" key={b.k} delay={i * 100} className="relative">
                  <span className="absolute -left-[3.3rem] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-void">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-bright shadow-[0_0_8px_rgba(243,205,122,0.8)]" />
                  </span>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-2xl leading-none text-gold-gradient">
                      {b.k}
                    </span>
                    <h3 className="font-serif text-xl text-white">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/65">
                    {b.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Video */}
        <section className="relative border-t border-white/5 px-6 py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
                <span className="text-gold-bright">II</span> · The Doctrine
              </p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                The doctrine, in{" "}
                <span className="text-gold-gradient">his own voice.</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <VideoEmbed videoId={FOUNDER_VIDEO_ID} title="Amyr Samah El — Matisse Academy" />
            </Reveal>
          </div>
        </section>

        {/* Matisse Academy — the mission (manifesto) */}
        <section className="relative overflow-hidden border-t border-white/5 px-6 py-28">
          {/* Faint architecture texture + warm glow. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "url('/bg-library.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/75 to-void" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[75%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(176,120,42,0.12) 0%, rgba(5,5,5,0) 70%)",
            }}
          />
          <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold/70">
              <span className="text-gold-bright">III</span> · Our Mission
            </p>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.14] text-white sm:text-[2.6rem]">
              A private institution for{" "}
              <span className="text-gold-gradient">equitable justice.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60">
              Matisse Academy exists to develop principled, strategic approaches
              to equity, law &amp; generational wealth. We equip individuals,
              families, and organizations with the knowledge and structures to
              protect what they build — and empower what lasts.
            </p>
            <p className="mx-auto mt-8 font-serif text-lg italic text-white/70">
              &ldquo;Notice is the heart of equity.&rdquo;
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold/60">
              Matthew 4:19
            </p>
          </Reveal>
        </section>

        {/* The four domains */}
        <section className="relative overflow-hidden border-t border-white/5 px-6 py-24">
          {/* Purple-gold particle key art. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "url('/domains-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 45%, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.35) 55%, rgba(5,5,5,0.72) 100%), linear-gradient(180deg, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0) 24%, rgba(5,5,5,0) 74%, rgba(5,5,5,0.85) 100%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-5xl">
            <Reveal className="mb-14 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
                <span className="text-gold-bright">IV</span> · Our Domains
              </p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                Four domains, taught as one discipline.
              </h2>
            </Reveal>
            <div className="mx-auto grid max-w-4xl gap-x-14 sm:grid-cols-2">
              {domains.map((d, i) => (
                <Reveal
                  as="div"
                  key={d.name}
                  delay={i * 80}
                  className={`group flex items-start gap-5 py-9 ${
                    i > 1 ? "border-t border-white/10" : ""
                  }`}
                >
                  <span className="w-9 shrink-0 font-serif text-3xl leading-none text-gold-gradient">
                    {d.n}
                  </span>
                  <span className="shrink-0 text-gold-bright transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {d.paths.map((p, j) => (
                        <path key={j} d={p} />
                      ))}
                    </svg>
                  </span>
                  <div>
                    <div className="font-serif text-xl text-white transition-colors group-hover:text-gold-bright">
                      {d.name}
                    </div>
                    <div className="mt-1.5 text-sm leading-relaxed text-white/50">
                      {d.desc}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
