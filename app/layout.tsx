import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Figtree, Zen_Maru_Gothic } from "next/font/google";
import Navbar from "@/components/Navbar";
import SakuraBackground from "@/components/SakuraBackground";
import CustomCursor from "@/components/CustomCursor";
import CommandMenu from "@/components/CommandMenu";
import AnimeLoader from "@/components/AnimeLoader";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const zen = Zen_Maru_Gothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen",
});

export const metadata: Metadata = {
  title: "Renz | Backend Dev",
  description:
    "Gamer • Anime Enthusiast • Tech Lover — Next.js • Tailwind • Golang",

  // ganti ke domain kamu (atau biarkan pakai vercel url projectmu)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://renzip.my.id"
  ),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  openGraph: {
    title: "Renz | Backend Dev",
    description:
      "Gamer • Anime Enthusiast • Tech Lover — Next.js • Tailwind • Golang",
    url: "/",
    siteName: "Renz Portfolio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    // kalau belum bikin twitter-image.tsx, pakai og yang sama juga boleh
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Renz",
            url: process.env.NEXT_PUBLIC_SITE_URL,
            sameAs: [
              "https://github.com/renzip",
              "mailto:zenkun.enterkill13@gmail.com",
            ],
            jobTitle: "Backend Developer",
            worksFor: { "@type": "Organization", name: "Freelance" },
            knowsAbout: [
              "Next.js",
              "Golang",
              "MongoDB",
              "Tailwind",
              "WebSocket",
              "Vercel",
            ],
          }),
        }}
      />

      <body
        className={`bg-background text-foreground ${figtree.variable} ${zen.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimeLoader />
          <SakuraBackground />
          <CustomCursor />
          <Navbar />
          <CommandMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
