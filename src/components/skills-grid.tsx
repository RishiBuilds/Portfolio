"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Layers, Server, type LucideIcon } from "lucide-react";
import type { SkillCategory } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code,
  cpu: Cpu,
  layers: Layers,
  server: Server,
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

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-muted/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 cursor-default rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}