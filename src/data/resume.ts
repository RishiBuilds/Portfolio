import type {
  PersonalInfo,
  Experience,
  SkillCategory,
  Hackathon,
  NavItem,
  TechStackItem,
  Education,
  Certification,
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
    "I design and ship AI-powered products end-to-end from GenAI pipelines and computer vision systems to the full-stack interfaces people actually use.",
    "Primarily working in TypeScript, Next.js, Python, LangChain, PostgreSQL, and Docker. I treat the stack as a toolbox, not a religion.",
  ],
  email: "rishi.chaurasia.dev@gmail.com",
  avatarUrl: "/avatar.jpg",
  resumeUrl: "/resume",
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
    {
      name: "X",
      username: "rishitwts_",
      url: "https://x.com/rishitwts_",
      icon: "x",
    },
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

export const experiences: Experience[] = [
  {
    company: "Thiranex",
    role: "Cybersecurity Intern",
    duration: "Jun 2026 - Present",
    startDate: "2026-06",
    location: "Remote",
    description: "Remote cybersecurity internship focused on vulnerability analysis, threat modeling, and application security audits.",
    technologies: ["Python", "Linux", "Wireshark", "Nmap", "OWASP Top 10"],
    highlights: [
      "Conducted regular vulnerability scans and security assessments on web application assets",
      "Analyzed network traffic logs and system logs to identify potential threat vectors",
      "Documented security findings and remediation steps following OWASP testing guidelines"
    ],
    isCurrent: true,
  },
  {
    company: "LetsUpgrade",
    role: "Student Ambassador & Peer Mentor",
    duration: "Jul 2025 - Aug 2025",
    startDate: "2025-07",
    endDate: "2025-08",
    location: "Mumbai, India (Remote)",
    description: "Promoted tech education, coordinated bootcamps, and mentored student developers on SQL and web technologies.",
    technologies: ["SQL", "HTML", "CSS", "JavaScript", "Community Management"],
    highlights: [
      "Organized and promoted coding workshops and tech bootcamps, onboarding 50+ students",
      "Mentored peer students through introductory programming courses and SQL labs",
      "Awarded LetsUpgrade Silver Award for outstanding contributions to the student developer community"
    ],
    isCurrent: false,
  },
];

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
    name: "Monad Blitz Mumbai V3",
    result: "Participated",
    project: "AgentDAO",
    description:
      "A high-intensity, 12-hour IRL build sprint in Mumbai. Co-built and shipped an autonomous AI governance system that allows AI agents to register, propose marketing campaigns, evaluate them, and distribute funds on-chain.",
    date: "June 20, 2026",
    technologies: ["Solidity", "Foundry", "Python", "LangChain", "Next.js", "Express", "Monad"],
    placement: "participant",
    teamSize: 3,
    location: "Mumbai",
    venue: "IRL Build Sprint",
    duration: "12 hours",
    rating: 5,
    projectUrl: "https://github.com/RishiBuilds/AgentDao",
    experienceRatings: {
      food: 4,
      swag: 3,
      stay: 4,
      mentorship: 2,
    },
  },
  {
    name: "Codex Mumbai 2026",
    result: "Participated",
    project: "codex-swarm",
    description:
      "Build and ship AI-powered tools using coding agents alongside a community of serious builders.",
    date: "April 4, 2026",
    technologies: ["TypeScript", "Node.js", "AI Agents"],
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
    duration: "2024 - 2027",
    logo: "/mumbai-university.png",
  },
];

export const certifications: Certification[] = [
  {
    name: "Gemini Certified University Student",
    issuer: "Google for Education",
    date: "Jan 2026",
    credentialId: "bc3a1b24-aaa3-46eb-b532-99f919daa091",
    credentialUrl: "https://edu.google.accredible.com/bc3a1b24-aaa3-46eb-b532-99f919daa091",
  },
  {
    name: "Deloitte Australia - Cyber Job Simulation",
    issuer: "Forage",
    date: "Jul 2025",
    credentialId: "7qJTNnSBM7PK3ibBx",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_8JySymfkd6X7ZS9RK_1751881512692_completion_certificate.pdf",
  },
  {
    name: "Certified Data Scientist",
    issuer: "HP LIFE",
    date: "Jul 2025",
    credentialId: "98700d2d-0df9-481b-aa03-beb024c6eecb",
    credentialUrl: "https://www.life-global.org/certificate/98700d2d-0df9-481b-aa03-beb024c6eecb",
  },
  {
    name: "SQL",
    issuer: "LetsUpgrade",
    date: "Jul 2025",
    credentialId: "LUESQLJUN1251104",
    credentialUrl: "https://verify.letsupgrade.in/certificate/LUESQLJUN1251104",
  },
  {
    name: "Neo4j Certified Professional",
    issuer: "Neo4j",
    date: "Jul 2025",
    credentialId: "1f7e042f-7697-48e3-9dfe-5ba70b42600e",
    credentialUrl: "https://graphacademy.neo4j.com/c/1f7e042f-7697-48e3-9dfe-5ba70b42600e/",
  },
  {
    name: "Prompt Engineering for Everyone",
    issuer: "Cognitive Class",
    date: "Jan 2025",
    credentialId: "00c23b75f3b042b598ad8e1b65b69041",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/00c23b75f3b042b598ad8e1b65b69041",
  },
];

export const currentRole = experiences.find((e) => e.isCurrent);

export const totalHackathonPrize = hackathons.reduce((sum, h) => {
  if (!h.prize) return sum;
  const digits = h.prize.replace(/\D/g, "");
  return digits ? sum + parseInt(digits, 10) : sum;
}, 0);

export function getSocialLink(name: string) {
  return personalInfo.socialLinks.find(
    (link) => link.name.toLowerCase() === name.toLowerCase(),
  );
}