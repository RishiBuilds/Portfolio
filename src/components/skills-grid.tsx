"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Layers, Server, type LucideIcon } from "lucide-react";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code,
  cpu: Cpu,
  layers: Layers,
  server: Server,
};

const LEVEL_LABELS: Record<number, string> = {
  1: "Familiar",
  2: "Comfortable",
  3: "Proficient",
  4: "Expert",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface SkillsGridProps {
  categories: SkillCategory[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {categories.map((category) => {
        const Icon = ICON_MAP[category.icon] ?? Code;
        return (
          <motion.div
            key={category.category}
            variants={itemVariants}
            className="bg-card hover:border-foreground/20 flex flex-col rounded-2xl border p-5 shadow-xs transition-all duration-300 hover:shadow-sm"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <div className="bg-muted text-muted-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm leading-none font-semibold tracking-tight">
                  {category.category}
                </h3>
                <p className="text-muted-foreground/60 mt-0.5 text-[11px]">
                  {category.skills.length} skill{category.skills.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group/row hover:bg-muted/40 -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-1 transition-colors duration-150"
                  title={`${skill.name}: ${LEVEL_LABELS[skill.level]}`}
                >
                  <span className="text-muted-foreground group-hover/row:text-foreground truncate text-sm font-medium transition-colors duration-150">
                    {skill.name}
                  </span>

                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex items-center gap-[3px]">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i <= skill.level
                              ? cn(
                                  "bg-primary w-4",
                                  skill.level === 4 && "bg-primary",
                                  skill.level === 3 && i <= 3 && "opacity-90",
                                  skill.level === 2 && i <= 2 && "opacity-80",
                                  skill.level === 1 && i === 1 && "opacity-70",
                                )
                              : "bg-muted-foreground/15 w-3",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground/50 group-hover/row:text-muted-foreground w-[4.5rem] text-right text-[10px] font-semibold transition-colors duration-150">
                      {LEVEL_LABELS[skill.level]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
