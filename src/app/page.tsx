"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
  FileDown,
  Eye,
  X,
  GraduationCap,
  Trophy,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  personalInfo,
  techStack,
  skillCategories,
  hackathons,
  totalHackathonPrize,
  education,
  certifications,
} from "@/data/resume";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TechStackBar } from "@/components/tech-stack-bar";
import { SkillsGrid } from "@/components/skills-grid";
import { HackathonTimeline } from "@/components/hackathon-timeline";
import { OrgLogo } from "@/components/org-logo";
import { XIcon } from "@/components/icons";

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  x: <XIcon className="h-5 w-5" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

const hackathonPrizeLabel = (() => {
  const count = hackathons.length;
  const countLabel = `${count} hackathon${count !== 1 ? "s" : ""}`;
  return totalHackathonPrize > 0
    ? `${countLabel} · $${totalHackathonPrize.toLocaleString()} in cash prizes`
    : `${countLabel} attended`;
})();

function SectionHeader({
  icon: Icon,
  title,
  description,
  aside,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-1 border-b pb-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <Icon className="text-muted-foreground/80 h-5 w-5" />
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        {description && <p className="text-muted-foreground mt-0.5 text-sm">{description}</p>}
      </div>
      {aside && (
        <span className="text-muted-foreground shrink-0 text-xs font-semibold">{aside}</span>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="bg-card hover:border-foreground/20 flex flex-col rounded-2xl border p-5 shadow-xs transition-all duration-300 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="scroll-m-20 text-xl font-bold tracking-tight sm:text-2xl">
              {project.title}
            </h3>
            <span className="bg-muted/60 text-muted-foreground rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
              {project.year}
            </span>
            <span className="bg-muted/50 text-muted-foreground rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

          {project.impact && (
            <span className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span aria-hidden="true">⚡</span>
              {project.impact}
            </span>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className="mt-3 space-y-1">
              {project.highlights.slice(0, 3).map((highlight) => (
                <li
                  key={highlight}
                  className="text-muted-foreground flex items-start gap-2 text-xs"
                >
                  <span
                    className="bg-foreground/20 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 self-start">
          {project.liveUrl && (
            <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-lg">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-lg">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="bg-muted/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-default rounded-md border px-2 py-0.5 text-[10px] font-semibold transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Button asChild variant="outline" className="w-full rounded-lg sm:w-fit" size="sm">
          <Link href={`/projects/${project.slug}`}>
            View details <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ResumeModal({
  isOpen,
  onClose,
  resumeUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="bg-background/80 fixed inset-0 cursor-pointer backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-card border-border/80 relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
          >
            <div className="border-border/40 bg-muted/20 flex items-center justify-between border-b px-6 py-4">
              <div className="flex flex-col">
                <h2 className="text-foreground text-base font-bold tracking-tight">
                  Resume Preview
                </h2>
                <p className="text-muted-foreground mt-0.5 text-[10px] font-semibold tracking-widest uppercase">
                  Rishi Chaurasia
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
                >
                  <a href={resumeUrl} download="Rishi_Chaurasia_Resume.pdf">
                    <FileDown className="h-3.5 w-3.5" />
                    Download
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="hover:bg-muted/85 text-muted-foreground hover:text-foreground cursor-pointer rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 h-full flex-1 p-2 sm:p-4">
              <iframe
                src="/resume"
                className="border-border/50 bg-background h-full w-full rounded-xl border"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function HomePage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const openPreview = useCallback(() => setIsPreviewOpen(true), []);
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10 pb-12"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-start"
      >
        <div className="flex flex-1 flex-col gap-3">
          {personalInfo.availableForWork && (
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <h1 className="scroll-m-20 text-4xl leading-none font-extrabold tracking-tight sm:text-5xl">
              {personalInfo.greeting}
            </h1>
            <p className="text-muted-foreground text-lg font-semibold tracking-tight sm:text-xl">
              {personalInfo.title}
            </p>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <div className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
              <MapPin className="text-muted-foreground/80 h-4 w-4" />
              <span>{personalInfo.location.display}</span>
            </div>
            <span className="text-muted-foreground/30 hidden sm:inline">•</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={openPreview}
                className="h-8 cursor-pointer gap-1.5 rounded-lg text-xs font-semibold"
              >
                <Eye className="h-3.5 w-3.5" />
                Preview Resume
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 gap-1.5 rounded-lg text-xs font-semibold"
              >
                <a href={personalInfo.resumeUrl} download="Rishi_Chaurasia_Resume.pdf">
                  <FileDown className="h-3.5 w-3.5" />
                  Download
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-2 space-y-4">
            {personalInfo.bio.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground max-w-2xl text-base leading-7">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <motion.div
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border bg-muted shadow-md sm:h-28 sm:w-28 md:h-32 md:w-32"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={personalInfo.avatarUrl}
            alt={personalInfo.name}
            fill
            sizes="(min-width: 768px) 8rem, 6rem"
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Card variant="interactive" className="flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl font-extrabold tracking-tight md:text-4xl text-primary">
            {projects.length}
          </span>
          <span className="text-muted-foreground mt-1 text-[10px] font-semibold tracking-widest uppercase">
            Projects Built
          </span>
        </Card>
        <Card variant="interactive" className="flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl font-extrabold tracking-tight md:text-4xl text-primary">
            {techStack.length}
          </span>
          <span className="text-muted-foreground mt-1 text-[10px] font-semibold tracking-widest uppercase">
            Technologies
          </span>
        </Card>
        <Card variant="interactive" className="flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl font-extrabold tracking-tight md:text-4xl text-primary">
            {hackathons.length}
          </span>
          <span className="text-muted-foreground mt-1 text-[10px] font-semibold tracking-widest uppercase">
            Hackathons
          </span>
        </Card>
        <Card variant="interactive" className="flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl font-extrabold tracking-tight md:text-4xl text-primary">
            {certifications.length}
          </span>
          <span className="text-muted-foreground mt-1 text-[10px] font-semibold tracking-widest uppercase">
            Certifications
          </span>
        </Card>
        <Card variant="interactive" className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-primary leading-7 truncate max-w-full px-1">
            AI & ML
          </span>
          <span className="text-muted-foreground mt-1 text-[10px] font-semibold tracking-widest uppercase">
            Specialization
          </span>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <TechStackBar items={techStack} />
        {personalInfo.socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label={`${link.name} profile @${link.username}`}
          >
            <Card variant="interactive" size="sm" className="h-full">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex flex-col gap-0.5">
                  <CardTitle className="text-sm font-semibold">{link.name}</CardTitle>
                  <CardDescription className="text-xs">@{link.username}</CardDescription>
                </div>
                <div className="text-muted-foreground group-hover/card:text-foreground transition-colors">
                  {socialIcons[link.icon]}
                </div>
              </CardHeader>
            </Card>
          </a>
        ))}
      </motion.div>

      <motion.section variants={itemVariants} className="flex flex-col">
        <SectionHeader icon={Sparkles} title="Skills & Expertise" />
        <SkillsGrid categories={skillCategories} />
      </motion.section>

      {education.length > 0 && (
        <motion.section variants={itemVariants} className="flex flex-col">
          <SectionHeader icon={GraduationCap} title="Education" />
          <div className="space-y-3">
            {education.map((edu) => (
              <div
                key={`${edu.school}-${edu.duration}`}
                className="bg-card hover:border-foreground/20 flex items-start gap-4 rounded-2xl border p-5 shadow-xs transition-all duration-300"
              >
                <OrgLogo src={edu.logo} alt={edu.school} fallback={edu.school} />
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-col">
                    <h3 className="text-base font-bold tracking-tight">{edu.school}</h3>
                    <p className="text-muted-foreground mt-0.5 text-sm">{edu.degree}</p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-xs">{edu.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {certifications.length > 0 && (
        <motion.section variants={itemVariants} className="flex flex-col">
          <SectionHeader icon={Award} title="Licenses & Certifications" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={`${cert.name}-${cert.date}`}
                className="bg-card hover:border-foreground/20 flex items-start gap-4 rounded-2xl border p-5 shadow-xs transition-all duration-300"
              >
                <OrgLogo src={cert.logo} alt={cert.issuer} fallback={cert.issuer} />
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div className="flex min-w-0 flex-col">
                      <h3 className="text-sm font-bold tracking-tight">{cert.name}</h3>
                      <p className="text-muted-foreground mt-0.5 text-xs">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-muted-foreground/60 mt-1 text-[10px] font-mono">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-muted-foreground shrink-0 text-[10px] font-medium">{cert.date}</span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground text-muted-foreground inline-flex items-center gap-0.5 text-[10px] font-semibold transition-colors"
                      >
                        Verify <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section variants={itemVariants} className="flex flex-col">
        <SectionHeader
          icon={Sparkles}
          title="Featured Projects"
          description="A selection of recent developer tools, AI platforms, and production systems."
        />
        <div className="space-y-5">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Button variant="outline" asChild className="gap-1.5 rounded-xl">
            <Link href="/projects">
              View all projects <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </motion.section>

      {hackathons.length > 0 && (
        <motion.section variants={itemVariants} className="flex flex-col">
          <SectionHeader icon={Trophy} title="Hackathons & Achievements" aside={hackathonPrizeLabel} />
          <HackathonTimeline items={hackathons} />
        </motion.section>
      )}

      <ResumeModal
        isOpen={isPreviewOpen}
        onClose={closePreview}
        resumeUrl={personalInfo.resumeUrl}
      />
    </motion.div>
  );
}