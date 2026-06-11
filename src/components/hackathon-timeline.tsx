"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Hackathon } from "@/types";

interface HackathonTimelineProps {
  items: Hackathon[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type Placement = "gold" | "silver" | "bronze";

const PLACEMENT_STYLES: Record<
  Placement,
  { background: string; border: string; text: string; dot: string; icon: string }
> = {
  gold: {
    background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(251,191,36,0.03) 100%)",
    border: "border-amber-500/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500/10 border-amber-500/20",
    icon: "text-amber-500",
  },
  silver: {
    background: "linear-gradient(135deg, rgba(148,163,184,0.12) 0%, rgba(203,213,225,0.03) 100%)",
    border: "border-slate-500/30",
    text: "text-slate-700 dark:text-slate-300",
    dot: "bg-slate-500/10 border-slate-500/20",
    icon: "text-slate-500",
  },
  bronze: {
    background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(253,186,116,0.03) 100%)",
    border: "border-orange-500/30",
    text: "text-orange-700 dark:text-orange-400",
    dot: "bg-orange-500/10 border-orange-500/20",
    icon: "text-orange-500",
  },
};

const DEFAULT_PLACEMENT = PLACEMENT_STYLES.silver;

function MetaItem({
  icon: Icon,
  children,
  className,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-muted-foreground flex items-center gap-1.5 text-xs", className)}>
      <Icon className="text-muted-foreground/60 h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export function HackathonTimeline({ items }: HackathonTimelineProps) {
  if (!items.length) return null;

  return (
    <div className="relative mt-6 ml-3 pl-6 sm:ml-5 sm:pl-8">
      <div
        className="from-border via-border absolute top-2 bottom-2 left-0 w-px bg-gradient-to-b to-transparent"
        aria-hidden
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-5"
      >
        {items.map((item) => {
          const style = PLACEMENT_STYLES[item.placement as Placement] ?? DEFAULT_PLACEMENT;

          return (
            <motion.div key={item.name} variants={itemVariants} className="group relative">
              <span
                className={cn(
                  "bg-background group-hover:border-foreground/30 absolute top-4 -left-[35px] z-10 flex h-6 w-6 items-center justify-center rounded-full border transition-colors sm:-left-[43px]",
                  style.dot,
                )}
                aria-hidden
              >
                <Trophy className={cn("h-3 w-3", style.icon)} />
              </span>

              <div className="bg-card hover:border-foreground/20 overflow-hidden rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-sm">
                <div
                  className={cn(
                    "flex flex-col justify-between gap-4 border-l-2 p-5 sm:flex-row",
                    style.border,
                  )}
                  style={{ background: style.background }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2.5 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase",
                          style.border,
                          style.text,
                        )}
                      >
                        <Trophy className="h-2.5 w-2.5" aria-hidden />
                        {item.result}
                      </span>
                      <span className="text-foreground truncate text-sm font-bold">
                        {item.name}
                      </span>
                    </div>

                    <p className="text-foreground/80 mb-1 text-sm font-semibold">{item.project}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {item.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 cursor-default rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-150"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-border/40 flex shrink-0 flex-row items-center justify-start gap-3 border-t pt-3.5 sm:flex-col sm:items-end sm:justify-start sm:gap-2 sm:border-t-0 sm:pt-0">
                    <MetaItem icon={Calendar}>{item.date}</MetaItem>
                    <MetaItem icon={Users}>Team of {item.teamSize}</MetaItem>

                    {item.prize && (
                      <div className="ml-auto flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-emerald-600 sm:ml-0 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Award className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span>{item.prize}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
