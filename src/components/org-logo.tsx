"use client";

import { useState } from "react";

export function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export interface OrgLogoProps {
  src?: string;
  alt: string;
  fallback: string;
  hoverEffect?: boolean;
}

export function OrgLogo({ src, alt, fallback, hoverEffect = false }: OrgLogoProps) {
  const [hasError, setHasError] = useState(false);
  const fallbackText = fallback.length > 3 ? getInitials(fallback) : fallback;

  return (
    <div className="border-border/80 from-muted/95 to-muted/30 text-muted-foreground relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br text-sm font-bold tracking-wide shadow-2xs select-none">
      {!src || hasError ? (
        <span className={hoverEffect ? "group-hover:text-foreground transition-colors" : ""}>
          {fallbackText}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          width={44}
          height={44}
          className="absolute inset-0 h-full w-full bg-white object-contain p-1"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
