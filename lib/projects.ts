export type Project = {
  id: string;           // dipakai di URL: /projects/{id}
  title: string;
  summary: string;      // ringkasan 1–2 kalimat
  tags: string[];       // pakai dari ALL_TAGS di bawah
  link?: string;        // live demo (kalau ada)
  repo?: string;        // repo GitHub
};

export const ALL_TAGS = ["websocket", "golang", "ui", "server", "realtime", "gcp", "java", "mongodb"] as const;

export const projects: Project[] = [
  {
    id: "umkm-site",
    title: "Website UMKM (Company Profile + Katalog)",
    summary:
      "Landing page UMKM dengan katalog produk & form kontak. Optimasi SEO dasar, gambar terkompres, dan skor Lighthouse 90+.",
    tags: ["web", "ui", "golang", "gcp", "mongodb"],
    link: "https://sakhaclothing.shop",         // ← ganti jika ada
    repo: "https://github.com/sakhaclothing",     // ← ganti jika ada
  },
  {
    id: "inventory-sorting",
    title: "Inventory Sorting Dashboard",
    summary:
      "Dashboard CRUD untuk manajemen item & proses sorting. Role-based auth, filter & pagination.",
    tags: ["web", "java", "ui", "spring-boot"],
    link: "", // kalau bukan ini, ganti
    repo: "https://github.com/RenzIP/sorting-item-apps",         // ganti ke repo yang benar
  },
  {
    id: "chat-websocket",
    title: "Website Chat Real-time (WebSocket)",
    summary:
      "Aplikasi chat real-time dengan WebSocket. Typing indicator, status online, dan penyimpanan pesan.",
    tags: ["gcp", "realtime", "golang", "mongodb", "websocket"],
    link: "",            // opsional
    repo: "https://github.com/WeChat-Easy-Chat",  // opsional
  },
];
