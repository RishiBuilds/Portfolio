"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Locate } from "lucide-react";

const IPGEO_API_KEY = process.env.NEXT_PUBLIC_IPGEO_API_KEY ?? "";

function getTimezoneAbbr(): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(
      new Date(),
    );
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}

function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

interface LocationInfo {
  city: string;
  country: string;
  countryCode: string;
}

const PROVIDERS: Array<() => Promise<LocationInfo>> = [
  async () => {
    const res = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_API_KEY}&fields=city,country_name,country_code2`,
    );
    if (!res.ok) throw new Error();
    const d = await res.json();
    if (!d.city) throw new Error();
    return { city: d.city, country: d.country_name ?? "", countryCode: d.country_code2 ?? "" };
  },
  async () => {
    const res = await fetch("https://freeipapi.com/api/json");
    if (!res.ok) throw new Error();
    const d = await res.json();
    if (!d.cityName) throw new Error();
    return { city: d.cityName, country: d.countryName ?? "", countryCode: d.countryCode ?? "" };
  },
];

async function fetchLocation(): Promise<LocationInfo> {
  for (const provider of PROVIDERS) {
    try {
      return await provider();
    } catch {
      continue;
    }
  }
  throw new Error("All providers failed");
}

export function TopInfoBar() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [tzAbbr, setTzAbbr] = useState<string>("");
  const [location, setLocation] = useState<LocationInfo>({
    city: "Detecting...",
    country: "",
    countryCode: "",
  });

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    setTzAbbr(getTimezoneAbbr());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let active = true;

    fetchLocation()
      .then((info) => {
        if (active) setLocation(info);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [mounted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card text-card-foreground border-border flex h-10 w-full items-center justify-between overflow-hidden border-b px-6 font-sans select-none md:px-10 dark:border-white/[0.06] dark:bg-[#050505]"
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase md:text-xs">
          {location.countryCode || "··"}
        </span>
        <span className="text-foreground/90 font-mono text-xs font-semibold tracking-tight md:text-sm dark:text-zinc-100">
          {time ? formatTime(time) : "--:--"}
        </span>
        {tzAbbr && (
          <span className="text-muted-foreground hidden text-[9px] font-medium tracking-widest uppercase sm:inline md:text-[10px]">
            {tzAbbr}
          </span>
        )}
      </div>

      <div className="group flex cursor-default items-center gap-1.5">
        <Locate className="text-muted-foreground/75 h-3.5 w-3.5 transition-all duration-500 group-hover:scale-110 group-hover:text-emerald-500 dark:group-hover:text-emerald-400" />
        <span className="text-muted-foreground group-hover:text-foreground text-xs font-medium tracking-tight transition-colors duration-300 md:text-sm dark:group-hover:text-white">
          {location.city && location.country
            ? `${location.city}, ${location.country}`
            : location.city || location.country || "Detecting..."}
        </span>
      </div>
    </motion.div>
  );
}
