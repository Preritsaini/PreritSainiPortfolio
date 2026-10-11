"use client";

import React, { useState, useEffect } from "react";
import { RESUME_DATA, WORK_EXPERIENCE, PROJECTS } from "../data/portfolioData";
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Layers,
  Code2,
  Phone,
} from "lucide-react";
import { sound } from "../utils/audioSynth";
import { useTheme } from "../context/ThemeContext";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.play("tap");
    window.print();
  };

  const handleCopyMarkdown = () => {
    sound.play("coin");
    const markdown = `# ${RESUME_DATA.name}
**${RESUME_DATA.title}**
${RESUME_DATA.location} | Phone: ${RESUME_DATA.phone} | Email: ${RESUME_DATA.email}
GitHub: ${RESUME_DATA.github} | LinkedIn: ${RESUME_DATA.linkedin}

${RESUME_DATA.summary}

## Core Technical Competencies
${RESUME_DATA.skillsByCategory
  .map((group) => `- **${group.category}**: ${group.items.join(", ")}`)
  .join("\n")}

## Professional Experience
${WORK_EXPERIENCE.map(
  (exp) => `### ${exp.role} — ${exp.company} (${exp.period})
${exp.description}
${exp.achievements.map((a) => `- ${a}`).join("\n")}
`
).join("\n")}

## Key Shipped Applications
${RESUME_DATA.projects
  .map((p) => `- **${p.name}**: ${p.description}`)
  .join("\n")}

## Education
- **${RESUME_DATA.education[0].degree}** — ${RESUME_DATA.education[0].institution} (${RESUME_DATA.education[0].period})
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: isLight ? "rgba(15, 23, 42, 0.6)" : "rgba(2, 6, 17, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play("tap");
          onClose();
        }
      }}
    >
      <div
        className="resume-container"
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          background: isLight ? "#ffffff" : "#0c1222",
          border: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 121, 12, 0.25)",
          boxShadow: isLight
            ? "0 25px 70px rgba(0, 0, 0, 0.18), 0 0 35px rgba(0, 0, 0, 0.05)"
            : "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 121, 12, 0.15)",
          borderRadius: "22px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          className="no-print"
          style={{
            padding: "16px 24px",
            background: isLight ? "#f8fafc" : "rgba(15, 23, 42, 0.8)",
            borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff790c",
                boxShadow: "0 0 10px #ff790c",
              }}
            />
            <span
              id="resume-title"
              style={{
                fontWeight: 800,
                fontSize: "1rem",
                color: isLight ? "#0f172a" : "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Curriculum Vitae • {RESUME_DATA.name}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="/Prerit_Saini_Resume.pdf"
              download="Prerit Saini Resume 2.pdf"
              onClick={() => sound.play("coin")}
              className="midu-btn-primary"
              style={{
                padding: "8px 18px",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              title="Download Authentic 1-Page PDF"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              className="btn btn-secondary"
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: isLight ? "rgba(0, 0, 0, 0.05)" : undefined,
                color: isLight ? "#0f172a" : undefined,
                borderColor: isLight ? "rgba(0, 0, 0, 0.12)" : undefined,
              }}
              title="Copy Resume as Markdown"
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span className="hide-on-mobile">{copied ? "Copied!" : "Copy Text"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{
                padding: "8px 14px",
                fontSize: "0.82rem",
                background: isLight ? "rgba(0, 0, 0, 0.05)" : undefined,
                color: isLight ? "#0f172a" : undefined,
                borderColor: isLight ? "rgba(0, 0, 0, 0.12)" : undefined,
              }}
              title="Print Resume"
            >
              <Printer size={14} />
              <span className="hide-on-mobile">Print</span>
            </button>

            <button
              onClick={() => {
                sound.play("tap");
                onClose();
              }}
              style={{
                background: isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.05)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.1)",
                color: isLight ? "#0f172a" : "#94a3b8",
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title="Close (ESC)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div
          id="printable-resume"
          style={{
            padding: "36px 40px",
            overflowY: "auto",
            lineHeight: 1.6,
            color: isLight ? "#0f172a" : "#e2e8f0",
            background: isLight ? "#ffffff" : "transparent",
          }}
        >
          {/* Header */}
          <div
            style={{
              borderBottom: isLight ? "2px solid rgba(255, 121, 12, 0.25)" : "2px solid rgba(255, 121, 12, 0.3)",
              paddingBottom: "24px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: isLight ? "#0f172a" : "#fff",
                    marginBottom: "4px",
                  }}
                >
                  {RESUME_DATA.name}
                </h1>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: isLight ? "#ea580c" : "#ff790c",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {RESUME_DATA.title}
                </p>
              </div>

              {/* Contact Meta */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "0.85rem",
                  color: isLight ? "#475569" : "#94a3b8",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Mail size={14} color="#ea580c" />
                  <a
                    href={`mailto:${RESUME_DATA.email}`}
                    style={{
                      color: isLight ? "#0f172a" : "#e2e8f0",
                      fontWeight: isLight ? 600 : 400,
                      textDecoration: "none",
                    }}
                  >
                    {RESUME_DATA.email}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Phone size={14} color="#10b981" />
                  <a
                    href={`tel:${RESUME_DATA.phone.replace(/\s+/g, '')}`}
                    style={{
                      color: isLight ? "#0f172a" : "#e2e8f0",
                      fontWeight: isLight ? 600 : 400,
                      textDecoration: "none",
                    }}
                  >
                    {RESUME_DATA.phone}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={14} color={isLight ? "#0284c7" : "#38bdf8"} />
                  <span style={{ color: isLight ? "#475569" : "#94a3b8" }}>{RESUME_DATA.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                  <a
                    href={RESUME_DATA.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: isLight ? "#0284c7" : "#38bdf8",
                      textDecoration: "none",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                    }}
                  >
                    GitHub ↗
                  </a>
                  <span style={{ color: isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.2)" }}>•</span>
                  <a
                    href={RESUME_DATA.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: isLight ? "#0284c7" : "#38bdf8",
                      textDecoration: "none",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Summary */}
            <p
              style={{
                marginTop: "18px",
                fontSize: "0.95rem",
                color: isLight ? "#334155" : "#cbd5e1",
                lineHeight: 1.65,
              }}
            >
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Section: Core Technical Skills */}
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isLight ? "#ea580c" : "#ff790c",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Code2 size={16} />
              <span>Core Technical Competencies</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "14px",
              }}
            >
              {RESUME_DATA.skillsByCategory.map((group, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "14px 16px",
                    background: isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.025)",
                    border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      color: isLight ? "#0284c7" : "#38bdf8",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {group.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          padding: "4px 9px",
                          borderRadius: "6px",
                          background: isLight ? "#ffffff" : "rgba(255, 121, 12, 0.08)",
                          color: isLight ? "#0f172a" : "#e2e8f0",
                          border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 121, 12, 0.15)",
                          boxShadow: isLight ? "0 1px 2px rgba(0, 0, 0, 0.04)" : "none",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Professional Experience */}
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isLight ? "#ea580c" : "#ff790c",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Briefcase size={16} />
              <span>Professional Experience</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {WORK_EXPERIENCE.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    borderLeft: isLight ? "3px solid #ff790c" : "2px solid rgba(255, 121, 12, 0.3)",
                    paddingLeft: "18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "4px",
                    }}
                  >
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: isLight ? "#0f172a" : "#fff" }}>
                      {exp.role} •{" "}
                      <span style={{ color: isLight ? "#0284c7" : "#40C4FF", fontWeight: 700 }}>
                        {exp.company}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: isLight ? "#64748b" : "#94a3b8",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.92rem", color: isLight ? "#334155" : "#94a3b8", marginBottom: "8px" }}>
                    {exp.description}
                  </p>

                  <ul
                    style={{
                      listStyleType: "none",
                      paddingLeft: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {exp.achievements.map((ach, aIdx) => (
                      <li
                        key={aIdx}
                        style={{
                          fontSize: "0.88rem",
                          color: isLight ? "#0f172a" : "#cbd5e1",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: isLight ? "#ea580c" : "#ff790c", lineHeight: 1.3 }}>▹</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Featured Projects */}
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isLight ? "#ea580c" : "#ff790c",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Layers size={16} />
              <span>Key Shipped Applications</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "14px",
              }}
            >
              {RESUME_DATA.projects.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    padding: "14px 16px",
                    background: isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.02)",
                    border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      color: isLight ? "#0f172a" : "#fff",
                      fontSize: "0.95rem",
                      marginBottom: "4px",
                    }}
                  >
                    {proj.name}
                  </div>
                  <p style={{ fontSize: "0.86rem", color: isLight ? "#334155" : "#94a3b8", lineHeight: 1.5 }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isLight ? "#ea580c" : "#ff790c",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <GraduationCap size={16} />
              <span>Education</span>
            </h2>

            <div
              style={{
                padding: "16px",
                background: isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.025)",
                borderRadius: "12px",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div style={{ fontWeight: 800, color: isLight ? "#0f172a" : "#fff", fontSize: "0.95rem" }}>
                  {RESUME_DATA.education[0].degree}
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: isLight ? "#475569" : "#94a3b8",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                  }}
                >
                  {RESUME_DATA.education[0].period}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  color: isLight ? "#7c3aed" : "#38bdf8",
                  margin: "2px 0 4px",
                  fontWeight: 700,
                }}
              >
                {RESUME_DATA.education[0].institution}
              </div>
              <div style={{ fontSize: "0.82rem", color: isLight ? "#334155" : "#94a3b8" }}>
                {RESUME_DATA.education[0].details}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
