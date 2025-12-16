export function AnimatedPerson() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label="Ilustrasi orang bergerak"
    >
      <defs>
        <linearGradient id="bgBubble" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#bgBubble)" opacity="0.55" />
      <circle cx="100" cy="100" r="70" fill="#fff" />

      {/* Body */}
      <rect x="90" y="70" width="20" height="50" rx="10" fill="#0ea5e9" />
      {/* Head (no face detail) */}
      <circle cx="100" cy="55" r="14" fill="#1f2937" />

      {/* Arms */}
      <g stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round">
        <line x1="90" y1="80" x2="65" y2="95">
          <animate
            attributeName="x2"
            dur="1s"
            values="65;60;65"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            dur="1s"
            values="95;85;95"
            repeatCount="indefinite"
          />
        </line>
        <line x1="110" y1="80" x2="135" y2="95">
          <animate
            attributeName="x2"
            dur="1s"
            values="135;140;135"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            dur="1s"
            values="95;85;95"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Legs */}
      <g stroke="#1f2937" strokeWidth="9" strokeLinecap="round">
        <line x1="95" y1="120" x2="80" y2="155">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 95 120;15 95 120;0 95 120"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <line x1="105" y1="120" x2="120" y2="155">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 105 120;-15 105 120;0 105 120"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Ground bounce */}
      <ellipse cx="100" cy="168" rx="32" ry="6" fill="#0ea5e9" opacity="0.18">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0.18;0.3;0.18"
          repeatCount="indefinite"
        />
        <animate
          attributeName="rx"
          dur="1s"
          values="32;36;32"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}
