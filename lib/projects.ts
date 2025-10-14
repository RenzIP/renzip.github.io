export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const ALL_TAGS = ["web","golang","ui","ml","game","server"] as const;

export const projects: Project[] = [
  {
    id: "p1",
    title: "Katalog Game — Full-Stack",
    summary: "Next.js + Golang API + MongoDB. Filter, pagination, image optimization. Deployed on Vercel.",
    tags: ["web","golang","ui"],
    link: "https://example.com/game-catalog",
    repo: "https://github.com/username/game-catalog"
  },
  {
    id: "p2",
    title: "Sorting Item Dashboard",
    summary: "Dashboard CRUD dengan REST API (Railway) • Auth role-based • Export CSV.",
    tags: ["web","golang","ui"],
    link: "https://sorting-item-apps-testing.up.railway.app",
    repo: "https://github.com/username/sorting-client"
  },
  {
    id: "p3",
    title: "Inventory Desktop (Swing) + Spring Boot",
    summary: "Java Swing client bicara ke backend Spring Boot. Role admin/member, activity logs.",
    tags: ["web","ui"],
    repo: "https://github.com/username/inventory-desktop"
  },
  {
    id: "p4",
    title: "Minecraft Server (GeyserMC)",
    summary: "Konfigurasi plugin & quest untuk server RPG Survival. Automasi backup, panel hosting.",
    tags: ["server","game"],
    link: "jv-3.senseigames.my.id:13412"
  },
];
