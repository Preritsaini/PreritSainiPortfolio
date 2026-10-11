"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PROJECTS, Project } from "../data/portfolioData";
import { GithubIcon } from "./Icons";
import { useTheme } from "../context/ThemeContext";
import { sound } from "../utils/audioSynth";
import { FighterJetSvg } from "./FighterJetSvg";
import {
  Layers,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Smartphone,
  Sparkles,
  X,
  Code2,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Play,
  Pause,
  Zap,
  Gamepad2,
  Wallet,
  Fingerprint,
  RotateCcw,
  Sliders,
  Eye,
  EyeOff,
  Flame,
  Volume2,
  Bookmark,
  CreditCard,
  LineChart,
} from "lucide-react";

// ============================================================================
// 1. READHUB (ILLUSTRATED STORYBOOK & AUDIOBOOK) VISUAL UI PREVIEW
// ============================================================================
const ReadHubVisualPreview: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "sepia" | "cream" | "cyber">("dark");
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [audioProgress, setAudioProgress] = useState(32);

  // Sync sentence highlighting with audio narration (60 FPS sentence offset simulation)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHighlightIdx((prev) => (prev + 1) % 3);
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 2.5));
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const themeConfig = {
    dark: {
      bg: "#0a0f1d",
      text: "#f1f5f9",
      textMuted: "#94a3b8",
      accent: "#ff790c",
      border: "rgba(255, 121, 12, 0.25)",
      quoteBg: "rgba(255, 121, 12, 0.08)",
      dockBg: "rgba(10, 15, 29, 0.92)",
    },
    sepia: {
      bg: "#201a15",
      text: "#f5e6d3",
      textMuted: "#bcaaa4",
      accent: "#f59e0b",
      border: "rgba(245, 158, 11, 0.3)",
      quoteBg: "rgba(245, 158, 11, 0.1)",
      dockBg: "rgba(32, 26, 21, 0.92)",
    },
    cream: {
      bg: "#fbf6ec",
      text: "#292524",
      textMuted: "#78716c",
      accent: "#c2410c",
      border: "rgba(194, 65, 12, 0.25)",
      quoteBg: "rgba(194, 65, 12, 0.08)",
      dockBg: "rgba(251, 246, 236, 0.94)",
    },
    cyber: {
      bg: "#050f24",
      text: "#e0f2fe",
      textMuted: "#7dd3fc",
      accent: "#38bdf8",
      border: "rgba(56, 189, 248, 0.3)",
      quoteBg: "rgba(56, 189, 248, 0.1)",
      dockBg: "rgba(5, 15, 36, 0.92)",
    },
  };

  const currentTheme = themeConfig[theme];

  const storySentences = [
    "Beyond the whispering pines of Eldoria, where velvet skies brush the astral sea, a solitary lighthouse cast its warm amber beam into the stardust deep.",
    "Lumi, the clockwork starlight fox, turned its glowing cyan eyes toward the crescent moon and chirped softly as golden sparks leapt from its brass paws.",
    "“The star currents are turning northward tonight,” young Julian whispered. “The lost library of the Sky Architects is calling across the nebulae.”",
  ];

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: currentTheme.bg,
        border: `1px solid ${currentTheme.border}`,
        boxShadow: "0 14px 34px rgba(0, 0, 0, 0.6), inset 0 0 2px rgba(255, 255, 255, 0.15)",
        transition: "background 0.3s ease, border 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "295px",
        position: "relative",
      }}
    >
      {/* Top App Bar */}
      <div
        style={{
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src="/books/cover.jpg"
            alt="Cover"
            style={{
              width: "20px",
              height: "26px",
              borderRadius: "3px",
              objectFit: "cover",
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            }}
          />
          <div>
            <div style={{ fontSize: "0.76rem", fontWeight: 800, color: currentTheme.text, lineHeight: 1.1 }}>
              The Starlight Voyager
            </div>
            <div style={{ fontSize: "0.6rem", color: currentTheme.accent, fontWeight: 600 }}>
              by Prerit Saini • Illustrated Edition
            </div>
          </div>
        </div>

        {/* Theme Toggles & Bookmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          {(["dark", "sepia", "cream", "cyber"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                sound.play("tap");
                setTheme(t);
              }}
              style={{
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "0.58rem",
                fontWeight: 700,
                textTransform: "capitalize",
                background: theme === t ? currentTheme.accent : "rgba(120, 120, 120, 0.15)",
                color: theme === t ? "#030712" : currentTheme.textMuted,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => {
              sound.play(isBookmarked ? "tap" : "coin");
              setIsBookmarked(!isBookmarked);
            }}
            style={{
              background: "transparent",
              border: "none",
              color: isBookmarked ? currentTheme.accent : currentTheme.textMuted,
              cursor: "pointer",
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Chapter"}
          >
            <Bookmark size={13} fill={isBookmarked ? currentTheme.accent : "none"} />
          </button>
        </div>
      </div>

      {/* Reader Body Canvas: Split Layout with Illustration and Story Text */}
      <div
        style={{
          flex: 1,
          padding: "10px 14px",
          color: currentTheme.text,
          fontSize: `${fontSize}px`,
          lineHeight: 1.5,
          overflowY: "hidden",
          position: "relative",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          fontFamily: "Georgia, Cambria, serif",
        }}
      >
        {/* Book Photo / Illustration Thumbnail Banner */}
        <div
          style={{
            width: "96px",
            height: "100%",
            borderRadius: "8px",
            overflow: "hidden",
            border: `1px solid ${currentTheme.border}`,
            flexShrink: 0,
            position: "relative",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src="/books/chapter1.jpg"
            alt="Chapter 1 Beacon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0,0,0,0.75)",
              color: "#fff",
              fontSize: "0.52rem",
              padding: "2px 4px",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Ch. 1 Spire
          </div>
        </div>

        {/* Story Sentences with Audio Highlight */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          <div
            style={{
              fontSize: "0.62rem",
              color: currentTheme.accent,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-sans)",
            }}
          >
            CHAPTER I • THE SPIRE ON THE ASTRAL SEA
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {storySentences.map((sentence, idx) => {
              const isHighlight = isPlaying && highlightIdx === idx;
              return (
                <div
                  key={`card-sentence-${idx}`}
                  style={{
                    fontSize: "0.72rem",
                    padding: "3px 6px",
                    borderRadius: "4px",
                    background: isHighlight ? `${currentTheme.accent}22` : "transparent",
                    borderLeft: isHighlight ? `3px solid ${currentTheme.accent}` : "3px solid transparent",
                    color: isHighlight ? currentTheme.accent : currentTheme.text,
                    transition: "all 0.3s ease",
                    lineHeight: 1.4,
                  }}
                >
                  {sentence}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Docked Audio Narration Bar at bottom */}
      <div
        style={{
          padding: "6px 12px 8px",
          background: currentTheme.dockBg,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {/* Scrubber */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.58rem", color: currentTheme.textMuted }}>
          <span>01:14</span>
          <div
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background: "rgba(120, 120, 120, 0.25)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${audioProgress}%`,
                height: "100%",
                borderRadius: "2px",
                background: currentTheme.accent,
                transition: "width 0.2s ease",
              }}
            />
          </div>
          <span>03:42</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => {
                sound.play(isPlaying ? "tap" : "coin");
                setIsPlaying(!isPlaying);
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: currentTheme.accent,
                color: "#030712",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: `0 2px 10px ${currentTheme.accent}66`,
              }}
              title={isPlaying ? "Pause Narration" : "Play Narration"}
            >
              {isPlaying ? <Pause size={12} fill="#030712" /> : <Play size={12} fill="#030712" style={{ marginLeft: "1px" }} />}
            </button>
            <div>
              <div style={{ fontSize: "0.68rem", fontWeight: 800, color: currentTheme.text }}>
                AWS S3 Narration Stream
              </div>
              <div style={{ fontSize: "0.58rem", color: currentTheme.accent, fontWeight: 600 }}>
                {isPlaying ? "🎙️ Playing • Voice: Aura (Studio Master)" : "Paused • Click Play"}
              </div>
            </div>
          </div>

          {/* Dynamic Equalizer Bars */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "14px" }}>
            {[10, 14, 8, 13, 9, 14, 7, 12].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "2px",
                  height: isPlaying ? `${h}px` : "3px",
                  background: currentTheme.accent,
                  borderRadius: "1px",
                  transition: "height 0.2s ease",
                }}
              />
            ))}
          </div>

          {/* Font Scaler */}
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            <button
              onClick={() => setFontSize((s) => Math.max(11, s - 1))}
              style={{
                padding: "2px 5px",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: currentTheme.textMuted,
                fontSize: "0.62rem",
                cursor: "pointer",
              }}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize((s) => Math.min(15, s + 1))}
              style={{
                padding: "2px 5px",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: currentTheme.textMuted,
                fontSize: "0.62rem",
                cursor: "pointer",
              }}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. STELLAR JET (FLAME ENGINE) VISUAL UI PREVIEW (MATCHES SCREENSHOTS 1 & 2)
// ============================================================================
const StellarJetVisualPreview: React.FC = () => {
  const [viewMode, setViewMode] = useState<"combat" | "menu">("combat");
  const [score, setScore] = useState(1450);
  const [coins, setCoins] = useState(24);
  const [jetX, setJetX] = useState(0);
  const [lasers, setLasers] = useState<Array<{ id: number; leftX: number; rightX: number; bottom: number }>>([]);
  const [enemies, setEnemies] = useState<Array<{ id: number; x: number; bottom: number; hp: number; speed: number }>>([
    { id: 1, x: -30, bottom: 210, hp: 1, speed: 2.2 },
    { id: 2, x: 35, bottom: 160, hp: 1, speed: 2.5 },
  ]);
  const [explosions, setExplosions] = useState<Array<{ id: string; x: number; bottom: number; text: string; createdAt: number }>>([]);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const flightStageRef = useRef<HTMLDivElement>(null);

  // Fire twin plasma bolts
  const fireTwinLasers = () => {
    sound.play("coin");
    const newLaser = {
      id: Date.now() + Math.random(),
      leftX: jetX - 11,
      rightX: jetX + 11,
      bottom: 58,
    };
    setLasers((prev) => [...prev.slice(-6), newLaser]);
    setScore((s) => s + 20);
  };

  // Continuous autofire while holding or dragging pointer
  useEffect(() => {
    if (!isPointerDown || viewMode !== "combat") return;
    const interval = setInterval(() => {
      fireTwinLasers();
    }, 160);
    return () => clearInterval(interval);
  }, [isPointerDown, viewMode, jetX]);

  // Active Flame Game Loop (30 FPS ticker for laser flight, enemy march, collision detection)
  useEffect(() => {
    if (viewMode !== "combat") return;

    let tick = 0;
    const loop = setInterval(() => {
      tick += 1;

      // 1. Advance lasers upward
      setLasers((prevLasers) =>
        prevLasers
          .map((l) => ({ ...l, bottom: l.bottom + 20 }))
          .filter((l) => l.bottom < 320)
      );

      // 2. Advance enemies downward
      setEnemies((prevEnemies) => {
        const updated = prevEnemies
          .map((e) => ({ ...e, bottom: e.bottom - e.speed }))
          .filter((e) => e.bottom > 20);

        if (tick % 45 === 0 && updated.length < 3) {
          const randX = Math.floor(Math.random() * 90) - 45;
          updated.push({
            id: Date.now() + Math.random(),
            x: randX,
            bottom: 240,
            hp: 1,
            speed: 2.0 + Math.random() * 1.2,
          });
        }
        return updated;
      });

      // 3. Collision detection: lasers vs enemies
      setLasers((currLasers) => {
        const remainingLasers = [...currLasers];

        setEnemies((currEnemies) => {
          const remainingEnemies: typeof currEnemies = [];

          currEnemies.forEach((enemy) => {
            const hitIndex = remainingLasers.findIndex(
              (l) =>
                Math.abs(l.bottom - enemy.bottom) < 24 &&
                (Math.abs(l.leftX - enemy.x) < 22 || Math.abs(l.rightX - enemy.x) < 22)
            );

            if (hitIndex !== -1) {
              remainingLasers.splice(hitIndex, 1);
              sound.play("reload");
              setScore((s) => s + 100);
              setCoins((c) => c + 1);

              const uniqueExpId = `card-exp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
              setExplosions((exps) => [
                ...exps.slice(-2),
                { id: uniqueExpId, x: enemy.x, bottom: enemy.bottom, text: "+100 💥", createdAt: Date.now() },
              ]);
            } else {
              remainingEnemies.push(enemy);
            }
          });

          return remainingEnemies;
        });

        return remainingLasers;
      });

      // Clear explosions after 500ms
      setExplosions((exps) => exps.filter((e) => Date.now() - e.createdAt < 500));
    }, 35);

    return () => clearInterval(loop);
  }, [viewMode]);

  // Pointer / Touch drag coordinator
  const updateJetFromPointerX = (clientX: number) => {
    if (!flightStageRef.current) return;
    const rect = flightStageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relX = clientX - centerX;
    const maxClamp = Math.min(rect.width / 2 - 28, 65);
    setJetX(Math.max(-maxClamp, Math.min(maxClamp, relX)));
  };

  const handleSteer = (direction: "left" | "right") => {
    sound.play("tap");
    setJetX((x) => (direction === "left" ? Math.max(-65, x - 22) : Math.min(65, x + 22)));
  };

  // Keyboard controls
  useEffect(() => {
    if (viewMode !== "combat") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        setJetX((x) => Math.max(-65, x - 22));
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        setJetX((x) => Math.min(65, x + 22));
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        fireTwinLasers();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, jetX]);

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#060814",
        border: "1px solid rgba(56, 189, 248, 0.35)",
        boxShadow: "0 14px 34px rgba(0, 0, 0, 0.6), 0 0 16px rgba(56, 189, 248, 0.15)",
        display: "flex",
        flexDirection: "column",
        height: "285px",
        position: "relative",
      }}
    >
      {/* 2A. COMBAT VIEW (MATCHING USER SCREENSHOT 2) */}
      {viewMode === "combat" ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Top Game HUD (Screenshot 2: Score on top of mint green bar, Coins on top of LVL 1) */}
          <div
            style={{
              padding: "10px 14px 6px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              background: "rgba(0, 0, 0, 0.65)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              zIndex: 20,
            }}
          >
            {/* Left: Score text on top, mint green health bar directly underneath */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-start" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.03em",
                }}
              >
                Score : {score}
              </span>
              <div
                style={{
                  width: 76,
                  height: 12,
                  borderRadius: "1px",
                  background: "#6ee7b7", // Mint green health bar from Screenshot 2
                  boxShadow: "0 0 10px rgba(110, 231, 183, 0.7)",
                }}
              />
            </div>

            {/* Right: Coins in yellow on top, LVL 1 in cyan directly underneath */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", alignItems: "flex-end" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  color: "#facc15",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.03em",
                }}
              >
                Coins : {coins}
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  color: "#38bdf8",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                }}
              >
                LVL 1
              </span>
            </div>
          </div>

          {/* Deep Space Starfield & Interactive Flight Stage with Click & Swipe */}
          <div
            ref={flightStageRef}
            onPointerDown={(e) => {
              setIsPointerDown(true);
              updateJetFromPointerX(e.clientX);
              fireTwinLasers();
            }}
            onPointerMove={(e) => {
              if (isPointerDown) {
                updateJetFromPointerX(e.clientX);
              }
            }}
            onPointerUp={() => setIsPointerDown(false)}
            onPointerLeave={() => setIsPointerDown(false)}
            onTouchStart={(e) => {
              setIsPointerDown(true);
              if (e.touches[0]) {
                updateJetFromPointerX(e.touches[0].clientX);
                fireTwinLasers();
              }
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                updateJetFromPointerX(e.touches[0].clientX);
              }
            }}
            onTouchEnd={() => setIsPointerDown(false)}
            onClick={(e) => {
              updateJetFromPointerX(e.clientX);
              fireTwinLasers();
            }}
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "18px",
              overflow: "hidden",
              cursor: "crosshair",
              userSelect: "none",
              touchAction: "none",
            }}
          >
            {/* Deep Space Infinite Streaming Parallax Starfields */}
            <div
              style={{
                position: "absolute",
                inset: "-400px 0 0 0",
                backgroundImage: `radial-gradient(1.5px 1.5px at 25px 35px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 110px 140px, #38bdf8, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 200px 75px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 170px 220px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 270px 290px, #38bdf8, rgba(0,0,0,0))`,
                backgroundRepeat: "repeat",
                backgroundSize: "280px 400px",
                animation: "starfieldScroll 2.8s linear infinite",
                opacity: 0.9,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "-500px 0 0 0",
                backgroundImage: `radial-gradient(1px 1px at 45px 55px, #e0f2fe, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 180px 190px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 260px 120px, #38bdf8, rgba(0,0,0,0))`,
                backgroundRepeat: "repeat",
                backgroundSize: "220px 500px",
                animation: "starfieldScrollFast 1.6s linear infinite",
                opacity: 0.7,
                pointerEvents: "none",
              }}
            />

            {/* Swipe Guidance Pill */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "2px 10px",
                borderRadius: "9999px",
                background: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                color: "#38bdf8",
                fontSize: "0.6rem",
                fontWeight: 700,
                pointerEvents: "none",
                zIndex: 10,
                whiteSpace: "nowrap",
              }}
            >
              👆 Click &amp; Swipe to Steer &amp; Fire!
            </div>

            {/* Enemy Drones Descending Downward */}
            {enemies.map((enemy, idx) => (
              <div
                key={`card-enemy-${enemy.id}-${idx}`}
                style={{
                  position: "absolute",
                  bottom: `${enemy.bottom}px`,
                  left: `calc(50% + ${enemy.x}px)`,
                  transform: "translateX(-50%)",
                  zIndex: 16,
                  filter: "drop-shadow(0 0 8px rgba(244, 63, 94, 0.8))",
                  pointerEvents: "none",
                }}
              >
                <svg width="26" height="22" viewBox="0 0 28 24" fill="none">
                  <path d="M14 22 L2 6 L8 2 L14 8 L20 2 L26 6 Z" fill="#e11d48" stroke="#f43f5e" strokeWidth="1.2" />
                  <circle cx="14" cy="11" r="3.5" fill="#fecdd3" />
                  <circle cx="6" cy="7" r="1.5" fill="#38bdf8" />
                  <circle cx="22" cy="7" r="1.5" fill="#38bdf8" />
                </svg>
              </div>
            ))}

            {/* Floating Explosion Popups */}
            {explosions.map((exp, idx) => (
              <div
                key={`card-exp-${exp.id}-${idx}`}
                style={{
                  position: "absolute",
                  bottom: `${exp.bottom}px`,
                  left: `calc(50% + ${exp.x}px)`,
                  transform: "translateX(-50%)",
                  color: "#facc15",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  textShadow: "0 0 10px #f59e0b, 0 0 20px #ef4444",
                  animation: "flashPulse 0.4s ease-out",
                  pointerEvents: "none",
                  zIndex: 25,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {exp.text}
              </div>
            ))}

            {/* Dynamically Fired Twin Cyan Plasma Projectiles Flying Upward */}
            {lasers.map((l, idx) => (
              <React.Fragment key={`card-laser-${l.id}-${idx}`}>
                <div
                  style={{
                    position: "absolute",
                    bottom: `${l.bottom}px`,
                    left: `calc(50% + ${l.leftX}px)`,
                    width: "4px",
                    height: "22px",
                    borderRadius: "2px",
                    background: "linear-gradient(180deg, #ffffff 0%, #00e5ff 100%)",
                    boxShadow: "0 0 14px #00e5ff, 0 0 28px #38bdf8",
                    transform: "translateX(-50%)",
                    zIndex: 15,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: `${l.bottom}px`,
                    left: `calc(50% + ${l.rightX}px)`,
                    width: "4px",
                    height: "22px",
                    borderRadius: "2px",
                    background: "linear-gradient(180deg, #ffffff 0%, #00e5ff 100%)",
                    boxShadow: "0 0 14px #00e5ff, 0 0 28px #38bdf8",
                    transform: "translateX(-50%)",
                    zIndex: 15,
                    pointerEvents: "none",
                  }}
                />
              </React.Fragment>
            ))}

            {/* Authentic Combat Fighter Jet (Screenshot 2) */}
            <div
              style={{
                transform: `translateX(${jetX}px)`,
                transition: isPointerDown ? "none" : "transform 0.12s ease-out",
                zIndex: 18,
                pointerEvents: "none",
              }}
            >
              <FighterJetSvg width={46} height={52} />
            </div>
          </div>

          {/* Action Controls Bar */}
          <div
            style={{
              padding: "7px 12px",
              background: "rgba(0, 0, 0, 0.75)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => {
                sound.play("tap");
                setViewMode("menu");
              }}
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#94a3b8",
                fontSize: "0.68rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ‹ Menu
            </button>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => handleSteer("left")}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                ◀
              </button>
              <button
                onClick={() => handleSteer("right")}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                ▶
              </button>
            </div>

            <button
              onClick={fireTwinLasers}
              className="midu-btn-primary"
              style={{
                padding: "5px 14px",
                fontSize: "0.72rem",
                fontWeight: 900,
                background: "linear-gradient(180deg, #00e5ff 0%, #00b0ff 100%)",
                color: "#050505",
              }}
            >
              🔥 FIRE
            </button>
          </div>
        </div>
      ) : (
        /* 2B. TITLE MENU SCREEN (MATCHING USER SCREENSHOT 1) */
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background: "radial-gradient(ellipse at 50% 30%, #171b3e 0%, #060814 80%)",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Glowing STELLAR JET Title */}
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "1.45rem",
                fontWeight: 900,
                letterSpacing: "0.18em",
                color: "#ffffff",
                textShadow: "0 0 10px #38bdf8, 0 0 25px #00e5ff",
                lineHeight: 1.15,
              }}
            >
              STELLAR
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 900,
                letterSpacing: "0.22em",
                color: "#00e5ff",
                textShadow: "0 0 12px #38bdf8, 0 0 30px #00e5ff",
                lineHeight: 1.1,
              }}
            >
              JET
            </div>
          </div>

          {/* Gold Coin Pill ($ 0) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "9999px",
              background: "rgba(22, 24, 44, 0.95)",
              border: "1.5px solid #eab308",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "0.85rem",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#eab308",
                color: "#1e1b4b",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.68rem",
                fontWeight: 900,
              }}
            >
              $
            </span>
            <span style={{ fontFamily: "var(--font-mono)" }}>{coins}</span>
          </div>

          {/* Signed in email */}
          <div style={{ fontSize: "0.58rem", color: "#4ade80", fontWeight: 600, marginBottom: "8px" }}>
            Signed in as prasunkushwaha25@gmail.com
          </div>

          {/* Callsign: LuciLu */}
          <div
            style={{
              padding: "5px 16px",
              borderRadius: "8px",
              background: "rgba(24, 28, 48, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.82rem",
              marginBottom: "10px",
            }}
          >
            LuciLu
          </div>

          {/* Glowing ENGAGE Button */}
          <button
            onClick={() => {
              sound.play("reload");
              setViewMode("combat");
            }}
            style={{
              width: "160px",
              padding: "10px 18px",
              borderRadius: "9999px",
              background: "linear-gradient(180deg, #38bdf8 0%, #00b0ff 100%)",
              color: "#050505",
              fontWeight: 900,
              fontSize: "0.88rem",
              letterSpacing: "0.14em",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(0, 176, 255, 0.8)",
              marginBottom: "10px",
            }}
          >
            ENGAGE
          </button>

          {/* Secondary Action Pills */}
          <div style={{ display: "flex", gap: "6px" }}>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "9999px",
                border: "1px solid #38bdf8",
                color: "#fff",
                fontSize: "0.62rem",
                fontWeight: 700,
              }}
            >
              🚀 HANGAR
            </span>
            <span
              style={{
                padding: "3px 8px",
                borderRadius: "9999px",
                border: "1px solid #f59e0b",
                color: "#fff",
                fontSize: "0.62rem",
                fontWeight: 700,
              }}
            >
              📊 LEADERBOARD
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. FINPULSE (FINTECH & WEB3) VISUAL UI PREVIEW (REDESIGNED LUXURY NEOBANK)
// ============================================================================
const FinPulseVisualPreview: React.FC = () => {
  const [asset, setAsset] = useState<"BTC" | "ETH" | "SOL" | "USDC">("BTC");
  const [balance, setBalance] = useState(52840.5);
  const [isFaceId, setIsFaceId] = useState(false);
  const [activeTab, setActiveTab] = useState<"chart" | "card">("chart");
  const [scrubX, setScrubX] = useState<number | null>(null);

  const assetInfo = {
    BTC: {
      price: "$67,420.00",
      change: "+4.8%",
      path: "M0,38 Q30,12 60,28 T120,8 T180,24 T240,6",
      fill: "M0,38 Q30,12 60,28 T120,8 T180,24 T240,6 L240,50 L0,50 Z",
    },
    ETH: {
      price: "$3,540.20",
      change: "+2.6%",
      path: "M0,42 Q35,22 70,32 T130,14 T190,26 T240,10",
      fill: "M0,42 Q35,22 70,32 T130,14 T190,26 T240,10 L240,50 L0,50 Z",
    },
    SOL: {
      price: "$176.85",
      change: "+8.4%",
      path: "M0,45 Q25,18 55,28 T115,6 T175,18 T240,4",
      fill: "M0,45 Q25,18 55,28 T115,6 T175,18 T240,4 L240,50 L0,50 Z",
    },
    USDC: {
      price: "$1.0002",
      change: "+0.01%",
      path: "M0,25 Q40,24 80,26 T160,25 T240,25",
      fill: "M0,25 Q40,24 80,26 T160,25 T240,25 L240,50 L0,50 Z",
    },
  };

  const handleSimulateTrade = () => {
    sound.play("biometric");
    setIsFaceId(true);
    setTimeout(() => {
      sound.play("coin");
      setIsFaceId(false);
      setBalance((b) => b + 1250);
    }, 850);
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#070b14",
        border: "1px solid rgba(255, 121, 12, 0.25)",
        boxShadow: "0 14px 34px rgba(0, 0, 0, 0.6), inset 0 0 2px rgba(255, 255, 255, 0.15)",
        display: "flex",
        flexDirection: "column",
        height: "285px",
        position: "relative",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0, 0, 0, 0.35)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Wallet size={14} color="#ff790c" />
          <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#fff" }}>
            FinPulse Private Client
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={() => {
              sound.play("tap");
              setActiveTab(activeTab === "chart" ? "card" : "chart");
            }}
            style={{
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#38bdf8",
              fontSize: "0.62rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {activeTab === "chart" ? "Show Metal Card" : "Show Chart"}
          </button>
          <span
            style={{
              fontSize: "0.62rem",
              padding: "2px 6px",
              borderRadius: "4px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              fontWeight: 700,
            }}
          >
            🔒 Enclave Active
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {activeTab === "chart" ? (
          <>
            {/* Balance Overview */}
            <div
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(255, 121, 12, 0.15), rgba(15, 23, 42, 0.7))",
                border: "1px solid rgba(255, 121, 12, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: "0.6rem", color: "#94a3b8", textTransform: "uppercase" }}>
                  Total Portfolio (Riverpod 2.0)
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fff", marginTop: "2px" }}>
                  ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>
                +$3,412.50 (+6.8%)
              </div>
            </div>

            {/* Asset Switcher Chips & Price */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {(["BTC", "ETH", "SOL", "USDC"] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      sound.play("tap");
                      setAsset(a);
                    }}
                    style={{
                      padding: "3px 7px",
                      borderRadius: "6px",
                      fontSize: "0.66rem",
                      fontWeight: 700,
                      background: asset === a ? "#ff790c" : "rgba(255, 255, 255, 0.06)",
                      color: asset === a ? "#000" : "#94a3b8",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#fff" }}>
                {assetInfo[asset].price}{" "}
                <span style={{ color: "#10b981", fontSize: "0.65rem" }}>{assetInfo[asset].change}</span>
              </div>
            </div>

            {/* Hardware-Accelerated Interactive Bézier Sparkline */}
            <div
              style={{ height: "54px", position: "relative", cursor: "crosshair" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setScrubX(e.clientX - rect.left);
              }}
              onMouseLeave={() => setScrubX(null)}
            >
              <svg viewBox="0 0 240 50" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff790c" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff790c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path d={assetInfo[asset].fill} fill="url(#chartGradient)" />
                {/* Curve Line */}
                <path
                  d={assetInfo[asset].path}
                  fill="none"
                  stroke="#ff790c"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </>
        ) : (
          /* Luxury Metal Card View */
          <div
            style={{
              padding: "16px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #030712 100%)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "128px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 900, color: "#f8fafc", letterSpacing: "0.1em" }}>
                FINPULSE METAL
              </span>
              <span style={{ fontSize: "0.68rem", color: "#f59e0b", fontWeight: 800 }}>PLATINUM</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: 28,
                  height: 20,
                  borderRadius: "4px",
                  background: "#f59e0b",
                  border: "1px solid #d97706",
                }}
              />
              <span style={{ fontSize: "0.85rem", color: "#cbd5e1", fontFamily: "var(--font-mono)", letterSpacing: "0.15em" }}>
                4532 •••• •••• 8492
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: "0.55rem", color: "#64748b" }}>CARDHOLDER</div>
                <div style={{ fontSize: "0.72rem", color: "#fff", fontWeight: 700 }}>PRERIT SAINI</div>
              </div>
              <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#fff" }}>VISA INFINITE</div>
            </div>
          </div>
        )}
      </div>

      {/* FaceID Biometric Scan Overlay Animation */}
      {isFaceId && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(7, 11, 20, 0.9)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            zIndex: 30,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "14px",
              border: "2px solid #10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
              animation: "flashPulse 0.5s infinite",
            }}
          >
            <Fingerprint size={28} color="#10b981" />
          </div>
          <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700 }}>
            Scanning FaceID Secure Enclave...
          </span>
        </div>
      )}

      {/* Bottom Biometric Action Bar */}
      <div
        style={{
          padding: "8px 14px",
          background: "rgba(0, 0, 0, 0.55)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.68rem", color: "#94a3b8" }}>
          <Fingerprint size={13} color="#10b981" />
          <span>{isFaceId ? "Authorizing FaceID..." : "FaceID 1-Tap Ready"}</span>
        </div>
        <button
          onClick={handleSimulateTrade}
          disabled={isFaceId}
          className="midu-btn-primary"
          style={{
            padding: "5px 14px",
            fontSize: "0.75rem",
            fontWeight: 800,
          }}
        >
          {isFaceId ? "Scanning..." : "Swap 0.5 ETH"}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PROJECTS SECTION COMPONENT (SUPPORTS LIGHT & DARK THEMES)
// ============================================================================
export const ProjectsSection: React.FC = () => {
  const { theme: siteTheme } = useTheme();
  const isLight = siteTheme === "light";

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["All", "Mobile App", "Game Engine", "Fintech & Web3"];

  // Focus on the top 3 flagship projects + any others
  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS.slice(0, 3)
      : PROJECTS.filter((p) => p.category === selectedCategory).slice(0, 3);

  return (
    <section
      id="projects"
      className="section"
      style={{
        background: isLight ? "var(--bg-secondary, #f8fafc)" : "rgba(10, 14, 26, 0.6)",
        transition: "background 0.3s ease",
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <Layers size={14} />
            <span>Featured Mobile Work • 3 Production Projects</span>
          </div>
          <h2
            className="midu-hero-title"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              marginBottom: "16px",
              color: isLight ? "#0f172a" : "#ffffff",
            }}
          >
            Featured <span className="serif-italic" style={{ color: isLight ? "#ff790c" : "#ffffff" }}>projects</span> &amp;{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>live systems</span>.
          </h2>
          <p
            className="section-subtitle"
            style={{
              margin: "0 auto",
              fontSize: "1.1rem",
              color: isLight ? "#475569" : "#94a3b8",
              maxWidth: "650px",
            }}
          >
            Experience the real interactive UIs below. Built with Clean Architecture, reactive state
            machines, and hardware-accelerated 120 FPS pipelines.
          </p>

          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: "24px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.play("tap");
                  setSelectedCategory(cat);
                }}
                style={{
                  padding: "7px 18px",
                  borderRadius: "9999px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  background:
                    selectedCategory === cat
                      ? "#ff790c"
                      : isLight
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(255, 255, 255, 0.04)",
                  color:
                    selectedCategory === cat
                      ? "#050505"
                      : isLight
                      ? "#334155"
                      : "#94a3b8",
                  border: `1px solid ${
                    selectedCategory === cat
                      ? "#ff790c"
                      : isLight
                      ? "rgba(0, 0, 0, 0.1)"
                      : "rgba(255, 255, 255, 0.08)"
                  }`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Featured Projects Showcase Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "28px",
          }}
        >
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                className="glass-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  padding: "24px",
                  position: "relative",
                  borderRadius: "24px",
                  border: isLight
                    ? "1px solid rgba(0, 0, 0, 0.08)"
                    : "1px solid rgba(255, 121, 12, 0.2)",
                  background: isLight ? "#ffffff" : "rgba(13, 17, 30, 0.75)",
                  boxShadow: isLight
                    ? "0 10px 30px rgba(0, 0, 0, 0.06)"
                    : "0 20px 50px rgba(0, 0, 0, 0.6)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* 1. VISUAL INTERACTIVE UI PREVIEW (NOT JUST TEXT!) */}
                <div style={{ marginBottom: "20px" }}>
                  {project.id === "readhub" && <ReadHubVisualPreview />}
                  {project.id === "cyberrunner" && <StellarJetVisualPreview />}
                  {project.id === "finpulse" && <FinPulseVisualPreview />}
                  {project.id !== "readhub" &&
                    project.id !== "cyberrunner" &&
                    project.id !== "finpulse" && <ReadHubVisualPreview />}
                </div>

                {/* 2. Badge & Category Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "rgba(255, 121, 12, 0.15)",
                      color: "#ff790c",
                      border: "1px solid rgba(255, 121, 12, 0.3)",
                    }}
                  >
                    {project.badge}
                  </span>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: isLight ? "#64748b" : "#94a3b8",
                      fontWeight: 600,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* 3. Title & Subtitle */}
                <h3
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    color: isLight ? "#0f172a" : "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "#38bdf8",
                    fontWeight: 500,
                    marginBottom: "14px",
                    lineHeight: 1.4,
                  }}
                >
                  {project.subtitle}
                </p>

                {/* 4. Project Summary */}
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: isLight ? "#475569" : "#94a3b8",
                    lineHeight: 1.6,
                    marginBottom: "18px",
                    flex: 1,
                  }}
                >
                  {project.summary}
                </p>

                {/* 5. Architecture Pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.76rem",
                    color: isLight ? "#334155" : "#e2e8f0",
                    background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: isLight
                      ? "1px solid rgba(0, 0, 0, 0.08)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    marginBottom: "16px",
                  }}
                >
                  <Cpu size={14} color="#ff790c" />
                  <span style={{ fontWeight: 700, color: "#ff790c" }}>Arch:</span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.architecture}
                  </span>
                </div>

                {/* 7. Action CTA Buttons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    borderTop: isLight
                      ? "1px solid rgba(0, 0, 0, 0.08)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Test in 3-Device Simulator */}
                  <a
                    href="#simulator"
                    onClick={() => sound.play("tap")}
                    className="midu-btn-primary"
                    style={{
                      padding: "8px 14px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Smartphone size={13} />
                    <span>Test on Device</span>
                  </a>

                  {/* Architecture Tree & GitHub */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      onClick={() => {
                        sound.play("tap");
                        setActiveModalProject(project);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)",
                        border: isLight
                          ? "1px solid rgba(0, 0, 0, 0.1)"
                          : "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#38bdf8",
                        fontWeight: 600,
                        fontSize: "0.76rem",
                        padding: "7px 10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                      title="View Architecture Details"
                    >
                      <Code2 size={13} />
                      <span>Spec</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "8px",
                          borderRadius: "8px",
                          background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)",
                          color: isLight ? "#64748b" : "#94a3b8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                        }}
                        title="View GitHub Repository"
                      >
                        <GithubIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Spec Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setActiveModalProject(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "88vh",
              overflowY: "auto",
              background: isLight ? "#ffffff" : "#0d111e",
              border: "1px solid rgba(255, 121, 12, 0.3)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9)",
              color: isLight ? "#0f172a" : "#ffffff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: isLight ? "#0f172a" : "#fff",
                  }}
                >
                  {activeModalProject.title}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#ff790c", fontWeight: 600 }}>
                  {activeModalProject.architecture}
                </div>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.08)",
                  border: "none",
                  color: isLight ? "#334155" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <p
              style={{
                fontSize: "0.92rem",
                color: isLight ? "#475569" : "#94a3b8",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              {activeModalProject.fullDescription}
            </p>

            <h4
              style={{
                fontSize: "0.85rem",
                color: "#ff790c",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "10px",
              }}
            >
              Core Technical Highlights
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
              {activeModalProject.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    fontSize: "0.85rem",
                    color: isLight ? "#334155" : "#cbd5e1",
                  }}
                >
                  <span style={{ color: "#10b981" }}>✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setActiveModalProject(null)}
                className="midu-btn-primary"
                style={{ padding: "8px 20px", fontSize: "0.85rem" }}
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
