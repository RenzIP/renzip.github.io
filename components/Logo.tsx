// Logo kecil dengan vibe anime (shuriken + teks)
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0 transition group-hover:rotate-12">
        <path d="M12 2l2.2 5.1L19 9.8l-4.9 2.1L12 22l-2.1-10.1L5 9.8l4.8-2.7L12 2z"
              fill="currentColor" className="text-pink-500" />
      </svg>
      <div className="leading-tight">
        <span className="font-semibold tracking-tight">Renz</span>
        <span className="ml-1 text-xs text-muted-foreground font-[var(--font-zen)]">レンツ</span>
      </div>
    </Link>
  );
}
