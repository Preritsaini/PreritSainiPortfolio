import React from "react";

interface FighterJetSvgProps {
  thrusterScale?: number;
  width?: number;
  height?: number;
}

/**
 * Authentic Stellar Jet Delta-Wing Combat Fighter Sprite
 * Derived directly from the Flame Engine game screenshot (Screenshot 2).
 */
export const FighterJetSvg: React.FC<FighterJetSvgProps> = ({
  thrusterScale = 1,
  width = 54,
  height = 60,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 58 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.7))" }}
  >
    {/* Animated Dual Blue Ion Exhaust Flames */}
    <g transform={`scale(1, ${thrusterScale})`} style={{ transformOrigin: "29px 52px" }}>
      <path d="M22 52 Q23 66 24 60 Q25 54 26 52 Z" fill="#38bdf8" opacity="0.95" />
      <path d="M23 52 Q24 62 25 52 Z" fill="#ffffff" />
      <path d="M32 52 Q33 66 34 60 Q35 54 36 52 Z" fill="#38bdf8" opacity="0.95" />
      <path d="M33 52 Q34 62 35 52 Z" fill="#ffffff" />
    </g>

    {/* Delta Wing Base Structure */}
    <path
      d="M29 4 L34 22 L56 46 L46 50 L38 46 L37 52 L29 50 L21 52 L20 46 L12 50 L2 46 L24 22 Z"
      fill="#64748b"
      stroke="#1e293b"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Wing Royal Blue Accent Panels */}
    <path d="M34 24 L54 44 L48 47 L36 34 Z" fill="#2563eb" />
    <path d="M24 24 L4 44 L10 47 L22 34 Z" fill="#2563eb" />

    {/* Wingtip Missile Rails */}
    <rect x="0" y="40" width="3.5" height="12" rx="1.5" fill="#38bdf8" />
    <rect x="54.5" y="40" width="3.5" height="12" rx="1.5" fill="#38bdf8" />

    {/* Fuselage Spine */}
    <path d="M29 6 L33 24 L33 48 L25 48 L25 24 Z" fill="#94a3b8" stroke="#334155" strokeWidth="1" />

    {/* Cockpit Canopy (Glowing Cyan Glass) */}
    <path
      d="M29 14 C31 14 32 17 32 24 C32 29 31 31 29 31 C27 31 26 29 26 24 C26 17 27 14 29 14 Z"
      fill="#00e5ff"
      stroke="#e0f2fe"
      strokeWidth="1"
    />
    <ellipse cx="28.5" cy="20" rx="1.5" ry="4" fill="#ffffff" opacity="0.8" />

    {/* Twin Vertical Tail Stabilizers */}
    <path d="M24 38 L22 52 L25 50 Z" fill="#1d4ed8" />
    <path d="M34 38 L36 52 L33 50 Z" fill="#1d4ed8" />

    {/* Dual Engine Nozzles */}
    <rect x="21" y="48" width="6" height="5" rx="1.5" fill="#334155" stroke="#1e293b" />
    <rect x="31" y="48" width="6" height="5" rx="1.5" fill="#334155" stroke="#1e293b" />
  </svg>
);
