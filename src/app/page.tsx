import type { Metadata } from "next";
import HomePageClient from "./page-client";

export const metadata: Metadata = {
  description: "Portfolio of Rishi Chaurasia - AI engineer, full-stack web developer.",
  openGraph: {
    title: "Rishi Chaurasia - Full-Stack Developer",
    description: "Portfolio of Rishi Chaurasia - AI engineer, full-stack web developer.",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}