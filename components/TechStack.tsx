"use client";
import SkillIcon from "@/components/icons/SkillIcon";
import { motion } from "framer-motion";

type Skill = { name: string; key: React.ComponentProps<typeof SkillIcon>["name"]; level: "Beginner"|"Intermediate"|"Advanced"; years?: number; };

const skills: Skill[] = [
  { name: "JavaScript", key: "javascript", level: "Advanced", years: 4 },
  { name: "TypeScript", key: "typescript", level: "Advanced", years: 3 },
  { name: "React", key: "react", level: "Advanced", years: 3 },
  { name: "Next.js", key: "next", level: "Advanced", years: 3 },
  { name: "Tailwind", key: "tailwind", level: "Advanced", years: 3 },
  { name: "Golang", key: "golang", level: "Intermediate", years: 2 },
  { name: "Java", key: "java", level: "Intermediate", years: 2 },
  { name: "Python", key: "python", level: "Intermediate", years: 2 },
  { name: "HTML", key: "html", level: "Advanced", years: 5 },
  { name: "CSS", key: "css", level: "Advanced", years: 5 },
  { name: "MongoDB", key: "mongodb", level: "Intermediate", years: 2 },
  { name: "MySQL", key: "mysql", level: "Intermediate", years: 2 },
  { name: "PostgreSQL", key: "postgres", level: "Beginner", years: 1 },
  { name: "Docker", key: "docker", level: "Intermediate", years: 2 },
  { name: "Nginx", key: "nginx", level: "Beginner", years: 1 },
  { name: "Git", key: "git", level: "Advanced", years: 4 },
  { name: "Linux", key: "linux", level: "Intermediate", years: 3 },
];

const levelColor: Record<Skill["level"], string> = {
  Beginner: "bg-gray-300 dark:bg-gray-600",
  Intermediate: "bg-indigo-400 dark:bg-indigo-500",
  Advanced: "bg-pink-500",
};

export default function TechStack() {
  return (
    <section id="skills" className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-semibold">Tech Stack</h2>
      <p className="text-sm text-muted-foreground">Bahasa & tools yang sering kupakai. Hover untuk melihat level.</p>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((s, i) => (
          <motion.div key={s.name}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * i }}
            className="group relative overflow-hidden rounded-xl border bg-background/60 backdrop-blur p-4"
          >
            <div className="flex items-center gap-3">
              <SkillIcon name={s.key} className="h-6 w-6" />
              <div className="font-medium">{s.name}</div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-border">
              <div
                className={`h-full rounded-full ${levelColor[s.level]}`}
                style={{
                  width: s.level === "Advanced" ? "90%" : s.level === "Intermediate" ? "65%" : "35%",
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{s.level}</span>
              {s.years && <span>{s.years} yr</span>}
            </div>

            {/* Accent anime tipis saat hover */}
            <span className="pointer-events-none absolute -right-6 -bottom-6 text-5xl opacity-0 group-hover:opacity-20 transition select-none">✦</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
