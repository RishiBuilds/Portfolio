"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="border-border/80 bg-muted/30 text-muted-foreground/80 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border">
          <Compass className="h-8 w-8 animate-pulse" />
        </div>

        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl">404</h1>
        <h2 className="text-foreground mt-3 text-xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-7 sm:text-base">
          Sorry, we couldn&apos;t find the page you were looking for. The link might be broken or
          the page may have moved.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-8 flex w-full max-w-sm flex-col items-center gap-4"
      >
        <Button asChild className="w-full rounded-xl">
          <Link href="/">Go back home</Link>
        </Button>

        <div className="border-border/40 my-2 w-full border-t" />

        <div className="text-muted-foreground/80 w-full space-y-2.5 text-left text-xs font-medium">
          <p className="text-muted-foreground/60 mb-3 text-center text-[10px] font-bold tracking-wider uppercase">
            Quick Navigation Links
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/projects"
              className="border-border/60 bg-card/50 hover:border-foreground/30 hover:bg-muted/30 group flex items-center justify-between rounded-xl border p-3 transition-all"
            >
              <span>Projects</span>
              <ArrowRight
                size={12}
                className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/work"
              className="border-border/60 bg-card/50 hover:border-foreground/30 hover:bg-muted/30 group flex items-center justify-between rounded-xl border p-3 transition-all"
            >
              <span>Work</span>
              <ArrowRight
                size={12}
                className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
