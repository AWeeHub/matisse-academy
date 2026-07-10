import Image from "next/image";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";
import MobileNav from "@/components/MobileNav";
import VideoEmbed, { PLACEHOLDER } from "@/components/VideoEmbed";
import { links } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Swap this for Amyr's real @amyrlaw video id (the 11 chars after `v=` or
// `youtu.be/`) once provided; until then a styled placeholder renders.
const FOUNDER_VIDEO_ID = PLACEHOLDER;

const focus = [
  "Private Trusts",
  "Asset Protection",
  "Tax-Free Strategy",
  "Lawful Process",
  "Generational Wealth",
];

const domains = [
  { name: "Equity", desc: "The law of fairness, notice, and remedy." },
  { name: "Law", desc: "Lawful process, private standing, and rights." },
  { name: "Commerce", desc: "Contracts, instruments, and value in motion." },
  { name: "Private Wealth", desc: "Trusts, protection, and generational holding." },
];
const romans = ["I", "II", "III", "IV"];

export const metadata = {
  title: "About · Amyr Samah El — Matisse Academy",
  description:
    "Amyr Samah El, Private Trust & Wealth Protection Strategist and founder of Matisse Academy.",
};

export default function AboutPage() {
  return (
    <div className="grain relative min-h-screen bg-void text-white">
      {/* Header */}
      <header className="site-header fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
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
          <a
            href={links.challenge3Day}
            {...ext}
            className="btn-lux btn-lux-sm hidden md:inline-flex"
          >
            Secure My Spot
          </a>
          <MobileNav />
        </div>
      </header>

      <main className="relative z-10">
        {/* Founder hero */}
        <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-44">
          <div
            className="pointer-events-none absolute -left-20 top-10 h-[70vmin] w-[70vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120,70,160,0.22) 0%, rgba(5,5,5,0) 70%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[0.85fr_1fr]">
            <div className="relative mx-auto w-full max-w-xs">
              <div
                className="pointer-events-none absolute -inset-6 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(120,70,160,0.4) 0%, rgba(5,5,5,0) 70%)",
                }}
              />
              <Image
                src="/amyr-suit-portrait.jpg"
                alt="Amyr Samah El, founder of Matisse Academy"
                width={786}
                height={806}
                priority
                className="relative aspect-[4/5] rounded-2xl border border-white/10 object-cover object-top shadow-2xl"
              />
            </div>
            <div>
              <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">
                The Founder
              </p>
              <h1 className="font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
                Amyr Samah El
              </h1>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold-gradient">
                Private Trust &amp; Wealth Protection Strategist
              </p>
              <div className="rule-luxe my-7 max-w-[8rem]" />
              <p className="max-w-lg text-base leading-relaxed text-white/65">
                Amyr Samah El built his practice around a single conviction: the
                private side of law and finance — trusts, notice, and equity — is
                the real path to protecting what you build. His work brings the
                lawful strategies once reserved for the few within reach of
                ordinary families.
              </p>
              <div className="mt-8">
                <p className="mb-3 text-[0.65rem] uppercase tracking-luxe text-gold/60">
                  Areas of Focus
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {focus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-gold/25 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.15em] text-white/60"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={links.appointment} {...ext} className="btn-lux mt-9">
                Work With Amyr
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* In his words */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-8 text-xs uppercase tracking-luxe text-gold/70">
              In His Words
            </p>
            <blockquote className="font-serif text-2xl leading-relaxed text-white/80 sm:text-3xl">
              &ldquo;I guide individuals and families to protect their assets,
              minimize liabilities, and secure generational wealth through
              private trusts and lawful strategies.&rdquo;
            </blockquote>
            <p className="mt-6 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
              Amyr Samah El
            </p>
          </div>
        </section>

        {/* Video */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
                Hear From Amyr
              </p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                The doctrine, in his own voice.
              </h2>
            </div>
            <VideoEmbed videoId={FOUNDER_VIDEO_ID} title="Amyr Samah El — Matisse Academy" />
          </div>
        </section>

        {/* The four domains */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
                The Doctrine
              </p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                Four domains, taught as one discipline.
              </h2>
            </div>
            <ul className="mx-auto max-w-3xl">
              {domains.map((d, i) => (
                <li
                  key={d.name}
                  className="flex items-baseline gap-5 border-b border-white/8 py-5"
                >
                  <span className="font-serif text-2xl leading-none text-gold-gradient">
                    {romans[i]}
                  </span>
                  <div>
                    <div className="font-serif text-xl text-white">{d.name}</div>
                    <div className="mt-1 text-sm leading-relaxed text-white/50">
                      {d.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA band */}
        <section className="relative border-t border-white/5 px-6 py-28 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[90%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(120,70,160,0.16) 0%, rgba(176,120,42,0.07) 45%, rgba(5,5,5,0) 72%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
              Begin your <span className="text-gold-gradient">charter.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm text-white/50">
              Work directly with Amyr, or start with the Master Your Rights
              Challenge.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href={links.challenge3Day} {...ext} className="btn-lux">
                Secure My Spot
                <span aria-hidden>→</span>
              </a>
              <Link
                href="/"
                className="text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
