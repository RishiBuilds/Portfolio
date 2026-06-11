import type {
  PersonalInfo,
  Experience,
  SkillCategory,
  Hackathon,
  NavItem,
  TechStackItem,
  Education,
} from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Work", href: "/work" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const personalInfo: PersonalInfo = {
  name: "Rishi Chaurasia",
  title: "AI Engineer & Full-Stack Developer",
  greeting: "Hi, I'm Rishi 👋",
  availableForWork: true,
  location: {
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    countryCode: "IN",
    display: "Mumbai, Maharashtra",
  },
  bio: [
    "I design and ship AI-powered products end-to-end — from GenAI pipelines and computer vision systems to the full-stack interfaces people actually use.",
    "Primarily working in TypeScript, Next.js, Python, LangChain, PostgreSQL, and Docker. I treat the stack as a toolbox, not a religion.",
  ],
  email: "rishi.chaurasia.dev@gmail.com",
  avatarUrl: "/avatar.jpg",
  resumeUrl: "/resume",
  github: "https://github.com/RishiBuilds",
  linkedin: "https://linkedin.com/in/rishi-chaurasiya",
  socialLinks: [
    {
      name: "GitHub",
      username: "RishiBuilds",
      url: "https://github.com/RishiBuilds",
      icon: "github",
    },
    {
      name: "LinkedIn",
      username: "rishi-chaurasiya",
      url: "https://linkedin.com/in/rishi-chaurasiya",
      icon: "linkedin",
    },
    { name: "X", username: "rishitwts_", url: "https://x.com/rishitwts_", icon: "x" },
  ],
};

export const techStack: TechStackItem[] = [
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000/fff" },
  { name: "React", logo: "https://cdn.simpleicons.org/react" },
  { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi" },
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/000/fff" },
  { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch" },
  { name: "OpenAI", logo: "/openai.svg" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql" },
  { name: "Redis", logo: "https://cdn.simpleicons.org/redis" },
  { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb" },
  { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/000/fff" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
  { name: "AWS", logo: "/aws.svg" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/000/fff" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "GraphQL", logo: "https://cdn.simpleicons.org/graphql" },
  { name: "Git", logo: "https://cdn.simpleicons.org/git" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss" },
];

export const experiences: Experience[] = [];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: "code",
    color: "#6366f1",
    skills: [
      { name: "Python", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "JavaScript", level: 4 },
      { name: "SQL", level: 3 },
      { name: "C++", level: 2 },
    ],
  },
  {
    category: "AI / ML",
    icon: "cpu",
    color: "#8b5cf6",
    skills: [
      { name: "LangChain", level: 4 },
      { name: "OpenAI API", level: 4 },
      { name: "RAG", level: 4 },
      { name: "PyTorch", level: 3 },
      { name: "TensorFlow", level: 3 },
      { name: "Hugging Face", level: 3 },
      { name: "Computer Vision", level: 3 },
      { name: "Fine-tuning", level: 3 },
    ],
  },
  {
    category: "Frontend",
    icon: "layers",
    color: "#10b981",
    skills: [
      { name: "Next.js", level: 4 },
      { name: "React", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "HTML / CSS", level: 4 },
      { name: "Framer Motion", level: 3 },
    ],
  },
  {
    category: "Backend & Infra",
    icon: "server",
    color: "#f59e0b",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Git", level: 4 },
      { name: "Vercel", level: 4 },
      { name: "FastAPI", level: 3 },
      { name: "PostgreSQL", level: 3 },
      { name: "Docker", level: 3 },
      { name: "MongoDB", level: 3 },
      { name: "AWS", level: 3 },
    ],
  },
];

export const hackathons: Hackathon[] = [
  {
    name: "Codex Mumbai 2026",
    result: "Participated",
    project: "codex-swarm",
    description:
      "Build and ship AI-powered tools using coding agents alongside a community of serious builders.",
    date: "April 4, 2026",
    technologies: [],
    placement: "participant",
    teamSize: 3,
    location: "Mumbai",
    venue: "SudoMeet",
    duration: "8 hours",
    rating: 4,
    url: "https://luma.com/exg4kejt?tk=DjB9BP",
    projectUrl: "https://github.com/RishiBuilds/codex-swarm",
    experienceRatings: {
      food: 4,
      swag: 4,
      stay: 4,
      mentorship: 4,
    },
  },
  {
    name: "Campfire Mumbai 2026",
    result: "2nd Runner Up",
    project: "Godot Game Entry",
    description:
      "A 24-hour game jam where we built a game from scratch using Godot and competed for prizes.",
    date: "Feb 28 - Mar 1, 2026",
    technologies: ["Godot", "GDScript", "Game Design"],
    placement: "bronze",
    teamSize: 3,
    prize: "Shark Plushie",
    location: "Mumbai",
    venue: "Our Desk",
    duration: "24 hours",
    rating: 5,
    experienceRatings: {
      food: 4,
      swag: 4,
      stay: 4,
      mentorship: 5,
    },
  },
];

export const education: Education[] = [
  {
    school: "Mumbai University",
    degree: "Computer Science & Engineering (AI & ML)",
    duration: "2024 — 2027",
    logo: "/mumbai-university.png",
  },
];

export const currentRole = experiences.find((e) => e.isCurrent);

export const totalHackathonPrize = hackathons.reduce(
  (sum, h) => sum + (h.prize ? parseInt(h.prize.replace(/\D/g, ""), 10) : 0),
  0,
);
