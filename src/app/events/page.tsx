import type { Metadata } from "next";
import EventsClient from "./events-client";

export const metadata: Metadata = {
  title: "Events & Meetups",
  description:
    "Conferences, technical meetups, and developer gatherings Rishi Chaurasia has participated in.",
  openGraph: {
    title: "Events & Meetups | Rishi Chaurasia",
    description:
      "Conferences, technical meetups, and developer gatherings Rishi Chaurasia has participated in.",
  },
};

export default function EventsPage() {
  return <EventsClient />;
}