import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";

const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? ""))
  throw new Error("Usage: node scripts/archive-calendar.mjs 0.1.0");
const folder = `public/versions/calendar/${version}`;
try {
  await access(folder);
  throw new Error(
    "This version already has an archive. Published snapshots are immutable.",
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const site = (process.env.PAGES_BASE ?? "/").replace(/\/?$/, "/");
const packages = ["calendar", "date-picker", "time-picker", "date-time-picker"];
const pages = [...packages, "date-examples", "date-changelog"];
await mkdir(folder, { recursive: true });
await cp("dist/assets", `${folder}/assets`, { recursive: true });
for (const name of packages)
  await cp(`dist/downloads/${name}`, `${folder}/downloads/${name}`, {
    recursive: true,
  });
for (const page of pages) {
  const html = (await readFile(`dist/${page}.html`, "utf8"))
    .replaceAll(`${site}assets/`, "./assets/")
    .replace("<body", `<body data-date-version="${version}"`)
    .replace(
      /(<body[^>]*>)/,
      '$1<script>document.body.dataset.siteRoot=location.pathname.split("/versions/calendar/")[0]+"/";document.body.dataset.dateBase=new URL("./",location.href).pathname;</script>',
    );
  await writeFile(`${folder}/${page}.html`, html);
}
await writeFile(
  `${folder}/snapshot.json`,
  JSON.stringify(
    { version, packages, pages: pages.map((page) => page + ".html") },
    null,
    2,
  ) + "\n",
);
console.log(`Archived immutable calendar documentation ${version}.`);
