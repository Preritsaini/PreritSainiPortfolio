"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "../utils/audioSynth";
import { useTheme } from "../context/ThemeContext";
import { FighterJetSvg } from "./FighterJetSvg";
import {
  BookOpen,
  Gamepad2,
  Wallet,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  TrendingUp,
  Volume2,
  VolumeX,
  Layers,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Fingerprint,
  Sliders,
  CheckCircle2,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Maximize2,
  RefreshCw,
  Search,
  Bookmark,
  Headphones,
  Settings,
  Cpu,
  Activity,
  Flame,
  Star,
  Lock,
  Unlock,
  CreditCard,
  QrCode,
  Copy,
  ArrowRight,
  Share2,
  Rocket,
  Trophy,
  LogOut,
  Crosshair,
  X,
  Send,
  TrendingDown,
} from "lucide-react";

interface FlutterSimulatorProps {
  externalReloadTrigger?: number;
}

export const FlutterSimulator: React.FC<FlutterSimulatorProps> = ({ externalReloadTrigger }) => {
  const { theme: siteTheme } = useTheme();
  const isLight = siteTheme === "light";

  // Device Form Factor: Phone, Tablet, Laptop
  const [deviceType, setDeviceType] = useState<"phone" | "tablet" | "laptop">("phone");

  // App Switcher
  const [activeApp, setActiveApp] = useState<"readhub" | "cyberrunner" | "finpulse">("readhub");
  const [platformMode, setPlatformMode] = useState<"ios" | "android">("ios");
  const [showWidgetInspector, setShowWidgetInspector] = useState(false);
  const [selectedWidgetNode, setSelectedWidgetNode] = useState<string | null>("BlocBuilder");
  const [isReloading, setIsReloading] = useState(false);
  const [reloadNotice, setReloadNotice] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  // ==========================================================================
  // 1. ReadHub App State (Illustrated Storybook & Audio Player)
  // ==========================================================================
  const [activeBook, setActiveBook] = useState<"voyager" | "architect">("voyager");
  const [readerTheme, setReaderTheme] = useState<"dark" | "sepia" | "cream" | "cyber">("dark");
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(28);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState<"1.0x" | "1.5x" | "2.0x">("1.0x");

  // ReadHub Audio Progress & Paragraph Sync
  useEffect(() => {
    if (activeApp !== "readhub" || !isPlayingAudio) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1.6));
      setActiveSentenceIndex((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeApp, isPlayingAudio]);

  // ==========================================================================
  // 2. STELLAR JET Real Game State & Active Flame Engine Loop
  // ==========================================================================
  const [gameView, setGameView] = useState<"menu" | "flight">("menu");
  const [jetPositionX, setJetPositionX] = useState(0); // in pixels relative to center
  const [gameScore, setGameScore] = useState(1450);
  const [gameCoins, setGameCoins] = useState(38);
  const [lasersFired, setLasersFired] = useState<Array<{ id: number; leftX: number; rightX: number; bottom: number }>>([]);
  const [enemies, setEnemies] = useState<Array<{ id: number; x: number; bottom: number; hp: number; speed: number }>>([
    { id: 1, x: -35, bottom: 330, hp: 1, speed: 2.2 },
    { id: 2, x: 40, bottom: 260, hp: 1, speed: 2.6 },
  ]);
  const [explosions, setExplosions] = useState<Array<{ id: string; x: number; bottom: number; text: string; createdAt: number }>>([]);
  const [thrusterPulse, setThrusterPulse] = useState(1);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const flightStageRef = useRef<HTMLDivElement>(null);

  // Thruster animation loop
  useEffect(() => {
    if (activeApp !== "cyberrunner" || gameView !== "flight") return;
    const interval = setInterval(() => {
      setThrusterPulse((p) => (p === 1 ? 1.3 : 1));
    }, 140);
    return () => clearInterval(interval);
  }, [activeApp, gameView]);

  // Fire twin plasma bolts
  const fireTwinLasers = () => {
    sound.play("coin");
    const newLaser = {
      id: Date.now() + Math.random(),
      leftX: jetPositionX - 12,
      rightX: jetPositionX + 12,
      bottom: 72, // starts at cannons right above jet
    };
    setLasersFired((prev) => [...prev.slice(-8), newLaser]);
    setGameScore((s) => s + 20);
  };

  // Continuous autofire while holding/dragging pointer
  useEffect(() => {
    if (!isPointerDown || activeApp !== "cyberrunner" || gameView !== "flight") return;
    const autoFire = setInterval(() => {
      fireTwinLasers();
    }, 160);
    return () => clearInterval(autoFire);
  }, [isPointerDown, activeApp, gameView, jetPositionX]);

  // Main Flame Game Loop (30 FPS ticker for physics, upward laser flight, downward enemies, collisions)
  useEffect(() => {
    if (activeApp !== "cyberrunner" || gameView !== "flight") return;

    let tick = 0;
    const loop = setInterval(() => {
      tick += 1;

      // 1. Advance lasers upward
      setLasersFired((prevLasers) =>
        prevLasers
          .map((l) => ({ ...l, bottom: l.bottom + 22 }))
          .filter((l) => l.bottom < 480)
      );

      // 2. Advance enemies downward & spawn new ones
      setEnemies((prevEnemies) => {
        const updated = prevEnemies
          .map((e) => ({ ...e, bottom: e.bottom - e.speed }))
          .filter((e) => e.bottom > 20);

        if (tick % 45 === 0 && updated.length < 3) {
          const randX = Math.floor(Math.random() * 120) - 60;
          updated.push({
            id: Date.now() + Math.random(),
            x: randX,
            bottom: 360,
            hp: 1,
            speed: 2.2 + Math.random() * 1.4,
          });
        }
        return updated;
      });

      // 3. Collision detection: lasers vs enemies
      setLasersFired((currLasers) => {
        const remainingLasers = [...currLasers];

        setEnemies((currEnemies) => {
          const remainingEnemies: typeof currEnemies = [];

          currEnemies.forEach((enemy) => {
            // Find laser that hits this enemy
            const hitIndex = remainingLasers.findIndex(
              (l) =>
                Math.abs(l.bottom - enemy.bottom) < 26 &&
                (Math.abs(l.leftX - enemy.x) < 24 || Math.abs(l.rightX - enemy.x) < 24)
            );

            if (hitIndex !== -1) {
              // Enemy destroyed!
              remainingLasers.splice(hitIndex, 1);
              sound.play("reload");
              setGameScore((s) => s + 100);
              setGameCoins((c) => c + 1);

              // Spawn explosion popup with guaranteed unique string ID
              const uniqueExpId = `exp-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
              setExplosions((exps) => [
                ...exps.slice(-3),
                { id: uniqueExpId, x: enemy.x, bottom: enemy.bottom, text: "+100 💥", createdAt: Date.now() },
              ]);
            } else {
              remainingEnemies.push(enemy);
            }
          });

          return remainingEnemies;
        });

        return remainingLasers;
      });

      // Clean old explosions after 550ms
      setExplosions((exps) => exps.filter((exp) => Date.now() - exp.createdAt < 550));
    }, 35);

    return () => clearInterval(loop);
  }, [activeApp, gameView]);

  // Swipe / Drag coordinate calculator
  const updateJetFromPointerX = (clientX: number) => {
    if (!flightStageRef.current) return;
    const rect = flightStageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relX = clientX - centerX;
    const maxClamp = Math.min(rect.width / 2 - 34, 75);
    setJetPositionX(Math.max(-maxClamp, Math.min(maxClamp, relX)));
  };

  const handleSteer = (direction: "left" | "right") => {
    sound.play("tap");
    setJetPositionX((prev) => {
      if (direction === "left") return Math.max(-75, prev - 24);
      return Math.min(75, prev + 24);
    });
  };

  // Keyboard navigation listener (Arrow keys, A/D, Spacebar)
  useEffect(() => {
    if (activeApp !== "cyberrunner" || gameView !== "flight") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        setJetPositionX((prev) => Math.max(-75, prev - 24));
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        setJetPositionX((prev) => Math.min(75, prev + 24));
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        fireTwinLasers();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeApp, gameView, jetPositionX]);

  // ==========================================================================
  // 3. FinPulse Luxury Neobank & DeFi Wallet State
  // ==========================================================================
  const [finpulseTab, setFinpulseTab] = useState<"portfolio" | "card" | "swap" | "yield">("portfolio");
  const [hideBalance, setHideBalance] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<"BTC" | "ETH" | "SOL" | "USDC">("BTC");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1D");
  const [balanceUSD, setBalanceUSD] = useState(124850.75);
  const [isScanningBiometric, setIsScanningBiometric] = useState(false);
  const [txToast, setTxToast] = useState<string | null>(null);
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);
  const [stakingYieldEarned, setStakingYieldEarned] = useState(384.2);
  const [chartScrubIndex, setChartScrubIndex] = useState<number | null>(null);
  const [swapAmount, setSwapAmount] = useState("0.5");
  const [showReceiveQr, setShowReceiveQr] = useState(false);

  // Live Staking Yield Accrual (ticks up real-time by +$0.03 every 2s)
  useEffect(() => {
    if (activeApp !== "finpulse") return;
    const interval = setInterval(() => {
      setStakingYieldEarned((prev) => +(prev + 0.03).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, [activeApp]);

  // Hot Reload action
  const triggerHotReload = () => {
    sound.play("reload");
    setIsReloading(true);
    setReloadNotice("⚡ Hot Reload: 1 of 589 libraries in 34ms (State Preserved across all viewports)");
    setTimeout(() => {
      setIsReloading(false);
    }, 450);
    setTimeout(() => {
      setReloadNotice(null);
    }, 3800);
  };

  useEffect(() => {
    if (externalReloadTrigger && externalReloadTrigger > 0) {
      triggerHotReload();
    }
  }, [externalReloadTrigger]);

  // Audio timer simulation
  useEffect(() => {
    if (!isPlayingAudio) return;
    const interval = setInterval(() => {
      setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 300);
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // FinPulse Biometric transaction simulator
  const handleSimulateTrade = (type: "send" | "swap" | "harvest") => {
    sound.play("biometric");
    setIsScanningBiometric(true);
    setTimeout(() => {
      setIsScanningBiometric(false);
      sound.play("coin");
      if (type === "swap") {
        setBalanceUSD((b) => b + 1420);
        setTxToast("✓ Swapped 0.5 ETH ➔ 0.0262 BTC via zkSync Era • +$1,420.00");
      } else if (type === "harvest") {
        setBalanceUSD((b) => b + stakingYieldEarned);
        setStakingYieldEarned(0);
        setTxToast(`✓ Harvested $${stakingYieldEarned.toFixed(2)} Staking Yield to Wallet!`);
      } else {
        setBalanceUSD((b) => Math.max(0, b - 50));
        setTxToast("✓ Sent $50.00 instantly with zero gas fee (ERC-4337 Account Abstraction)!");
      }
      setTimeout(() => setTxToast(null), 4000);
    }, 1100);
  };

  // ReadHub Theme Tokens & Palettes
  const readerThemeMap = {
    dark: {
      bg: "#0a0f1d",
      surface: "rgba(255, 255, 255, 0.05)",
      border: "rgba(255, 255, 255, 0.08)",
      text: "#f1f5f9",
      textMuted: "#94a3b8",
      accent: "#ff790c",
      quoteBg: "rgba(255, 121, 12, 0.08)",
      quoteBorder: "#ff790c",
      cardBg: "rgba(0, 0, 0, 0.45)",
      dockBg: "rgba(10, 15, 29, 0.94)",
      badgeBg: "rgba(255, 121, 12, 0.18)",
    },
    sepia: {
      bg: "#201a15",
      surface: "rgba(255, 255, 255, 0.05)",
      border: "rgba(245, 230, 211, 0.12)",
      text: "#f5e6d3",
      textMuted: "#bcaaa4",
      accent: "#f59e0b",
      quoteBg: "rgba(245, 158, 11, 0.1)",
      quoteBorder: "#f59e0b",
      cardBg: "rgba(18, 14, 11, 0.55)",
      dockBg: "rgba(32, 26, 21, 0.94)",
      badgeBg: "rgba(245, 158, 11, 0.18)",
    },
    cream: {
      bg: "#fbf6ec",
      surface: "rgba(0, 0, 0, 0.04)",
      border: "rgba(0, 0, 0, 0.09)",
      text: "#292524",
      textMuted: "#78716c",
      accent: "#c2410c",
      quoteBg: "rgba(194, 65, 12, 0.08)",
      quoteBorder: "#c2410c",
      cardBg: "rgba(255, 255, 255, 0.9)",
      dockBg: "rgba(251, 246, 236, 0.95)",
      badgeBg: "rgba(194, 65, 12, 0.12)",
    },
    cyber: {
      bg: "#050f24",
      surface: "rgba(56, 189, 248, 0.06)",
      border: "rgba(56, 189, 248, 0.15)",
      text: "#e0f2fe",
      textMuted: "#7dd3fc",
      accent: "#38bdf8",
      quoteBg: "rgba(56, 189, 248, 0.1)",
      quoteBorder: "#38bdf8",
      cardBg: "rgba(3, 10, 26, 0.65)",
      dockBg: "rgba(5, 15, 36, 0.94)",
      badgeBg: "rgba(56, 189, 248, 0.18)",
    },
  };

  // Storybook Chapters (The Starlight Voyager: Illustrated Edition)
  const storyChapters = [
    {
      id: 1,
      chapterNumber: "CHAPTER I",
      title: "The Spire on the Astral Sea",
      subtitle: "The Beacon of the Lost Constellation",
      image: "/books/chapter1.jpg",
      imageCaption: "Fig 1.1 — The Solitary Beacon over the Stardust Deep",
      quote: "Some stars do not simply burn; they remember. And when the tide turns in the sky, they sing to those who still know how to listen.",
      paragraphs: [
        "Beyond the whispering pines of Eldoria, where the velvet heavens bend down to brush the celestial ocean, a solitary beacon pierced the cosmic darkness. Every dusk, young Julian climbed the spiral stairs of the ancient starlight observatory, clutching his crystal tuning staff and listening to the hum of the astral tides.",
        "Beside him sat Lumi, the ember-tailed starlight fox, its luminous fur casting golden sparks across the worn parchment maps. Together, they watched the constellation of the Phoenix ignite into violet flame across the horizon, signaling that the long-dormant Celestial Gate was stirring once more.",
        "“Listen, Lumi,” Julian murmured, resting his hand upon the glowing brass chronometer. “The star currents are shifting northward tonight. The lost library of Aethelgard is calling to us across the nebulae.”",
      ],
      duration: "03:42",
      totalWords: 420,
    },
    {
      id: 2,
      chapterNumber: "CHAPTER II",
      title: "The Clockwork Fox & The Emerald Gate",
      subtitle: "Journey Through the Luminous Canopy",
      image: "/books/chapter2.jpg",
      imageCaption: "Fig 1.2 — Lumi leading Julian through the Luminous Fungi Grove",
      quote: "In the heart of the ancient forest, the boundary between machine and magic dissolved into quiet starlight.",
      paragraphs: [
        "The path to the Emerald Archway wound through trees older than memory, whose canopy glowed with pulsing turquoise spores and giant luminescent mushrooms. Lumi darted forward with silent, mechanical grace, its brass joints humming with quiet harmony as it guided Julian through the misty hollows.",
        "Runes carved into moss-covered stones flickered awake one by one as they passed, greeting the crystal staff with soft harmonic chimes. Each glyph echoed an ancient forgotten lullaby of the Sky Architects, who had shaped the floating continents before the stars learned to fall.",
        "“We are close now,” Julian whispered, kneeling to touch a flower that glowed like molten sapphire. The clockwork fox turned, its cyan eyes reflecting the crescent moon, and with a soft chirp nudged Julian toward the glowing stone archway.",
      ],
      duration: "04:15",
      totalWords: 485,
    },
    {
      id: 3,
      chapterNumber: "CHAPTER III",
      title: "The Floating Isles of Aurora",
      subtitle: "Sailing the Winds of Infinity",
      image: "/books/chapter3.jpg",
      imageCaption: "Fig 1.3 — The Sky-Galleon 'Aurora Star' approaching the Sunken Spire",
      quote: "To sail the celestial sky is to understand that gravity is only a suggestion made by fearful worlds.",
      paragraphs: [
        "High above the velvet cloud banks, islands of ancient granite floated like slumbering titans adrift in an ocean of violet and gold. Waterfalls tumbled from castle ramparts into pure infinity, dissolving into iridescent mist that drifted toward the crescent moon.",
        "The celestial sky-ship 'Aurora Star' caught the solar breeze in its gilded sails, propellers spinning with a resonant metallic thrum. From the prow, Julian watched flocks of starlight swallows dart between the floating spires, their wings leaving trails of phosphorescent glitter in the cool night air.",
        "Lumi curled beside the brass helm, watching the distant beacon tower grow larger with every heartbeat. At last, the legendary archives of the sky lay open before them, filled with every story the universe had ever whispered to the dark.",
      ],
      duration: "05:10",
      totalWords: 540,
    },
  ];

  // Technical Architecture Chapters (The Pragmatic Flutter Architect)
  const techChapters = [
    {
      id: 1,
      chapterNumber: "CHAPTER 1",
      title: "Reactive BLoC Pipelines",
      subtitle: "Deterministic State Machines",
      quote: "When state transitions flow through unidirectional Dart streams, the Flutter UI thread never drops below 120 FPS.",
      codeSnippet: `// Pure BLoC Event Loop
on<LoadChapterEvent>((event, emit) async {
  final doc = await hiveRepo.getDecrypted(event.id);
  emit(ReaderReadyState(doc, vSync: true));
});`,
      codePill: "StreamSubscription<ReaderState>",
      duration: "02:30",
    },
    {
      id: 2,
      chapterNumber: "CHAPTER 2",
      title: "AWS S3 Streaming & Voice Sync",
      subtitle: "Signed URLs & Drift Prevention",
      quote: "Pre-signed Amazon S3 streaming endpoints stream high-bitrate narration audio while custom offset listeners synchronize word highlighting within sub-10ms precision.",
      codeSnippet: `// High-Precision Audio Narration Offset
audioPlayer.onPositionChanged.listen((pos) {
  final highlightIndex = textOffsetMapper.resolve(pos);
  highlightBloc.add(UpdateHighlightEvent(highlightIndex));
});`,
      codePill: "AudioPlayers + OffsetMapper",
      duration: "03:15",
    },
    {
      id: 3,
      chapterNumber: "CHAPTER 3",
      title: "Hive Encrypted Persistence",
      subtitle: "Sub-5ms Document Retrieval",
      quote: "Encrypted AES-256 Hive boxes store serialized book chapters and annotations directly on the device, enabling instant offline reading with zero network latency.",
      codeSnippet: `// AES-256 Encrypted Offline Storage
final cipher = HiveAesCipher(secureStorageKey);
final box = await Hive.openBox<Chapter>('chapters', encryptionCipher: cipher);
return box.get(chapterId);`,
      codePill: "Hive.openBox('encrypted_chapters')",
      duration: "02:45",
    },
  ];

  // Asset price maps with rich SVG curves & live scrub data
  const assetData: Record<
    "BTC" | "ETH" | "SOL" | "USDC",
    {
      name: string;
      symbol: string;
      balance: string;
      fiatValue: string;
      price: string;
      change: string;
      color: string;
      accent: string;
      high24: string;
      low24: string;
      vol24: string;
      scrubPoints: Array<{ time: string; price: string }>;
      path: string;
      fillPath: string;
    }
  > = {
    BTC: {
      name: "Bitcoin",
      symbol: "BTC",
      balance: "1.184 BTC",
      fiatValue: "$79,825.28",
      price: "$67,420.00",
      change: "+4.8%",
      color: "#ff790c",
      accent: "#f59e0b",
      high24: "$68,190.00",
      low24: "$64,210.00",
      vol24: "$28.4B",
      scrubPoints: [
        { time: "00:00", price: "$64,210.00" },
        { time: "06:00", price: "$65,340.50" },
        { time: "12:00", price: "$66,180.00" },
        { time: "18:00", price: "$65,890.20" },
        { time: "24:00", price: "$67,420.00" },
      ],
      path: "M0,45 Q35,15 70,28 T140,12 T210,25 T280,6",
      fillPath: "M0,45 Q35,15 70,28 T140,12 T210,25 T280,6 L280,60 L0,60 Z",
    },
    ETH: {
      name: "Ethereum",
      symbol: "ETH",
      balance: "8.450 ETH",
      fiatValue: "$29,914.69",
      price: "$3,540.20",
      change: "+2.6%",
      color: "#38bdf8",
      accent: "#60a5fa",
      high24: "$3,595.00",
      low24: "$3,410.00",
      vol24: "$14.2B",
      scrubPoints: [
        { time: "00:00", price: "$3,410.00" },
        { time: "06:00", price: "$3,455.30" },
        { time: "12:00", price: "$3,512.00" },
        { time: "18:00", price: "$3,485.40" },
        { time: "24:00", price: "$3,540.20" },
      ],
      path: "M0,50 Q40,28 80,40 T150,18 T210,28 T280,10",
      fillPath: "M0,50 Q40,28 80,40 T150,18 T210,28 T280,10 L280,60 L0,60 Z",
    },
    SOL: {
      name: "Solana",
      symbol: "SOL",
      balance: "72.40 SOL",
      fiatValue: "$12,803.94",
      price: "$176.85",
      change: "+8.4%",
      color: "#a855f7",
      accent: "#ec4899",
      high24: "$182.10",
      low24: "$162.30",
      vol24: "$4.1B",
      scrubPoints: [
        { time: "00:00", price: "$162.30" },
        { time: "06:00", price: "$167.50" },
        { time: "12:00", price: "$173.80" },
        { time: "18:00", price: "$171.10" },
        { time: "24:00", price: "$176.85" },
      ],
      path: "M0,52 Q30,20 65,35 T135,10 T200,22 T280,4",
      fillPath: "M0,52 Q30,20 65,35 T135,10 T200,22 T280,4 L280,60 L0,60 Z",
    },
    USDC: {
      name: "USD Coin",
      symbol: "USDC",
      balance: "2,306.84 USDC",
      fiatValue: "$2,306.84",
      price: "$1.00",
      change: "+0.01%",
      color: "#22c55e",
      accent: "#10b981",
      high24: "$1.001",
      low24: "$0.999",
      vol24: "$6.8B",
      scrubPoints: [
        { time: "00:00", price: "$1.000" },
        { time: "06:00", price: "$1.001" },
        { time: "12:00", price: "$0.999" },
        { time: "18:00", price: "$1.000" },
        { time: "24:00", price: "$1.000" },
      ],
      path: "M0,30 Q70,30 140,29 T280,30",
      fillPath: "M0,30 Q70,30 140,29 T280,30 L280,60 L0,60 Z",
    },
  };

  // Dimensions
  const getDeviceDimensions = () => {
    switch (deviceType) {
      case "tablet":
        return { width: "min(100%, 640px)", height: "640px", radius: "28px" };
      case "laptop":
        return { width: "min(100%, 880px)", height: "560px", radius: "18px" };
      case "phone":
      default:
        return { width: "320px", height: "640px", radius: "44px" };
    }
  };

  const dims = getDeviceDimensions();

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* ==================================================================== */}
      {/* 1. SIMULATOR CONTROL BAR (FULLY ADAPTIVE FOR LIGHT AND DARK MODE)    */}
      {/* ==================================================================== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "22px",
          padding: "12px 18px",
          background: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(15, 23, 42, 0.82)",
          backdropFilter: "blur(14px)",
          borderRadius: "18px",
          border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isLight
            ? "0 10px 30px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)"
            : "0 12px 36px rgba(0, 0, 0, 0.45)",
          transition: "background 0.3s ease, border 0.3s ease",
        }}
      >
        {/* Left: App Switcher Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              sound.play("toggle");
              setActiveApp("readhub");
            }}
            style={appTabStyle(activeApp === "readhub", isLight)}
          >
            <BookOpen size={14} />
            <span>ReadHub</span>
          </button>
          <button
            onClick={() => {
              sound.play("toggle");
              setActiveApp("cyberrunner");
            }}
            style={appTabStyle(activeApp === "cyberrunner", isLight)}
          >
            <Gamepad2 size={14} />
            <span>Stellar Jet</span>
          </button>
          <button
            onClick={() => {
              sound.play("toggle");
              setActiveApp("finpulse");
            }}
            style={appTabStyle(activeApp === "finpulse", isLight)}
          >
            <Wallet size={14} />
            <span>FinPulse</span>
          </button>
        </div>

        {/* Center: Device Form Factor Selector (Phone, Tablet, Laptop) */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              display: "flex",
              background: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.5)",
              borderRadius: "10px",
              padding: "3px",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 121, 12, 0.25)",
              gap: "2px",
            }}
          >
            <button
              onClick={() => {
                sound.play("tap");
                setDeviceType("phone");
              }}
              style={deviceBtnStyle(deviceType === "phone", isLight)}
              title="Mobile Phone Viewport"
            >
              <Smartphone size={13} />
              <span>Phone</span>
            </button>
            <button
              onClick={() => {
                sound.play("tap");
                setDeviceType("tablet");
              }}
              style={deviceBtnStyle(deviceType === "tablet", isLight)}
              title="Tablet Viewport (iPad Split-View)"
            >
              <Tablet size={13} />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => {
                sound.play("tap");
                setDeviceType("laptop");
              }}
              style={deviceBtnStyle(deviceType === "laptop", isLight)}
              title="Laptop / Desktop Studio Monitor"
            >
              <Laptop size={13} />
              <span>Laptop</span>
            </button>
          </div>
        </div>

        {/* Right: Simulator Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleSound}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 9px",
              borderRadius: "8px",
              background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.05)",
              border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.1)",
              color: isMuted ? "#94a3b8" : "#ff790c",
              cursor: "pointer",
              fontSize: "0.72rem",
            }}
            title={isMuted ? "Unmute Simulator Sound" : "Mute Simulator Sound"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          {/* Platform toggle (Only on phone/tablet) */}
          {deviceType !== "laptop" && (
            <div
              style={{
                display: "flex",
                background: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.4)",
                borderRadius: "8px",
                padding: "2px",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                onClick={() => {
                  sound.play("tap");
                  setPlatformMode("ios");
                }}
                style={modeBtnStyle(platformMode === "ios", isLight)}
                title="iOS Cupertino Design"
              >
                iOS
              </button>
              <button
                onClick={() => {
                  sound.play("tap");
                  setPlatformMode("android");
                }}
                style={modeBtnStyle(platformMode === "android", isLight)}
                title="Android Material 3"
              >
                Material
              </button>
            </div>
          )}

          {/* Widget Inspector Toggle */}
          <button
            onClick={() => {
              sound.play("tap");
              setShowWidgetInspector(!showWidgetInspector);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 11px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 600,
              background: showWidgetInspector
                ? "rgba(255, 121, 12, 0.2)"
                : isLight
                ? "rgba(0, 0, 0, 0.04)"
                : "rgba(255, 255, 255, 0.05)",
              color: showWidgetInspector ? "#ff790c" : isLight ? "#475569" : "#94a3b8",
              border: `1px solid ${
                showWidgetInspector ? "#ff790c" : isLight ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
              }`,
              cursor: "pointer",
            }}
            title="Inspect Flutter Widget Hierarchy"
          >
            <Layers size={13} />
            <span>{showWidgetInspector ? "Inspector ON" : "Inspector"}</span>
          </button>

          {/* Hot Reload Button */}
          <button
            onClick={triggerHotReload}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #f59e0b, #ff790c)",
              color: "#050505",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(255, 121, 12, 0.35)",
            }}
            title="Perform Flutter Hot Reload"
          >
            <Zap size={13} fill="#050505" />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Terminal toast for Hot Reload */}
      {reloadNotice && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: "50%",
            transform: "translateX(-50%)",
            background: isLight ? "#ffffff" : "#090d16",
            border: "1px solid #ff790c",
            color: "#ff790c",
            padding: "8px 18px",
            borderRadius: "10px",
            fontSize: "0.78rem",
            fontFamily: "var(--font-mono)",
            zIndex: 100,
            boxShadow: "0 4px 28px rgba(255, 121, 12, 0.45)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            maxWidth: "90%",
            textAlign: "center",
          }}
        >
          <Zap size={14} />
          <span>{reloadNotice}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. PHYSICAL DEVICE SHELL & STUDIO LIGHTING                           */}
      {/* ==================================================================== */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: dims.width,
            height: dims.height,
            margin: "0 auto",
            background: "#030712",
            borderRadius: dims.radius,
            padding: deviceType === "laptop" ? "8px" : deviceType === "tablet" ? "10px" : "12px",
            boxShadow: isLight
              ? "0 30px 70px rgba(0, 0, 0, 0.22), 0 10px 24px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(255, 255, 255, 0.3)"
              : deviceType === "laptop"
              ? "0 30px 80px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 121, 12, 0.14), inset 0 0 4px rgba(255, 255, 255, 0.15)"
              : "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 121, 12, 0.15), inset 0 0 3px rgba(255, 255, 255, 0.2)",
            border: "4px solid #1e293b",
            position: "relative",
            overflow: "hidden",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s ease",
          }}
        >
          {/* Hardware Glass Reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "35%",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
              borderRadius: `${dims.radius} ${dims.radius} 0 0`,
              pointerEvents: "none",
              zIndex: 40,
            }}
          />

          {/* Screen Bezel Container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#0a0f1d",
              borderRadius: deviceType === "laptop" ? "12px" : deviceType === "tablet" ? "20px" : "34px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Hot Reload flash */}
            {isReloading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255, 121, 12, 0.35)",
                  zIndex: 90,
                  animation: "flashPulse 0.4s ease-out forwards",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Status Bar / Chrome Header */}
            {deviceType === "laptop" ? (
              <div
                style={{
                  height: 34,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(15, 23, 42, 0.95)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  zIndex: 30,
                  fontSize: "0.72rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(0, 0, 0, 0.4)",
                    padding: "3px 18px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#94a3b8",
                    fontSize: "0.68rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <span style={{ color: "#10b981" }}>🔒</span>
                  <span>https://stellar-jet.flame.dev/{activeApp}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b" }}>
                  <span style={{ fontSize: "0.65rem", color: "#38bdf8" }}>Flutter 3.24 • Flame Engine</span>
                </div>
              </div>
            ) : deviceType === "tablet" ? (
              <div
                style={{
                  height: 32,
                  padding: "0 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#f1f5f9",
                  zIndex: 30,
                  background: "rgba(0, 0, 0, 0.25)",
                }}
              >
                <span>9:41 AM</span>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#000",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#38bdf8", fontSize: "0.65rem" }}>Flame 2D • 120 FPS</span>
                  <div
                    style={{
                      width: 20,
                      height: 10,
                      border: "1px solid #f1f5f9",
                      borderRadius: "2px",
                      padding: "1px",
                    }}
                  >
                    <div style={{ width: "90%", height: "100%", background: "#10b981" }} />
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: 36,
                  padding: "0 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "#f1f5f9",
                  zIndex: 30,
                  background: "rgba(0, 0, 0, 0.25)",
                }}
              >
                <span>9:41</span>
                {platformMode === "ios" ? (
                  <div
                    style={{
                      width: 90,
                      height: 20,
                      background: "#000",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: "0 0 2px rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                    <span style={{ fontSize: "0.6rem", color: "#38bdf8" }}>Flutter 3.24</span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#000",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>5G</span>
                  <div
                    style={{
                      width: 18,
                      height: 9,
                      border: "1px solid #f1f5f9",
                      borderRadius: "2px",
                      padding: "1px",
                    }}
                  >
                    <div style={{ width: "80%", height: "100%", background: "#10b981" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Widget Inspector Tree Overlay */}
            {showWidgetInspector && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 85,
                  background: "rgba(3, 7, 18, 0.94)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px",
                  fontSize: "0.75rem",
                  color: "#e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "8px",
                    borderBottom: "1px solid rgba(255, 121, 12, 0.3)",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ff790c", fontWeight: 700 }}>
                    <Layers size={15} />
                    <span>Flutter DevTools • Widget Tree ({deviceType.toUpperCase()} Layout)</span>
                  </div>
                  <button
                    onClick={() => setShowWidgetInspector(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      fontSize: "0.72rem",
                    }}
                  >
                    ✕ Close
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "5px" }}>
                  {[
                    { name: "FlameGame (StellarJetGame)", depth: 0, type: "Flame Engine Root" },
                    { name: "FighterJetComponent (PositionComponent)", depth: 1, type: "Player Entity" },
                    { name: "LaserPool (ObjectPool)", depth: 2, type: "Zero-GC Projectiles" },
                    { name: "StarfieldParallaxComponent", depth: 2, type: "Multi-Layer Stars" },
                    { name: "SkiaCustomPainter (Impeller 120 FPS)", depth: 3, type: "Direct GPU Pipeline" },
                  ].map((node) => (
                    <button
                      key={node.name}
                      onClick={() => {
                        sound.play("tap");
                        setSelectedWidgetNode(node.name);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "5px 10px",
                        paddingLeft: `${node.depth * 14 + 8}px`,
                        borderRadius: "6px",
                        background: selectedWidgetNode === node.name ? "rgba(255, 121, 12, 0.2)" : "transparent",
                        border: `1px solid ${selectedWidgetNode === node.name ? "#ff790c" : "transparent"}`,
                        color: selectedWidgetNode === node.name ? "#ff790c" : "#cbd5e1",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>↳ {node.name}</span>
                      <span style={{ fontSize: "0.62rem", color: "#64748b" }}>{node.type}</span>
                    </button>
                  ))}
                </div>

                {selectedWidgetNode && (
                  <div
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      background: "rgba(0, 0, 0, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      fontSize: "0.68rem",
                      fontFamily: "var(--font-mono)",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ color: "#38bdf8", fontWeight: 700, marginBottom: "2px" }}>
                      Selected Node: {selectedWidgetNode}
                    </div>
                    <div style={{ color: "#10b981" }}>renderTime: 0.38ms • rebuildCount: 1 • 120 FPS Active</div>
                    <div style={{ color: "#94a3b8" }}>FormFactor: {deviceType} • Responsive Breakpoint: OK</div>
                  </div>
                )}
              </div>
            )}

            {/* ================================================================ */}
            {/* SCREEN 1: READHUB READER (ILLUSTRATED STORYBOOK & AUDIO DRAMA)    */}
            {/* ================================================================ */}
            {activeApp === "readhub" && (() => {
              const currentChapterList = activeBook === "voyager" ? storyChapters : techChapters;
              const currentChapter = currentChapterList[chapterIndex] || currentChapterList[0];
              const theme = readerThemeMap[readerTheme];

              return (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    background: theme.bg,
                    color: theme.text,
                    overflowY: "hidden",
                    position: "relative",
                    transition: "background 0.3s ease, color 0.3s ease",
                  }}
                >
                  {/* TABLET / LAPTOP LEFT SIDEBAR */}
                  {deviceType !== "phone" && (
                    <div
                      style={{
                        width: deviceType === "laptop" ? "250px" : "210px",
                        borderRight: `1px solid ${theme.border}`,
                        background: deviceType === "laptop" ? "rgba(0, 0, 0, 0.22)" : "rgba(0, 0, 0, 0.18)",
                        display: "flex",
                        flexDirection: "column",
                        flexShrink: 0,
                      }}
                    >
                      {/* Sidebar Header with Book Cover Thumbnail */}
                      <div
                        style={{
                          padding: "14px 14px 12px",
                          borderBottom: `1px solid ${theme.border}`,
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="/books/cover.jpg"
                          alt="The Starlight Voyager"
                          style={{
                            width: "48px",
                            height: "64px",
                            borderRadius: "6px",
                            objectFit: "cover",
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)",
                            border: `1px solid ${theme.border}`,
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: theme.text, lineHeight: 1.2 }}>
                            The Starlight Voyager
                          </div>
                          <div style={{ fontSize: "0.65rem", color: theme.accent, fontWeight: 700, marginTop: "2px" }}>
                            by Prerit Saini
                          </div>
                          <div style={{ fontSize: "0.6rem", color: theme.textMuted, marginTop: "1px" }}>
                            Illustrated Edition
                          </div>
                        </div>
                      </div>

                      {/* Book Type Switcher */}
                      <div style={{ padding: "8px 10px", display: "flex", gap: "4px" }}>
                        <button
                          onClick={() => {
                            sound.play("tap");
                            setActiveBook("voyager");
                            setChapterIndex(0);
                          }}
                          style={{
                            flex: 1,
                            padding: "5px 4px",
                            borderRadius: "6px",
                            fontSize: "0.63rem",
                            fontWeight: 700,
                            background: activeBook === "voyager" ? theme.accent : "transparent",
                            color: activeBook === "voyager" ? "#030712" : theme.textMuted,
                            border: `1px solid ${activeBook === "voyager" ? theme.accent : theme.border}`,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          📖 Storybook
                        </button>
                        <button
                          onClick={() => {
                            sound.play("tap");
                            setActiveBook("architect");
                            setChapterIndex(0);
                          }}
                          style={{
                            flex: 1,
                            padding: "5px 4px",
                            borderRadius: "6px",
                            fontSize: "0.63rem",
                            fontWeight: 700,
                            background: activeBook === "architect" ? theme.accent : "transparent",
                            color: activeBook === "architect" ? "#030712" : theme.textMuted,
                            border: `1px solid ${activeBook === "architect" ? theme.accent : theme.border}`,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          ⚙️ Flutter Tech
                        </button>
                      </div>

                      {/* Chapter Navigation Items */}
                      <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ fontSize: "0.64rem", fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", padding: "2px 6px" }}>
                          Chapters ({currentChapterList.length})
                        </div>
                        {currentChapterList.map((ch, idx) => {
                          const isActive = chapterIndex === idx;
                          return (
                            <button
                              key={`side-ch-${ch.id}-${idx}`}
                              onClick={() => {
                                sound.play("tap");
                                setChapterIndex(idx);
                              }}
                              style={{
                                textAlign: "left",
                                padding: "8px 10px",
                                borderRadius: "8px",
                                backgroundColor: isActive ? theme.badgeBg : "transparent",
                                border: `1px solid ${isActive ? theme.accent : "transparent"}`,
                                color: isActive ? theme.accent : theme.text,
                                cursor: "pointer",
                                fontSize: "0.72rem",
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {activeBook === "voyager" && "image" in ch && (
                                <img
                                  src={(ch as any).image}
                                  alt=""
                                  style={{
                                    width: "32px",
                                    height: "24px",
                                    borderRadius: "4px",
                                    objectFit: "cover",
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                              <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {ch.chapterNumber}
                                </div>
                                <div style={{ fontSize: "0.64rem", opacity: 0.85, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {ch.title}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Offline Cache Indicator */}
                      <div style={{ padding: "10px 14px", borderTop: `1px solid ${theme.border}`, fontSize: "0.65rem", color: theme.textMuted }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981", fontWeight: 600 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
                          <span>Hive AES-256 Box Cached</span>
                        </div>
                        <div style={{ fontSize: "0.6rem", opacity: 0.75, marginTop: "2px" }}>
                          Sub-5ms local document streaming
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MAIN READER CANVAS */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                    {/* Top Reader App Bar */}
                    <div
                      style={{
                        padding: deviceType === "phone" ? "8px 12px 6px" : "10px 16px",
                        borderBottom: `1px solid ${theme.border}`,
                        background: theme.surface,
                        backdropFilter: "blur(14px)",
                        zIndex: 10,
                        display: "flex",
                        flexDirection: deviceType === "phone" ? "column" : "row",
                        gap: deviceType === "phone" ? "6px" : "12px",
                        alignItems: deviceType === "phone" ? "stretch" : "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Row 1 / Left Column: Book Details & Quick Action Switcher */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "8px",
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0, flex: 1 }}>
                          <img
                            src="/books/cover.jpg"
                            alt="Cover"
                            style={{
                              width: "22px",
                              height: "28px",
                              borderRadius: "4px",
                              objectFit: "cover",
                              flexShrink: 0,
                              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                            }}
                          />
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: 800,
                                color: theme.text,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {activeBook === "voyager" ? "The Starlight Voyager" : "The Pragmatic Flutter Architect"}
                            </div>
                            <div
                              style={{
                                fontSize: "0.62rem",
                                color: theme.accent,
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              by Prerit Saini • Ch. {chapterIndex + 1} of {currentChapterList.length}
                            </div>
                          </div>
                        </div>

                        {/* Top Action Buttons (Tech/Story switch & Bookmark) */}
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                          <button
                            onClick={() => {
                              sound.play("tap");
                              setActiveBook((b) => (b === "voyager" ? "architect" : "voyager"));
                              setChapterIndex(0);
                            }}
                            style={{
                              padding: "3px 8px",
                              borderRadius: "5px",
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              background: theme.badgeBg,
                              color: theme.accent,
                              border: `1px solid ${theme.accent}`,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                            }}
                            title="Toggle Storybook / Flutter Architecture"
                          >
                            {activeBook === "voyager" ? "⚙️ Tech" : "📖 Story"}
                          </button>

                          <button
                            onClick={() => {
                              sound.play(isBookmarked ? "tap" : "coin");
                              setIsBookmarked(!isBookmarked);
                            }}
                            style={{
                              padding: "3px 6px",
                              borderRadius: "5px",
                              background: "transparent",
                              border: "none",
                              color: isBookmarked ? theme.accent : theme.textMuted,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                            title={isBookmarked ? "Remove Bookmark" : "Bookmark Chapter"}
                          >
                            <Bookmark size={15} fill={isBookmarked ? theme.accent : "none"} />
                          </button>
                        </div>
                      </div>

                      {/* Row 2 / Right Column: Reading Themes */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: deviceType === "phone" ? "space-between" : "flex-end",
                          gap: "6px",
                          flexShrink: 0,
                        }}
                      >
                        {deviceType === "phone" && (
                          <div style={{ fontSize: "0.62rem", color: theme.textMuted, fontWeight: 600 }}>
                            {activeBook === "voyager" ? "✨ Illustrated Edition" : "⚡ Clean Architecture"}
                          </div>
                        )}

                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          {(["dark", "sepia", "cream", "cyber"] as const).map((t) => (
                            <button
                              key={t}
                              onClick={() => {
                                sound.play("theme");
                                setReaderTheme(t);
                              }}
                              style={{
                                padding: "2px 7px",
                                borderRadius: "4px",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                textTransform: "capitalize",
                                background: readerTheme === t ? theme.accent : "rgba(120, 120, 120, 0.15)",
                                color: readerTheme === t ? "#030712" : theme.textMuted,
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Scrollable Reader Body Canvas */}
                    <div
                      style={{
                        flex: 1,
                        paddingTop: deviceType === "laptop" ? "28px" : deviceType === "tablet" ? "20px" : "14px",
                        paddingLeft: deviceType === "laptop" ? "48px" : deviceType === "tablet" ? "32px" : "16px",
                        paddingRight: deviceType === "laptop" ? "48px" : deviceType === "tablet" ? "32px" : "16px",
                        paddingBottom: "140px", // Generous room for docked audio bar!
                        fontSize: `${fontSize}px`,
                        lineHeight: 1.72,
                        overflowY: "auto",
                        fontFamily: fontFamily === "serif" ? "Georgia, Cambria, 'Times New Roman', serif" : "var(--font-sans)",
                        position: "relative",
                      }}
                    >
                      {/* Floating Bookmark Ribbon if active */}
                      {isBookmarked && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: "24px",
                            background: theme.accent,
                            color: "#030712",
                            padding: "6px 10px 8px",
                            fontSize: "0.62rem",
                            fontWeight: 800,
                            borderRadius: "0 0 6px 6px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            zIndex: 8,
                          }}
                        >
                          <span>🔖</span> Bookmarked
                        </div>
                      )}

                      {/* Chapter Badge & Title */}
                      <div
                        style={{
                          fontSize: "0.68rem",
                          color: theme.accent,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontWeight: 800,
                          marginBottom: "4px",
                        }}
                      >
                        {currentChapter.chapterNumber}
                      </div>

                      <div
                        style={{
                          fontSize: deviceType === "laptop" ? "1.45rem" : "1.2rem",
                          fontWeight: 900,
                          marginBottom: "4px",
                          letterSpacing: "-0.02em",
                          color: theme.text,
                          lineHeight: 1.25,
                        }}
                      >
                        {currentChapter.title}
                      </div>

                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: theme.textMuted,
                          marginBottom: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {currentChapter.subtitle}
                      </div>

                      {/* THE PHOTO / ILLUSTRATION (wiht some photu!) */}
                      {activeBook === "voyager" && "image" in currentChapter && (
                        <div
                          style={{
                            margin: "12px 0 18px",
                            borderRadius: "14px",
                            overflow: "hidden",
                            border: `1px solid ${theme.border}`,
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.45)",
                            background: "rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <img
                            src={(currentChapter as any).image}
                            alt={currentChapter.title}
                            style={{
                              width: "100%",
                              maxHeight: deviceType === "laptop" ? "320px" : deviceType === "tablet" ? "240px" : "195px",
                              objectFit: "cover",
                              display: "block",
                              transition: "transform 0.4s ease",
                            }}
                          />
                          <div
                            style={{
                              padding: "8px 12px",
                              background: theme.surface,
                              fontSize: "0.68rem",
                              color: theme.textMuted,
                              fontStyle: "italic",
                              borderTop: `1px solid ${theme.border}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{(currentChapter as any).imageCaption}</span>
                            <span style={{ fontSize: "0.62rem", color: theme.accent, fontWeight: 700, fontStyle: "normal" }}>
                              ✨ Illustrated Art
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Stylized Lyrical Pull-Quote Card */}
                      <div
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          background: theme.quoteBg,
                          borderLeft: `3px solid ${theme.quoteBorder}`,
                          fontStyle: "italic",
                          fontSize: "0.85rem",
                          marginBottom: "16px",
                          color: theme.text,
                          lineHeight: 1.5,
                        }}
                      >
                        “{currentChapter.quote}”
                      </div>

                      {/* Story Paragraphs with Drop-Cap on Chapter Start */}
                      {activeBook === "voyager" && "paragraphs" in currentChapter && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                          {((currentChapter as any).paragraphs as string[]).map((para, pIdx) => {
                            const isHighlighted = isPlayingAudio && activeSentenceIndex === pIdx;
                            const firstChar = para.charAt(0);
                            const restOfPara = para.slice(1);

                            return (
                              <div
                                key={`para-${pIdx}`}
                                style={{
                                  padding: isHighlighted ? "8px 12px" : "0",
                                  borderRadius: "8px",
                                  backgroundColor: isHighlighted ? theme.badgeBg : "transparent",
                                  borderLeft: isHighlighted ? `3px solid ${theme.accent}` : "3px solid transparent",
                                  transition: "all 0.3s ease",
                                  color: theme.text,
                                }}
                              >
                                {pIdx === 0 ? (
                                  <p style={{ margin: 0 }}>
                                    <span
                                      style={{
                                        float: "left",
                                        fontSize: "2.6rem",
                                        lineHeight: "0.85",
                                        fontWeight: 900,
                                        marginRight: "8px",
                                        color: theme.accent,
                                        fontFamily: "Georgia, serif",
                                      }}
                                    >
                                      {firstChar}
                                    </span>
                                    {restOfPara}
                                  </p>
                                ) : (
                                  <p style={{ margin: 0 }}>{para}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Technical Architecture Dart Code View (if switched to tech) */}
                      {activeBook === "architect" && "codeSnippet" in currentChapter && (
                        <div
                          style={{
                            padding: "12px 14px",
                            borderRadius: "12px",
                            background: "rgba(0, 0, 0, 0.6)",
                            border: `1px solid ${theme.border}`,
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.72rem",
                            color: "#e2e8f0",
                            marginBottom: "18px",
                            whiteSpace: "pre-wrap",
                            lineHeight: 1.55,
                          }}
                        >
                          <div style={{ color: "#64748b", marginBottom: "4px", fontSize: "0.64rem" }}>
                            {"// lib/features/reader/presentation/bloc/reader_bloc.dart"}
                          </div>
                          <code>{(currentChapter as any).codeSnippet}</code>
                        </div>
                      )}

                      {/* Previous / Next Chapter Buttons */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "20px",
                          paddingTop: "14px",
                          borderTop: `1px solid ${theme.border}`,
                        }}
                      >
                        <button
                          disabled={chapterIndex === 0}
                          onClick={() => {
                            sound.play("tap");
                            setChapterIndex((c) => Math.max(0, c - 1));
                          }}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            background: chapterIndex === 0 ? "rgba(120, 120, 120, 0.1)" : theme.surface,
                            color: chapterIndex === 0 ? theme.textMuted : theme.text,
                            border: `1px solid ${theme.border}`,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: chapterIndex === 0 ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          ‹ Previous Chapter
                        </button>

                        <span style={{ fontSize: "0.72rem", color: theme.textMuted, fontWeight: 600 }}>
                          Chapter {chapterIndex + 1} of {currentChapterList.length}
                        </span>

                        <button
                          disabled={chapterIndex === currentChapterList.length - 1}
                          onClick={() => {
                            sound.play("tap");
                            setChapterIndex((c) => Math.min(currentChapterList.length - 1, c + 1));
                          }}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            background: chapterIndex === currentChapterList.length - 1 ? "rgba(120, 120, 120, 0.1)" : theme.accent,
                            color: chapterIndex === currentChapterList.length - 1 ? theme.textMuted : "#030712",
                            border: `1px solid ${theme.border}`,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: chapterIndex === currentChapterList.length - 1 ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          Next Chapter ›
                        </button>
                      </div>
                    </div>

                    {/* DOCKED AUDIO NARATION BAR (Never overlaps reading text) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "10px 16px",
                        background: theme.dockBg,
                        backdropFilter: "blur(16px)",
                        borderTop: `1px solid ${theme.border}`,
                        boxShadow: "0 -8px 24px rgba(0, 0, 0, 0.45)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        zIndex: 20,
                      }}
                    >
                      {/* Audio Progress Scrubber */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.62rem", color: theme.textMuted }}>
                        <span>01:14</span>
                        <div
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                            setAudioProgress(newPct);
                            sound.play("tap");
                          }}
                          style={{
                            flex: 1,
                            height: "4px",
                            borderRadius: "2px",
                            background: "rgba(120, 120, 120, 0.25)",
                            position: "relative",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              width: `${audioProgress}%`,
                              height: "100%",
                              borderRadius: "2px",
                              background: theme.accent,
                              boxShadow: `0 0 8px ${theme.accent}`,
                              transition: "width 0.2s ease",
                            }}
                          />
                        </div>
                        <span>{(currentChapter as any).duration || "03:42"}</span>
                      </div>

                      {/* Audio Controls & Equalizer Row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <button
                            onClick={() => {
                              sound.play(isPlayingAudio ? "tap" : "coin");
                              setIsPlayingAudio(!isPlayingAudio);
                            }}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: theme.accent,
                              color: "#030712",
                              border: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              boxShadow: `0 2px 12px ${theme.accent}66`,
                              transition: "transform 0.15s ease",
                            }}
                            title={isPlayingAudio ? "Pause Narration" : "Play Narration"}
                          >
                            {isPlayingAudio ? <Pause size={14} fill="#030712" /> : <Play size={14} fill="#030712" style={{ marginLeft: "2px" }} />}
                          </button>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: theme.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              AWS S3 Narration Stream
                            </div>
                            <div style={{ fontSize: "0.62rem", color: theme.accent, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {isPlayingAudio ? "🎙️ Voice: Aura (Studio Master)" : "Paused • Click to Listen"}
                            </div>
                          </div>
                        </div>

                        {/* Animated Equalizer Waveform */}
                        <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "18px" }}>
                          {[14, 18, 9, 16, 12, 19, 10, 15, 8].map((h, i) => (
                            <div
                              key={i}
                              style={{
                                width: "2.5px",
                                height: isPlayingAudio ? `${h}px` : "3px",
                                background: theme.accent,
                                borderRadius: "1px",
                                transition: "height 0.2s ease",
                              }}
                            />
                          ))}
                        </div>

                        {/* Font Styling & Size Adjusters */}
                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                          <button
                            onClick={() => {
                              sound.play("tap");
                              setFontFamily((f) => (f === "serif" ? "sans" : "serif"));
                            }}
                            style={controlIconBtn}
                            title="Toggle Serif / Sans Font"
                          >
                            {fontFamily === "serif" ? "Serif" : "Sans"}
                          </button>
                          <button onClick={() => setFontSize((s) => Math.max(12, s - 1))} style={controlIconBtn} title="Smaller text">
                            A-
                          </button>
                          <button onClick={() => setFontSize((s) => Math.min(20, s + 1))} style={controlIconBtn} title="Larger text">
                            A+
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ================================================================ */}
            {/* SCREEN 2: STELLAR JET (EXACT USER SCREENSHOT 1 & 2 FLAME GAME)   */}
            {/* ================================================================ */}
            {activeApp === "cyberrunner" && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  background: "#080a1c",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 2A. STELLAR JET TITLE MENU SCREEN (SCREENSHOT 1) */}
                {gameView === "menu" ? (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px 24px",
                      position: "relative",
                      background: "radial-gradient(ellipse at 50% 30%, #171b3e 0%, #060814 80%)",
                      textAlign: "center",
                    }}
                  >
                    {/* Starfield Particles */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 140px, #38bdf8, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 220px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 220px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 280px 300px, #38bdf8, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 360px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 200px 420px, #ffffff, rgba(0,0,0,0))`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "320px 460px",
                        pointerEvents: "none",
                        opacity: 0.8,
                      }}
                    />

                    {/* Glowing STELLAR JET Title (Matching Screenshot 1) */}
                    <div style={{ marginBottom: "20px", zIndex: 10 }}>
                      <div
                        style={{
                          fontSize: "2.3rem",
                          fontWeight: 900,
                          letterSpacing: "0.18em",
                          color: "#ffffff",
                          textShadow:
                            "0 0 10px #38bdf8, 0 0 25px #00e5ff, 0 0 45px #0284c7, 0 0 70px rgba(0, 229, 255, 0.5)",
                          lineHeight: 1.15,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        STELLAR
                      </div>
                      <div
                        style={{
                          fontSize: "2.5rem",
                          fontWeight: 900,
                          letterSpacing: "0.22em",
                          color: "#00e5ff",
                          textShadow:
                            "0 0 12px #38bdf8, 0 0 30px #00e5ff, 0 0 55px #0284c7, 0 0 80px rgba(0, 229, 255, 0.7)",
                          lineHeight: 1.1,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        JET
                      </div>
                    </div>

                    {/* Gold Coin Pill (Matching Screenshot 1 Pixel-for-Pixel) */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 22px",
                        borderRadius: "9999px",
                        background: "rgba(22, 24, 44, 0.95)",
                        border: "1.5px solid #eab308",
                        color: "#ffffff",
                        fontWeight: 900,
                        fontSize: "1.05rem",
                        marginBottom: "12px",
                        zIndex: 10,
                        boxShadow: "0 0 16px rgba(234, 179, 8, 0.25)",
                      }}
                    >
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#eab308",
                          color: "#1e1b4b",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.78rem",
                          fontWeight: 900,
                        }}
                      >
                        $
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>{gameCoins}</span>
                    </div>

                    {/* Signed In As info (Matching Screenshot 1) */}
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "#4ade80",
                        fontWeight: 600,
                        marginBottom: "14px",
                        zIndex: 10,
                      }}
                    >
                      Signed in as prasunkushwaha25@gmail.com
                    </div>

                    {/* Callsign Pilot Box: LuciLu (Matching Screenshot 1) */}
                    <div
                      style={{
                        padding: "12px 20px",
                        borderRadius: "14px",
                        background: "rgba(24, 28, 48, 0.95)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "1rem",
                        marginBottom: "18px",
                        width: "80%",
                        maxWidth: "240px",
                        zIndex: 10,
                        letterSpacing: "0.02em",
                      }}
                    >
                      LuciLu
                    </div>

                    {/* Glowing Cyan ENGAGE Button (Matching Screenshot 1) */}
                    <button
                      onClick={() => {
                        sound.play("reload");
                        setGameView("flight");
                      }}
                      style={{
                        width: "80%",
                        maxWidth: "240px",
                        padding: "16px 24px",
                        borderRadius: "9999px",
                        background: "linear-gradient(180deg, #38bdf8 0%, #00b0ff 100%)",
                        color: "#050505",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        letterSpacing: "0.16em",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 0 32px rgba(0, 176, 255, 0.85), 0 4px 15px rgba(0, 0, 0, 0.5)",
                        transition: "all 0.2s ease",
                        marginBottom: "18px",
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      ENGAGE
                    </button>

                    {/* Secondary Navigation Row 1: HANGAR & LEADERBOARD (Matching Screenshot 1) */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "10px",
                        width: "80%",
                        maxWidth: "240px",
                        zIndex: 10,
                      }}
                    >
                      <button
                        onClick={() => sound.play("tap")}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: "9999px",
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1.5px solid #38bdf8",
                          color: "#ffffff",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        🚀 HANGAR
                      </button>
                      <button
                        onClick={() => sound.play("tap")}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: "9999px",
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1.5px solid #f59e0b",
                          color: "#ffffff",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        📊 LEADERBOARD
                      </button>
                    </div>

                    {/* Secondary Navigation Row 2: SETTINGS & LOGOUT (Matching Screenshot 1) */}
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        width: "80%",
                        maxWidth: "240px",
                        zIndex: 10,
                      }}
                    >
                      <button
                        onClick={() => sound.play("tap")}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: "9999px",
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1.5px solid rgba(255, 255, 255, 0.2)",
                          color: "#94a3b8",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        ⚙️ SETTINGS
                      </button>
                      <button
                        onClick={() => sound.play("tap")}
                        style={{
                          flex: 1,
                          padding: "8px 10px",
                          borderRadius: "9999px",
                          background: "rgba(15, 23, 42, 0.8)",
                          border: "1.5px solid #ef4444",
                          color: "#f87171",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        ↪️ LOGOUT
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 2B. LIVE STELLAR JET SPACE FLIGHT COMBAT (SCREENSHOT 2) */
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      background: "#080a1c",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Game HUD (Matching Screenshot 2 Pixel-for-Pixel) */}
                    <div
                      style={{
                        padding: "12px 18px 8px",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        background: "rgba(0, 0, 0, 0.55)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        zIndex: 20,
                      }}
                    >
                      {/* Left: Score : 0 with mint green rectangular health bar directly below (Screenshot 2) */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#ffffff", fontFamily: "var(--font-mono)", letterSpacing: "0.03em" }}>
                          Score : {gameScore}
                        </span>
                        <div
                          style={{
                            width: 88,
                            height: 14,
                            borderRadius: "1px",
                            background: "#6ee7b7", // Mint green health bar from Screenshot 2
                            boxShadow: "0 0 12px rgba(110, 231, 183, 0.7)",
                          }}
                        />
                      </div>

                      {/* Right: Coins : 0 with LVL 1 directly below (Screenshot 2) */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-end" }}>
                        <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#facc15", fontFamily: "var(--font-mono)", letterSpacing: "0.03em" }}>
                          Coins : {gameCoins}
                        </span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#38bdf8", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
                          LVL 1
                        </span>
                      </div>
                    </div>

                    {/* Space Combat Stage with Click & Swipe Drag Controls */}
                    <div
                      ref={flightStageRef}
                      onPointerDown={(e) => {
                        setIsPointerDown(true);
                        updateJetFromPointerX(e.clientX);
                        fireTwinLasers();
                      }}
                      onPointerMove={(e) => {
                        if (isPointerDown) {
                          updateJetFromPointerX(e.clientX);
                        }
                      }}
                      onPointerUp={() => setIsPointerDown(false)}
                      onPointerLeave={() => setIsPointerDown(false)}
                      onTouchStart={(e) => {
                        setIsPointerDown(true);
                        if (e.touches[0]) {
                          updateJetFromPointerX(e.touches[0].clientX);
                          fireTwinLasers();
                        }
                      }}
                      onTouchMove={(e) => {
                        if (e.touches[0]) {
                          updateJetFromPointerX(e.touches[0].clientX);
                        }
                      }}
                      onTouchEnd={() => setIsPointerDown(false)}
                      onClick={(e) => {
                        updateJetFromPointerX(e.clientX);
                        fireTwinLasers();
                      }}
                      style={{
                        flex: 1,
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        paddingBottom: "24px",
                        overflow: "hidden",
                        cursor: "crosshair",
                        userSelect: "none",
                        touchAction: "none",
                      }}
                    >
                      {/* Deep Space Infinite Streaming Parallax Starfields */}
                      <div
                        style={{
                          position: "absolute",
                          inset: "-400px 0 0 0",
                          backgroundImage: `radial-gradient(1.5px 1.5px at 25px 35px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 110px 140px, #38bdf8, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 200px 75px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 170px 220px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 270px 290px, #38bdf8, rgba(0,0,0,0))`,
                          backgroundRepeat: "repeat",
                          backgroundSize: "280px 400px",
                          animation: "starfieldScroll 2.8s linear infinite",
                          opacity: 0.9,
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: "-500px 0 0 0",
                          backgroundImage: `radial-gradient(1px 1px at 45px 55px, #e0f2fe, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 180px 190px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 260px 120px, #38bdf8, rgba(0,0,0,0))`,
                          backgroundRepeat: "repeat",
                          backgroundSize: "220px 500px",
                          animation: "starfieldScrollFast 1.6s linear infinite",
                          opacity: 0.7,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Interactive Swipe Guidance Overlay Pill */}
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          padding: "3px 12px",
                          borderRadius: "9999px",
                          background: "rgba(15, 23, 42, 0.75)",
                          border: "1px solid rgba(56, 189, 248, 0.4)",
                          color: "#38bdf8",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                          pointerEvents: "none",
                          zIndex: 10,
                          whiteSpace: "nowrap",
                        }}
                      >
                        👆 Click &amp; Swipe to Steer &amp; Fire!
                      </div>

                      {/* Enemy Space Drones Flying Downward */}
                      {enemies.map((enemy, idx) => (
                        <div
                          key={`sim-enemy-${enemy.id}-${idx}`}
                          style={{
                            position: "absolute",
                            bottom: `${enemy.bottom}px`,
                            left: `calc(50% + ${enemy.x}px)`,
                            transform: "translateX(-50%)",
                            zIndex: 16,
                            filter: "drop-shadow(0 0 8px rgba(244, 63, 94, 0.8))",
                            pointerEvents: "none",
                          }}
                        >
                          <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
                            <path d="M14 22 L2 6 L8 2 L14 8 L20 2 L26 6 Z" fill="#e11d48" stroke="#f43f5e" strokeWidth="1.2" />
                            <circle cx="14" cy="11" r="3.5" fill="#fecdd3" />
                            <circle cx="6" cy="7" r="1.5" fill="#38bdf8" />
                            <circle cx="22" cy="7" r="1.5" fill="#38bdf8" />
                          </svg>
                        </div>
                      ))}

                      {/* Floating Explosion Popups */}
                      {explosions.map((exp, idx) => (
                        <div
                          key={`sim-exp-${exp.id}-${idx}`}
                          style={{
                            position: "absolute",
                            bottom: `${exp.bottom}px`,
                            left: `calc(50% + ${exp.x}px)`,
                            transform: "translateX(-50%)",
                            color: "#facc15",
                            fontWeight: 900,
                            fontSize: "0.85rem",
                            textShadow: "0 0 10px #f59e0b, 0 0 20px #ef4444",
                            animation: "flashPulse 0.4s ease-out",
                            pointerEvents: "none",
                            zIndex: 25,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {exp.text}
                        </div>
                      ))}

                      {/* Continuously Fired Twin Cyan Plasma Projectiles Flying Upward */}
                      {lasersFired.map((laser, idx) => (
                        <React.Fragment key={`sim-laser-${laser.id}-${idx}`}>
                          {/* Left Cannon Bolt */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: `${laser.bottom}px`,
                              left: `calc(50% + ${laser.leftX}px)`,
                              width: "4px",
                              height: "22px",
                              borderRadius: "2px",
                              background: "linear-gradient(180deg, #ffffff 0%, #00e5ff 100%)",
                              boxShadow: "0 0 14px #00e5ff, 0 0 28px #38bdf8",
                              transform: "translateX(-50%)",
                              zIndex: 15,
                              pointerEvents: "none",
                            }}
                          />
                          {/* Right Cannon Bolt */}
                          <div
                            style={{
                              position: "absolute",
                              bottom: `${laser.bottom}px`,
                              left: `calc(50% + ${laser.rightX}px)`,
                              width: "4px",
                              height: "22px",
                              borderRadius: "2px",
                              background: "linear-gradient(180deg, #ffffff 0%, #00e5ff 100%)",
                              boxShadow: "0 0 14px #00e5ff, 0 0 28px #38bdf8",
                              transform: "translateX(-50%)",
                              zIndex: 15,
                              pointerEvents: "none",
                            }}
                          />
                        </React.Fragment>
                      ))}

                      {/* The Fighter Jet Sprite (Bottom Center, Smooth Tracking) */}
                      <div
                        style={{
                          transform: `translateX(${jetPositionX}px)`,
                          transition: isPointerDown ? "none" : "transform 0.12s ease-out",
                          zIndex: 18,
                          pointerEvents: "none",
                        }}
                      >
                        <FighterJetSvg thrusterScale={thrusterPulse} />
                      </div>
                    </div>

                    {/* Flight Action Controls Bar */}
                    <div
                      style={{
                        padding: "10px 16px",
                        background: "rgba(0, 0, 0, 0.75)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => {
                          sound.play("tap");
                          setGameView("menu");
                        }}
                        className="midu-btn-secondary"
                        style={{ padding: "8px 12px", fontSize: "0.75rem", fontWeight: 700 }}
                      >
                        ‹ MENU
                      </button>

                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleSteer("left")}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.08)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            fontWeight: 800,
                          }}
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => handleSteer("right")}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            background: "rgba(255, 255, 255, 0.08)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            fontWeight: 800,
                          }}
                        >
                          ▶
                        </button>
                      </div>

                      <button
                        onClick={fireTwinLasers}
                        className="midu-btn-primary"
                        style={{
                          padding: "8px 18px",
                          fontSize: "0.82rem",
                          fontWeight: 900,
                          background: "linear-gradient(180deg, #00e5ff 0%, #00b0ff 100%)",
                          color: "#050505",
                        }}
                      >
                        🔥 FIRE
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================================================================ */}
            {/* SCREEN 3: FINPULSE (REDESIGNED LUXURY NEOBANK & CRYPTO WALLET)    */}
            {/* ================================================================ */}
            {activeApp === "finpulse" && (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  background: "linear-gradient(180deg, #050811 0%, #080d1a 100%)",
                  color: "#f8fafc",
                  overflowY: "auto",
                  position: "relative",
                }}
              >
                {/* 1. Neobank Top Identity & HUD Header */}
                <div
                  style={{
                    paddingTop: "12px",
                    paddingBottom: "10px",
                    paddingLeft: deviceType === "laptop" ? "24px" : "14px",
                    paddingRight: deviceType === "laptop" ? "24px" : "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(5, 8, 17, 0.88)",
                    backdropFilter: "blur(14px)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    position: "sticky",
                    top: 0,
                    zIndex: 20,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ff790c 0%, #f59e0b 100%)",
                        color: "#050505",
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        boxShadow: "0 0 14px rgba(255, 121, 12, 0.4)",
                      }}
                    >
                      PS
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>Prerit Saini</span>
                        <span
                          style={{
                            fontSize: "0.58rem",
                            paddingTop: "1px",
                            paddingBottom: "1px",
                            paddingLeft: "5px",
                            paddingRight: "5px",
                            borderRadius: "4px",
                            background: "rgba(255, 121, 12, 0.18)",
                            color: "#ff9d42",
                            fontWeight: 800,
                            letterSpacing: "0.05em",
                          }}
                        >
                          VIP BLACK
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.62rem", color: "#10b981" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 6px #10b981" }} />
                        <span>zkSync Era L2 • 14ms (Enclave Active)</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      onClick={() => {
                        sound.play("tap");
                        setShowReceiveQr(true);
                      }}
                      title="Show Receive QR"
                      style={{
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#cbd5e1",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                      }}
                    >
                      <QrCode size={13} color="#ff790c" />
                      {deviceType !== "phone" && <span>QR</span>}
                    </button>
                    <button
                      onClick={() => {
                        sound.play("toggle");
                        setHideBalance(!hideBalance);
                      }}
                      title="Toggle Privacy Mode"
                      style={{
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#94a3b8",
                        cursor: "pointer",
                      }}
                    >
                      {hideBalance ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                {/* 2. Dribbble-Style Neobank 4-Tab Navigation Rail */}
                <div
                  style={{
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    paddingLeft: deviceType === "laptop" ? "24px" : "14px",
                    paddingRight: deviceType === "laptop" ? "24px" : "14px",
                    background: "rgba(0, 0, 0, 0.25)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                    display: "flex",
                    gap: "6px",
                    overflowX: "auto",
                  }}
                >
                  {[
                    { id: "portfolio", label: "Portfolio", icon: Wallet },
                    { id: "card", label: "Titanium Card", icon: CreditCard },
                    { id: "swap", label: "Instant Swap", icon: RotateCcw },
                    { id: "yield", label: `Yield Vault ($${stakingYieldEarned.toFixed(0)})`, icon: Zap },
                  ].map((tab) => {
                    const active = finpulseTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sound.play("tap");
                          setFinpulseTab(tab.id as "portfolio" | "card" | "swap" | "yield");
                        }}
                        style={{
                          flex: deviceType === "phone" ? 1 : "initial",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                          paddingLeft: "11px",
                          paddingRight: "11px",
                          borderRadius: "9px",
                          fontSize: "0.72rem",
                          fontWeight: active ? 800 : 600,
                          background: active
                            ? "linear-gradient(135deg, rgba(255, 121, 12, 0.22), rgba(255, 121, 12, 0.08))"
                            : "rgba(255, 255, 255, 0.03)",
                          color: active ? "#ff9d42" : "#94a3b8",
                          border: active ? "1px solid rgba(255, 121, 12, 0.45)" : "1px solid rgba(255, 255, 255, 0.05)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          whiteSpace: "nowrap",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Icon size={12} color={active ? "#ff790c" : "#64748b"} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 3. Main Dynamic Neobank Viewports */}
                <div
                  style={{
                    flex: 1,
                    display: deviceType === "phone" ? "flex" : "grid",
                    gridTemplateColumns: deviceType === "laptop" ? "1.05fr 1.15fr" : "1fr 1fr",
                    gap: deviceType === "laptop" ? "20px" : "14px",
                    paddingTop: deviceType === "laptop" ? "20px" : "14px",
                    paddingBottom: deviceType === "laptop" ? "24px" : "18px",
                    paddingLeft: deviceType === "laptop" ? "24px" : "14px",
                    paddingRight: deviceType === "laptop" ? "24px" : "14px",
                    flexDirection: "column",
                  }}
                >
                  {/* TAB 1: PORTFOLIO OVERVIEW */}
                  {finpulseTab === "portfolio" && (
                    <>
                      {/* Left Column / Mobile Top: Net Worth Hero & Multi-Asset Rails */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {/* Hero Net Worth Card */}
                        <div
                          style={{
                            paddingTop: "18px",
                            paddingBottom: "18px",
                            paddingLeft: "18px",
                            paddingRight: "18px",
                            borderRadius: "18px",
                            background: "linear-gradient(135deg, rgba(255, 121, 12, 0.18) 0%, rgba(15, 23, 42, 0.88) 60%, rgba(6, 9, 19, 0.96) 100%)",
                            border: "1px solid rgba(255, 121, 12, 0.35)",
                            boxShadow: "0 14px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.66rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>
                              Total Net Worth Portfolio
                            </span>
                            <span
                              style={{
                                fontSize: "0.58rem",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                paddingLeft: "6px",
                                paddingRight: "6px",
                                borderRadius: "4px",
                                background: "rgba(16, 185, 129, 0.16)",
                                color: "#10b981",
                                fontWeight: 700,
                              }}
                            >
                              Riverpod 2.0 Live
                            </span>
                          </div>

                          <div style={{ fontSize: deviceType === "laptop" ? "2.1rem" : "1.85rem", fontWeight: 900, color: "#fff", marginTop: "6px", letterSpacing: "-0.02em" }}>
                            {hideBalance ? "••••••••••••" : `$${balanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "0.76rem", color: "#10b981", fontWeight: 800, display: "flex", alignItems: "center", gap: "3px" }}>
                              <ArrowUpRight size={13} /> +$4,812.30 (+4.02%)
                            </span>
                            <span style={{ fontSize: "0.64rem", color: "#64748b" }}>Past 24h</span>
                            <span
                              style={{
                                fontSize: "0.62rem",
                                color: "#f59e0b",
                                fontWeight: 700,
                                background: "rgba(245, 158, 11, 0.12)",
                                paddingTop: "1px",
                                paddingBottom: "1px",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                borderRadius: "4px",
                              }}
                            >
                              +$384.20 Staking Accrued
                            </span>
                          </div>
                        </div>

                        {/* Neobank Quick Action Rail */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                          <button
                            onClick={() => handleSimulateTrade("send")}
                            disabled={isScanningBiometric}
                            style={finActionButton}
                          >
                            <Send size={15} color="#10b981" />
                            <span style={{ fontSize: "0.68rem" }}>Send ($50)</span>
                          </button>
                          <button
                            onClick={() => {
                              sound.play("tap");
                              setShowReceiveQr(true);
                            }}
                            style={finActionButton}
                          >
                            <QrCode size={15} color="#38bdf8" />
                            <span style={{ fontSize: "0.68rem" }}>Receive</span>
                          </button>
                          <button
                            onClick={() => {
                              sound.play("tap");
                              setFinpulseTab("swap");
                            }}
                            style={finActionButton}
                          >
                            <RotateCcw size={15} color="#ff790c" />
                            <span style={{ fontSize: "0.68rem" }}>Swap DEX</span>
                          </button>
                          <button
                            onClick={() => {
                              sound.play("tap");
                              setFinpulseTab("card");
                            }}
                            style={finActionButton}
                          >
                            <CreditCard size={15} color="#a855f7" />
                            <span style={{ fontSize: "0.68rem" }}>Metal Card</span>
                          </button>
                        </div>

                        {/* Allocated Assets Holdings Deck */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.66rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              Allocated Holdings (4 Assets)
                            </span>
                            <span style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Tap to Inspect Chart</span>
                          </div>

                          {(["BTC", "ETH", "SOL", "USDC"] as const).map((key) => {
                            const item = assetData[key];
                            const isSelected = selectedAsset === key;
                            return (
                              <div
                                key={key}
                                onClick={() => {
                                  sound.play("tap");
                                  setSelectedAsset(key);
                                }}
                                style={{
                                  paddingTop: "9px",
                                  paddingBottom: "9px",
                                  paddingLeft: "12px",
                                  paddingRight: "12px",
                                  borderRadius: "12px",
                                  background: isSelected ? "rgba(255, 121, 12, 0.12)" : "rgba(255, 255, 255, 0.03)",
                                  border: isSelected ? "1px solid rgba(255, 121, 12, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  cursor: "pointer",
                                  transition: "all 0.18s ease",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                                  <div
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: "8px",
                                      background: `${item.color}20`,
                                      border: `1px solid ${item.color}60`,
                                      color: item.color,
                                      fontWeight: 900,
                                      fontSize: "0.68rem",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {item.symbol.substring(0, 3)}
                                  </div>
                                  <div>
                                    <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#fff" }}>{item.name}</div>
                                    <div style={{ fontSize: "0.64rem", color: "#94a3b8" }}>{item.balance}</div>
                                  </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>
                                    {hideBalance ? "••••" : item.fiatValue}
                                  </div>
                                  <div style={{ fontSize: "0.64rem", color: "#10b981", fontWeight: 700 }}>
                                    {item.price} ({item.change})
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Column / Mobile Bottom: Interactive Spline Chart & Ledger */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {/* Interactive Chart Container */}
                        <div
                          style={{
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                            borderRadius: "18px",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          {/* Asset Switcher & Timeframes Bar */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                            <div style={{ display: "flex", gap: "4px" }}>
                              {(["BTC", "ETH", "SOL", "USDC"] as const).map((a) => (
                                <button
                                  key={a}
                                  onClick={() => {
                                    sound.play("tap");
                                    setSelectedAsset(a);
                                  }}
                                  style={{
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderRadius: "7px",
                                    fontSize: "0.68rem",
                                    fontWeight: 800,
                                    background: selectedAsset === a ? assetData[a].color : "rgba(255, 255, 255, 0.05)",
                                    color: selectedAsset === a ? "#000" : "#94a3b8",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                  }}
                                >
                                  {a}
                                </button>
                              ))}
                            </div>

                            <div style={{ display: "flex", gap: "3px" }}>
                              {(["1H", "1D", "1W", "1M", "1Y"] as const).map((tf) => (
                                <button
                                  key={tf}
                                  onClick={() => {
                                    sound.play("tap");
                                    setSelectedTimeframe(tf);
                                  }}
                                  style={{
                                    paddingTop: "3px",
                                    paddingBottom: "3px",
                                    paddingLeft: "6px",
                                    paddingRight: "6px",
                                    borderRadius: "5px",
                                    fontSize: "0.62rem",
                                    fontWeight: selectedTimeframe === tf ? 800 : 600,
                                    background: selectedTimeframe === tf ? "rgba(255, 255, 255, 0.16)" : "transparent",
                                    color: selectedTimeframe === tf ? "#fff" : "#64748b",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                >
                                  {tf}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Price & 24h Stats HUD */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "10px" }}>
                            <div>
                              <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fff" }}>
                                {chartScrubIndex !== null
                                  ? assetData[selectedAsset].scrubPoints[chartScrubIndex]?.price || assetData[selectedAsset].price
                                  : assetData[selectedAsset].price}
                              </div>
                              <div style={{ fontSize: "0.64rem", color: "#94a3b8" }}>
                                {chartScrubIndex !== null
                                  ? `Scrubbing at ${assetData[selectedAsset].scrubPoints[chartScrubIndex]?.time} UTC`
                                  : `${assetData[selectedAsset].name} Live Price • 24h Vol ${assetData[selectedAsset].vol24}`}
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: 800 }}>
                                {assetData[selectedAsset].change}
                              </span>
                              <div style={{ fontSize: "0.6rem", color: "#64748b" }}>
                                H: {assetData[selectedAsset].high24} • L: {assetData[selectedAsset].low24}
                              </div>
                            </div>
                          </div>

                          {/* Hardware-Accelerated Scrubbable Spline Chart */}
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "110px",
                              cursor: "crosshair",
                            }}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const pct = Math.max(0, Math.min(1, x / rect.width));
                              const idx = Math.min(4, Math.floor(pct * 5));
                              if (idx !== chartScrubIndex) {
                                sound.play("tap");
                                setChartScrubIndex(idx);
                              }
                            }}
                            onMouseLeave={() => setChartScrubIndex(null)}
                          >
                            <svg viewBox="0 0 280 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                              <defs>
                                <linearGradient id={`grad-fin-${selectedAsset}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={assetData[selectedAsset].color} stopOpacity="0.4" />
                                  <stop offset="100%" stopColor={assetData[selectedAsset].color} stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <path d={assetData[selectedAsset].fillPath} fill={`url(#grad-fin-${selectedAsset})`} />
                              <path
                                d={assetData[selectedAsset].path}
                                fill="none"
                                stroke={assetData[selectedAsset].color}
                                strokeWidth="2.6"
                                strokeLinecap="round"
                              />

                              {/* Scrub Crosshair indicator */}
                              {chartScrubIndex !== null && (
                                <line
                                  x1={(chartScrubIndex / 4) * 280}
                                  y1="0"
                                  x2={(chartScrubIndex / 4) * 280}
                                  y2="60"
                                  stroke="rgba(255, 255, 255, 0.4)"
                                  strokeWidth="1.2"
                                  strokeDasharray="2,2"
                                />
                              )}

                              <circle
                                cx={chartScrubIndex !== null ? (chartScrubIndex / 4) * 280 : 280}
                                cy={chartScrubIndex !== null ? 20 + chartScrubIndex * 4 : 6}
                                r="4.5"
                                fill={assetData[selectedAsset].color}
                                filter="drop-shadow(0 0 6px rgba(255, 121, 12, 0.8))"
                              />
                            </svg>

                            {/* Floating Scrub HUD pill */}
                            {chartScrubIndex !== null && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-22px",
                                  left: `${Math.min(75, Math.max(25, (chartScrubIndex / 4) * 100))}%`,
                                  transform: "translateX(-50%)",
                                  background: "#0f172a",
                                  border: `1px solid ${assetData[selectedAsset].color}`,
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                  paddingLeft: "7px",
                                  paddingRight: "7px",
                                  borderRadius: "6px",
                                  fontSize: "0.62rem",
                                  fontWeight: 800,
                                  color: "#fff",
                                  pointerEvents: "none",
                                  whiteSpace: "nowrap",
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                                }}
                              >
                                {assetData[selectedAsset].scrubPoints[chartScrubIndex]?.price} ({assetData[selectedAsset].scrubPoints[chartScrubIndex]?.time})
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Recent Hardware Secure Activity Stream */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <span style={{ fontSize: "0.66rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            Secure Enclave Activity Ledger
                          </span>

                          {[
                            { title: "Staking Yield (Lido stETH 4.8%)", time: "2m ago", amount: "+$34.18", isCredit: true, icon: "↓" },
                            { title: "FinPulse Titanium Card (Apple Cupertino)", time: "1h ago", amount: "-$42.50", isCredit: false, icon: "↑" },
                            { title: "zkSync Era Swap (USDC ➔ SOL)", time: "4h ago", amount: "+8.40 SOL", isCredit: true, icon: "⇄" },
                            { title: "Zero Gas Deposit via Apple Pay", time: "Yesterday", amount: "+$2,500.00", isCredit: true, icon: "↓" },
                          ].map((tx, idx) => (
                            <div
                              key={idx}
                              style={{
                                paddingTop: "8px",
                                paddingBottom: "8px",
                                paddingLeft: "12px",
                                paddingRight: "12px",
                                borderRadius: "10px",
                                background: "rgba(255, 255, 255, 0.025)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "0.72rem",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ color: tx.isCredit ? "#10b981" : "#f43f5e", fontWeight: 900 }}>{tx.icon}</span>
                                <div>
                                  <div style={{ color: "#e2e8f0", fontWeight: 700 }}>{tx.title}</div>
                                  <div style={{ fontSize: "0.58rem", color: "#64748b" }}>{tx.time} • Verified on L2</div>
                                </div>
                              </div>
                              <span style={{ color: tx.isCredit ? "#10b981" : "#f1f5f9", fontWeight: 800 }}>{tx.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* TAB 2: TITANIUM CARD (THE DRIBBBLE SHOWSTOPPER) */}
                  {finpulseTab === "card" && (
                    <div style={{ gridColumn: deviceType === "phone" ? "initial" : "1 / -1", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "680px", margin: "0 auto", width: "100%" }}>
                      {/* 3D Angled Titanium Obsidian Metal Visa Card */}
                      <div
                        style={{
                          position: "relative",
                          borderRadius: "20px",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          paddingLeft: "22px",
                          paddingRight: "22px",
                          background: isCardFrozen
                            ? "linear-gradient(135deg, #0c2333 0%, #071724 50%, #040c14 100%)"
                            : "linear-gradient(135deg, #1e293b 0%, #0f172a 45%, #020617 100%)",
                          border: isCardFrozen ? "1px solid rgba(56, 189, 248, 0.6)" : "1px solid rgba(255, 255, 255, 0.22)",
                          boxShadow: isCardFrozen
                            ? "0 20px 45px rgba(14, 165, 233, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2)"
                            : "0 22px 50px rgba(0, 0, 0, 0.75), inset 0 1px 2px rgba(255, 255, 255, 0.28)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          minHeight: "200px",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {/* Metallic Sheen Diagonal Specular */}
                        <div
                          style={{
                            position: "absolute",
                            top: "-40%",
                            right: "-30%",
                            width: "200px",
                            height: "200px",
                            background: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)",
                            pointerEvents: "none",
                          }}
                        />

                        {/* Top Card Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "0.86rem", fontWeight: 900, color: "#f8fafc", letterSpacing: "0.12em" }}>
                              FINPULSE TITANIUM
                            </span>
                            <span
                              style={{
                                fontSize: "0.58rem",
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                paddingLeft: "6px",
                                paddingRight: "6px",
                                borderRadius: "4px",
                                background: "rgba(245, 158, 11, 0.18)",
                                color: "#f59e0b",
                                fontWeight: 800,
                              }}
                            >
                              PRIVATE CLIENT
                            </span>
                          </div>
                          {/* Contactless Wave Icon */}
                          <div style={{ color: "#94a3b8", display: "flex", alignItems: "center" }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                              <path d="M4 14.5a7 7 0 0 1 0-5" />
                              <path d="M8 17.5a11 11 0 0 1 0-11" />
                              <path d="M12 20.5a15 15 0 0 1 0-17" />
                            </svg>
                          </div>
                        </div>

                        {/* Middle Card Row: EMV Chip + Card Number */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "14px 0" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {/* Realistic EMV Gold Chip */}
                            <div
                              style={{
                                width: 36,
                                height: 26,
                                borderRadius: "5px",
                                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                                border: "1px solid #b45309",
                                position: "relative",
                                boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.3)",
                              }}
                            >
                              <div style={{ position: "absolute", top: "7px", left: "0", right: "0", height: "1px", background: "#b45309" }} />
                              <div style={{ position: "absolute", top: "18px", left: "0", right: "0", height: "1px", background: "#b45309" }} />
                              <div style={{ position: "absolute", top: "0", bottom: "0", left: "14px", width: "1px", background: "#b45309" }} />
                            </div>

                            {/* Card Number */}
                            <span style={{ fontSize: "1.05rem", color: "#f8fafc", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.18em", fontWeight: 700 }}>
                              4532 •••• •••• 8492
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              sound.play("tap");
                              setCardCopied(true);
                              setTimeout(() => setCardCopied(false), 2000);
                            }}
                            title="Copy Card Number"
                            style={{
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                              borderRadius: "6px",
                              background: "rgba(255, 255, 255, 0.08)",
                              border: "1px solid rgba(255, 255, 255, 0.12)",
                              color: cardCopied ? "#10b981" : "#cbd5e1",
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {cardCopied ? <Check size={11} /> : <Copy size={11} />}
                            <span>{cardCopied ? "Copied!" : "Copy"}</span>
                          </button>
                        </div>

                        {/* Bottom Card Row: Cardholder, Expiry, CVV, Visa */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                          <div>
                            <div style={{ fontSize: "0.56rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>CARDHOLDER</div>
                            <div style={{ fontSize: "0.78rem", color: "#fff", fontWeight: 800 }}>PRERIT SAINI</div>
                          </div>

                          <div>
                            <div style={{ fontSize: "0.56rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>EXPIRES</div>
                            <div style={{ fontSize: "0.78rem", color: "#fff", fontWeight: 800 }}>09/29</div>
                          </div>

                          <div>
                            <div style={{ fontSize: "0.56rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>CVV</div>
                            <button
                              onClick={() => {
                                sound.play("toggle");
                                setIsCardFlipped(!isCardFlipped);
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#f59e0b",
                                fontSize: "0.78rem",
                                fontWeight: 800,
                                cursor: "pointer",
                                padding: 0,
                              }}
                            >
                              {isCardFlipped ? "892" : "••• (Show)"}
                            </button>
                          </div>

                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "0.82rem", fontWeight: 900, color: "#fff", letterSpacing: "0.05em" }}>
                              VISA INFINITE
                            </div>
                            <div style={{ fontSize: "0.54rem", color: "#94a3b8" }}>TITANIUM DUAL-CHIP</div>
                          </div>
                        </div>

                        {/* Frozen Card Frosted Ice Overlay */}
                        {isCardFrozen && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(12, 35, 51, 0.78)",
                              backdropFilter: "blur(6px)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              zIndex: 10,
                            }}
                          >
                            <span style={{ fontSize: "1.6rem" }}>❄️</span>
                            <div style={{ fontSize: "0.85rem", fontWeight: 900, color: "#38bdf8", letterSpacing: "0.06em" }}>
                              CARD FROZEN FOR SECURITY
                            </div>
                            <div style={{ fontSize: "0.64rem", color: "#94a3b8" }}>
                              All contactless, online & ATM transactions are temporarily paused
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Smart Controls & Limits Deck */}
                      <div style={{ display: "grid", gridTemplateColumns: deviceType === "phone" ? "1fr" : "1fr 1fr", gap: "12px" }}>
                        {/* Freeze Switch & Spend Limit */}
                        <div
                          style={{
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            borderRadius: "14px",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#fff" }}>Freeze Physical Card</div>
                              <div style={{ fontSize: "0.62rem", color: "#94a3b8" }}>Instant lock/unlock via Secure Enclave</div>
                            </div>
                            <button
                              onClick={() => {
                                sound.play("toggle");
                                setIsCardFrozen(!isCardFrozen);
                              }}
                              style={{
                                paddingTop: "6px",
                                paddingBottom: "6px",
                                paddingLeft: "12px",
                                paddingRight: "12px",
                                borderRadius: "20px",
                                background: isCardFrozen ? "#38bdf8" : "rgba(255, 255, 255, 0.12)",
                                color: isCardFrozen ? "#000" : "#fff",
                                fontWeight: 800,
                                fontSize: "0.72rem",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {isCardFrozen ? "Frozen ❄️" : "Active 🟢"}
                            </button>
                          </div>

                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.66rem", color: "#94a3b8", marginBottom: "4px" }}>
                              <span>Monthly Spending Limit</span>
                              <span style={{ color: "#fff", fontWeight: 700 }}>$4,850 / $25,000 (19.4%)</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 3, background: "rgba(255, 255, 255, 0.08)", overflow: "hidden" }}>
                              <div style={{ width: "19.4%", height: "100%", background: "linear-gradient(90deg, #ff790c, #f59e0b)", borderRadius: 3 }} />
                            </div>
                          </div>
                        </div>

                        {/* Perks & Apple Wallet Integration */}
                        <div
                          style={{
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            borderRadius: "14px",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.68rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981" }}>
                              <CheckCircle2 size={13} />
                              <span>3.0% Unlimited Crypto Cashback on all spend</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#38bdf8" }}>
                              <CheckCircle2 size={13} />
                              <span>Zero Foreign Exchange Fees in 180+ countries</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#a855f7" }}>
                              <CheckCircle2 size={13} />
                              <span>Apple Pay Tokenized NFC Security (ECDSA)</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              sound.play("success");
                              setTxToast("✓ Apple Wallet NFC Token synced to Secure Enclave!");
                              setTimeout(() => setTxToast(null), 3000);
                            }}
                            style={{
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              paddingLeft: "14px",
                              paddingRight: "14px",
                              borderRadius: "10px",
                              background: "#000",
                              color: "#fff",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              fontSize: "0.74rem",
                              fontWeight: 800,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                            }}
                          >
                            <span> Add to Apple Wallet</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: INSTANT DEX SWAP (ZK-SYNC ZERO GAS) */}
                  {finpulseTab === "swap" && (
                    <div style={{ gridColumn: deviceType === "phone" ? "initial" : "1 / -1", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "480px", margin: "0 auto", width: "100%" }}>
                      <div
                        style={{
                          paddingTop: "16px",
                          paddingBottom: "16px",
                          paddingLeft: "18px",
                          paddingRight: "18px",
                          borderRadius: "18px",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#fff" }}>zkSync DEX Aggregator</span>
                          <span style={{ fontSize: "0.62rem", color: "#10b981", fontWeight: 700, background: "rgba(16, 185, 129, 0.15)", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px", borderRadius: "4px" }}>
                            ⚡ Zero Gas (EIP-4337)
                          </span>
                        </div>

                        {/* "You Pay" Card */}
                        <div
                          style={{
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                            borderRadius: "12px",
                            background: "rgba(0, 0, 0, 0.35)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.64rem", color: "#94a3b8", marginBottom: "6px" }}>
                            <span>You Pay</span>
                            <span>Balance: 8.45 ETH</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <input
                              type="text"
                              value={swapAmount}
                              onChange={(e) => setSwapAmount(e.target.value)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#fff",
                                fontSize: "1.4rem",
                                fontWeight: 900,
                                width: "120px",
                                outline: "none",
                              }}
                            />
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <button
                                onClick={() => {
                                  sound.play("tap");
                                  setSwapAmount("8.45");
                                }}
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                  paddingLeft: "6px",
                                  paddingRight: "6px",
                                  borderRadius: "4px",
                                  background: "rgba(255, 121, 12, 0.2)",
                                  color: "#ff9d42",
                                  fontSize: "0.6rem",
                                  fontWeight: 800,
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                MAX
                              </button>
                              <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#38bdf8", padding: "4px 8px", background: "rgba(56, 189, 248, 0.15)", borderRadius: "8px" }}>
                                ETH
                              </div>
                            </div>
                          </div>
                          <div style={{ fontSize: "0.62rem", color: "#64748b", marginTop: "4px" }}>
                            ≈ $1,770.10 USD
                          </div>
                        </div>

                        {/* Central Swap Reversal Flip Button */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "-6px", marginBottom: "-6px" }}>
                          <button
                            onClick={() => {
                              sound.play("tap");
                              setSwapAmount(swapAmount === "0.5" ? "1.0" : "0.5");
                            }}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "#ff790c",
                              border: "3px solid #080d1a",
                              color: "#050505",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              boxShadow: "0 4px 12px rgba(255, 121, 12, 0.4)",
                            }}
                          >
                            <RotateCcw size={15} />
                          </button>
                        </div>

                        {/* "You Receive" Card */}
                        <div
                          style={{
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            paddingLeft: "14px",
                            paddingRight: "14px",
                            borderRadius: "12px",
                            background: "rgba(0, 0, 0, 0.35)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.64rem", color: "#94a3b8", marginBottom: "6px" }}>
                            <span>You Receive (Estimated)</span>
                            <span>Balance: 1.18 BTC</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#10b981" }}>
                              {(parseFloat(swapAmount || "0") * 0.0524).toFixed(4)}
                            </div>
                            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ff790c", padding: "4px 8px", background: "rgba(255, 121, 12, 0.15)", borderRadius: "8px" }}>
                              BTC
                            </div>
                          </div>
                          <div style={{ fontSize: "0.62rem", color: "#64748b", marginTop: "4px" }}>
                            1 ETH = 0.0524 BTC • 0.05% Slippage Tolerance
                          </div>
                        </div>

                        {/* Route & Fee Breakdown */}
                        <div style={{ fontSize: "0.64rem", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px", paddingTop: "4px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Network Routing</span>
                            <span style={{ color: "#fff", fontWeight: 700 }}>zkSync Era Hyperchain</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Estimated Gas Fee</span>
                            <span style={{ color: "#10b981", fontWeight: 800 }}>$0.00 (Paymaster Sponsored)</span>
                          </div>
                        </div>

                        {/* Primary Swap CTA */}
                        <button
                          onClick={() => handleSimulateTrade("swap")}
                          disabled={isScanningBiometric}
                          style={{
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #ff790c 0%, #f59e0b 100%)",
                            color: "#050505",
                            fontWeight: 900,
                            fontSize: "0.85rem",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            boxShadow: "0 8px 22px rgba(255, 121, 12, 0.35)",
                          }}
                        >
                          <Zap size={16} />
                          <span>⚡ Swap with Apple FaceID</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: YIELD VAULT (DEFI ACCRUING STAKING) */}
                  {finpulseTab === "yield" && (
                    <div style={{ gridColumn: deviceType === "phone" ? "initial" : "1 / -1", display: "flex", flexDirection: "column", gap: "14px", maxWidth: "680px", margin: "0 auto", width: "100%" }}>
                      {/* Live Accruing Hero Card */}
                      <div
                        style={{
                          paddingTop: "18px",
                          paddingBottom: "18px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          borderRadius: "18px",
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(15, 23, 42, 0.88) 60%, rgba(6, 9, 19, 0.95) 100%)",
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          boxShadow: "0 14px 34px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.66rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.08em" }}>
                            Unclaimed Staking Rewards (Live Accruing)
                          </div>
                          <div style={{ fontSize: "2rem", fontWeight: 900, color: "#10b981", marginTop: "4px" }}>
                            +${stakingYieldEarned.toFixed(2)}
                          </div>
                          <div style={{ fontSize: "0.64rem", color: "#64748b" }}>
                            Ticks up real-time • Est. +$4.80 every 24 hours
                          </div>
                        </div>

                        <button
                          onClick={() => handleSimulateTrade("harvest")}
                          disabled={isScanningBiometric || stakingYieldEarned <= 0}
                          style={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            paddingLeft: "18px",
                            paddingRight: "18px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            color: "#fff",
                            fontWeight: 900,
                            fontSize: "0.78rem",
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: "0 6px 18px rgba(16, 185, 129, 0.35)",
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Harvest to Wallet</span>
                        </button>
                      </div>

                      {/* Staking Pools Deck */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span style={{ fontSize: "0.66rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Active Staking Pools (Audited Smart Contracts)
                        </span>

                        {[
                          { name: "Lido Liquid Staking (stETH)", apy: "4.8% APY", staked: "4.50 ETH ($15,930)", status: "Auto-Compounding", color: "#38bdf8" },
                          { name: "Solana Validator Node (JitoSOL)", apy: "7.4% APY", staked: "45.00 SOL ($7,958)", status: "MEV Boost Active", color: "#a855f7" },
                          { name: "MakerDAO US Treasury Notes (sUSDC)", apy: "5.2% APY", staked: "$1,500.00 USDC", status: "RWA Real Assets", color: "#22c55e" },
                        ].map((pool, i) => (
                          <div
                            key={i}
                            style={{
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              borderRadius: "14px",
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#fff" }}>{pool.name}</div>
                              <div style={{ fontSize: "0.64rem", color: "#94a3b8" }}>Staked: {pool.staked}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: "0.88rem", fontWeight: 900, color: pool.color }}>{pool.apy}</div>
                              <div style={{ fontSize: "0.58rem", color: "#10b981", fontWeight: 700 }}>{pool.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Security & Audit Certifications */}
                      <div
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "14px",
                          paddingRight: "14px",
                          borderRadius: "10px",
                          background: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          fontSize: "0.62rem",
                          color: "#94a3b8",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <ShieldCheck size={16} color="#10b981" />
                        <span>Contracts verified & audited by OpenZeppelin, CertiK & Trail of Bits • Insured up to $100M</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apple Secure Enclave FaceID Biometric Modal Overlay */}
                {isScanningBiometric && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0, 0, 0, 0.78)",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 50,
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "22px",
                        border: "2px solid #10b981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
                        background: "rgba(16, 185, 129, 0.1)",
                        animation: "pulse 1.5s infinite",
                      }}
                    >
                      <Fingerprint size={44} color="#10b981" />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#fff" }}>
                        Apple Secure Enclave
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#10b981", marginTop: "3px" }}>
                        Authenticating Biometric FaceID Signature...
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "#64748b", marginTop: "4px" }}>
                        zkSync Era Zero-Gas Cryptographic Authorization
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Receive QR Code Modal Drawer */}
                {showReceiveQr && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 45,
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        background: "#0b1120",
                        border: "1px solid rgba(255, 121, 12, 0.35)",
                        borderRadius: "20px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        paddingLeft: "22px",
                        paddingRight: "22px",
                        width: "100%",
                        maxWidth: "340px",
                        boxShadow: "0 20px 45px rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "14px",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() => {
                          sound.play("tap");
                          setShowReceiveQr(false);
                        }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "none",
                          color: "#94a3b8",
                          borderRadius: "50%",
                          width: 26,
                          height: 26,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={14} />
                      </button>

                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "0.88rem", fontWeight: 900, color: "#fff" }}>Receive Assets</div>
                        <div style={{ fontSize: "0.64rem", color: "#94a3b8" }}>Scan via any Web3 Wallet</div>
                      </div>

                      {/* High Precision SVG QR Pattern */}
                      <div
                        style={{
                          background: "#fff",
                          paddingTop: "14px",
                          paddingBottom: "14px",
                          paddingLeft: "14px",
                          paddingRight: "14px",
                          borderRadius: "14px",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        <svg width="140" height="140" viewBox="0 0 140 140" fill="#000">
                          {/* Corner Squares */}
                          <rect x="10" y="10" width="35" height="35" fill="#000" rx="4" />
                          <rect x="15" y="15" width="25" height="25" fill="#fff" rx="2" />
                          <rect x="20" y="20" width="15" height="15" fill="#ff790c" rx="1" />

                          <rect x="95" y="10" width="35" height="35" fill="#000" rx="4" />
                          <rect x="100" y="15" width="25" height="25" fill="#fff" rx="2" />
                          <rect x="105" y="20" width="15" height="15" fill="#ff790c" rx="1" />

                          <rect x="10" y="95" width="35" height="35" fill="#000" rx="4" />
                          <rect x="15" y="100" width="25" height="25" fill="#fff" rx="2" />
                          <rect x="20" y="105" width="15" height="15" fill="#ff790c" rx="1" />

                          {/* Data Pattern Modules */}
                          <rect x="55" y="15" width="8" height="8" fill="#000" />
                          <rect x="70" y="25" width="12" height="8" fill="#000" />
                          <rect x="55" y="45" width="30" height="8" fill="#000" />
                          <rect x="15" y="60" width="12" height="8" fill="#000" />
                          <rect x="35" y="60" width="18" height="8" fill="#000" />
                          <rect x="65" y="60" width="25" height="8" fill="#000" />
                          <rect x="105" y="60" width="20" height="8" fill="#000" />
                          <rect x="55" y="75" width="12" height="18" fill="#000" />
                          <rect x="80" y="75" width="14" height="8" fill="#000" />
                          <rect x="105" y="80" width="22" height="8" fill="#000" />
                          <rect x="65" y="105" width="20" height="8" fill="#000" />
                          <rect x="95" y="105" width="14" height="20" fill="#000" />
                          <rect x="115" y="115" width="12" height="12" fill="#000" />
                        </svg>
                      </div>

                      {/* Public Address Pill */}
                      <div
                        style={{
                          width: "100%",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          borderRadius: "10px",
                          background: "rgba(255, 255, 255, 0.05)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "0.68rem",
                          fontFamily: "var(--font-mono, monospace)",
                          color: "#cbd5e1",
                        }}
                      >
                        <span>0x71C9...8eB7</span>
                        <button
                          onClick={() => {
                            sound.play("tap");
                            setTxToast("✓ Public address copied to clipboard!");
                            setShowReceiveQr(false);
                            setTimeout(() => setTxToast(null), 3000);
                          }}
                          style={{
                            paddingTop: "3px",
                            paddingBottom: "3px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            borderRadius: "6px",
                            background: "#ff790c",
                            color: "#000",
                            border: "none",
                            fontWeight: 800,
                            cursor: "pointer",
                            fontSize: "0.62rem",
                          }}
                        >
                          Copy
                        </button>
                      </div>

                      <div style={{ fontSize: "0.58rem", color: "#64748b", textAlign: "center" }}>
                        Networks: Ethereum L1, zkSync Era, Arbitrum One, Optimism, Base
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Transaction Toast */}
                {txToast && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: "9px",
                      paddingBottom: "9px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      borderRadius: "12px",
                      background: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid #ff790c",
                      color: "#ff9d42",
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
                      zIndex: 60,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {txToast}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Home Indicator Line */}
            {deviceType !== "laptop" && (
              <div
                style={{
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 0, 0, 0.4)",
                  zIndex: 30,
                }}
              >
                <div
                  style={{
                    width: deviceType === "tablet" ? 140 : 100,
                    height: 4,
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Studio Monitor Stand for Laptop Mode */}
        {deviceType === "laptop" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "-2px",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: 120,
                height: 38,
                background: isLight
                  ? "linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%)"
                  : "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
                borderLeft: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.1)",
                borderRight: isLight ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
            <div
              style={{
                width: 260,
                height: 12,
                borderRadius: "4px 4px 10px 10px",
                background: isLight
                  ? "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)"
                  : "linear-gradient(180deg, #334155 0%, #0f172a 100%)",
                border: isLight ? "1px solid rgba(0, 0, 0, 0.12)" : "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: isLight
                  ? "0 14px 40px rgba(0, 0, 0, 0.15)"
                  : "0 14px 40px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 121, 12, 0.15)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const appTabStyle = (active: boolean, isLight: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "0.78rem",
  fontWeight: 600,
  background: active ? "rgba(255, 121, 12, 0.15)" : "transparent",
  color: active ? "#ff790c" : isLight ? "#475569" : "#94a3b8",
  border: `1px solid ${active ? "rgba(255, 121, 12, 0.4)" : "transparent"}`,
  cursor: "pointer",
  transition: "all 0.2s ease",
});

const deviceBtnStyle = (active: boolean, isLight: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px 10px",
  borderRadius: "7px",
  fontSize: "0.72rem",
  fontWeight: active ? 700 : 500,
  background: active ? "#ff790c" : "transparent",
  color: active ? "#050505" : isLight ? "#475569" : "#94a3b8",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
});

const modeBtnStyle = (active: boolean, isLight: boolean): React.CSSProperties => ({
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "0.68rem",
  fontWeight: 600,
  background: active ? (isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.15)") : "transparent",
  color: active ? (isLight ? "#0f172a" : "#fff") : isLight ? "#64748b" : "#64748b",
  border: "none",
  cursor: "pointer",
});

const themePillStyle = (active: boolean): React.CSSProperties => ({
  padding: "2px 7px",
  borderRadius: "4px",
  fontSize: "0.62rem",
  fontWeight: 700,
  background: active ? "#ff790c" : "rgba(255, 255, 255, 0.08)",
  color: active ? "#030712" : "#94a3b8",
  border: "none",
  cursor: "pointer",
});

const controlIconBtn: React.CSSProperties = {
  padding: "3px 7px",
  borderRadius: "4px",
  fontSize: "0.65rem",
  fontWeight: 700,
  background: "rgba(255, 255, 255, 0.08)",
  color: "#f1f5f9",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  cursor: "pointer",
};

const finActionButton: React.CSSProperties = {
  flex: 1,
  padding: "8px 6px",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "#f1f5f9",
  fontSize: "0.72rem",
  fontWeight: 600,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  cursor: "pointer",
};
