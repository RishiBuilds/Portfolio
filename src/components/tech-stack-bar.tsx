"use client";

import type { TechStackItem } from "@/types";
import Image from "next/image";

export function TechStackBar({ items }: { items: TechStackItem[] }) {
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="bg-card relative col-span-full flex h-14 w-full items-center overflow-hidden rounded-2xl border shadow-xs md:col-span-3"
      aria-label="Tech stack"
      role="marquee"
    >
      <div
        className="from-card pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent"
        aria-hidden
      />
      <div
        className="from-card pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent"
        aria-hidden
      />

      <div
        className="marquee-track"
        style={{ "--item-count": items.length } as React.CSSProperties}
      >
        {tripled.map((tech, idx) => (
          <span
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
                className={`object-contain transition-all duration-200 ${
                  tech.logo.startsWith("/") && tech.logo.endsWith(".svg")
                    ? "dark:invert"
                    : "dark:brightness-90"
                }`}
                unoptimized
              />
            </span>
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
