"use client";

import { useEffect, useState } from "react";

/**
 * Fullscreen preloader bertema anime.
 * - Muncul sebentar saat halaman pertama mount.
 * - Auto hide setelah 1.2s (bisa diubah).
 * - Klik di mana saja untuk skip lebih cepat.
 */
export default function AnimeLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // hormati prefers-reduced-motion: langsung skip
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShow(false);
      return;
    }

    const t = setTimeout(() => setShow(false), 1200); // durasi loader
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-gradient-to-b from-background to-background/95
                 transition-opacity duration-500"
      onClick={() => setShow(false)}
      aria-label="Loading…"
      role="status"
    >
      {/* Shuriken */}
      <div className="relative">
        <svg
          className="animate-shuriken size-16 md:size-20 drop-shadow-sm"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(0 0% 100% / .95)" />
              <stop offset="100%" stopColor="hsl(0 0% 70% / .6)" />
            </radialGradient>
          </defs>
          <path
            d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z"
            fill="url(#g)"
            stroke="hsl(var(--foreground)/.25)"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="50" r="6" fill="hsl(var(--foreground))" />
        </svg>

        {/* Text kecil */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-wide text-muted-foreground">
          <span className="font-[var(--font-zen)]">読み込み中</span> • loading
        </div>
      </div>

      {/* Kelopak sakura jatuh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="petal"
            style={
              {
                // sebaran acak sederhana
                left: `${Math.random() * 100}%`,
                animationDelay: `${(i % 7) * 0.25}s`,
                animationDuration: `${6 + (i % 5)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
