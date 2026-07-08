/**
 * Wax-seal monogram — the charter's signature mark. Gold "MA" at center
 * with the academy legend set around a slowly rotating ring. Decorative
 * only (aria-hidden); rotation respects prefers-reduced-motion via CSS.
 */
export default function Seal({
  size = 132,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="sealGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3cd7a" />
          <stop offset="55%" stopColor="#d9a441" />
          <stop offset="100%" stopColor="#a9772a" />
        </linearGradient>
        <radialGradient id="sealCore" cx="50%" cy="42%" r="70%">
          <stop offset="0%" stopColor="#241633" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </radialGradient>
        <path
          id="sealRingPath"
          d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"
          fill="none"
        />
      </defs>

      {/* Notched outer rim */}
      <circle
        cx="100"
        cy="100"
        r="94"
        fill="none"
        stroke="url(#sealGold)"
        strokeWidth="1.5"
        strokeDasharray="2 6"
        opacity="0.7"
      />
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="url(#sealCore)"
        stroke="url(#sealGold)"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="url(#sealGold)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Rotating legend */}
      <g className="seal-ring">
        <text
          fill="url(#sealGold)"
          fontSize="11"
          letterSpacing="4.5"
          fontFamily="var(--font-sans)"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#sealRingPath" startOffset="0">
            · Matisse Academy · Notice · Equity · Matthew 4:19 ·
          </textPath>
        </text>
      </g>

      {/* Monogram */}
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fill="url(#sealGold)"
        fontSize="58"
        fontFamily="var(--font-serif)"
        fontWeight={500}
      >
        MA
      </text>
    </svg>
  );
}
