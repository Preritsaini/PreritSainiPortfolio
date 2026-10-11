import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://preritsaini.dev"),
  title: "Prerit Saini | Flutter Software Engineer",
  description:
    "Portfolio of Prerit Saini, Flutter Software Engineer with 1+ year of experience shipping production mobile apps across iOS and Android with Clean Architecture, Riverpod, Provider, and Flame engine.",
  keywords: [
    "Flutter Developer",
    "Prerit Saini",
    "Dart",
    "Flutter Software Engineer",
    "Mobile Developer",
    "iOS Developer",
    "Android Developer",
    "Riverpod",
    "Provider",
    "Clean Architecture",
    "Flame Engine",
    "Dehradun India",
  ],
  authors: [{ name: "Prerit Saini" }],
  openGraph: {
    title: "Prerit Saini | Flutter Software Engineer",
    description:
      "Crafting 60-120 FPS Native Experiences with Flutter & Dart across iOS and Android.",
    type: "website",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: "var(--font-sans)" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
