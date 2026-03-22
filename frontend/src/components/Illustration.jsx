// ─────────────────────────────────────────────
//  Hero section SVG illustration
//  Books stack + paper documents + AI brain
// ─────────────────────────────────────────────

export default function Illustration() {
  return (
    <svg
      viewBox="0 0 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 340 }}
      aria-hidden="true"
    >
      {/* Background glow */}
      <circle cx="170" cy="155" r="128" fill="#FEF3EC" opacity="0.55" />

      {/* ── Books stack ── */}
      <rect x="70"  y="195" width="200" height="20" rx="5" fill="#E8550A" opacity="0.9" />
      <rect x="82"  y="178" width="176" height="20" rx="5" fill="#FF8A40" opacity="0.85" />
      <rect x="96"  y="161" width="148" height="20" rx="5" fill="#FFC49E" opacity="0.8" />

      {/* ── Spine lines on books ── */}
      <line x1="80"  y1="197" x2="80"  y2="213" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="93"  y1="180" x2="93"  y2="196" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="106" y1="163" x2="106" y2="179" stroke="white" strokeWidth="1" opacity="0.3" />

      {/* ── Main question paper ── */}
      <rect x="100" y="64" width="68" height="88" rx="5" fill="white" stroke="#E0DDD6" strokeWidth="1.5" />
      {/* Paper heading bar */}
      <rect x="110" y="74" width="48" height="7" rx="3" fill="#E8550A" opacity="0.5" />
      {/* Paper lines */}
      <line x1="110" y1="88"  x2="156" y2="88"  stroke="#ECEAE2" strokeWidth="1.5" />
      <line x1="110" y1="98"  x2="156" y2="98"  stroke="#ECEAE2" strokeWidth="1.5" />
      <line x1="110" y1="108" x2="148" y2="108" stroke="#ECEAE2" strokeWidth="1.5" />
      <line x1="110" y1="118" x2="156" y2="118" stroke="#ECEAE2" strokeWidth="1.5" />
      <line x1="110" y1="128" x2="140" y2="128" stroke="#ECEAE2" strokeWidth="1.5" />
      {/* Multiple choice dots */}
      <circle cx="114" cy="138" r="2" fill="#E8550A" opacity="0.6" />
      <circle cx="124" cy="138" r="2" fill="#ECEAE2" />
      <circle cx="134" cy="138" r="2" fill="#ECEAE2" />
      <circle cx="144" cy="138" r="2" fill="#ECEAE2" />

      {/* ── Second paper angled ── */}
      <g transform="rotate(-18, 218, 96)">
        <rect x="188" y="58" width="60" height="78" rx="5" fill="white" stroke="#E0DDD6" strokeWidth="1.5" />
        <rect x="196" y="68" width="44" height="6" rx="3" fill="#2563EB" opacity="0.45" />
        <line x1="196" y1="81"  x2="238" y2="81"  stroke="#ECEAE2" strokeWidth="1.5" />
        <line x1="196" y1="91"  x2="238" y2="91"  stroke="#ECEAE2" strokeWidth="1.5" />
        <line x1="196" y1="101" x2="225" y2="101" stroke="#ECEAE2" strokeWidth="1.5" />
        <line x1="196" y1="111" x2="238" y2="111" stroke="#ECEAE2" strokeWidth="1.5" />
      </g>

      {/* ── Pencil ── */}
      <g transform="rotate(35, 64, 160)">
        <rect x="57" y="110" width="9" height="54" rx="2.5" fill="#FBBF24" />
        <polygon points="57,164 66,164 61.5,177" fill="#F9A8A8" />
        <rect x="57" y="110" width="9" height="9" rx="1" fill="#D1CDC8" />
        <line x1="61.5" y1="110" x2="61.5" y2="164" stroke="#E8B000" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* ── AI Brain bubble ── */}
      <circle cx="246" cy="215" r="26" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1.5" />
      <text x="246" y="222" textAnchor="middle" fontSize="20">🧠</text>

      {/* ── Sparkle decorations ── */}
      <text x="256" y="76"  fontSize="14" fill="#E8550A" opacity="0.65">✦</text>
      <text x="68"  y="112" fontSize="11" fill="#2563EB" opacity="0.5">✦</text>
      <text x="272" y="170" fontSize="9"  fill="#E8550A" opacity="0.4">✦</text>
      <text x="82"  y="168" fontSize="8"  fill="#059669" opacity="0.5">✦</text>
    </svg>
  )
}
