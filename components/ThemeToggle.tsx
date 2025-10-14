"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Hanya setelah mounted kita tahu tema sebenarnya
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      className="p-2 rounded-xl border hover:opacity-90"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {/* Saat SSR (belum mounted), render placeholder supaya markup sama */}
      {!mounted ? (
        <span className="inline-block h-4 w-4" aria-hidden />
      ) : isDark ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}
