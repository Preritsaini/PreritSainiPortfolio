"use client";

import React from "react";
import { FlutterSimulator } from "./FlutterSimulator";
import { sound } from "../utils/audioSynth";
import { Zap, Smartphone, Sparkles, Cpu, Layers } from "lucide-react";

interface SimulatorSectionProps {
  hotReloadTrigger: number;
}

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({ hotReloadTrigger }) => {
  return (
    <section
      id="simulator"
      className="section"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "90px 0",
        position: "relative",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="app-container">
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div className="status-pill" style={{ marginBottom: "16px" }}>
            <span>Multi-Platform Flutter Sandbox • Phone, Tablet &amp; Desktop</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Experience 120 FPS Flutter apps{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>
              in real time
            </span>
            .
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Switch seamlessly between <strong>Phone</strong>, <strong>Tablet</strong>, and <strong>Laptop</strong> viewports to test
            how responsive Flutter architectures adapt across iOS, Android, iPadOS, and macOS.
          </p>
        </div>

        {/* Responsive Simulator Container */}
        <div className="simulator-responsive-wrapper">
          <FlutterSimulator externalReloadTrigger={hotReloadTrigger} />
        </div>
      </div>
    </section>
  );
};
