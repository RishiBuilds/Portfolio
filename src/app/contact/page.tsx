"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { XIcon } from "@/components/icons";

type FormStatus = "idle" | "loading" | "success" | "error";

const socialIconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  x: XIcon,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const inputClass =
  "w-full rounded-xl border border-border/80 bg-muted/20 px-4 py-3 text-sm placeholder:text-muted-foreground/45 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus:bg-muted/40 focus:border-border";

const labelClass =
  "mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground/80";

const quickReplyTopics = [
  "Project collaboration",
  "Freelance work",
  "Just saying hi",
  "Open source",
];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [messageValue, setMessageValue] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Client-side validation
    const name = (formData.get("name") as string || "").trim().replace(/\s+/g, " ");
    const email = (formData.get("email") as string || "").trim().replace(/\s+/g, " ");
    const subject = (formData.get("subject") as string || "").trim().replace(/\s+/g, " ");
    const message = (formData.get("message") as string || "").trim().replace(/\s+/g, " ");

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Name, email, and message are required.");
      return;
    }

    if (name.length < 2) {
      setStatus("error");
      setErrorMessage("Name must be at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Invalid email address.");
      return;
    }

    if (message.length < 10) {
      setStatus("error");
      setErrorMessage("Message must be at least 10 characters.");
      return;
    }

    if (message.length > 1000) {
      setStatus("error");
      setErrorMessage("Message must be under 1000 characters.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "6d595879-cddc-48b7-9495-1744c9ab0b84";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: subject || `Portfolio Contact from ${name}`,
          message,
          from_name: `${name} via Portfolio`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        console.error("Web3Forms submission failed:", result);
        setStatus("error");
        setErrorMessage(result.message || "Failed to send message.");
      } else {
        setStatus("success");
        setMessageLength(0);
        setMessageValue("");
        setSelectedTopic("");
        form.reset();
      }
    } catch (err) {
      console.error("Web3Forms client-side submit error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }

    setTimeout(() => setStatus("idle"), 4000);
  }

  function handleTopicSelect(topic: string) {
    const next = selectedTopic === topic ? "" : topic;
    setSelectedTopic(next);
    if (next && !messageValue) {
      const prefill = `Hi! I'd love to discuss ${next.toLowerCase()}.`;
      setMessageValue(prefill);
      setMessageLength(prefill.length);
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8 pb-12"
    >
      <div>
        <motion.h1
          variants={itemVariants}
          className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mt-2 max-w-2xl text-base leading-7"
        >
          Have a project in mind, want to collaborate, or just want to say hi? I&apos;m always happy
          to connect.
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            icon: Clock,
            label: "Response time",
            value: "Within 24 hours",
          },
          {
            icon: MessageSquare,
            label: "Preferred contact",
            value: "Email or DM",
          },
          {
            icon: Zap,
            label: "Availability",
            value: "Open to work",
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="border-border/60 bg-muted/10 flex items-center gap-3 rounded-xl border px-4 py-3"
          >
            <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <Icon className="text-muted-foreground h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-muted-foreground/60 mb-0.5 text-[10px] leading-none font-bold tracking-wider uppercase">
                {label}
              </p>
              <p className="text-foreground truncate text-sm font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Let&apos;s work together</CardTitle>
              <CardDescription>
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to
                be part of something great.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                  <Mail className="text-muted-foreground h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground/60 text-[10px] font-bold tracking-wider uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-foreground block truncate text-sm font-semibold hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                  <MapPin className="text-muted-foreground h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-muted-foreground/60 text-[10px] font-bold tracking-wider uppercase">
                    Location
                  </p>
                  <p className="text-foreground text-sm font-semibold">
                    {personalInfo.location.display}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold">Connect with me</CardTitle>
              <CardDescription className="text-xs">
                Find me across the web — let&apos;s stay in touch.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="flex flex-wrap gap-2">
                {personalInfo.socialLinks.map((link) => {
                  const Icon = socialIconMap[link.icon];
                  if (!Icon) return null;
                  return (
                    <Button
                      key={link.name}
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:border-foreground/30 h-9 w-9 rounded-lg transition-all hover:shadow-2xs"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${link.name} profile`}
                        title={link.name}
                      >
                        <Icon size={16} />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold">What are you reaching out about?</CardTitle>
              <CardDescription className="text-xs">
                Pick a topic to pre-fill your message.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="flex flex-wrap gap-2">
                {quickReplyTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleTopicSelect(topic)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150",
                      selectedTopic === topic
                        ? "border-foreground/40 bg-foreground text-background"
                        : "border-border/70 bg-muted/20 text-muted-foreground hover:border-foreground/20 hover:text-foreground",
                    )}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="from-border via-border/50 h-full rounded-2xl bg-gradient-to-br to-transparent p-[1px]">
            <Card className="bg-card/90 h-full border-0 backdrop-blur-xs">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className={labelClass}>
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={1000}
                      value={messageValue}
                      onChange={(e) => {
                        setMessageValue(e.target.value);
                        setMessageLength(e.target.value.length);
                      }}
                      placeholder="Tell me about your project or idea..."
                      className={`${inputClass} resize-none`}
                    />
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground/40 text-[10px]">
                        Max 1000 characters
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-semibold transition-colors",
                          messageLength > 900
                            ? "font-bold text-amber-500"
                            : "text-muted-foreground/50",
                        )}
                      >
                        {messageLength}/1000
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-500" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-1.5 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        Thanks! I&apos;ll get back to you soon.
                      </motion.p>
                    )}

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="mt-2 flex items-center gap-2 text-xs font-semibold text-red-500"
                      >
                        <AlertCircle size={12} className="text-red-500" />
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
