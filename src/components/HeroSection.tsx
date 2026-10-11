"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/audioSynth";
import { FileText, Smartphone, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  hotReloadTrigger?: number;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Butter-smooth RAF scroll listener for instant physics
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track cursor position across hero for dynamic light deflection
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x: normX, y: normY });
  };

  // Immediate reactive scroll metrics: As soon as user scrolls, the fluid wave rises and undulates
  const scrollClamped = Math.max(0, scrollY);
  const scrollRatio = Math.min(scrollClamped / 650, 1);

  // Dynamic fluid wave motion:
  // As user scrolls, the wave crests rise up through the letters and undulate horizontally!
  const waveTranslateY = Math.min(scrollClamped * 0.72, 220);
  const waveTranslateX = Math.sin(scrollClamped * 0.006) * 36;
  const ambientTranslateY = Math.min(scrollClamped * 0.52, 160);
  const ambientScale = 1 + scrollRatio * 0.22;
  const ambientOpacity = Math.min(0.85 + scrollRatio * 0.15, 1);
  const lettersParallax = scrollClamped * 0.14;

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        height: "100dvh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        paddingTop: "76px",
        paddingBottom: "12px",
      }}
    >
      {/* 1. UPPER ROW: Compact, Sleek Bar — Status on Left, Headline & Actions on Right */}
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "10px 48px 0 48px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          zIndex: 10,
          flexShrink: 0,
        }}
        className="hero-upper-manifesto"
      >
        {/* Right: Primary Role Title, Subtitle & Action Badges */}
        <div style={{ maxWidth: "580px", textAlign: "right" }} className="hero-right-actions">
          {/* Main Title: Flutter Software Engineer (White, Bold, Prominent) */}
          <h1
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              marginBottom: "8px",
            }}
          >
            Flutter Software Engineer
          </h1>

          {/* Supporting Statement / Subtitle (smaller than the title) */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              fontWeight: 500,
              color: "var(--text-secondary)",
              letterSpacing: "-0.015em",
              lineHeight: 1.45,
              marginBottom: "16px",
            }}
          >
            Engineering fluid, 120 FPS mobile apps
            <br />
            with Flutter &amp; clean architecture.
          </p>

          {/* Quick Action Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "12px",
              flexWrap: "wrap",
            }}
            className="hero-action-buttons"
          >
            <a
              href="#resume-download"
              onClick={() => sound.play("tap")}
              className="midu-btn-primary"
              style={{ padding: "9px 22px", fontSize: "0.85rem", fontWeight: 700 }}
            >
              <FileText size={15} />
              <span>Resume (PDF)</span>
            </a>

            <a
              href="#simulator"
              onClick={() => sound.play("tap")}
              className="midu-btn-secondary"
              style={{ padding: "9px 22px", fontSize: "0.85rem", fontWeight: 600 }}
            >
              <Smartphone size={15} />
              <span>Device Simulator</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. LOWER-HERO AREA: GIGANTIC "PRERIT" TYPOGRAPHY — GROUNDED NATURALLY */}
      <div
        style={{
          position: "relative",
          width: "100%",
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          overflow: "visible",
          transform: `translateY(${-lettersParallax}px)`,
          transition: "transform 0.04s ease-out",
          paddingBottom: "8px",
        }}
      >
        {/* Ambient Glowing Red Wave Behind Letters (Unmasked - Spills organic red light onto canvas) */}
        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            left: "-5%",
            right: "-5%",
            height: "380px",
            pointerEvents: "none",
            zIndex: 1,
            filter: "blur(70px)",
            opacity: ambientOpacity,
            transform: `translate(${waveTranslateX * 0.8 + mousePos.x * 20}px, ${-ambientTranslateY + mousePos.y * 12}px) scale(${ambientScale})`,
            transition: "transform 0.05s ease-out, opacity 0.1s ease-out",
          }}
        >
          {/* Left atmospheric wave crest bloom (illuminates behind P & R) */}
          <div
            style={{
              position: "absolute",
              left: "4%",
              top: "20px",
              width: "48%",
              height: "100%",
              background:
                "radial-gradient(ellipse 75% 65% at 35% 35%, rgba(255, 90, 45, 0.85) 0%, rgba(255, 0, 34, 0.75) 40%, rgba(180, 0, 15, 0.3) 70%, transparent 85%)",
            }}
          />
          {/* Right atmospheric wave crest bloom (illuminates behind I & T) */}
          <div
            style={{
              position: "absolute",
              right: "4%",
              top: "30px",
              width: "46%",
              height: "100%",
              background:
                "radial-gradient(ellipse 70% 60% at 65% 40%, rgba(255, 45, 75, 0.85) 0%, rgba(220, 0, 25, 0.7) 40%, rgba(140, 0, 15, 0.25) 75%, transparent 85%)",
            }}
          />
        </div>

        {/* Foreground Letters with fluid animated wave mask */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1540px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "100%",
          }}
        >
          <svg
            viewBox="0 0 1440 345"
            width="100%"
            style={{
              display: "block",
              overflow: "visible",
              height: "clamp(260px, 48vh, 560px)",
              maxHeight: "54vh",
            }}
            preserveAspectRatio="xMidYEnd meet"
          >
            <defs>
              {/* Exact typographic mask cutout for PRERIT */}
              <mask id="heroLettersMask">
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="50%"
                  y="300"
                  textAnchor="middle"
                  fill="white"
                  fontSize="345"
                  fontWeight="900"
                  letterSpacing="-0.04em"
                  fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
                >
                  PRERIT
                </text>
              </mask>

              {/* Signature Midu Studio Multi-Stop Crimson/Coral Fluid Gradient */}
              <linearGradient id="waveBaseGradient" x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#e60012" />
                <stop offset="24%" stopColor="#ff4514" />
                <stop offset="48%" stopColor="#80000a" />
                <stop offset="74%" stopColor="#ff1830" />
                <stop offset="100%" stopColor="#e60012" />
              </linearGradient>

              {/* Hotspot 1: High left wave crest glowing core (peach-white highlight in P & R) */}
              <radialGradient id="waveHotspotLeft" cx="280" cy="135" r="300" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="18%" stopColor="#ffeedd" stopOpacity="0.94" />
                <stop offset="38%" stopColor="#ff5e26" stopOpacity="0.95" />
                <stop offset="68%" stopColor="#e6001a" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#99000d" stopOpacity="0" />
              </radialGradient>

              {/* Hotspot 2: High right wave crest glowing core (vibrant neon crest in I & T) */}
              <radialGradient id="waveHotspotRight" cx="1200" cy="145" r="290" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffa072" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#ff283e" stopOpacity="0.92" />
                <stop offset="70%" stopColor="#cc0016" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#8a000c" stopOpacity="0" />
              </radialGradient>

              {/* Soft blur filter for silky fluid wave ridges */}
              <filter id="waveSoftBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="22" />
              </filter>

              {/* Ridge blur for smooth definition */}
              <filter id="waveRidgeBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>

            {/* Clipped Group: The Undulating Red Wave that Moves Organically on Scroll! */}
            <g mask="url(#heroLettersMask)">
              {/* Dark obsidian base layer for the letters */}
              <rect width="100%" height="100%" fill="#060204" />

              {/* The moving fluid wave group: lifts UP and drifts dynamically as user scrolls! */}
              <g
                style={{
                  transform: `translate(${waveTranslateX + mousePos.x * 24}px, ${-waveTranslateY + mousePos.y * 14}px)`,
                  transition: "transform 0.05s ease-out",
                  willChange: "transform",
                }}
              >
                {/* 1. Silky feathered fluid wave under-layer */}
                <path
                  d="M -120 195 C 80 65, 200 40, 360 70 C 520 100, 640 295, 840 285 C 1020 275, 1140 55, 1300 60 C 1420 70, 1500 145, 1640 195 L 1640 480 L -120 480 Z"
                  fill="url(#waveBaseGradient)"
                  filter="url(#waveSoftBlur)"
                  opacity="0.98"
                />

                {/* 2. Main S-curve wave body with smoothed ridge */}
                <path
                  d="M -120 195 C 80 65, 200 40, 360 70 C 520 100, 640 295, 840 285 C 1020 275, 1140 55, 1300 60 C 1420 70, 1500 145, 1640 195 L 1640 480 L -120 480 Z"
                  fill="url(#waveBaseGradient)"
                  filter="url(#waveRidgeBlur)"
                  opacity="0.88"
                />

                {/* 3. Left Hotspot Core Ellipse (the radiant peach-white star in P & R crest) */}
                <ellipse
                  cx="280"
                  cy="135"
                  rx="340"
                  ry="210"
                  fill="url(#waveHotspotLeft)"
                />

                {/* 4. Right Hotspot Core Ellipse (the glowing orange-red crest in I & T) */}
                <ellipse
                  cx="1200"
                  cy="145"
                  rx="300"
                  ry="190"
                  fill="url(#waveHotspotRight)"
                />

                {/* 5. Valley ambient red base glow */}
                <ellipse
                  cx="840"
                  cy="320"
                  rx="330"
                  ry="110"
                  fill="#ff0022"
                  opacity="0.5"
                  filter="url(#waveSoftBlur)"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* 3. BOTTOM ROW: Subtle Scroll Indicator */}
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "4px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-secondary)",
          fontSize: "0.82rem",
          zIndex: 10,
          flexShrink: 0,
        }}
        className="hero-bottom-meta"
      >
        <a
          href="#projects"
          onClick={() => sound.play("tap")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-secondary)",
            textDecoration: "none",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
            e.currentTarget.style.transform = "translateY(2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>Scroll to explore projects</span>
          <ArrowDown size={13} style={{ animation: "bounceSubtle 2s infinite ease-in-out" }} />
        </a>
      </div>
    </section>
  );
};
