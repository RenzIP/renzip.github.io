import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [tsconfigPaths()],           // <-- ini kuncinya
  resolve: {
    // (opsional, jaga-jaga di Windows)
    alias: { "@": path.resolve(__dirname, "./") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
    globals: true,
    css: false,
    exclude: ["**/.next/**", "**/node_modules/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      all: false,
      exclude: [
        "**/.next/**", "**/node_modules/**",
        "next.config.*", "postcss.config.*", "vitest.*",
        "app/**/opengraph-image.tsx", "app/**/twitter-image.tsx",
        "components/ui/**", "components/icons/**",
      ],
    },
  },
});
