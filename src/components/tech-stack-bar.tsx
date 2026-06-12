"use client";

import type { TechStackItem } from "@/types";
import Image from "next/image";

const LOCAL_SVG_NEEDS_INVERT = new Set(["/openai.svg", "/aws.svg"]);

function logoClassName(logo: string): string {
  return LOCAL_SVG_NEEDS_INVERT.has(logo) ? "dark:invert" : "dark:brightness-90";
}

export function TechStackBar({ items }: { items: TechStackItem[] }) {
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="bg-card relative col-span-full flex h-14 w-full items-center overflow-hidden rounded-2xl border shadow-xs md:col-span-3"
      aria-label="Tech stack"
    >
      <div
        className="from-card pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent"
        aria-hidden
      />
      <div
        className="from-card pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent"
        aria-hidden
      />

      <ul className="marquee-track list-none" aria-hidden>
        {tripled.map((tech, idx) => (
          <li
            key={`${tech.name}-${idx}`}
            className="text-muted-foreground hover:text-foreground flex cursor-default items-center gap-2 px-3 text-xs font-semibold whitespace-nowrap transition-colors duration-150 select-none"
            title={tech.name}
          >
            <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
              <Image
                src={tech.logo}
                alt=""
                width={18}
                height={18}
                className={`object-contain transition-all duration-200 ${logoClassName(tech.logo)}`}
                unoptimized
              />
            </span>
            {tech.name}
          </li>
        ))}
      </ul>

      <span className="sr-only">
        {items.map((tech) => tech.name).join(", ")}
      </span>
    </div>
  );
}