import type { Metadata } from "next";
import WorkClient from "./work-client";

export const metadata: Metadata = {
  title: "Work Experience",
  description:
    "Professional software engineering roles, education history, and certifications of Rishi Chaurasia.",
  openGraph: {
    title: "Work Experience | Rishi Chaurasia",
    description:
      "Professional software engineering roles, education history, and certifications of Rishi Chaurasia.",
  },
};

export default function WorkPage() {
  return <WorkClient />;
}