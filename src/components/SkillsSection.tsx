"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "../data/portfolioData";
import {
  Smartphone,
  Layers,
  Server,
  GitBranch,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { sound } from "../utils/audioSynth";

export const SkillsSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone size={18} color={isLight ? "#0284c7" : "#00e5ff"} />;
      case "Layers":
        return <Layers size={18} color={isLight ? "#9333ea" : "#a855f7"} />;
      case "Server":
        return <Server size={18} color={isLight ? "#059669" : "#10b981"} />;
      case "GitBranch":
        return <GitBranch size={18} color={isLight ? "#d97706" : "#f59e0b"} />;
      default:
        return <Sparkles size={18} color={isLight ? "#0284c7" : "#00e5ff"} />;
    }
  };

  return (
    <section
      id="skills"
      className="section"
      style={{
        background: isLight ? "#f8fafc" : "rgba(10, 15, 30, 0.4)",
        borderTop: isLight ? "1px solid rgba(0, 0, 0, 0.05)" : "1px solid rgba(255, 255, 255, 0.06)",
        paddingTop: "90px",
        paddingBottom: "100px",
        transition: "background 0.3s ease",
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <Zap size={14} />
            <span>Tools &amp; Stack • Production Mastery</span>
          </div>
          <h2
            className="midu-hero-title"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginBottom: "18px" }}
          >
            My <span className="serif-italic" style={{ color: "var(--text-primary)" }}>skills</span> &amp; your{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>vision</span>.
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
            A battle-tested stack refined across high-traffic production apps. From low-level GLSL shaders
            and Swift/Kotlin bridges to distributed cloud backends.
          </p>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              marginTop: "28px",
            }}
          >
            {SKILL_CATEGORIES.map((cat, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.play("tap");
                    setActiveTab(idx);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    background: isActive
                      ? isLight
                        ? "#ff790c"
                        : "rgba(255, 121, 12, 0.2)"
                      : isLight
                      ? "#ffffff"
                      : "rgba(255, 255, 255, 0.04)",
                    color: isActive
                      ? "#ffffff"
                      : isLight
                      ? "#334155"
                      : "#94a3b8",
                    border: `1px solid ${
                      isActive
                        ? isLight
                          ? "#ff790c"
                          : "rgba(255, 121, 12, 0.5)"
                        : isLight
                        ? "rgba(0, 0, 0, 0.08)"
                        : "rgba(255, 255, 255, 0.08)"
                    }`,
                    boxShadow: isActive
                      ? isLight
                        ? "0 4px 14px rgba(255, 121, 12, 0.25)"
                        : "0 0 20px rgba(255, 121, 12, 0.2)"
                      : isLight
                      ? "0 2px 6px rgba(0, 0, 0, 0.03)"
                      : "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {getIcon(cat.iconName)}
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Skill Matrix Grid */}
        <div
          className="glass-card"
          style={{
            padding: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            background: isLight ? "#ffffff" : "var(--bg-card)",
            border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
            boxShadow: isLight ? "0 10px 30px rgba(0, 0, 0, 0.04)" : "none",
          }}
        >
          {SKILL_CATEGORIES[activeTab].skills.map((skill, idx) => (
            <div
              key={idx}
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.3)",
                border: `1px solid ${
                  skill.highlight
                    ? isLight
                      ? "rgba(255, 121, 12, 0.25)"
                      : "rgba(0, 229, 255, 0.25)"
                    : isLight
                    ? "rgba(0, 0, 0, 0.06)"
                    : "rgba(255, 255, 255, 0.05)"
                }`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: isLight ? "#0f172a" : "#ffffff",
                    }}
                  >
                    {skill.name}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "0.68rem",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: skill.highlight
                      ? isLight
                        ? "rgba(255, 121, 12, 0.12)"
                        : "rgba(255, 121, 12, 0.18)"
                      : isLight
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(255, 255, 255, 0.06)",
                    color: skill.highlight
                      ? isLight
                        ? "#ea580c"
                        : "#ff914d"
                      : isLight
                      ? "#64748b"
                      : "#94a3b8",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {skill.highlight ? "CORE" : "PRODUCTION"}
                </span>
              </div>

              {/* Note / Specific Focus */}
              {skill.note && (
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: isLight ? "#64748b" : "#94a3b8",
                    lineHeight: 1.5,
                  }}
                >
                  {skill.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Flutter Certifications & Quality Badges */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          <div style={badgeCard(isLight)}>
            <ShieldCheck size={20} color="#10b981" />
            <div>
              <div style={badgeTitle(isLight)}>Dart Null-Safety Strict</div>
              <div style={badgeDesc(isLight)}>Zero runtime null dereference errors</div>
            </div>
          </div>

          <div style={badgeCard(isLight)}>
            <Sparkles size={20} color={isLight ? "#0284c7" : "#00e5ff"} />
            <div>
              <div style={badgeTitle(isLight)}>Impeller GPU Acceleration</div>
              <div style={badgeDesc(isLight)}>Precompiled Vulkan &amp; Metal shaders</div>
            </div>
          </div>

          <div style={badgeCard(isLight)}>
            <GitBranch size={20} color="#a855f7" />
            <div>
              <div style={badgeTitle(isLight)}>Test-Driven Golden Tests</div>
              <div style={badgeDesc(isLight)}>Pixel-perfect snapshot regression checks</div>
            </div>
          </div>

          <div style={badgeCard(isLight)}>
            <Smartphone size={20} color="#f59e0b" />
            <div>
              <div style={badgeTitle(isLight)}>Adaptive Screen Layouts</div>
              <div style={badgeDesc(isLight)}>Phone, Tablet, Desktop &amp; Web ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const badgeCard = (isLight: boolean): React.CSSProperties => ({
  padding: "16px 18px",
  borderRadius: "14px",
  background: isLight ? "#ffffff" : "rgba(15, 23, 42, 0.5)",
  border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
  boxShadow: isLight ? "0 4px 14px rgba(0, 0, 0, 0.03)" : "none",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const badgeTitle = (isLight: boolean): React.CSSProperties => ({
  fontSize: "0.85rem",
  fontWeight: 700,
  color: isLight ? "#0f172a" : "#ffffff",
});

const badgeDesc = (isLight: boolean): React.CSSProperties => ({
  fontSize: "0.75rem",
  color: isLight ? "#64748b" : "#94a3b8",
});
