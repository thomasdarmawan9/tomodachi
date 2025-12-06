"use client";

export function ToriiIllustration() {
  return (
    <svg
      viewBox="0 0 220 150"
      className="h-32 w-full max-w-sm drop-shadow-sm"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="leg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="roof" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
      </defs>
      <rect x="24" y="112" width="172" height="16" fill="#0f172a" opacity="0.18" rx="8" />
      <g>
        <path
          d="M30 46h160c4 0 6 4 3 6l-12 8H39l-12-8c-3-2-1-6 3-6Z"
          fill="url(#roof)"
        />
        <rect x="35" y="38" width="150" height="10" rx="4" fill="url(#beam)" />
        <rect x="48" y="58" width="22" height="64" rx="6" fill="url(#leg)" />
        <rect x="150" y="58" width="22" height="64" rx="6" fill="url(#leg)" />
        <rect x="95" y="62" width="30" height="60" rx="5" fill="#0f172a" opacity="0.12" />
        <rect x="68" y="52" width="12" height="6" rx="2" fill="#fcd34d" />
        <rect x="140" y="52" width="12" height="6" rx="2" fill="#fcd34d" />
      </g>
      <g>
        <circle cx="52" cy="28" r="5" fill="#f8fafc" opacity="0.8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0; 4; 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="168" cy="26" r="5" fill="#f8fafc" opacity="0.8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0; -3; 0"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <path
        d="M60 130c18-6 32-9 50-9s32 3 50 9"
        fill="none"
        stroke="#d1d5db"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
