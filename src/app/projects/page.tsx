"use client";

import Link from "next/link";
import { ExternalLink, Github, ChevronRight, Check, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  live:          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  archived:      "bg-muted text-muted-foreground border-border/50",
};

const STATUS_LABELS: Record<string, string> = {
  "in-progress": "In Progress",
};

const FALLBACK_STATUS_STYLE = STATUS_STYLES.archived;

function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { categories, categoryCounts } = useMemo(() => {
    const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
    const counts = Object.fromEntries(
      cats.map((cat) => [
        cat,
        cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length,
      ]),
    );
    return { categories: cats, categoryCounts: counts };
  }, []);

  const filteredProjects = useMemo(
    () => (activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8 pb-12"
    >
      <div>
        <motion.h1
          variants={itemVariants}
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Projects
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mt-2 max-w-2xl text-base leading-7"
        >
          Full-stack projects, AI applications, and developer tools I&apos;ve built —{" "}
          {projects.length} projects and counting.
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="border-border/40 flex flex-wrap gap-1.5 border-b pb-4"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "focus-visible:ring-primary inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
              activeCategory === cat
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {cat}
            <span
              className={cn(
                "rounded-full px-1.5 py-px text-[10px] font-bold tabular-nums",
                activeCategory === cat
                  ? "bg-background/20 text-background"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {categoryCounts[cat]}
            </span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="flex flex-col gap-5">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-border/60 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-16 text-center"
            >
              <FolderOpen className="text-muted-foreground/40 h-8 w-8" />
              <p className="text-muted-foreground text-sm font-semibold">
                No projects in this category yet.
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="bg-card hover:border-foreground/20 flex flex-col rounded-2xl border p-5 shadow-xs transition-all duration-300 sm:p-6"
              >
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="scroll-m-20 text-xl font-bold tracking-tight sm:text-2xl">
                        {project.title}
                      </h3>
                      <span className="bg-muted/60 text-muted-foreground rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                        {project.year}
                      </span>
                      <span className="bg-muted/50 text-muted-foreground rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                        {project.category}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${STATUS_STYLES[project.status] ?? FALLBACK_STATUS_STYLE}`}
                      >
                        {statusLabel(project.status)}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {project.impact && (
                      <span className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <span aria-hidden="true">⚡</span>
                        {project.impact}
                      </span>
                    )}

                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2" role="list">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span
                              className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              aria-hidden="true"
                            >
                              <Check className="h-2.5 w-2.5" />
                            </span>
                            <span className="leading-normal">{highlight}</span>
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

                <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-muted/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-default rounded-md border px-2 py-0.5 text-[10px] font-semibold transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full shrink-0 rounded-lg sm:w-fit"
                    size="sm"
                  >
                    <Link href={`/projects/${project.slug}`}>
                      View details
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}