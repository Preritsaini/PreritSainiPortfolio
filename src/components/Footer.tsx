"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { FlutterIcon } from "./Icons";
import { useTheme } from "../context/ThemeContext";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [currentYear, setCurrentYear] = useState("2026");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLink: React.CSSProperties = {
    color: isLight ? "#475569" : "#94a3b8",
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  return (
    <footer
      style={{
        borderTop: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
        background: isLight ? "#f4f3ef" : "#04060d",
        padding: "48px 0 36px",
        transition: "all 0.3s ease",
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "none",
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="Prerit Saini Logo"
                style={{
                  width: "82%",
                  height: "82%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", color: isLight ? "#0f172a" : "#fff", letterSpacing: "-0.02em" }}>
                PRERIT SAINI
              </div>
              <div style={{ fontSize: "0.75rem", color: isLight ? "#64748b" : "#8e8e93" }}>
                Flutter Software Engineer
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", fontSize: "0.85rem" }}>
            <a href="#projects" style={footerLink}>
              Highlights
            </a>
            <a href="#experience" style={footerLink}>
              Experience
            </a>
            <a href="#simulator" style={footerLink}>
              Simulator
            </a>
            <a href="#architecture" style={footerLink}>
              Architecture
            </a>
            <a href="#skills" style={footerLink}>
              Tools
            </a>
            <a href="#collaboration" style={footerLink}>
              Collaboration
            </a>
            <a href="#contact" style={footerLink}>
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.06)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.12)",
              color: isLight ? "#0f172a" : "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            borderTop: isLight ? "1px solid rgba(0, 0, 0, 0.06)" : "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "0.8rem",
            color: isLight ? "#64748b" : "#64748b",
          }}
        >
          <div>© {currentYear} Prerit Saini</div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="https://github.com/Preritsaini"
              target="_blank"
              rel="noreferrer"
              style={{ color: isLight ? "#475569" : "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = isLight ? "#0f172a" : "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#475569" : "#94a3b8")}
            >
              GitHub ↗
            </a>
            <span style={{ color: isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)" }}>•</span>
            <a
              href="https://www.linkedin.com/in/prerit-saini-3b99a62b0/?isSelfProfile=true"
              target="_blank"
              rel="noreferrer"
              style={{ color: isLight ? "#475569" : "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0284c7")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#475569" : "#94a3b8")}
            >
              LinkedIn ↗
            </a>
            <span style={{ color: isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)" }}>•</span>
            <a
              href="mailto:sainiprerit6@gmail.com"
              style={{ color: isLight ? "#475569" : "#94a3b8", textDecoration: "none", fontWeight: 600, transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ea580c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = isLight ? "#475569" : "#94a3b8")}
            >
              Email ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
