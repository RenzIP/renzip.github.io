import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  const isHttp = p.link?.startsWith("http");

  return (
    <article className="group rounded-xl border p-4 hover:shadow-sm transition">
      {/* Seluruh header kartu bisa diklik ke halaman detail */}
      <Link
        href={`/projects/${p.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
        aria-label={`Buka detail ${p.title}`}
      >
        <h3 className="text-lg font-semibold">{p.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {p.summary}
        </p>
      </Link>

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Badge key={t} variant="secondary">{t}</Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {/* CTA eksternal (tidak menutupi link ke detail) */}
        {p.link && (
          isHttp ? (
            <Button size="sm" variant="outline" asChild>
              <a href={p.link} target="_blank" rel="noreferrer">Live</a>
            </Button>
          ) : (
            <div className="text-xs rounded border px-2 py-1">
              Server: <code className="font-mono">{p.link}</code>
            </div>
          )
        )}
        {p.repo && (
          <Button size="sm" variant="ghost" asChild>
            <a href={p.repo} target="_blank" rel="noreferrer">Repo</a>
          </Button>
        )}
        <Button size="sm" asChild>
          <Link href={`/projects/${p.id}`}>Detail</Link>
        </Button>
      </div>
    </article>
  );
}
