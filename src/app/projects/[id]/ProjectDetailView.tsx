"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Project, PROJECTS } from "../../../data/portfolioData";
import { ResumeModal } from "../../../components/ResumeModal";
import { GithubIcon } from "../../../components/Icons";
import { sound } from "../../../utils/audioSynth";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  TrendingUp,
  FileCode2,
  Smartphone,
  ShieldCheck,
  Server,
  Zap,
  Volume2,
  VolumeX,
  FileText,
} from "lucide-react";

interface ProjectDetailViewProps {
  project: Project;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  const caseStudy = project.caseStudy;

  const handleCopyCode = () => {
    if (!caseStudy?.codeSnippet.code) return;
    sound.play("coin");
    navigator.clipboard.writeText(caseStudy.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleToggleSound = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#060913", color: "#f8fafc" }}>
      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Sticky Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          background: "rgba(6, 9, 19, 0.88)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "14px 0",
        }}
      >
        <div
          className="app-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Back button */}
          <Link
            href="/#projects"
            onClick={() => sound.play("tap")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#38bdf8",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={handleToggleSound}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: isMuted ? "#94a3b8" : "#00E5FF",
                cursor: "pointer",
              }}
              title="Toggle audio feedback"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isMuted ? "Sound Off" : "Sound On"}</span>
            </button>

            <button
              onClick={() => {
                sound.play("tap");
                setIsResumeOpen(true);
              }}
              className="btn btn-secondary"
              style={{ padding: "6px 14px", fontSize: "0.82rem" }}
            >
              <FileText size={14} />
              <span>Resume (PDF)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-container" style={{ padding: "48px 24px 100px" }}>
        {/* Project Hero */}
        <div style={{ marginBottom: "50px" }}>
          {/* Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                padding: "4px 12px",
                borderRadius: "9999px",
                background: "rgba(2, 86, 155, 0.3)",
                color: "#40C4FF",
                border: "1px solid rgba(64, 196, 255, 0.3)",
              }}
            >
              {project.badge}
            </span>

            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#94a3b8",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              {project.category}
            </span>

            <span
              style={{
                fontSize: "0.78rem",
                color: "#10b981",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: 600,
              }}
            >
              Production Deployed
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#94a3b8",
              maxWidth: "800px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {project.subtitle}
          </p>

          {/* Action links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "40px" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("tap")}
                className="btn btn-primary"
              >
                <span>Live Demo Platform</span>
                <ExternalLink size={16} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("tap")}
                className="btn btn-secondary"
              >
                <GithubIcon size={16} />
                <span>Source Code / GitHub</span>
              </a>
            )}

            <a
              href="#architecture"
              onClick={() => sound.play("tap")}
              className="btn btn-secondary"
            >
              <Cpu size={16} />
              <span>Explore Architecture Flow</span>
            </a>
          </div>
        </div>

        {/* 2-Column: Problem Statement & Solution */}
        <section style={{ marginBottom: "60px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {/* The Problem */}
            <div
              className="glass-card"
              style={{
                padding: "32px",
                borderLeft: "4px solid #ef4444",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#ef4444",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Zap size={14} />
                <span>The Engineering Challenge</span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>
                Bottlenecks in Existing Solutions
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.98rem", lineHeight: 1.7 }}>
                {caseStudy?.problem || project.summary}
              </p>
            </div>

            {/* The Solution */}
            <div
              className="glass-card"
              style={{
                padding: "32px",
                borderLeft: "4px solid #00E5FF",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#00E5FF",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Sparkles size={14} />
                <span>The Architectural Solution</span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>
                Engineered for Zero-Jank &amp; Scale
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.98rem", lineHeight: 1.7 }}>
                {caseStudy?.solution || project.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Architectural Layers Breakdown */}
        {caseStudy?.architectureLayers && (
          <section id="architecture" style={{ marginBottom: "70px" }}>
            <div style={{ marginBottom: "28px" }}>
              <div className="section-tag">
                <Layers size={14} />
                <span>Modular Layered Architecture</span>
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                Under the Hood: <span className="gradient-text">Clean Separation of Concerns</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {caseStudy.architectureLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: "rgba(0, 229, 255, 0.12)",
                      border: "1px solid rgba(0, 229, 255, 0.3)",
                      color: "#00E5FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      marginBottom: "14px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                    {layer.name}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "#38bdf8", fontWeight: 600, marginBottom: "12px" }}>
                    {layer.role}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6 }}>
                    {layer.details}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Engineering Challenges Deep Dive */}
        {caseStudy?.keyEngineeringChallenges && (
          <section style={{ marginBottom: "70px" }}>
            <div style={{ marginBottom: "28px" }}>
              <div className="section-tag">
                <Cpu size={14} />
                <span>Deep-Dive Engineering</span>
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                Production Hurdles &amp; <span className="gradient-text">How They Were Solved</span>
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {caseStudy.keyEngineeringChallenges.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card challenge-grid"
                  style={{
                    padding: "28px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: "#fff",
                        marginBottom: "12px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#f87171",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        marginBottom: "6px",
                      }}
                    >
                      The Root Problem:
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.65 }}>
                      {item.challenge}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.3)",
                      padding: "18px",
                      borderRadius: "14px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#38bdf8",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        marginBottom: "6px",
                      }}
                    >
                      Engineered Fix:
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: 1.65, marginBottom: "14px" }}>
                      {item.solution}
                    </p>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <CheckCircle2 size={15} />
                      <span>{item.outcome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Benchmarks & Performance Comparison */}
        {caseStudy?.benchmarks && (
          <section style={{ marginBottom: "70px" }}>
            <div style={{ marginBottom: "28px" }}>
              <div className="section-tag">
                <TrendingUp size={14} />
                <span>Empirical Benchmarks</span>
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                Performance Metrics: <span className="gradient-text">Before vs. After Optimization</span>
              </h2>
            </div>

            <div
              className="glass-card"
              style={{
                overflowX: "auto",
                padding: "8px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "0.92rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <th style={{ padding: "16px 20px" }}>Performance Metric</th>
                    <th style={{ padding: "16px 20px" }}>Before Optimization</th>
                    <th style={{ padding: "16px 20px" }}>After Architecture Refactor</th>
                    <th style={{ padding: "16px 20px" }}>Total Gain</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudy.benchmarks.map((b, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom:
                          idx < caseStudy.benchmarks.length - 1
                            ? "1px solid rgba(255, 255, 255, 0.05)"
                            : "none",
                      }}
                    >
                      <td style={{ padding: "16px 20px", fontWeight: 700, color: "#fff" }}>
                        {b.metric}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#f87171", fontFamily: "var(--font-mono)" }}>
                        {b.before}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#00E5FF", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                        {b.after}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            background: "rgba(16, 185, 129, 0.15)",
                            color: "#10b981",
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          {b.gain}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Dart Code Walkthrough */}
        {caseStudy?.codeSnippet && (
          <section style={{ marginBottom: "70px" }}>
            <div style={{ marginBottom: "24px" }}>
              <div className="section-tag">
                <FileCode2 size={14} />
                <span>Production Dart Code</span>
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff" }}>
                Implementation: <span className="gradient-text">{caseStudy.codeSnippet.filename}</span>
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
                {caseStudy.codeSnippet.description}
              </p>
            </div>

            <div className="code-container">
              <div className="code-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="code-dots">
                    <span className="code-dot red" />
                    <span className="code-dot yellow" />
                    <span className="code-dot green" />
                  </div>
                  <span className="code-filename">{caseStudy.codeSnippet.filename}</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#94a3b8",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copiedCode ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  <span>{copiedCode ? "Copied!" : "Copy Dart Code"}</span>
                </button>
              </div>

              <pre className="code-body" style={{ margin: 0 }}>
                <code>{caseStudy.codeSnippet.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Tech Specs & Stack Matrix */}
        {caseStudy?.techSpecs && (
          <section style={{ marginBottom: "80px" }}>
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>
                Technical Specification Summary
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {caseStudy.techSpecs.map((spec, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "16px",
                    background: "rgba(255, 255, 255, 0.025)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>
                    {spec.label}
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 700 }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prev / Next Project Navigator */}
        <div
          className="project-nav-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "60px",
          }}
        >
          {/* Previous Project */}
          <Link
            href={`/projects/${prevProject.id}`}
            onClick={() => sound.play("tap")}
            className="glass-card"
            style={{
              padding: "24px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#94a3b8" }}>
              <ArrowLeft size={14} />
              <span>Previous Project</span>
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
              {prevProject.title}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#38bdf8" }}>{prevProject.badge}</div>
          </Link>

          {/* Next Project */}
          <Link
            href={`/projects/${nextProject.id}`}
            onClick={() => sound.play("tap")}
            className="glass-card"
            style={{
              padding: "24px",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#94a3b8" }}>
              <span>Next Project</span>
              <ArrowRight size={14} />
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
              {nextProject.title}
            </div>
            <div style={{ fontSize: "0.82rem", color: "#38bdf8" }}>{nextProject.badge}</div>
          </Link>
        </div>

        {/* CTA Contact Footer Ribbon */}
        <div
          className="glass-card"
          style={{
            padding: "48px 36px",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(2, 86, 155, 0.2), rgba(0, 229, 255, 0.08))",
            border: "1px solid rgba(0, 229, 255, 0.3)",
          }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
            Ready to Build a High-Performance Mobile Application?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 28px" }}>
            Let&apos;s talk architecture, state pipelines, zero-jank Flutter rendering, and high-impact releases.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/#contact"
              onClick={() => sound.play("tap")}
              className="btn btn-primary"
            >
              <span>Get in Touch with Prerit</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => {
                sound.play("tap");
                setIsResumeOpen(true);
              }}
              className="btn btn-secondary"
            >
              <FileText size={16} />
              <span>View Full Resume</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
