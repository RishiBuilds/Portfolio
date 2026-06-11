export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  name: string;
  username: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "youtube" | "website" | "x";
}

export interface PersonalInfo {
  name: string;
  title: string;
  greeting: string;
  location: {
    city: string;
    state: string;
    country: string;
    countryCode: string;
    display: string;
  };
  availableForWork: boolean;
  bio: string[];
  email: string;
  avatarUrl: string;
  resumeUrl: string;
  github?: string;
  linkedin?: string;
  socialLinks: SocialLink[];
}

export interface TechStackItem {
  name: string;
  logo: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logo?: string;
  isCurrent?: boolean;
}

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  impact: string;
  category: string;
  year: number;
  status: "live" | "in-progress" | "archived";
  highlights: string[];
}

export interface HackathonExperienceRatings {
  food?: number;
  swag?: number;
  stay?: number;
  mentorship?: number;
}

export interface Hackathon {
  name: string;
  result: string;
  project: string;
  description: string;
  date: string;
  technologies: string[];
  placement: "gold" | "silver" | "bronze" | "participant";
  teamSize: number;
  prize?: string;
  location?: string;
  venue?: string;
  duration?: string;
  rating?: number;
  url?: string;
  projectUrl?: string;
  experienceRatings?: HackathonExperienceRatings;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  logo?: string;
  location?: string;
  description?: string;
  highlights?: string[];
}
