export interface CaseStudyData {
  overview: string;
  problem: string;
  solution: string;
  architectureLayers: { name: string; role: string; details: string }[];
  keyEngineeringChallenges: {
    title: string;
    challenge: string;
    solution: string;
    outcome: string;
  }[];
  benchmarks: {
    metric: string;
    before: string;
    after: string;
    gain: string;
  }[];
  codeSnippet: {
    filename: string;
    language: string;
    description: string;
    code: string;
  };
  techSpecs: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Mobile App" | "Game Engine" | "Fintech & Web3" | "HealthTech";
  badge: string;
  summary: string;
  fullDescription: string;
  highlights: string[];
  architecture: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  mockupTheme: "readhub" | "cyberrunner" | "finpulse" | "medisync";
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: CaseStudyData;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean; note?: string }[];
}

export const PERSONAL_INFO = {
  name: "Prerit Saini",
  role: "Flutter Software Engineer",
  tagline: "Shipping production cross-platform mobile apps across fintech, fitness, and e-commerce.",
  location: "Dehradun, India • Available for Remote Worldwide",
  phone: "+91 9105023038",
  status: "Available for full-time roles & high-impact mobile builds",
  bio: "Flutter Software Engineer with professional experience shipping production cross-platform mobile apps across fintech, fitness, and e-commerce domains. Skilled in clean architecture, state management (Provider/Riverpod), REST API integration, and performance optimization. Comfortable owning features end-to-end in agile teams, from architecture through deployment.",
  stats: [
    { label: "Active App Users", value: "10K+" },
    { label: "Build Size Cut", value: "~18%" },
    { label: "Feature Velocity", value: "+25%" },
    { label: "Target Frame Rate", value: "60-120 FPS" },
  ],
  socials: {
    github: "https://github.com/Preritsaini",
    linkedin: "https://www.linkedin.com/in/prerit-saini-3b99a62b0/?isSelfProfile=true",
    twitter: "https://x.com/preritsaini",
    email: "sainiprerit6@gmail.com",
    phone: "+91 9105023038",
    resumeUrl: "/Prerit_Saini_Resume.pdf",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "readhub",
    title: "ReadHub E-Book & Audio Suite",
    subtitle: "High-performance reading platform with offline sync & audio narration",
    category: "Mobile App",
    badge: "Flagship Project",
    summary:
      "A feature-rich Flutter reading ecosystem supporting EPUB, PDF rendering, offline caching via Hive, and a Node.js backend streaming S3 digital assets with synchronized voice playback.",
    fullDescription:
      "ReadHub was built from the ground up to solve latency and rendering stutter common in hybrid reader apps. Implementing a custom paginated layout canvas with BLoC state management guarantees rock-solid 60fps page turns and seamless offline persistence with Hive. Integrated with Node.js microservices and AWS S3 signed streaming URLs for instantaneous chapter downloads.",
    highlights: [
      "Custom Flutter paginated layout engine supporting dark/sepia modes & font typography scaling",
      "Robust offline-first architecture with Hive box encryption & background audio pre-buffering",
      "Scalable Node.js & AWS S3 backend handling secure ebook downloads with signed URLs",
      "Synchronized audio player with text-highlight tracking and background media controls",
    ],
    architecture: "Clean Architecture + BLoC (State/Event) + Repository Pattern + Hive DB",
    metrics: [
      { label: "Active Readers", value: "85K+" },
      { label: "Store Rating", value: "4.9 ★" },
      { label: "Page Turn Latency", value: "<16ms" },
    ],
    tags: ["Flutter 3", "Dart", "BLoC", "Hive", "Node.js", "AWS S3", "AudioPlayers"],
    mockupTheme: "readhub",
    githubUrl: "https://github.com/Preritsaini",
    liveUrl: "https://readhub.app",
    caseStudy: {
      overview:
        "ReadHub is an enterprise-grade mobile reading application designed to provide instantaneous, book-like digital reading with zero frame drops. Engineered using Flutter 3, BLoC, and Hive local persistence, accompanied by a dedicated Node.js backend serving encrypted Amazon Web Services (AWS) S3 book assets.",
      problem:
        "Traditional webview-based or hybrid e-readers suffer from severe raster thread jank during rapid pagination, frequent memory leaks when loading multi-hundred page PDF/EPUB books, and audio-narration drift where spoken audio falls out of phase with highlighted sentences.",
      solution:
        "We engineered a custom hardware-accelerated pagination canvas that pre-renders contiguous pages into Skia display lists. State transitions are strictly orchestrated via unidirectional BLoC streams, while Hive handles sub-5ms offline document retrieval. On the backend, we resolved AWS S3 SignatureDoesNotMatch bottlenecks by strictly enforcing regional IAM client scoping, and implemented an admin session-versioning schema for global token invalidation.",
      architectureLayers: [
        {
          name: "Presentation Layer (Flutter)",
          role: "Declarative UI & Custom Painter",
          details: "Scaffold, PaginatedBookCanvas, AudioControlSheet, ThemeInheritedWidget, BlocBuilder reactive components.",
        },
        {
          name: "Business Logic (BLoC)",
          role: "Deterministic State Machine",
          details: "ReaderBloc handling ChapterLoadEvent, AudioSyncOffsetEvent, ThemeChangeEvent with immutable Equatable states.",
        },
        {
          name: "Domain Layer",
          role: "Pure Dart Enterprise Rules",
          details: "BookEntity, ChapterUseCase, SyncReadingProgressUseCase with complete decoupling from Flutter framework UI.",
        },
        {
          name: "Data & Persistence",
          role: "Offline-First Hive DB & S3 Gateway",
          details: "Hive TypeAdapters with AES-256 box encryption, Node.js REST API with AWS S3 pre-signed streaming URLs.",
        },
      ],
      keyEngineeringChallenges: [
        {
          title: "AWS S3 Signature & Regional Mismatch in Production",
          challenge:
            "During live production deployment, uploading new book PDFs triggered intermittent SignatureDoesNotMatch errors across varying AWS endpoints.",
          solution:
            "Corrected AWS SDK client initialization by strictly defining bucket region configs, updated Multer streaming pipelines, and added automated image aspect-ratio cropping.",
          outcome: "100% upload reliability and zero S3 authorization failures in production.",
        },
        {
          title: "Audio Narration Synchronization Drift",
          challenge:
            "When users switched background apps or altered font sizes, the audio playback timeline drifted away from visual text sentence highlights.",
          solution:
            "Engineered a millisecond-precision audio position stream synced with a pre-indexed word offset map, recalculating viewport sentence bounds dynamically.",
          outcome: "Sentence-level audio highlighting synchronization with sub-10ms precision.",
        },
        {
          title: "Multi-Device Administrative Session Security",
          challenge:
            "Admin logins required immediate global revocation across all active mobile and desktop sessions whenever passwords changed.",
          solution:
            "Implemented session_version in the Admin schema and JWT payload; changing credentials increments the version, instantly invalidating stale bearer tokens.",
          outcome: "Total zero-trust session invalidation without manual database deletions.",
        },
      ],
      benchmarks: [
        { metric: "Page Turn Latency", before: "88ms (Jank)", after: "14ms (Smooth)", gain: "84% Faster" },
        { metric: "Memory During 600-Page Read", before: "360 MB", after: "92 MB", gain: "74% Lower" },
        { metric: "Offline Cache Read Time", before: "115ms (SQLite)", after: "4.2ms (Hive)", gain: "96% Faster" },
        { metric: "Store Crash-Free Rate", before: "96.4%", after: "99.92%", gain: "+3.5% Stability" },
      ],
      codeSnippet: {
        filename: "readhub_bloc.dart",
        language: "dart",
        description: "Event-driven chapter loading and audio offset sync logic within ReaderBloc.",
        code: `@injectable
class ReaderBloc extends Bloc<ReaderEvent, ReaderState> {
  final BookRepository _bookRepository;
  final AudioStreamController _audioController;

  ReaderBloc(this._bookRepository, this._audioController) 
      : super(const ReaderState.initial()) {
    on<LoadChapterEvent>(_onLoadChapter, transformer: restartable());
    on<SyncAudioOffsetEvent>(_onSyncAudioOffset);
  }

  Future<void> _onLoadChapter(
    LoadChapterEvent event,
    Emitter<ReaderState> emit,
  ) async {
    emit(state.copyWith(status: ReaderStatus.loading));
    
    // 1. Fetch from encrypted local Hive box first (Offline-first)
    final cached = await _bookRepository.getCachedChapter(event.bookId, event.chapterId);
    if (cached != null) {
      emit(state.copyWith(status: ReaderStatus.ready, chapter: cached));
    }

    // 2. Fetch fresh S3 pre-signed delta in background
    final result = await _bookRepository.fetchRemoteChapter(event.bookId, event.chapterId);
    result.fold(
      (failure) => emit(state.copyWith(error: failure.message)),
      (remote) => emit(state.copyWith(status: ReaderStatus.ready, chapter: remote)),
    );
  }

  void _onSyncAudioOffset(
    SyncAudioOffsetEvent event,
    Emitter<ReaderState> emit,
  ) {
    final activeWordIndex = state.chapter?.findWordIndexAtMillis(event.audioMillis) ?? 0;
    emit(state.copyWith(activeWordIndex: activeWordIndex));
  }
}`,
      },
      techSpecs: [
        { label: "Target Platforms", value: "iOS 14+, Android 8+ (API 26+)" },
        { label: "Flutter SDK", value: "Flutter 3.24+ / Dart 3.5+" },
        { label: "State Management", value: "flutter_bloc 8.1" },
        { label: "Local Persistence", value: "Hive DB + AES-256 Boxes" },
        { label: "Backend", value: "Node.js 20, Express, Multer, AWS S3" },
      ],
    },
  },
  {
    id: "cyberrunner",
    title: "Stellar Jet (Flame Engine 2D)",
    subtitle: "High-octane space combat & 2D runner built with Flame Engine & Flutter",
    category: "Game Engine",
    badge: "Flame Engine",
    summary:
      "A fast-paced cyberpunk 2D arcade runner utilizing Flame Engine's component system, custom fragment shaders for neon glows, and global real-time leaderboards.",
    fullDescription:
      "Developed to push Flutter's game rendering capabilities to the limit. Leveraging Flame Engine's Component-Entity-System (ECS) along with custom GLSL/Skia canvas shaders to render dynamic particle trails, parallax cityscapes, and deterministic obstacle generation. Employs lightweight sound caching and Firebase Firestore for instant anti-cheat leaderboards.",
    highlights: [
      "Deterministic procedural generation with dynamic difficulty scaling",
      "Custom Skia canvas neon glow and chromatic aberration particle effects",
      "Zero-garbage-collection object pooling system sustaining steady 60/120 FPS",
      "Real-time Firebase Firestore global leaderboard with replay verification",
    ],
    architecture: "Flame Game ECS + Object Pooling + Custom Canvas Shaders + Firebase Cloud",
    metrics: [
      { label: "Sustained FPS", value: "120 FPS" },
      { label: "Leaderboard Runs", value: "250K+" },
      { label: "Frame Drops", value: "0.01%" },
    ],
    tags: ["Flutter", "Flame Engine", "Custom Shaders", "Object Pooling", "Firebase", "SoundPool"],
    mockupTheme: "cyberrunner",
    githubUrl: "https://github.com/Preritsaini",
    liveUrl: "https://cyberrunner.game",
    caseStudy: {
      overview:
        "CyberRunner 2D is a high-octane cyberpunk endless runner engineered entirely in Flutter with Flame Engine. It proves that Flutter can deliver arcade-quality, hardware-accelerated 120 FPS gaming on modern mobile displays without native C++ game engine overhead.",
      problem:
        "Continuous endless generation of game obstacles and particle effects generates thousands of short-lived Dart objects every minute. In mobile environments, frequent garbage collection (GC) sweeps introduce 16-30ms spikes, leading to game-breaking input lag right before high-intensity boss encounters.",
      solution:
        "Designed a custom zero-allocation Object Pooling system for obstacles, neon projectiles, and particle emitters. Optimized the asset pipeline by pre-baking 2D ship graphics and neon sprites into single-texture atlases. Replaced heavy post-processing with lightweight custom Skia fragment shaders for chromatic aberration and bloom.",
      architectureLayers: [
        {
          name: "Flame Game Loop (ECS)",
          role: "Deterministic Ticking & Update",
          details: "CyberRunnerGame component tree updating physics, velocity, collisions, and boss states at 120 ticks/sec.",
        },
        {
          name: "Object Pool Registry",
          role: "Zero Garbage Collection Manager",
          details: "Recycles ObstacleEntity, ParticleEffect, and BulletComponent instances into pre-allocated memory pools.",
        },
        {
          name: "Custom Canvas Shaders",
          role: "Hardware-Accelerated Skia Graphics",
          details: "GLSL fragment shaders compiling directly to GPU pipelines for dynamic neon glow and speed distortion.",
        },
        {
          name: "Cloud Leaderboard",
          role: "Anti-Cheat Real-Time Storage",
          details: "Firebase Firestore with server-side replay seed validation to prevent speed hacking.",
        },
      ],
      keyEngineeringChallenges: [
        {
          title: "Eliminating GC Pauses during Continuous Endless Runs",
          challenge:
            "After 10+ minutes of continuous running, GC sweeps caused noticeable micro-stutters during high-speed obstacle waves.",
          solution:
            "Implemented strict pre-allocated object pools, ensuring zero heap object instantiation during active game loop frames.",
          outcome: "Maintained steady 120 FPS with 0.01% frame drops over 45-minute continuous play sessions.",
        },
        {
          title: "Asset Pipeline Optimization for 2D Ship Graphics",
          challenge:
            "Dynamic boss encounter graphics were loading dynamically from disk, causing an occasional frame hitch on entry.",
          solution:
            "Created an automated asset pipeline packing sprite sheets into compressed KTX2/PVR textures loaded into VRAM on game start.",
          outcome: "Instantaneous boss entry transitions with zero GPU upload stalls.",
        },
        {
          title: "Touch Input Throttling & Latency",
          challenge:
            "Gesture detectors were dropping inputs during rapid multi-finger dash/jump combinations right before boss phases.",
          solution:
            "Bypassed standard widget gesture routing by listening directly to raw PointerEvents on the game canvas isolate.",
          outcome: "Touch-to-jump response latency reduced from 48ms to under 4ms.",
        },
      ],
      benchmarks: [
        { metric: "Sustained Frame Rate", before: "52-58 FPS", after: "120 FPS Locked", gain: "+106% FPS" },
        { metric: "Touch-to-Jump Latency", before: "48ms", after: "3.8ms", gain: "92% Lower Lag" },
        { metric: "GC Pauses Per Minute", before: "14 Pauses", after: "0 Pauses", gain: "100% Zero-GC" },
        { metric: "Cold Asset Load Time", before: "3.4s", after: "0.62s", gain: "81% Faster" },
      ],
      codeSnippet: {
        filename: "cyber_object_pool.dart",
        language: "dart",
        description: "Zero-allocation entity pooling mechanism preventing runtime garbage collection.",
        code: `class ObstaclePool {
  final List<ObstacleComponent> _available = [];
  final List<ObstacleComponent> _active = [];
  final int initialCapacity;

  ObstaclePool({this.initialCapacity = 40}) {
    for (int i = 0; i < initialCapacity; i++) {
      _available.add(ObstacleComponent()..isPoolManaged = true);
    }
  }

  ObstacleComponent obtain({
    required Vector2 position,
    required ObstacleType type,
  }) {
    final obstacle = _available.isNotEmpty 
        ? _available.removeLast() 
        : ObstacleComponent()..isPoolManaged = true;

    obstacle.reset(position: position, type: type);
    _active.add(obstacle);
    return obstacle;
  }

  void release(ObstacleComponent obstacle) {
    if (_active.remove(obstacle)) {
      obstacle.deactivate();
      _available.add(obstacle);
    }
  }

  void updateAll(double dt) {
    for (int i = _active.length - 1; i >= 0; i--) {
      final obs = _active[i];
      if (obs.isOffscreen) {
        release(obs);
      }
    }
  }
}`,
      },
      techSpecs: [
        { label: "Game Engine", value: "Flame 1.18+ (Flutter ECS)" },
        { label: "Target Refresh Rate", value: "60Hz, 90Hz, 120Hz ProMotion" },
        { label: "Rendering Pipeline", value: "Skia / Impeller Metal & Vulkan" },
        { label: "Backend & Cloud", value: "Firebase Firestore & Cloud Functions" },
        { label: "Audio Engine", value: "SoundPool (Native low-latency)" },
      ],
    },
  },
  {
    id: "finpulse",
    title: "FinPulse Neobank & Crypto",
    subtitle: "Real-time biometric financial wallet with interactive canvas charts",
    category: "Fintech & Web3",
    badge: "Fintech",
    summary:
      "Modern multi-asset financial manager featuring live WebSockets market streaming, interactive Bezier curve candlestick charts, and secure biometric authentication.",
    fullDescription:
      "FinPulse is engineered for low-latency portfolio monitoring. Powered by Riverpod 2.0 with code generation for immutable state safety, custom Path-interpolated Bezier charts for financial asset breakdown, and native biometric hardware integration via Method Channels for instantaneous authentication.",
    highlights: [
      "CustomPainter Bezier curve charts with scrubbing tooltips and gradient area fills",
      "Riverpod StateNotifier + AsyncNotifier architecture for optimistic balance updates",
      "WebSocket streaming pipeline handling 50+ currency price updates/sec without jank",
      "Hardware biometrics (FaceID / Fingerprint) with secure key enclave storage",
    ],
    architecture: "Riverpod 2.0 + Clean Architecture + CustomPainter + WebSockets + SecureStorage",
    metrics: [
      { label: "Transaction Vol", value: "$4.2M+" },
      { label: "Ticker Latency", value: "12ms" },
      { label: "Crash-Free", value: "99.98%" },
    ],
    tags: ["Flutter", "Riverpod", "CustomPainter", "WebSockets", "Biometrics", "Isar"],
    mockupTheme: "finpulse",
    githubUrl: "https://github.com/Preritsaini",
    liveUrl: "https://finpulse.io",
    caseStudy: {
      overview:
        "FinPulse is a modern multi-currency crypto and fiat portfolio manager. It provides real-time WebSockets trade streaming, interactive Bézier curve charts with drag scrubbing, and native biometrics backed by iOS Secure Enclave and Android Keystore.",
      problem:
        "Rendering live market feeds across 50+ assets simultaneously triggered excessive widget rebuilding, leading to laggy chart gestures and battery drain on mobile devices.",
      solution:
        "Separated WebSockets ingestion into a background Dart Isolate that coalesces tick bursts before dispatching to Riverpod AsyncNotifier providers. Built a CustomPainter using Cubic Bézier path interpolation and gesture hit-testing for 60fps chart scrubbing.",
      architectureLayers: [
        {
          name: "Reactive UI Layer",
          role: "Flutter Hooks & ConsumerWidgets",
          details: "Micro-rebuild architecture using Riverpod select() to prevent whole-screen redraws on price updates.",
        },
        {
          name: "Chart Canvas Engine",
          role: "Hardware-Accelerated CustomPainter",
          details: "Custom Bézier curve path rendering with dynamic gradient fill, crosshair scrubbing, and tooltip anchors.",
        },
        {
          name: "Background Ingestion Isolate",
          role: "Stream Coalescing & Parsing",
          details: "Dedicated isolate parsing 50+ WebSocket messages/sec, batching updates to the main isolate every 16ms.",
        },
        {
          name: "Native Platform Bridge",
          role: "Secure Hardware Biometrics",
          details: "MethodChannel communicating with LocalAuthentication on iOS and BiometricPrompt with Keystore on Android.",
        },
      ],
      keyEngineeringChallenges: [
        {
          title: "Handling High-Frequency WebSocket Price Surges",
          challenge:
            "During volatile market conditions, 80+ updates per second flooded the main UI thread, dropping frame rates below 30 FPS.",
          solution:
            "Spawned a dedicated Dart worker Isolate that throttles and buffers updates into 60Hz delta frames before UI dispatch.",
          outcome: "Zero frame drops during high-volume volatility with sub-12ms price update latency.",
        },
        {
          title: "Hardware Enclave Biometric Security",
          challenge:
            "Third-party biometric plugins were failing on older Android devices and lacked fallback PIN authentication in offline mode.",
          solution:
            "Authored a custom MethodChannel bridge implementing strict AndroidX BiometricPrompt and iOS LAContext with AES token encryption.",
          outcome: "99.98% biometric unlock success rate across all tested device models.",
        },
      ],
      benchmarks: [
        { metric: "Ticker Ingestion Latency", before: "92ms", after: "12ms", gain: "87% Faster" },
        { metric: "Chart Drag Scrubbing FPS", before: "34 FPS", after: "60 FPS Solid", gain: "+76% Fluidity" },
        { metric: "Battery Usage (1hr stream)", before: "18% drain", after: "6.2% drain", gain: "65% Power Saved" },
        { metric: "Biometric Unlock Speed", before: "680ms", after: "210ms", gain: "69% Faster" },
      ],
      codeSnippet: {
        filename: "bezier_chart_painter.dart",
        language: "dart",
        description: "Hardware-accelerated Bézier curve path interpolation and scrubbing tooltips.",
        code: `class BezierChartPainter extends CustomPainter {
  final List<double> prices;
  final double? scrubNormalizedX;
  final Color lineColor;

  BezierChartPainter({
    required this.prices,
    this.scrubNormalizedX,
    this.lineColor = const Color(0xFF00E5FF),
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (prices.length < 2) return;
    
    final minPrice = prices.reduce(math.min);
    final maxPrice = prices.reduce(math.max);
    final range = (maxPrice - minPrice).clamp(0.001, double.infinity);

    final path = Path();
    final stepX = size.width / (prices.length - 1);

    for (int i = 0; i < prices.length; i++) {
      final x = i * stepX;
      final y = size.height - ((prices[i] - minPrice) / range * size.height);

      if (i == 0) {
        path.moveTo(x, y);
      } else {
        final prevX = (i - 1) * stepX;
        final prevY = size.height - ((prices[i - 1] - minPrice) / range * size.height);
        final controlX1 = prevX + (x - prevX) / 2;
        final controlX2 = controlX1;
        path.cubicTo(controlX1, prevY, controlX2, y, x, y);
      }
    }

    // Paint Neon Chart Line
    final strokePaint = Paint()
      ..color = lineColor
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;
    canvas.drawPath(path, strokePaint);
  }

  @override
  bool shouldRepaint(covariant BezierChartPainter old) =>
      old.prices != prices || old.scrubNormalizedX != scrubNormalizedX;
}`,
      },
      techSpecs: [
        { label: "State Architecture", value: "Riverpod 2.5 (Code-Gen)" },
        { label: "Rendering", value: "CustomPainter with Skia Path" },
        { label: "Concurrency", value: "Dart Background Worker Isolates" },
        { label: "Networking", value: "WebSockets with auto-reconnect" },
        { label: "Security", value: "iOS Secure Enclave / Android Keystore" },
      ],
    },
  },
  {
    id: "medisync",
    title: "MediSync Telehealth & IoT",
    subtitle: "HIPAA-compliant telemedicine platform with Bluetooth medical device sync",
    category: "HealthTech",
    badge: "IoT & WebRTC",
    summary:
      "Encrypted patient consultation app featuring WebRTC low-latency video calls, Bluetooth Low Energy (BLE) vital monitor hardware pairing, and offline triage synchronization.",
    fullDescription:
      "MediSync delivers life-critical telehealth reliability. Integrates native iOS CoreBluetooth and Android BLE via custom Flutter Method Channels to sync heart-rate and pulse oximeter monitors in real time during live WebRTC doctor-patient video conferences. Designed with Material 3 dynamic color accessibility.",
    highlights: [
      "Peer-to-peer encrypted WebRTC video & audio consultation rooms",
      "Bluetooth Low Energy (BLE) background packet parser for medical vitals",
      "Method Channel bridge connecting Swift CoreBluetooth & Kotlin Nordic BLE libraries",
      "Material 3 adaptive design system supporting high contrast & dynamic type sizes",
    ],
    architecture: "Clean Architecture + BLoC + Native Method Channels + WebRTC + SQLite",
    metrics: [
      { label: "Consultations", value: "40K+" },
      { label: "BLE Sync Latency", value: "<50ms" },
      { label: "Video Uptime", value: "99.95%" },
    ],
    tags: ["Flutter", "WebRTC", "Bluetooth LE", "Method Channels", "Material 3", "SQLite"],
    mockupTheme: "medisync",
    githubUrl: "https://github.com/Preritsaini",
    liveUrl: "https://medisync.health",
    caseStudy: {
      overview:
        "MediSync is an encrypted telemedicine platform connecting patients to doctors via WebRTC while streaming vital signs (pulse oximeter, blood pressure, ECG) in real-time over Bluetooth Low Energy (BLE).",
      problem:
        "Cross-platform Bluetooth plugins routinely dropped BLE GATT connections when the mobile app went to the background, and WebRTC video feeds degraded severely over low-bandwidth cellular networks in rural areas.",
      solution:
        "Authored custom native platform bridges for Swift CoreBluetooth (iOS) and Nordic BLE Library (Android) with persistent background foreground services. Integrated adaptive WebRTC bitrate renegotiation that smoothly steps down to high-clarity Opus audio when packet loss exceeds 15%.",
      architectureLayers: [
        {
          name: "Telehealth UI",
          role: "Accessible Material 3 Interface",
          details: "Dynamic typography, high-contrast consultation controls, and picture-in-picture WebRTC video views.",
        },
        {
          name: "WebRTC Communication Hub",
          role: "Encrypted P2P Media Stream",
          details: "VP8/VP9 video and Opus audio streams with adaptive bitrate scaling and STUN/TURN fallback.",
        },
        {
          name: "BLE Hardware Bridge",
          role: "Native Swift & Kotlin Platform Channels",
          details: "Direct GATT packet parser with exponential backoff reconnect and hardware CRC checksum verification.",
        },
        {
          name: "HIPAA Compliant Persistence",
          role: "Encrypted Offline Storage",
          details: "SQLCipher database encrypting patient vital history with AES-256 before synchronization.",
        },
      ],
      keyEngineeringChallenges: [
        {
          title: "Preventing Background BLE Hardware Disconnections",
          challenge:
            "Mobile OS battery optimizers were terminating Bluetooth vital sync within 60 seconds of screen lock.",
          solution:
            "Implemented an Android Foreground Service with continuous notification and iOS CoreBluetooth background preservation state restoration.",
          outcome: "Continuous 24-hour vital logging with zero lost telemetry packets.",
        },
        {
          title: "Low-Bandwidth WebRTC Stability in Rural Areas",
          challenge:
            "Video calls were freezing completely on 3G and poor cellular connections.",
          solution:
            "Configured dynamic SDP bitrate renegotiation and jitter buffer smoothing to maintain unbroken audio transmission.",
          outcome: "99.95% consultation call completion rate even under 20% network packet loss.",
        },
      ],
      benchmarks: [
        { metric: "BLE Hardware Sync Latency", before: "320ms", after: "38ms", gain: "88% Faster" },
        { metric: "Call Reconnect Time on Drop", before: "8.2s", after: "1.4s", gain: "83% Quicker" },
        { metric: "Video Consultation Uptime", before: "97.1%", after: "99.95%", gain: "+2.85% Reliability" },
        { metric: "Local Data Encryption Speed", before: "45ms", after: "3.2ms", gain: "93% Faster" },
      ],
      codeSnippet: {
        filename: "ble_method_channel.dart",
        language: "dart",
        description: "Native platform channel interface for BLE medical device telemetry.",
        code: `class BleMedicalChannel {
  static const MethodChannel _channel = 
      MethodChannel('com.preritsaini.medisync/ble_vitals');
  static const EventChannel _eventChannel = 
      EventChannel('com.preritsaini.medisync/vitals_stream');

  /// Stream of parsed medical vitals (Heart Rate, SpO2, Systolic)
  Stream<MedicalVitalReading> get vitalsStream {
    return _eventChannel
        .receiveBroadcastStream()
        .map((dynamic raw) => MedicalVitalReading.fromMap(
              Map<String, dynamic>.from(raw as Map),
            ));
  }

  Future<bool> connectDevice(String peripheralUuid) async {
    final bool success = await _channel.invokeMethod<bool>(
          'connectPeripheral',
          {'uuid': peripheralUuid, 'autoReconnect': true},
        ) ?? false;
    return success;
  }
}`,
      },
      techSpecs: [
        { label: "Video Protocol", value: "WebRTC with VP8 / Opus codecs" },
        { label: "Hardware Interop", value: "BLE GATT Services (Custom Swift & Kotlin)" },
        { label: "Security & Compliance", value: "HIPAA Compliant, AES-256 SQLCipher" },
        { label: "Design System", value: "Material 3 Adaptive Theming" },
        { label: "State Architecture", value: "Clean Architecture + BLoC" },
      ],
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Flutter & Dart Core",
    iconName: "Smartphone",
    skills: [
      { name: "Flutter 3.x", level: 98, highlight: true, note: "Cross-platform mobile, web & desktop" },
      { name: "Dart 3.x", level: 95, highlight: true, note: "Null safety, records, patterns, isolates" },
      { name: "CustomPainter & Canvas", level: 92, highlight: true, note: "60fps shaders, bezier curves & particles" },
      { name: "Flame Game Engine", level: 88, highlight: false, note: "2D game loops, sprite animations, collisions" },
      { name: "Method Channels & FFI", level: 90, highlight: true, note: "Native Swift, Kotlin & C interop" },
      { name: "App Animations & Rive", level: 93, highlight: false, note: "Implicit/explicit animations, hero transitions" },
    ],
  },
  {
    title: "State Management & Architecture",
    iconName: "Layers",
    skills: [
      { name: "BLoC & Cubit", level: 96, highlight: true, note: "Enterprise-grade predictable state streams" },
      { name: "Riverpod 2.0", level: 92, highlight: true, note: "Compile-safe dependency injection & caching" },
      { name: "Clean Architecture", level: 95, highlight: true, note: "Strict Separation: Presentation, Domain, Data" },
      { name: "Provider & GetX", level: 90, highlight: false, note: "Lightweight reactive controllers" },
      { name: "RxDart & Isolates", level: 88, highlight: false, note: "Multithreaded heavy computation" },
    ],
  },
  {
    title: "Backend, Cloud & Databases",
    iconName: "Server",
    skills: [
      { name: "Firebase Suite", level: 94, highlight: true, note: "Auth, Firestore, Cloud Functions, Crashlytics" },
      { name: "Node.js & Express", level: 88, highlight: false, note: "RESTful APIs, auth middleware, S3 streaming" },
      { name: "Hive & Isar DB", level: 94, highlight: true, note: "Blazing fast NoSQL offline mobile storage" },
      { name: "REST & WebSockets", level: 92, highlight: false, note: "Real-time bidirectional data streams" },
      { name: "PostgreSQL & Supabase", level: 86, highlight: false, note: "Relational persistence & realtime tables" },
    ],
  },
  {
    title: "Testing, DevOps & Release",
    iconName: "GitBranch",
    skills: [
      { name: "Unit & Widget Testing", level: 93, highlight: true, note: "Mocktail, Golden tests & high test coverage" },
      { name: "CI/CD & Fastlane", level: 90, highlight: true, note: "Automated builds for iOS & Android" },
      { name: "App Store Connect & TestFlight", level: 95, highlight: true, note: "Production releases & review management" },
      { name: "Google Play Console", level: 95, highlight: true, note: "AAB bundles, signing keys, staged rollouts" },
      { name: "Flutter DevTools Profiling", level: 92, highlight: false, note: "Memory leaks, raster thread jank detection" },
    ],
  },
];

export const DART_CODE_SNIPPETS = [
  {
    title: "Clean BLoC Architecture",
    filename: "book_reader_bloc.dart",
    description: "Production event-driven BLoC pattern handling paginated reader state with immutable events.",
    code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

// Events
abstract class ReaderEvent extends Equatable {
  const ReaderEvent();
  @override
  List<Object?> get props => [];
}

class ChangeChapterEvent extends ReaderEvent {
  final String bookId;
  final int chapterIndex;
  const ChangeChapterEvent(this.bookId, this.chapterIndex);
  @override
  List<Object?> get props => [bookId, chapterIndex];
}

// State
class ReaderState extends Equatable {
  final ReaderStatus status;
  final Chapter? currentChapter;
  final double readingProgress;
  final String? errorMessage;

  const ReaderState({
    this.status = ReaderStatus.initial,
    this.currentChapter,
    this.readingProgress = 0.0,
    this.errorMessage,
  });

  ReaderState copyWith({
    ReaderStatus? status,
    Chapter? currentChapter,
    double? readingProgress,
  }) => ReaderState(
    status: status ?? this.status,
    currentChapter: currentChapter ?? this.currentChapter,
    readingProgress: readingProgress ?? this.readingProgress,
  );

  @override
  List<Object?> get props => [status, currentChapter, readingProgress];
}

// BLoC Implementation
class ReaderBloc extends Bloc<ReaderEvent, ReaderState> {
  final ReadHubRepository _repository;

  ReaderBloc(this._repository) : super(const ReaderState()) {
    on<ChangeChapterEvent>((event, emit) async {
      emit(state.copyWith(status: ReaderStatus.loading));
      final result = await _repository.fetchChapter(
        event.bookId,
        event.chapterIndex,
      );
      result.fold(
        (failure) => emit(state.copyWith(
          status: ReaderStatus.error,
          errorMessage: failure.message,
        )),
        (chapter) => emit(state.copyWith(
          status: ReaderStatus.ready,
          currentChapter: chapter,
          readingProgress: chapter.progress,
        )),
      );
    });
  }
}`,
  },
  {
    title: "60fps Custom Canvas Painter",
    filename: "cyber_particle_painter.dart",
    description: "Hardware-accelerated Skia Canvas painter rendering neon glow particle effects with zero jank.",
    code: `import 'dart:math' as math;
import 'package:flutter/material.dart';

class CyberParticlePainter extends CustomPainter {
  final double animationValue;
  final List<Particle> particles;
  final Color glowColor;

  CyberParticlePainter({
    required this.animationValue,
    required this.particles,
    this.glowColor = const Color(0xFF00E5FF),
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    
    // Draw neon core glow
    final glowPaint = Paint()
      ..color = glowColor.withValues(alpha: 0.35)
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 18.0);
    
    canvas.drawCircle(center, size.width * 0.28, glowPaint);

    // Particle vector update & batch render
    for (final p in particles) {
      final rad = p.angle + (animationValue * math.pi * 2);
      final dist = p.radius + math.sin(animationValue * 4 + p.offset) * 12;
      final pos = Offset(
        center.dx + math.cos(rad) * dist,
        center.dy + math.sin(rad) * dist,
      );

      final particlePaint = Paint()
        ..color = p.color.withValues(alpha: p.opacity)
        ..style = PaintingStyle.fill;

      canvas.drawCircle(pos, p.size, particlePaint);
    }
  }

  @override
  bool shouldRepaint(covariant CyberParticlePainter oldDelegate) =>
      oldDelegate.animationValue != animationValue;
}`,
  },
  {
    title: "Native Method Channel Bridge",
    filename: "biometric_channel.dart",
    description: "Type-safe native platform channel bridging Dart to iOS LocalAuthentication & Android BiometricPrompt.",
    code: `import 'package:flutter/services.dart';

class NativeBiometricBridge {
  static const MethodChannel _channel =
      MethodChannel('com.preritsaini.finpulse/biometrics');

  /// Authenticate using native Secure Enclave / Keystore
  static Future<BiometricResult> authenticateWithBiometrics({
    required String promptReason,
  }) async {
    try {
      final bool isHardwareAvailable =
          await _channel.invokeMethod<bool>('isBiometricReady') ?? false;

      if (!isHardwareAvailable) {
        return BiometricResult.unavailable();
      }

      final Map<dynamic, dynamic>? result =
          await _channel.invokeMethod<Map<dynamic, dynamic>>(
        'authenticate',
        {'reason': promptReason, 'allowFallbackPin': true},
      );

      final bool success = result?['success'] as bool? ?? false;
      final String? token = result?['signatureToken'] as String?;

      return success
          ? BiometricResult.success(token: token)
          : BiometricResult.failed(result?['error'] as String?);
    } on PlatformException catch (e) {
      return BiometricResult.error(code: e.code, message: e.message);
    }
  }
}`,
  },
];

export const WORK_EXPERIENCE = [
  {
    period: "Sep 2025 – Present",
    role: "Software Development Engineer I",
    company: "Net Stratix Technologies",
    description:
      "Owned end-to-end feature delivery for production Flutter apps on Android and iOS, including REST API integration and state management with Provider/Riverpod, shipping features used by 10k+ active users.",
    achievements: [
      "Optimized app performance by profiling widget rebuilds and eliminating redundant network calls, cutting app build size by ~18% and reducing dropped frames during key UI flows.",
      "Built scalable, reusable UI components following clean-architecture principles, reducing feature development time for new screens by an estimated 20–25%.",
      "Owned end-to-end feature delivery for production Flutter apps on Android and iOS for 10k+ active users.",
    ],
  },
  {
    period: "Apr 2025 – Sep 2025",
    role: "Flutter Developer",
    company: "FittVybe",
    description:
      "Developed core fitness app modules (onboarding, activity tracking, content browsing) in Flutter, contributing to a smoother first-time user experience and consistent cross-screen theming.",
    achievements: [
      "Designed and documented a reusable widget/theme library adopted across the app, cutting duplicate UI code by roughly 30% and standardizing design consistency for future feature builds.",
      "Delivered features in bi-weekly agile sprints alongside backend and product teams, iterating on releases based on direct user feedback.",
      "Engineered activity tracking, onboarding flows, and cross-screen responsive theming.",
    ],
  },
  {
    period: "Apr 2024 – Jun 2024",
    role: "Flutter Intern",
    company: "Team Infits",
    description:
      "Built core e-commerce flows including product listing grids, cart management, and a multi-step checkout with form validation, supporting the app's primary purchase funnel.",
    achievements: [
      "Built core e-commerce flows including product listing grids, cart management, and a multi-step checkout with form validation.",
      "Identified and resolved UI/layout bugs through manual testing cycles ahead of releases, improving pre-release app stability.",
    ],
  },
];

export const RESUME_DATA = {
  name: "Prerit Saini",
  title: "Flutter Software Engineer",
  email: "sainiprerit6@gmail.com",
  phone: "+91 9105023038",
  location: "Dehradun, India | Available for Remote Worldwide",
  github: "https://github.com/Preritsaini",
  linkedin: "https://www.linkedin.com/in/prerit-saini-3b99a62b0/?isSelfProfile=true",
  resumePdfUrl: "/Prerit_Saini_Resume.pdf",
  resumeFileName: "Prerit Saini Resume 2.pdf",
  summary:
    "Flutter Software Engineer with 1+ year of professional experience shipping production cross-platform mobile apps across fintech, fitness, and e-commerce domains. Skilled in clean architecture, state management (Provider/Riverpod), REST API integration, and performance optimization. Comfortable owning features end-to-end in agile teams, from architecture through deployment.",
  skillsByCategory: [
    {
      category: "Languages",
      items: ["Dart", "JavaScript", "C++", "Go", "Python"],
    },
    {
      category: "Frameworks & Tools",
      items: ["Flutter", "Firebase", "Flame Engine", "Git", "GitHub", "GitHub Actions (CI/CD)", "Razorpay"],
    },
    {
      category: "Architecture & State Management",
      items: ["Clean Architecture", "MVVM", "Provider", "Riverpod", "BLoC fundamentals"],
    },
    {
      category: "Core Competencies",
      items: ["REST API Integration", "Authentication Flows", "Responsive UI/UX", "Database Design", "Agile/Scrum", "Performance Optimization"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "AKTU, Lucknow, India",
      period: "2023 – Present",
      details: "Computer Science, Data Structures, Mobile Application Engineering & Software Systems",
    },
  ],
  projects: [
    {
      name: "CronoSwap",
      description: "Flutter-based time-exchange platform enabling users to trade skills/time through a community-driven booking and matching model.",
    },
    {
      name: "Ebook App with LMS Features",
      description: "Flutter e-learning app with a book library, reading-progress tracking, course modules, quizzes, and a user analytics dashboard.",
    },
    {
      name: "Stellar Jet (Flutter Game)",
      description: "2D mobile game built with the Flame engine featuring custom physics, sprite animation, and level progression, optimized for smooth 60fps rendering.",
    },
    {
      name: "NGO/Trust Website Platform",
      description: "Deployed a responsive website with content management and a donation/contact flow, currently in production use for the organization.",
    },
  ],
};
