"use client";

import React from "react";
import { WORK_EXPERIENCE } from "../data/portfolioData";
import { Briefcase, Calendar, CheckCircle2, Award, GraduationCap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="experience"
      className="section"
      style={{
        background: isLight ? "#f8fafc" : undefined,
        transition: "background 0.3s ease",
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <Briefcase size={14} />
            <span>Track Record • 1+ Year Experience</span>
          </div>
          <h2
            className="midu-hero-title"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginBottom: "18px" }}
          >
            Engineering <span className="serif-italic" style={{ color: "var(--text-primary)" }}>craft</span> &amp;{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>impact</span>.
          </h2>
          <p
            className="section-subtitle"
            style={{
              margin: "0 auto",
              fontSize: "1.15rem",
              color: isLight ? "#475569" : "#94a3b8",
            }}
          >
            A track record of shipping production iOS &amp; Android apps with clean architecture,
            responsive widget trees, and locked 60 &amp; 120 FPS native systems.
          </p>
        </div>

        {/* Timeline List */}
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            position: "relative",
          }}
        >
          {WORK_EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="glass-card experience-card"
              style={{
                padding: "32px",
                position: "relative",
                background: isLight ? "#ffffff" : undefined,
                borderTop: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
                borderRight: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
                borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
                borderLeft: "4px solid #ff790c",
                boxShadow: isLight ? "0 10px 30px rgba(0, 0, 0, 0.04)" : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: isLight ? "#0f172a" : "#ffffff",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    className="experience-company"
                    style={{
                      fontSize: "0.95rem",
                      color: isLight ? "#0284c7" : "#38bdf8",
                      fontWeight: 600,
                    }}
                  >
                    {exp.company}
                  </div>
                </div>

                <div
                  className="experience-period-badge"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.82rem",
                    color: isLight ? "#334155" : "#94a3b8",
                    background: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
                    border: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid transparent",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                  }}
                >
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description */}
              <p
                className="experience-description"
                style={{
                  color: isLight ? "#334155" : "#cbd5e1",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: "14px 0 18px",
                }}
              >
                {exp.description}
              </p>

              {/* Key Achievements */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {exp.achievements.map((ach, aIdx) => (
                  <div key={aIdx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={16} color="#ff790c" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <span
                      className="experience-achievement-text"
                      style={{
                        fontSize: "0.9rem",
                        color: isLight ? "#0f172a" : "#e2e8f0",
                        lineHeight: 1.55,
                        fontWeight: isLight ? 500 : 400,
                      }}
                    >
                      {ach}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Formal Education Card */}
          <div
            className="glass-card experience-card"
            style={{
              padding: "32px",
              position: "relative",
              background: isLight ? "#ffffff" : undefined,
              borderTop: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
              borderRight: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
              borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid var(--border-subtle)",
              borderLeft: "4px solid #8b5cf6",
              boxShadow: isLight ? "0 10px 30px rgba(0, 0, 0, 0.04)" : undefined,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <GraduationCap size={20} color="#8b5cf6" />
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: isLight ? "#0f172a" : "#ffffff",
                    }}
                  >
                    Bachelor of Technology in Computer Science &amp; Engineering
                  </h3>
                </div>
                <div
                  className="experience-institution"
                  style={{
                    fontSize: "0.95rem",
                    color: isLight ? "#7c3aed" : "#a78bfa",
                    fontWeight: 600,
                    marginTop: "4px",
                  }}
                >
                  Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow
                </div>
              </div>

              <div
                className="experience-period-badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.82rem",
                  color: isLight ? "#334155" : "#94a3b8",
                  background: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
                  border: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid transparent",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                }}
              >
                <Calendar size={13} />
                <span>2023 – Present</span>
              </div>
            </div>

            <p
              className="experience-description"
              style={{
                color: isLight ? "#334155" : "#cbd5e1",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                margin: "14px 0 18px",
              }}
            >
              Rigorous academic coursework in computer science foundations, algorithms, and software engineering.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span
                  className="experience-achievement-text"
                  style={{
                    fontSize: "0.9rem",
                    color: isLight ? "#0f172a" : "#e2e8f0",
                    lineHeight: 1.55,
                    fontWeight: isLight ? 500 : 400,
                  }}
                >
                  Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems (DBMS), Operating Systems.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={16} color="#8b5cf6" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span
                  className="experience-achievement-text"
                  style={{
                    fontSize: "0.9rem",
                    color: isLight ? "#0f172a" : "#e2e8f0",
                    lineHeight: 1.55,
                    fontWeight: isLight ? 500 : 400,
                  }}
                >
                  Specialization in Mobile Systems Architecture, Declarative UI Frameworks, and Native Interop.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
