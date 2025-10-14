"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";

export default function Navbar(){
  const pathname = usePathname();
  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "mailto:you@example.com", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-background/70 border-b">
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} className={cn("text-sm hover:opacity-80", pathname===l.href && "font-semibold")}>
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
