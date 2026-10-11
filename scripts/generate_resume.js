const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResume(outputPath) {
  // A4 size: 595.28 x 841.89 points
  // 36pt margins (~0.5 inch)
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 32, left: 36, right: 36 },
    info: {
      Title: 'Prerit Saini - Flutter Software Engineer Resume',
      Author: 'Prerit Saini',
      Subject: 'Resume / Curriculum Vitae',
      Keywords: 'Flutter, Dart, Mobile Developer, Software Engineer, iOS, Android, Clean Architecture',
    },
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Palette: Modern executive navy/slate
  const PRIMARY = '#0f172a'; // Deep obsidian slate
  const ACCENT = '#0284c7';  // Tech cyan/blue
  const TEXT = '#334155';    // Charcoal body
  const MUTED = '#64748b';   // Slate grey
  const LINE = '#cbd5e1';    // Divider line

  // 1. HEADER
  doc
    .font('Helvetica-Bold')
    .fontSize(22)
    .fillColor(PRIMARY)
    .text('PRERIT SAINI', { characterSpacing: 0.5 });

  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(ACCENT)
    .text('FLUTTER SOFTWARE ENGINEER', { characterSpacing: 0.8 });

  doc.moveDown(0.25);

  // Contact info bar
  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor(TEXT)
    .text(
      'Dehradun, India (Available Remote Worldwide)   |   ' +
      '+91 9105023038   |   ' +
      'sainiprerit6@gmail.com',
      { continued: false }
    );

  // Links line
  doc
    .font('Helvetica-Bold')
    .fontSize(8.5)
    .fillColor(ACCENT)
    .text('LinkedIn: ', { continued: true })
    .font('Helvetica')
    .fillColor(TEXT)
    .text('linkedin.com/in/prerit-saini-3b99a62b0', {
      link: 'https://www.linkedin.com/in/prerit-saini-3b99a62b0/?isSelfProfile=true',
      underline: false,
      continued: true,
    })
    .fillColor(MUTED)
    .text('   |   ', { continued: true })
    .font('Helvetica-Bold')
    .fillColor(ACCENT)
    .text('GitHub: ', { continued: true })
    .font('Helvetica')
    .fillColor(TEXT)
    .text('github.com/Preritsaini', {
      link: 'https://github.com/Preritsaini',
      underline: false,
    });

  doc.moveDown(0.4);

  // Helper for Section Headers
  function sectionHeader(title) {
    doc.moveDown(0.35);
    const y = doc.y;
    doc
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .fillColor(PRIMARY)
      .text(title.toUpperCase(), { characterSpacing: 0.8 });

    // Underline rule
    doc
      .strokeColor(ACCENT)
      .lineWidth(1)
      .moveTo(36, doc.y + 2)
      .lineTo(559, doc.y + 2)
      .stroke();

    doc.moveDown(0.4);
  }

  // 2. PROFESSIONAL SUMMARY
  sectionHeader('Professional Summary');
  doc
    .font('Helvetica')
    .fontSize(8.8)
    .fillColor(TEXT)
    .lineGap(1.5)
    .text(
      'Results-driven Flutter Software Engineer with 1+ year of professional experience building and deploying ' +
      'high-performance iOS and Android applications across fintech, fitness, and e-commerce domains. Specialized in ' +
      'Clean Architecture, reactive state management (Provider, Riverpod, BLoC), and optimizing mobile rendering pipelines ' +
      'for locked 60–120 FPS performance. Proven track record reducing production app bundle sizes by ~18% and cutting UI ' +
      'feature turnaround times by 20–25% through modular design systems.'
    );

  // 3. TECHNICAL SKILLS
  sectionHeader('Technical Skills');
  const skills = [
    { label: 'Languages', items: 'Dart, JavaScript, C++, Go, Python, SQL' },
    { label: 'Mobile & Frameworks', items: 'Flutter 3.x, Firebase, Flame Engine, Hive (AES-256), SQLite, REST APIs' },
    { label: 'State & Architecture', items: 'Clean Architecture, MVVM, Provider, Riverpod, BLoC, Repository Pattern' },
    { label: 'Tools & Ecosystem', items: 'Git, GitHub, GitHub Actions (CI/CD), Android Studio, Postman, Razorpay SDK, Fastlane' },
    { label: 'Core Competencies', items: 'Widget Rebuild Profiling, Offline-First Sync, Responsive UI/UX, Native Platform Channels' },
  ];

  skills.forEach((s) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .fillColor(PRIMARY)
      .text(`•  ${s.label}: `, { continued: true })
      .font('Helvetica')
      .fillColor(TEXT)
      .text(s.items);
    doc.moveDown(0.12);
  });

  // 4. PROFESSIONAL EXPERIENCE
  sectionHeader('Professional Experience');

  const experience = [
    {
      role: 'Software Development Engineer I (Flutter)',
      company: 'Net Stratix Technologies',
      period: 'Sep 2025 – Present',
      location: 'India',
      points: [
        'Owned end-to-end feature delivery for production cross-platform Flutter applications on iOS and Android, serving 10,000+ active users.',
        'Profiled widget rebuild trees and network waterfalls, cutting app build size by ~18% and eliminating dropped frames during intensive checkout and transaction flows.',
        'Engineered scalable, reusable UI components following Clean Architecture and Riverpod, reducing development cycle time for new screens by 20–25%.',
        'Implemented secure RESTful API integrations with token refresh mechanisms, biometric verification, and structured exception handling.',
      ],
    },
    {
      role: 'Flutter Developer',
      company: 'FittVybe',
      period: 'Apr 2025 – Sep 2025',
      location: 'India',
      points: [
        'Developed core fitness app modules including interactive user onboarding, daily activity tracking, and multimedia content feeds.',
        'Designed and documented a standardized cross-screen widget and theme library, reducing duplicate UI code across the application by 30%.',
        'Collaborated in bi-weekly agile sprints alongside backend and design teams, rapidly iterating features based on user engagement feedback.',
      ],
    },
    {
      role: 'Flutter Intern',
      company: 'Team Infits',
      period: 'Apr 2024 – Jun 2024',
      location: 'India',
      points: [
        'Built core e-commerce purchase flows including dynamic product listing grids, cart state management, and multi-step checkout with form validation.',
        'Diagnosed and resolved responsive layout bugs across varied screen sizes and aspect ratios ahead of app store releases.',
      ],
    },
  ];

  experience.forEach((exp, idx) => {
    // Header row: Role + Date
    doc
      .font('Helvetica-Bold')
      .fontSize(9.2)
      .fillColor(PRIMARY)
      .text(exp.role, { continued: true })
      .font('Helvetica-Bold')
      .fillColor(ACCENT)
      .text(`  |  ${exp.company}`, { continued: true })
      .font('Helvetica')
      .fillColor(MUTED)
      .text(` (${exp.period})`, { align: 'left' });

    doc.moveDown(0.15);

    exp.points.forEach((pt) => {
      doc
        .font('Helvetica')
        .fontSize(8.3)
        .fillColor(TEXT)
        .lineGap(1)
        .text(`•  ${pt}`, { indent: 10 });
      doc.moveDown(0.08);
    });

    if (idx < experience.length - 1) doc.moveDown(0.25);
  });

  // 5. FEATURED PROJECTS
  sectionHeader('Featured Projects');

  const projects = [
    {
      name: 'ReadHub — E-Book Reader & Audio Suite',
      tech: 'Flutter 3, Dart, BLoC, Hive, Node.js, AWS S3',
      points: [
        'Engineered high-performance pagination layout canvas with custom Skia rendering, eliminating frame drops during rapid book browsing.',
        'Integrated encrypted offline-first Hive caching and synchronized background audio narration streaming with sub-10ms offset alignment.',
      ],
    },
    {
      name: 'CronoSwap — Skill & Time Exchange Platform',
      tech: 'Flutter, Provider, REST APIs, Firebase, Clean Architecture',
      points: [
        'Developed a community time-banking mobile platform featuring scheduling calendars, skill matching, and interactive booking forms.',
      ],
    },
    {
      name: 'Stellar Jet — 2D High-Performance Arcade Game',
      tech: 'Flutter, Flame Engine, GLSL Shaders, Object Pooling',
      points: [
        'Engineered 2D mobile game sustaining locked 60 FPS via zero-garbage-collection object pooling and custom fragment shaders.',
      ],
    },
  ];

  projects.forEach((proj, idx) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor(PRIMARY)
      .text(proj.name, { continued: true })
      .font('Helvetica-Oblique')
      .fontSize(8)
      .fillColor(MUTED)
      .text(`  —  [${proj.tech}]`);

    doc.moveDown(0.1);

    proj.points.forEach((pt) => {
      doc
        .font('Helvetica')
        .fontSize(8.3)
        .fillColor(TEXT)
        .lineGap(1)
        .text(`•  ${pt}`, { indent: 10 });
      doc.moveDown(0.05);
    });

    if (idx < projects.length - 1) doc.moveDown(0.2);
  });

  // 6. EDUCATION
  sectionHeader('Education');
  doc
    .font('Helvetica-Bold')
    .fontSize(9)
    .fillColor(PRIMARY)
    .text('Bachelor of Technology in Computer Science & Engineering', { continued: true })
    .font('Helvetica')
    .fillColor(MUTED)
    .text('  (2023 – Present)');

  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor(TEXT)
    .text('Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow, India');

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(MUTED)
    .text('Key Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems (DBMS), Operating Systems.');

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
}

// Safety: The user's authentic resume is 'Prerit Saini Resume 2.pdf' (95KB).
// Do not overwrite it or public/Prerit_Saini_Resume.pdf.
async function main() {
  console.log('Using authentic resume PDF from user: Prerit Saini Resume 2.pdf');
}

main().catch(console.error);
