const b=["React","Svelte","Vue","Angular","Astro","Vanilla"];function i(e,t){const o=s(t),a=n(t);switch(e){case"React":return`import { FileUploader } from '@salyra-ui/file-uploader/react';
${a}
${o}

export function UploadFiles() {
  return (
    <FileUploader.Root options={options}>
      <FileUploader.Dropzone className="upload-zone">
        <FileUploader.Input multiple className="sr-only" aria-label="Select files" />
        <FileUploader.Trigger>Select files</FileUploader.Trigger>
      </FileUploader.Dropzone>
      <FileUploader.Action action="start">Upload</FileUploader.Action>
      <FileUploader.List>
        {ids => ids.map(id => (
          <FileUploader.Item key={id} id={id}>
            <FileUploader.Name />
            <FileUploader.Metadata format={item => formatBytes(item.totalBytes)} />
            <FileUploader.Progress aria-label="Upload progress">
              {item => <span>{Math.round(item.progress ?? 0)}%</span>}
            </FileUploader.Progress>
            <FileUploader.Action action="pause">Pause</FileUploader.Action>
            <FileUploader.Action action="resume">Resume</FileUploader.Action>
          </FileUploader.Item>
        ))}
      </FileUploader.List>
    </FileUploader.Root>
  );
}`;case"Svelte":return`<script lang="ts">
  import { FileUploader } from '@salyra-ui/file-uploader/svelte';
  ${a}
  ${o}
<\/script>

<FileUploader.Root {options}>
  <FileUploader.Dropzone class="upload-zone">
    <FileUploader.Input multiple class="sr-only" aria-label="Select files" />
    <FileUploader.Trigger>Select files</FileUploader.Trigger>
  </FileUploader.Dropzone>
  <FileUploader.Action action="start">Upload</FileUploader.Action>
  <FileUploader.List>
    {#snippet children(ids)}
      {#each ids as id (id)}
        <FileUploader.Item {id}>
          <FileUploader.Name />
          <FileUploader.Metadata format={item => formatBytes(item.totalBytes)} />
          <FileUploader.Progress aria-label="Upload progress">
            {#snippet children(item)}{Math.round(item.progress ?? 0)}%{/snippet}
          </FileUploader.Progress>
          <FileUploader.Action action="pause">Pause</FileUploader.Action>
          <FileUploader.Action action="resume">Resume</FileUploader.Action>
        </FileUploader.Item>
      {/each}
    {/snippet}
  </FileUploader.List>
</FileUploader.Root>`;case"Vue":return`<script setup lang="ts">
import { FileUploader } from '@salyra-ui/file-uploader/vue';
${a}
${o}
<\/script>

<template>
  <FileUploader.Root :options="options">
    <FileUploader.Dropzone class="upload-zone">
      <FileUploader.Input multiple class="sr-only" aria-label="Select files" />
      <FileUploader.Trigger>Select files</FileUploader.Trigger>
    </FileUploader.Dropzone>
    <FileUploader.Action action="start">Upload</FileUploader.Action>
    <FileUploader.List v-slot="{ ids }">
      <FileUploader.Item v-for="id in ids" :key="id" :id="id">
        <FileUploader.Name />
        <FileUploader.Metadata :format="item => formatBytes(item.totalBytes)" />
        <FileUploader.Progress v-slot="{ item }" aria-label="Upload progress">
          {{ Math.round(item.progress ?? 0) }}%
        </FileUploader.Progress>
        <FileUploader.Action action="pause">Pause</FileUploader.Action>
        <FileUploader.Action action="resume">Resume</FileUploader.Action>
      </FileUploader.Item>
    </FileUploader.List>
  </FileUploader.Root>
</template>`;case"Angular":return`import { Component } from '@angular/core';
import { FileUploader } from '@salyra-ui/file-uploader/angular';
${a}
${o}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FileUploader.Root, FileUploader.Input, FileUploader.Trigger, FileUploader.Dropzone, FileUploader.List, FileUploader.Item, FileUploader.Name, FileUploader.Progress, FileUploader.Action],
  template: \`
    <section [uploadRoot]="options">
      <div uploadDropzone class="upload-zone">
        <input uploadInput multiple class="sr-only" aria-label="Select files" />
        <button type="button" uploadTrigger>Select files</button>
      </div>
      <button type="button" uploadAction="start">Upload</button>
      <ul uploadList #list="uploadList">
        @for (id of list.ids(); track id) {
          <li [uploadItem]="id" #file="uploadItem">
            <span uploadName></span>
            <div uploadProgress aria-label="Upload progress">
              {{ file.value()?.progress }}%
            </div>
            <button type="button" uploadAction="pause">Pause</button>
            <button type="button" uploadAction="resume">Resume</button>
          </li>
        }
      </ul>
    </section>
  \`,
})
export class UploadFiles { readonly options = options; }`;case"Astro":return`---
import { FileUploader } from '@salyra-ui/file-uploader/astro';
---

<FileUploader.Root options={{ endpoint: '/uploads', chunkSize: 262144, maxConcurrentChunks: ${t==="parallel"?3:1} }}>
  <FileUploader.Dropzone class="upload-zone">
    <FileUploader.Input multiple class="sr-only" aria-label="Select files" />
    <FileUploader.Trigger>Select files</FileUploader.Trigger>
  </FileUploader.Dropzone>
  <FileUploader.Action action="start">Upload</FileUploader.Action>
  <FileUploader.List>
    <template data-upload-template>
      <FileUploader.Item>
        <FileUploader.Name />
        <FileUploader.Status />
        <FileUploader.Progress aria-label="Upload progress" />
        <FileUploader.Action action="pause">Pause</FileUploader.Action>
        <FileUploader.Action action="resume">Resume</FileUploader.Action>
      </FileUploader.Item>
    </template>
  </FileUploader.List>
</FileUploader.Root>`;default:return`${a}import { mountUploader } from '@salyra-ui/file-uploader/vanilla';

${o}

const mounted = mountUploader(document.querySelector('#uploader'), options, {
  renderItem(item) {
    const element = document.createElement('li');
    element.innerHTML = \`
      <span data-upload-name></span>
      <span data-upload-metadata></span>
      <div data-upload-progress aria-label="Upload progress"></div>
      <button type="button" data-upload-action="pause">Pause</button>
      <button type="button" data-upload-action="resume">Resume</button>
    \`;
    return element;
  },
  renderMetadata: item => formatBytes(item.totalBytes),
  renderProgress: (element, item) => {
    element.textContent = item.progress === null ? 'Uploading' : item.progress.toFixed(0) + '%';
  },
});

// TypeScript module. Use these data attributes in your HTML.
// Dispose when this part of the page is removed.
// mounted.destroy();

/* Markup
<section id="uploader">
  <div data-upload-dropzone class="upload-zone">
    <input type="file" multiple data-upload-input aria-label="Select files" />
    <button type="button" data-upload-trigger>Select files</button>
  </div>
  <button type="button" data-upload-start>Upload</button>
  <ul data-upload-list></ul>
</section>
*/`}}function n(e){const t=e==="http"||e==="indeterminate";return`import { createUploader, formatBytes, type UploadItem, type UploaderStore${e==="resume"?", indexedDBPersistence":""} } from '@salyra-ui/file-uploader';
import { ${t?"httpTransport":"chunkedTransport"} } from '@salyra-ui/file-uploader/${t?"http":"chunked"}';
`}function s(e){return`const options = {
  transport: ${e==="http"||e==="indeterminate"?`httpTransport({ url: '/api/files', formField: 'file', progress: ${e!=="indeterminate"} })`:"chunkedTransport({ baseURL: '/uploads' })"},
  chunkSize: 256 * 1024,
  autoUpload: false,
  maxConcurrentFiles: 2,
  maxConcurrentChunks: ${e==="parallel"?3:1},
  maxConcurrentRequests: 4,
  retry: { maxAttempts: 4, baseDelay: 1000 },
${e==="resume"?`  persistence: indexedDBPersistence('my-app:authenticated-user'),
`:""}${e==="limits"?`  accept: 'image/*',
  maxFileSize: 2 * 1024 * 1024,
  maxFiles: 3,
`:""}};`}function p(e,t){if(e==="Astro"&&["resume","gallery","retry","limits"].includes(t))return m(t);let o=i(e,t);e==="Astro"&&["http","indeterminate","limits"].includes(t)&&(o=o.replace("endpoint: '/uploads', chunkSize: 262144, maxConcurrentChunks: 1",t==="limits"?"endpoint: '/uploads', chunkSize: 262144, accept: 'image/*', maxFileSize: 2097152, maxFiles: 3":"endpoint: '/api/files', transport: 'http', formField: 'file', progress: "+(t!=="indeterminate")));const a=["retry","cancel","reset","remove","forget"];if(e==="React"&&(o=o.replace('            <FileUploader.Action action="resume">Resume</FileUploader.Action>',`            <FileUploader.Action action="resume">Resume</FileUploader.Action>
`+a.map(r=>`            <FileUploader.Action action="${r}">${r[0].toUpperCase()+r.slice(1)}</FileUploader.Action>`).join(`
`))),["Vue","Svelte","Astro"].includes(e)&&(o=o.replace('<FileUploader.Action action="resume">Resume</FileUploader.Action>',`<FileUploader.Action action="resume">Resume</FileUploader.Action>
`+a.map(r=>`          <FileUploader.Action action="${r}">${r[0].toUpperCase()+r.slice(1)}</FileUploader.Action>`).join(`
`))),e==="Angular"&&(o=o.replace('<button type="button" uploadAction="resume">Resume</button>',`<button type="button" uploadAction="resume">Resume</button>
`+a.map(r=>`            <button type="button" uploadAction="${r}">${r[0].toUpperCase()+r.slice(1)}</button>`).join(`
`))),e==="Vanilla"&&(o=o.replace('<button type="button" data-upload-action="resume">Resume</button>',`<button type="button" data-upload-action="resume">Resume</button>
`+a.map(r=>`      <button type="button" data-upload-action="${r}">${r[0].toUpperCase()+r.slice(1)}</button>`).join(`
`))),t==="gallery"&&(o=d(o,e)),t==="resume"&&(o=c(o,e)),t==="limits"&&(o=f(o,e)),t==="indeterminate"&&(o=o.replaceAll("Math.round(item.progress ?? 0)","item.progress === null ? 'Sending' : Math.round(item.progress) + '%'").replaceAll("}%</span>","}</span>").replaceAll("}%{/snippet}","}{/snippet}").replaceAll("}}%","}}")),t==="history")return o=y(o,e),o=o.replace("const options = {",`const options = {
`+U),o;const l=u(t);return l?e==="Svelte"||e==="Vue"?o.replace("<\/script>",`
`+l+`
<\/script>`):e==="Astro"?o+`
<!-- Rich callbacks use a client-script Vanilla mount, documented in Customization. -->`:o+`

`+l:o}function d(e,t){return t==="React"?e.replace("            <FileUploader.Name />",`<FileUploader.Preview>
              {({ item, url }) => item.metadata.type.startsWith('image/') && url
                ? <img src={url} alt={item.metadata.name} className="file-thumbnail" />
                : item.metadata.type.startsWith('video/') && url
                  ? <video src={url} controls className="file-thumbnail" />
                  : <span className="file-format">{item.metadata.type || 'Document'}</span>}
            </FileUploader.Preview>
            <FileUploader.Name />`):t==="Vue"?e.replace("        <FileUploader.Name />",`<FileUploader.Preview v-slot="{ item, url }">
          <img v-if="item.metadata.type.startsWith('image/') && url" :src="url" :alt="item.metadata.name" class="file-thumbnail" />
          <video v-else-if="item.metadata.type.startsWith('video/') && url" :src="url" controls class="file-thumbnail" />
          <span v-else class="file-format">{{ item.metadata.type || 'Document' }}</span>
        </FileUploader.Preview>
        <FileUploader.Name />`):t==="Svelte"?e.replace("          <FileUploader.Name />",`<FileUploader.Preview>
            {#snippet children({ item, url })}
              {#if item.metadata.type.startsWith('image/') && url}
                <img src={url} alt={item.metadata.name} class="file-thumbnail" />
              {:else if item.metadata.type.startsWith('video/') && url}
                <video src={url} controls class="file-thumbnail"><track kind="captions" /></video>
              {:else}<span class="file-format">{item.metadata.type || 'Document'}</span>{/if}
            {/snippet}
          </FileUploader.Preview>
          <FileUploader.Name />`):t==="Angular"?e.replace("FileUploader.Name, FileUploader.Progress","FileUploader.Name, FileUploader.Preview, FileUploader.Progress").replace("            <span uploadName></span>",`<div uploadPreview #preview="uploadPreview">
              @if (file.value()?.metadata?.type?.startsWith('image/') && preview.url) {
                <img [src]="preview.url" [alt]="file.value()?.metadata?.name" class="file-thumbnail" />
              } @else if (file.value()?.metadata?.type?.startsWith('video/') && preview.url) {
                <video [src]="preview.url" controls class="file-thumbnail"></video>
              } @else { <span>{{ file.value()?.metadata?.type || 'Document' }}</span> }
            </div>
            <span uploadName></span>`):t==="Vanilla"?e.replace("<span data-upload-name></span>",`<div data-upload-preview></div>
      <span data-upload-name></span>`).replace("  renderMetadata: item =>",`  renderPreview(element, item, url) {
    if (url && (item.metadata.type.startsWith('image/') || item.metadata.type.startsWith('video/'))) {
      const media = document.createElement(item.metadata.type.startsWith('image/') ? 'img' : 'video');
      media.src = url;
      media.className = 'file-thumbnail';
      if (media instanceof HTMLImageElement) media.alt = item.metadata.name;
      else media.controls = true;
      const current = element.firstElementChild;
      if (current?.tagName !== media.tagName || current.getAttribute('src') !== url) element.replaceChildren(media);
    } else element.textContent = item.metadata.type || 'Document';
  },
  renderMetadata: item =>`):e}function u(e){switch(e){case"resume":return`// Reselecting a restored record needs its ID and the original File.
// React: useUploaderStore() inside Root. Vue/Svelte: useUploaderStore()
// during child setup. Angular: inject(Root).store. Vanilla: mounted.store.
// Astro: mount Vanilla in your client script for callbacks and persistence.
async function selectOriginal(store: UploaderStore, id: string, input: HTMLInputElement) {
  const file = input.files?.[0];
  if (!file) return;
  await store.attach(id, file); // Verifies saved SHA-256 receipts.
  store.resume(id);
  input.value = '';
}
// Bind to your file input's change event. Show it for awaiting-file rows.
// Match persistence namespaces to the signed-in user. Do not store credentials.`;case"retry":return`// The test endpoint belongs to this example's server.
async function rejectNextRequest() {
  await fetch('/demo/fail-next', { method: 'POST', headers: { 'X-Demo-Example': 'retry' } });
}
// Render this value from a clock updated every 250 ms while the row is mounted.
function retryLabel(item: UploadItem, now = Date.now()) {
  if (item.status !== 'retrying' || !item.nextRetryAt) return '';
  const seconds = Math.max(0, Math.ceil((item.nextRetryAt - now) / 1000));
  return 'Retrying in ' + seconds + 's';
}
// Subscribe per row, clear its interval on unmount and use Action cancel
// to stop both the request and the retry timer.`;case"parallel":return`// Confirmed parts can arrive in any order. Keep their real indexes.
function savedParts(item: UploadItem) {
  return new Set(item.parts.map(part => part.index));
}
// Render one block per part for a small file, grouping blocks for a large one.
// Always use uploadedBytes for saved data, transferredBytes for current progress.
function progressLabel(item: UploadItem) {
  return formatBytes(item.uploadedBytes) + ' saved / ' + formatBytes(item.totalBytes)
    + (item.etaSeconds === null ? '' : ' · about ' + Math.ceil(item.etaSeconds) + 's left');
}`;case"indeterminate":return`// progress is null when the transport cannot measure the request.
// Do not convert null into 0%. Progress leaves aria-valuenow unset.
function progressLabel(item: UploadItem) {
  return item.progress === null ? 'Sending' : Math.round(item.progress) + '%';
}
// Use a status label or an animated indicator, with reduced-motion support.`;case"limits":return`// Change options from your own buttons, switches or inputs.
// Get the store from the framework context or mounted.store in Vanilla.
function setDisabled(store: UploaderStore, checked: boolean) { store.setOptions({ disabled: checked }); }
function setReadOnly(store: UploaderStore, checked: boolean) { store.setOptions({ readOnly: checked }); }
// Both block selection/actions. Neither cancels a transfer already running.
// A native disabled attribute can disable an individual Trigger or Action.`;case"gallery":return`// You own .file-thumbnail and .file-format, including their size and layout.
// Preview creates and revokes object URLs. It does not parse PDFs or documents.
// In Astro, use a client-script mountUploader renderPreview callback for custom media.`;case"history":return`import { createUploader } from '@salyra-ui/file-uploader';
import { chunkedTransport } from '@salyra-ui/file-uploader/chunked';

const store = createUploader({
  transport: chunkedTransport({ baseURL: '/uploads' }),
  loadHistory: async cursor => {
    const response = await fetch('/api/files' + (cursor ? '?cursor=' + encodeURIComponent(cursor) : ''));
    if (!response.ok) throw new Error('Could not load files');
    return response.json(); // { items: ExistingUpload[], nextCursor?: string }
  },
  onRemove: async item => {
    const result = item.result as { id: string };
    const response = await fetch('/api/files/' + encodeURIComponent(result.id), { method: 'DELETE' });
    if (!response.ok) throw new Error('Could not remove the file');
  },
});
await store.loadHistory(); // Append the returned page, without duplicating IDs.
// Render these rows with the same Item components. Remove calls onRemove.
// Removal errors stay in item.removeError. Forget only clears the local row.`;default:return""}}function c(e,t){return t==="React"?e.replace("import { FileUploader }","import { FileUploader, useUploaderStore, useUploadItem }").replace("<FileUploader.Name />",`<FileUploader.Name />
            <OriginalFile />`)+`

function OriginalFile() {
  const store = useUploaderStore();
  const item = useUploadItem();
  if (item?.status !== 'awaiting-file') return null;
  return <label>Select original file
    <input type="file" onChange={event => void selectOriginal(store, item.id, event.currentTarget)} />
  </label>;
}`:t==="Vue"?e.replace("import { FileUploader }",`import { onUnmounted } from 'vue';
import { FileUploader }`).replace("<\/script>",`const store = createUploader(options);
onUnmounted(() => store.destroy());
<\/script>`).replace(':options="options"',':store="store"').replace(':id="id">',':id="id" v-slot="{ item }">').replace("<FileUploader.Name />",`<FileUploader.Name />
        <label v-if="item.status === 'awaiting-file'">Select original file
          <input type="file" @change="selectOriginal(store, id, $event.currentTarget as HTMLInputElement)" />
        </label>`):t==="Svelte"?e.replace("import { FileUploader }",`import { onDestroy } from 'svelte';
import { FileUploader }`).replace("<\/script>",`const store = createUploader(options);
onDestroy(() => store.destroy());
<\/script>`).replace("<FileUploader.Root {options}>","<FileUploader.Root {store}>").replace("<FileUploader.Item {id}>",`<FileUploader.Item {id}>
          {#snippet children(item)}`).replace("</FileUploader.Item>",`{/snippet}
        </FileUploader.Item>`).replace("<FileUploader.Name />",`<FileUploader.Name />
          {#if item.status === 'awaiting-file'}
            <label>Select original file
              <input type="file" onchange={event => selectOriginal(store, id, event.currentTarget)} />
            </label>
          {/if}`):t==="Angular"?e.replace('[uploadRoot]="options"','[uploadRoot]="store"').replace("<span uploadName></span>",`<span uploadName></span>
            @if (file.value()?.status === 'awaiting-file') {
              <label>Select original file
                <input type="file" #original (change)="reselect(id, original)" />
              </label>
            }`).replace("readonly options = options;",`readonly store = createUploader(options);
  reselect(id: string, input: HTMLInputElement) { return selectOriginal(this.store, id, input); }
  ngOnDestroy() { this.store.destroy(); }`):t==="Vanilla"?e.replace("<span data-upload-name></span>",`<span data-upload-name></span>
      <label data-original-label>Select original file <input type="file" data-original /></label>`).replace("    return element;",`    const input = element.querySelector<HTMLInputElement>('[data-original]')!;
    input.addEventListener('change', () => void selectOriginal(mounted.store, item.id, input));
    return element;`).replace("  renderMetadata: item =>",`  renderStatus: item => item.status,
  renderMetadata: item =>`).replace("    element.textContent = item.progress",`    const row = element.closest('[data-upload-id]')!;
    (row.querySelector('[data-original-label]') as HTMLElement).hidden = item.status !== 'awaiting-file';
    element.textContent = item.progress`):e}function m(e){const t=p("Vanilla",e),o=t.match(/\/\* Markup\n([\s\S]*?)\n\*\//);if(!o)throw new Error("The Vanilla recipe must include its HTML");const a=t.replace(o[0],"").replace("document.querySelector('#uploader')","document.querySelector<HTMLElement>('#uploader')!");return`---
import { FileUploader } from '@salyra-ui/file-uploader/astro';
---
<!-- Custom callbacks/persistence use a client mount. This section owns that store. -->
${o[1].replace('<div data-upload-dropzone class="upload-zone">','<FileUploader.Dropzone class="upload-zone">').replace('<input type="file" multiple data-upload-input aria-label="Select files" />','<FileUploader.Input multiple aria-label="Select files" />').replace('<button type="button" data-upload-trigger>Select files</button>',"<FileUploader.Trigger>Select files</FileUploader.Trigger>").replace("  </div>","  </FileUploader.Dropzone>").replace('<button type="button" data-upload-start>Upload</button>','<FileUploader.Action action="start">Upload</FileUploader.Action>').replace("<ul data-upload-list></ul>","<FileUploader.List />")}
<script>
${a}
// Clean up on an Astro navigation before mounting the next page.
document.addEventListener('astro:before-swap', () => mounted.destroy(), { once: true });
<\/script>`}function f(e,t){return t==="React"?e.replace("import { FileUploader }","import { FileUploader, useUploaderStore }").replace("<FileUploader.Root options={options}>",`<FileUploader.Root options={options}>
      <SelectionControls />`)+`

function SelectionControls() {
  const store = useUploaderStore();
  return <fieldset>
    <legend>Interaction</legend>
    <label><input type="checkbox" onChange={event => store.setOptions({ disabled: event.currentTarget.checked })} /> Disabled</label>
    <label><input type="checkbox" onChange={event => store.setOptions({ readOnly: event.currentTarget.checked })} /> Read-only</label>
  </fieldset>;
}`:t==="Vue"?e.replace("import { FileUploader }",`import { onUnmounted } from 'vue';
import { FileUploader }`).replace("<\/script>",`const store = createUploader(options);
onUnmounted(() => store.destroy());
<\/script>`).replace('<FileUploader.Root :options="options">',`<FileUploader.Root :store="store">
    <label><input type="checkbox" @change="setDisabled(store, ($event.currentTarget as HTMLInputElement).checked)" /> Disabled</label>
    <label><input type="checkbox" @change="setReadOnly(store, ($event.currentTarget as HTMLInputElement).checked)" /> Read-only</label>`):t==="Svelte"?e.replace("import { FileUploader }",`import { onDestroy } from 'svelte';
import { FileUploader }`).replace("<\/script>",`const store = createUploader(options);
onDestroy(() => store.destroy());
<\/script>`).replace("<FileUploader.Root {options}>",`<FileUploader.Root {store}>
  <label><input type="checkbox" onchange={event => setDisabled(store, event.currentTarget.checked)} /> Disabled</label>
  <label><input type="checkbox" onchange={event => setReadOnly(store, event.currentTarget.checked)} /> Read-only</label>`):t==="Angular"?e.replace('<section [uploadRoot]="options">',`<section [uploadRoot]="store">
      <label><input type="checkbox" #disabledOption (change)="store.setOptions({ disabled: disabledOption.checked })" /> Disabled</label>
      <label><input type="checkbox" #readOnlyOption (change)="store.setOptions({ readOnly: readOnlyOption.checked })" /> Read-only</label>`).replace("readonly options = options;",`readonly store = createUploader(options);
  ngOnDestroy() { this.store.destroy(); }`):t==="Vanilla"?e.replace('<section id="uploader">',`<section id="uploader">
  <label><input type="checkbox" data-disabled /> Disabled</label>
  <label><input type="checkbox" data-readonly /> Read-only</label>`).replace("// TypeScript module.",`for (const [selector, key] of [['[data-disabled]', 'disabled'], ['[data-readonly]', 'readOnly']] as const) {
  document.querySelector<HTMLInputElement>(selector)!.addEventListener('change', event => {
    mounted.store.setOptions({ [key]: (event.currentTarget as HTMLInputElement).checked });
  });
}
// TypeScript module.`):e}const U=`  loadHistory: async (cursor: string | undefined, signal: AbortSignal) => {
    const response = await fetch('/api/files' + (cursor ? '?cursor=' + encodeURIComponent(cursor) : ''), { signal });
    if (!response.ok) throw new Error('Could not load uploaded files');
    return response.json(); // { items: ExistingUpload[], nextCursor?: string }
  },
  onRemove: async (item: UploadItem) => {
    const result = item.result as { id: string };
    const response = await fetch('/api/files/' + encodeURIComponent(result.id), { method: 'DELETE' });
    if (!response.ok) throw new Error('Could not remove the file');
  },
`;function y(e,t){return t==="React"?e.replace("import { FileUploader }",`import { useState } from 'react';
import { FileUploader, useUploaderStore }`).replace("<FileUploader.Root options={options}>",`<FileUploader.Root options={options}>
      <HistoryControls />`)+`

function HistoryControls() {
  const store = useUploaderStore();
  const [cursor, setCursor] = useState<string>();
  const [error, setError] = useState('');
  async function load(next?: string) {
    try { setCursor(await store.loadHistory(next)); setError(''); }
    catch (value) { setError(value instanceof Error ? value.message : 'Could not load files'); }
  }
  return <div>
    <button type="button" onClick={() => void load()}>Load uploaded files</button>
    <button type="button" disabled={!cursor} onClick={() => void load(cursor)}>Load more</button>
    <p role="status">{error}</p>
  </div>;
}`:t==="Vue"?e.replace("import { FileUploader }",`import { ref, onUnmounted } from 'vue';
import { FileUploader }`).replace("<\/script>",`const store = createUploader(options);
const cursor = ref<string>(); const historyError = ref('');
async function load(next?: string) {
  try { cursor.value = await store.loadHistory(next); historyError.value = ''; }
  catch (value) { historyError.value = value instanceof Error ? value.message : 'Could not load files'; }
}
onUnmounted(() => store.destroy());
<\/script>`).replace('<FileUploader.Root :options="options">',`<FileUploader.Root :store="store">
    <button type="button" @click="load()">Load uploaded files</button>
    <button type="button" :disabled="!cursor" @click="load(cursor)">Load more</button>
    <p role="status">{{ historyError }}</p>`):t==="Svelte"?e.replace("import { FileUploader }",`import { onDestroy } from 'svelte';
import { FileUploader }`).replace("<\/script>",`const store = createUploader(options);
let cursor = $state<string>(); let historyError = $state('');
async function load(next?: string) {
  try { cursor = await store.loadHistory(next); historyError = ''; }
  catch (value) { historyError = value instanceof Error ? value.message : 'Could not load files'; }
}
onDestroy(() => store.destroy());
<\/script>`).replace("<FileUploader.Root {options}>",`<FileUploader.Root {store}>
  <button type="button" onclick={() => load()}>Load uploaded files</button>
  <button type="button" disabled={!cursor} onclick={() => load(cursor)}>Load more</button>
  <p role="status">{historyError}</p>`):t==="Angular"?e.replace("import { Component }","import { Component, signal }").replace('<section [uploadRoot]="options">',`<section [uploadRoot]="store">
      <button type="button" (click)="load()">Load uploaded files</button>
      <button type="button" [disabled]="!cursor()" (click)="load(cursor())">Load more</button>
      <p role="status">{{ historyError() }}</p>`).replace("readonly options = options;",`readonly store = createUploader(options);
  readonly cursor = signal<string | undefined>(undefined);
  readonly historyError = signal('');
  async load(next?: string) {
    try { this.cursor.set(await this.store.loadHistory(next)); this.historyError.set(''); }
    catch (value) { this.historyError.set(value instanceof Error ? value.message : 'Could not load files'); }
  }
  ngOnDestroy() { this.store.destroy(); }`):t==="Vanilla"?e.replace('<section id="uploader">',`<section id="uploader">
  <button type="button" data-load-history>Load uploaded files</button>
  <button type="button" data-load-more disabled>Load more</button>
  <p role="status" data-history-error></p>`).replace("// TypeScript module.",`let cursor: string | undefined;
const next = document.querySelector<HTMLButtonElement>('[data-load-more]')!;
const error = document.querySelector<HTMLElement>('[data-history-error]')!;
async function load(after?: string) {
  try { cursor = await mounted.store.loadHistory(after); next.disabled = !cursor; error.textContent = ''; }
  catch (value) { error.textContent = value instanceof Error ? value.message : 'Could not load files'; }
}
document.querySelector('[data-load-history]')!.addEventListener('click', () => void load());
next.addEventListener('click', () => void load(cursor));
// TypeScript module.`):e}export{b as l,p as s};
