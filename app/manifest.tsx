import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://renzip.my.id";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Renz — Portfolio",
    short_name: "Renz",
    description: "Backend Dev • Next.js • Golang — Portfolio",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b1020",
    theme_color: "#ec4899",
    lang: "id",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      // maskable (biar pas di notch/rounded)
      { src: "/icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ],
    id: BASE,
    screenshots: [
      { src: "/pwa-screenshot-1.png", sizes: "1280x720", type: "image/png", form_factor: "wide" }
    ]
  };
}
