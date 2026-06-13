import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rishi Chaurasia for collaborations, freelance opportunities, or general inquiries.",
  openGraph: {
    title: "Contact | Rishi Chaurasia",
    description:
      "Get in touch with Rishi Chaurasia for collaborations, freelance opportunities, or general inquiries.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}