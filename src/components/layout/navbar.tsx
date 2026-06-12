"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, personalInfo } from "@/data/resume";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "system";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: React.ElementType;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const DEFAULT_THEME_OPTION = THEME_OPTIONS[2];

function NavBrand() {
  return (
    <Link
      href="/"
      className="group focus-visible:ring-primary mr-4 flex items-center gap-2.5 rounded-sm leading-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={`${personalInfo.name} - home`}
    >
      <span
        className="bg-foreground text-background flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold tracking-tight"
        aria-hidden
      >
        {personalInfo.name.charAt(0)}
      </span>
      <span className="text-foreground group-hover:text-primary text-sm font-bold tracking-tight transition-colors">
        {personalInfo.name}
      </span>
    </Link>
  );
}

function NavLinks({
  pathname,
  className,
  onItemClick,
}: {
  pathname: string;
  className?: string;
  onItemClick?: () => void;
}) {
  return (
    <nav className={className} aria-label="Primary navigation">
      <ul className="flex flex-col items-stretch gap-1 md:flex-row md:items-center md:gap-0.5">
        {navItems.map(({ href, label }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onItemClick}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative block rounded-md px-4 py-2.5 text-sm font-medium md:px-3 md:py-1.5",
                  "transition-colors duration-150",
                  "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
                  "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  isActive && "text-foreground bg-muted hover:bg-muted",
                )}
              >
                {label}
                {isActive && (
                  <span
                    className="bg-primary absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full md:bottom-0"
                    aria-hidden
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("h-9 w-9 shrink-0", className)} aria-hidden />;
  }

  const currentOption = THEME_OPTIONS.find((o) => o.value === theme) ?? DEFAULT_THEME_OPTION;
  const CurrentIcon = currentOption.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-9 w-9 shrink-0 rounded-md",
            "text-muted-foreground hover:text-foreground",
            "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1",
            className,
          )}
          aria-label={`Theme: ${currentOption.label}. Change theme`}
        >
          <CurrentIcon className="h-4 w-4 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="animate-in fade-in-0 zoom-in-95 z-[60] w-36"
      >
        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
          const isSelected = theme === value;
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex cursor-pointer items-center gap-2 text-sm",
                isSelected && "text-primary font-medium",
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1">{label}</span>
              {isSelected && <Check className="text-primary h-3 w-3" aria-hidden />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/80 backdrop-blur-md backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-background/60",
        "transition-[border-color] duration-200",
        scrolled ? "border-border/60 border-b" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-12 max-w-screen-md items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <NavBrand />
          <span className="bg-border/60 hidden h-4 w-px shrink-0 md:block" aria-hidden />
          <NavLinks pathname={pathname} className="hidden md:block" />
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle className="hidden md:inline-flex" />

          <Button
            ref={triggerRef}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-primary h-9 w-9 rounded-md focus-visible:ring-2 focus-visible:ring-offset-1 md:hidden"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-background/60 fixed inset-0 top-12 z-40 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden
            />

            <motion.div
              id="mobile-nav-panel"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-background border-border/60 fixed inset-x-0 top-12 z-50 flex flex-col gap-6 border-b px-4 py-6 md:hidden"
            >
              <NavLinks pathname={pathname} onItemClick={closeMenu} />
              <div className="border-border/40 flex justify-end border-t pt-2">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}