import { mountDocumentationVersion } from "../versions";
import { siteHeader, siteFooter } from "../shell";
import { base as siteBase } from "../catalog";
const base = document.body.dataset.uploadBase ?? siteBase;
import type { Row } from "./reference";
import "./site.css";
const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (value) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        value
      ]!,
  );
const table = (
  rows: Row[],
  headers = ["Key", "Type / values", "Default", "Use"],
) =>
  `<div class="upload-table-wrap"><table class="upload-table"><thead><tr>${headers.map((text) => `<th>${text}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((text) => `<td>${escape(text)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const code = (text: string, label = "TypeScript") =>
  `<div class="upload-code"><div class="upload-code-head"><span>${label}</span><button type="button" data-copy>Copy code</button></div><pre><code>${escape(text)}</code></pre></div>`;
const server = `import { createServer } from 'node:http';
import { createUploadServer, createUploadRouter, UploadServerError } from '@salyra-ui/upload-server';
import { filesystemSessionStore, filesystemStorage } from '@salyra-ui/upload-server/filesystem';

type RequestContext = { user: { id: string } };

const engine = createUploadServer<RequestContext>({
  sessionStore: filesystemSessionStore('./private-uploads/sessions'),
  storage: filesystemStorage('./private-uploads/content'),
  maxFileSize: 128 * 1024 * 1024,
  scope: context => {
    if (!context) throw new UploadServerError(401, 'AUTH', 'Sign in to upload');
    return context.user.id;
  },
  authorize: async (operation, session, context) => {
    if (!context) throw new UploadServerError(401, 'AUTH', 'Sign in to upload');
    await authorizeDocumentTransfer(operation, session, context.user);
  },
});
const upload = createUploadRouter(engine, {
  basePath: '/documents/uploads',
  context: async request => ({ user: await getAuthenticatedUser(request) }),
});

createServer(async (request, response) => {
  if (!await upload(request, response)) {
    response.writeHead(404);
    response.end();
  }
}).listen(3000, '127.0.0.1');`;
const routes = `const upload = createUploadRouter(engine, {
  context: request => getApplicationContext(request),
  match(request) {
    const path = new URL(request.url ?? '/', 'http://localhost').pathname;
    if (request.method === 'POST' && path === '/files/transfers') {
      return { operation: 'create' };
    }
    const complete = /^\/files\/transfers\/([a-zA-Z0-9_-]+)\/finish$/.exec(path);
    if (request.method === 'POST' && complete) {
      return { operation: 'complete', id: complete[1] };
    }
    // Match probe, part and cancel routes using the same operation contract.
  },
});

// A controller can call the engine directly:
const result = await engine.finishUpload(sessionId, requestContext);`;
const storage = `import { S3Client } from '@aws-sdk/client-s3';
import { s3Storage, r2Storage } from '@salyra-ui/upload-server/s3';
import { filesystemReceiptJournal } from '@salyra-ui/upload-server/filesystem';

const storage = s3Storage({
  client: new S3Client({ region: process.env.AWS_REGION }),
  bucket: process.env.UPLOAD_BUCKET,
  prefix: 'documents/',
  journal: filesystemReceiptJournal('./private-uploads/provider-receipts'),
});

// For R2, use r2Storage with an S3Client configured for your R2 endpoint.
// Keep credentials on the server. The browser uses the application upload routes.`;
const serverOptions: Row[] = [
  [
    "sessionStore",
    "SessionStore",
    "Required",
    "Persistent session records and transaction/lease coordination. Use a transactional database store for multiple unrelated hosts.",
  ],
  [
    "storage",
    "StorageAdapter",
    "Required",
    "Receives streams, probes saved parts, finalizes their manifest and aborts temporary data.",
  ],
  [
    "maxFileSize",
    "number, bytes",
    "Provider/session limits",
    "Reject a descriptor above this size. Apply the same limit while receiving data.",
  ],
  [
    "maxChunkSize",
    "number, bytes",
    "storage.capabilities.maxChunkSize",
    "The accepted upper limit is the smaller of this value and the provider limit.",
  ],
  [
    "sessionTTL",
    "number, ms",
    "86400000",
    "Duration of an unfinished session. Expired sessions are cleaned during access or sweepExpired. Completed results remain available.",
  ],
  [
    "scope",
    "(context) => string | Promise<string>",
    "Empty scope",
    "Namespace the creation key per application/user. It does not replace session authorization.",
  ],
  [
    "authorize",
    "(operation, session?, context) => void | Promise<void>",
    "Unset",
    "Runs on every operation. Throw UploadServerError for application permission errors. create first receives no session, then the existing session when recovering a key.",
  ],
  [
    "validateUpload",
    "(descriptor, context) => void | Promise<void>",
    "Unset",
    "Reject a descriptor before storage begins. Validate business rules and the application metadata.",
  ],
  [
    "onEvent",
    "(event, context) => void | Promise<void>",
    "Unset",
    "Notification delivered after transaction locks are released. It can inspect the committed session. type is created, part-stored, completed, canceled or expired. Event IDs are stable and include the part index when present.",
  ],
  [
    "onNotificationError",
    "(error) => void",
    "Unset",
    "Observe failed notification callbacks separately from the committed storage operation. Use an application outbox for durable business events.",
  ],
];
const engineMethods: Row[] = [
  [
    "createUpload(descriptor, key, context?)",
    "Promise<UploadSession>",
    "Creation",
    "Validate metadata and return the same session for the same scoped key and descriptor. Conflicting descriptors return 409.",
  ],
  [
    "getUpload(id, context?)",
    "Promise<Checkpoint>",
    "Checkpoint",
    "Inspect storage, recover durable parts missing from the ledger and return receipts or the completed result.",
  ],
  [
    "receivePart(id, index, sha256, body, context?)",
    "Promise<PartReceipt>",
    "Streaming",
    "Accept a Node Readable. The size and checksum must match. Duplicate content returns the original receipt, changed content is rejected.",
  ],
  [
    "finishUpload(id, context?)",
    "Promise<unknown>",
    "Finalization",
    "Validate the ordered complete manifest and call storage.finish. Repeated requests return the stored result. An ambiguous provider response is inspected before retry.",
  ],
  [
    "cancelUpload(id, context?)",
    "Promise<void>",
    "Temporary cleanup",
    "Abort temporary storage and mark the session canceled. Completed files are protected from temporary cleanup.",
  ],
  [
    "sweepExpired(context?)",
    "Promise<void>",
    "Maintenance",
    "Clean expired unfinished sessions. Schedule this through your application worker or scheduler. No timer is started by the library.",
  ],
];
const stores: Row[] = [
  [
    "transaction(key, operation)",
    "Promise<T>",
    "Required",
    "Hold a process-safe lease or database transaction across all awaited I/O. Session mutations, completion and cancellation must be serialized.",
  ],
  [
    "get(id)",
    "Promise<ServerSession | undefined>",
    "Required",
    "Read the current descriptor, storage reference, part receipts, state and result.",
  ],
  [
    "put(session)",
    "Promise<void>",
    "Required",
    "Persist the record atomically before returning.",
  ],
  [
    "list()",
    "AsyncIterable<ServerSession>",
    "Required",
    "Enumerate sessions for expiry sweeping. An adapter can page its database internally.",
  ],
];
const storageMethods: Row[] = [
  [
    "capabilities",
    "{ minChunkSize, maxChunkSize, maxParts, parallelParts }",
    "Required",
    "Publish provider limits. The engine validates descriptors against them.",
  ],
  [
    "begin(session, context)",
    "Promise<unknown>",
    "Required",
    "Prepare storage and return an opaque reference. Repeated calls for the same ID must recover the same destination.",
  ],
  [
    "writePart(session, part, body, context)",
    "Promise<StoredPart>",
    "Required",
    "Consume the complete stream, enforce the size and SHA-256, then return an index, size, sha256 and opaque reference after durable storage.",
  ],
  [
    "probe(session, context)",
    "Promise<StoredPart[]>",
    "Required",
    "Return real saved parts. Do not trust a stale browser or session ledger. Reject replacing a confirmed part with different bytes.",
  ],
  [
    "inspectResult(session, context)",
    "Promise<{ found, result? }>",
    "Required",
    "Determine whether final publication already succeeded when its acknowledgment was lost.",
  ],
  [
    "finish(session, parts, context)",
    "Promise<unknown>",
    "Required",
    "Receive a complete ordered server-validated manifest. Assemble it locally or call the provider multipart completion API. Return the application result.",
  ],
  [
    "abort(session, context)",
    "Promise<void>",
    "Required",
    "Remove temporary data for an unfinished session. Repeat safely when cleanup is retried.",
  ],
  [
    "remove(result, context)",
    "Promise<void>",
    "Optional",
    "Delete a completed object. The application invokes this through its own catalog/removal rules.",
  ],
];
const handlerOptions: Row[] = [
  [
    "basePath",
    "string",
    "/uploads",
    "Default router prefix. This does not apply when supplying a custom matcher.",
  ],
  [
    "context",
    "(request) => unknown | Promise<unknown>",
    "Unset",
    "Resolve authenticated user, tenant or request metadata for engine hooks.",
  ],
  [
    "maxJSONBytes",
    "number, bytes",
    "65536",
    "Bound the descriptor JSON body before parsing it. File bodies remain streams.",
  ],
  [
    "match",
    "(request) => RouteMatch | undefined",
    "Default matcher",
    "Select create, probe, part, complete or cancel. Return id and index where required. Undefined leaves the request to the application router.",
  ],
];
const integrations = [
  {
    name: "Go",
    path: "go",
    code: `import upload "github.com/salyra-ui/file-upload/backend/go"\n\nengine := upload.New(upload.Options{\n  Sessions: upload.DiskSessions{Directory: "./uploads/sessions"},\n  Storage: upload.DiskStorage{Directory: "./uploads/content"},\n})\nhandler := upload.Handler{Engine: engine}\n// Mount handler in your application net/http router.\n\n// Build and run the reference example:\n// go test ./...\n// go run ./cmd/example`,
  },
  {
    name: "Rust",
    path: "rust",
    code: `use salyra_upload_server::{Engine, Options};\nuse salyra_upload_server::filesystem::{DiskSessions, DiskStorage};\n\nuse std::{path::PathBuf, sync::Arc};\n\nlet engine = Engine {\n  sessions: Arc::new(DiskSessions { directory: PathBuf::from("uploads/sessions") }),\n  storage: Arc::new(DiskStorage { directory: PathBuf::from("uploads/content") }),\n  options: Options::default(),\n};\n\n// SessionStore and Storage are traits. Implement them for your own database or provider.\n// Context carries application data and a cancellation flag.\n// The HTTP adapter is enabled separately with the "http" feature.\n\n// cargo test --features http\n// cargo run --features http --bin example`,
  },
  {
    name: "Java",
    path: "jvm",
    code: `import ui.salyra.upload.UploadEngine;\nimport ui.salyra.upload.Filesystem;\nimport ui.salyra.upload.HttpAdapter;\nimport java.nio.file.Path;\n\nvar engine = new UploadEngine(\n  new Filesystem.Sessions(Path.of("uploads/sessions")),\n  new Filesystem.Content(Path.of("uploads/content"))\n);\nvar handler = new HttpAdapter(engine, "/documents/uploads");\n// Mount the handler in a JDK HttpServer, or call engine methods from your controllers.\n\n// mvn package`,
  },
  {
    name: "Kotlin",
    path: "jvm/integrations/kotlin",
    code: `import ui.salyra.upload.KotlinUploads\nimport ui.salyra.upload.awaitUpload\n\nval uploads = KotlinUploads(engine, applicationExecutor)\nval checkpoint = uploads.getUpload(sessionId, requestContext).awaitUpload()\nval result = uploads.finishUpload(sessionId, requestContext).awaitUpload()\n\n// The JVM engine is shared with Java and Scala.\n// Set requestContext.canceled() when the application request is canceled.\n// Install the JVM engine with mvn install, then build this integration with mvn package.`,
  },
  {
    name: "Scala",
    path: "jvm/integrations/scala",
    code: `import ui.salyra.upload.ScalaUploads\n\nval uploads = new ScalaUploads(engine)\nval checkpoint = uploads.getUpload(sessionId, requestContext)\nval result = uploads.finishUpload(sessionId, requestContext)\n\n// The caller supplies an ExecutionContext. Operations return Future.\n// The JVM engine is shared with Java and Kotlin.\n// Install the JVM engine with mvn install, then build this integration with mvn package.`,
  },
  {
    name: ".NET",
    path: "dotnet",
    code: `using Salyra.Upload;\n\n// Use the async engine from your controller with the request cancellation token.\n// UploadHttp.Handle maps one UploadRoute to an ASP.NET HttpContext.\nawait UploadHttp.Handle(engine, httpContext, new UploadRoute("complete", sessionId));\n\n// dotnet build Salyra.Upload/Salyra.Upload.csproj\n// dotnet run --project Example`,
  },
  {
    name: "Python",
    path: "python",
    code: `from salyra_upload.engine import UploadEngine\nfrom salyra_upload.filesystem import DiskSessions, DiskStorage\nfrom salyra_upload.wsgi import upload_app\n\nengine = UploadEngine(\n    DiskSessions("uploads/sessions"),\n    DiskStorage("uploads/content"),\n)\napplication = upload_app(engine, base_path="/documents/uploads")\n\n# Mount this WSGI application in your server.\n# python example.py`,
  },
  {
    name: "PHP",
    path: "php",
    code: `use Salyra\\Upload\\UploadEngine;\nuse Salyra\\Upload\\DiskSessions;\nuse Salyra\\Upload\\DiskStorage;\n\n$engine = new UploadEngine(\n    new DiskSessions('uploads/sessions'),\n    new DiskStorage('uploads/content'),\n);\n$result = $engine->finishUpload($sessionId, $requestContext);\n\n// Call the engine from your own routes, or use HttpAdapter with a custom matcher.\n// php -S 127.0.0.1:4339 example.php`,
  },
  {
    name: "Ruby",
    path: "ruby",
    code: `require 'salyra_upload'\n\nengine = SalyraUpload::Engine.new(\n  sessions: SalyraUpload::DiskSessions.new('uploads/sessions'),\n  storage: SalyraUpload::DiskStorage.new('uploads/content')\n)\napplication = SalyraUpload::RackApp.new(engine, base_path: '/documents/uploads')\n\n# Mount the Rack application in your server.\n# ruby example.rb`,
  },
  {
    name: "Elixir",
    path: "elixir",
    code: `engine = SalyraUpload.Engine.new(\n  {SalyraUpload.DiskSessions, "uploads/sessions"},\n  {SalyraUpload.DiskStorage, "uploads/content"},\n  %{ttl_milliseconds: 86_400_000}\n)\n\n# Pass engine: engine and base_path: "/documents/uploads" to SalyraUpload.Plug.\n# A custom matcher chooses an operation, session ID and part index.\n# mix deps.get\n# mix run --no-halt example.exs`,
  },
  {
    name: "C",
    path: "c",
    code: `#include "salyra_upload.h"\n\nupload_disk *disk = upload_disk_new("uploads");\nupload_options options = {0};\noptions.sessions = upload_disk_sessions(disk);\noptions.storage = upload_disk_storage(disk);\nupload_engine *engine = upload_engine_new(&options);\n\n// Pass streaming readers and request context from your own HTTP routes.\n// Free returned JSON with upload_free. Keep adapters alive until engine disposal.\nupload_engine_free(engine);\nupload_disk_free(disk);\n\n// cmake -S . -B build && cmake --build build\n// ctest --test-dir build --output-on-failure`,
  },
  {
    name: "C++",
    path: "c",
    code: `#include "salyra_upload.hpp"\n\nsalyra::disk disk(upload_disk_new("uploads"));\nupload_options options{};\noptions.sessions = upload_disk_sessions(disk.get());\noptions.storage = upload_disk_storage(disk.get());\nsalyra::engine engine(options);\n\nauto result = engine.finish(sessionId, requestContext);\n// Engine and returned JSON use RAII. The engine is movable and not copyable.\n// Storage and streaming callbacks share the C implementation.`,
  },
];
const nativeTabs = `<div class="upload-code" data-native-code><div class="upload-code-head"><div class="upload-language-tabs" role="tablist" aria-label="Backend language">${integrations.map((item, index) => `<button type="button" role="tab" data-native="${item.name}" aria-selected="${index === 0}">${item.name}</button>`).join("")}</div><button type="button" data-copy>Copy code</button></div><pre><code>${escape(integrations[0].code)}</code></pre></div><p><a data-native-source href="https://github.com/salyra-ui/file-upload/tree/main/backend/go">Go source and example</a></p>`;
const sections = [
  [
    "installation",
    "Installation",
    `<p>Keep the server library separate from browser imports. The Node package uses streams and persistent storage.</p>${code("npm install @salyra-ui/upload-server" + (document.body.dataset.uploadVersion ? "@" + document.body.dataset.uploadVersion : ""), "Terminal")}${code(server)}<p><code>getAuthenticatedUser</code> and <code>authorizeDocumentTransfer</code> are application functions. The library calls them through your context and authorization callbacks.</p>`,
  ],
  ["options", "Server options", table(serverOptions)],
  [
    "operations",
    "Engine operations",
    table(engineMethods, ["Method", "Return value", "Operation", "Behavior"]),
  ],
  [
    "routing",
    "Routes and handlers",
    `<p>Use the default router, provide your own matcher, or call the engine directly. Importing the package never registers a route.</p>${code(routes)}${table(handlerOptions)}<p><code>createUploadHandlers(engine, options)</code> returns individual create, probe, part, complete and cancel handlers. They decode the HTTP request and return an operation result. Your controller chooses its response envelope.</p>`,
  ],
  [
    "protocol",
    "HTTP protocol",
    `<p>The browser and backend exchange <code>salyra-upload/1</code> payloads. Creation keys are scoped. Chunks are identified by their index and lowercase SHA-256. A checkpoint returns confirmed receipts, not client claims.</p>${table(
      [
        [
          "POST /uploads",
          "UploadDescriptor",
          "Idempotency-Key",
          "Returns { id, chunkSize, expiresAt }. Repeat with the same descriptor to recover its session.",
        ],
        [
          "GET /uploads/:id",
          "No body",
          "Session authorization",
          "Returns { status, parts, expiresAt, result? }. Completed results remain idempotent.",
        ],
        [
          "PUT /uploads/:id/parts/:index",
          "Binary chunk body",
          "Upload-Checksum",
          "Returns { index, size, sha256 } after confirmed storage. Size and content mismatch are rejected.",
        ],
        [
          "POST /uploads/:id/complete",
          "No body",
          "Session authorization",
          "Validates every part and returns the server result. Repeated completion returns the same result.",
        ],
        [
          "DELETE /uploads/:id",
          "No body",
          "Session authorization",
          "Cleans temporary data and returns null. It does not delete completed application documents.",
        ],
      ],
      ["Route", "Body", "Requirement", "Result"],
    )}${code(JSON.stringify({ protocol: "salyra-upload/1", name: "document.pdf", size: 8388608, type: "application/pdf", lastModified: 1791064800000, chunkSize: 5242880 }, null, 2), "Creation descriptor")}<div class="upload-downloads"><a href="${base}protocol/upload-v1.openapi.json" download>OpenAPI specification</a><a href="${base}protocol/upload-v1.json" download>JSON schemas</a></div><p>Error responses contain code and message. 409 covers conflicts and incomplete manifests, 410 marks expiry, 413 is a size limit and 422 rejects a checksum mismatch. Temporary failures can include Retry-After.</p>`,
  ],
  [
    "sessions",
    "Session storage",
    `<p>Session state and file content use separate interfaces. A database session store can coordinate workers while storage sends streams to a bucket.</p>${table(stores)}<p>The included Node filesystem session store coordinates processes on one host. Shared network filesystems or multiple hosts need a database lease/CAS implementation. Keep the lease across awaited storage work, including finalization and cancellation.</p>`,
  ],
  [
    "storage",
    "File storage",
    `${table(storageMethods)}<p>Filesystem storage assembles verified parts through bounded streams and publishes with a rename on the same filesystem. Original filenames stay in metadata. Store the content outside the public web root.</p><p><code>withStorageOverrides</code> replaces compatible operations. When changing reference formats, replace the full begin/write/probe/finish/inspect/abort lifecycle together. Partial overrides must explicitly declare compatibleReferences.</p>`,
  ],
  [
    "providers",
    "S3 and Cloudflare R2",
    `<p>Install the provider SDK only in the backend. The engine's main import does not include it.</p>${code("npm install @aws-sdk/client-s3", "Terminal")}${code(storage)}<p>The journal persists part receipts and the multipart reference. Its interface provides get, put, getReference, putReference and remove. Use a shared persistent journal when your deployment has several hosts.</p><p>S3/R2 chunks use a minimum requested size of 5 MiB and a maximum of 10,000 parts. The last part may be smaller. ETags stay separate from SHA-256. Unknown R2 parts without trusted journal receipts are sent again.</p><p>The backend streams chunks to the provider and performs finalization. This adapter does not issue presigned browser-upload URLs. Configure provider lifecycle cleanup for incomplete multipart sessions whose creation response was never received.</p>`,
  ],
  [
    "native",
    "Native backend integrations",
    `<p>The implementations below use the same browser protocol. Each includes filesystem storage and configurable hooks. JVM integrations share one engine. C++ wraps the C engine.</p>${nativeTabs}<p>The native storage interfaces accept custom implementations. The supplied S3/R2 adapters are currently in the Node package. Selecting a different backend language does not install those provider adapters.</p><p>Local example programs bind to localhost. Use your application HTTP server for deployment. The C socket example is a local contract test server.</p>`,
  ],
  [
    "recovery",
    "Recovery and notifications",
    `<p>The storage probe recovers parts saved before the session ledger could be updated. Finalization records its result before acknowledging completion. An uncertain finish inspects the destination before repeating work. If a finalizing ledger expires after the file was published, probe and duplicate creation recover the completed result. Node expiry sweeps check the destination before deleting temporary data.</p><p>Node callbacks run after session locks are released and can read the committed session. Native callbacks may still run inside the operation lock, so enqueue their work and avoid calling engine operations from them.</p><p>Callbacks after commit use stable event IDs. For business operations that must survive process crashes, persist an application outbox keyed by event ID. A callback alone cannot guarantee durable event delivery.</p><p>Temporary cancellation and application removal are separate. The application owns its list of completed documents and its onRemove endpoint. Schedule expiry sweeps and provider cleanup through your own workers.</p>`,
  ],
];
document.querySelector("#app")!.innerHTML =
  `${siteHeader("components")}<main class="upload-main"><div class="upload-heading"><div><span class="upload-kicker"><a href="${siteBase}components.html?environment=backend">Backend</a> / Files</span><h1>Upload Server</h1><p>Own the routes, session store and file destination. Use the transfer protocol with your application authentication and catalog.</p><div class="upload-related"><a href="${base}file-uploader.html">Frontend: File Uploader</a><a href="${base}upload-examples.html">Working examples</a></div></div><div class="documentation-version" data-documentation-version></div></div><div class="upload-layout"><nav class="upload-nav" aria-label="On this page">${sections.map(([id, title]) => `<a href="#${id}">${title}</a>`).join("")}</nav><div>${sections.map(([id, title, content]) => `<section id="${id}" class="upload-section"><h2>${title}</h2>${content}</section>`).join("")}</div></div></main>${siteFooter()}`;
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) =>
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(
      button.closest(".upload-code")!.querySelector("code")!.textContent!,
    );
    button.textContent = "Copied";
    setTimeout(() => (button.textContent = "Copy code"), 1500);
  }),
);
document
  .querySelectorAll<HTMLButtonElement>("[data-native]")
  .forEach((button) =>
    button.addEventListener("click", () => {
      const item = integrations.find(
        (item) => item.name === button.dataset.native,
      )!;
      const block = button.closest(".upload-code")!;
      block
        .querySelectorAll("[data-native]")
        .forEach((tab) =>
          tab.setAttribute("aria-selected", String(tab === button)),
        );
      block.querySelector("code")!.textContent = item.code;
      const link = document.querySelector<HTMLAnchorElement>(
        "[data-native-source]",
      )!;
      link.href = `https://github.com/salyra-ui/file-upload/tree/main/backend/${item.path}`;
      link.textContent = item.name + " source and example";
    }),
  );

mountDocumentationVersion("upload", "upload-server.html");
