import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Tag,
  Layers,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const STATUS_STYLES: Record<string, string> = {
  live:        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  "in-progress": "In Progress",
};

const FALLBACK_STATUS_STYLE = "bg-muted text-muted-foreground border-border/50";

function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Rishi Chaurasia`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject  = projects[currentIndex - 1] ?? null;
  const nextProject  = projects[currentIndex + 1] ?? null;

  const resolvedStatus = project.status ? statusLabel(project.status) : null;
  const paragraphs     = project.longDescription.split("\n\n");

  return (
    <div className="flex flex-col pb-12">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground group mb-6 inline-flex w-fit items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
        Back to projects
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="bg-muted/60 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
          <Calendar size={10} />
          {project.year}
        </span>
        {project.category && (
          <span className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            <Tag size={10} />
            {project.category}
          </span>
        )}
        {project.status && (
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase ${STATUS_STYLES[project.status] ?? FALLBACK_STATUS_STYLE}`}
          >
            {resolvedStatus}
          </span>
        )}
        {project.impact && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span aria-hidden="true">⚡</span>
            {project.impact}
          </span>
        )}
      </div>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {project.title}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl && (
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </Button>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-muted-foreground mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
          <Layers size={11} />
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              title={tech}
              className="bg-muted/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-default rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <div className="mt-8 space-y-3">
          <h2 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Key Highlights
          </h2>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="list">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-border/50 bg-card/50 text-muted-foreground hover:border-foreground/25 flex items-start gap-2.5 rounded-xl border p-3.5 text-sm transition-all duration-300 hover:shadow-2xs"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="leading-snug">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 space-y-3">
        <h2 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
          Overview
        </h2>
        <div className="border-border/80 space-y-4 border-l-2 pl-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="border-border/60 bg-muted/10 mt-10 rounded-2xl border px-5 py-4">
        <p className="text-muted-foreground mb-3 text-xs font-bold tracking-widest uppercase">
          Project Details
        </p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <div>
            <dt className="text-muted-foreground/60 mb-0.5 text-[10px] font-bold tracking-wider uppercase">
              Year
            </dt>
            <dd className="text-foreground text-sm font-semibold">{project.year}</dd>
          </div>
          {project.category && (
            <div>
              <dt className="text-muted-foreground/60 mb-0.5 text-[10px] font-bold tracking-wider uppercase">
                Category
              </dt>
              <dd className="text-foreground text-sm font-semibold capitalize">
                {project.category}
              </dd>
            </div>
          )}
          {project.status && (
            <div>
              <dt className="text-muted-foreground/60 mb-0.5 text-[10px] font-bold tracking-wider uppercase">
                Status
              </dt>
              <dd className="text-foreground text-sm font-semibold">{resolvedStatus}</dd>
            </div>
          )}
          <div>
            <dt className="text-muted-foreground/60 mb-0.5 text-[10px] font-bold tracking-wider uppercase">
              Stack size
            </dt>
            <dd className="text-foreground text-sm font-semibold">
              {project.techStack.length} technologies
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 border-t pt-6 sm:gap-4">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="bg-card hover:border-foreground/20 group flex min-w-0 flex-col rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xs"
          >
            <span className="text-muted-foreground mb-1 inline-flex items-center gap-1 text-xs">
              <ArrowLeft size={11} />
              Previous
            </span>
            <span className="group-hover:text-primary truncate text-sm font-semibold transition-colors">
              {prevProject.title}
            </span>
            {prevProject.category && (
              <span className="text-muted-foreground/60 mt-0.5 truncate text-[10px] tracking-wider uppercase">
                {prevProject.category}
              </span>
            )}
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="bg-card hover:border-foreground/20 group flex min-w-0 flex-col items-end rounded-2xl border p-4 text-right transition-all duration-300 hover:scale-[1.01] hover:shadow-2xs"
          >
            <span className="text-muted-foreground mb-1 inline-flex items-center gap-1 text-xs">
              Next
              <ArrowRight size={11} />
            </span>
            <span className="group-hover:text-primary truncate text-sm font-semibold transition-colors">
              {nextProject.title}
            </span>
            {nextProject.category && (
              <span className="text-muted-foreground/60 mt-0.5 truncate text-[10px] tracking-wider uppercase">
                {nextProject.category}
              </span>
            )}
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}