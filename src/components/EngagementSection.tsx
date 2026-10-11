"use client";

import React from "react";
import { sound } from "../utils/audioSynth";
import { Check, Sparkles, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface EngagementSectionProps {
  onOpenResume?: () => void;
}

// Stylized 3D Amber Mechanical Keycap Switch (clean, crisp, no fuzzy glow)
const AmberKeycapSwitch: React.FC<{ variant?: "orange" | "amber" }> = ({
  variant = "orange",
}) => {
  const topColor = variant === "orange" ? "#ff790c" : "#f59e0b";
  const lightColor = variant === "orange" ? "#ffa34d" : "#fbbf24";
  const darkColor = variant === "orange" ? "#ea580c" : "#d97706";

  return (
    <div
      style={{
        position: "relative",
        width: 64,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
        {/* Switch Housing Base (Dark Charcoal Mechanical Housing) */}
        <path
          d="M22 45 L42 57 L64 45 L44 35 Z"
          fill="#1c1e24"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
        />
        {/* Left Side of Housing */}
        <path d="M22 45 L22 53 L42 65 L42 57 Z" fill="#14161b" />
        {/* Right Side of Housing */}
        <path d="M42 57 L42 65 L64 53 L64 45 Z" fill="#0d0e12" />

        {/* Switch Stem Cross (Amber glowing stem) */}
        <rect x="39" y="32" width="6" height="8" rx="1.5" fill={topColor} opacity="0.95" />

        {/* Translucent Amber Keycap (Perspective 3D Top) */}
        <path
          d="M26 29 L42 39 L60 29 L44 21 Z"
          fill={lightColor}
          fillOpacity="0.88"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1"
        />
        {/* Keycap Left Facet */}
        <path
          d="M26 29 L26 39 L42 49 L42 39 Z"
          fill={topColor}
          fillOpacity="0.92"
        />
        {/* Keycap Right Facet */}
        <path
          d="M42 39 L42 49 L60 39 L60 29 Z"
          fill={darkColor}
          fillOpacity="0.92"
        />

        {/* Embossed Keycap Curve Accent on top */}
        <path
          d="M39 27 C42 25 45 27 45 30"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export const EngagementSection: React.FC<EngagementSectionProps> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const models = [
    {
      id: "fulltime",
      badge: "Standard Role",
      title: "Full-Time",
      subtitle: "/ Permanent Role",
      tagline: "Dedicated mobile engineering ownership for agile product teams.",
      leadIn: "Full-Time includes:",
      variant: "orange" as const,
      highlight: true,
      features: [
        "End-to-end cross-platform mobile ownership (iOS & Android)",
        "Clean Architecture with Riverpod, Provider, or BLoC state machines",
        "Deterministic 60–120 FPS high refresh-rate rendering on physical devices",
        "Active team collaboration: daily standups, sprint planning & PR reviews",
        "Native platform channels (Swift/Kotlin) & automated CI/CD releases",
      ],
      ctaText: "Discuss Full-Time Role",
      ctaHref: "#contact",
    },
    {
      id: "contract",
      badge: "Contract Project",
      title: "Contract",
      subtitle: "/ Milestone or Sprint",
      tagline: "Targeted 0-to-1 MVP feature delivery and performance optimization.",
      leadIn: "Contract includes:",
      variant: "amber" as const,
      highlight: false,
      features: [
        "0-to-1 MVP mobile feature delivery from concept to TestFlight beta",
        "Design system implementation with pixel-perfect Figma fidelity",
        "REST API, Firebase, Supabase, and AWS S3 cloud backend integrations",
        "DevTools profiling: eliminating frame drops, stutter & memory leaks",
        "Clean codebase handoff with structured documentation & unit tests",
      ],
      ctaText: "Discuss Contract Project",
      ctaHref: "#contact",
    },
  ];

  return (
    <section
      id="collaboration"
      className="section"
      style={{
        background: isLight ? "#ffffff" : "#050505",
        padding: "110px 0",
        transition: "background 0.3s ease",
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <Sparkles size={14} />
            <span>Ways to Collaborate • Available for Hire</span>
          </div>

          <h2
            className="midu-hero-title"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              marginBottom: "18px",
              color: isLight ? "#0f172a" : "#ffffff",
            }}
          >
            How we can{" "}
            <span
              className="serif-italic"
              style={{ color: isLight ? "#0f172a" : "#ffffff" }}
            >
              work together
            </span>
            .
          </h2>

          <p
            className="section-subtitle"
            style={{
              margin: "0 auto",
              fontSize: "1.15rem",
              color: isLight ? "#475569" : "#94a3b8",
              maxWidth: "680px",
            }}
          >
            Whether you are looking for a dedicated full-time Flutter Software Engineer or need a targeted
            mobile feature sprint, here is how I create immediate value for your engineering team.
          </p>
        </div>

        {/* 2-Card Simple Retainer Grid (Matching Reference Design) */}
        <div
          style={{
            maxWidth: "1020px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {models.map((model) => (
            <div
              key={model.id}
              style={{
                position: "relative",
                background: isLight
                  ? "#ffffff"
                  : model.highlight
                  ? "rgba(18, 18, 24, 0.92)"
                  : "rgba(14, 14, 18, 0.7)",
                border: isLight
                  ? model.highlight
                    ? "2px solid #ff790c"
                    : "1px solid rgba(0, 0, 0, 0.08)"
                  : model.highlight
                  ? "1px solid rgba(255, 121, 12, 0.45)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "32px",
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isLight
                  ? "0 10px 35px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)"
                  : model.highlight
                  ? "0 20px 50px -10px rgba(0, 0, 0, 0.5)"
                  : "none",
              }}
            >
              <div>
                {/* Top Row: Pill Tag + 3D Amber Switch Icon */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      background: isLight
                        ? model.highlight
                          ? "rgba(255, 121, 12, 0.1)"
                          : "rgba(0, 0, 0, 0.05)"
                        : model.highlight
                        ? "rgba(255, 121, 12, 0.15)"
                        : "rgba(255, 255, 255, 0.06)",
                      border: `1px solid ${
                        isLight
                          ? model.highlight
                            ? "rgba(255, 121, 12, 0.3)"
                            : "rgba(0, 0, 0, 0.08)"
                          : model.highlight
                          ? "rgba(255, 121, 12, 0.35)"
                          : "rgba(255, 255, 255, 0.1)"
                      }`,
                      color: isLight
                        ? model.highlight
                          ? "#ea580c"
                          : "#475569"
                        : model.highlight
                        ? "#ff7d4e"
                        : "#cbd5e1",
                    }}
                  >
                    {model.badge}
                  </span>

                  <AmberKeycapSwitch variant={model.variant} />
                </div>

                {/* Big Title Area (No Price, No Hours, Pure Focus on Role) */}
                <div style={{ margin: "16px 0 24px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                        fontWeight: 900,
                        color: isLight ? "#0f172a" : "#ffffff",
                        letterSpacing: "-0.035em",
                        lineHeight: 1.1,
                      }}
                    >
                      {model.title}
                    </span>
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: isLight ? "#64748b" : "#94a3b8",
                      }}
                    >
                      {model.subtitle}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: isLight ? "#475569" : "#94a3b8",
                      marginTop: "10px",
                      lineHeight: 1.5,
                    }}
                  >
                    {model.tagline}
                  </p>
                </div>

                {/* Includes Section Lead */}
                <div
                  style={{
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: isLight ? "#0f172a" : "#ffffff",
                    marginBottom: "18px",
                  }}
                >
                  {model.leadIn}
                </div>

                {/* Features List */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 32px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {model.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        fontSize: "0.9rem",
                        color: isLight ? "#334155" : "#cbd5e1",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: isLight
                            ? "rgba(16, 185, 129, 0.12)"
                            : "rgba(16, 185, 129, 0.16)",
                          color: isLight ? "#059669" : "#10b981",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <a
                href={model.ctaHref}
                onClick={() => sound.play("tap")}
                className={model.highlight ? "midu-btn-primary" : "midu-btn-secondary"}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "15px 22px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                }}
              >
                <span>{model.ctaText}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Badges (Matching Screenshot 2 Bottom) */}
        <div
          style={{
            maxWidth: "1020px",
            margin: "36px auto 0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          <div
            style={{
              padding: "18px 24px",
              borderRadius: "20px",
              background: isLight ? "#ffffff" : "rgba(18, 18, 22, 0.65)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow: isLight ? "0 4px 18px rgba(0, 0, 0, 0.03)" : "none",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "12px",
                background: isLight ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#10b981",
              }}
            >
              <Clock size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                Immediate Availability
              </div>
              <div style={{ fontSize: "0.8rem", color: isLight ? "#64748b" : "#94a3b8", marginTop: "2px" }}>
                Ready to join your team within 5-10 business days • Remote Worldwide
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "18px 24px",
              borderRadius: "20px",
              background: isLight ? "#ffffff" : "rgba(18, 18, 22, 0.65)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow: isLight ? "0 4px 18px rgba(0, 0, 0, 0.03)" : "none",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "12px",
                background: isLight ? "rgba(255, 121, 12, 0.12)" : "rgba(255, 121, 12, 0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#ff790c",
              }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                Production Engineering Standards
              </div>
              <div style={{ fontSize: "0.8rem", color: isLight ? "#64748b" : "#94a3b8", marginTop: "2px" }}>
                Clean Architecture with 90%+ unit & widget test coverage
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
