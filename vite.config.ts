import { defineConfig } from "vite";
import { resolve } from "node:path";
const pages = [
  "index",
  "docs",
  "color-picker",
  "theme-studio",
  "calendar",
  "date-picker",
  "time-picker",
  "date-time-picker",
  "color",
  "generator",
  "date-examples",
  "changelog",
  "date-changelog",
];
export default defineConfig({
  base: process.env.PAGES_BASE ?? "/",
  server: { port: 4332, strictPort: true },
  build: {
    target: "es2022",
    sourcemap: false,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((name) => [name, resolve(`${name}.html`)]),
      ),
    },
  },
});
