"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import PwaPrompt from "@/components/PwaPrompt";

type NavItem = { href: string; label: string };

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("");

  // track hash (#projects, #skills, #contact)
  useEffect(() => {
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const links: NavItem[] = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" }, // id section-mu memang "contact"
  ];

  // helper: apakah link sedang aktif?
  const isActive = (href: string) =>
    href.startsWith("#") ? hash === href : pathname === href;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-background/70 border-b">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4">
          {links.map((l) =>
            l.href.startsWith("#") ? (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm hover:opacity-80",
                  isActive(l.href) && "font-semibold"
                )}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm hover:opacity-80",
                  isActive(l.href) && "font-semibold"
                )}
              >
                {l.label}
              </Link>
            )
          )}

          {/* email langsung */}
          <a
            href="mailto:zenkun.enterkill13@gmail.com"
            className="text-sm hover:opacity-80 hidden md:inline-block"
          >
            Email
          </a>

          {/* tombol Hire Me ke halaman /hire */}
          <Button size="sm" asChild>
            <Link href="/hire">Hire Me</Link>
          </Button>

          <ThemeToggle />
          <PwaPrompt />
        </div>
      </nav>
    </header>
  );
}
