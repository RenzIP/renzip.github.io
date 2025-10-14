"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  ids: string[];                 // urutan id section: ["hero","projects",...]
  navHeight?: number;            // tinggi navbar px (default 56 = h-14)
  children: React.ReactNode[];   // setiap child = 1 section (pastikan jumlah = ids)
  snapDurationMs?: number;       // durasi transisi antar section
  threshold?: number;            // seberapa “dalem” scroll baru pindah (default 90)
  cooldownMs?: number;           // jeda sebelum boleh pindah lagi (default 650)
  enableOnMobile?: boolean;      // default false (fallback scroll biasa di mobile)
};

export default function Fullpage({
  ids,
  navHeight = 56,
  children,
  snapDurationMs = 600,
  threshold = 90,
  cooldownMs = 650,
  enableOnMobile = false,
}: Props) {
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Fallback: di mobile (kecil) atau reduced motion -> render biasa (no lock)
  if ((isMobile && !enableOnMobile) || reduced) {
    return <div className="space-y-16">{children}</div>;
  }

  const count = useMemo(() => (Array.isArray(children) ? children.length : 0), [children]);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const accRef = useRef(0); // akumulator delta scroll

  // Active class di body untuk matikan scroll & sembunyikan scrollbar
  useEffect(() => {
    document.body.classList.add("fullpage-active");
    return () => document.body.classList.remove("fullpage-active");
  }, []);

  // Bantuan: pindah aman dengan cooldown
  const goTo = useCallback((next: number) => {
    if (animating) return;
    const clamped = Math.max(0, Math.min(count - 1, next));
    if (clamped === index) return;
    setAnimating(true);
    setIndex(clamped);
    const t = setTimeout(() => setAnimating(false), cooldownMs);
    return () => clearTimeout(t);
  }, [animating, count, index, cooldownMs]);

  // Wheel handler: perlu “dorongan” > threshold + cooldown agar pindah
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // arah: positif => scroll ke bawah
      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) > threshold && !animating) {
        if (accRef.current > 0) goTo(index + 1);
        else goTo(index - 1);
        accRef.current = 0; // reset setelah pindah
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo, index, threshold, animating]);

  // Touch (swipe) untuk trackpad/HP (kalau enableOnMobile=true)
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = startY - e.touches[0].clientY;
      // jangan terlalu sensitif
      if (Math.abs(dy) > 40 && !animating) {
        if (dy > 0) goTo(index + 1); else goTo(index - 1);
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [goTo, index, animating]);

  // Keyboard (PgDn/Space/Arrow)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["PageDown","ArrowDown"," "].includes(e.key)) { e.preventDefault(); goTo(index + 1); }
      if (["PageUp","ArrowUp"].includes(e.key)) { e.preventDefault(); goTo(index - 1); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(count - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, count]);

  // Hash support: #projects -> set index
  useEffect(() => {
    const applyHash = () => {
      const id = location.hash.replace("#", "");
      const idx = ids.indexOf(id);
      if (idx >= 0) setIndex(idx);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [ids]);

  // Tinggi section (viewport minus navbar)
  const sectionH = `calc(100svh - ${navHeight}px)`;

  return (
    <div className="relative no-scrollbar" style={{ height: `100svh`, overflow: "hidden" }}>
      <div
        className="relative will-change-transform"
        style={{
          height: `calc(${sectionH} * ${count})`,
          transform: `translate3d(0, calc(-${index} * ${sectionH}), 0)`,
          transition: `transform ${snapDurationMs}ms cubic-bezier(.22,.61,.36,1)`,
          paddingTop: navHeight, // kompensasi sticky navbar
        }}
      >
        {Array.isArray(children) &&
          children.map((child, i) => (
            <section key={ids[i] ?? i} id={ids[i]}
              className="flex items-center"
              style={{ height: sectionH }}
            >
              <div className="w-full">{child}</div>
            </section>
          ))}
      </div>
    </div>
  );
}
