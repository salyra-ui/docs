import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { build } from "esbuild";
const base = (process.env.PAGES_BASE ?? "/").replace(/\/?$/, "/");
await build({
  entryPoints: ["src/color-theme/version-navigation.ts"],
  outfile: "dist/docs-version-navigation.js",
  bundle: true,
  format: "esm",
  minify: true,
  target: "es2022",
  sourcemap: false,
});
async function rewrite(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) await rewrite(path);
    else if (/\.(html|css|js|json)$/.test(entry.name)) {
      let text = await readFile(path, "utf8");
      text = text.replaceAll("/__SALYRA_SITE_BASE__/", base);
      if (entry.name.endsWith(".html")) {
        const version = /\/versions\/(\d+\.\d+\.\d+)\//.exec(path)?.[1];
        const current =
          [
            "color-picker.html",
            "theme-studio.html",
            "color.html",
            "generator.html",
            "changelog.html",
          ].includes(entry.name) && folder === "dist";
        if (version || current) {
          text = text.replace(
            "<body",
            `<body data-docs-version="${version ?? "1.0.1"}" data-site-root="${base}"`,
          );
          text = text.replace(
            "</head>",
            `<link rel="stylesheet" href="${base}docs-version-navigation.css"></head>`,
          );
          text = text.replace(
            "</body>",
            `<script type="module" src="${base}docs-version-navigation.js"></script></body>`,
          );
        }
      }
      await writeFile(path, text);
    }
  }
}
await rewrite("dist");
await writeFile("dist/.nojekyll", "");
console.log(`Built Salyra UI documentation for six components (base ${base}).`);
