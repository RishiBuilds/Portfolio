"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  ExternalLink,
  ChevronRight,
  Building,
} from "lucide-react";
import { events } from "@/data/events";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EventType = "All" | "Meetup" | "Conference" | "Workshop";

const TABS: EventType[] = ["All", "Meetup", "Conference", "Workshop"];

const TYPE_EMOJI: Record<string, string> = {
  Conference: "🎤",
  Workshop:   "💻",
  Meetup:     "🤝",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-muted/50 text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

function hasExpandableDetails(event: (typeof events)[number]): boolean {
  return !!(event.description || event.agenda?.length || event.images?.length);
}

export default function EventsPage() {
  const [activeTab, setActiveTab]       = useState<EventType>("All");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filteredEvents = useMemo(
    () => (activeTab === "All" ? events : events.filter((e) => e.type === activeTab)),
    [activeTab],
  );

  function toggleExpand(slug: string) {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }

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
          Events & Meetups
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mt-2 max-w-2xl text-base leading-7"
        >
          Conferences, technical meetups, and developer gatherings I&apos;ve participated in to
          connect with fellow builders and explore cutting-edge engineering.
        </motion.p>
      </div>

      <motion.div
        variants={itemVariants}
        className="border-border/40 flex flex-wrap gap-1.5 border-b pb-4"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "focus-visible:ring-primary inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
              activeTab === tab
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {tab === "All" ? "All Events" : `${tab}s`}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="flex flex-col gap-6">
          {filteredEvents.map((event) => {
            const isExpanded  = expandedSlug === event.slug;
            const expandable  = hasExpandableDetails(event);

            return (
              <motion.div
                layout
                key={event.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-card hover:border-foreground/20 overflow-hidden rounded-2xl border shadow-xs transition-all duration-300"
              >
                <div className="flex flex-col gap-4 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="scroll-m-20 text-xl font-bold tracking-tight sm:text-2xl text-foreground">
                      {event.title}
                    </h2>
                    <span className="bg-muted text-muted-foreground border-border/50 select-none rounded-full border px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                      {event.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 sm:grid-cols-4">
                    {event.rating && (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold">Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{event.rating}/5</span>
                          <StarRating rating={event.rating} />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-semibold">Location</span>
                      </div>
                      <span className="text-sm font-bold text-foreground truncate">{event.location}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-semibold">Date</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{event.date}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-semibold">Size</span>
                      </div>
                      <span className="text-sm font-bold text-foreground truncate">
                        {event.participants}+ participants
                      </span>
                    </div>
                  </div>

                  <hr className="border-border/60 my-1" />

                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center gap-1.5">
                        <span aria-hidden="true">{TYPE_EMOJI[event.type] ?? "📅"}</span>
                        <span className="font-semibold text-foreground/90">
                          {event.type} &bull; {event.duration}
                        </span>
                      </div>
                      <span className="text-muted-foreground/35 hidden sm:inline">|</span>
                      <div className="flex items-center gap-1.5">
                        <Building className="h-4 w-4 shrink-0" />
                        <span>Hosted by {event.organization}</span>
                      </div>
                      <span className="text-muted-foreground/35 hidden sm:inline">|</span>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                        <span className="text-xs">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-default rounded-md border px-2 py-0.5 text-[10px] font-semibold transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {expandable && (
                    <div className="mt-2 flex items-center justify-between gap-4 pt-1">
                      <div>
                        {event.url && (
                          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-xl">
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`External link to ${event.title}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>

                      <Button
                        onClick={() => toggleExpand(event.slug)}
                        variant="outline"
                        className="rounded-xl px-4 text-xs font-semibold"
                        size="sm"
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                        <ChevronRight
                          className={cn(
                            "ml-1.5 h-3.5 w-3.5 transition-transform duration-200",
                            isExpanded && "rotate-90",
                          )}
                        />
                      </Button>
                    </div>
                  )}
                </div>

                {expandable && (
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-border/60 space-y-6 border-t bg-muted/10 p-5 sm:p-6">
                          {event.description && (
                            <div className="space-y-2">
                              <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                                About the Event
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                                {event.description}
                              </p>
                            </div>
                          )}

                          {event.images && event.images.length > 0 && (
                            <div className="space-y-3.5">
                              <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                                Event Highlights & Media
                              </h3>
                              <div className="flex flex-col gap-4">
                                <div className="border-border/60 relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
                                  <Image
                                    src={event.images[0].url}
                                    alt={event.images[0].caption}
                                    fill
                                    className="object-cover transition-all duration-300"
                                    unoptimized
                                    priority
                                  />
                                  <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-xs">
                                    {event.images[0].caption}
                                  </div>
                                </div>

                                {event.images.length > 1 && (
                                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {event.images.slice(1).map((imgObj) => (
                                      <div
                                        key={imgObj.url}
                                        className="border-border/60 relative aspect-video overflow-hidden rounded-xl border bg-muted shadow-sm"
                                      >
                                        <Image
                                          src={imgObj.url}
                                          alt={imgObj.caption}
                                          fill
                                          className="object-cover transition-all duration-300"
                                          unoptimized
                                        />
                                        <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-xs">
                                          {imgObj.caption}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {event.agenda && event.agenda.length > 0 && (
                            <div className="space-y-4">
                              <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                                Event Agenda
                              </h3>
                              <div className="relative border-l border-border pl-4 ml-2 space-y-5">
                                {event.agenda.map((item, idx) => (
                                  <div key={`${item.time}-${idx}`} className="relative">
                                    <span className="absolute -left-[21.5px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary border-2 border-background" />
                                    <div className="flex flex-col gap-0.5">
                                      <div className="flex flex-wrap items-baseline gap-2">
                                        <span className="text-xs font-bold text-primary tabular-nums">
                                          {item.time}
                                        </span>
                                        <h4 className="text-sm font-bold text-foreground">
                                          {item.title}
                                        </h4>
                                      </div>
                                      {item.description && (
                                        <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl">
                                          {item.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}