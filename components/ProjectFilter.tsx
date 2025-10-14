"use client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input"; // jika belum ada, pakai <input> biasa
import { projects, ALL_TAGS } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectFilter() {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return projects.filter(p =>
      (!picked || p.tags.includes(picked)) &&
      (p.title.toLowerCase().includes(s) || p.summary.toLowerCase().includes(s))
    );
  }, [q, picked]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap items-center">
        <Input placeholder="Cari proyek..." value={q} onChange={e => setQ(e.target.value)} className="max-w-xs"/>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setPicked(null)} className={`px-3 py-1 rounded-full border ${picked===null ? "bg-primary text-primary-foreground" : ""}`}>All</button>
          {ALL_TAGS.map(tag => (
            <button key={tag} onClick={() => setPicked(tag)} className={`px-3 py-1 rounded-full border ${picked===tag ? "bg-primary text-primary-foreground" : ""}`}>{tag}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
