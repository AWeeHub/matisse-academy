import { links } from "@/lib/links";

export type NavItem = { label: string; desc: string; href: string };
export type NavEntry =
  | { label: string; items: NavItem[]; href?: undefined }
  | { label: string; href: string; items?: undefined };

// Single source of truth for header navigation (desktop dropdowns + mobile
// drawer). Groups mirror the footer's information architecture so the two
// never drift. On-page anchors use "#id"; funnel destinations open externally.
export const MENU: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    items: [
      { label: "Our Services", desc: "Equity, law & private-wealth programs", href: links.services },
      { label: "1:1 Coaching", desc: "Private, tailored sessions", href: links.appointment },
      { label: "Tax-Free Strategy", desc: "The private church strategy", href: links.taxFree },
      { label: "Secure the Car", desc: "The signature lawful-process course", href: links.secureTheCar },
    ],
  },
  {
    label: "Events",
    items: [
      { label: "3-Day Challenge", desc: "Master Your Rights — live intensive", href: links.challenge3Day },
      { label: "5-Day Challenge", desc: "The full deep-dive format", href: links.challenge5Day },
      { label: "All Events", desc: "Every upcoming live session", href: links.events },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Digital Store", desc: "Courses, templates & tools", href: links.shop },
      { label: "Black Sheep Community", desc: "The members-only circle", href: links.blackSheep },
      { label: "Affiliates", desc: "Partner program", href: links.affiliate },
      { label: "The Dispatch", desc: "Newsletter & private notices", href: links.newsletter },
    ],
  },
  { label: "About", href: "/about" },
];

/** Internal = on-page anchor (#id) or same-origin route (/path). Everything
 *  else is an external funnel link that should open in a new tab. */
export const isInternal = (href: string) =>
  href.startsWith("#") || href.startsWith("/");

export const extLink = { target: "_blank", rel: "noopener noreferrer" } as const;
