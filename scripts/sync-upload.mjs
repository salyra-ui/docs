import { cp, mkdir, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { resolve, join } from "node:path";
const source = process.argv[2];
if (!source)
  throw new Error(
    "Usage: node scripts/sync-upload.mjs /path/to/salyra-file-uploader",
  );
const root = resolve(source),
  dist = join(root, "release/file-uploader/dist");
await rm("src/upload/runtime", { recursive: true, force: true });
await mkdir("src/upload/runtime", { recursive: true });
for (const name of ["core", "transport", "vanilla"])
  await cp(join(dist, name), `src/upload/runtime/${name}`, { recursive: true });
for (const name of await readdir(dist))
  if (name.startsWith("chunk-") && /\.(js|d\.ts)$/.test(name))
    await cp(join(dist, name), `src/upload/runtime/${name}`);
await cp(join(root, "examples/snippets.ts"), "src/upload/snippets.ts");
let examples = await readFile(join(root, "examples/main.ts"), "utf8");
examples = examples.replace(
  /import\s+['"].\/styles\.css['"];/,
  "import { mountDocumentationVersion } from '../versions';\nimport './examples.css';\nimport { demoTransport, demoFetch as fetch } from './demo';\nimport { base as siteBase } from '../catalog';\nconst base = document.body.dataset.uploadBase ?? siteBase;",
);
examples = examples
  .replaceAll("../packages/file-uploader/src/core", "./runtime/core/index.js")
  .replaceAll(
    "../packages/file-uploader/src/transport/chunked",
    "./runtime/transport/chunked.js",
  )
  .replaceAll(
    "../packages/file-uploader/src/transport/http",
    "./runtime/transport/http.js",
  )
  .replaceAll(
    "../packages/file-uploader/src/vanilla",
    "./runtime/vanilla/index.js",
  );
examples = examples.replace(
  /transport:\s*\/\* docs-transport-start \*\/[\s\S]*?\/\* docs-transport-end \*\//,
  "transport: demoTransport(example.id, example.id !== 'indeterminate', !['http', 'indeterminate'].includes(example.id))",
);
examples = examples.replace(
  "These examples send files to the local reference server. Chunks are delayed by 120 ms so the transfer states are visible.",
  "These examples simulate a server in this browser. No file content is uploaded. Session receipts stay in browser storage so the resume example works after a refresh.",
);
examples = examples.replace(
  "The reference server stores files in this project's .uploads directory.",
  "This list contains completed records from the browser simulation. Removing a row clears its simulated record.",
);
examples = examples.replace(
  '<a href="https://github.com/salyra-ui">GitHub</a>',
  '<a href="${base}file-uploader.html">API reference</a><a href="${base}upload-server.html">Server</a>',
);
if (!examples.includes("import { demoTransport"))
  throw new Error(
    "Missing demo transport import after example synchronization",
  );
if (!examples.includes("transport: demoTransport"))
  throw new Error("Missing simulated transport after example synchronization");
examples = examples
  .replace(
    '<aside class="sidebar">',
    '<aside class="sidebar"><div class="documentation-version" data-documentation-version></div>',
  )
  .replace('href="https://salyra-ui.github.io/docs/"', 'href="${siteBase}"')
  .replace(
    'href="https://salyra-ui.github.io/docs/components.html"',
    'href="${siteBase}components.html"',
  );
examples += '\nmountDocumentationVersion("upload", "upload-examples.html");\n';
await writeFile("src/upload/examples.ts", examples);
await cp(join(root, "examples/styles.css"), "src/upload/examples.css");
await mkdir("public/downloads/file-uploader", { recursive: true });
for (const name of ["file-uploader.js", "file-uploader.min.js"])
  await cp(
    join(dist, "browser", name),
    `public/downloads/file-uploader/${name}`,
  );
for (const name of ["styles.css", "styles.min.css"])
  await cp(join(dist, name), `public/downloads/file-uploader/${name}`);
await mkdir("public/protocol", { recursive: true });
await cp(
  join(root, "protocol/openapi.json"),
  "public/protocol/upload-v1.openapi.json",
);
await cp(join(root, "protocol/schemas.json"), "public/protocol/upload-v1.json");
await mkdir("documentation/file-uploader/0.1.0", { recursive: true });
await cp(
  join(root, "protocol/README.md"),
  "documentation/file-uploader/0.1.0/protocol.md",
);
await writeFile(
  "documentation/file-uploader/releases.json",
  JSON.stringify(
    {
      latest: "0.1.0",
      releases: [
        { version: "0.1.0", date: "2026-10-04", url: "file-uploader.html" },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Synced audited uploader runtime, standalone downloads, examples and protocol.",
);
