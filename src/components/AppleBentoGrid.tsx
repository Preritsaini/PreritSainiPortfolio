"use client";

import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { sound } from "../utils/audioSynth";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface SkillTool {
  id: string;
  name: string;
  category: "mobile" | "systems" | "backend" | "web" | "design";
  bgColor: string;
  borderColor?: string;
  svg: React.ReactNode;
}

export const AppleBentoGrid: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Exact 10 official real logos for the signature Midu row:
  // Flutter, Dart, FlutterFlow, C++, Python, Go, Firebase, React, Node.js, Figma
  const tools: SkillTool[] = [
    {
      id: "flutter",
      name: "Flutter",
      category: "mobile",
      bgColor: "#042B59",
      borderColor: "#02569B",
      svg: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
          <path d="M14.314 2L4.088 12.226l3.22 3.22L19.534 3.22h-5.22z" fill="#40C4FF" />
          <path d="M14.314 12.226L8.854 17.686l3.22 3.22 3.708-3.708 5.46-5.46h-6.928z" fill="#0288D1" />
          <path d="M12.074 14.466l2.24 2.24-2.24 2.24-2.24-2.24 2.24-2.24z" fill="#01579B" />
        </svg>
      ),
    },
    {
      id: "dart",
      name: "Dart",
      category: "mobile",
      bgColor: "#01579B",
      borderColor: "#0175C2",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M4.2 4.2l9.7 2.6L20 12.9l-4.1 6.9-9.8-4L4.2 4.2z" fill="#00D2B8" />
          <path d="M4.2 4.2l6.9 14.1 4.8-2.8-2.1-8.5-9.6-2.8z" fill="#0175C2" />
          <path d="M11.1 18.3l4.8-2.8 4.1-6.9-4.8 1.4-4.1 8.3z" fill="#02569B" />
        </svg>
      ),
    },
    {
      id: "flutterflow",
      name: "FlutterFlow",
      category: "mobile",
      bgColor: "#0B1528",
      borderColor: "#0284C7",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M3.5 4h7l-3.5 7H3.5L3.5 4z" fill="#38BDF8" />
          <path d="M9.5 4h7l-7 16h-4L9.5 4z" fill="#0284C7" />
          <path d="M12.5 12h7L16 20h-7l3.5-8z" fill="#0EA5E9" />
        </svg>
      ),
    },
    {
      id: "cpp",
      name: "C++",
      category: "systems",
      bgColor: "#004482",
      borderColor: "#00599C",
      svg: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#00599C" />
          <path d="M12 3.8l7.3 4.2v8.6L12 21l-7.3-4.2V8V3.8z" fill="#004482" />
          <path
            d="M11.5 8.2a4.2 4.2 0 1 0 0 7.6 4.2 4.2 0 0 0 0-7.6zm0 1.8a2.3 2.3 0 1 1 0 4 2.3 2.3 0 0 1 0-4z"
            fill="#fff"
          />
          <path
            d="M14.8 10.4h.9v1.1h1.1v.9h-1.1v1.1h-.9v-1.1h-1.1v-.9h1.1v-1.1zm3.8 0h.9v1.1h1.1v.9h-1.1v1.1h-.9v-1.1h-1.1v-.9h1.1v-1.1z"
            fill="#00A2ED"
          />
        </svg>
      ),
    },
    {
      id: "python",
      name: "Python",
      category: "systems",
      bgColor: "#1E293B",
      borderColor: "#3776AB",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path
            d="M11.91 2c-4.4 0-4.13 1.9-4.13 1.9l.01 1.97h4.2v.6H6.1S2.7 6.13 2.7 10.56c0 4.34 2.94 4.2 2.94 4.2h1.75v-2.45s-.1-2.94 2.87-2.94h4.9s2.73-.04 2.73-2.66V4.66s.4-2.66-4.32-2.66h1.34zm-1.26 1.4a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z"
            fill="#38BDF8"
          />
          <path
            d="M12.09 22c4.4 0 4.13-1.9 4.13-1.9l-.01-1.97h-4.2v-.6h5.89s3.4.34 3.4-4.09c0-4.34-2.94-4.2-2.94-4.2h-1.75v2.45s.1 2.94-2.87 2.94h-4.9s-2.73.04-2.73 2.66v2.05s-.4 2.66 4.32 2.66h-1.34zm1.26-1.4a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z"
            fill="#FBBF24"
          />
        </svg>
      ),
    },
    {
      id: "go",
      name: "Golang",
      category: "systems",
      bgColor: "#007D9C",
      borderColor: "#00ADD8",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M1.5 10.2h5.8v1.2H1.5v-1.2zm-1 2.8h4.8v1.2H.5V13zm3 2.8h3.8v1.2H3.5v-1.2z" fill="#fff" opacity="0.85" />
          <path
            d="M14.2 9.5c-2.4 0-4 1.7-4 4s1.6 4 4 4c2.2 0 3.6-1.4 3.8-3.1h-3.8v-1.6h5.6c.1.4.1.8.1 1.2 0 3.2-2.3 5.4-5.7 5.4-3.5 0-6-2.6-6-6s2.5-6 6-6c2.5 0 4.4 1.3 5.2 3.1l-1.6.9c-.6-1.3-1.9-1.9-3.6-1.9zm7.3 0c-2.5 0-4.3 1.9-4.3 4.2s1.8 4.2 4.3 4.2c2.5 0 4.3-1.9 4.3-4.2s-1.8-4.2-4.3-4.2zm0 1.8c1.3 0 2.3 1.1 2.3 2.4s-1 2.4-2.3 2.4-2.3-1.1-2.3-2.4 1-2.4 2.3-2.4z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      id: "firebase",
      name: "Firebase",
      category: "backend",
      bgColor: "#7C2D12",
      borderColor: "#F57C00",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M4.5 16.5L7.2 2.8c.08-.4.56-.56.88-.3l2.8 2.3L4.5 16.5z" fill="#FFA000" />
          <path d="M19.5 16.5L16.2 6.8c-.14-.42-.7-.52-.98-.2l-4.4 4.4 8.68 5.5z" fill="#F57C00" />
          <path d="M12 21.5l7.5-5-8.7-5.5L3.6 15.8l8.4 5.7z" fill="#FFCA28" />
        </svg>
      ),
    },
    {
      id: "react",
      name: "React",
      category: "web",
      bgColor: "#141C2E",
      borderColor: "#61DAFB",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      ),
    },
    {
      id: "node",
      name: "Node.js",
      category: "backend",
      bgColor: "#16381E",
      borderColor: "#339933",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" fill="#339933" />
          <path d="M12 4.2L5 8.2v7.6l7 4 7-4V8.2l-7-4z" fill="#215732" />
          <path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 6.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#fff" />
        </svg>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      category: "design",
      bgColor: "#18181B",
      borderColor: "#27272A",
      svg: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
          <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
          <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1ABCFE" />
          <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
          <path d="M8 12h4v5a2.5 2.5 0 0 1-4-2v-3z" fill="#0ACF83" />
        </svg>
      ),
    },
  ];

  // 4 Core Engineering Pillars
  const skillPillars = [
    {
      id: "mobile",
      title: "Flutter & Mobile Systems",
      info: "Specialized in 120 FPS native mobile apps across iOS and Android with Flutter & Dart. Expert in reactive BLoC and Riverpod state machines, custom canvas shaders, Flame Engine game mechanics, and rapid prototyping with FlutterFlow & Figma.",
      tags: ["Flutter 3", "Dart", "BLoC", "Riverpod", "FlutterFlow", "Flame 2D"],
      arrowType: "up-right",
      relatedTools: ["flutter", "dart", "flutterflow", "figma"],
    },
    {
      id: "systems",
      title: "Low-Level & Systems Programming",
      info: "Deep foundation in C++, C, Python, and Go for high-throughput computing. Bridging Flutter with native platform channels (Swift/Kotlin), memory-safe data structures, POSIX system calls, and automated background workers.",
      tags: ["C++ 20", "C", "Go (Golang)", "Python", "Method Channels"],
      arrowType: "up-right",
      relatedTools: ["cpp", "python", "go"],
    },
    {
      id: "backend",
      title: "Cloud & Real-Time Backends",
      info: "Building scalable cloud infrastructure and serverless services with Firebase, Node.js, and AWS S3. Experienced in WebSockets trade streams, encrypted Hive caching, and zero-downtime microservice REST APIs.",
      tags: ["Firebase", "Node.js", "AWS S3", "WebSockets", "Hive DB"],
      arrowType: "right",
      relatedTools: ["firebase", "node", "python"],
    },
    {
      id: "web",
      title: "Full-Stack Web & Interfaces",
      info: "Responsive, production-grade web applications and interactive canvas tools using React, Next.js, JavaScript, and semantic HTML5 & CSS3. Translating Figma component systems into clean, maintainable code with high Core Web Vitals.",
      tags: ["React 19", "JavaScript", "HTML5 & CSS3", "Figma", "Next.js"],
      arrowType: "up-right",
      relatedTools: ["react", "figma"],
    },
  ];

  const handleToolClick = (toolId: string) => {
    sound.play("tap");
    setSelectedFilter(selectedFilter === toolId ? null : toolId);
  };

  return (
    <section
      className="section"
      style={{
        background: isLight ? "#f0f0f2" : "#080c16",
        borderRadius: "44px 44px 0 0",
        borderTop: isLight ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
        paddingTop: "90px",
        paddingBottom: "110px",
        paddingLeft: "0",
        paddingRight: "0",
        transition: "background 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="app-container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* ==================================================================== */}
        {/* 1. SIGNATURE MIDU 3-ROW HEADLINE (CENTERED COMPOSITION)             */}
        {/* ==================================================================== */}
        <div style={{ maxWidth: "920px", margin: "0 auto 50px auto" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* ROW 1: "My skills &" */}
            <h2
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: isLight ? "#0a0a0c" : "#ffffff",
                margin: 0,
                paddingLeft: "8px",
              }}
            >
              My skills &amp;
            </h2>

            {/* ROW 2: DEDICATED SQUIRCLE ROW (ALL 10 LOGOS IN THEIR OWN ROW - CENTERED) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
                overflowX: "auto",
                paddingTop: "6px",
                paddingBottom: "10px",
                scrollbarWidth: "none",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "14px",
                  margin: "0 auto",
                  flexShrink: 0,
                  padding: "0 8px",
                }}
              >
                {tools.map((t) => {
                  const isHovered = hoveredTool === t.id;
                  const isSelected = selectedFilter === t.id;

                  return (
                    <div
                      key={t.id}
                      style={{ position: "relative", flexShrink: 0 }}
                      onMouseEnter={() => {
                        sound.play("tap");
                        setHoveredTool(t.id);
                      }}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      <button
                        onClick={() => handleToolClick(t.id)}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "18px",
                          background: t.bgColor,
                          border: isSelected
                            ? "3px solid #ff790c"
                            : isLight
                            ? `1px solid ${t.borderColor || "rgba(0,0,0,0.1)"}`
                            : `1px solid ${t.borderColor || "rgba(255,255,255,0.15)"}`,
                          boxShadow: isHovered
                            ? "0 14px 28px rgba(0, 0, 0, 0.35), 0 0 0 2px #ff790c"
                            : isLight
                            ? "0 4px 14px rgba(0, 0, 0, 0.08)"
                            : "0 6px 18px rgba(0, 0, 0, 0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transform: isHovered ? "translateY(-5px) scale(1.08)" : "translateY(0) scale(1)",
                          transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                          outline: "none",
                        }}
                        title={t.name}
                      >
                        {t.svg}
                      </button>

                      {/* Tooltip Badge Below Hovered Icon */}
                      {isHovered && (
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: isLight ? "#ffffff" : "#0f172a",
                            color: isLight ? "#0f172a" : "#f8fafc",
                            paddingTop: "4px",
                            paddingBottom: "4px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderRadius: "8px",
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                            boxShadow: isLight
                              ? "0 8px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
                              : "0 10px 25px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                            zIndex: 40,
                            pointerEvents: "none",
                            animation: "fadeIn 0.15s ease",
                          }}
                        >
                          {t.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ROW 3: "your vision." (RIGHT-ALIGNED IN CENTERED CONTAINER) */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                paddingRight: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: isLight ? "#0a0a0c" : "#ffffff",
                  margin: 0,
                  textAlign: "right",
                }}
              >
                your vision.
              </h2>
            </div>
          </div>

          {/* Subtext Paragraph & Action Button */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginTop: "38px",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: isLight ? "#475569" : "#94a3b8",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              I build production-ready software across the complete mobile and systems stack: 120 FPS
              native Flutter UIs, low-level C++ &amp; Go compute engines, real-time Firebase backends,
              and responsive React web tools. From research to App Store launch, I craft bold, seamless experiences.
            </p>

            <a
              href="#projects"
              onClick={() => sound.play("tap")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                paddingTop: "12px",
                paddingBottom: "12px",
                paddingLeft: "24px",
                paddingRight: "24px",
                borderRadius: "30px",
                background: isLight ? "#e2e8f0" : "rgba(255, 255, 255, 0.1)",
                color: isLight ? "#0f172a" : "#ffffff",
                fontSize: "0.95rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s ease",
                boxShadow: isLight ? "0 2px 6px rgba(0, 0, 0, 0.05)" : "none",
              }}
            >
              <ArrowUpRight size={18} />
              <span>Explore my work</span>
            </a>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. STAGGERED 4-CARD PILLARS (CENTERED 2x2 BALANCED GRID)            */}
        {/* ==================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            maxWidth: "1040px",
            margin: "44px auto 0 auto",
            gap: "24px",
          }}
        >
          {skillPillars.map((cap) => {
            const isHighlighted =
              selectedFilter && cap.relatedTools.includes(selectedFilter);

            return (
              <div
                key={cap.id}
                style={{
                  background: isLight ? "#ffffff" : "rgba(15, 23, 42, 0.65)",
                  borderRadius: "28px",
                  paddingTop: "34px",
                  paddingBottom: "32px",
                  paddingLeft: "32px",
                  paddingRight: "32px",
                  border: isHighlighted
                    ? "2px solid #ff790c"
                    : isLight
                    ? "1px solid rgba(0, 0, 0, 0.06)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isHighlighted
                    ? "0 20px 40px rgba(255, 121, 12, 0.25)"
                    : isLight
                    ? "0 10px 30px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)"
                    : "0 16px 36px rgba(0, 0, 0, 0.45)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "290px",
                  transition: "all 0.25s ease",
                  position: "relative",
                }}
              >
                <div>
                  {/* Card Title */}
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      color: isLight ? "#0a0a0c" : "#ffffff",
                      margin: 0,
                      marginBottom: "14px",
                    }}
                  >
                    {cap.title}
                  </h3>

                  {/* Horizontal Divider Line */}
                  <div
                    style={{
                      height: "1px",
                      background: isLight ? "rgba(0, 0, 0, 0.07)" : "rgba(255, 255, 255, 0.08)",
                      marginBottom: "14px",
                    }}
                  />

                  {/* "Info" Label */}
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: isLight ? "#94a3b8" : "#64748b",
                      marginBottom: "8px",
                    }}
                  >
                    Info
                  </div>

                  {/* Description Body */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: isLight ? "#475569" : "#cbd5e1",
                      margin: 0,
                      marginBottom: "20px",
                    }}
                  >
                    {cap.info}
                  </p>
                </div>

                {/* Card Footer: Tech Tags + Squircle Arrow Button */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {cap.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          paddingTop: "3px",
                          paddingBottom: "3px",
                          paddingLeft: "8px",
                          paddingRight: "8px",
                          borderRadius: "6px",
                          background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.06)",
                          color: isLight ? "#334155" : "#94a3b8",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rounded Squircle Arrow Button */}
                  <button
                    onClick={() => {
                      sound.play("tap");
                      const elem = document.getElementById("projects");
                      if (elem) elem.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: isLight ? "#f1f3f5" : "rgba(255, 255, 255, 0.08)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.05)" : "1px solid rgba(255, 255, 255, 0.12)",
                      color: isLight ? "#0f172a" : "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                    title="View Related Projects"
                  >
                    {cap.arrowType === "right" ? <ArrowRight size={18} /> : <ArrowUpRight size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
