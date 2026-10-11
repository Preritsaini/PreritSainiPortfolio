"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/audioSynth";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Maximize2,
  Sliders,
  Smartphone,
  Layers,
  Activity,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const AppleVideoReel: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(24);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_FRAMES = 120; // 120 frames at 60fps = 2 seconds per chapter loop

  const chapters = [
    {
      id: "readhub",
      eyebrow: "CHAPTER 01 • AUDIO-TEXT SYNCHRONIZATION",
      title: "ReadHub: 60 FPS Book Pagination & AWS S3 Audio Drift Sync",
      tagline: "Sub-10ms alignment between spoken audio and visual typography.",
      badge: "Clean Architecture + BLoC",
    },
    {
      id: "cyberrunner",
      eyebrow: "CHAPTER 02 • HARDWARE-ACCELERATED GAMING",
      title: "CyberRunner 2D: Locked 120 FPS with Skia & Impeller GLSL Shaders",
      tagline: "Zero-garbage-collection object pooling eliminating stutter in boss encounters.",
      badge: "Flame Engine 1.18",
    },
    {
      id: "finpulse",
      eyebrow: "CHAPTER 03 • REAL-TIME WEBSOCKETS & BIOMETRICS",
      title: "FinPulse: 60 FPS Bézier Chart Scrubbing & Hardware Biometrics",
      tagline: "Native MethodChannel bridging iOS Secure Enclave and Android Keystore.",
      badge: "Riverpod 2.5 + CustomPainter",
    },
    {
      id: "profiler",
      eyebrow: "CHAPTER 04 • FLUTTER DEVTOOLS RASTER ENGINE",
      title: "Impeller Pipeline: 8.3ms VSync Frame Budget Inspection",
      tagline: "Deterministic UI and Raster isolate threads with zero dropped frames.",
      badge: "DevTools 0 issues",
    },
  ];

  // Sync sound settings on mount
  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  // Video Frame Loop Timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= TOTAL_FRAMES) {
          // Advance to next chapter on loop complete
          setActiveChapter((c) => (c + 1) % chapters.length);
          return 0;
        }
        return prev + 1;
      });
    }, (1000 / 30) / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, chapters.length]);

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frame = parseInt(e.target.value, 10);
    setCurrentFrame(frame);
    if (frame % 10 === 0) {
      sound.play("tap");
    }
  };

  const handleSelectChapter = (idx: number) => {
    sound.play("tap");
    setActiveChapter(idx);
    setCurrentFrame(0);
  };

  const handleTogglePlay = () => {
    sound.play("tap");
    setIsPlaying(!isPlaying);
  };

  const progressPercent = (currentFrame / TOTAL_FRAMES) * 100;
  const currentSeconds = ((currentFrame / 60)).toFixed(2);
  const totalSeconds = ((TOTAL_FRAMES / 60)).toFixed(2);

  return (
    <section id="reel" className="section" style={{ background: "#000000", padding: "100px 0" }}>
      <div className="app-container">
        {/* Apple Style Section Eyebrow & Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.82rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#ff7d4e",
              marginBottom: "16px",
            }}
          >
            <Sparkles size={14} />
            <span>The Film • Interactive Video Reel</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "#f5f5f7",
              marginBottom: "16px",
            }}
          >
            The <span className="serif-italic" style={{ color: "#ffffff" }}>film</span>. Hardware-accelerated{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>frame inspection</span>.
          </h2>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#86868b",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Scrub through 120 keyframes of production mobile apps. Watch how custom GLSL shaders,
            BLoC state streams, and native bridges maintain deterministic 60 &amp; 120 FPS fluidity.
          </p>
        </div>

        {/* Chapter Selector Tabs (Apple Keynote pill bar) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
            overflowX: "auto",
            padding: "4px 8px 12px",
            WebkitOverflowScrolling: "touch",
          }}
          className="no-scrollbar"
        >
          {chapters.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => handleSelectChapter(idx)}
              style={{
                padding: "8px 18px",
                borderRadius: "980px",
                fontSize: "0.82rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                background:
                  activeChapter === idx ? "rgba(41, 151, 255, 0.18)" : "rgba(255, 255, 255, 0.05)",
                color: activeChapter === idx ? "#2997ff" : "#86868b",
                border: `1px solid ${
                  activeChapter === idx ? "rgba(41, 151, 255, 0.4)" : "rgba(255, 255, 255, 0.08)"
                }`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span>{`0${idx + 1}. ${chap.badge}`}</span>
            </button>
          ))}
        </div>

        {/* Apple Hardware Mockup Chassis (Studio Display / MacBook Pro style) */}
        <div
          ref={containerRef}
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            background: "#08080a",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow:
              "0 40px 100px -20px rgba(0, 0, 0, 0.9), 0 0 60px rgba(41, 151, 255, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Display Glass Rim Highlight */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4) 50%, transparent)",
              zIndex: 30,
            }}
          />

          {/* Top Chassis Bar with Camera Notch & Live Indicators */}
          <div
            style={{
              padding: "12px 24px",
              background: "rgba(18, 18, 23, 0.95)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 25,
            }}
          >
            {/* Window Dots */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "0.75rem",
                  color: "#86868b",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Apple Silicon M-Series Engine • Skia/Impeller Metal
              </span>
            </div>

            {/* Live Camera & Resolution Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 10px",
                  borderRadius: "980px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#10b981",
                }}
              >
                <span>120 FPS LOCKED</span>
              </div>
              <span style={{ fontSize: "0.72rem", color: "#86868b", fontFamily: "var(--font-mono)" }}>
                4K UHD ProMotion
              </span>
            </div>
          </div>

          {/* Cinematic Video Canvas Frame Viewport */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              minHeight: "360px",
              background: "#050508",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Animated Scene Background depending on active chapter */}

            {/* SCENE 1: ReadHub S3 Audio Engine */}
            {activeChapter === 0 && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "32px",
                  position: "relative",
                  background:
                    "radial-gradient(ellipse at center, rgba(2, 86, 155, 0.25) 0%, #050508 75%)",
                }}
              >
                {/* Simulated Book Canvas */}
                <div
                  style={{
                    width: "min(340px, 45%)",
                    background: "#0f172a",
                    border: "1px solid rgba(255, 121, 12, 0.3)",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#ff790c", fontWeight: 700, marginBottom: "8px" }}>
                    CHAPTER 4 • DART 3 RECORD PATTERNS
                  </div>
                  <h4 style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 800, marginBottom: "10px" }}>
                    Reactive Paginated Buffer
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.6, marginBottom: "14px" }}>
                    By pre-rasterizing pages with Skia picture recordings, frame turns execute in under{" "}
                    <span
                      style={{
                        background: "rgba(255, 121, 12, 0.25)",
                        color: "#ff790c",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        fontWeight: 700,
                      }}
                    >
                      14 milliseconds
                    </span>
                    .
                  </p>
                  <div
                    style={{
                      height: "4px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #02569b, #ff790c)",
                        transition: "width 0.1s linear",
                      }}
                    />
                  </div>
                </div>

                {/* Live S3 Audio Narration Spectrum Analyzer */}
                <div
                  style={{
                    width: "min(360px, 48%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      padding: "18px",
                      borderRadius: "16px",
                      background: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2997ff" }}>
                        AWS S3 Signed Stream • 320kbps
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "#10b981", fontFamily: "var(--font-mono)" }}>
                        Jitter: &lt;4ms
                      </span>
                    </div>

                    {/* Dancing Audio Waveform Spectrum Bars */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "4px",
                        height: "54px",
                        padding: "6px 0",
                      }}
                    >
                      {Array.from({ length: 24 }).map((_, barIdx) => {
                        const dynamicHeight = Math.round(
                          Math.abs(
                            Math.sin((currentFrame + barIdx * 8) * 0.15) * 44 + 8
                          )
                        );
                        return (
                          <div
                            key={barIdx}
                            style={{
                              flex: 1,
                              height: `${dynamicHeight}px`,
                              background:
                                barIdx % 3 === 0
                                  ? "#ff790c"
                                  : barIdx % 3 === 1
                                  ? "#2997ff"
                                  : "#a855f7",
                              borderRadius: "2px",
                              transition: "height 0.08s ease",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "#94a3b8",
                      fontFamily: "var(--font-mono)",
                      background: "rgba(0, 0, 0, 0.4)",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <code>StreamSubscription&lt;AudioPosition&gt; offset: {currentSeconds}s / synced</code>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 2: CyberRunner 2D Flame Game Loop */}
            {activeChapter === 1 && (
              <div
                style={{
                  flex: 1,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "linear-gradient(180deg, #090615 0%, #15092a 50%, #030712 100%)",
                }}
              >
                {/* Overhead Game HUD */}
                <div
                  style={{
                    padding: "16px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 20,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#a855f7", fontWeight: 800 }}>
                      FLAME ENGINE ECS • ZERO GC
                    </span>
                    <h3
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 900,
                        color: "#ff790c",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {Math.floor(currentFrame * 42 + 2400)} PTS
                    </h3>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        color: "#10b981",
                        background: "rgba(16, 185, 129, 0.15)",
                        padding: "4px 12px",
                        borderRadius: "6px",
                      }}
                    >
                      120 FPS STABLE
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#86868b", marginTop: "4px" }}>
                      Raster Thread: 4.2ms / 8.3ms
                    </div>
                  </div>
                </div>

                {/* Game Canvas Graphic with Animated Runner and Obstacles */}
                <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
                  {/* Neon Grid Ground */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 80,
                      background: "linear-gradient(180deg, #7c3aed, #030712)",
                      borderTop: "2px solid #ff790c",
                      boxShadow: "0 -10px 30px rgba(255, 121, 12, 0.3)",
                    }}
                  />

                  {/* Cyber Runner Player (Moves dynamically based on current frame) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: (currentFrame % 40 < 20 ? 80 + (currentFrame % 40) * 4 : 160 - (currentFrame % 40 - 20) * 4),
                      left: "22%",
                      width: 44,
                      height: 48,
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #ff790c, #8b5cf6)",
                      boxShadow: "0 0 24px #ff790c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "bottom 0.05s linear",
                    }}
                  >
                    <Sparkles size={22} color="#fff" />
                  </div>

                  {/* Procedural Spikes & Neon Barriers */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 80,
                      left: `${100 - (progressPercent * 1.5) % 100}%`,
                      width: 28,
                      height: 38,
                      borderRadius: "6px",
                      background: "linear-gradient(135deg, #ef4444, #f59e0b)",
                      boxShadow: "0 0 16px #ef4444",
                    }}
                  />

                  {/* Collectable Power Gems */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 140,
                      left: `${120 - (progressPercent * 1.3) % 100}%`,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#fde047",
                      boxShadow: "0 0 18px #fde047",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "10px 24px",
                    background: "rgba(0, 0, 0, 0.6)",
                    fontSize: "0.78rem",
                    color: "#86868b",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Object Pooling: 40 pre-allocated instances</span>
                  <span>Impeller GPU Shaders: GLSL compiled</span>
                </div>
              </div>
            )}

            {/* SCENE 3: FinPulse Neobank & Biometrics */}
            {activeChapter === 2 && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: "32px",
                  background:
                    "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, #050508 75%)",
                }}
              >
                {/* Bezier Live Canvas Graph */}
                <div
                  style={{
                    width: "min(400px, 50%)",
                    background: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(255, 121, 12, 0.3)",
                    borderRadius: "18px",
                    padding: "24px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#86868b" }}>Live WebSocket Stream</span>
                    <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>● 12ms TICK</span>
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>
                    ${(67420 + Math.round(Math.sin(currentFrame * 0.1) * 850)).toLocaleString()}
                  </div>
                  <svg viewBox="0 0 300 80" style={{ width: "100%", height: "80px" }}>
                    <defs>
                      <linearGradient id="reelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff790c" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ff790c" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M0,60 Q75,${Math.round(30 + Math.sin(currentFrame * 0.1) * 15)} 150,${Math.round(45 - Math.cos(currentFrame * 0.1) * 15)} T300,${Math.round(20 + Math.sin(currentFrame * 0.15) * 10)} L300,80 L0,80 Z`}
                      fill="url(#reelGrad)"
                    />
                    <path
                      d={`M0,60 Q75,${Math.round(30 + Math.sin(currentFrame * 0.1) * 15)} 150,${Math.round(45 - Math.cos(currentFrame * 0.1) * 15)} T300,${Math.round(20 + Math.sin(currentFrame * 0.15) * 10)}`}
                      fill="none"
                      stroke="#ff790c"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="300"
                      cy={Math.round(20 + Math.sin(currentFrame * 0.15) * 10)}
                      r="4"
                      fill="#ff790c"
                    />
                  </svg>
                </div>

                {/* Biometric FaceID Scanner Graphic */}
                <div
                  style={{
                    width: "min(320px, 42%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "2px solid #ff790c",
                      boxShadow: "0 0 30px rgba(255, 121, 12, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animation: "pulse 2s infinite ease-in-out",
                    }}
                  >
                    <ShieldCheck size={38} color="#ff790c" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>
                      Hardware Secure Enclave
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "#86868b" }}>
                      MethodChannel bridge verifying biometric signatures in sub-210ms.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 4: DevTools Raster Engine */}
            {activeChapter === 3 && (
              <div
                style={{
                  flex: 1,
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  background: "#080d1a",
                }}
              >
                <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#2997ff", fontWeight: 700 }}>
                      FLUTTER DEVTOOLS • PERFORMANCE PROFILER
                    </span>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>
                      Raster &amp; UI Thread Timing (120 Hz Target: 8.3ms)
                    </h3>
                  </div>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "980px",
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#10b981",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                    }}
                  >
                    0 Dropped Frames
                  </span>
                </div>

                {/* Timeline Frame Bars Simulator */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(30, 1fr)",
                    gap: "4px",
                    height: "100px",
                    alignItems: "flex-end",
                    background: "rgba(0, 0, 0, 0.4)",
                    padding: "12px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {Array.from({ length: 30 }).map((_, fIdx) => {
                    const frameHeight = Math.round(25 + (fIdx % 5) * 5 + Math.sin(fIdx + currentFrame * 0.1) * 8);
                    return (
                      <div
                        key={fIdx}
                        style={{
                          height: `${frameHeight}px`,
                          background: "#10b981",
                          borderRadius: "2px",
                          boxShadow: "0 0 6px rgba(16, 185, 129, 0.4)",
                        }}
                        title={`Frame ${fIdx}: 4.1ms`}
                      />
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "#86868b",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span>Target: 8.33ms (120 Hz)</span>
                  <span>Observed Avg: 3.82ms UI / 4.11ms Raster</span>
                  <span>Jank Events: 0%</span>
                </div>
              </div>
            )}
          </div>

          {/* Apple Interactive Video Scrubber & Playback Controls Bar */}
          <div
            style={{
              padding: "16px 24px",
              background: "#0c0c10",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Top Scrubber Row: Slider with frame timestamp */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Play / Pause Toggle Button */}
              <button
                onClick={handleTogglePlay}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: isPlaying ? "rgba(255, 255, 255, 0.1)" : "#2997ff",
                  border: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                title={isPlaying ? "Pause Video Reel" : "Play Video Reel"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
              </button>

              {/* Timecode & Frame Indicator */}
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#86868b",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                }}
              >
                {currentSeconds}s / {totalSeconds}s
              </span>

              {/* Range Slider for Frame-by-Frame Scrubbing */}
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES}
                value={currentFrame}
                onChange={handleScrub}
                style={{
                  flex: 1,
                  accentColor: "#2997ff",
                  cursor: "pointer",
                  height: "4px",
                }}
                title="Drag to scrub video frames"
              />

              {/* Active Frame Counter */}
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#2997ff",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                }}
              >
                FRAME {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
              </span>

              {/* Playback speed buttons */}
              <div style={{ display: "flex", gap: "4px" }}>
                {[0.5, 1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      sound.play("tap");
                      setPlaybackSpeed(spd);
                    }}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      background: playbackSpeed === spd ? "rgba(41, 151, 255, 0.25)" : "transparent",
                      color: playbackSpeed === spd ? "#2997ff" : "#86868b",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Chapter Info Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "0.82rem",
              }}
            >
              <div>
                <span style={{ color: "#2997ff", fontWeight: 700 }}>
                  {chapters[activeChapter].eyebrow}:{" "}
                </span>
                <span style={{ color: "#f5f5f7", fontWeight: 600 }}>
                  {chapters[activeChapter].title}
                </span>
              </div>
              <span style={{ color: "#86868b" }}>{chapters[activeChapter].tagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
