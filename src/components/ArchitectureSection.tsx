"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  ArrowRight,
  GitBranch,
  Activity,
  Zap,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { sound } from "../utils/audioSynth";

export const ArchitectureSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeConcept, setActiveConcept] = useState<"bloc" | "clean" | "pipeline" | "channels">("bloc");

  return (
    <section id="architecture" className="section">
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <Cpu size={14} />
            <span>High Standards • Architecture &amp; Rigor</span>
          </div>
          <h2
            className="midu-hero-title"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", marginBottom: "18px" }}
          >
            A partner you can <span className="serif-italic" style={{ color: isLight ? "#0f172a" : "#ffffff" }}>trust</span>. High standards.{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>Deterministic delivery</span>.
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto", fontSize: "1.15rem", color: isLight ? "#475569" : "#94a3b8" }}>
            The result: mobile experiences that don&apos;t just look sharp — they run with locked 120 FPS,
            zero dropped frames, sub-8.3ms VSync isolate budgets, and clean native boundaries.
          </p>
        </div>

        {/* Concept Visualizer Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
            marginBottom: "36px",
          }}
        >
          <button
            onClick={() => {
              sound.play("tap");
              setActiveConcept("bloc");
            }}
            style={conceptCardStyle(activeConcept === "bloc", isLight)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Layers size={18} color="#00e5ff" />
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>BLoC / Cubit Flow</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: isLight ? "#64748b" : "#94a3b8" }}>
              Event-driven streams ensuring 100% testable &amp; predictable states.
            </p>
          </button>

          <button
            onClick={() => {
              sound.play("tap");
              setActiveConcept("clean");
            }}
            style={conceptCardStyle(activeConcept === "clean", isLight)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <GitBranch size={18} color="#a855f7" />
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Clean Architecture</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: isLight ? "#64748b" : "#94a3b8" }}>
              Strict Domain/Data/Presentation decoupling with Entities &amp; UseCases.
            </p>
          </button>

          <button
            onClick={() => {
              sound.play("tap");
              setActiveConcept("pipeline");
            }}
            style={conceptCardStyle(activeConcept === "pipeline", isLight)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Activity size={18} color="#10b981" />
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>60/120 FPS Pipeline</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: isLight ? "#64748b" : "#94a3b8" }}>
              Impeller &amp; Skia rasterization keeping jank off the UI thread.
            </p>
          </button>

          <button
            onClick={() => {
              sound.play("tap");
              setActiveConcept("channels");
            }}
            style={conceptCardStyle(activeConcept === "channels", isLight)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <Zap size={18} color="#f59e0b" />
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Method Channels</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: isLight ? "#64748b" : "#94a3b8" }}>
              BinaryMessenger bridges connecting Dart to iOS Swift &amp; Android Kotlin.
            </p>
          </button>
        </div>

        {/* Concept Interactive Flow Diagram */}
        <div
          className="glass-card"
          style={{
            padding: "24px 32px",
            marginBottom: "0px",
            background: isLight ? "#ffffff" : "rgba(10, 16, 32, 0.7)",
            border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(0, 229, 255, 0.2)",
            boxShadow: isLight ? "0 4px 20px rgba(0, 0, 0, 0.04)" : "none",
          }}
        >
          {activeConcept === "bloc" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div style={flowStepBox("#02569b")}>
                <div style={flowStepTitle}>1. User Action</div>
                <div style={flowStepDesc}>Tap / Pull to Refresh</div>
              </div>
              <ArrowRight size={20} color="#00e5ff" />
              <div style={flowStepBox("#0175c2")}>
                <div style={flowStepTitle}>2. Dispatch Event</div>
                <div style={flowStepDesc}>Bloc.add(FetchBookEvent)</div>
              </div>
              <ArrowRight size={20} color="#00e5ff" />
              <div style={flowStepBox("#7c3aed")}>
                <div style={flowStepTitle}>3. Business Logic</div>
                <div style={flowStepDesc}>Repository &amp; Hive Cache</div>
              </div>
              <ArrowRight size={20} color="#00e5ff" />
              <div style={flowStepBox("#059669")}>
                <div style={flowStepTitle}>4. Emit Immutable State</div>
                <div style={flowStepDesc}>BlocBuilder Re-renders UI</div>
              </div>
            </div>
          )}

          {activeConcept === "clean" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div style={flowStepBox("#7c3aed")}>
                <div style={flowStepTitle}>Presentation Layer</div>
                <div style={flowStepDesc}>Widgets, Pages, BLoC/Cubit</div>
              </div>
              <ArrowRight size={20} color="#a855f7" />
              <div style={flowStepBox("#2563eb")}>
                <div style={flowStepTitle}>Domain Layer</div>
                <div style={flowStepDesc}>UseCases, Entities, Contract</div>
              </div>
              <ArrowRight size={20} color="#a855f7" />
              <div style={flowStepBox("#059669")}>
                <div style={flowStepTitle}>Data Layer</div>
                <div style={flowStepDesc}>Repositories, Hive, APIs, S3</div>
              </div>
            </div>
          )}

          {activeConcept === "pipeline" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div style={flowStepBox("#02569b")}>
                <div style={flowStepTitle}>VSync Signal</div>
                <div style={flowStepDesc}>16.6ms / 8.3ms Window</div>
              </div>
              <ArrowRight size={20} color="#10b981" />
              <div style={flowStepBox("#0d9488")}>
                <div style={flowStepTitle}>UI Thread (Build &amp; Layout)</div>
                <div style={flowStepDesc}>Widget &gt; Element &gt; RenderObject</div>
              </div>
              <ArrowRight size={20} color="#10b981" />
              <div style={flowStepBox("#059669")}>
                <div style={flowStepTitle}>Raster Thread (Impeller)</div>
                <div style={flowStepDesc}>GPU Shaders &amp; Metal / Vulkan</div>
              </div>
            </div>
          )}

          {activeConcept === "channels" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div style={flowStepBox("#02569b")}>
                <div style={flowStepTitle}>Dart UI Layer</div>
                <div style={flowStepDesc}>MethodChannel.invokeMethod</div>
              </div>
              <ArrowRight size={20} color="#f59e0b" />
              <div style={flowStepBox("#d97706")}>
                <div style={flowStepTitle}>Binary Messenger</div>
                <div style={flowStepDesc}>StandardMessageCodec</div>
              </div>
              <ArrowRight size={20} color="#f59e0b" />
              <div style={flowStepBox("#b45309")}>
                <div style={flowStepTitle}>Native Platforms</div>
                <div style={flowStepDesc}>Swift (iOS) &amp; Kotlin (Android)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const conceptCardStyle = (active: boolean, isLight: boolean): React.CSSProperties => ({
  padding: "16px",
  borderRadius: "14px",
  background: active
    ? isLight
      ? "rgba(255, 121, 12, 0.12)"
      : "rgba(0, 229, 255, 0.1)"
    : isLight
    ? "#ffffff"
    : "rgba(15, 23, 42, 0.6)",
  border: `1px solid ${
    active
      ? isLight
        ? "rgba(255, 121, 12, 0.4)"
        : "rgba(0, 229, 255, 0.4)"
      : isLight
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(255, 255, 255, 0.06)"
  }`,
  textAlign: "left",
  cursor: "pointer",
  transition: "all 0.2s ease",
  color: isLight ? "#0f172a" : "#fff",
  boxShadow: isLight ? "0 4px 14px rgba(0, 0, 0, 0.03)" : "none",
});

const flowStepBox = (bgColor: string): React.CSSProperties => ({
  flex: "1 1 180px",
  padding: "14px",
  borderRadius: "12px",
  background: bgColor,
  opacity: 0.9,
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
});

const flowStepTitle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 700,
  color: "#fff",
  marginBottom: "4px",
};

const flowStepDesc: React.CSSProperties = {
  fontSize: "0.72rem",
  color: "rgba(255, 255, 255, 0.8)",
  fontFamily: "var(--font-mono)",
};
