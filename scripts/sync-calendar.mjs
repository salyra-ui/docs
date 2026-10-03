import { cp, readFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";
const source = process.argv[2];
if (!source)
  throw Error(
    "Usage: node scripts/sync-calendar.mjs /path/to/salyra-date-picker",
  );
const root = resolve(source);
const { version } = JSON.parse(
  await readFile(join(root, "package.json"), "utf8"),
);
// Update published assets and reusable live example modules. The component docs stay in this repository.
const slugs = ["calendar", "date-picker", "time-picker", "date-time-picker"];
for (const slug of slugs) {
  const name = `salyra-ui-${slug}-${version}.tgz`;
  await cp(join(root, `release/${slug}/${name}`), `vendor/packages/${name}`);
  await cp(join(root, `public/downloads/${name}`), `public/downloads/${name}`);
  await cp(join(root, `public/downloads/${slug}`), `public/downloads/${slug}`, {
    recursive: true,
  });
}
for (const name of [
  "interval-picker.ts",
  "historical-calendar.ts",
  "event-calendar.ts",
  "scrolling-calendar.ts",
  "picker-controls.ts",
  "picker-controls.css",
  "demo-styles.css",
  "example-sources.ts",
  "example-tabs.css",
])
  await cp(join(root, `examples/${name}`), `src/date/${name}`);
await mkdir(`documentation/calendar/${version}`, { recursive: true });
await cp(
  join(root, `documentation/${version}`),
  `documentation/calendar/${version}`,
  { recursive: true },
);
await cp(join(root, "CHANGELOG.md"), "documentation/date-changelog.md");
console.log(
  `Synced calendar suite ${version}. Update catalog/package versions and run npm install if the version changed.`,
);
