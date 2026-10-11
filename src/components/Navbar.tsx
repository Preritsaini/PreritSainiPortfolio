"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/audioSynth";
import { useTheme } from "../context/ThemeContext";
import {
  Mail,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  FileText,
  Smartphone,
  Layers,
  Film,
  Code2,
  ArrowUpRight,
  X,
} from "lucide-react";

interface NavbarProps {
  onTriggerHotReload?: () => void;
  isHotReloading?: boolean;
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerHotReload,
  isHotReloading,
  onOpenResume,
  onOpenContact,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    sound.play("tap");
    setIsMenuOpen((prev) => !prev);
  };

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const navigateTo = (anchor: string) => {
    sound.play("tap");
    setIsMenuOpen(false);
    const elem = document.querySelector(anchor);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isLight = theme === "light";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled 
            ? (isLight ? "rgba(252, 251, 250, 0.9)" : "rgba(5, 5, 5, 0.85)") 
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled 
            ? (isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.06)") 
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Left: Midu-Style Logo */}
        <a
          href="#hero"
          onClick={() => sound.play("tap")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            color: isLight ? "#0f172a" : "#ffffff",
          }}
        >
          {/* Clean logo emblem with no glow */}
          <div
            style={{
              position: "relative",
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: isLight ? "#111215" : "rgba(255, 255, 255, 0.05)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.15)",
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
          <span
            style={{
              fontSize: "1.35rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: isLight ? "#0f172a" : "#ffffff",
            }}
          >
            prerit
          </span>
        </a>

        {/* Center: Midu Floating Menu Pill */}
        <div style={{ position: "relative" }}>
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "9px 20px",
              background: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(18, 18, 22, 0.8)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "9999px",
              color: isLight ? "#0f172a" : "#ffffff",
              cursor: "pointer",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: isMenuOpen ? "0 0 20px rgba(255, 0, 34, 0.25)" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isLight ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {/* 4 dots icon (::) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 4px)",
                  gap: "3px",
                }}
              >
                <span style={{ width: 4, height: 4, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                <span style={{ width: 4, height: 4, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                <span style={{ width: 4, height: 4, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                <span style={{ width: 4, height: 4, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
              </div>
              <span style={{ fontWeight: 600, fontSize: "0.9rem", letterSpacing: "-0.01em" }}>
                Menu
              </span>
            </div>

            <span style={{ width: "1px", height: "14px", background: isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)" }} />

            {/* Status indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.82rem", color: isLight ? "#64748b" : "#94a3b8", fontWeight: 500 }}>
                Available for hire
              </span>
            </div>
          </button>
        </div>

        {/* Right: Theme & Sound Controls + White "Get in touch" Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Grouped Theme & Audio Glass Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "9999px",
              padding: "3px 4px",
              gap: "2px",
            }}
          >
            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                color: isLight ? "#d97706" : "#f59e0b",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Subtle separator */}
            <span
              style={{
                width: "1px",
                height: "14px",
                background: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.1)",
              }}
            />

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              style={{
                background: "transparent",
                border: "none",
                color: isMuted ? (isLight ? "#94a3b8" : "#64748b") : "#ff790c",
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
              aria-label={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>

          {/* White Midu Pill Button: Open Contact Drawer */}
          <button
            onClick={() => {
              sound.play("tap");
              if (onOpenContact) {
                onOpenContact();
              } else {
                window.location.href = "mailto:sainiprerit6@gmail.com";
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: isLight ? "#0f172a" : "#ffffff",
              color: isLight ? "#ffffff" : "#050505",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "9px 20px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: isLight ? "0 4px 18px rgba(15, 23, 42, 0.15)" : "0 4px 18px rgba(255, 255, 255, 0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Mail size={15} style={{ strokeWidth: 2.2 }} />
            <span>Get in touch</span>
          </button>
        </div>
      </header>

      {/* Floating Midu Dropdown Menu Card (Glitch-Free & Centered) */}
      {isMenuOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: isLight ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 1050,
              animation: "fadeIn 0.2s ease-out",
            }}
          />

          {/* Centered Wrapper: Eliminates transform clashes & visual glitches */}
          <div
            style={{
              position: "fixed",
              top: "76px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 1100,
              pointerEvents: "none",
            }}
          >
            {/* Floating Dropdown Card */}
            <div
              ref={menuRef}
              style={{
                pointerEvents: "auto",
                width: "400px",
                maxWidth: "calc(100vw - 32px)",
                background: isLight ? "rgba(255, 255, 255, 0.98)" : "rgba(18, 18, 22, 0.98)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "24px",
                padding: "20px 22px",
                boxShadow: isLight
                  ? "0 30px 80px rgba(0, 0, 0, 0.16), 0 0 25px rgba(255, 0, 34, 0.08)"
                  : "0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 0, 34, 0.15)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                animation: "menuEntrance 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "14px",
                  borderBottom: isLight ? "1px solid rgba(0, 0, 0, 0.07)" : "1px solid rgba(255, 255, 255, 0.08)",
                  marginBottom: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 3px)",
                      gap: "3px",
                    }}
                  >
                    <span style={{ width: 3, height: 3, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                    <span style={{ width: 3, height: 3, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                    <span style={{ width: 3, height: 3, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                    <span style={{ width: 3, height: 3, borderRadius: "1px", background: isLight ? "#0f172a" : "#ffffff" }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: isLight ? "#0f172a" : "#ffffff" }}>
                    Prerit
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "0.82rem", color: isLight ? "#059669" : "#34d399", fontWeight: 600 }}>
                      Available for hire
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      background: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.06)",
                      border: "none",
                      color: isLight ? "#64748b" : "#94a3b8",
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Only the 5 essential components */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {/* 1. Home */}
                <button
                  onClick={() => navigateTo("#hero")}
                  style={navCardButtonStyle(isLight)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                    Home
                  </span>
                  <div style={thumbnailBoxStyle(isLight)}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "8px",
                        background: isLight ? "#111215" : "rgba(255, 255, 255, 0.05)",
                        border: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        boxShadow: "none",
                      }}
                    >
                      <img
                        src="/logo.png"
                        alt="Home Logo"
                        style={{
                          width: "82%",
                          height: "82%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                </button>

                {/* 2. Highlights / Projects */}
                <button
                  onClick={() => navigateTo("#projects")}
                  style={navCardButtonStyle(isLight)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                    Highlights
                  </span>
                  <div style={thumbnailBoxStyle(isLight)}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #ff0022, #ff7d4e)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 15px rgba(255, 0, 34, 0.4)",
                      }}
                    >
                      <Smartphone size={17} color="#fff" />
                    </div>
                  </div>
                </button>

                {/* 3. Experience */}
                <button
                  onClick={() => navigateTo("#experience")}
                  style={navCardButtonStyle(isLight)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                    Experience
                  </span>
                  <div style={thumbnailBoxStyle(isLight)}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
                      }}
                    >
                      <Layers size={17} color="#fff" />
                    </div>
                  </div>
                </button>

                {/* 4. Curriculum Vitae */}
                <button
                  onClick={() => {
                    sound.play("tap");
                    setIsMenuOpen(false);
                    if (onOpenResume) {
                      onOpenResume();
                    } else {
                      navigateTo("#resume-download");
                    }
                  }}
                  style={navCardButtonStyle(isLight)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                    Curriculum Vitae
                  </span>
                  <div style={thumbnailBoxStyle(isLight)}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #00e5ff, #02569b)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 15px rgba(0, 229, 255, 0.35)",
                      }}
                    >
                      <FileText size={17} color="#fff" />
                    </div>
                  </div>
                </button>

                {/* 5. Get in Touch */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    sound.play("tap");
                    if (onOpenContact) {
                      onOpenContact();
                    } else {
                      navigateTo("#contact");
                    }
                  }}
                  style={navCardButtonStyle(isLight)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: isLight ? "#0f172a" : "#ffffff" }}>
                    Get in touch
                  </span>
                  <div style={thumbnailBoxStyle(isLight)}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "8px",
                        background: isLight ? "#0f172a" : "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Mail size={16} color={isLight ? "#ffffff" : "#050505"} />
                    </div>
                  </div>
                </button>
              </div>

              {/* Social Media Section */}
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "14px",
                  borderTop: isLight ? "1px solid rgba(0, 0, 0, 0.07)" : "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.76rem",
                    color: isLight ? "#64748b" : "#64748b",
                    textTransform: "capitalize",
                    marginBottom: "8px",
                    fontWeight: 500,
                  }}
                >
                  Social media
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <a
                    href="https://github.com/Preritsaini"
                    target="_blank"
                    rel="noreferrer"
                    style={socialLinkStyle(isLight)}
                    onClick={() => sound.play("tap")}
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/prerit-saini-3b99a62b0/?isSelfProfile=true"
                    target="_blank"
                    rel="noreferrer"
                    style={socialLinkStyle(isLight)}
                    onClick={() => sound.play("tap")}
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href="mailto:sainiprerit6@gmail.com"
                    style={socialLinkStyle(isLight)}
                    onClick={() => sound.play("tap")}
                  >
                    <span>sainiprerit6@gmail.com</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href="tel:+919105023038"
                    style={socialLinkStyle(isLight)}
                    onClick={() => sound.play("tap")}
                  >
                    <span>+91 9105023038</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const navCardButtonStyle = (isLight: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "10px 12px",
  borderRadius: "12px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
});

const thumbnailBoxStyle = (isLight: boolean): React.CSSProperties => ({
  width: "44px",
  height: "44px",
  borderRadius: "10px",
  background: isLight ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.04)",
  border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const socialLinkStyle = (isLight: boolean): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: isLight ? "#475569" : "#cbd5e1",
  textDecoration: "none",
  fontSize: "0.86rem",
  fontWeight: 500,
  padding: "4px 0",
  transition: "color 0.2s ease",
});
