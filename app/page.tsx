import AnimatedSection from "@/components/AnimatedSection";
import ProjectFilter from "@/components/ProjectFilter";
import TechStack from "@/components/TechStack";
import SectionSnap from "@/components/SectionSnap";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import { Github, Mail, FileText, Sparkles } from "lucide-react";

function Hero() {
  return (
    <AnimatedSection>
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6 md:space-y-8">
        <section className="grid md:grid-cols-[1.2fr,0.8fr] items-center gap-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-background/70 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Building with Next.js • Tailwind</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Renz <span className="font-[var(--font-zen)]">| </span> Backend
              Dev
              <span className="block text-muted-foreground text-xl md:text-2xl font-normal mt-2">
                Gamer • Anime Enthusiast • Tech Lover
              </span>
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              I build applications and websites that are fast, clean, and easy
              to maintain. I sometimes like to experiment with other programming
              languages.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="#projects">Lihat Projects</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="#skills">Skills</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:you@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </a>
              </Button>
              <ThemeToggle />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Next.js",
                "Golang",
                "MongoDB",
                "Tailwind",
                "Cloudflare",
                "Vercel",
              ].map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex md:justify-end">
            <div className="relative group">
              <div className="size-40 md:size-56 rounded-2xl border overflow-hidden shadow-sm bg-gradient-to-br from-pink-500/10 via-transparent to-indigo-500/10">
                <Image
                  src="/My Bini.png" // ganti jadi nama file fotomu di /public
                  alt="Foto Renz"
                  fill // isi penuh container
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 14rem, 10rem" // md:size-56 = ~14rem; size-40 = ~10rem
                  priority // supaya cepat muncul di hero
                  placeholder="empty" // bisa diganti 'blur' jika punya blurDataURL
                />
              </div>

              {/* label kecil ikon khas */}
              <div className="absolute -bottom-3 -right-3 text-[10px] px-2 py-1 rounded-full border bg-background/80 backdrop-blur">
                <span className="font-[var(--font-zen)]">レンツ</span> | Renz
              </div>
            </div>
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
}

function Projects() {
  return (
    <AnimatedSection delay={0.05}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
        <ProjectFilter />
      </div>
    </AnimatedSection>
  );
}

function Skills() {
  return (
    <AnimatedSection delay={0.05}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <TechStack />
      </div>
    </AnimatedSection>
  );
}

function ExperienceCTA() {
  return (
    <AnimatedSection delay={0.05}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-6">
        {/* ... pengalaman + CTA seperti sebelumnya ... */}
        <section className="rounded-2xl border p-6 md:p-8 bg-gradient-to-br from-pink-500/10 via-background to-indigo-500/10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="md:flex-1">
              <h3 className="text-xl md:text-2xl font-semibold">
                Ada project menarik?
              </h3>
              <p className="text-sm text-muted-foreground">
                Terbuka untuk freelance/part-time. Ajak ngobrol santai.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild>
                <a href="mailto:baagas7474@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/renzip" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/Renz-CV.pdf" target="_blank">
                  <FileText className="mr-2 h-4 w-4" />
                  CV
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
}

export default function Home() {
  return (
    <main
      className={
        // container yang di-scroll manual oleh user:
        // - sembunyikan scrollbar
        // - aktifkan snap (per section)
        "h-[100svh] overflow-y-auto no-scrollbar snap-container snap-y snap-mandatory"
      }
    >
      <SectionSnap id="hero">
        <Hero />
      </SectionSnap>
      <SectionSnap id="projects">
        <Projects />
      </SectionSnap>
      <SectionSnap id="skills">
        <Skills />
      </SectionSnap>
      <SectionSnap id="contact">
        <ExperienceCTA />
      </SectionSnap>
    </main>
  );
}

// Dummy projects array for static params generation
const projects = [
  { id: "project-1" },
  { id: "project-2" },
  // Add more projects as needed
];

export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }));
}
