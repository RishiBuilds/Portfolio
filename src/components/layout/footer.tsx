"use client";

import Link from "next/link";
import { personalInfo, navItems } from "@/data/resume";
import { Github, Linkedin, Mail, Twitter, Globe, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import { XIcon } from "@/components/icons";

const ICON_MAP: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
  x: XIcon,
};

const SOCIAL_LINKS = [
  { href: `mailto:${personalInfo.email}`, label: "Email", icon: Mail },
  ...personalInfo.socialLinks.map((link) => ({
    href: link.url,
    label: link.name,
    icon: ICON_MAP[link.icon] || Globe,
  })),
];

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md",
        "text-muted-foreground/50 hover:text-foreground hover:bg-muted/60",
        "transition-colors duration-150",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-border/40 bg-background/30 mt-12 w-full border-t backdrop-blur-xs"
      aria-label="Site footer"
    >
      <div className="mx-auto flex max-w-screen-md flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
        <p className="text-muted-foreground/50 text-xs font-medium">
          © {year} {personalInfo.name}
        </p>

        <nav aria-label="Footer navigation" className="flex items-center gap-0.5">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                "text-muted-foreground/50 hover:text-foreground hover:bg-muted/60",
                "transition-colors duration-150",
                "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-md items-center justify-center px-4 pb-4">
        <span className="text-muted-foreground/30 text-[10px] font-medium tracking-wide">
          Built with Next.js & Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
