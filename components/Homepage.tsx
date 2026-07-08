import Image from "next/image";
import Reveal from "@/components/Reveal";
import Seal from "@/components/Seal";
import { links, socials } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const romans = ["I", "II", "III", "IV", "V", "VI"];

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
  {
    tag: "Tax-Free",
    title: "Private Church Strategy",
    body: "Lawfully grow and protect your wealth tax-free — private strategies studied by top earners.",
    cta: "Unlock the Tax-Free Strategy",
    href: links.taxFree,
  },
  {
    tag: "Course",
    title: "Secure the Car",
    body: "The signature course on securing your property through lawful, private process.",
    cta: "Start the Course",
    href: links.secureTheCar,
  },
  {
    tag: "1:1",
    title: "Coaching & Consulting",
    body: "Book a private session for tailored lawful and equity insights. Limited appointments.",
    cta: "Request Your Appointment",
    href: links.appointment,
  },
  {
    tag: "Store",
    title: "Digital Products",
    body: "Courses, templates, and private-wealth resources — the tools for true financial freedom.",
    cta: "Shop the Resources",
    href: links.shop,
  },
  {
    tag: "Community",
    title: "Black Sheep Community",
    body: "Join the members-only community moving differently — support, accountability, and access.",
    cta: "Join the Community",
    href: links.blackSheep,
  },
  {
    tag: "Coming Soon",
    title: "Financial Literacy for Real Life",
    body: "Equity, wealth building, and financial literacy the simple way. New program.",
    cta: "Get on the List",
    href: links.newsletter,
  },
];

export default function Homepage() {
  return (
    <main className="relative z-10 bg-void">
      {/* Founder */}
      <section
        id="founder"
        className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-28 md:grid-cols-[0.85fr_1fr] md:py-40"
      >
        <Reveal className="relative mx-auto w-full max-w-xs">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120,70,160,0.35) 0%, rgba(5,5,5,0) 70%)",
            }}
          />
          <Image
            src="/amyr-hero-portrait.jpg"
            alt="Amyr Samah El, founder of Matisse Academy"
            width={654}
            height={963}
            className="relative aspect-[4/5] rounded-2xl border border-white/10 object-cover object-top shadow-2xl"
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">
            The Founder
          </p>
          <h2 className="font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
            Amyr Samah El
          </h2>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-gold-gradient">
            Private Trust &amp; Wealth Protection Strategist
          </p>
          <div className="rule-luxe my-8 max-w-[8rem]" />
          <p className="max-w-md text-lg leading-relaxed text-white/60">
            &ldquo;I guide individuals and families to protect their assets,
            minimize liabilities, and secure generational wealth through private
            trusts and lawful strategies.&rdquo;
          </p>
          <a
            href={links.appointment}
            {...ext}
            className="press mt-9 inline-block rounded-full border border-gold/40 px-7 py-3 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10"
          >
            Work With Amyr
          </a>
        </Reveal>
      </section>

      {/* The Challenge */}
      <section
        id="challenge"
        className="relative overflow-hidden border-t border-white/5 bg-ink py-28"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[50vmin] w-[80vmin] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,70,160,0.22) 0%, rgba(5,5,5,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">
              Live Event
            </p>
            <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
              The <span className="text-gold-gradient">Master Your Rights</span>{" "}
              Challenge
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
              An immersive challenge on equity, law, and private wealth — taught
              live. Choose the format that fits you.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {challenges.map((c, i) => (
              <Reveal
                key={c.tier}
                delay={i * 90}
                className="card flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10 text-left"
              >
                <span className="font-serif text-5xl text-gold-gradient">
                  {c.tier}
                </span>
                <h3 className="mt-4 font-serif text-xl text-white">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold-bright">
                  {c.dates}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                  {c.blurb}
                </p>
                <a
                  href={c.href}
                  {...ext}
                  className="press mt-6 inline-block self-start rounded-full bg-gold px-6 py-2.5 text-xs uppercase tracking-luxe text-black"
                >
                  Secure My Spot
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a
              href={links.events}
              {...ext}
              className="mt-12 inline-block text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white"
            >
              See all upcoming events →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-5xl px-6 py-32 text-center">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-luxe text-gold/70">
            Services We Provide
          </p>
          <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-[1.12] text-white sm:text-5xl">
            Education, mentorship, and strategic guidance for those seeking
            mastery in equity, law, commerce, and private wealth.
          </h2>
          <a
            href={links.services}
            {...ext}
            className="press mt-10 inline-block rounded-full border border-gold/40 px-7 py-3 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10"
          >
            Explore Our Services
          </a>
        </Reveal>
      </section>

      {/* Pathways — the Charter's articles */}
      <section className="border-t border-white/5 bg-ink py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
              The Charter
            </p>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
              Six articles, one path to private mastery.
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pathways.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 70}
                as="article"
                className="card flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-10"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl leading-none text-gold-gradient">
                    {romans[i]}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-luxe text-gold/70">
                    {p.tag}
                  </span>
                </div>
                <div className="rule-luxe my-5" />
                <h3 className="font-serif text-2xl text-white">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                  {p.body}
                </p>
                <a
                  href={p.href}
                  {...ext}
                  className="mt-7 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white"
                >
                  {p.cta} →
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <Reveal className="relative mx-auto max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">
            Stay Close
          </p>
          <h2 className="font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
            Equity, law, and private wealth — straight to your inbox.
          </h2>
          <a
            href={links.newsletter}
            {...ext}
            className="press mt-8 inline-block rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-luxe text-black"
          >
            Join the Newsletter
          </a>
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/5 px-6 py-40 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,70,160,0.28) 0%, rgba(5,5,5,0) 68%)",
          }}
        />
        <Reveal className="relative">
          <Seal size={128} className="mx-auto mb-10" />
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
            Matthew 4:19 · KJV 1611
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
            Notice is the heart of{" "}
            <span className="text-gold-gradient">equity.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm text-white/50">
            Begin your path to mastery in private wealth and lawful strategy.
          </p>
          <a
            href={links.challenge3Day}
            {...ext}
            className="press mt-10 inline-block rounded-full bg-gold px-9 py-3 text-xs uppercase tracking-luxe text-black"
          >
            Secure My Spot
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-luxe text-white/50">
            <a href={links.events} {...ext} className="hover:text-white">
              Events
            </a>
            <a href={links.services} {...ext} className="hover:text-white">
              Services
            </a>
            <a href={links.shop} {...ext} className="hover:text-white">
              Shop
            </a>
            <a href={links.appointment} {...ext} className="hover:text-white">
              Coaching
            </a>
            <a href={links.blackSheep} {...ext} className="hover:text-white">
              Community
            </a>
            <a href={links.affiliate} {...ext} className="hover:text-white">
              Affiliates
            </a>
            <a href={links.newsletter} {...ext} className="hover:text-white">
              Newsletter
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs uppercase tracking-luxe text-gold-bright/80">
            <a href={socials.instagram} {...ext} className="hover:text-white">
              Instagram
            </a>
            <a href={socials.youtube} {...ext} className="hover:text-white">
              YouTube
            </a>
            <a href={socials.tiktok} {...ext} className="hover:text-white">
              TikTok
            </a>
            <a href={socials.facebook} {...ext} className="hover:text-white">
              Facebook
            </a>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[0.7rem] leading-relaxed text-white/30">
            This is for informational purposes only. We are not BAR-card licensed
            enrollees, nor is any content herein legal, tax, or financial advice.
          </p>
          <p className="mt-6 text-center text-xs uppercase tracking-luxe text-white/40">
            © {new Date().getFullYear()} Matisse Academy · Amyr Samah El
          </p>
        </div>
      </footer>
    </main>
  );
}
