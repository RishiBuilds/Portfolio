import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TopInfoBar } from "@/components/TopInfoBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const SITE_URL = "https://rishibuilds-portfolio.vercel.app";
const SITE_TITLE = "Rishi Chaurasia - Full-Stack Developer";
const SITE_DESCRIPTION =
  "Portfolio of Rishi Chaurasia - AI engineer, full-stack web developer";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Rishi Chaurasia",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rishi Chaurasia",
    "AI Engineer",
    "Full-Stack Developer",
    "Machine Learning",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Portfolio",
    "Mumbai",
  ],
  authors: [{ name: "Rishi Chaurasia", url: SITE_URL }],
  creator: "Rishi Chaurasia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "rishichaurasia.dev",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@rishitwts_",
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
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Rishi Chaurasia Portfolio",
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Rishi Chaurasia",
        url: SITE_URL,
        jobTitle: "AI Engineer & Full-Stack Developer",
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}/opengraph-image`,
        email: "rishi.chaurasia.dev@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        sameAs: [
          "https://github.com/RishiBuilds",
          "https://linkedin.com/in/rishi-chaurasiya",
          "https://x.com/rishitwts_",
        ],
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Full-Stack Development",
          "TypeScript",
          "Python",
          "Next.js",
          "React",
          "Docker",
          "System Design",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 0) }}
    />
  );
}

import { ScrollToTop } from "@/components/scroll-to-top";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="bg-background text-foreground min-h-svh font-sans antialiased">
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <TopInfoBar />
          <Navbar />
          <main id="main-content" className="mx-auto w-full max-w-(--breakpoint-md) px-4 pt-8 pb-4">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
