import type { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack projects, AI applications, and developer tools built by Rishi Chaurasia.",
  openGraph: {
    title: "Projects | Rishi Chaurasia",
    description:
      "Full-stack projects, AI applications, and developer tools built by Rishi Chaurasia.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}