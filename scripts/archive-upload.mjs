import { cp, mkdir, readFile, writeFile, access } from "node:fs/promises";
const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? ""))
  throw new Error("Usage: node scripts/archive-upload.mjs 0.1.0");
const folder = `public/versions/file-uploader/${version}`;
try {
  await access(folder);
  throw new Error(
    "This version already has an archive. Published snapshots are immutable.",
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await mkdir(folder, { recursive: true });
await cp("dist/assets", `${folder}/assets`, { recursive: true });
await cp("dist/downloads/file-uploader", `${folder}/downloads/file-uploader`, {
  recursive: true,
});
await cp("dist/protocol", `${folder}/protocol`, { recursive: true });
for (const page of [
  "file-uploader",
  "upload",
  "upload-server",
  "upload-examples",
  "upload-changelog",
]) {
  const html = (await readFile(`dist/${page}.html`, "utf8"))
    .replace(/((?:src|href)=")\/[^" ]*assets\//g, "$1./assets/")
    .replace("<body", `<body data-upload-version="${version}"`);
  const prepared = html.replace(
    /(<body[^>]*>)/,
    '$1<script>document.body.dataset.siteRoot=location.pathname.split("/versions/file-uploader/")[0]+"/";document.body.dataset.uploadBase=new URL("./",location.href).pathname;</script>',
  );
  await writeFile(`${folder}/${page}.html`, prepared);
}
await writeFile(
  `${folder}/snapshot.json`,
  JSON.stringify(
    {
      version,
      protocol: "salyra-upload/1",
      pages: [
        "file-uploader.html",
        "upload-server.html",
        "upload-examples.html",
        "upload-changelog.html",
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(`Archived immutable File Uploader documentation ${version}.`);
