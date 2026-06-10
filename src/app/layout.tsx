import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishibuilds.vercel.app"),
  title: {
    default: "Rishi Chaurasia | Full-Stack Developer & AI Engineer",
    template: "%s | Rishi Chaurasia",
  },
  description:
    "Full-stack developer specializing in scalable web applications. Explore my projects, hackathon wins, and technical expertise in modern frameworks.",
  keywords: [
    "Rishi Chaurasia",
    "Rishi Chaurasia Portfolio",
    "Rishi Builds",
    "AI Developer",
    "Software Developer",
    "Full Stack Engineer",
    "Web Development",
    "React",
    "Next.js",
    "Portfolio website",
  ],
  authors: [{ name: "Rishi Chaurasia", url: "https://rishibuilds.vercel.app" }],
  creator: "Rishi Chaurasia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rishibuilds.vercel.app",
    title: "Rishi Chaurasia | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack developer specializing in scalable web applications. Explore my projects, hackathon wins, and technical expertise in modern frameworks.",
    siteName: "Rishi Chaurasia Portfolio",
    images: [
      {
        url: "/icons/open-graph.png",
        width: 1200,
        height: 630,
        alt: "Rishi Chaurasia | Full-Stack Developer & AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Chaurasia | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack developer specializing in scalable web applications. Explore my projects, hackathon wins, and technical expertise in modern frameworks.",
    images: ["/icons/open-graph.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rishibuilds.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="me" href="https://github.com/RishiBuilds" />
        <link rel="me" href="https://x.com/rishitwts_" />
        <link rel="me" href="https://devfolio.co/@RishiBuilds" />
        <link rel="me" href="https://leetcode.com/u/RishiBuilds" />
        <link rel="me" href="https://linkedin.com/in/rishi-chaurasiya" />
        <link rel="me" href="https://discord.com/users/hippo06417" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
