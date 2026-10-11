"use client";

import React, { useState } from "react";
import { sound } from "../utils/audioSynth";
import { HelpCircle, ChevronDown, Plus, Minus } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Why choose Flutter over separate native iOS and Android engineering teams?",
      a: "Flutter compiles ahead-of-time (AOT) to native ARM64 machine code and renders via the Impeller engine directly on Vulkan and Metal. You achieve 100% shared business logic and pixel-identical UI fidelity across platforms with zero JavaScript bridge lag. This cuts development, QA, and maintenance overhead in half without sacrificing native performance.",
    },
    {
      q: "How do you guarantee locked 120 FPS without frame drops on high-refresh ProMotion screens?",
      a: "By enforcing a strict sub-8.3ms frame budget: eliminating runtime shader compilation jank through Impeller compile-time shader warming, minimizing widget rebuild scopes through selector-based reactive state management (BLoC/Riverpod), and utilizing zero-GC object pooling for high-frequency animations.",
    },
    {
      q: "Can you bridge complex native iOS and Android hardware features?",
      a: "Yes. I routinely write custom MethodChannel and FFI (Foreign Function Interface) plugins in Swift, Objective-C, Kotlin, and Java. Past implementations include iOS Secure Enclave biometrics, Android Keystore, real-time WebRTC audio-video streaming, CoreAudio background audio services, and BLE peripheral management.",
    },
    {
      q: "Are you open to full-time remote roles or international relocation?",
      a: "Yes. I am actively available for full-time Flutter Software Engineer roles with companies worldwide, operating seamlessly across European, US, and APAC time zones.",
    },
    {
      q: "What is your standard development workflow and architecture rigor?",
      a: "Feature-first Clean Architecture, unidirectional event streams (BLoC/Riverpod), strict repository pattern data isolation, automated Fastlane CI/CD pipelines targeting TestFlight and Google Play Internal tracks, and automated crash monitoring via Firebase Crashlytics.",
    },
    {
      q: "Can you help migrate an existing native codebase or legacy hybrid app to Flutter?",
      a: "Yes. I specialize in both greenfield 0-to-1 architectures and incremental module integration (Flutter Add-to-App). We can embed Flutter modules into existing native apps screen-by-screen to de-risk migration while accelerating feature velocity.",
    },
  ];

  const handleToggle = (idx: number) => {
    sound.play("tap");
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section" style={{ background: "#050505", padding: "120px 0" }}>
      <div className="app-container" style={{ maxWidth: "960px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <HelpCircle size={14} />
            <span>Frequently Asked Questions</span>
          </div>

          <h2
            className="midu-hero-title"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", marginBottom: "18px" }}
          >
            Frequently Asked <span className="serif-italic" style={{ color: "var(--text-primary)" }}>Questions</span>.
          </h2>

          <p className="section-subtitle" style={{ margin: "0 auto", fontSize: "1.15rem", color: "#94a3b8" }}>
            Everything you need to know about partnering with Prerit on high-impact mobile products,
            architecture sprints, and engineering standards.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? "rgba(18, 18, 24, 0.85)" : "rgba(12, 12, 16, 0.5)",
                  border: isOpen
                    ? "1px solid rgba(255, 125, 78, 0.35)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <button
                  onClick={() => handleToggle(idx)}
                  style={{
                    width: "100%",
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    background: "transparent",
                    border: "none",
                    color: "#ffffff",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                  }}
                >
                  <span style={{ color: isOpen ? "#ffffff" : "#e2e8f0" }}>{faq.q}</span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isOpen ? "rgba(255, 125, 78, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      border: `1px solid ${isOpen ? "rgba(255, 125, 78, 0.3)" : "rgba(255, 255, 255, 0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#ff7d4e" : "#94a3b8",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 28px 26px 28px",
                      color: "#94a3b8",
                      fontSize: "0.98rem",
                      lineHeight: 1.7,
                      borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                      paddingTop: "16px",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
