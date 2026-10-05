import { siteHeader, siteFooter } from "../shell";
import { base as siteBase } from "../catalog";
const base = document.body.dataset.uploadBase ?? siteBase;
import { options, fields, methods, states, parts, type Row } from "./reference";
import { snippet, languages } from "./snippets";
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
  columns = ["Key", "Type / values", "Default", "Use"],
) =>
  `<div class="upload-table-wrap"><table class="upload-table"><thead><tr>${columns.map((column) => `<th>${escape(column)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escape(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const code = (value: string, label = "JavaScript") =>
  `<div class="upload-code"><div class="upload-code-head"><span>${escape(label)}</span><button type="button" data-copy>Copy code</button></div><pre><code>${escape(value)}</code></pre></div>`;
const section = (id: string, title: string, content: string) =>
  `<section id="${id}" class="upload-section"><h2>${title}</h2>${content}</section>`;
const composition = `<div class="upload-code" data-framework-code><div class="upload-code-head"><div class="upload-language-tabs" role="tablist" aria-label="Composition framework">${languages.map((name, i) => `<button type="button" role="tab" data-framework="${name}" aria-selected="${i === 0}">${name}</button>`).join("")}</div><button type="button" data-copy>Copy code</button></div><pre><code>${escape(snippet("React", "chunked"))}</code></pre></div>`;
const core = `import { createUploader, indexedDBPersistence } from '@salyra-ui/file-uploader';
import { chunkedTransport } from '@salyra-ui/file-uploader/chunked';

const store = createUploader({
  transport: chunkedTransport({ baseURL: '/uploads' }),
  chunkSize: 5 * 1024 * 1024,
  persistence: indexedDBPersistence('my-app:authenticated-user'),
});

await store.restore();
const ids = await store.add(input.files ?? []);
store.start(ids[0]);
const stop = store.subscribeItem(ids[0], () => {
  console.log(store.getItem(ids[0]));
});

// When your view is removed:
stop();
store.destroy();`;
const http = `import { httpTransport } from '@salyra-ui/file-uploader/http';

const transport = httpTransport({
  url: '/api/documents',
  method: 'POST',
  formField: 'document',
  headers: async () => ({ Authorization: await getCurrentAuthorization() }),
  parseResponse: response => response.document,
});

// Omit formField to send a raw Blob.
// Set progress: false for an indeterminate indicator.`;
const chunked = `import { chunkedTransport } from '@salyra-ui/file-uploader/chunked';

const transport = chunkedTransport({
  headers: async () => ({ Authorization: await getCurrentAuthorization() }),
  routes: {
    create: { url: '/documents/transfers', method: 'POST' },
    probe: { url: ({ session }) => '/documents/transfers/' + session.id },
    upload: {
      url: ({ session, index }) => '/documents/transfers/' + session.id + '/chunks/' + index,
      method: 'PUT',
    },
    complete: {
      url: ({ session }) => '/documents/transfers/' + session.id + '/finish',
      method: 'POST',
    },
    terminate: {
      url: ({ session }) => '/documents/transfers/' + session.id,
      method: 'DELETE',
    },
  },
});`;
const history = `const store = createUploader({
  transport,
  async loadHistory(cursor, signal) {
    const query = cursor ? '?cursor=' + encodeURIComponent(cursor) : '';
    const response = await fetch('/api/documents' + query, { signal });
    if (!response.ok) throw new Error('Could not load documents');
    return response.json(); // { items: [{ id, metadata, result }], nextCursor? }
  },
  async onRemove(item, signal) {
    const response = await fetch('/api/documents/' + item.result.id, {
      method: 'DELETE', signal,
    });
    if (!response.ok) throw new Error('Could not remove the document');
  },
});

let nextCursor = await store.loadHistory();
nextCursor = await store.loadHistory(nextCursor);`;
const routes: Row[] = [
  [
    "url",
    "string | async (context) => string",
    "Required for HTTP",
    "Evaluated on every request. context includes metadata, requestKey, signal and optional session/index.",
  ],
  [
    "method",
    "string",
    "POST for HTTP",
    "Chunked route defaults are POST, GET, PUT, POST and DELETE.",
  ],
  [
    "headers",
    "Record<string,string> | async (context) => Record<string,string>",
    "Unset",
    "Refresh authorization for each request. Credentials are not persisted.",
  ],
  [
    "credentials",
    "omit | same-origin | include",
    "Browser default",
    "Control cookie credentials. Cross-origin uploads also need matching server CORS.",
  ],
  [
    "fetch",
    "typeof fetch",
    "Browser transport",
    "Supply a fetch implementation. It cannot report granular upload progress. Use progress: false for an HTTP indeterminate indicator.",
  ],
  [
    "formField",
    "string",
    "Unset",
    "HTTP only. Creates FormData with the file under this key. Do not set its multipart Content-Type manually.",
  ],
  [
    "progress",
    "boolean",
    "true",
    "HTTP only. False exposes null progress until confirmed completion.",
  ],
  [
    "parseResponse",
    "(value, context) => unknown | Promise<unknown>",
    "Response body",
    "HTTP only. Map the decoded server response to the item result.",
  ],
  [
    "baseURL",
    "string",
    "/uploads",
    "Chunked only. Builds the five default operation routes.",
  ],
  [
    "routes",
    "Partial<Record<operation, RequestOptions>>",
    "Default routes",
    "Chunked only. Override create, probe, upload, complete or terminate separately.",
  ],
];
const sections = [
  section(
    "installation",
    "Installation",
    `<p>Choose the framework entry you use. Other framework adapters are separate imports and do not enter your application bundle.</p>${code("npm install @salyra-ui/file-uploader" + (document.body.dataset.uploadVersion ? "@" + document.body.dataset.uploadVersion : ""), "Terminal")}<p>Styles are optional. The parts accept native classes and content, including Tailwind utilities. The package does not inject a global stylesheet.</p>${code("import '@salyra-ui/file-uploader/styles.css';", "Optional styles")}<p>For Vanilla, use npm or download a browser build. Both JavaScript versions expose <code>SalyraFileUploader</code>.</p><div class="upload-downloads"><a href="${base}downloads/file-uploader/file-uploader.js" download>JavaScript</a><a href="${base}downloads/file-uploader/file-uploader.min.js" download>Minified JavaScript</a><a href="${base}downloads/file-uploader/styles.css" download>CSS</a><a href="${base}downloads/file-uploader/styles.min.css" download>Minified CSS</a></div>${code(`<link rel="stylesheet" href="./styles.min.css">\n<script src="./file-uploader.min.js"></script>\n<script>\n  const { createUploader, chunkedTransport, mountUploader } = SalyraFileUploader;\n  const store = createUploader({ transport: chunkedTransport({ baseURL: '/uploads' }) });\n  const mounted = mountUploader(document.querySelector('#uploader'), store, {\n    renderItem: item => createYourFileRow(item),\n  });\n</script>`, "Downloaded assets")}<p>Use <code>file-uploader.js</code> and <code>styles.css</code> for the standard builds. With npm, <code>/styles.css</code> resolves to minified CSS and <code>/styles.standard.css</code> selects the standard file.</p>`,
  ),
  section(
    "composition",
    "Composition",
    `<p>Start with a Root. Add a selection control, then render each file from its ID. Labels, preview content, progress markup and action buttons belong to your component.</p>${composition}<p><a href="${base}upload-examples.html">Open working examples</a> for resume, retry, previews, progress and disabled states.</p>`,
  ),
  section(
    "parts",
    "UI parts",
    `<p>React, Svelte and Vue export the <code>FileUploader</code> namespace. Angular exports standalone directives. Astro renders app-owned markup connected to the Vanilla engine after mount.</p>${table(parts, ["Part", "Props / content", "Element", "Behavior"])}<div class="upload-callout">Root options are initial configuration. Use an external store when several views need to share a transfer queue. Interaction flags can change through <code>store.setOptions</code>. A borrowed store is disposed by its owner.</div><h3>Framework details</h3><p>React render functions receive their value directly. Svelte 5 uses snippets. Vue scoped slots receive <code>{ ids }</code>, <code>{ item }</code> or <code>{ snapshot }</code>. Use a keyed Item in each framework.</p><p>Angular places directives on your own tags, including <code>[uploadRoot]</code>, <code>[uploadItem]</code>, <code>uploadProgress</code> and <code>uploadAction</code>. Bind <code>[disabled]</code> on individual buttons when needed. Native change and click handlers run before the queued default action. For a drop override, handle <code>(uploadBeforeDrop)</code> and call <code>preventDefault()</code>.</p><p>Astro Root accepts serializable options with <code>endpoint</code> and optional <code>transport: "chunked" | "http"</code>. A <code>template[data-upload-template]</code> contains your item markup. Functions, custom persistence and loaders belong in a client script using <code>mountUploader</code>.</p>`,
  ),
  section(
    "options",
    "Uploader options",
    `<p>Pass these options to <code>createUploader</code> or a framework Root. Server-side validation remains authoritative.</p>${table(options)}`,
  ),
  section(
    "store",
    "Store and actions",
    `<p>Use the engine directly when your application already has its own UI. Framework helpers expose the same store.</p>${code(core)}${table(methods, ["Method", "Return value", "Operation", "Behavior"])}<p><code>uploadActions(item)</code> returns <code>canStart</code>, <code>canPause</code>, <code>canResume</code>, <code>canRetry</code>, <code>canCancel</code>, <code>canReset</code>, <code>canRemove</code> and <code>canForget</code>. Combine them with Root flags when building custom buttons.</p><p>React and Vue export <code>useUploader</code>, <code>useUploadItem</code> and <code>useUploaderStore</code>. Svelte exports readable-store helpers with these names. <code>useUploader</code> subscribes to the full snapshot, while <code>useUploadItem</code> subscribes to one row.</p>`,
  ),
  section(
    "item",
    "Item values",
    `<p>Use an Item context, a Preview/Progress renderer or <code>store.getItem(id)</code> to read these values.</p>${table(fields)}`,
  ),
  section(
    "states",
    "Transfer states",
    `<p>Temporary cleanup and completed-file removal have separate state. A canceled row can still have failed cleanup. A completed row can have a removal error.</p>${table(states, ["State", "Meaning", "Typical action", "Details"])}`,
  ),
  section(
    "transport",
    "Transports",
    `<h3>One HTTP request</h3><p>Send a raw Blob or FormData. Retry starts the request again from the beginning. Your endpoint should honor the idempotency key when duplicate requests can create duplicate files.</p>${code(http)}<h3>Verified chunks</h3><p>Creation, checkpoint, chunk storage, finalization and cancellation are separate operations. Match the client routes to your controllers.</p>${code(chunked)}${table(routes)}<p>A custom transport implements <code>UploadTransport</code>. Declare resume, progress, parallelParts, checksums and terminate capabilities accurately. Each async operation receives an AbortSignal. Stop work when it is aborted.</p><p>The bundled transports are HTTP and the Salyra chunked protocol. tus and presigned direct-to-storage require separate adapters. See the <a href="${base}upload-server.html#protocol">server protocol</a> for payloads and receipts.</p>`,
  ),
  section(
    "resume",
    "Persistence and resume",
    `<p>Choose an IndexedDB namespace per application and authenticated user. Restoration loads metadata, not File content. An unfinished transfer waits for the original file to be selected again.</p>${code(`const persistence = indexedDBPersistence('documents:' + authenticatedUserId);\nconst store = createUploader({ transport, persistence });\nawait store.restore();\n\nawait store.attach(restoredItemId, selectedOriginalFile);\nstore.resume(restoredItemId);`)}<p>The server checkpoint is checked first. Every confirmed chunk is hashed against the reselected file before any saved bytes are reused. Matching names and sizes alone do not prove identity.</p><p>Pause keeps the session. Reset starts from zero with a new key and retains a separate cleanup record for the old session. If IndexedDB fails, the current transfer can continue and <code>persistenceError</code> describes the failure. Browser session locks coordinate cooperating tabs where the API is available.</p>`,
  ),
  section(
    "history",
    "Existing files and removal",
    `<p>Use initialFiles for SSR records or a paginated loader for the application catalog. Removing a completed file calls your endpoint. Forgetting it only removes the local row.</p>${code(history)}<p>A failed onRemove callback sets <code>removeError</code>. Repeating remove retries the application operation. Cancel stops the current transfer. Retry starts a canceled file again with a new session. Pause keeps the session for Resume. A plain HTTP transport aborts its request and uses onCancel when you provide remote cleanup. A temporary-data cleanup failure is stored in <code>snapshot.cleanups</code> and uses <code>retryCleanup(cleanupId)</code>.</p>`,
  ),
  section(
    "customization",
    "Classes, content and progress",
    `<p>The primitives add behavior and a few state attributes. Change the tags for lists and rows, render a different preview per MIME type, replace status labels and choose your own progress content.</p>${code(`import { formatBytes } from '@salyra-ui/file-uploader';\n\n<FileUploader.Item id={id} as="div" className="grid gap-3 border-b py-4">\n  <FileUploader.Name className="font-medium" />\n  <FileUploader.Status labels={{ uploading: 'Sending', paused: 'On hold' }} />\n  <FileUploader.Progress aria-label="Document upload">\n    {item => (\n      <div>\n        {item.progress === null ? 'Sending' : Math.round(item.progress) + '%'}\n        <span>{formatBytes(item.uploadedBytes)} / {formatBytes(item.totalBytes)}</span>\n        {item.etaSeconds !== null && <span>{Math.ceil(item.etaSeconds)} seconds left</span>}\n      </div>\n    )}\n  </FileUploader.Progress>\n  <FileUploader.Action action="cancel" className="text-red-600">Cancel transfer</FileUploader.Action>\n</FileUploader.Item>`, "React customization")}<p>Progress percentages describe the transfer. Finalization may continue after the bar reaches 100. Use status to decide when to display a completed state.</p><p><code>formatBytes(bytes, options)</code> accepts <code>locale</code>, <code>base: 1000 | 1024</code> and <code>maximumFractionDigits</code>. Dates, ETA text and retry countdown labels belong to your formatter.</p>`,
  ),
  section(
    "ssr",
    "SSR and lifecycle",
    `<p>Create a store per server-rendered tree. Never share a module-level mutable queue between requests. Existing records can render on the server. Inputs, uploads and browser restoration start after mount.</p><p>Owned Root stores are destroyed with their view. Supplied stores remain alive until the application calls destroy. Preview URLs, subscriptions, active requests and retry timers have their own cleanup.</p><p>Import the backend library only on the server. Storage credentials and provider SDKs never belong in the browser uploader.</p>`,
  ),
];
const nav = [
  ["installation", "Installation"],
  ["composition", "Composition"],
  ["parts", "UI parts"],
  ["options", "Uploader options"],
  ["store", "Store and actions"],
  ["item", "Item values"],
  ["states", "States"],
  ["transport", "Transports"],
  ["resume", "Resume"],
  ["history", "History"],
  ["customization", "Customization"],
  ["ssr", "SSR"],
];
document.querySelector("#app")!.innerHTML =
  `${siteHeader("components")}<main class="upload-main"><div class="upload-heading"><div><span class="upload-kicker">Components / Files</span><h1>File Uploader</h1><p>File selection, transfer queues and chunked resume. Compose the controls around your application's upload endpoint.</p><div class="upload-related"><a href="${base}upload-examples.html">Working examples</a><a href="${base}upload-server.html">Backend integration</a><a href="${base}upload-changelog.html">Changelog</a></div></div><a class="upload-version" href="${base}upload-changelog.html">0.1.0</a></div><div class="upload-layout"><nav class="upload-nav" aria-label="On this page">${nav.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav><div>${sections.join("")}</div></div></main>${siteFooter()}`;
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
  .querySelectorAll<HTMLButtonElement>("[data-framework]")
  .forEach((button) =>
    button.addEventListener("click", () => {
      const block = button.closest("[data-framework-code]")!;
      block
        .querySelectorAll("[data-framework]")
        .forEach((tab) =>
          tab.setAttribute("aria-selected", String(tab === button)),
        );
      block.querySelector("code")!.textContent = snippet(
        button.dataset.framework!,
        "chunked",
      );
    }),
  );
