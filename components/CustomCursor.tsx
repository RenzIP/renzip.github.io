"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip di mobile

    const d = dot.current!, r = ring.current!;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y; // ring (smooth)

    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const enter = () => r.style.opacity = "1";
    const leave = () => r.style.opacity = "0.6";

    const hoverIn = () => { r.style.width = r.style.height = "44px"; r.style.opacity = "0.9"; };
    const hoverOut = () => { r.style.width = r.style.height = "32px"; r.style.opacity = "0.6"; };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    // Besarkan saat hover elemen interaktif
    const hoverables = ["a","button","[role='button']","input","textarea","select"];
    const onOver = (e: Event) => (e.target as Element)?.closest(hoverables.join(",")) && hoverIn();
    const onOut  = (e: Event) => (e.target as Element)?.closest(hoverables.join(",")) && hoverOut();
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    loop();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  // Respect reduced motion
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <>
      {/* ring */}
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[60] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border
                   border-pink-400/60 shadow-[0_0_24px_2px_rgba(236,72,153,0.25)] opacity-60 transition-[width,height,opacity] duration-150"
        aria-hidden
      />
      {/* dot */}
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[61] size-1 -translate-x-1/2 -translate-y-1/2 rounded-full
                   bg-pink-500"
        aria-hidden
      />
    </>
  );
}
