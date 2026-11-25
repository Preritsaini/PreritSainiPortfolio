"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";
import { sound } from "../utils/audioSynth";

const SimulatorSection = dynamic(
  () => import("../components/SimulatorSection").then((m) => m.SimulatorSection)
);
const ProjectsSection = dynamic(
  () => import("../components/ProjectsSection").then((m) => m.ProjectsSection)
);
const AppleBentoGrid = dynamic(
  () => import("../components/AppleBentoGrid").then((m) => m.AppleBentoGrid)
);
const ArchitectureSection = dynamic(
  () => import("../components/ArchitectureSection").then((m) => m.ArchitectureSection)
);
const SkillsSection = dynamic(
  () => import("../components/SkillsSection").then((m) => m.SkillsSection)
);
const EngagementSection = dynamic(
  () => import("../components/EngagementSection").then((m) => m.EngagementSection)
);
const ExperienceSection = dynamic(
  () => import("../components/ExperienceSection").then((m) => m.ExperienceSection)
);
const ResumeDownloadSection = dynamic(
  () => import("../components/ResumeDownloadSection").then((m) => m.ResumeDownloadSection)
);
const ContactSection = dynamic(
  () => import("../components/ContactSection").then((m) => m.ContactSection)
);
const ResumeModal = dynamic(
  () => import("../components/ResumeModal").then((m) => m.ResumeModal),
  { ssr: false }
);
const ContactDrawer = dynamic(
  () => import("../components/ContactDrawer").then((m) => m.ContactDrawer),
  { ssr: false }
);

export default function Home() {
  const [hotReloadCount, setHotReloadCount] = useState(0);
  const [isHotReloading, setIsHotReloading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const triggerGlobalHotReload = () => {
    sound.play("reload");
    setIsHotReloading(true);
    setHotReloadCount((c) => c + 1);
    setTimeout(() => {
      setIsHotReloading(false);
    }, 450);
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "var(--bg-primary)" }}>
      {/* Slide-Over Contact Drawer (Glitch-Free & Smooth Transition) */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Curriculum Vitae ATS & ATS-Friendly Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Global Hot Reload Flash Animation Effect */}
      {isHotReloading && <div className="hot-reload-flash" />}

      {/* Floating Midu Studio Navigation Header & Dropdown Drawer */}
      <Navbar
        onTriggerHotReload={triggerGlobalHotReload}
        isHotReloading={isHotReloading}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Pure Midu Studio Hero: Manifesto, Live Local Time & Full-Width Moving Red Gradient */}
      <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Interactive Mobile Simulator Laboratory */}
      <SimulatorSection hotReloadTrigger={hotReloadCount} />

      {/* Highlights: Featured Production Mobile Systems */}
      <ProjectsSection />

      {/* Pro Performance Bento Grid */}
      <AppleBentoGrid />

      {/* High Standards: Flutter Deep Dive & Clean Architecture */}
      <ArchitectureSection />

      {/* Tools & Ecosystem Mastery */}
      <SkillsSection />

      {/* Midu-Style Engagement Models: Choose Your Pace */}
      <EngagementSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Professional Track Record & Impact */}
      <ExperienceSection />

      {/* Official Curriculum Vitae & PDF Download Segment */}
      <ResumeDownloadSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Contact & Inquiries */}
      <ContactSection onOpenResume={() => setIsResumeOpen(true)} />

      {/* Studio Footer */}
      <Footer />
    </main>
  );
}
