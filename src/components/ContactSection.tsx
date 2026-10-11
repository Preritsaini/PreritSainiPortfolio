"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./Icons";
import { sound } from "../utils/audioSynth";
import { useTheme } from "../context/ThemeContext";
import { saveLeadToFirestore } from "../utils/firebase";
import {
  Mail,
  Copy,
  Check,
  Send,
  FileText,
  Sparkles,
  MessageSquare,
  ExternalLink,
  Phone,
} from "lucide-react";

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "Full-Time Mobile Engineering",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    projectType: string;
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // Safe mailto trigger that NEVER opens a blank page (about:blank)
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

  const handleCopyEmail = () => {
    sound.play("coin");
    navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    sound.play("coin");
    navigator.clipboard.writeText("+91 9105023038");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.play("tap");
    setIsSubmitting(true);

    const data = { ...formState };
    setSubmittedData(data);

    // Save lead to Cloud Firestore with attribution metadata
    try {
      await saveLeadToFirestore({
        name: data.name,
        email: data.email,
        projectType: data.projectType,
        message: data.message,
        clientMetadata: {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          referrer: typeof document !== "undefined" ? document.referrer || "direct" : "direct",
          language: typeof navigator !== "undefined" ? navigator.language : "",
          screenResolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "",
          timeZone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "",
        },
      });
    } catch (err) {
      console.warn("Firestore lead logging notice:", err);
    }

    sound.play("success");
    setIsSubmitting(false);
    setSubmitted(true);

    const mailtoUrl = `mailto:${PERSONAL_INFO.socials.email}?subject=${encodeURIComponent(
      `[${data.projectType}] Portfolio Inquiry from ${data.name}`
    )}&body=${encodeURIComponent(
      `Hi Prerit,\n\nName: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}`
    )}`;

    // Safely launch default mail client without ever opening a blank tab
    triggerSafeMailto(mailtoUrl);
  };

  const handleOpenDirectGmail = async () => {
    sound.play("tap");
    const data = { ...formState };
    if (data.name.trim() || data.email.trim() || data.message.trim()) {
      try {
        await saveLeadToFirestore({
          name: data.name.trim() || "Website Visitor",
          email: data.email.trim() || "via-gmail-button@portfolio.local",
          projectType: data.projectType,
          message: data.message.trim() || "Inquiry initiated via direct Gmail button",
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
    }
    const subject = `[${formState.projectType}] Portfolio Inquiry from ${formState.name || "Colleague"}`;
    const body = `Hi Prerit,\n\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\n\nMessage:\n${formState.message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PERSONAL_INFO.socials.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const socialBtnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "10px",
    background: isLight ? "#f1f5f9" : "rgba(255, 255, 255, 0.04)",
    border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
    color: isLight ? "#334155" : "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "all 0.2s ease",
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        background: isLight ? "#ffffff" : "rgba(6, 9, 19, 0.6)",
        transition: "background 0.3s ease",
      }}
    >
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="status-pill" style={{ margin: "0 auto 16px" }}>
            <Mail size={14} />
            <span>Get In Touch • Available for Hire</span>
          </div>
          <h2
            className="midu-hero-title"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              marginBottom: "18px",
              color: isLight ? "#0f172a" : "#ffffff",
            }}
          >
            Have an ambitious product in mind? Let&apos;s build something{" "}
            <span className="serif-italic" style={{ color: "#ff7d4e" }}>exceptional</span>.
          </h2>
          <p
            className="section-subtitle"
            style={{
              margin: "0 auto",
              fontSize: "1.15rem",
              color: isLight ? "#475569" : "#94a3b8",
            }}
          >
            Available for Flutter Software Engineer roles, high-velocity product development, and production
            cross-platform mobile builds across iOS &amp; Android.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "36px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Info & Socials */}
          <div
            className="glass-card"
            style={{
              padding: "36px",
              background: isLight ? "#ffffff" : undefined,
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : undefined,
              boxShadow: isLight ? "0 10px 30px rgba(0, 0, 0, 0.04)" : undefined,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "#10b981",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "24px",
              }}
            >
              <span>Available for Hire &amp; Consulting</span>
            </div>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: isLight ? "#0f172a" : "#fff",
                marginBottom: "12px",
              }}
            >
              Direct Channels
            </h3>
            <p
              style={{
                color: isLight ? "#475569" : "#94a3b8",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              Have an app idea or need Flutter engineering expertise on your team? Reach out
              directly or copy my email below.
            </p>

            {/* Email Action Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: "14px",
                background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.4)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "14px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Primary Email
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.socials.email}`}
                  style={{
                    color: isLight ? "#0f172a" : "#fff",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginTop: "2px",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  {PERSONAL_INFO.socials.email}
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: copiedEmail ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 121, 12, 0.1)",
                  border: `1px solid ${copiedEmail ? "#10b981" : "rgba(255, 121, 12, 0.3)"}`,
                  color: copiedEmail ? "#10b981" : "#ff790c",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedEmail ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Direct Phone & WhatsApp Card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: "14px",
                background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.4)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
                marginBottom: "24px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Direct Phone / WhatsApp
                </div>
                <a
                  href="tel:+919105023038"
                  style={{
                    color: isLight ? "#0f172a" : "#fff",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginTop: "2px",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  +91 9105023038
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <a
                  href="https://wa.me/919105023038"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.play("tap")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "rgba(16, 185, 129, 0.14)",
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                    color: "#10b981",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  title="Message on WhatsApp"
                >
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: copiedPhone ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 121, 12, 0.1)",
                    border: `1px solid ${copiedPhone ? "#10b981" : "rgba(255, 121, 12, 0.3)"}`,
                    color: copiedPhone ? "#10b981" : "#ff790c",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedPhone ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Social Network Buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("tap")}
                style={socialBtnStyle}
              >
                <GithubIcon size={18} />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("tap")}
                style={socialBtnStyle}
              >
                <LinkedinIcon size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.play("tap")}
                style={socialBtnStyle}
              >
                <TwitterIcon size={18} />
                <span>Twitter / X</span>
              </a>
            </div>

            {/* Direct Resume Download & Modal */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="/Prerit_Saini_Resume.pdf"
                download="Prerit_Saini_Resume.pdf"
                onClick={() => sound.play("coin")}
                className="midu-btn-primary"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none", padding: "12px" }}
              >
                <FileText size={16} />
                <span>Download Official Resume (PDF)</span>
              </a>

              {onOpenResume && (
                <button
                  onClick={() => {
                    sound.play("tap");
                    onOpenResume();
                  }}
                  className="midu-btn-secondary"
                  style={{ width: "100%", justifyContent: "center", padding: "12px" }}
                >
                  <span>Open Interactive CV Modal</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div
            className="glass-card"
            style={{
              padding: "36px",
              background: isLight ? "#ffffff" : undefined,
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : undefined,
              boxShadow: isLight ? "0 10px 30px rgba(0, 0, 0, 0.04)" : undefined,
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: isLight ? "#0f172a" : "#fff",
                marginBottom: "8px",
              }}
            >
              Send a Message
            </h3>
            <p style={{ color: isLight ? "#64748b" : "#94a3b8", fontSize: "0.9rem", marginBottom: "24px" }}>
              Typically responds within 24 hours.
            </p>

            {submitted && submittedData ? (
              <div
                style={{
                  padding: "36px 28px",
                  borderRadius: "16px",
                  background: isLight ? "rgba(16, 185, 129, 0.06)" : "rgba(16, 185, 129, 0.1)",
                  border: isLight ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(16, 185, 129, 0.35)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Sparkles size={28} color="#10b981" />
                </div>

                <h4
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: isLight ? "#0f172a" : "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  Inquiry Dispatched!
                </h4>

                <p
                  style={{
                    color: isLight ? "#475569" : "#94a3b8",
                    fontSize: "0.93rem",
                    lineHeight: 1.6,
                    maxWidth: "440px",
                    margin: "0 auto 22px",
                  }}
                >
                  Thank you, <strong>{submittedData.name}</strong>. Your default email client was opened to deliver this inquiry directly to{" "}
                  <span style={{ color: "#ff790c", fontWeight: 600 }}>{PERSONAL_INFO.socials.email}</span>.
                </p>

                {/* Quick Action Options */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    maxWidth: "420px",
                    margin: "0 auto 20px",
                  }}
                >
                  {/* Gmail Web 1-Click compose */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      PERSONAL_INFO.socials.email
                    )}&su=${encodeURIComponent(
                      `[${submittedData.projectType}] Portfolio Inquiry from ${submittedData.name}`
                    )}&body=${encodeURIComponent(
                      `Hi Prerit,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nProject Type: ${submittedData.projectType}\n\nMessage:\n${submittedData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.play("tap")}
                    className="btn btn-secondary"
                    style={{
                      padding: "11px 16px",
                      fontSize: "0.88rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: isLight ? "#ffffff" : "rgba(255, 255, 255, 0.06)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.14)",
                      color: isLight ? "#0f172a" : "#ffffff",
                      textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={15} color="#ea4335" />
                    <span>Open in Gmail Web (1-Click)</span>
                  </a>

                  {/* Copy formatted text button */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.play("coin");
                      const fullText = `To: ${PERSONAL_INFO.socials.email}\nSubject: [${submittedData.projectType}] Portfolio Inquiry from ${submittedData.name}\n\nHi Prerit,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nProject Type: ${submittedData.projectType}\n\nMessage:\n${submittedData.message}`;
                      navigator.clipboard.writeText(fullText);
                      setCopiedAll(true);
                      setTimeout(() => setCopiedAll(false), 2200);
                    }}
                    className="btn btn-secondary"
                    style={{
                      padding: "11px 16px",
                      fontSize: "0.88rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: isLight ? "#ffffff" : "rgba(255, 255, 255, 0.06)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.14)",
                      color: isLight ? "#0f172a" : "#ffffff",
                    }}
                  >
                    {copiedAll ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
                    <span>{copiedAll ? "Message Copied to Clipboard!" : "Copy Full Message"}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.play("tap");
                    setSubmitted(false);
                    setSubmittedData(null);
                    setFormState({
                      name: "",
                      email: "",
                      projectType: "Full-Time Mobile Engineering",
                      message: "",
                    });
                  }}
                  className="btn btn-secondary"
                  style={{
                    padding: "8px 18px",
                    fontSize: "0.84rem",
                    border: "none",
                    background: "transparent",
                    color: isLight ? "#64748b" : "#94a3b8",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: isLight ? "#334155" : "#cbd5e1",
                      marginBottom: "6px",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.35)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: isLight ? "#0f172a" : "#fff",
                      fontSize: "0.92rem",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: isLight ? "#334155" : "#cbd5e1",
                      marginBottom: "6px",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.35)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: isLight ? "#0f172a" : "#fff",
                      fontSize: "0.92rem",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: isLight ? "#334155" : "#cbd5e1",
                      marginBottom: "6px",
                    }}
                  >
                    Project Type / Engagement
                  </label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.35)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: isLight ? "#0f172a" : "#fff",
                      fontSize: "0.92rem",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  >
                    <option value="Full-Time Mobile Engineering">Full-Time Mobile Engineering</option>
                    <option value="Mobile Architecture Consulting">Mobile Architecture Consulting</option>
                    <option value="Contract Flutter App Build">Contract Flutter App Build</option>
                    <option value="Performance & 120 FPS Audit">Performance &amp; 120 FPS Audit</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: isLight ? "#334155" : "#cbd5e1",
                      marginBottom: "6px",
                    }}
                  >
                    Message / Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your mobile vision, timelines, or engineering challenge..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: isLight ? "#f8fafc" : "rgba(0, 0, 0, 0.35)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: isLight ? "#0f172a" : "#fff",
                      fontSize: "0.92rem",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{
                      padding: "14px",
                      fontSize: "0.95rem",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? "Dispatching..." : "Send Inquiry"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenDirectGmail}
                    className="btn btn-secondary"
                    style={{
                      padding: "11px 16px",
                      fontSize: "0.86rem",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: isLight ? "#f8fafc" : "rgba(255, 255, 255, 0.04)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
                      color: isLight ? "#475569" : "#cbd5e1",
                    }}
                  >
                    <ExternalLink size={14} color="#ea4335" />
                    <span>Prefer Gmail Web? Open Directly in Gmail</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
