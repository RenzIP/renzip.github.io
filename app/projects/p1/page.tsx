import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Props) {
  const p = projects.find((x) => x.id === params.id);
  if (!p) return {};
  return {
    title: `${p.title} • Renz`,
    description: p.summary,
    openGraph: {
      title: `${p.title} • Renz`,
      description: p.summary,
      images: [{ url: `/projects/${p.id}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [`/projects/${p.id}/opengraph-image`],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const p = projects.find((x) => x.id === params.id);
  if (!p) return notFound();

  const isHttp = p.link?.startsWith("http");

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">{p.title}</h1>
        <p className="text-muted-foreground">{p.summary}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {p.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {p.link &&
          (isHttp ? (
            <Button asChild>
              <a href={p.link} target="_blank" rel="noreferrer">
                Live Link
              </a>
            </Button>
          ) : (
            <div className="rounded-lg border px-3 py-2 text-sm">
              <span className="mr-2 text-muted-foreground">Server Address:</span>
              <code className="font-mono">{p.link}</code>
            </div>
          ))}

        {p.repo && (
          <Button variant="outline" asChild>
            <a href={p.repo} target="_blank" rel="noreferrer">
              Repository
            </a>
          </Button>
        )}

        <Button variant="secondary" asChild>
          <Link href="/">← Kembali</Link>
        </Button>
      </div>
    </main>
  );
}
