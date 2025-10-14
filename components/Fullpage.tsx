"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  ids: string[];
  navHeight?: number;            // default 56 (h-14)
  children: React.ReactNode[];   // jumlah harus == ids
  snapDurationMs?: number;       // default 600
  threshold?: number;            // default 90
  cooldownMs?: number;           // default 650
  enableOnMobile?: boolean;      // default false
};

/* Wrapper: tentukan mode tanpa memanggil hooks secara kondisional */
export default function Fullpage(props: Props) {
  const { enableOnMobile = false } = props;
  const [mode, setMode] = useState<"full" | "fallback">("full");

  useEffect(() => {
    // aman di client saja
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if ((isMobile && !enableOnMobile) || reduced) setMode("fallback");
  }, [enableOnMobile]);

  if (mode === "fallback") return <Fallback>{props.children}</Fallback>;
  return <FullpageInner {...props} />;
}

function Fallback({ children }: { children: React.ReactNode }) {
  return <div className="space-y-16">{children}</div>;
}

/* Semua hooks dipanggil TANPA kondisi di sini */
function FullpageInner({
  ids,
  navHeight = 56,
  children,
  snapDurationMs = 600,
  threshold = 90,
  cooldownMs = 650,
}: Props) {
  const count = useMemo(
    () => (Array.isArray(children) ? children.length : 0),
    [children]
  );
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const accRef = useRef(0);

  // kunci body saat aktif
  useEffect(() => {
    document.body.classList.add("fullpage-active");
    return () => document.body.classList.remove("fullpage-active");
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (animating) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      if (clamped === index) return;
      setAnimating(true);
      setIndex(clamped);
      const t = setTimeout(() => setAnimating(false), cooldownMs);
      return () => clearTimeout(t);
    },
    [animating, count, index, cooldownMs]
  );

  // wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accRef.current += e.deltaY;
      if (Math.abs(accRef.current) > threshold && !animating) {
        if (accRef.current > 0) goTo(index + 1);
        else goTo(index - 1);
        accRef.current = 0;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo, index, threshold, animating]);

  // touch
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = startY - e.touches[0].clientY;
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

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["PageDown", "ArrowDown", " "].includes(e.key)) { e.preventDefault(); goTo(index + 1); }
      if (["PageUp", "ArrowUp"].includes(e.key)) { e.preventDefault(); goTo(index - 1); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(count - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, count]);

  // hash
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

  const sectionH = `calc(100svh - ${navHeight}px)`;

  return (
    <div className="relative no-scrollbar" style={{ height: "100svh", overflow: "hidden" }}>
      <div
        className="relative will-change-transform"
        style={{
          height: `calc(${sectionH} * ${count})`,
          transform: `translate3d(0, calc(-${index} * ${sectionH}), 0)`,
          transition: `transform ${snapDurationMs}ms cubic-bezier(.22,.61,.36,1)`,
          paddingTop: navHeight,
        }}
      >
        {Array.isArray(children) &&
          children.map((child, i) => (
            <section key={ids[i] ?? i} id={ids[i]} className="flex items-center" style={{ height: sectionH }}>
              <div className="w-full">{child}</div>
            </section>
          ))}
      </div>
    </div>
  );
}
