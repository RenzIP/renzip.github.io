"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // jika belum ditambah, ganti ke <div> biasa
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="overflow-hidden">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{p.title}</h3>
            <div className="flex items-center gap-2">
              {p.repo && <Link href={p.repo} target="_blank" aria-label="Open repo"><Github size={16}/></Link>}
              {p.link && <Link href={p.link} target="_blank" aria-label="Open demo"><ExternalLink size={16}/></Link>}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{p.summary}</p>
        </CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          {p.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full border">{t}</span>)}
        </CardContent>
      </Card>
    </motion.div>
  );
}
