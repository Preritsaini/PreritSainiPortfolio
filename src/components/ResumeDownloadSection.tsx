"use client";

import React, { useState } from "react";
import { sound } from "../utils/audioSynth";
import { RESUME_DATA } from "../data/portfolioData";
import {
  Download,
  FileText,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Briefcase,
  GraduationCap,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

interface ResumeDownloadSectionProps {
  onOpenResume?: () => void;
}

export const ResumeDownloadSection: React.FC<ResumeDownloadSectionProps> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    sound.play("coin");
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="resume-download"
      className="section"
      style={{
        background: isLight ? "#f8fafc" : "#050505",
        padding: "120px 0",
        transition: "background 0.3s ease",
      }}
    >
      <div className="app-container">
        {/* Section Eyebrow & Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <FileText size={14} />
            <span>Curriculum Vitae • Recruiter Fast-Track</span>
          </div>

          <h2
            className="midu-hero-title"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", marginBottom: "18px" }}
          >
            Need an official copy? <span className="serif-italic" style={{ color: "var(--text-primary)" }}>Download</span> the resume
            or <span className="serif-italic" style={{ color: "#ff7d4e" }}>inspect the CV</span>.
          </h2>

          <p className="section-subtitle" style={{ margin: "0 auto", fontSize: "1.15rem", color: "#94a3b8" }}>
            Tailored for hiring managers, technical recruiters, and engineering leads. Includes verified production
            metrics across Net Stratix Technologies, FittVybe, and Team Infits.
          </p>
        </div>

        {/* Feature Bento Card */}
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            background: isLight ? "#ffffff" : "rgba(14, 14, 18, 0.7)",
            border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "28px",
            padding: "48px 40px",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "48px",
            alignItems: "center",
            boxShadow: isLight ? "0 10px 40px rgba(0, 0, 0, 0.04)" : "none",
          }}
          className="hero-grid"
        >
          {/* Left Column: Visual Resume Preview Slate */}
          <div
            style={{
              background: isLight ? "#f8fafc" : "rgba(10, 10, 14, 0.9)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: "32px",
              boxShadow: isLight ? "0 10px 30px rgba(0, 0, 0, 0.03)" : "0 25px 60px -20px rgba(0, 0, 0, 0.8)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.06)",
                paddingBottom: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                    boxShadow: "0 0 10px #10b981",
                  }}
                />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10b981", letterSpacing: "0.06em" }}>
                  VERIFIED PDF • 1 PAGE
                </span>
              </div>
              <span style={{ fontSize: "0.74rem", color: isLight ? "#64748b" : "#64748b", fontFamily: "var(--font-mono)" }}>
                OCTOBER 2026 EDITION
              </span>
            </div>

            {/* Candidate Identity */}
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  fontSize: "1.85rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: isLight ? "#0f172a" : "#ffffff",
                  marginBottom: "4px",
                }}
              >
                {RESUME_DATA.name}
              </h3>
              <div
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#ff790c",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {RESUME_DATA.title}
              </div>
              <div style={{ fontSize: "0.82rem", color: isLight ? "#64748b" : "#8e8e93", marginTop: "4px" }}>
                {RESUME_DATA.location} • {RESUME_DATA.phone}
              </div>
            </div>

            {/* Resume Summary snippet */}
            <p
              style={{
                fontSize: "0.88rem",
                color: isLight ? "#475569" : "#94a3b8",
                lineHeight: 1.6,
                marginBottom: "24px",
                borderLeft: "2px solid #ff7d4e",
                paddingLeft: "12px",
              }}
            >
              {RESUME_DATA.summary}
            </p>

            {/* Highlights Pillars */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: isLight ? "#ffffff" : "rgba(255, 255, 255, 0.03)",
                  border: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: isLight ? "0 2px 6px rgba(0, 0, 0, 0.02)" : "none",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Current Role
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff", marginTop: "2px" }}>
                  SDE I @ Net Stratix
                </div>
                <div style={{ fontSize: "0.74rem", color: "#10b981", marginTop: "2px" }}>
                  10k+ Users • Sep 2025 – Present
                </div>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: isLight ? "#ffffff" : "rgba(255, 255, 255, 0.03)",
                  border: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: isLight ? "0 2px 6px rgba(0, 0, 0, 0.02)" : "none",
                }}
              >
                <div style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Education
                </div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff", marginTop: "2px" }}>
                  B.Tech in CSE
                </div>
                <div style={{ fontSize: "0.74rem", color: "#a855f7", marginTop: "2px" }}>
                  AKTU, Lucknow • 2023 – Present
                </div>
              </div>
            </div>

            {/* Core Tech Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {["Flutter", "Dart", "Clean Architecture", "Riverpod", "Provider", "Flame Engine", "Firebase", "CI/CD"].map(
                (skill, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background: isLight ? "#ffffff" : "rgba(255, 255, 255, 0.04)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
                      color: isLight ? "#334155" : "#cbd5e1",
                    }}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right Column: Download Actions & Recruiter Fast Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#ff7d4e",
                  marginBottom: "8px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                OFFICIAL RESUME ATTACHMENT
              </div>
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: isLight ? "#0f172a" : "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Direct PDF Download
              </h3>
              <p style={{ fontSize: "0.92rem", color: isLight ? "#475569" : "#94a3b8", lineHeight: 1.6 }}>
                Click below to download Prerit Saini&apos;s 1-page official resume directly to your device, or open the interactive
                web version with print support.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Primary Direct Download Link */}
              <a
                href="/Prerit_Saini_Resume.pdf"
                download="Prerit Saini Resume 2.pdf"
                onClick={() => sound.play("coin")}
                className="midu-btn-primary"
                style={{
                  justifyContent: "center",
                  padding: "16px 28px",
                  fontSize: "1rem",
                  width: "100%",
                }}
              >
                <Download size={18} />
                <span>Download Official Resume (PDF)</span>
              </a>

              {/* Interactive Modal Button */}
              {onOpenResume && (
                <button
                  onClick={() => {
                    sound.play("tap");
                    onOpenResume();
                  }}
                  className="midu-btn-secondary"
                  style={{
                    justifyContent: "center",
                    padding: "14px 24px",
                    fontSize: "0.95rem",
                    width: "100%",
                  }}
                >
                  <FileText size={16} />
                  <span>Open Interactive CV Modal</span>
                </button>
              )}
            </div>

            {/* Recruiter Fast Channels */}
            <div
              style={{
                marginTop: "8px",
                padding: "20px",
                borderRadius: "16px",
                background: isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.03)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isLight ? "#0f172a" : "#e2e8f0" }}>
                  <Mail size={14} color="#ff790c" />
                  <span>{RESUME_DATA.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: copiedEmail ? "#10b981" : isLight ? "#64748b" : "#94a3b8",
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isLight ? "#0f172a" : "#e2e8f0" }}>
                  <Phone size={14} color="#10b981" />
                  <span>{RESUME_DATA.phone}</span>
                </div>
                <a
                  href={`tel:${RESUME_DATA.phone}`}
                  style={{
                    color: "#38bdf8",
                    textDecoration: "none",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  Call ↗
                </a>
              </div>

              <div style={{ display: "flex", gap: "14px", marginTop: "6px", fontSize: "0.82rem" }}>
                <a
                  href={RESUME_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}
                >
                  LinkedIn Profile ↗
                </a>
                <span style={{ color: isLight ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)" }}>•</span>
                <a
                  href={RESUME_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}
                >
                  GitHub @Preritsaini ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
