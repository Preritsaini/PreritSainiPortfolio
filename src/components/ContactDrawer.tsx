"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { sound } from "../utils/audioSynth";
import { LinkedinIcon, GithubIcon } from "./Icons";
import { saveLeadToFirestore } from "../utils/firebase";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [roleType, setRoleType] = useState<string>("Full-time role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const PHONE_NUMBER = "+91 9105023038";
  const EMAIL_ADDRESS = "sainiprerit6@gmail.com";
  const WHATSAPP_LINK = "https://wa.me/919105023038";
  const LINKEDIN_LINK = "https://www.linkedin.com/in/prerit-saini-3b99a62b0/?isSelfProfile=true";
  const GITHUB_LINK = "https://github.com/Preritsaini";

  // Build subject and body
  const getSubject = () => `[${roleType}] Inquiry from ${name.trim() || "Recruiter / Client"}`;
  const getBody = () =>
    `Hi Prerit,\n\nName: ${name.trim() || "N/A"}\nEmail / Contact: ${email.trim() || "N/A"}\nInquiry Type: ${roleType}\n\nMessage:\n${message.trim() || "Hi Prerit, I saw your portfolio and would like to connect regarding an opportunity."}\n\nLooking forward to speaking with you!`;

  const getMailtoUrl = () =>
    `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(getBody())}`;

  const getGmailUrl = () =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      EMAIL_ADDRESS
    )}&su=${encodeURIComponent(getSubject())}&body=${encodeURIComponent(getBody())}`;

  // Keyboard shortcut: Escape to smoothly close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Safe mailto trigger that NEVER opens about:blank
  const triggerSafeMailto = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 200);
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.play("coin");
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.play("coin");
    navigator.clipboard.writeText(PHONE_NUMBER);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleCopyFullMessage = () => {
    sound.play("coin");
    const fullText = `To: ${EMAIL_ADDRESS}\nSubject: ${getSubject()}\n\n${getBody()}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleOpenGmail = async () => {
    sound.play("tap");
    try {
      await saveLeadToFirestore({
        name: name.trim() || "Website Visitor",
        email: email.trim() || "via-drawer-gmail@portfolio.local",
        projectType: roleType,
        message: message.trim() || "Inquiry initiated via Contact Drawer Gmail button",
        clientMetadata: {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
          language: typeof navigator !== "undefined" ? navigator.language : "",
          screenResolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "",
          timeZone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "",
        },
      });
    } catch (err) {
      console.warn("Firestore notice:", err);
    }
    window.open(getGmailUrl(), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const handleOpenDefaultMail = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sound.play("tap");
    setIsSubmitting(true);

    try {
      await saveLeadToFirestore({
        name: name.trim() || "Website Visitor",
        email: email.trim() || "via-drawer-mail@portfolio.local",
        projectType: roleType,
        message: message.trim() || "Inquiry initiated via Contact Drawer Default Mail",
        clientMetadata: {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
          language: typeof navigator !== "undefined" ? navigator.language : "",
          screenResolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "",
          timeZone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "",
        },
      });
    } catch (err) {
      console.warn("Firestore notice:", err);
    }

    sound.play("success");
    setIsSubmitting(false);
    setSubmitted(true);
    triggerSafeMailto(getMailtoUrl());
  };

  return (
    <>
      {/* 1. Backdrop Overlay (Smooth fade in/out, NO BLINK) */}
      <div
        onClick={() => {
          sound.play("tap");
          onClose();
        }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.76)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden="true"
      />

      {/* 2. Slide-Over Sheet (Smooth slide from right, NO BLINK) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Contact Drawer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "580px",
          backgroundColor: "#0d0e12",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.9)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0%)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        {/* Drawer Header with Close Button */}
        <div
          style={{
            padding: "24px 32px 14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.8)",
              }}
            />
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#ff790c",
              }}
            >
              Available For Roles & Projects
            </span>
          </div>

          <button
            onClick={() => {
              sound.play("tap");
              onClose();
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.16)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Close Contact Drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: "20px 32px 36px 32px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Main Title */}
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 2.6rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              marginBottom: "8px",
            }}
          >
            Let’s build together.
          </h2>
          <p
            style={{
              fontSize: "0.94rem",
              color: "#94a3b8",
              lineHeight: 1.5,
              marginBottom: "24px",
            }}
          >
            Direct contact info for recruiters and engineering leads. Call, WhatsApp, or email me directly:
          </p>

          {/* ============================================================== */}
          {/* PROMINENT DIRECT CONTACT CARDS (IMMEDIATELY VISIBLE AT THE TOP) */}
          {/* ============================================================== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            {/* 1. DIRECT PHONE & WHATSAPP CARD */}
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 121, 12, 0.07)",
                border: "1px solid rgba(255, 121, 12, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    backgroundColor: "#ff790c",
                    color: "#050505",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={22} strokeWidth={2.4} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#ff790c",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Direct Phone & WhatsApp
                  </div>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    onClick={() => sound.play("tap")}
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.01em",
                      textDecoration: "none",
                      display: "block",
                      marginTop: "2px",
                    }}
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
              </div>

              {/* Action Buttons for Phone */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => sound.play("tap")}
                  className="midu-btn-primary"
                  style={{
                    padding: "7px 14px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <Phone size={13} />
                  <span>Call</span>
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.play("tap")}
                  className="midu-btn-secondary"
                  style={{
                    padding: "7px 12px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderColor: "rgba(34, 197, 94, 0.35)",
                    color: "#22c55e",
                  }}
                >
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  style={{
                    padding: "7px 10px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: copiedPhone ? "#22c55e" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.78rem",
                  }}
                  title="Copy Phone Number"
                >
                  {copiedPhone ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* 2. DIRECT EMAIL CARD */}
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ff790c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Email Address
                  </div>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    onClick={(e) => {
                      e.preventDefault();
                      triggerSafeMailto(`mailto:${EMAIL_ADDRESS}`);
                    }}
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.01em",
                      textDecoration: "none",
                      display: "block",
                      marginTop: "2px",
                      wordBreak: "break-all",
                    }}
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
              </div>

              {/* Action Buttons for Email: Gmail Web & System Mail & Copy */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* 1. Gmail in browser (No blank tab, opens Gmail directly) */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    EMAIL_ADDRESS
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.play("coin")}
                  className="midu-btn-primary"
                  style={{
                    padding: "7px 13px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                  title="Compose directly in Gmail (Web)"
                >
                  <Mail size={13} />
                  <span>Gmail</span>
                </a>

                {/* 2. System Mail Client (Safe trigger, no about:blank) */}
                <button
                  type="button"
                  onClick={() => {
                    sound.play("tap");
                    triggerSafeMailto(`mailto:${EMAIL_ADDRESS}`);
                  }}
                  className="midu-btn-secondary"
                  style={{
                    padding: "7px 11px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                  title="Open Default Mail App"
                >
                  <span>Mail App</span>
                </button>

                {/* 3. Copy Email */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    padding: "7px 10px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: copiedEmail ? "#22c55e" : "#94a3b8",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "0.78rem",
                  }}
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* 3. FAST SOCIAL PILLS (LinkedIn & GitHub) */}
            <div style={{ display: "flex", gap: "10px", marginTop: "2px" }}>
              <a
                href={LINKEDIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play("tap")}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#cbd5e1",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn Profile</span>
                <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>

              <a
                href={GITHUB_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play("tap")}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#cbd5e1",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                <GithubIcon size={15} />
                <span>GitHub Repos</span>
                <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* QUICK MESSAGE FORM                                             */}
          {/* ============================================================== */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Or Send a Quick Message
              </div>
              <span style={{ fontSize: "0.76rem", color: "#64748b" }}>
                Pre-fills message for you
              </span>
            </div>

            {submitted ? (
              <div
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 121, 12, 0.08)",
                  border: "1px solid rgba(255, 121, 12, 0.3)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: "#ff790c",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <Check size={22} style={{ strokeWidth: 3 }} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                  Message Ready to Send!
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.5, marginBottom: "18px" }}>
                  Choose how you prefer to send to{" "}
                  <span style={{ color: "#ff790c", fontWeight: 600 }}>{EMAIL_ADDRESS}</span>:
                </p>

                {/* Direct Action Choices in Submitted State */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                  <a
                    href={getGmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.play("coin")}
                    className="midu-btn-primary"
                    style={{
                      justifyContent: "center",
                      padding: "12px 18px",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                  >
                    <Mail size={16} />
                    <span>Open in Gmail (Web)</span>
                  </a>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        sound.play("tap");
                        triggerSafeMailto(getMailtoUrl());
                      }}
                      className="midu-btn-secondary"
                      style={{
                        justifyContent: "center",
                        padding: "10px 14px",
                        fontSize: "0.82rem",
                      }}
                    >
                      <Send size={14} />
                      <span>Default Mail App</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyFullMessage}
                      className="midu-btn-secondary"
                      style={{
                        justifyContent: "center",
                        padding: "10px 14px",
                        fontSize: "0.82rem",
                        color: copiedAll ? "#22c55e" : "#cbd5e1",
                      }}
                    >
                      {copiedAll ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                      <span>{copiedAll ? "Copied!" : "Copy Full Text"}</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Edit message
                </button>
              </div>
            ) : (
              <form onSubmit={handleOpenDefaultMail} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Role / Inquiry Type Pills */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginBottom: "8px",
                    }}
                  >
                    Inquiry Type
                  </label>
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "4px",
                      gap: "4px",
                    }}
                  >
                    {["Full-time role", "Contract / Project", "Freelance / MVP"].map((type) => {
                      const isActive = roleType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            sound.play("tap");
                            setRoleType(type);
                          }}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "0.8rem",
                            fontWeight: isActive ? 700 : 500,
                            backgroundColor: isActive ? "#ffffff" : "transparent",
                            color: isActive ? "#000000" : "#94a3b8",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Contact Info in 2 Columns */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="drawer-sender-name"
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#94a3b8",
                        marginBottom: "6px",
                      }}
                    >
                      Your name
                    </label>
                    <input
                      id="drawer-sender-name"
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#ff790c")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="drawer-sender-email"
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#94a3b8",
                        marginBottom: "6px",
                      }}
                    >
                      Your email / phone
                    </label>
                    <input
                      id="drawer-sender-email"
                      type="text"
                      placeholder="e.g. sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#ffffff",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#ff790c")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                    />
                  </div>
                </div>

                {/* Message / Job Details */}
                <div>
                  <label
                    htmlFor="drawer-sender-details"
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#94a3b8",
                      marginBottom: "6px",
                    }}
                  >
                    Role / Project Details
                  </label>
                  <textarea
                    id="drawer-sender-details"
                    rows={3}
                    placeholder="We're hiring a Flutter Engineer for our mobile team / building an app..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s ease",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#ff790c")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                {/* Primary Action Buttons: Gmail Web & Default Client side-by-side */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px", marginTop: "4px" }}>
                  {/* 1. Open in Gmail Web (Primary for web users) */}
                  <button
                    type="button"
                    onClick={handleOpenGmail}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "9999px",
                      backgroundColor: "#ff790c",
                      color: "#050505",
                      fontWeight: 800,
                      fontSize: "0.92rem",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                      boxShadow: "0 6px 20px rgba(255, 121, 12, 0.3)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff8c2b")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff790c")}
                    title="Compose directly in Gmail (Web)"
                  >
                    <Mail size={16} />
                    <span>Send via Gmail</span>
                  </button>

                  {/* 2. Send via System Mail Client (Safe trigger, no about:blank) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      cursor: isSubmitting ? "wait" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.14)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    }}
                    title="Trigger default system mail client"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? "Opening..." : "Mail App"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
