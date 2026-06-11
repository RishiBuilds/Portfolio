"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Calendar,
  Users,
  Award,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  Utensils,
  Gift,
  Home,
  GraduationCap,
} from "lucide-react";
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

type Placement = "gold" | "silver" | "bronze" | "participant";

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
  participant: {
    background: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.03) 100%)",
    border: "border-indigo-500/30",
    text: "text-indigo-700 dark:text-indigo-400",
    dot: "bg-indigo-500/10 border-indigo-500/20",
    icon: "text-indigo-500",
  },
};

const DEFAULT_PLACEMENT = PLACEMENT_STYLES.participant;

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

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted/50 text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

const EXPERIENCE_ICONS: Record<string, React.ElementType> = {
  food: Utensils,
  swag: Gift,
  stay: Home,
  mentorship: GraduationCap,
};

function ExperienceRatingRow({
  label,
  rating,
}: {
  label: string;
  rating: number;
}) {
  const Icon = EXPERIENCE_ICONS[label] ?? Star;
  return (
    <div className="bg-muted/30 flex items-center justify-between rounded-lg border px-3 py-2">
      <div className="flex items-center gap-2">
        <Icon className="text-muted-foreground/60 h-3.5 w-3.5" />
        <span className="text-foreground text-xs font-medium capitalize">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <StarRating rating={rating} />
        <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 min-w-[1.5rem] rounded-md px-1.5 py-0.5 text-center text-[10px] font-bold">
          {rating}
        </span>
      </div>
    </div>
  );
}

export function HackathonTimeline({ items }: HackathonTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
        {items.map((item, index) => {
          const style = PLACEMENT_STYLES[item.placement as Placement] ?? DEFAULT_PLACEMENT;
          const isExpanded = expandedIndex === index;
          const hasDetails =
            item.experienceRatings || item.location || item.venue || item.duration;

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

                    {item.rating !== undefined && (
                      <div className="mb-2 flex items-center gap-2">
                        <StarRating rating={item.rating} />
                        <span className="text-muted-foreground text-xs font-medium">
                          Rating: {item.rating}/5
                        </span>
                      </div>
                    )}

                    <p className="text-foreground/80 mb-1 text-sm font-semibold">{item.project}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      {item.location && <MetaItem icon={MapPin}>{item.location}</MetaItem>}
                      {item.duration && (
                        <MetaItem icon={Clock}>{item.duration} Hackathon</MetaItem>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {item.venue && (
                        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                          🏟️ {item.venue}
                        </span>
                      )}
                      <MetaItem icon={Calendar}>{item.date}</MetaItem>
                    </div>

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
                    <MetaItem icon={Users}>
                      {item.teamSize} member{item.teamSize !== 1 ? "s" : ""}
                    </MetaItem>

                    {item.projectUrl && (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors"
                      >
                        {item.project} →
                      </a>
                    )}

                    {item.prize && (
                      <div className="ml-auto flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-emerald-600 sm:ml-0 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Award className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        <span>{item.prize}</span>
                      </div>
                    )}

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-muted/40 hover:bg-muted/80 hover:border-foreground/20 flex h-8 w-8 items-center justify-center rounded-lg border transition-all"
                        aria-label={`Visit ${item.name} page`}
                      >
                        <ExternalLink className="text-muted-foreground h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {hasDetails && (
                  <>
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="hover:bg-muted/50 border-border/40 flex w-full cursor-pointer items-center justify-center gap-1.5 border-t px-5 py-2.5 text-xs font-medium transition-colors"
                    >
                      <span className="text-muted-foreground">
                        {isExpanded ? "Hide" : "View"} Details
                      </span>
                      <ChevronRight
                        className={cn(
                          "text-muted-foreground h-3.5 w-3.5 transition-transform duration-200",
                          isExpanded && "rotate-90",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-border/40 space-y-4 border-t p-5">
                            {/* Info grid */}
                            <div className="bg-muted/20 grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-3">
                              {item.location && (
                                <div className="flex items-start gap-2.5">
                                  <MapPin className="text-muted-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                                  <div>
                                    <p className="text-foreground text-sm font-semibold">
                                      {item.location}
                                    </p>
                                    {item.venue && (
                                      <p className="text-muted-foreground text-xs">{item.venue}</p>
                                    )}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-start gap-2.5">
                                <Calendar className="text-muted-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                                <div>
                                  <p className="text-foreground text-sm font-semibold">
                                    {item.date}
                                  </p>
                                  <p className="text-muted-foreground text-xs">Event Date</p>
                                </div>
                              </div>
                              {item.duration && (
                                <div className="flex items-start gap-2.5">
                                  <Clock className="text-muted-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                                  <div>
                                    <p className="text-foreground text-sm font-semibold">
                                      {item.duration}
                                    </p>
                                    <p className="text-muted-foreground text-xs">Duration</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="bg-muted/20 grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-2">
                              <div className="flex items-start gap-2.5">
                                <Users className="text-muted-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                                <div>
                                  <p className="text-foreground text-sm font-semibold">
                                    {item.teamSize} member{item.teamSize !== 1 ? "s" : ""}
                                  </p>
                                  <p className="text-muted-foreground text-xs">Team Size</p>
                                </div>
                              </div>
                              {item.projectUrl ? (
                                <a
                                  href={item.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/link flex items-start gap-2.5"
                                >
                                  <Gift className="text-muted-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                                  <div>
                                    <p className="text-foreground group-hover/link:text-indigo-500 flex items-center gap-1 text-sm font-semibold transition-colors">
                                      {item.project} →
                                    </p>
                                    <p className="text-muted-foreground text-xs">Project Built</p>
                                  </div>
                                </a>
                              ) : (
                                <div className="flex items-start gap-2.5">
                                  <Gift className="text-muted-foreground/60 mt-0.5 h-4 w-4 shrink-0" />
                                  <div>
                                    <p className="text-foreground text-sm font-semibold">
                                      {item.project}
                                    </p>
                                    <p className="text-muted-foreground text-xs">Project Built</p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {item.experienceRatings && (
                              <div>
                                <div className="mb-3 flex items-center gap-2">
                                  <Star className="text-muted-foreground/60 h-4 w-4" />
                                  <h4 className="text-foreground text-sm font-semibold">
                                    Experience Ratings
                                  </h4>
                                </div>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                  {Object.entries(item.experienceRatings).map(([key, value]) =>
                                    value !== undefined ? (
                                      <ExperienceRatingRow
                                        key={key}
                                        label={key}
                                        rating={value}
                                      />
                                    ) : null,
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
