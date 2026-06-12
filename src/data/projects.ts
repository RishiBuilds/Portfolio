import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "cloudexecx",
    title: "CloudExecX",
    description:
      "Auto-scaling code execution engine running inside secure, isolated Docker sandboxes.",
    longDescription:
      "CloudExecX is a secure, multi-tenant code execution engine designed to run untrusted user code safely at scale. The platform uses Docker containers managed dynamically via Dockerode to isolate execution environments, enforcing strict resource bounds (128MB RAM, 50% CPU caps, and no network access).\n\nBuilt on a microservices topology, the Next.js frontend sends execution jobs to an Express API, which queues tasks using BullMQ and Upstash Redis. Scale-out workers process the queue, spinning sandboxes up and down on-demand. Output is captured, truncated if excessive, and returned via real-time streams.",
    techStack: [
      "Next.js",
      "Express.js",
      "TypeScript",
      "Docker",
      "BullMQ",
      "Redis",
      "MongoDB",
      "Clerk",
    ],
    liveUrl: "https://cloud-exec-x.vercel.app",
    githubUrl: "https://github.com/RishiBuilds/CloudExecX",
    featured: true,
    impact: "Securely isolates untrusted scripts with sub-500ms latency",
    category: "Cloud & Infra",
    year: 2026,
    status: "live",
    highlights: [
      "Isolates runtime environments via CPU-capped, memory-limited, net-disabled Docker sandboxes",
      "Distributes high-throughput jobs asynchronously using BullMQ and Upstash Redis queues",
      "Features real-time output capture with automatic TTL cleanups and truncation controls",
    ],
  },
  {
    slug: "noteroot",
    title: "NoteRoot",
    description:
      "High-performance self-hosted documentation engine using local markdown files as the source of truth.",
    longDescription:
      "NoteRoot is a developer-first documentation platform designed to run in homelabs or internal teams. It intentionally avoids storing document trees or page markdown in relational databases; instead, it treats the local filesystem directories and Markdown files as the absolute source of truth.\n\nThe backend, built in Go (Gin), dynamically indexes and watches the directories to generate hierarchical navigation trees. It compiles into a single, light-weight Go binary by embedding the React/TypeScript Single Page Application directly. A CGO-free SQLite driver handles user authentication and session tokens locally.",
    techStack: ["Go", "React", "TypeScript", "Vite", "SQLite", "Tailwind CSS", "Docker"],
    githubUrl: "https://github.com/RishiBuilds/NoteRoot",
    featured: false,
    impact: "Zero database dependencies for content; zero-config single binary deployment",
    category: "Systems",
    year: 2026,
    status: "live",
    highlights: [
      "Compiles decoupled React/TypeScript UI directly into Go binary using go:embed",
      "Resolves dynamic structural node directories and slugs on the fly with no content DB",
      "Utilizes stateless JWT authentication and a lightweight CGO-free SQLite session database",
    ],
  },
  {
    slug: "mtg-ai",
    title: "MilesToGo AI",
    description:
      "Smart travel planner generating personalized itineraries with interactive 3D globe visualization.",
    longDescription:
      "MilesToGo AI is an intelligent travel planning web application that creates customized, multi-day trip itineraries. Powered by Gemini and location services, it suggests hotels, daily activities, route navigation maps, and local guides.\n\nThe frontend features an interactive, immersive 3D globe visualization to chart destinations. The backend leverages Convex's real-time document store for instantaneous data updates, coupled with Clerk for secure, frictionless user authentication.",
    techStack: ["Next.js", "Convex", "Clerk", "TypeScript", "Tailwind CSS", "Three.js"],
    githubUrl: "https://github.com/RishiBuilds/MTG-AI",
    featured: true,
    impact: "Generates cohesive travel routes with real-time collaborative editing",
    category: "AI & Web",
    year: 2026,
    status: "live",
    highlights: [
      "Generates contextual multi-day travel plans using large language model orchestrations",
      "Renders high-fidelity interactive 3D globes and route lines directly in the browser",
      "Synchronizes itinerary collaborations in real-time across multiple users using Convex",
    ],
  },
  {
    slug: "ai-chattybot",
    title: "AI ChattyBot",
    description:
      "Real-time AI chatbot app with typing indicators, glassmorphic UI, and multi-model routing.",
    longDescription:
      "AI ChattyBot is a real-time conversational chat application. Built with React and Tailwind CSS 4, it interfaces with an Express.js backend and Socket.IO for persistent duplex WebSocket connections. It supports dynamic model switching through the OpenRouter API (including Gemini, Claude, and GPT models). Features include real-time typing indicators, auto-scrolling message streams, connection state indicators, and inline markdown rendering.",
    techStack: ["React", "Socket.IO", "Express.js", "Node.js", "Tailwind CSS", "OpenRouter API"],
    liveUrl: "https://ai-chatty-bot.vercel.app",
    githubUrl: "https://github.com/RishiBuilds/AI-ChattyBot",
    featured: false,
    impact: "Sub-100ms real-time chat sync with multi-model AI routing",
    category: "AI & Web",
    year: 2025,
    status: "live",
    highlights: [
      "Maintains persistent two-way communication channels with WebSockets via Socket.IO",
      "Provides flexible access to Gemini, Claude, and GPT models via OpenRouter routing",
      "Features modern glassmorphism aesthetic styling with Tailwind CSS v4 variables",
    ],
  },
  {
    slug: "devlink",
    title: "DevLink",
    description:
      "Personal developer dashboard to organize bookmarks, markdown notes, and display GitHub contributions.",
    longDescription:
      "DevLink is a developer productivity dashboard. It consolidates scattered browser bookmarks, code snippets, and markdown notes into a clean, mobile-responsive layout. Features include quick note searches, bookmark organization by category, and full integrations with the GitHub API to display active commits, repository stats, and contribution metrics in real-time.",
    techStack: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "JWT",
    ],
    githubUrl: "https://github.com/RishiBuilds/DevLink",
    featured: false,
    impact: "Aggregates coding stats and productivity links in a central dashboard",
    category: "Full-Stack",
    year: 2026,
    status: "live",
    highlights: [
      "Integrates third-party GitHub REST APIs to fetch profile metadata and total commits",
      "Supports secure session states utilizing JWT middleware and encrypted passwords in bcrypt",
      "Adapts with dual desktop sidebar navigation and a custom bottom tab navigation for mobile",
    ],
  },
  {
    slug: "bloommind-ai",
    title: "BloomMind AI",
    description:
      "Calm, client-side wellness companion offering box breathing guides and secure local mood logs.",
    longDescription:
      "BloomMind AI is a minimalist, privacy-first wellness chatbot built entirely client-side. Using vanilla JavaScript and the Google Gemini API, it provides empathetic conversations, breathing exercises, and emotional reflections. By storing all logs locally in localStorage, the application requires no database servers or user profiles, ensuring 100% data privacy.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Gemini API", "Web Audio API", "Web Speech API"],
    liveUrl: "https://bloommind-ai.vercel.app",
    githubUrl: "https://github.com/RishiBuilds/bloommind-ai",
    featured: false,
    impact: "100% client-side data privacy with offline wellness support",
    category: "AI & Web",
    year: 2026,
    status: "live",
    highlights: [
      "Interfaces directly with Gemini 2.5 Flash client-side with full context retention",
      "Features guided 4-4-4 box breathing exercises utilizing custom Web Audio soundscapes",
      "Integrates Web Speech synthesis and recognition APIs for accessible voice operations",
    ],
  },
  {
    slug: "transforming-optimus-prime",
    title: "Transforming Optimus Prime",
    description:
      "Scroll-driven cinematic Optimus Prime transformation with 200 high-res frames, Lore, Gallery, and Timeline pages.",
    longDescription:
      "Transforming Optimus Prime is a scroll-driven, highly interactive web application that renders a cinematic 3D-like transformation of Optimus Prime using 200 sequential high-resolution canvas frames. The project features smooth scroll animations utilizing Framer Motion and canvas rendering contexts to achieve high-performance framerates. It also includes sections for Transformers Lore, an interactive Media Gallery, and a Timeline of Prime's evolution, all designed with a premium, futuristic aesthetic.",
    techStack: ["Next.js", "Framer Motion", "HTML5 Canvas", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/RishiBuilds/transforming-optimus-prime",
    featured: true,
    impact: "Cinematic scroll-driven rendering at 60 FPS in standard browser canvas",
    category: "Creative Web",
    year: 2026,
    status: "live",
    highlights: [
      "Executes high-performance sequential frame rendering on HTML5 Canvas to prevent layout shifts",
      "Coordinates intricate entrance and exit animation sequences utilizing Framer Motion",
      "Features full responsive optimization for touch-based mobile and trackpad scroll events",
    ],
  },
  {
    slug: "nexustick",
    title: "NexusTick",
    description:
      "A Chrome productivity extension combining world clocks, timezone comparisons, Pomodoro timers, and meeting planners.",
    longDescription:
      "NexusTick is a comprehensive developer productivity Chrome extension. It integrates multiple utility widgets into a single sidebar, including a multi-timezone world clock, timezone comparisons, a customizable Pomodoro focus timer, a stopwatch, a countdown timer, and a visual meeting planner. The UI is built using HTML/CSS/JavaScript with local storage persistence, ensuring zero-latency operations and offline availability.",
    techStack: ["JavaScript", "HTML5", "CSS3", "Chrome Extension APIs", "Local Storage"],
    githubUrl: "https://github.com/RishiBuilds/NexusTick",
    featured: false,
    impact: "Consolidates developer workspace utilities in a single sidebar extension",
    category: "Browser Extensions",
    year: 2026,
    status: "live",
    highlights: [
      "Integrates a customizable Pomodoro focus timer with desktop audio alerts",
      "Supports real-time time zone comparison and conversion for remote teams",
      "Stores user settings and meeting schedules locally via Chrome Storage APIs",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectsByCategory = projects.reduce<Record<string, Project[]>>((acc, project) => {
  (acc[project.category] ??= []).push(project);
  return acc;
}, {});

export const projectCategories = [...new Set(projects.map((p) => p.category))];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}