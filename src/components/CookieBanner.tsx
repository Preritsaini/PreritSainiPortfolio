"use client";

import React, { useState, useEffect } from "react";
import { sound } from "../utils/audioSynth";

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after slight delay to match midu.design entrance
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sound.play("tap");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 990,
        maxWidth: "410px",
        background: "rgba(18, 18, 22, 0.94)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "18px",
        padding: "18px 22px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "18px",
        animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="cookie-banner-card"
    >
      <div style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.5 }}>
        Cookies help us craft a better experience for you. Smoother navigation,
        smarter content. Enjoy the ride. Read our{" "}
        <a
          href="#resume-download"
          onClick={() => sound.play("tap")}
          style={{ color: "#f8fafc", textDecoration: "underline", fontWeight: 500 }}
        >
          Craft Policy
        </a>
        .
      </div>

      <button
        onClick={handleDismiss}
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          color: "#ffffff",
          fontWeight: 600,
          fontSize: "0.82rem",
          padding: "8px 16px",
          borderRadius: "9999px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.16)";
          e.currentTarget.style.transform = "scale(1.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Got it
      </button>
    </div>
  );
};
