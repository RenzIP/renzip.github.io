import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Figtree, Zen_Maru_Gothic } from "next/font/google";
import Navbar from "@/components/Navbar";
import SakuraBackground from "@/components/SakuraBackground";
import CustomCursor from "@/components/CustomCursor";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const zen = Zen_Maru_Gothic({ weight: ["400","700"], subsets: ["latin"], variable: "--font-zen" });

export const metadata: Metadata = {
  title: "Renz | Portfolio",
  description: "Portfolio interaktif: web, golang, ui/ux, devops-lite",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <body className={`bg-background text-foreground ${figtree.variable} ${zen.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SakuraBackground />
          <CustomCursor />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
