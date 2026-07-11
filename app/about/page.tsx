import Image from "next/image";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";
import MobileNav from "@/components/MobileNav";
import VideoEmbed from "@/components/VideoEmbed";
import AboutHero from "@/components/AboutHero";
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

        {/* Areas of focus */}
        <section className="relative border-t border-white/5 px-6 py-14">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-[0.65rem] uppercase tracking-luxe text-gold/60">
              Areas of Focus
            </p>
            <ul className="flex flex-wrap justify-center gap-2.5">
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
        </section>

        {/* The Journey */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-center text-xs uppercase tracking-luxe text-gold/70">
              The Journey
            </p>
            <div className="space-y-6 text-base leading-relaxed text-white/65">
              <p>
                Amyr&rsquo;s path began not in a classroom, but in a courtroom of
                his own. Facing his own warrants and traffic matters, he refused
                to accept that the system was closed to him — and started a
                lifelong study of Exclusive Equity Jurisprudence, the private
                body of law built on notice, remedy, and standing.
              </p>
              <p>
                In the years since, he has devoted his practice to settling and
                closing matters of debt and obligation through lawful remedy —
                helping people move from conflict toward resolution, privately
                and lawfully.
              </p>
              <p>
                His focus spans traffic court, civil debt and obligation, and
                criminal misdemeanors — always with the same aim: to teach what
                protects and to resolve rather than to fight.
              </p>
            </div>
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

        {/* Matisse Academy — the mission */}
        <section className="relative border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-xs uppercase tracking-luxe text-gold/70">
              Matisse Academy
            </p>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.14] text-white sm:text-4xl">
              A private institution for equitable justice.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60">
              Matisse Academy exists to champion equitable justice, safeguard the
              rights of the American people, and foster a culture defined by
              integrity and accountability. It brings the lawful strategies once
              reserved for the few — trusts, notice, and private process — within
              reach of ordinary families through education, mentorship, and live
              instruction.
            </p>
            <p className="mx-auto mt-6 font-serif text-lg italic text-white/70">
              &ldquo;Notice is the heart of equity.&rdquo;
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-gold/60">
              Matthew 4:19 · KJV 1611
            </p>
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
