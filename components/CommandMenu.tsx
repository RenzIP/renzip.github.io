"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { projects } from "@/lib/projects";

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setOpen((v) => !v);
      }
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  if (!open) return null;

  const goto = (href: string) => { setOpen(false); router.push(href); };

  return (
    <div className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <Command onKeyDown={(e) => e.stopPropagation()} className="mx-auto mt-24 w-[92vw] max-w-xl rounded-xl border bg-background text-foreground shadow-2xl">
        <Command.Input autoFocus placeholder="Cari: projects / skills / contact …" className="w-full border-b bg-transparent px-4 py-3 text-sm outline-none" />
        <Command.List className="max-h-[60vh] overflow-auto py-2">
          <Command.Empty className="px-4 py-3 text-sm text-muted-foreground">Nggak ketemu.</Command.Empty>

          <Command.Group heading="Sections" className="px-2 py-1">
            {[
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Contact", href: "#contact" },
            ].map((it) => (
              <Command.Item key={it.href} onSelect={() => goto(it.href)} className="cursor-pointer select-none rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent">
                {it.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className="px-2 py-1">
            {projects.map((p) => (
              <Command.Item key={p.id} onSelect={() => (p.link ? goto(p.link) : goto("#projects"))} className="cursor-pointer select-none rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent">
                {p.title}
                <span className="ml-2 text-xs text-muted-foreground">{p.tags.join(", ")}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Links" className="px-2 py-1">
            {[
              { label: "GitHub", href: "https://github.com/renzip" },
              { label: "Email", href: "mailto:baagas7474@gmail.com" },
              { label: "Download CV", href: "/Renz-CV.pdf" },
            ].map((it) => (
              <Command.Item
                key={it.href}
                onSelect={() => { setOpen(false); window.open(it.href, "_blank"); }}
                className="cursor-pointer select-none rounded-md px-3 py-2 text-sm data-[selected=true]:bg-accent"
              >
                {it.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t px-3 py-2 text-[11px] text-muted-foreground">
          <div>Tips: <kbd className="rounded border px-1">Esc</kbd> untuk menutup</div>
          <div className="hidden md:block">
            Buka cepat: <kbd className="rounded border px-1">⌘</kbd>+<kbd className="rounded border px-1">K</kbd> / <kbd className="rounded border px-1">Ctrl</kbd>+<kbd className="rounded border px-1">K</kbd>
          </div>
        </div>
      </Command>
    </div>
  );
}
