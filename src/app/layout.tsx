import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#fcfbfa" },
  ],
};

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body suppressHydrationWarning style={{ fontFamily: "var(--font-sans)" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
