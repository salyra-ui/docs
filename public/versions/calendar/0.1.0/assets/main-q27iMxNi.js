import{s as qt,a as Ht}from"./shell-BGzUNdzN.js";import{I as Nt,J as $e,E as ze,a as le,R as D,M as ct,b as dt,V as Je,p as Y,u as Ce,F as pt,m as mt,D as ut,y as Le,c as It,O as ht,j as Ke,d as Be,e as Ft,W as Ee,f as Dt,P as Bt,r as Vt,g as Ot,h as jt,A as Ut,i as Wt,k as Gt,l as Pe,H as zt,S as Jt}from"./index.min-BaiKnW3A.js";function Kt(e,t,o,a,n){const i=["docs.html","color.html","generator.html","site.html","index.html"].includes(o)?o:"docs.html";return`${e}versions/${t}/${i}${a}${n}`}async function Xt(){const e=document.querySelector(".docs-sidebar");if(!e||e.querySelector("[data-version-selector]"))return;const t=document.body.dataset.siteRoot,o=document.body.dataset.docsVersion;if(!t||!o)return;const a=await fetch(t+"docs-versions.json",{cache:"no-cache"});if(!a.ok)throw Error("Could not load documentation versions");const n=await a.json(),i=n.versions.find(d=>d.version===o),s=document.createElement("div");s.className="docs-version-picker",s.dataset.versionSelector="";const l=document.createElement("label");l.textContent="Documentation version";const h=document.createElement("select");h.setAttribute("aria-label","Documentation version");const p=n.versions.find(d=>d.status==="released")?.version;for(const d of n.versions){const b=document.createElement("option");b.value=d.version,b.textContent=`v${d.version}${d.status==="preview"?" · Preview":d.version===p?" · Latest":""}`,b.selected=d.version===o,h.append(b)}l.append(h),s.append(l);const c=document.createElement("a"),m=(new URLSearchParams(location.search).get("kit")??document.body.dataset.component)==="theme-studio"?"theme-studio":"color-picker";c.href=`${t}changelog.html?kit=${m}#v${o}`,c.textContent="Changelog",s.append(c),e.prepend(s);const u=document.querySelector("#overview > .api-note");u&&(u.textContent=i?.status==="preview"?`v${o} preview`:`v${o}`,u.dataset.releaseStatus=i?.status??"released"),h.addEventListener("change",()=>{const d=new URLSearchParams(location.search);d.set("kit",m),location.assign(Kt(t,h.value,"docs.html","?"+d.toString(),location.hash))})}const Qe=()=>{Xt().catch(e=>{const t=document.querySelector(".docs-sidebar");if(!t||t.querySelector("[data-version-error]"))return;const o=document.createElement("p");o.dataset.versionError="",o.textContent="Version selection could not load. Refresh to try again.",t.prepend(o)})};document.readyState==="complete"?Qe():window.addEventListener("DOMContentLoaded",Qe,{once:!0});const Yt="1.0.1",_t=[{version:"1.0.1",status:"released",changes:{"color-picker":{Added:["Sample screen colors with a pipette button in React, Svelte, Vue, Angular, Astro and Vanilla.","Give the sample button your own text, icon and classes. Keep the current opacity or sample an opaque color."],Changed:["Background and customization popups in the examples now use Salyra Color Picker.","Screen sampling has its own working example and customization example.","React working examples now use ColorPicker.Root and the other compound controls.","Choose documentation by version and read the changes in a separate changelog."]},"theme-studio":{Added:["Use the pipette inside PickerRoot to sample a color for the selected theme role."],Changed:["Generation seed and supporting color popups now use Salyra Color Picker.","Theme Studio uses Color Picker 1.0.1.","Choose documentation by version and read the changes in a separate changelog."]}},date:"2026-10-03",sources:{"color-picker":"0dadaf452daec4dcf0af63576a75e02076de5fbf","theme-studio":"57ab53084d0cf1d7420c32803a20d470569e96e1"}},{version:"1.0.0",status:"released",date:"2026-10-03",sources:{"color-picker":"8e1cb497d063e74335ca564f4bf7aed360c25e01","theme-studio":"1ec2c54ab4102a0952b9c9037227c6fdaa21a3f9"},changes:{"color-picker":{Added:["Build an editor from context roots, native inputs, sliders, surfaces and custom markers."],Changed:["Your markup owns the layout, labels, thumb content and classes.","Input controls share draft handling and validation across adapters."],Fixed:["Clicking a wheel marker in the documentation keeps the preview open."]},"theme-studio":{Added:["Separate theme state and styling with ThemeRoot and ThemeScope. ThemeProvider combines both.","Keep a nested draft preview separate from the application's applied theme."],Changed:["Theme editors compose the same color controls as Color Picker.","Geometry controls register the radius and border width fields they render."]}}},{version:"0.3.0",status:"released",sources:{"color-picker":"6eedff962fec68f8699f0d465aa4fbeb4f0428fb","theme-studio":"e188653c8acbdbe455f56ae6b04219bc6c0d3b17"},changes:{"color-picker":{Added:["Undo and redo color edits, including opacity.","Submit colors through native forms and restore them on reset.","Save recent and favorite colors with optional browser storage.","Check text contrast against a background."],Fixed:["Channel input precision matches each input's step value."]},"theme-studio":{Added:["Edit a draft with Apply, Cancel, undo and redo.","Lock colors and backgrounds during generation.","Detect changes to the applied theme while a draft is being edited.","Export selected colors, radius and border widths for Tailwind 4.","Save recent and favorite themes. Migrate older saved theme data."],Fixed:["Providers preserve a store's disabled persistence setting."]}},date:"2026-10-01"}],ve={current:Yt,versions:_t},Zt='<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"><path d="m15 5 4 4M14 6 4 16v4h4L18 10m-4-4 3-3a2.8 2.8 0 0 1 4 4l-3 3" /></svg>',pe=`.screen-picker { display: grid; gap: 16px; max-width: 360px; }
.screen-picker label { display: grid; gap: 8px; }
.screen-picker p { margin: 0; font-size: 13px; line-height: 1.6; }
.screen-picker input { width: 100%; box-sizing: border-box; accent-color: #e4002b; }
.screen-picker input:not([type="range"]) { padding: 10px 12px; border: 1px solid #d8d8df; border-radius: 4px; }
.screen-picker button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px; border: 1px solid #d8d8df; background: white; color: #171717; font: inherit; cursor: pointer; }
.screen-picker button:disabled { opacity: .45; cursor: default; }
.screen-picker .pixel-button { border-color: #e4002b; background: #e4002b; color: white; border-radius: 24px; }
.screen-picker [role="status"]:empty { display: none; }
.screen-picker [role="alert"]:empty { display: none; }
.screen-picker .sampling-help { margin: 0; font-size: 12px; line-height: 1.6; color: #666; }`,gt="Choose a pixel from your screen. Press Escape to cancel.",bt="<details><summary>Browser support</summary><p>Screen sampling works in desktop Chrome and Edge. Open this page over HTTPS or localhost.</p></details>",ft=e=>e?`${Zt}<span>Sample a pixel</span>`:"Pick from screen";function vt(e){return`<cp-provider class="screen-picker" value="#5268E080">
  <cp-input format="hex"></cp-input>
  <cp-slider channel="alpha"><label>Opacity<input type="range" min="0" max="100" /></label></cp-slider>
  <button type="button" data-screen-sample class="${e?"pixel-button":""}">${ft(e)}</button>
  <p data-screen-status role="status" aria-live="polite"></p>
  <p data-screen-error role="alert"></p>
  <p class="sampling-help">${gt}</p>
  ${bt}
</cp-provider>`}function Qt(e,t,o){const a=e.querySelector("[data-screen-status]"),n=e.querySelector("[data-screen-error]");return Nt(e.querySelector("[data-screen-sample]"),t,{preserveAlpha:!o,onStateChange(s){a.textContent=s.supported?s.pending?"Choose a pixel. Press Escape to cancel.":"":"Your browser does not support screen sampling.",n.textContent=s.error?.message??""},onPick(s){a.textContent=`Sampled ${s}.`}}).destroy}function eo(e,t){const o="@salyra-ui/color-picker/"+e.toLowerCase(),a=!t,n=t?"pixel-button":"",i=ft(t),s=e==="Svelte"?pe.replace(/^\.screen-picker (.+?) \{/gm,".screen-picker :global($1) {"):pe,l=`<p class="sampling-help">${gt}</p>${bt}`;return e==="React"?`import { useState } from 'react';
import { ColorPicker as Color, createColorStore } from '${o}';
export function ScreenPicker() {
  const [store] = useState(() => createColorStore('#5268E080'));
  const [error, setError] = useState('');
  return <Color.Root store={store}>
    <section className="screen-picker">
      <label>Color<Color.Input format="hex" /></label>
      <label>Opacity<Color.Slider channel="alpha" /></label>
      <Color.EyeDropper className="${n}" preserveAlpha={${a}}
        onPick={() => setError('')} onPickError={error => setError(error.message)}>
        ${i}
      </Color.EyeDropper>
      <p role="alert">{error}</p>
      ${l.replace("class=","className=")}
    </section>
  </Color.Root>;
}
/* Add to your stylesheet: */
${pe}`:e==="Svelte"?`<script lang="ts">
  import { ColorRoot, ColorField, ColorRange, ColorEyeDropper, createColorStore } from '${o}';
  const store = createColorStore('#5268E080');
  let error = $state('');
<\/script>
<ColorRoot {store}>
  <section class="screen-picker">
    <label>Color<ColorField format="hex" /></label>
    <label>Opacity<ColorRange channel="alpha" /></label>
    <ColorEyeDropper class="${n}" preserveAlpha={${a}}
      onPick={() => error = ''} onPickError={cause => error = cause.message}>
      ${i}
    </ColorEyeDropper>
    <p role="alert">{error}</p>
    ${l}
  </section>
</ColorRoot>
<style>
${s}
</style>`:e==="Vue"?`<script setup lang="ts">
import { ref } from 'vue';
import { ColorRoot, ColorField, ColorRange, ColorEyeDropper, createColorStore } from '${o}';
const store = createColorStore('#5268E080');
const error = ref('');
<\/script>
<template>
  <ColorRoot :store="store">
    <section class="screen-picker">
      <label>Color<ColorField format="hex" /></label>
      <label>Opacity<ColorRange channel="alpha" /></label>
      <ColorEyeDropper class="${n}" :preserve-alpha="${a}"
        @pick="error = ''" @pick-error="cause => error = cause.message">
        ${i}
      </ColorEyeDropper>
      <p role="alert">{{ error }}</p>
      ${l}
    </section>
  </ColorRoot>
</template>
<style>
${pe}
</style>`:e==="Angular"?`import { Component, signal } from '@angular/core';
import { ColorRoot, ColorField, ColorRange, ColorEyeDropper, createColorStore } from '${o}';
@Component({
  selector: 'app-screen-picker', standalone: true,
  imports: [ColorRoot, ColorField, ColorRange, ColorEyeDropper],
  template: \`<section cpRoot [store]="store" class="screen-picker">
    <label>Color<input cpInput format="hex" /></label>
    <label>Opacity<input cpSlider="alpha" /></label>
    <button cpEyeDropper class="${n}" [preserveAlpha]="${a}"
      (colorPick)="error.set('')" (colorPickError)="error.set($event.message)">
      ${i}
    </button>
    <p role="alert">{{ error() }}</p>
    ${l}
  </section>\`,
})
export class ScreenPicker {
  readonly store = createColorStore('#5268E080');
  readonly error = signal('');
}
/* Add to your stylesheet: */
${pe}`:e==="Astro"?`---
import ColorRoot from '${o}/ColorRoot.astro';
import ColorField from '${o}/ColorField.astro';
import ColorRange from '${o}/ColorRange.astro';
import ColorEyeDropper from '${o}/ColorEyeDropper.astro';
const value = '#5268E080';
---
<ColorRoot {value} class="screen-picker">
  <label>Color<ColorField {value} format="hex" /></label>
  <label>Opacity<ColorRange {value} channel="alpha" /></label>
  <ColorEyeDropper class="${n}" preserveAlpha={${a}}>
    ${i}
  </ColorEyeDropper>
  <p data-screen-error role="alert"></p>
  ${l}
</ColorRoot>
<script>
  document.querySelectorAll<HTMLElement>('.screen-picker').forEach(root => {
    const error = root.querySelector<HTMLElement>('[data-screen-error]')!;
    root.addEventListener('color-pick-error', event => {
      error.textContent = (event as CustomEvent<Error>).detail.message;
    });
    root.addEventListener('color-pick', () => error.textContent = '');
  });
<\/script>
<style is:global>
${pe}
</style>`:`<script src="/assets/color-picker.min.js"><\/script>
${vt(t)}
<script>
const root = document.querySelector('.screen-picker');
const store = ColorPicker.createColorStore('#5268E080');
root.setStore(store);
const status = root.querySelector('[data-screen-status]');
const error = root.querySelector('[data-screen-error]');
const binding = ColorPicker.bindColorEyeDropper(root.querySelector('[data-screen-sample]'), store, {
  preserveAlpha: ${a},
  onStateChange(state) {
    status.textContent = !state.supported ? 'Your browser does not support screen sampling.'
      : state.pending ? 'Choose a pixel. Press Escape to cancel.' : '';
    error.textContent = state.error?.message ?? '';
  },
  onPick(hex) { status.textContent = 'Sampled ' + hex + '.'; },
});
window.addEventListener('pagehide', binding.destroy, {once: true});
<\/script>
<style>
${pe}
</style>`}let to=0;function Xe(e,t){const o=$e(t.value),a=`supporting-color-${++to}`,n=document.createElement("button");n.type="button",n.className="supporting-color-trigger",n.setAttribute("aria-label",`Choose ${t.label.toLowerCase()}`),n.setAttribute("aria-haspopup","dialog"),n.setAttribute("aria-controls",a);const i=document.createElement("span"),s=document.createElement("code");i.className="supporting-color-swatch",i.setAttribute("aria-hidden","true"),n.append(i,s);const l=document.createElement("dialog");l.id=a,l.className="supporting-color-dialog",l.setAttribute("aria-label",`${t.label} color picker`);const h=document.createElement("header"),p=document.createElement("h3"),c=document.createElement("button");p.textContent=t.label,c.type="button",c.textContent="Close",c.setAttribute("aria-label","Close color picker"),h.append(p,c);const m=document.createElement("div");l.append(h,m),e.append(n,l);const u=ze(m,{store:o});t.alpha||(u.element.querySelector('cp-slider[channel="alpha"]')?.remove(),u.element.querySelector("cp-alpha-input")?.remove());const d=()=>{const v=o.getSnapshot();i.style.background=v.value,s.textContent=v.value,n.dataset.color=v.value};d();const b=o.subscribe(()=>{d(),t.onChange(o.getSnapshot().value)}),f=()=>{l.showModal(),n.setAttribute("aria-expanded","true")},T=()=>l.close(),I=()=>{n.setAttribute("aria-expanded","false"),n.focus()},k=v=>{const A=l.getBoundingClientRect();v.target===l&&(v.clientX<A.left||v.clientX>A.right||v.clientY<A.top||v.clientY>A.bottom)&&T()};return n.setAttribute("aria-expanded","false"),n.addEventListener("click",f),c.addEventListener("click",T),l.addEventListener("close",I),l.addEventListener("click",k),{store:o,element:n,destroy(){b(),n.removeEventListener("click",f),c.removeEventListener("click",T),l.removeEventListener("close",I),l.removeEventListener("click",k),l.open&&l.close(),u.destroy(),l.remove(),n.remove()}}}function oo(e){e.innerHTML='<div class="editing-lab"><div><h3>Draft theme</h3><div data-editor></div><div class="lab-options"><label>Recent themes<select data-theme-list="recent"></select></label><label>Favorite themes<select data-theme-list="favorites"></select></label><label><input type="checkbox" data-lock>Lock accent during generation</label><label><input type="checkbox" data-live>Apply changes live</label></div><div class="recipe-actions"><button type="button" data-undo>Undo</button><button type="button" data-redo>Redo</button><button type="button" data-apply>Apply</button><button type="button" data-cancel>Cancel</button><button type="button" data-favorite>Favorite applied theme</button></div><p data-status role="status"></p></div><div class="lab-applied"><h3>Applied theme</h3><article data-applied class="recipe-preview"><h4>Project settings</h4><p>Changes appear here after Apply.</p><button type="button">Save changes</button></article><p data-contrast></p><details class="configuration"><summary>Tailwind CSS</summary><pre data-output class="recipe-output" tabindex="0"></pre><button type="button" data-copy>Copy Tailwind CSS</button><p data-copy-status aria-live="polite"></p></details></div></div>';const t=le({theme:D("#5268E0"),mode:"light",modeStorage:!1}),o=ct(t),a=dt({storage:ht("docs:themes"),favorites:[t.getSnapshot().theme]});a.load();const n=Je(e.querySelector("[data-editor]"),{store:o.store,modeStorage:!1});n.element.querySelector("details")?.remove();const i=p=>e.querySelector("[data-"+p+"]"),s=()=>{const p=o.getSnapshot(),c=o.history.getSnapshot(),m=o.store.getSnapshot();i("undo").disabled=!c.canUndo,i("redo").disabled=!c.canRedo,i("apply").disabled=!p.dirty||p.conflict,i("cancel").disabled=!p.dirty&&!p.conflict;for(const b of e.querySelectorAll("[data-theme-list]")){const f=a.getSnapshot()[b.dataset.themeList];b.replaceChildren(new Option("Choose a theme",""));for(const T of f)b.add(new Option(T.name,T.id));b.disabled=!f.length}e.querySelector("[data-status]").textContent=p.conflict?"The applied theme changed. Cancel to load it.":p.dirty?"Unapplied changes":"Up to date",e.querySelector("[data-applied]").style.cssText=Y(t.getSnapshot()).css;const u=m.theme.structure.userPreset.primary,d=Ke(Ft(u.foreground),Be(m.theme,"primary"));e.querySelector("[data-contrast]").textContent=`Primary text contrast: ${d.ratio.toFixed(2)}:1 · ${d.aa?"AA passes":"AA fails"}`,e.querySelector("[data-output]").textContent=Y(m).tailwind};i("undo").onclick=o.history.undo,i("redo").onclick=o.history.redo,i("apply").onclick=()=>{o.apply(),a.remember(t.getSnapshot().theme)},i("favorite").onclick=()=>a.toggleFavorite(t.getSnapshot().theme);for(const p of e.querySelectorAll("[data-theme-list]"))p.onchange=()=>{const c=a.getSnapshot()[p.dataset.themeList].find(m=>m.id===p.value);c&&o.store.setTheme(c)};i("cancel").onclick=o.cancel,e.querySelector("[data-lock]").onchange=p=>o.setLocked("accent",p.currentTarget.checked),e.querySelector("[data-live]").onchange=p=>o.setLive(p.currentTarget.checked),i("copy").onclick=async()=>{try{await navigator.clipboard.writeText(Y(o.store.getSnapshot()).tailwind),e.querySelector("[data-copy-status]").textContent="Tailwind CSS copied."}catch{e.querySelector("[data-copy-status]").textContent="Select the CSS and copy it with your keyboard."}};const l=[t.subscribe(s),o.store.subscribe(s),o.subscribe(s),o.history.subscribe(s),a.subscribe(s)],h=Ce(e,o.history);return s(),()=>{l.forEach(p=>p()),h(),n.destroy(),o.destroy(),e.replaceChildren()}}function ro(e){e.innerHTML='<form class="color-form-lab"><div data-picker></div><div data-favorites></div><div data-recent></div><div class="recipe-actions"><button type="button" data-save>Save color</button><button type="button" data-favorite>Toggle favorite</button><button type="button" data-undo>Undo</button><button type="button" data-redo>Redo</button><button type="reset">Reset</button><button type="submit">Submit</button></div><p data-contrast></p><p>Submit reads <code>brandColor</code> from FormData. Reset restores the starting color.</p><output data-output class="recipe-output" aria-live="polite"></output></form>';const t=e.querySelector("form"),o=$e("#5268E080"),a=pt(o),n=mt({storage:ut("docs:color-collection"),favorites:["#5268E0","#277D59","#C25D3D"]});n.load();const i=ze(e.querySelector("[data-picker]"),{store:o}),s=Le(e.querySelector("[data-favorites]"),o,n,{kind:"favorites"}),l=Le(e.querySelector("[data-recent]"),o,n),h=It(t,o,{name:"brandColor",required:!0}),p=Ce(t,a),c=d=>e.querySelector("[data-"+d+"]"),m=()=>{c("undo").disabled=!a.getSnapshot().canUndo,c("redo").disabled=!a.getSnapshot().canRedo;const d=Ke(o.getSnapshot().value,"#FFFFFF");e.querySelector("[data-contrast]").textContent=`Text on white: ${d.ratio.toFixed(2)}:1 · ${d.aa?"AA passes":"AA fails"}`};c("undo").onclick=a.undo,c("redo").onclick=a.redo,c("save").onclick=()=>n.remember(o.getSnapshot().value),c("favorite").onclick=()=>n.toggleFavorite(o.getSnapshot().value),t.onsubmit=d=>{d.preventDefault(),e.querySelector("[data-output]").textContent=JSON.stringify(Object.fromEntries(new FormData(t)),null,2)};const u=[o.subscribe(m),a.subscribe(m)];return m(),()=>{u.forEach(d=>d()),h.destroy(),p(),s.destroy(),l.destroy(),i.destroy(),a.destroy(),e.replaceChildren()}}const ao=`.recipe { display: grid; gap: 24px; max-width: 760px; }
.recipe .tk-scope { display: grid; gap: 16px; min-width: 0; }
.recipe-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.recipe-actions button { padding: 8px 14px; cursor: pointer; }
.recipe-actions button:disabled { cursor: default; opacity: .45; }
.recipe-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); padding: 24px; border-radius: var(--border-radius-card); border: var(--border-width-card) solid currentColor; }
.recipe-preview button { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 10px 16px; border: 0; }
.recipe-output { overflow: auto; max-height: 260px; white-space: pre-wrap; }
.recipe input, .recipe select { max-width: 100%; }
.recipe .cp-area { height: 180px; }
.recipe .cp-swatch { width: 28px; height: 28px; }
.recipe label:not([class]) { display: flex; gap: 8px; align-items: center; }`;function no(e){return e==="theme-studio"?`import { createThemeStore, createThemeEditor, generateTheme, themeConfiguration, themeColor, createThemeCollection, browserThemeCollectionStorage } from '@salyra-ui/theme-studio';
import { mountHistory, colorContrast, channelsToHex } from '@salyra-ui/color-picker';

export function createDemo() {
  const target = createThemeStore({ theme: generateTheme('#5268E0'), mode: 'light', modeStorage: false });
  const editor = createThemeEditor(target);
  const collection = createThemeCollection({storage:browserThemeCollectionStorage('example:themes'),favorites:[target.getSnapshot().theme]});
  const read = () => {
    const draft = editor.store.getSnapshot();
    const primary = draft.theme.structure.userPreset.primary;
    return { collection: collection.getSnapshot(), session: editor.getSnapshot(), history: editor.history.getSnapshot(),
      contrast: colorContrast(channelsToHex(primary.foreground), themeColor(draft.theme, 'primary')),
      tailwind: themeConfiguration(draft).tailwind };
  };
  let state = read();
  const listeners = new Set<() => void>();
  const update = () => { state = read(); listeners.forEach(fn => fn()); };
  const stops = [target.subscribe(update), editor.store.subscribe(update), editor.subscribe(update), editor.history.subscribe(update), collection.subscribe(update)];
  return {
    target, editor, collection,
    apply() { editor.apply(); collection.remember(target.getSnapshot().theme); },
    getSnapshot: () => state,
    subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; },
    mount(root: HTMLElement) { collection.load(); return mountHistory(root, editor.history); },
    destroy() { stops.forEach(stop => stop()); editor.destroy(); listeners.clear(); },
  };
}`:`import { createColorStore, createColorHistory, createColorCollection, browserColorStorage, bindColorForm, mountHistory, colorContrast } from '@salyra-ui/color-picker';

export function createDemo() {
  const store = createColorStore('#5268E080');
  const history = createColorHistory(store);
  const collection = createColorCollection({ storage: browserColorStorage('example:colors'), favorites: ['#5268E0','#277D59','#C25D3D'] });
  let submitted = '';
  const read = () => ({ color: store.getSnapshot(), history: history.getSnapshot(), collection: collection.getSnapshot(), contrast: colorContrast(store.getSnapshot().value, '#FFFFFF'), submitted });
  let state = read();
  const listeners = new Set<() => void>();
  const update = () => { state = read(); listeners.forEach(fn => fn()); };
  const stops = [store.subscribe(update), history.subscribe(update), collection.subscribe(update)];
  return {
    store, history, collection, getSnapshot: () => state,
    subscribe(fn: () => void) { listeners.add(fn); return () => { listeners.delete(fn); }; },
    submit(form: HTMLFormElement) { submitted = JSON.stringify(Object.fromEntries(new FormData(form)), null, 2); update(); },
    mount(form: HTMLFormElement) {
      collection.load();
      const field = bindColorForm(form, store, { name: 'brandColor', format: 'hex', required: true });
      const detach = mountHistory(form, history);
      return () => { field.destroy(); detach(); };
    },
    destroy() { stops.forEach(stop => stop()); history.destroy(); listeners.clear(); },
  };
}`}const so=`<ThemeProvider store={demo.editor.store} modeStorage={false}>
        <ThemePicker view="shared-wheel" /><ThemeName /><ThemeRadius target="card" /><ThemeBorderWidth target="card" />
        <ThemeHarmony /><ThemeBackground />
        <ThemeSelect themes={view.collection.recent} label="Recent themes" /><ThemeSelect themes={view.collection.favorites} label="Favorite themes" />
      </ThemeProvider>
      <label><input type="checkbox" checked={view.session.locked.includes('accent')} onChange={e => demo.editor.setLocked('accent', e.target.checked)} />Lock accent during generation</label>
      <label><input type="checkbox" checked={view.session.live} onChange={e => demo.editor.setLive(e.target.checked)} />Apply changes live</label>
      <div className="recipe-actions">
        <button type="button" disabled={!view.history.canUndo} onClick={demo.editor.history.undo}>Undo</button>
        <button type="button" disabled={!view.history.canRedo} onClick={demo.editor.history.redo}>Redo</button>
        <button type="button" disabled={!view.session.dirty || view.session.conflict} onClick={() => demo.apply()}>Apply</button>
        <button type="button" disabled={!view.session.dirty && !view.session.conflict} onClick={demo.editor.cancel}>Cancel</button>
        <button type="button" onClick={() => demo.collection.toggleFavorite(demo.target.getSnapshot().theme)}>Favorite applied theme</button>
      </div>
      <p role="status">{view.session.conflict ? 'The applied theme changed. Cancel to load it.' : view.session.dirty ? 'Unapplied changes' : 'Up to date'}</p>
      <p>Primary text contrast: {view.contrast.ratio.toFixed(2)}:1 · {view.contrast.aa ? 'AA passes' : 'AA fails'}</p>
      <ThemeProvider store={demo.target} modeStorage={false}><article className="recipe-preview"><h2>Applied theme</h2><button type="button">Example button</button></article></ThemeProvider>
      <details><summary>Tailwind CSS</summary><pre className="recipe-output">{view.tailwind}</pre></details>`,yt=`      <div className="recipe-actions"><button type="button" onClick={() => demo.collection.remember(view.color.value)}>Save color</button><button type="button" onClick={() => demo.collection.toggleFavorite(view.color.value)}>Toggle favorite</button><button type="button" disabled={!view.history.canUndo} onClick={demo.history.undo}>Undo</button><button type="button" disabled={!view.history.canRedo} onClick={demo.history.redo}>Redo</button><button type="reset">Reset</button><button type="submit">Submit</button></div>
      <p>Text on white: {view.contrast.ratio.toFixed(2)}:1 · {view.contrast.aa ? 'AA passes' : 'AA fails'}</p>
      <output className="recipe-output" aria-live="polite">{view.submitted}</output>`,io=`<ColorProvider store={demo.store}><ColorArea /><ColorSlider channel="h" /><ColorSlider channel="alpha" /><ColorInput /><ColorCollection collection={demo.collection} kind="favorites" label="Favorite colors" /><ColorCollection collection={demo.collection} /></ColorProvider>
${yt}`,lo=`<Color.Root store={demo.store}>
        <Color.Area className="cp-area"><Color.Thumb className="cp-thumb" /></Color.Area>
        <label className="cp-slider" data-channel="h">Hue<Color.Slider channel="h" /></label>
        <label className="cp-slider" data-channel="alpha">Opacity<Color.Slider channel="alpha" /></label>
        <label>Color<Color.Input /></label>
        <ColorCollection collection={demo.collection} kind="favorites" label="Favorite colors" />
        <ColorCollection collection={demo.collection} />
      </Color.Root>
${yt}`;function Ye(e,t){const o=e==="theme-studio",a=o?"ThemeProvider, ThemePicker, ThemeName, ThemeRadius, ThemeBorderWidth, ThemeHarmony, ThemeBackground, ThemeSelect":"ColorProvider, ColorArea, ColorSlider, ColorInput, ColorCollection",n=o?"div":"form",i=o?so:t==="React"?lo:io;if(t==="React")return`import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ${o?a:"ColorPicker as Color, ColorCollection"} } from '@salyra-ui/${e}/react';
import '@salyra-ui/${e}/styles.min.css';
import './recipe.css';
import { createDemo } from './controller';
export default function App() {
  const [demo] = useState(createDemo);
  const view = useSyncExternalStore(demo.subscribe, demo.getSnapshot, demo.getSnapshot);
  const root = useRef<${o?"HTMLDivElement":"HTMLFormElement"}>(null), lifecycle = useRef(0);
  useEffect(() => {
    const lease = ++lifecycle.current, detach = demo.mount(root.current!);
    return () => { detach(); queueMicrotask(() => { if (lifecycle.current === lease) demo.destroy(); }); };
  }, [demo]);
  return <${n} ref={root} className="recipe"${o?"":" onSubmit={e => { e.preventDefault(); demo.submit(e.currentTarget); }}"}>
      ${i}
    </${n}>;
}`;let s=i.replaceAll("className=","class=").replaceAll("modeStorage={false}","options={{ modeStorage: false }}");if(t==="Svelte")return s=s.replaceAll("onChange=","onchange=").replaceAll("onClick=","onclick=").replace("checked={view.session.locked.includes('accent')} onchange={e => demo.editor.setLocked('accent', e.target.checked)}","checked={view.session.locked.includes('accent')} onchange={e => demo.editor.setLocked('accent', e.currentTarget.checked)}").replace("checked={view.session.live} onchange={e => demo.editor.setLive(e.target.checked)}","checked={view.session.live} onchange={e => demo.editor.setLive(e.currentTarget.checked)}"),`<script lang="ts">
  import { onMount } from 'svelte';
  import { ${a} } from '@salyra-ui/${e}/svelte';
  import '@salyra-ui/${e}/styles.min.css';
  import './recipe.css';
  import { createDemo } from './controller';
  const demo = createDemo();
  let root: ${o?"HTMLDivElement":"HTMLFormElement"}, view = $state(demo.getSnapshot());
  onMount(() => { const stop = demo.subscribe(() => view = demo.getSnapshot()), detach = demo.mount(root); return () => { stop(); detach(); demo.destroy(); }; });
<\/script>
<${n} bind:this={root} class="recipe"${o?"":" onsubmit={e => { e.preventDefault(); demo.submit(e.currentTarget); }}"}>
${s}
</${n}>`;if(t==="Vue")return s=s.replaceAll("store={demo.editor.store}",':store="demo.editor.store"').replaceAll("store={demo.target}",':store="demo.target"').replaceAll("store={demo.store}",':store="demo.store"').replaceAll("options={{ modeStorage: false }}",':options="{ modeStorage: false }"').replaceAll("collection={demo.collection}",':collection="demo.collection"'),s=s.replace(/themes=\{([^}]+)\}/g,':themes="$1"'),s=s.replace(/disabled=\{([^}]+)\}/g,':disabled="$1"').replace(/checked=\{([^}]+)\}/g,':checked="$1"'),s=s.replace(/onClick=\{([^}]+)\}/g,(c,m)=>`@click="${m.replace(/^\(\) => /,"")}"`).replace(/onChange=\{e => ([^}]+)\}/g,(c,m)=>`@change="${m.replaceAll("e.target.checked","($event.target as HTMLInputElement).checked")}"`).replace(/\{(view\.[^}\n]+)\}/g,"{{ $1 }}"),`<script setup lang="ts">
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue';
import { ${a} } from '@salyra-ui/${e}/vue';
import '@salyra-ui/${e}/styles.min.css';
import './recipe.css';
import { createDemo } from './controller';
const demo = createDemo(), view = shallowRef(demo.getSnapshot()), root = ref<${o?"HTMLDivElement":"HTMLFormElement"}>();
const stop = demo.subscribe(() => view.value = demo.getSnapshot());
let detach: (() => void) | undefined;
onMounted(() => { detach = demo.mount(root.value!); });
onBeforeUnmount(() => { stop(); detach?.(); demo.destroy(); });
<\/script>
<template><${n} ref="root" class="recipe"${o?"":' @submit.prevent="demo.submit(root!)"'}>
${s}
</${n}></template>`;if(t==="Angular"){s=s.replaceAll("options={{ modeStorage: false }}",'[options]="{ modeStorage: false }"').replace(/store=\{([^}]+)\}/g,'[store]="$1"').replace(/themes=\{([^}]+)\}/g,'[themes]="$1"').replace(/collection=\{([^}]+)\}/g,'[collection]="$1"'),s=s.replace(/disabled=\{([^}]+)\}/g,'[disabled]="$1"').replace(/checked=\{([^}]+)\}/g,'[checked]="$1"'),s=s.replace(/onClick=\{([^}]+)\}/g,(c,m)=>`(click)="${m.startsWith("() => ")?m.slice(6):m+"()"}"`).replace(/onChange=\{e => ([^}]+)\}/g,(c,m)=>`(change)="${m.replaceAll("e.target.checked","checked($event)")}"`).replace(/\{(view\.[^}\n]+)\}/g,"{{ $1 }}").replace(/view\./g,"view().");for(const c of a.split(", "))s=s.replaceAll(`<${c}`,`<${c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase().replace("theme-","tk-").replace("color-","cp-")}`).replaceAll(`</${c}>`,`</${c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase().replace("theme-","tk-").replace("color-","cp-")}>`);return`import { Component, ElementRef, afterNextRender, DestroyRef, inject, signal } from '@angular/core';
import { ${a} } from '@salyra-ui/${e}/angular';
import { createDemo } from './controller';
@Component({ selector: 'app-root', standalone: true, imports: [${a}], template: \`<${n} #root class="recipe"${o?"":' (submit)="$event.preventDefault(); demo.submit(root)"'}>${s}</${n}>\` })
export class App {
  readonly demo = createDemo(); readonly view = signal(this.demo.getSnapshot());
  readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  checked(event: Event) { return (event.target as HTMLInputElement).checked; }
  constructor() { const stop = this.demo.subscribe(() => this.view.set(this.demo.getSnapshot())); let detach: (() => void) | undefined;
    afterNextRender(() => { detach = this.demo.mount(this.element.nativeElement.querySelector<${o?"HTMLDivElement":"HTMLFormElement"}>('.recipe')!); });
    inject(DestroyRef).onDestroy(() => { stop(); detach?.(); this.demo.destroy(); });
  }
}`}const l=o?"div":"form",h=o?'<h2>Draft theme</h2><div data-editor></div><label>Recent themes<select data-theme-list="recent"></select></label><label>Favorite themes<select data-theme-list="favorites"></select></label><button type="button" data-favorite>Favorite applied theme</button><label><input type="checkbox" data-lock>Lock accent during generation</label><label><input type="checkbox" data-live>Apply changes live</label><div class="recipe-actions"><button type="button" data-undo>Undo</button><button type="button" data-redo>Redo</button><button type="button" data-apply>Apply</button><button type="button" data-cancel>Cancel</button></div><p data-status role="status"></p><div data-applied class="recipe-preview"><h2>Applied theme</h2><button type="button">Example button</button></div><details><summary>Tailwind CSS</summary><pre data-output class="recipe-output"></pre></details>':'<div data-picker></div><div data-favorites></div><div data-recent></div><div class="recipe-actions"><button type="button" data-save>Save color</button><button type="button" data-favorite>Toggle favorite</button><button type="button" data-undo>Undo</button><button type="button" data-redo>Redo</button><button type="reset">Reset</button><button type="submit">Submit</button></div><output data-output class="recipe-output" aria-live="polite"></output>',p=co(e);if(t==="Astro"){const c=o?`import { generateTheme, createThemeStore, themeConfiguration } from '@salyra-ui/theme-studio';
${["ThemeProvider","ThemePicker","ThemeName","ThemeRadius","ThemeBorderWidth","ThemeHarmony","ThemeBackground"].map(d=>`import ${d} from '@salyra-ui/theme-studio/astro/${d}.astro';`).join(`
`)}
const theme = generateTheme('#5268E0');
const appliedCss = themeConfiguration(createThemeStore({ theme, mode: 'light', modeStorage: false }).getSnapshot()).css;`:`import { createColorStore } from '@salyra-ui/color-picker';
${["ColorProvider","ColorArea","ColorSlider","ColorInput"].map(d=>`import ${d} from '@salyra-ui/color-picker/astro/${d}.astro';`).join(`
`)}
const color = createColorStore('#5268E080').getSnapshot();`,m=o?h.replace("<div data-editor></div>",'<div data-editor><ThemeProvider {theme} mode="light" modeStorage={false}><ThemePicker {theme} /><ThemeName {theme} /><ThemeRadius {theme} target="card" /><ThemeBorderWidth {theme} target="card" /><ThemeHarmony /><ThemeBackground {theme} /></ThemeProvider></div>').replace('<div data-applied class="recipe-preview">','<div data-applied class="recipe-preview" style={appliedCss}>'):h.replace("<div data-picker></div>",'<div data-picker><ColorProvider value="#5268E080"><ColorArea value="#5268E080" /><ColorSlider channel="h" value={color.h} /><ColorSlider channel="alpha" value={color.alpha * 100} /><ColorInput value="#5268E080" /></ColorProvider></div>'),u=p.replace(o?"const picker = mountThemeKit(root.querySelector<HTMLElement>('[data-editor]')!, { store: demo.editor.store, modeStorage: false });":"const picker = mountColorPicker(root.querySelector<HTMLElement>('[data-picker]')!, { store: demo.store });",o?"const provider = root.querySelector<ThemeRootElement>('[data-editor] tk-root')!; provider.setStore(demo.editor.store, {modeStorage:false}); const picker = {destroy: () => provider.remove()};":"const provider = root.querySelector<ColorProviderElement>('[data-picker] cp-provider')!; provider.setStore(demo.store); const picker = {destroy: () => provider.remove()};");return`---
${c}
import '@salyra-ui/${e}/styles.min.css';
import './recipe.css';
---
<${l} class="recipe" data-recipe="${e}">${m}<p data-contrast></p></${l}>
<script>
import type { ${o?"ThemeRootElement":"ColorProviderElement"} } from '@salyra-ui/${e}/astro/client';
${u}
<\/script>`}return`<${l} class="recipe" data-recipe="${e}">${h}<p data-contrast></p></${l}>
<script type="module">
${p}
<\/script>`}function co(e){const t=e==="theme-studio";return`import { ${t?"mountThemeKit, themeConfiguration":"mountColorPicker, mountColorCollection"} } from '@salyra-ui/${e}/vanilla';
import { createDemo } from './controller';
import '@salyra-ui/${e}/styles.min.css';
import './recipe.css';
for (const root of document.querySelectorAll<${t?"HTMLDivElement":"HTMLFormElement"}>('[data-recipe="${e}"]')) {
  const demo = createDemo();
  const button = (name: string) => root.querySelector<HTMLButtonElement>('[data-' + name + ']')!;
  const picker = ${t?"mountThemeKit(root.querySelector<HTMLElement>('[data-editor]')!, { store: demo.editor.store, modeStorage: false })":"mountColorPicker(root.querySelector<HTMLElement>('[data-picker]')!, { store: demo.store })"};
  ${t?`root.querySelector('[data-editor] details')?.remove();
  button('apply').onclick = demo.apply;
  button('favorite').onclick = () => demo.collection.toggleFavorite(demo.target.getSnapshot().theme);
  for(const list of root.querySelectorAll<HTMLSelectElement>('[data-theme-list]')) list.onchange = () => { const theme = demo.collection.getSnapshot()[list.dataset.themeList as 'recent' | 'favorites'].find(theme => theme.id === list.value); if(theme) demo.editor.store.setTheme(theme); };  button('cancel').onclick = demo.editor.cancel;
  root.querySelector<HTMLInputElement>('[data-lock]')!.onchange = e => demo.editor.setLocked('accent', (e.currentTarget as HTMLInputElement).checked);
  root.querySelector<HTMLInputElement>('[data-live]')!.onchange = e => demo.editor.setLive((e.currentTarget as HTMLInputElement).checked);`:`const favorites = mountColorCollection(root.querySelector<HTMLElement>('[data-favorites]')!, demo.store, demo.collection, { kind: 'favorites' });
  const recent = mountColorCollection(root.querySelector<HTMLElement>('[data-recent]')!, demo.store, demo.collection);
  button('save').onclick = () => demo.collection.remember(demo.store.getSnapshot().value);
  button('favorite').onclick = () => demo.collection.toggleFavorite(demo.store.getSnapshot().value);
  root.onsubmit = e => { e.preventDefault(); demo.submit(root); };`}
  button('undo').onclick = demo.${t?"editor.":""}history.undo; button('redo').onclick = demo.${t?"editor.":""}history.redo;
  const update = () => {
    const state = demo.getSnapshot();
    button('undo').disabled = !state.history.canUndo; button('redo').disabled = !state.history.canRedo;
    ${t?`root.querySelector('[data-editor] details')?.remove();
  button('apply').disabled = !state.session.dirty || state.session.conflict;
    button('cancel').disabled = !state.session.dirty && !state.session.conflict;
    for(const list of root.querySelectorAll<HTMLSelectElement>('[data-theme-list]')) {
      list.replaceChildren(new Option('Choose a theme',''));
      const themes = state.collection[list.dataset.themeList as 'recent' | 'favorites'];
      for(const theme of themes) list.add(new Option(theme.name,theme.id));
      list.disabled = !themes.length;
    }
    root.querySelector('[data-status]')!.textContent = state.session.conflict ? 'The applied theme changed. Cancel to load it.' : state.session.dirty ? 'Unapplied changes' : 'Up to date';
    root.querySelector<HTMLElement>('[data-applied]')!.style.cssText = themeConfiguration(demo.target.getSnapshot()).css;`:""}
    root.querySelector('[data-output]')!.textContent = state.${t?"tailwind":"submitted"};
    root.querySelector('[data-contrast]')!.textContent = 'Text contrast: ' + state.contrast.ratio.toFixed(2) + ':1 · ' + (state.contrast.aa ? 'AA passes' : 'AA fails');
  };
  const stop = demo.subscribe(update), detach = demo.mount(root); update();
  const destroy = () => { stop(); detach(); picker.destroy(); ${t?"":"favorites.destroy(); recent.destroy();"} demo.destroy(); };
  window.addEventListener('pagehide', destroy, { once: true });
  document.addEventListener('astro:before-swap', destroy, { once: true });
}`}function po(e,t){const o=Ye(e,t),i=[{name:{React:"App.tsx",Svelte:"App.svelte",Vue:"App.vue",Angular:"app.ts",Astro:"index.astro",Vanilla:"index.html"}[t],code:o},{name:"controller.ts",code:no(e)},{name:"recipe.css",code:ao}];if(t==="Vanilla"){const p=o.match(/<script type="module">([\s\S]+)<\/script>/)[1];i[0].code=o.replace(/<script type="module">[\s\S]+<\/script>/,'<script type="module" src="/main.ts"><\/script>'),i.push({name:"main.ts",code:p})}const s={"@salyra-ui/color-picker":"^1.0.0",...e==="theme-studio"?{"@salyra-ui/theme-studio":"^1.0.0"}:{}},l={typescript:"~5.8.3",vite:"^6.1.0"},h={dev:"vite",build:"vite build"};return t==="React"&&(Object.assign(s,{react:"^18.3.1","react-dom":"^18.3.1"}),Object.assign(l,{"@vitejs/plugin-react":"^4.3.0","@types/react":"^18.3.0","@types/react-dom":"^18.3.0"}),i.push({name:"main.tsx",code:`import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
createRoot(document.getElementById('app')!).render(<StrictMode><App /></StrictMode>);`},{name:"vite.config.ts",code:`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });`})),t==="Svelte"&&(i.push({name:"svelte.config.js",code:"export default {};"}),Object.assign(s,{svelte:"^5.20.0"}),Object.assign(l,{"@sveltejs/vite-plugin-svelte":"^5.0.0"}),i.push({name:"main.ts",code:`import { mount } from 'svelte';
import App from './App.svelte';
mount(App, {target:document.getElementById('app')!});`},{name:"vite.config.ts",code:`import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({ plugins: [svelte()] });`})),t==="Vue"&&(Object.assign(s,{vue:"^3.5.0"}),Object.assign(l,{"@vitejs/plugin-vue":"^5.2.0"}),i.push({name:"main.ts",code:`import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');`},{name:"vite.config.ts",code:`import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({ plugins: [vue()] });`})),t==="Angular"&&(i[2].code=`@import '@salyra-ui/${e}/styles.min.css';
`+i[2].code,Object.assign(s,{"@angular/core":"~19.2.0","@angular/common":"~19.2.0","@angular/compiler":"~19.2.0","@angular/platform-browser":"~19.2.0","zone.js":"~0.15.0",rxjs:"^7.8.1"}),Object.assign(l,{"@angular/cli":"~19.2.0","@angular/compiler-cli":"~19.2.0","@angular-devkit/build-angular":"~19.2.0"}),delete l.vite,h.dev="ng serve",h.build="ng build",i.push({name:"main.ts",code:`import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';
bootstrapApplication(App).catch(console.error);`},{name:"angular.json",code:JSON.stringify({version:1,projects:{example:{projectType:"application",root:"",sourceRoot:"",architect:{build:{builder:"@angular-devkit/build-angular:application",options:{browser:"main.ts",index:"index.html",tsConfig:"tsconfig.json",outputPath:"dist",styles:["recipe.css"]}},serve:{builder:"@angular-devkit/build-angular:dev-server",options:{buildTarget:"example:build"}}}}}},null,2)})),t==="Astro"?(s.astro="^5.0.0",delete l.vite,h.dev="astro dev",h.build="astro build",i[0].name="src/pages/index.astro",i[0].code=o.replaceAll("'./controller'","'../controller'").replaceAll("'./recipe.css'","'../recipe.css'"),i[1].name="src/controller.ts",i[2].name="src/recipe.css",i.push({name:"astro.config.mjs",code:`import { defineConfig } from 'astro/config';
export default defineConfig({});`})):t!=="Vanilla"&&i.push({name:"index.html",code:`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Salyra UI example</title></head><body>${t==="Angular"?"<app-root></app-root>":'<div id="app"></div><script type="module" src="/main.'+(t==="React"?"tsx":"ts")+'"><\/script>'}</body></html>`}),i.push({name:"package.json",code:JSON.stringify({name:`salyra-${e}-${t.toLowerCase()}-example`,private:!0,type:"module",scripts:h,dependencies:s,devDependencies:l},null,2)}),i.push({name:"tsconfig.json",code:JSON.stringify({compilerOptions:{target:"ES2022",module:"ESNext",moduleResolution:"Bundler",strict:!0,skipLibCheck:!0,jsx:"react-jsx",esModuleInterop:!0,experimentalDecorators:!0,useDefineForClassFields:!1,lib:["ES2022","DOM","DOM.Iterable"]},include:["**/*.ts","**/*.tsx","**/*.svelte","**/*.vue"],angularCompilerOptions:{strictTemplates:!0}},null,2)}),i.push({name:"README.md",code:`# ${e} / ${t}

Run npm install, then npm run dev.

The controller holds shared state. App uses native ${t} components.

${e==="theme-studio"?"Edits stay in a draft until Apply. Cancel loads the applied theme. Undo/Redo tracks edits. Lock accent excludes it from generation. Exported Tailwind CSS contains only registered editor fields. Import the exported stylesheet after Tailwind.":"Submit reads the real form field. Reset restores the starting RGBA color. Save color adds a recent swatch. Favorite colors are optional and persist through the provided storage adapter."}
`}),i}function mo(e){const t=new TextEncoder,o=[],a=[];let n=0;const i=m=>{let u=4294967295;for(const d of m){u^=d;for(let b=0;b<8;b++)u=u>>>1^(u&1?3988292384:0)}return(u^4294967295)>>>0};for(const m of e){const u=t.encode(m.name),d=t.encode(m.code),b=i(d),f=new Uint8Array(30+u.length),T=new DataView(f.buffer);T.setUint32(0,67324752,!0),T.setUint16(4,20,!0),T.setUint16(6,2048,!0),T.setUint32(14,b,!0),T.setUint32(18,d.length,!0),T.setUint32(22,d.length,!0),T.setUint16(26,u.length,!0),f.set(u,30),o.push(f,d);const I=new Uint8Array(46+u.length),k=new DataView(I.buffer);k.setUint32(0,33639248,!0),k.setUint16(4,20,!0),k.setUint16(6,20,!0),k.setUint16(8,2048,!0),k.setUint32(16,b,!0),k.setUint32(20,d.length,!0),k.setUint32(24,d.length,!0),k.setUint16(28,u.length,!0),k.setUint32(42,n,!0),I.set(u,46),a.push(I),n+=f.length+d.length}const s=a.reduce((m,u)=>m+u.length,0),l=new Uint8Array(22),h=new DataView(l.buffer);h.setUint32(0,101010256,!0),h.setUint16(8,e.length,!0),h.setUint16(10,e.length,!0),h.setUint32(12,s,!0),h.setUint32(16,n,!0);const p=new Uint8Array(n+s+l.length);let c=0;for(const m of[...o,...a,l])p.set(m,c),c+=m.length;return p}function uo(e,t){const o=mo(e),a=URL.createObjectURL(new Blob([o],{type:"application/zip"})),n=document.createElement("a");n.href=a,n.download=t+".zip",n.click(),setTimeout(()=>URL.revokeObjectURL(a),1e3)}function St(e,t,o="Picker"){if(t==="Vanilla"){const n=[...e.matchAll(/<script src="[^"]+"><\/script>\n?/g)].map(i=>i[0]).join("");e=e.replace(/<script src="[^"]+"><\/script>\n?/g,""),e=e.replace("<script>",`${n}<script>`)}e=ho(e);const a={React:"Picker.tsx",Svelte:"Picker.svelte",Vue:"Picker.vue",Angular:"picker.component.ts",Astro:"Picker.astro",Vanilla:"index.html"}[t].replace("Picker",o).replace("picker",o.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase());if(t==="React"||t==="Angular"){const n=/\/\* (?:Add to your stylesheet:|In your global stylesheet:|Global stylesheet:?) \*\//,i=e.match(n);if(i?.index!==void 0)return[{name:a,code:e.slice(0,i.index).trim()},{name:"styles.css",code:e.slice(i.index+i[0].length).trim()}]}return[{name:a,code:e}]}function ho(e){return e.replace(/([ \t]*)import \{ ([^}\n]{70,}) \} from/g,(t,o,a)=>`${o}import {
${String(a).split(", ").map(n=>`${o}  ${n},`).join(`
`)}
${o}} from`).replaceAll("/><Color",`/>
    <Color`).replaceAll("/><Theme",`/>
    <Theme`)}function go(e,t,o){const a=e==="custom",n=e==="wheel",i=n?"Wheel":"Area";return`import { useEffect, useRef, useState } from 'react';
import { ColorPicker as Color, createColorStore, useColor, useColorStore, channelSpecs, colorFormats, bindAlphaInput } from '@salyra-ui/color-picker/react';
import '@salyra-ui/color-picker/styles.min.css';

function AlphaField() {
  const store = useColorStore();
  const state = useColor();
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => bindAlphaInput(input.current!, store), [store]);
  return <input ref={input} type="number" min="0" max="100" step="0.1"
    defaultValue={Number((state.alpha * 100).toFixed(1))} disabled={state.disabled} />;
}

function Fields() {
  const state = useColor();
  const store = useColorStore();
  const format = state.format;
  return <>
    <label>Format<select value={format} disabled={state.disabled}
      onChange={event => store.setFormat(event.currentTarget.value as typeof format)}>
      {colorFormats.map(value => <option key={value} value={value}>{value.toUpperCase()}</option>)}
    </select></label>
    {format === 'hex' ? <label>HEX<Color.Input format="hex" /></label> :
      <div className="channel-fields">
        {([0, 1, 2] as const).map(index => <label key={format + index}>
          {channelSpecs[format][index].label}
          <Color.ChannelInput format={format} index={index} />
        </label>)}
      </div>}
    <label>Alpha %<AlphaField /></label>
    <Color.FormatTrigger${a?" render={state => <span>Change {state.format.toUpperCase()} format</span>}":">Switch format</Color.FormatTrigger>"}${a?" />":""}
  </>;
}

export function Picker() {
  const [store] = useState(() => createColorStore('#5268E080', '${e==="channels"?"rgb":"hex"}'));
  return <Color.Root store={store}${e==="disabled"?" disabled":""} onValueChange={() => {
    const color = store.getColor();
    console.log(color.name, color.hex, color.hsl, color.formats);
  }}>
    <div className="picker-parts${a?" custom-picker":""}">
      ${e==="channels"?"":`<Color.${i} className="${n?"cp-wheel":"cp-area"}">
        <Color.Thumb className="cp-thumb">${a?`<span data-cp-part="thumb-text">{${JSON.stringify(t.text)}}</span>`:""}</Color.Thumb>
      </Color.${i}>
      <label className="cp-slider" data-channel="${n?"v":"h"}">${n?"Brightness":"Hue"}<Color.Slider channel="${n?"v":"h"}" /></label>`}
      <label className="cp-slider" data-channel="alpha">Opacity<Color.Slider channel="alpha" /></label>
      <Fields />
    </div>
  </Color.Root>;
}
/* Add to your stylesheet: */
.picker-parts { display: grid; gap: 16px; width: 100%; max-width: 360px; }
.picker-parts label { display: grid; gap: 8px; min-width: 0; }
.picker-parts .channel-fields { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.picker-parts input, .picker-parts select, .picker-parts button { box-sizing: border-box; width: 100%; min-width: 0; font: inherit; }
.picker-parts input:not([type="range"]), .picker-parts select, .picker-parts button { min-height: 40px; padding: 8px 12px; border: 1px solid #d8d8df; border-radius: 4px; background: transparent; color: inherit; }
.picker-parts input[type="range"] { accent-color: #e4002b; }
.picker-parts :disabled { opacity: .45; cursor: default; }${a?`
`+o:""}`}const bo=["React","Svelte","Vue","Angular","Astro","Vanilla"],qe=[{id:"rectangle",title:"Rectangle",description:"Drag to adjust saturation and brightness. The sliders below change hue and opacity."},{id:"wheel",title:"Wheel",description:"Pick a hue around the wheel, then move inward to reduce saturation. Adjust brightness and opacity with the sliders."},{id:"channels",title:"Channel inputs",description:"Enter each channel separately. Change the format to switch between HEX, RGB, HSL, HSV, OKLCH and OKLab."},{id:"custom",title:"Custom controls",description:"Change the label inside the dot, the control color and the track size. Copy the updated component and styles."}];qe.push({id:"eyedropper",title:"Screen pipette",description:"Sample a pixel from your screen. The color field updates while the existing opacity stays unchanged. Escape cancels sampling."},{id:"eyedropper-custom",title:"Custom pipette button",description:"Use your own label, SVG icon and button classes. This example sets preserveAlpha to false so sampled colors are opaque."});qe.push({id:"form",title:"Forms & saved colors",description:"Submit the selected color, reset the form, undo edits and keep recent or favorite swatches."});qe.push({id:"disabled",title:"Disabled",description:"A disabled picker keeps its color visible and blocks editing. You can still update it from the store."});const _e=[{id:"shared",title:"Shared wheel",description:"Select a marker to edit primary, secondary or accent. Brightness and the channel fields follow the selected color."},{id:"rectangle",title:"Separate role editing",description:"Choose a color role above the rectangle. Editing it keeps the other two colors unchanged."},{id:"single",title:"Primary only",description:"Edit primary with a single dot. The JSON and CSS contain only the primary palette."},{id:"geometry",title:"Radius & borders",description:"Choose which radius and border width fields to include. Only the enabled fields appear in the editor and its export."},{id:"presets",title:"Presets & appearance",description:"Choose a saved theme and an appearance setting. The appearance setting is remembered after a refresh."},{id:"custom",title:"Custom generator",description:"Give the editor your own labels, colors and classes. The appearance buttons show how to replace the default text."}];_e.push({id:"editing",title:"Draft & Apply",description:"Edit a draft, undo changes, lock accent during generation and apply the result to a separate preview."});_e.push({id:"palette",title:"Shade swatches",description:"Show the generated shades as squares, circles or a joined strip. Change the labels and classes without replacing the theme colors."},{id:"disabled",title:"Disabled",description:"Disable the editor while keeping its values and generated shades visible. Programmatic theme updates still work."});function Q(e,t){return`@salyra-ui/${e}/${t.toLowerCase()}`}function F(e){return`${e.split("/").slice(0,2).join("/")}/styles.min.css`}const ge=`.custom-picker {
  --cp-thumb-size: 22px;
  --cp-thumb-radius: 0;
  --cp-track-height: 12px;
  --cp-track-radius: 0;
}
.custom-picker [data-cp-part="thumb-text"] { font-size: 10px; }`;function fo(e,t){const o=Q("color-picker",e),a=t==="wheel"?"ColorWheel":"ColorArea",n=[...t==="channels"?[]:[a],...t==="rectangle"||t==="custom"?["ColorSlider"]:["ColorSlider"],"ColorFormatSelect","ColorInput","ColorAlphaInput","ColorMode"],i=t==="custom",l=`${t==="channels"?"":`<${a}${i?` thumbText="C" classes={{ root: 'brand-surface', thumb: 'brand-thumb' }}`:""} />
    `}<ColorSlider channel="${t==="wheel"?"v":t==="channels"?"alpha":"h"}" />${t==="channels"?"":`
    <ColorSlider channel="alpha" />`}
    <ColorFormatSelect /><ColorInput /><ColorAlphaInput /><ColorMode />`,h=t==="channels"?"rgb":"hex",p=`ColorProvider, ${[...new Set(n)].join(", ")}, createColorStore`,c=`import '${F(o)}';`;if(e==="Svelte")return`<script lang="ts">
  import { ${p} } from '${o}';
  ${c}
  const store = createColorStore('#5268E080', '${h}');
<\/script>

<div${i?' class="picker-parts custom-picker"':' class="picker-parts"'}>
  <ColorProvider {store} onChange={() => console.log(store.getColor())}>
    ${l}
  </ColorProvider>
</div>${i?`
<style>
`+ge.replace('[data-cp-part="thumb-text"]',':global([data-cp-part="thumb-text"])')+`
</style>`:""}`;if(e==="Vue")return`<script setup lang="ts">
import { ${p} } from '${o}';
${c}
const store = createColorStore('#5268E080', '${h}');
<\/script>

<template>
  <div${i?' class="picker-parts custom-picker"':' class="picker-parts"'}>
  <ColorProvider :store="store" @change="console.log(store.getColor())">
    ${l.replace("classes={{ root: 'brand-surface', thumb: 'brand-thumb' }}",`:classes="{ root: 'brand-surface', thumb: 'brand-thumb' }"`)}
  </ColorProvider>
  </div>
</template>${i?`
<style>
`+ge+`
</style>`:""}`;const m=l.replace("classes={{ root: 'brand-surface', thumb: 'brand-thumb' }}",`[classes]="{ root: 'brand-surface', thumb: 'brand-thumb' }"`).replace(/ColorArea/g,"cp-area").replace(/ColorWheel/g,"cp-wheel").replace(/ColorSlider/g,"cp-slider").replace(/ColorFormatSelect/g,"cp-format-select").replace(/ColorInput/g,"cp-input").replace(/ColorAlphaInput/g,"cp-alpha-input").replace(/ColorMode/g,"cp-mode");if(e==="Angular")return`import { Component } from '@angular/core';
import { ${p} } from '${o}';

@Component({
  selector: 'app-color-picker', standalone: true,
  imports: [ColorProvider, ${[...new Set(n)].join(", ")}],
  template: \`<div${i?' class="picker-parts custom-picker"':' class="picker-parts"'}>
  <cp-provider [store]="store" (colorChange)="changed()">
    ${m}
  </cp-provider></div>\`,
})
export class Picker {
  readonly store = createColorStore('#5268E080', '${h}');
  changed() { console.log(this.store.getColor()); }
}

/* In your global stylesheet: */
@import '${F(o)}';${i?`
`+ge:""}`;if(e==="Astro"){const d=["ColorProvider",...new Set(n)],b=l.replace(/<(ColorArea|ColorWheel|ColorInput|ColorAlphaInput)(?=[ />])/g,"<$1 {value}").replace('<ColorSlider channel="h"','<ColorSlider value={state.h} channel="h"').replace('<ColorSlider channel="v"','<ColorSlider value={state.v} channel="v"').replaceAll('<ColorSlider channel="alpha"','<ColorSlider value={state.alpha * 100} channel="alpha"');return`---
import { createColorStore } from '${o}';
${d.map(f=>`import ${f} from '${o}/${f}.astro';`).join(`
`)}
${c}
const value = '#5268E080';
const state = createColorStore(value).getSnapshot();
---
<div${i?' class="picker-parts custom-picker"':' class="picker-parts"'}>
  <ColorProvider {value}>
    ${b}
  </ColorProvider>
</div>
<script>
  import type { ColorProviderElement } from '${o}/client';
  document.querySelector('cp-provider')?.addEventListener('color-change', event => {
    console.log((event.currentTarget as ColorProviderElement).store?.getColor());
  });
<\/script>${i?`
<style is:global>
`+ge+`
</style>`:""}`}return`<link rel="stylesheet" href="/assets/color-picker.min.css">
<script src="/assets/color-picker.min.js"><\/script>
${kt(t)}
<script>
const store = ColorPicker.createColorStore('#5268E080', '${h}');
const provider = document.querySelector('cp-provider');
provider.setStore(store);
provider.addEventListener('color-change', () => console.log(store.getColor()));
<\/script>${i?`
<style>
`+ge+`
</style>`:""}`}function kt(e){if(e==="eyedropper"||e==="eyedropper-custom")return vt(e==="eyedropper-custom");const t=e==="channels"?"":e==="wheel"?'<cp-wheel><div class="cp-wheel" data-area data-cp-part="surface" tabindex="0" role="group" aria-label="Hue and saturation wheel"><span data-cp-part="thumb"></span></div></cp-wheel>':`<cp-area><div class="cp-area" data-area data-cp-part="surface" tabindex="0" role="group" aria-label="Saturation and brightness"><span data-cp-part="thumb">${e==="custom"?'<span data-cp-part="thumb-text">C</span>':""}</span></div></cp-area>`,o=(a,n)=>`<cp-slider channel="${a}"><label class="cp-slider" data-channel="${a}">${n}<input type="range" min="0" max="${a==="h"?"359":"100"}"></label></cp-slider>`;return`<cp-provider value="#5268E080" class="picker-parts${e==="custom"?" custom-picker":""}">
  ${t}${t?`
  `+o(e==="wheel"?"v":"h",e==="wheel"?"Brightness":"Hue"):""}
  ${o("alpha","Alpha")}
  <cp-format-select><label class="cp-format">Format<select>${["hex","rgb","hsl","hsv","oklch","oklab"].map(a=>`<option value="${a}">${a.toUpperCase()}</option>`).join("")}</select></label></cp-format-select>
  <cp-input></cp-input>
  <cp-alpha-input><label class="cp-channel cp-alpha-input">Alpha<span class="cp-channel-field"><input type="number" min="0" max="100" step=".1"><span aria-hidden="true">%</span></span></label></cp-alpha-input>
  ${e==="custom"?'<cp-mode data-custom><button type="button"><span>Change <span data-color-format>HEX</span> format</span></button></cp-mode>':'<cp-mode><button type="button">Switch format</button></cp-mode>'}
  <cp-output format="json"><output hidden></output></cp-output>
</cp-provider>`}function vo(e,t,o){if(t==="custom")return So(e);const a=Q("theme-studio",e),n=t==="rectangle"||t==="geometry"?"area":"wheel";let i=t==="presets"?["ThemeSelect","ThemeMode"]:["ThemeName","ThemeSelect","ThemePicker","ThemeHarmony","ThemeBackground","ThemeRadius","ThemeBorderWidth","ThemeMode","ThemeExport","ThemePalette"];const s=["system","light","dark"].map(k=>`<ThemeMode value="${k}">${k[0].toUpperCase()+k.slice(1)}</ThemeMode>`).join(`
    `),l=`<ThemePicker view="${t==="shared"?"shared-wheel":n}" roles={${JSON.stringify(o.roles??["primary"]).replaceAll('"',"'")}} controls={false} />`,h=[...(o.radius??[]).map(k=>`<ThemeRadius target="${k}" />`),...(o.width??[]).map(k=>`<ThemeBorderWidth target="${k}" />`)].join(`
    `),c=t==="presets"?`<ThemeSelect themes={themes} />
    ${s}
    ${["primary","secondary","accent"].map(k=>`<ThemePalette role="${k}" shape="joined" />`).join(`
    `)}`:`<ThemeName />
    ${t==="shared"||t==="rectangle"||t==="disabled"?"<ThemeSelect themes={themes} />":""}
    ${l}
    ${t==="shared"||t==="rectangle"?"<ThemeHarmony />":""}
    ${o.background?"<ThemeBackground />":""}
    ${h}
    ${t==="single"||o.modes?.length===1?"":s}
    ${(o.roles??["primary"]).map(k=>`<ThemePalette role="${k}" shape="joined" />`).join(`
    `)}
    <ThemeExport selection={selection} />`;i=[...new Set((c.match(/<Theme[A-Z]\w+/g)??[]).map(k=>k.slice(1)))];const m="generateTheme, browserModeStorage",u=`import '${F(a)}';`,d=`const selection = ${JSON.stringify(o)} as const;
const themes = [generateTheme('#5268E0', { name: 'Indigo' }), generateTheme('#277D59', { name: 'Forest' }), generateTheme('#C25D3D', { name: 'Terracotta' })];`;if(e==="React")return`import { ThemeProvider, ${i.join(", ")}, ${m} } from '${a}';
${u}

${d}
export function ThemeExample() {
  return <ThemeProvider theme={themes[0]} selection={selection} mode="system"
    modeStorage={browserModeStorage('app:mode')}>
    ${c}
    <section className="app-preview">Your application content</section>
  </ThemeProvider>;
}
/* .app-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); } */`;if(e==="Svelte")return`<script lang="ts">
  import { ThemeProvider, ${i.join(", ")}, ${m} } from '${a}';
  ${u}
  ${d}
<\/script>

<ThemeProvider options={{ theme: themes[0], selection, mode: 'system',
  modeStorage: browserModeStorage('app:mode') }}>
    ${c.replace("themes={themes}","{themes}").replace(/<ThemeMode value="(system|light|dark)">([^<]+)<\/ThemeMode>/g,'<ThemeMode value="$1">{#snippet children()}$2{/snippet}</ThemeMode>')}
    <section class="app-preview">Your application content</section>
</ThemeProvider>
<style>
  .app-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); }
</style>`;if(e==="Vue")return`<script setup lang="ts">
import { ThemeProvider, ${i.join(", ")}, ${m} } from '${a}';
${u}
${d}
<\/script>
<template>
  <ThemeProvider :options="{ theme: themes[0], selection, mode: 'system',
    modeStorage: browserModeStorage('app:mode') }">
    ${c.replace("themes={themes}",':themes="themes"').replace(/roles=\{([^}]+)\}/g,':roles="$1"').replace("controls={false}",':controls="false"').replace("selection={selection}",':selection="selection"').replace("roles={['primary']}",`:roles="['primary']"`).replace("selection={{ roles: ['primary'] }}",`:selection="{ roles: ['primary'] }"`)}
    <section class="app-preview">Your application content</section>
  </ThemeProvider>
</template>
<style>
.app-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); }
</style>`;const b={ThemeName:"tk-name",ThemePicker:"tk-picker",ThemeHarmony:"tk-harmony",ThemeBackground:"tk-background",ThemeRadius:"tk-radius",ThemeBorderWidth:"tk-border-width",ThemeMode:"tk-mode",ThemeExport:"tk-export",ThemeSelect:"tk-select",ThemePalette:"tk-palette"},f=c.replace(/Theme\w+/g,k=>b[k]??k).replace("themes={themes}",'[themes]="themes"').replace(/roles=\{([^}]+)\}/g,'[roles]="$1"').replace("controls={false}",'[controls]="false"').replace("selection={selection}",'[selection]="selection"').replace("roles={['primary']}",`[roles]="['primary']"`).replace("selection={{ roles: ['primary'] }}",`[selection]="{ roles: ['primary'] }"`);if(e==="Angular")return`import { Component } from '@angular/core';
import { ThemeProvider, ${i.join(", ")}, ${m} } from '${a}';

@Component({ selector: 'app-theme', standalone: true,
  imports: [ThemeProvider, ${i.join(", ")}],
  template: \`<tk-provider [options]="options">
    ${f.replace(/<tk-mode value="(system|light|dark)">([^<]+)<\/tk-mode>/g,'<tk-mode value="$1"><ng-template>$2</ng-template></tk-mode>')}
    <section class="app-preview">Your application content</section>
  </tk-provider>\`,
})
export class ThemeExample {
  readonly selection = ${JSON.stringify(o)} as const;
  readonly themes = [generateTheme('#5268E0', { name: 'Indigo' }), generateTheme('#277D59', { name: 'Forest' }), generateTheme('#C25D3D', { name: 'Terracotta' })];
  readonly options = { theme: this.themes[0], selection: this.selection, mode: 'system' as const,
    modeStorage: browserModeStorage('app:mode') };
}
/* Global stylesheet: */
@import '${F(a)}';
.app-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); }`;if(e==="Astro")return`---
import { generateTheme } from '${a}';
${["ThemeProvider",...i].map(k=>`import ${k} from '${a}/${k}.astro';`).join(`
`)}
${u}
${d}
const theme = themes[0];
---
<ThemeProvider {theme} {selection} mode="system" modeStorageKey="app:mode">
    ${c.replace("<ThemeSelect ","<ThemeSelect {theme} ").replace("<ThemeName />","<ThemeName {theme} />").replace("<ThemePicker ","<ThemePicker {theme} ").replace("<ThemeHarmony />","<ThemeHarmony {theme} />").replace("<ThemeBackground />","<ThemeBackground {theme} />").replace("<ThemeRadius ","<ThemeRadius {theme} ").replace("<ThemeBorderWidth ","<ThemeBorderWidth {theme} ").replaceAll("<ThemePalette ","<ThemePalette {theme} ").replace("<ThemeExport",`<ThemeExport {theme} mode="${o.modes?.length===1?o.modes[0]:"light"}"`)}
    <section class="app-preview">Your application content</section>
</ThemeProvider>
<style>.app-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); }</style>`;const T=ko(t,o),I=`const options = { theme: ThemeStudio.generateTheme('#5268E0', { name: 'Indigo' }), selection: ${JSON.stringify(o)}, mode: 'system',
  modeStorage: ThemeStudio.browserModeStorage('app:mode') };
const provider = document.querySelector('tk-provider');
provider.setStore(ThemeStudio.createThemeStore(options), options);
const render = () => {
  const config = ThemeStudio.themeConfiguration(provider.store.getSnapshot());
  document.querySelector('#preview').style.cssText = config.css;
  console.log(config.theme.name, config.json);
};
provider.addEventListener('theme-change', render);
render();`;return`<link rel="stylesheet" href="/assets/theme-studio.min.css">
<script src="/assets/theme-studio.min.js"><\/script>
${T}
<section id="preview">Your application content</section>
<script>
${I}
<\/script>
<style>
#preview { background: hsl(var(--background)); color: hsl(var(--foreground)); padding: 24px; }
</style>`}function yo(e){const t=Q("theme-studio",e),o=`fallbackTheme: generateTheme('#5268E0'),
  loadTheme: createHttpThemeLoader('/api/theme'),
  timeoutMs: 10000, modeStorage: false as const`;return e==="React"?`import { ThemeProvider, ThemeLoading, ThemeReady, ThemeError,
  generateTheme, createHttpThemeLoader } from '${t}';

export function RemoteTheme() {
  return <ThemeProvider fallbackTheme={generateTheme('#5268E0')}
    loadTheme={createHttpThemeLoader('/api/theme')}
    timeoutMs={10000} modeStorage={false}>
    <ThemeLoading><div>Loading theme…</div></ThemeLoading>
    <ThemeReady><section>Your themed content</section></ThemeReady>
    <ThemeError>{(error, retry) =>
      <button onClick={() => void retry()}>Retry</button>
    }</ThemeError>
  </ThemeProvider>;
}`:e==="Svelte"?`<script lang="ts">
  import { ThemeProvider, ThemeLoading, ThemeReady, ThemeError,
    generateTheme, createHttpThemeLoader } from '${t}';
  const options = { ${o} };
<\/script>
<ThemeProvider {options}>
  <ThemeLoading><div>Loading theme…</div></ThemeLoading>
  <ThemeReady><section>Your themed content</section></ThemeReady>
  <ThemeError>{#snippet children(error, retry)}
    <button onclick={retry}>Retry</button>
  {/snippet}</ThemeError>
</ThemeProvider>`:e==="Vue"?`<script setup lang="ts">
import { ThemeProvider, ThemeLoading, ThemeReady, ThemeError,
  generateTheme, createHttpThemeLoader } from '${t}';
const options = { ${o} };
<\/script>
<template><ThemeProvider :options="options">
  <ThemeLoading><div>Loading theme…</div></ThemeLoading>
  <ThemeReady><section>Your themed content</section></ThemeReady>
  <ThemeError v-slot="{ error, retry }"><button @click="retry">Retry</button></ThemeError>
</ThemeProvider></template>`:e==="Astro"?`---
import { generateTheme } from '${t}';
${["ThemeProvider","ThemeLoading","ThemeReady","ThemeError"].map(n=>`import ${n} from '${t}/${n}.astro';`).join(`
`)}
const fallbackTheme = generateTheme('#5268E0');
---
<ThemeProvider {fallbackTheme} src="/api/theme" modeStorage={false}>
  <ThemeLoading><div>Loading theme…</div></ThemeLoading>
  <ThemeReady><section>Your themed content</section></ThemeReady>
  <ThemeError><button data-tk-retry>Retry</button></ThemeError>
</ThemeProvider>`:e==="Angular"?`import { Component } from '@angular/core';
import { ThemeProvider, ThemeLoading, ThemeReady, ThemeError,
  createThemeStore, generateTheme, createHttpThemeLoader } from '${t}';
@Component({ selector: 'app-remote-theme', standalone: true,
  imports: [ThemeProvider, ThemeLoading, ThemeReady, ThemeError],
  template: \`<tk-provider [store]="store" [options]="options">
    <tk-loading>Loading theme…</tk-loading>
    <tk-ready>Your themed content</tk-ready>
    <tk-error><button (click)="store.reload()">Retry</button></tk-error>
  </tk-provider>\` })
export class RemoteTheme {
  readonly options = { ${o} };
  readonly store = createThemeStore(this.options);
}`:`<link rel="stylesheet" href="/assets/theme-studio.min.css">
<script src="/assets/theme-studio.min.js"><\/script>
<div id="loading">Loading theme…</div>
<section id="content">Your themed content</section>
<button id="retry" hidden>Retry</button>
<script>
${`const options = { ${o} };
const store = ThemeStudio.createThemeStore(options);
const render = () => {
  const state = store.getSnapshot();
  document.querySelector('#content').style.cssText = ThemeStudio.themeConfiguration(state).css;
  document.querySelector('#loading').hidden = state.status !== 'loading';
  document.querySelector('#content').hidden = state.status === 'loading';
  document.querySelector('#retry').hidden = !state.error;
};
const unsubscribe = store.subscribe(render);
render();
const unmount = ThemeStudio.mountThemeStore(store, undefined, options);
document.querySelector('#retry').addEventListener('click', () => store.reload());
// On removal: unsubscribe(); unmount();`.replace("false as const","false").replace("fallbackTheme: generateTheme(","fallbackTheme: ThemeStudio.generateTheme(").replace("loadTheme: createHttpThemeLoader(","loadTheme: ThemeStudio.createHttpThemeLoader(")}
<\/script>
<style>#content { background: hsl(var(--background)); color: hsl(var(--foreground)); }</style>`}const we={text:"C",color:"#E4002B",size:22,track:12};function ye(e,t=".custom-picker"){return`${t} {
  --cp-thumb-size: ${e.size}px;
  --cp-thumb-radius: 0;
  --cp-track-height: ${e.track}px;
  --cp-track-radius: 0;
  --cp-controls-color: ${e.color};
}
${t} [data-cp-part="thumb-text"] { font-size: 10px; color: white; }
${t} input[type="range"] { accent-color: var(--cp-controls-color); }
${t} button { border-color: var(--cp-controls-color); color: var(--cp-controls-color); }
${t} button[aria-pressed="true"] { background: var(--cp-controls-color); color: white; }`}function et(e,t,o=we){if(t==="eyedropper"||t==="eyedropper-custom")return eo(e,t==="eyedropper-custom");if(t==="form")return Ye("color-picker",e);if(e==="React")return go(t,o,ye(o));let a=Co(fo(e,t==="disabled"?"rectangle":t),e);if(t==="disabled")return wt(a,e,!1);if(t!=="custom")return a;e==="Svelte"&&(a=a.replace("<ColorMode />","<ColorMode>{#snippet children(format)}<span>Change {format.toUpperCase()} format</span>{/snippet}</ColorMode>")),e==="Vue"&&(a=a.replace("<ColorMode />",'<ColorMode v-slot="{ format }"><span>Change {{ format.toUpperCase() }} format</span></ColorMode>')),e==="Angular"&&(a=a.replace("<cp-mode />","<cp-mode><ng-template let-format><span>Change {{ format.toUpperCase() }} format</span></ng-template></cp-mode>")),e==="Astro"&&(a=a.replace("<ColorMode />","<ColorMode><span>Change <span data-color-format>HEX</span> format</span></ColorMode>")),e==="Vanilla"&&(a=a.replace('<cp-mode><button type="button">Switch format</button></cp-mode>','<cp-mode data-custom><button type="button"><span>Change <span data-color-format>HEX</span> format</span></button></cp-mode>'));const n=o.text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return a.replaceAll('thumbText="C"',`thumbText="${n}"`).replaceAll(">C</span>",`>${n}</span>`).replace(ge,ye(o)).replace(ge.replace('[data-cp-part="thumb-text"]',':global([data-cp-part="thumb-text"])'),ye(o).replace('[data-cp-part="thumb-text"]',':global([data-cp-part="thumb-text"])').replace('input[type="range"]',':global(input[type="range"])').replace(" button"," :global(button)"))}function Tt(){return`<div class="custom-theme">
  <h3 class="generator-title">Brand color</h3>
  <label>Theme title<input data-tk-name maxlength="200"></label>
  <cp-provider data-theme-generator data-role="primary" class="picker-parts">
    <cp-area><div class="cp-area" data-area data-cp-part="surface" tabindex="0" role="group" aria-label="Brand color"><span data-cp-part="thumb"><span data-cp-part="thumb-text">B</span></span></div></cp-area>
    <cp-slider channel="h"><label class="cp-slider" data-channel="h">Color tone<input type="range" min="0" max="359"></label></cp-slider>
    <cp-input></cp-input>
  </cp-provider>
  <div class="custom-mode-bar">
    <button type="button" data-tk-mode="system">Use device</button>
    <button type="button" data-tk-mode="light">Day</button>
    <button type="button" data-tk-mode="dark">Night</button>
  </div>
  ${Ee("primary",{shape:"joined"})}
</div>`}function So(e){const t=Q("theme-studio",e),o=Q("color-picker",e),a=`import '${F(t)}';`,n=ye({...we,size:26},".custom-theme"),i=`<ThemeName label="Theme title" />
    <h3>Brand color</h3>
    <ThemeGenerator role="primary">
      <ColorArea thumbText="B" classes={{ root: 'brand-surface', thumb: 'brand-thumb' }} />
      <ColorSlider channel="h" label="Color tone" /><ColorInput />
    </ThemeGenerator>
    <ThemeMode value="system">Use device</ThemeMode>
    <ThemeMode value="light">Day</ThemeMode>
    <ThemeMode value="dark">Night</ThemeMode>
    <ThemePalette role="primary" shape="joined" />`,s="ThemeProvider, ThemeGenerator, ThemeName, ThemeMode, ThemePalette, generateTheme",l="ColorArea, ColorSlider, ColorInput";return e==="React"?`import { ${s} } from '${t}';
import { ${l} } from '${o}';
${a}

export function CustomGenerator() {
  return <ThemeProvider theme={generateTheme('#5268E0')} modeStorage={false}>
  <div className="custom-theme">
    ${i}
  </div>
  </ThemeProvider>;
}
/* Global stylesheet */
${n}`:e==="Svelte"?`<script lang="ts">
  import { ${s} } from '${t}';
  import { ${l} } from '${o}';
  ${a}
<\/script>
<ThemeProvider options={{ theme: generateTheme('#5268E0'), modeStorage: false }}>
  <div class="custom-theme">
    ${i.replace(/<ThemeMode value="(system|light|dark)">([^<]+)<\/ThemeMode>/g,'<ThemeMode value="$1">{#snippet children()}$2{/snippet}</ThemeMode>')}
  </div>
</ThemeProvider>
<!-- Add this CSS globally (or use :global for internal selectors). -->
<style is:global>
${n}
</style>`.replace("<style is:global>","<style>"):e==="Vue"?`<script setup lang="ts">
import { ${s} } from '${t}';
import { ${l} } from '${o}';
${a}
<\/script>
<template>
<ThemeProvider :options="{ theme: generateTheme('#5268E0'), modeStorage: false }">
  <div class="custom-theme">
    ${i.replace("classes={{ root: 'brand-surface', thumb: 'brand-thumb' }}",`:classes="{ root: 'brand-surface', thumb: 'brand-thumb' }"`)}
  </div>
</ThemeProvider>
</template>
<style>
${n}
</style>`:e==="Angular"?`import { Component } from '@angular/core';
import { ${s} } from '${t}';
import { ${l} } from '${o}';
@Component({ selector: 'app-custom-theme', standalone: true,
  imports: [ThemeProvider, ThemeGenerator, ThemeName, ThemeMode, ThemePalette, ${l}],
  template: \`<tk-provider [options]="options"><div class="custom-theme">
    <tk-name label="Theme title" /><h3>Brand color</h3>
    <tk-generator role="primary" [custom]="true">
      <cp-area thumbText="B" [classes]="{ root: 'brand-surface', thumb: 'brand-thumb' }" />
      <cp-slider channel="h" label="Color tone" /><cp-input />
    </tk-generator>
    <tk-mode value="system"><ng-template>Use device</ng-template></tk-mode>
    <tk-mode value="light"><ng-template>Day</ng-template></tk-mode>
    <tk-mode value="dark"><ng-template>Night</ng-template></tk-mode>
    <tk-palette role="primary" shape="joined" />
  </div></tk-provider>\` })
export class CustomGenerator {
 readonly options = {theme: generateTheme('#5268E0'), modeStorage: false as const};
}
/* Global stylesheet */
@import '${F(t)}';
${n}`:e==="Astro"?`---
import { generateTheme } from '${t}';
${["ThemeProvider","ThemeGenerator","ThemeName","ThemeMode","ThemePalette"].map(p=>`import ${p} from '${t}/${p}.astro';`).join(`
`)}
${["ColorArea","ColorSlider","ColorInput"].map(p=>`import ${p} from '${o}/${p}.astro';`).join(`
`)}
${a}
const theme=generateTheme('#5268E0');
---
<ThemeProvider {theme} modeStorage={false}>
 <div class="custom-theme">
  <ThemeName {theme} label="Theme title" /><h3>Brand color</h3>
  <ThemeGenerator {theme} role="primary">
   <ColorArea value="#5268E0" thumbText="B" />
   <ColorSlider channel="h" label="Color tone" /><ColorInput value="#5268E0" />
  </ThemeGenerator>
  <ThemeMode value="system">Use device</ThemeMode>
  <ThemeMode value="light">Day</ThemeMode>
  <ThemeMode value="dark">Night</ThemeMode>
 </div>
</ThemeProvider>
<style is:global>
${n}
</style>`:`<link rel="stylesheet" href="/assets/theme-studio.min.css">
<script src="/assets/theme-studio.min.js"><\/script>
${`<tk-provider class="tk-scope tk-generator" data-config='{"mode":"system","modeStorage":false}'>
${Tt()}
</tk-provider>`}
<script>
const provider = document.querySelector('tk-provider');
const options = { theme: ThemeStudio.generateTheme('#5268E0'), modeStorage: false };
provider.setStore(ThemeStudio.createThemeStore(options), options);
<\/script>
<style>
${n}
</style>`}function tt(e,t,o={...we,text:"B",size:26},a=fe(t)){if(t==="editing")return Ye("theme-studio",e);if(t==="palette")return Ve(e);let n=Ct(vo(e,t,a),e,a.roles);if(t!=="presets"&&t!=="custom"&&(n=n.replaceAll("ThemeStudio.browserModeStorage('app:mode')","false").replaceAll("browserModeStorage('app:mode')",e==="Angular"?"false as const":"false").replaceAll(", browserModeStorage","").replace('modeStorageKey="app:mode"',"modeStorage={false}").replaceAll('mode="system"','mode="light"').replaceAll("mode: 'system'","mode: 'light'")),t==="disabled"&&(n=wt(n,e,!0)),t==="geometry"&&a.modes?.length===1&&a.modes[0]==="dark"&&(n=n.replaceAll('mode="light"','mode="dark"').replaceAll("mode: 'light'","mode: 'dark'")),t!=="custom")return n;const i=o.text.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return n.replaceAll('thumbText="B"',`thumbText="${i}"`).replaceAll(">B</span>",`>${i}</span>`).replace(ye({...we,size:26},".custom-theme"),ye(o,".custom-theme")).replaceAll(e==="Svelte"?'.custom-theme [data-cp-part="thumb-text"]':"__unused__",'.custom-theme :global([data-cp-part="thumb-text"])').replaceAll(e==="Svelte"?'.custom-theme input[type="range"]':"__unused__",'.custom-theme :global(input[type="range"])').replaceAll(e==="Svelte"?".custom-theme button":"__unused__",".custom-theme :global(button)").replace(' :global(button)[aria-pressed="true"]',' :global(button[aria-pressed="true"])')}function fe(e){return e==="single"||e==="custom"?{roles:["primary"]}:e==="geometry"?{roles:["primary"],radius:["card"],width:["button"],modes:["light"]}:{roles:["primary","secondary","accent"],radius:["card"],width:["card"],background:!0,modes:["light","dark"]}}function ko(e,t){const o={view:e==="rectangle"||e==="geometry"?"area":e==="single"?"wheel":"shared-wheel",roles:t.roles,controls:!1},a=Dt.replace("<tk-picker>",`<tk-picker data-options='${JSON.stringify(o)}'>`),n=[D("#5268E0",{name:"Indigo"}),D("#277D59",{name:"Forest"}),D("#C25D3D",{name:"Terracotta"})],i=`<tk-select data-themes='${JSON.stringify(n)}'><label class="cp-format">Theme<select><option value="" disabled>Custom theme</option>${n.map(l=>`<option value="${l.id}">${l.name}</option>`).join("")}</select></label></tk-select>`,s=[...(t.radius??[]).map(l=>`<label class="tk-border"><span>${l} radius</span><span class="tk-border-field"><input type="number" min="0" max="1000" step=".125" data-tk-border="radius" data-target="${l}"><span aria-hidden="true">rem</span></span></label>`),...(t.width??[]).map(l=>`<label class="tk-border"><span>${l} border width</span><span class="tk-border-field"><input type="number" min="0" max="1000" step="1" data-tk-border="width" data-target="${l}"><span aria-hidden="true">px</span></span></label>`)].join(`
  `);return`<tk-provider class="tk-scope tk-generator" data-config='${JSON.stringify({mode:"light",modeStorage:!1,selection:t})}'>
  ${e==="single"||t.modes?.length===1?"":'<div class="mode-buttons"><button data-tk-mode="system">System</button><button data-tk-mode="light">Light</button><button data-tk-mode="dark">Dark</button></div>'}
  ${e==="presets"?i:`<label class="tk-name">Theme name<input data-tk-name maxlength="200"></label>
  ${a}
  ${e==="shared"||e==="rectangle"?'<div class="tk-harmony"><label>Harmony<select data-tk-harmony><option value="analogous">Analogous</option><option value="triadic">Triadic</option><option value="split-complementary">Split complementary</option></select></label><button data-tk-generate-harmony>Generate accent &amp; secondary</button></div>':""}
  ${s}
  ${t.background?'<label class="tk-background"><input type="checkbox" data-tk-background>Tint background with primary</label>':""}`}
  <tk-export format="json"><pre class="tk-export"></pre></tk-export>
</tk-provider>`}function To(e){const t=Q("theme-studio",e);return e==="React"?`import { useThemeMode } from '${t}';

// Render this component inside ThemeProvider.
export function AppearanceControls() {
 const mode = useThemeMode();
 return <div className="appearance-controls">
   <button aria-pressed={mode.preference === 'system'} onClick={() => mode.setMode('system')}>Use device</button>
   <button aria-pressed={mode.preference === 'light'} onClick={() => mode.setMode('light')}>Day</button>
   <button aria-pressed={mode.preference === 'dark'} onClick={() => mode.setMode('dark')}>Night</button>
 </div>;
}`:e==="Svelte"?`<script lang="ts">
 import { useThemeMode } from '${t}';
 // Render this child component inside ThemeProvider.
 const mode = useThemeMode();
<\/script>
<div class="appearance-controls">
 <button aria-pressed={$mode.preference === 'system'} onclick={() => mode.setMode('system')}>Use device</button>
 <button aria-pressed={$mode.preference === 'light'} onclick={() => mode.setMode('light')}>Day</button>
 <button aria-pressed={$mode.preference === 'dark'} onclick={() => mode.setMode('dark')}>Night</button>
</div>`:e==="Vue"?`<script setup lang="ts">
import { useThemeMode } from '${t}';
// Render this child component inside ThemeProvider.
const mode = useThemeMode();
<\/script>
<template><div class="appearance-controls">
 <button :aria-pressed="mode.preference.value === 'system'" @click="mode.setMode('system')">Use device</button>
 <button :aria-pressed="mode.preference.value === 'light'" @click="mode.setMode('light')">Day</button>
 <button :aria-pressed="mode.preference.value === 'dark'" @click="mode.setMode('dark')">Night</button>
</div></template>`:e==="Angular"?`import { Component } from '@angular/core';
import { useThemeMode } from '${t}';
// Render this child component inside tk-provider.
@Component({selector:'app-appearance',standalone:true,
 template:\`<div class="appearance-controls">
  <button [attr.aria-pressed]="mode.preference() === 'system'" (click)="mode.setMode('system')">Use device</button>
  <button [attr.aria-pressed]="mode.preference() === 'light'" (click)="mode.setMode('light')">Day</button>
  <button [attr.aria-pressed]="mode.preference() === 'dark'" (click)="mode.setMode('dark')">Night</button>
 </div>\`})
export class AppearanceControls {readonly mode=useThemeMode();}`:`<!-- Place these controls inside ThemeProvider / tk-provider. -->
<!-- Astro: ThemeProvider registers the native client automatically.
     Vanilla: load theme-studio.js once in the outer page. -->
<div class="appearance-controls">
 <button type="button" data-tk-mode="system">Use device</button>
 <button type="button" data-tk-mode="light">Day</button>
 <button type="button" data-tk-mode="dark">Night</button>
</div>
<!-- ThemeStudio.themeModeActions(provider.store).cycle() is also available
     for a custom cycle button. -->`}function Co(e,t){const o=`.picker-parts { display: grid; gap: var(--cp-gap, 16px); width: 100%; max-width: 360px; }
.picker-parts cp-provider { display: contents; }`,a=t==="Svelte"?o.replace(" cp-provider"," :global(cp-provider)"):o;if(t==="React"){const n="/* Add to your stylesheet: */";return e.includes(n)?e.replace(n,n+`
`+o):e+`

`+n+`
`+o}return t==="Angular"?e+`
`+o:e.includes("</style>")?e.replace("</style>",a+`
</style>`):e+`
<style${t==="Astro"?" is:global":""}>
${a}
</style>`}function wo(e){const t=Q("theme-studio",e),o='<section class="app-preview"><h3>Project settings</h3><button type="button">Save changes</button></section>',a=`.app-preview { padding: 24px; background: hsl(var(--background)); color: hsl(var(--foreground)); border: var(--border-width-card) solid hsl(var(--primary)); border-radius: var(--border-radius-card); }
.app-preview button { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 10px 16px; border: 0; border-radius: var(--border-radius-button); }`;return e==="React"?`import { ThemeProvider, generateTheme } from '${t}';
import '${F(t)}';

const theme = generateTheme('#277D59', { name: 'Forest' });
export function StandaloneTheme() {
  return <ThemeProvider theme={theme} mode="system" modeStorage={false}>
    ${o.replaceAll("class=","className=")}
  </ThemeProvider>;
}
/* Global stylesheet */
${a}`:e==="Svelte"?`<script lang="ts">
 import { ThemeProvider, generateTheme } from '${t}';
 import '${F(t)}';
 const theme = generateTheme('#277D59', { name: 'Forest' });
<\/script>
<ThemeProvider options={{ theme, mode: 'system', modeStorage: false }}>
 ${o}
</ThemeProvider>
<style>
${a}
</style>`:e==="Vue"?`<script setup lang="ts">
import { ThemeProvider, generateTheme } from '${t}';
import '${F(t)}';
const theme = generateTheme('#277D59', { name: 'Forest' });
<\/script>
<template><ThemeProvider :options="{ theme, mode: 'system', modeStorage: false }">
 ${o}
</ThemeProvider></template>
<style>
${a}
</style>`:e==="Angular"?`import { Component } from '@angular/core';
import { ThemeProvider, generateTheme } from '${t}';
@Component({ selector: 'app-standalone-theme', standalone: true,
 imports: [ThemeProvider],
 template: \`<tk-provider [options]="options">${o}</tk-provider>\` })
export class StandaloneTheme {
 readonly options = { theme: generateTheme('#277D59', { name: 'Forest' }),
   mode: 'system' as const, modeStorage: false as const };
}
/* Global stylesheet */
@import '${F(t)}';
${a}`:e==="Astro"?`---
import { generateTheme } from '${t}';
import ThemeProvider from '${t}/ThemeProvider.astro';
import '${F(t)}';
const theme = generateTheme('#277D59', { name: 'Forest' });
---
<ThemeProvider {theme} mode="system" modeStorage={false}>
 ${o}
</ThemeProvider>
<style>
${a}
</style>`:`<link rel="stylesheet" href="/assets/theme-studio.min.css">
<script src="/assets/theme-studio.min.js"><\/script>
<tk-provider class="tk-scope">${o}</tk-provider>
<script>
const options = { theme: ThemeStudio.generateTheme('#277D59', { name: 'Forest' }),
  mode: 'system', modeStorage: false };
const provider = document.querySelector('tk-provider');
provider.setStore(ThemeStudio.createThemeStore(options), options);
<\/script>
<style>
${a}
</style>`}function xo(e,t){if(t==="standalone")return wo(e);const o=t==="timeout"?2e3:5e3;return $o(e).replaceAll("10000",String(o)).replace("generateTheme('#5268E0')","generateTheme('#5268E0', { name: 'Indigo fallback' })")}const ke=`<h3>Project settings</h3>
  <p>Sample controls using the theme's CSS variables.</p>
  <label>Project name<input value="Website redesign" /></label>
  <div class="app-actions"><button type="button">Save changes</button><button type="button" class="secondary">Cancel</button></div>
  <aside>Accent surface</aside>`,He=`.app-preview { display: grid; gap: 16px; padding: 24px; background: hsl(var(--background)); color: hsl(var(--foreground)); border: var(--border-width-card) solid hsl(var(--primary)); border-radius: var(--border-radius-card); }
.app-preview h3, .app-preview p { margin: 0; }
.app-preview label { display: grid; gap: 8px; }
.app-preview input { background: hsl(var(--background)); color: hsl(var(--foreground)); border: var(--border-width-input) solid hsl(var(--primary)); border-radius: var(--border-radius-input); padding: 10px; }
.app-actions { display: flex; gap: 8px; }
.app-actions button { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); padding: 10px 16px; border: 0; border-radius: var(--border-radius-button); }
.app-actions .secondary { background: hsl(var(--secondary)); color: hsl(var(--secondary-foreground)); }
.app-preview aside { background: hsl(var(--accent)); color: hsl(var(--accent-foreground)); padding: 16px; border-radius: var(--border-radius-card); }`;function Ct(e,t,o=["primary","secondary","accent"]){const a=o.includes("accent")?ke:ke.replace("<aside>Accent surface</aside>",""),n=t==="React"?a.replaceAll("class=","className=").replace("input value=","input defaultValue="):a;let i=e.replace("Your application content",n);if(!i.includes("app-preview")){const s=t==="Angular"||t==="Vanilla"?"</tk-provider>":"</ThemeProvider>";i=i.replace(s,`<section ${t==="React"?"className":"class"}="app-preview">${n}</section>
${s}`)}return i=i.replace(/\/\* \.app-preview \{[^}]*\} \*\//,""),i.includes("</style>")?i.replace("</style>",He+`
</style>`):t==="React"||t==="Angular"?i+(/\/\* (?:Add to your stylesheet:|In your global stylesheet:|Global stylesheet:?) \*\//.test(i)?`
`:`
/* Global stylesheet */
`)+He:i+`
<style${t==="Astro"?" is:global":""}>
${He}
</style>`}function $o(e){const t=yo(e).replace("<section>Your themed content</section>",`<section class="app-preview">${ke}</section>`).replace("<tk-ready>Your themed content</tk-ready>",`<tk-ready><section class="app-preview">${ke}</section></tk-ready>`).replace('<section id="content">Your themed content</section>',`<section id="content" class="app-preview">${ke}</section>`);return Ct(e==="React"?t.replaceAll("class=","className=").replace("input value=","input defaultValue="):t,e)}function wt(e,t,o){return o?t==="React"||t==="Astro"?e.replace("<ThemeProvider ","<ThemeProvider disabled "):e.replace("theme: themes[0]","disabled: true, theme: themes[0]").replace("theme: this.themes[0]","disabled: true, theme: this.themes[0]").replace("theme: ThemeStudio.generateTheme(","disabled: true, theme: ThemeStudio.generateTheme("):t==="React"||t==="Svelte"||t==="Astro"?e.replace("<ColorProvider ","<ColorProvider disabled "):t==="Vue"?e.replace("<ColorProvider ",'<ColorProvider :disabled="true" '):t==="Angular"?e.replace("<cp-provider ",'<cp-provider [disabled]="true" '):e.replace("<cp-provider ","<cp-provider disabled ")}const xt={shape:"joined",label:"500",gap:4,size:48};function $t(e){return`.brand-palette { --tk-palette-gap: ${e.gap}px; --tk-swatch-height: ${e.size}px; --tk-swatch-radius: 10px; }
.brand-shade-label { font-size: 11px; font-weight: 600; }
.brand-shade { outline: 1px solid rgb(0 0 0 / 8%); outline-offset: -1px; }`}function Ve(e,t=xt){const o=Q("theme-studio",e),a="{ root: 'brand-palette', label: 'brand-shade-label', swatch: 'brand-shade' }",n=JSON.stringify({500:t.label}).replaceAll("<","\\u003c"),i=`const classes = ${a};
const labels = ${n};`,s=`role="primary" shape="${t.shape}" classes={classes} labels={labels}`,l=$t(t);return e==="React"?`import { ThemeProvider, ThemePalette, generateTheme } from '${o}';
import '${F(o)}';
${i}
export function Shades() {
  return <ThemeProvider theme={generateTheme('#5268E0')}><ThemePalette ${s} /></ThemeProvider>;
}
/* Global stylesheet */
${l}`:e==="Svelte"?`<script lang="ts">
import { ThemeProvider, ThemePalette, generateTheme } from '${o}';
import '${F(o)}';
${i}
<\/script>
<ThemeProvider options={{ theme: generateTheme('#5268E0') }}><ThemePalette ${s} /></ThemeProvider>
<style>
${l.replace(".brand-palette",":global(.brand-palette)").replace(".brand-shade-label",":global(.brand-shade-label)").replace(".brand-shade {",":global(.brand-shade) {")}
</style>`:e==="Vue"?`<script setup lang="ts">
import { ThemeProvider, ThemePalette, generateTheme } from '${o}';
import '${F(o)}';
${i}
<\/script>
<template><ThemeProvider :options="{ theme: generateTheme('#5268E0') }"><ThemePalette role="primary" shape="${t.shape}" :classes="classes" :labels="labels" /></ThemeProvider></template>
<style>
${l}
</style>`:e==="Angular"?`import { Component } from '@angular/core';
import { ThemeProvider, ThemePalette, generateTheme } from '${o}';
@Component({ selector: 'app-shades', standalone: true, imports: [ThemeProvider, ThemePalette], template: \`<tk-provider [options]="options"><tk-palette role="primary" shape="${t.shape}" [classes]="classes" [labels]="labels" /></tk-provider>\` })
export class Shades { readonly options = { theme: generateTheme('#5268E0') }; readonly classes = ${a}; readonly labels = ${n}; }
/* Global stylesheet */
@import '${F(o)}';
${l}`:e==="Astro"?`---
import { generateTheme } from '${o}';
import ThemeProvider from '${o}/ThemeProvider.astro';
import ThemePalette from '${o}/ThemePalette.astro';
import '${F(o)}';
const theme = generateTheme('#5268E0');
${i}
---
<ThemeProvider {theme}><ThemePalette {theme} ${s} /></ThemeProvider>
<style is:global>
${l}
</style>`:`<link rel="stylesheet" href="/assets/theme-studio.min.css">
<script src="/assets/theme-studio.min.js"><\/script>
<tk-provider class="tk-scope"><div id="palette"></div></tk-provider>
<script>
${i}
const provider = document.querySelector('tk-provider');
provider.setStore(ThemeStudio.createThemeStore({ theme: ThemeStudio.generateTheme('#5268E0') }));
document.querySelector('#palette').innerHTML = ThemeStudio.themePaletteMarkup('primary', { shape: '${t.shape}', classes, labels });
<\/script>
<style>
${l}
</style>`}const R=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let Po=0,Ro=0;function z(e,t,o={}){let a=o.integration??"React",n=0,i=[];const s=`source-${++Po}`;e.classList.add("code-panel"),e.innerHTML=`<div class="code-toolbar"><div class="framework-tabs" role="tablist" aria-label="${R(o.label??"Example")} framework" ${o.file?"hidden":""}>${bo.map(b=>`<button type="button" role="tab" id="${s}-${b}" aria-controls="${s}-code" data-framework="${b}">${b}</button>`).join("")}</div><span class="fixed-source-file" ${o.file?"":"hidden"}>${R(o.file??"")}</span><div class="code-actions"><button type="button" class="download-button" aria-label="Download files" title="Download all example files as a ZIP"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/></svg><span>Download files</span></button><button type="button" class="copy-button">Copy code</button></div></div><div class="source-file-tabs" role="tablist" aria-label="${R(o.label??"Example")} files"></div><pre id="${s}-code" role="tabpanel" tabindex="0"><code></code></pre><p class="copy-status" aria-live="polite"></p>`;const l=e.querySelector("code"),h=e.querySelector(".copy-button"),p=e.querySelector(".copy-status"),c=e.querySelector(".source-file-tabs"),m=e.querySelector(".framework-tabs"),u=()=>{l.textContent=i[n].code,c.querySelectorAll("[data-file]").forEach(b=>{const f=Number(b.dataset.file)===n;b.setAttribute("aria-selected",String(f)),b.tabIndex=f?0:-1}),p.textContent="",h.textContent="Copy code"},d=()=>{const b=i[n]?.name;i=o.files?.(a)??(o.file?[{name:o.file,code:t(a)}]:St(t(a),a,o.baseName)),n=Math.max(0,i.findIndex(f=>f.name===b)),c.innerHTML=i.map((f,T)=>`<button type="button" role="tab" aria-controls="${s}-code" data-file="${T}">${R(f.name)}</button>`).join(""),c.hidden=!!o.file&&i.length===1,m.querySelectorAll("[data-framework]").forEach(f=>{const T=f.dataset.framework===a;f.setAttribute("aria-selected",String(T)),f.tabIndex=T?0:-1}),o.file||e.querySelector("pre").setAttribute("aria-labelledby",`${s}-${a}`),u()};m.addEventListener("click",b=>{const f=b.target.closest("[data-framework]");f&&(a=f.dataset.framework,d())}),c.addEventListener("click",b=>{const f=b.target.closest("[data-file]");f&&(n=Number(f.dataset.file),u())});for(const b of[m,c])b.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(f.key))return;const T=[...b.querySelectorAll("button")],I=T.indexOf(document.activeElement);if(I<0)return;f.preventDefault();const k=f.key==="Home"?0:f.key==="End"?T.length-1:(I+(f.key==="ArrowRight"?1:-1)+T.length)%T.length;T[k].click(),T[k].focus()});return e.querySelector(".download-button").addEventListener("click",()=>uo(i,o.downloadName?.()??(o.baseName??"example")+(o.file?"":"-"+a.toLowerCase()))),h.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(l.textContent??""),p.textContent="Code copied.",h.textContent="Copied"}catch{p.textContent="Select the code and copy it with your keyboard.";const b=document.createRange();b.selectNodeContents(l);const f=window.getSelection();f?.removeAllRanges(),f?.addRange(b)}}),d(),{refresh:d,setIntegration(b){a=b,d()}}}function Pt(e=["primary","secondary","accent"]){return`<div class="theme-sample"><div class="sample-header"><span>Application preview</span><span data-sample-mode></span></div><article class="sample-card"><span class="sample-name" data-sample-name></span><h3>Project settings</h3><p>Buttons, inputs and surfaces use the active theme tokens.</p><label>Project name<input value="Website redesign" aria-label="Example project name"></label><div class="sample-actions"><button class="sample-primary" type="button">Save changes</button><button class="sample-secondary" type="button">Cancel</button></div>${e.includes("accent")?'<div class="sample-note">Accent surface</div>':""}</article><div class="sample-colors">${e.map(t=>`<span style="--role:var(--${t})"><i></i>${t}</span>`).join("")}</div></div>`}function Rt(e,t){e.style.cssText=t.css,e.querySelector("[data-sample-name]").textContent=t.theme.name,e.querySelector("[data-sample-mode]").textContent=t.modePreference==="system"?`System / ${t.mode}`:t.mode}function Eo(e,t){e.querySelector("[data-color-swatch]").style.backgroundColor=t.hex,e.querySelector("[data-color-name]").textContent=t.name,e.querySelector("[data-color-match]").textContent=t.exact?"Exact named color":"Nearest named color",e.querySelector("[data-color-hex]").textContent=t.hex;const o=e.querySelector("[data-color-values]");o.innerHTML=Object.entries(t.formats).map(([a,n])=>`<div><dt>${a.toUpperCase()}</dt><dd>${R(n)}</dd></div>`).join("")}function Ne(e,t,o,a="all"){const n=t==="color-picker",i=(n?qe:_e).filter(({id:v})=>{const A=v==="custom"||v==="palette"||v==="eyedropper-custom";return a==="all"||(a==="customization"?A:!A)});let s=i.find(({id:v})=>v===o)?.id??i[0].id,l,h,p={...we,...n?{}:{text:"B",size:26}},c={...xt},m={...fe("geometry"),modes:["light"]};e.classList.add("explorer"),e.innerHTML=`<div class="example-toolbar">${i.length===1?`<span class="example-select">${R(i[0].title)}</span>`:`<label class="example-select">${a==="customization"?"Customize":"Example"}<select data-example aria-label="${n?"Color picker":"Theme studio"} ${a==="customization"?"customization":"example"}">${i.map(v=>`<option value="${v.id}" ${v.id===s?"selected":""}>${R(v.title)}</option>`).join("")}</select></label>`}<div class="view-tabs" role="group" aria-label="Example display"><button type="button" data-display="preview" aria-pressed="true">Preview</button><button type="button" data-display="code" aria-pressed="false">Code</button></div></div><div class="example-description"><p></p></div><div class="example-body" data-display="preview"><div class="example-preview"><div class="preview-label">Interactive preview <span>Vanilla adapter</span></div><div class="preview-content"></div></div><div class="example-code"></div></div>`;const u=e.querySelector(".example-body"),d=e.querySelector(".preview-content"),b=e.querySelector(".example-description p"),f=e.querySelector("[data-example]"),T=z(e.querySelector(".example-code"),v=>n?et(v,s,p):s==="palette"?Ve(v,c):tt(v,s,p,s==="geometry"?m:fe(s)),{label:n?"Color picker":"Theme editor",baseName:n?"ColorPicker":"ThemeEditor",files:v=>s==="editing"||s==="form"?po(t,v):St(n?et(v,s,p):s==="palette"?Ve(v,c):tt(v,s,p,s==="geometry"?m:fe(s)),v,n?"ColorPicker":"ThemeEditor")}),I=()=>{if(l?.(),h?.(),h=void 0,d.replaceChildren(),f&&(f.value=s),b.textContent=i.find(v=>v.id===s).description,s==="editing")l=oo(d);else if(s==="form")l=ro(d);else if(n){if(d.innerHTML=`<div class="color-demo">${kt(s)}<div class="color-result"><div class="swatch-checker"><div data-color-swatch></div></div><div><h3 data-color-name></h3><p data-color-match></p><code data-color-hex></code></div></div></div><details class="color-values"><summary>All color values</summary><dl data-color-values></dl></details>`,s==="custom"){const _=rt(p,()=>k());d.prepend(_),h=_.destroy}const v=$e("#5268E080",s==="channels"?"rgb":"hex","area",s==="disabled"),A=d.querySelector(".color-demo cp-provider");A.setStore(v);const ae=s==="eyedropper"||s==="eyedropper-custom"?Qt(A,v,s==="eyedropper-custom"):void 0,N=()=>Eo(d,v.getColor());A.addEventListener("color-change",N),N(),l=()=>{ae?.(),A.removeEventListener("color-change",N),A.remove()}}else if(s==="palette"){const v=`palette-example-${++Ro}`;d.innerHTML=`<form class="swatch-settings"><label>Swatch shape<select data-swatch-shape><option value="square">Squares</option><option value="circle">Circles</option><option value="joined">Joined strip</option></select></label><label>500 shade label<input data-swatch-label maxlength="40"></label><label>Gap (px)<input type="number" data-swatch-gap min="0" max="24" aria-describedby="${v}-gap"><small id="${v}-gap" data-swatch-gap-note>Joined strips have no gaps.</small></label><label>Size (px)<input type="number" data-swatch-size min="24" max="96"></label></form><div class="palette-example"></div>`;const A=d.querySelector(".palette-example"),ae={theme:D("#5268E0"),modeStorage:!1},N=document.createElement("tk-provider");N.setStore(le(ae),ae);const _=()=>{N.innerHTML=Ee("primary",{shape:c.shape,classes:{root:"brand-palette",label:"brand-shade-label",swatch:"brand-shade"},labels:{500:c.label}});const B=document.createElement("style");B.textContent=$t(c).replaceAll(".brand-palette",`.${v} .brand-palette`).replaceAll(".brand-shade-label",`.${v} .brand-shade-label`).replaceAll(".brand-shade {",`.${v} .brand-shade {`),N.className=v,N.append(B),M.disabled=c.shape==="joined",d.querySelector("[data-swatch-gap-note]").hidden=!M.disabled,T.refresh()};A.append(N);const ce=d.querySelector("[data-swatch-shape]"),de=d.querySelector("[data-swatch-label]"),M=d.querySelector("[data-swatch-gap]"),ee=d.querySelector("[data-swatch-size]");ce.value=c.shape,de.value=c.label,M.value=String(c.gap),ee.value=String(c.size),d.querySelector("form").addEventListener("submit",B=>B.preventDefault()),d.querySelector("form").addEventListener("input",B=>{const H=B.target;H===M&&(!M.validity.valid||!Number.isFinite(M.valueAsNumber))||H===ee&&(!ee.validity.valid||!Number.isFinite(ee.valueAsNumber))||(c={shape:ce.value,label:de.value,gap:H===M?M.valueAsNumber:c.gap,size:H===ee?ee.valueAsNumber:c.size},_())}),_(),l=()=>N.remove()}else{d.innerHTML=`<div class="theme-demo"><div class="theme-controls"></div><div class="sample-host">${Pt(fe(s).roles)}</div></div><details class="configuration"><summary>Generated configuration</summary><div class="output-actions"><label>Format<select data-output-format aria-label="Configuration format"><option value="json">JSON</option><option value="css">CSS</option><option value="tailwind">Tailwind CSS</option></select></label><button type="button" data-copy-output>Copy output</button><button type="button" data-download>Download</button></div><pre tabindex="0"></pre><p data-output-status aria-live="polite"></p></details>`;const v=d.querySelector(".sample-host"),A=d.querySelector("pre"),ae=d.querySelector(".theme-controls"),N=[D("#5268E0",{name:"Indigo"}),D("#277D59",{name:"Forest"}),D("#C25D3D",{name:"Terracotta"})];let _="",ce="",de="";const M=d.querySelector("[data-output-format]");M.value="json";const ee=()=>{A.textContent=M.value==="tailwind"?de:M.value==="css"?ce:_};M.addEventListener("change",ee);const B=H=>{Rt(v,Y(Ao(H))),_=H.json,de=H.tailwind,ce=`:root {
${Object.entries(H.tokens).map(([V,$])=>`  ${V}: ${$};`).join(`
`)}
}`,ee()};if(s==="custom"){const H=rt(p,()=>k());d.prepend(H),h=H.destroy;const V={theme:N[0],mode:"system",modeStorage:!1},$=le(V),U=document.createElement("tk-provider");U.setStore($,V),U.innerHTML=Tt(),U.querySelector("cp-provider").setAttribute("value","#5268E0"),ae.append(U);const E=$.subscribe(()=>B(Y($.getSnapshot(),{roles:["primary"]})));B(Y($.getSnapshot(),{roles:["primary"]})),l=()=>{E(),U.remove()}}else if(s==="presets"){const H={theme:N[0],mode:"system",modeStorage:Ot("docs:theme-mode")},V=le(H),$=document.createElement("tk-provider");$.setStore(V,H);const U=document.createElement("tk-select");U.dataset.themes=JSON.stringify(N),U.innerHTML=`<label class="cp-format">Theme<select>${N.map(P=>`<option value="${P.id}">${P.name}</option>`).join("")}</select></label>`,$.append(U);const w=document.createElement("div");w.className="mode-buttons",w.innerHTML=["system","light","dark"].map(P=>`<button type="button" data-tk-mode="${P}">${P[0].toUpperCase()+P.slice(1)}</button>`).join(""),$.append(w),$.insertAdjacentHTML("beforeend",`<section class="generated-palettes"><h3>Generated shades</h3>${["primary","secondary","accent"].map(P=>`<h4>${P}</h4>${Ee(P,{shape:"joined"})}`).join("")}</section>`),ae.append($);const E=V.subscribe(()=>B(Y(V.getSnapshot())));B(Y(V.getSnapshot())),l=()=>{E(),$.remove()}}else{const H=s==="geometry"?m:fe(s);let V=le({theme:N[0],disabled:s==="disabled",mode:H.modes?.[0]??"light",modeStorage:!1,selection:H}),$;const U=()=>{$?.destroy();const w=s==="geometry"?m:H;V.setSelection(w),w.modes?.length===1&&V.setMode(w.modes[0]),$=Je(ae,{store:V,selection:w,theme:N[0],themes:N,modeStorage:!1,disabled:s==="disabled",radius:w.radius??[],width:w.width??[],backgroundControl:!!w.background,picker:{view:s==="rectangle"||s==="geometry"?"area":s==="single"?"wheel":"shared-wheel",roles:w.roles,controls:!1},onChange:B}),(s==="single"||s==="geometry")&&($.element.querySelector("tk-select")?.remove(),$.element.querySelector(".tk-harmony")?.remove()),(s==="single"||w.modes?.length===1)&&$.element.querySelector('[aria-label="Theme mode"]')?.remove(),$.element.querySelector("details")?.remove();const E=document.createElement("section");E.className="generated-palettes",E.innerHTML=`<h3>Generated shades</h3>${(w.roles??["primary"]).map(P=>`<h4>${P[0].toUpperCase()+P.slice(1)}</h4>${Ee(P,{shape:"joined"})}`).join("")}`,$.element.append(E),B($.getConfiguration())};if(s==="geometry"){const w=document.createElement("div");w.className="geometry-config",w.innerHTML=`<fieldset><legend>Fields included in this editor</legend><table><thead><tr><th>Target</th><th>Radius <small>rem</small></th><th>Border width <small>px</small></th></tr></thead><tbody>${Bt.map(E=>`<tr><th scope="row">${E==="DEFAULT"?"Default":E[0].toUpperCase()+E.slice(1)}</th>${["radius","width"].map(P=>`<td><input type="checkbox" data-geometry="${P}" data-target="${E}" aria-label="Include ${E} ${P}" ${m[P]?.includes(E)?"checked":""}></td>`).join("")}</tr>`).join("")}</tbody></table></fieldset><fieldset class="geometry-modes"><legend>Appearance included in the export</legend>${["light","dark"].map(E=>`<label><input type="checkbox" data-export-mode="${E}" ${m.modes?.includes(E)?"checked":""}>${E==="light"?"Light":"Dark"}</label>`).join("")}<label><input type="checkbox" data-export-background ${m.background?"checked":""}>Background and foreground</label></fieldset>`,w.addEventListener("change",()=>{const E=[...w.querySelectorAll("[data-export-mode]:checked")].map(P=>P.dataset.exportMode);if(!E.length){w.querySelector(`[data-export-mode="${m.modes?.[0]??"light"}"]`).checked=!0;return}m={roles:["primary"],radius:[...w.querySelectorAll('[data-geometry="radius"]:checked')].map(P=>P.dataset.target),width:[...w.querySelectorAll('[data-geometry="width"]:checked')].map(P=>P.dataset.target),modes:E,background:w.querySelector("[data-export-background]").checked},U(),T.refresh()}),d.prepend(w)}U(),l=()=>$.destroy()}d.querySelector("[data-copy-output]").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(M.value==="tailwind"?de:M.value==="css"?ce:_),d.querySelector("[data-output-status]").textContent=`${M.value.toUpperCase()} copied.`}catch{d.querySelector("[data-output-status]").textContent="Select the output and copy it with your keyboard."}}),d.querySelector("[data-download]").addEventListener("click",()=>Mo(M.value==="tailwind"?de:M.value==="css"?ce:_,M.value==="tailwind"?"theme.tailwind.css":M.value==="css"?"theme.css":"theme.json"))}s==="custom"&&k(),T.refresh()};function k(){const v=d.querySelector(".custom-picker,.custom-theme");v&&(v.style.setProperty("--cp-controls-color",p.color),v.style.setProperty("--cp-thumb-size",p.size+"px"),v.style.setProperty("--cp-track-height",p.track+"px"),v.querySelector("[data-cp-part=thumb-text]").textContent=p.text,T.refresh())}return f?.addEventListener("change",()=>{s=f.value,I()}),e.querySelectorAll(".view-tabs button[data-display]").forEach(v=>v.addEventListener("click",()=>{u.dataset.display=v.dataset.display,e.querySelectorAll(".view-tabs button").forEach(A=>A.setAttribute("aria-pressed",String(A===v)))})),I(),()=>{l?.(),h?.()}}function Ao(e){return{theme:e.sourceTheme,disabled:!1,mode:e.mode,modePreference:e.modePreference,systemMode:e.systemMode,status:"ready",pending:!1,error:null,background:e.sourceTheme.backgroundMode??"preserve",style:e.css}}function Mo(e,t){const o=URL.createObjectURL(new Blob([e],{type:"application/json"})),a=document.createElement("a");a.href=o,a.download=t,a.click(),URL.revokeObjectURL(o)}function ot(e){e.classList.add("rendering-lab"),e.innerHTML=`<div class="lab-controls" role="group" aria-label="Rendering scenario"><button data-scenario="standalone" aria-pressed="true">Standalone</button><button data-scenario="success" aria-pressed="false">Fetch success</button><button data-scenario="failure" aria-pressed="false">Fetch error</button><button data-scenario="timeout" aria-pressed="false">Timeout</button></div><div class="lab-description"><p data-lab-description></p><p class="muted" data-lab-request-note>The preview simulates a request locally. The source uses /api/theme. Return a Theme object as JSON. HTTP errors, invalid theme data and timeouts apply the fallback.</p></div><div class="view-tabs lab-view-tabs" role="group" aria-label="Loading example display"><button type="button" data-lab-display="preview" aria-pressed="true">Preview</button><button type="button" data-lab-display="code" aria-pressed="false">Code</button></div><div class="lab-grid" data-lab-display="preview"><div class="lab-preview"><div class="request-status" role="status"><span data-status></span><span data-lab-name></span></div><div data-lab-loading class="loading-example" hidden><div class="loading-bar"></div><h3>Loading theme</h3><p>This area is custom loading content.</p></div><div data-lab-content>${Pt()}</div><div class="error-example" data-lab-error hidden><p></p><button type="button" data-retry>Retry successfully</button></div><div class="lab-replay"><button type="button" data-replay>Run again</button><span data-lab-mode></span></div></div><div data-lab-code></div></div>`;let t,o,a="standalone",n=!1;const i=z(e.querySelector("[data-lab-code]"),h=>xo(h,a),{label:"Theme loading",baseName:"ThemeLoadingExample"}),s={standalone:"A supplied theme is ready immediately. No fetch and no loading screen.",success:"Show custom loading content, then apply the returned theme after 1.2 seconds.",failure:"A failed request applies the Indigo fallback. The error and retry control remain available.",timeout:"A request that never resolves is cancelled after 2 seconds. The fallback is applied automatically."},l=()=>{o?.(),t?.(),n=!1,i.refresh(),e.querySelectorAll("[data-scenario]").forEach(d=>d.setAttribute("aria-pressed",String(d.dataset.scenario===a))),e.querySelector("[data-lab-description]").textContent=s[a];const h=D("#5268E0",{name:"Indigo fallback"}),p=D("#277D59",{name:"Forest response"}),c=a==="standalone"?{theme:p,modeStorage:!1}:{fallbackTheme:h,modeStorage:!1,timeoutMs:a==="timeout"?2e3:5e3,loadTheme:d=>new Promise((b,f)=>{const T=a==="failure"&&!n,I=a==="timeout"&&!n,k=window.setTimeout(()=>T?f(new Error("Simulated request failed.")):b(p),I?2e4:1200);d.addEventListener("abort",()=>{clearTimeout(k),f(new DOMException("Aborted","AbortError"))},{once:!0})})},m=le(c);e.querySelector("[data-lab-request-note]").hidden=a==="standalone";const u=()=>{const d=m.getSnapshot();e.querySelector("[data-status]").textContent=d.pending?"Loading":d.status==="fallback"?"Fallback applied":"Ready",e.querySelector("[data-lab-name]").textContent=d.theme.name,e.querySelector("[data-lab-loading]").hidden=d.status!=="loading",e.querySelector("[data-lab-content]").hidden=d.status==="loading",e.querySelector("[data-lab-error]").hidden=!d.error,e.querySelector("[data-lab-error] p").textContent=d.error?.message??"",e.querySelector("[data-lab-mode]").textContent=`${d.modePreference} / ${d.mode}`,Rt(e.querySelector("[data-lab-content]"),Y(d))};o=m.subscribe(u),u(),t=Vt(m,void 0,c),e.querySelector("[data-retry]").onclick=()=>{n=!0,m.reload()}};return e.querySelectorAll("button[data-lab-display]").forEach(h=>h.addEventListener("click",()=>{e.querySelector(".lab-grid").dataset.labDisplay=h.dataset.labDisplay,e.querySelectorAll("button[data-lab-display]").forEach(p=>p.setAttribute("aria-pressed",String(p===h)))})),e.querySelectorAll("[data-scenario]").forEach(h=>h.addEventListener("click",()=>{a=h.dataset.scenario,l()})),e.querySelector("[data-replay]").addEventListener("click",l),l(),()=>{o?.(),t?.()}}function rt(e,t){const o=document.createElement("div");o.className="customization-form",o.innerHTML=`<p class="customization-title">Live customization</p><label>Thumb text<input data-custom="text" maxlength="3" value="${R(e.text)}"></label><div class="customization-color-field"><span>Controls color</span><div data-custom-color></div></div><label>Thumb size (px)<input data-custom="size" type="number" min="8" max="60" value="${e.size}"></label><label>Track height (px)<input data-custom="track" type="number" min="2" max="24" value="${e.track}"></label>`;const a=Xe(o.querySelector("[data-custom-color]"),{label:"Controls color",value:e.color,onChange:n=>{e.color=n,t()}});return o.addEventListener("input",n=>{const i=n.target,s=i.dataset.custom;if(s){if(s==="text"&&(e.text=i.value),s==="size"||s==="track"){const l=i.valueAsNumber;if(!Number.isFinite(l)||l<Number(i.min)||l>Number(i.max))return;e[s]=l}t()}}),Object.assign(o,{destroy:a.destroy})}function Lo(e,t){const o=a=>`${e}versions/${a}/docs.html?kit=${t}`;return`<main id="main" class="catalog-page release-page">
    <header class="page-heading"><div><p class="product-label">Release notes</p><h1>Changelog</h1></div><div class="page-intro"><p>What's new, what's changed and what's been fixed.</p></div></header>
    <nav class="release-kit-tabs" aria-label="Changelog package">
      <a href="${e}changelog.html?kit=color-picker" ${t==="color-picker"?'aria-current="page"':""}>Color picker</a>
      <a href="${e}changelog.html?kit=theme-studio" ${t==="theme-studio"?'aria-current="page"':""}>Theme studio</a>
    </nav>
    <div class="release-list">${ve.versions.map(a=>{const n=a.date?new Date(a.date+"T12:00:00Z").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"Europe/Bucharest"}):"Not released yet";return`<article class="release-entry" id="v${a.version}">
        <header><div><h2>v${a.version}</h2><span class="release-status" data-status="${a.status}">${a.status==="preview"?"Preview":"Released"}</span><p>${n}</p></div><a href="${o(a.version)}">Read documentation</a></header>
        <div class="release-changes">${Object.entries(a.changes[t]).map(([i,s])=>`<section><h3>${i}</h3><ul>${s.map(l=>`<li>${R(l)}</li>`).join("")}</ul></section>`).join("")}</div>
      </article>`}).join("")}</div>
  </main>`}function qo(e){return e==="React"?`import { useEffect, useState } from 'react';
import { ColorPicker } from '@salyra-ui/color-picker/react';
import { ThemeProvider, ThemeStudio, createThemeStore, createThemeEditor, generateTheme, type ThemeStore } from '@salyra-ui/theme-studio/react';

export default function App() {
  // Create a store for this mounted app, never a shared server module variable.
  const [applied] = useState(() => createThemeStore({theme: generateTheme('#5268E0'), modeStorage:false}));
  return <ThemeProvider store={applied} modeStorage={false}>
    <button style={{background:'hsl(var(--primary))',color:'hsl(var(--primary-foreground))'}}>Applied theme</button>
    <DraftPreview applied={applied} />
  </ThemeProvider>;
}
function DraftPreview({applied}: {applied:ThemeStore}) {
  const [editor, setEditor] = useState<ReturnType<typeof createThemeEditor> | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const next = createThemeEditor(applied);
    setEditor(next);
    return () => next.destroy();
  }, [applied]);
  if (!editor) return <p role="status">Preparing editor…</p>;
  return <ThemeStudio.Root store={editor.store} options={{modeStorage:false}}>
    <ThemeStudio.Scope className="draft-preview">
      <ThemeStudio.PickerRoot roles={['primary']}>
        <label>Draft primary<ColorPicker.Input format="hex" /></label>
      </ThemeStudio.PickerRoot>
      <button style={{background:'hsl(var(--primary))',color:'hsl(var(--primary-foreground))'}}>Draft theme</button>
      <button onClick={() => {try {editor.apply();setError('');} catch(e) {setError(String(e));}}}>Save</button>
      <button onClick={() => {editor.cancel();setError('');}}>Cancel</button>
      <p role="status">{error}</p>
    </ThemeStudio.Scope>
  </ThemeStudio.Root>;
}`:e==="Svelte"?`<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ColorPicker } from '@salyra-ui/color-picker/svelte';
  import { ThemeProvider, ThemeStudio, createThemeStore, createThemeEditor, generateTheme } from '@salyra-ui/theme-studio/svelte';
  const applied = createThemeStore({theme:generateTheme('#5268E0'),modeStorage:false});
  const editor = createThemeEditor(applied);
  let error = $state('');
  function save() {try {editor.apply();error='';} catch(e) {error=String(e);}}
  onDestroy(() => editor.destroy());
<\/script>

<ThemeProvider store={applied} options={{modeStorage:false}}>
  <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Applied theme</button>
  <ThemeStudio.Root store={editor.store} options={{modeStorage:false}}>
    <ThemeStudio.Scope class="draft-preview">
      <ThemeStudio.PickerRoot roles={['primary']}>
        <label>Draft primary<ColorPicker.Input format="hex" /></label>
      </ThemeStudio.PickerRoot>
      <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Draft theme</button>
      <button onclick={save}>Save</button>
      <button onclick={() => {editor.cancel();error='';}}>Cancel</button>
      <p role="status">{error}</p>
    </ThemeStudio.Scope>
  </ThemeStudio.Root>
</ThemeProvider>`:e==="Vue"?`<script setup lang="ts">
import { onScopeDispose, ref } from 'vue';
import { ColorPicker } from '@salyra-ui/color-picker/vue';
import { ThemeProvider, ThemeStudio, createThemeStore, createThemeEditor, generateTheme } from '@salyra-ui/theme-studio/vue';
const applied = createThemeStore({theme:generateTheme('#5268E0'),modeStorage:false});
const editor = createThemeEditor(applied);
const error = ref('');
function save() {try {editor.apply();error.value='';} catch(e) {error.value=String(e);}}
onScopeDispose(() => editor.destroy());
<\/script>
<template>
  <ThemeProvider :store="applied" :options="{modeStorage:false}">
    <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Applied theme</button>
    <ThemeStudio.Root :store="editor.store" :options="{modeStorage:false}">
      <ThemeStudio.Scope class="draft-preview">
        <ThemeStudio.PickerRoot :roles="['primary']">
          <label>Draft primary<ColorPicker.Input format="hex" /></label>
        </ThemeStudio.PickerRoot>
        <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Draft theme</button>
        <button @click="save">Save</button>
        <button @click="editor.cancel();error=''">Cancel</button>
        <p role="status">{{error}}</p>
      </ThemeStudio.Scope>
    </ThemeStudio.Root>
  </ThemeProvider>
</template>`:e==="Angular"?`import { Component, DestroyRef, inject } from '@angular/core';
import { ColorField } from '@salyra-ui/color-picker/angular';
import { ThemeProvider, ThemeRoot, ThemeVariableScope, ThemePickerRoot, createThemeStore, createThemeEditor, generateTheme } from '@salyra-ui/theme-studio/angular';
@Component({
  selector:'app-root', standalone:true,
  imports:[ThemeProvider,ThemeRoot,ThemeVariableScope,ThemePickerRoot,ColorField],
  template:\`<tk-provider [store]="applied" [options]="options">
    <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Applied theme</button>
    <section tkRoot [store]="editor.store" [options]="options">
      <div tkScope class="draft-preview">
        <div tkPickerRoot [options]="pickerOptions"><label>Draft primary<input cpInput format="hex" /></label></div>
        <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Draft theme</button>
        <button (click)="save()">Save</button>
        <button (click)="editor.cancel();error=''">Cancel</button>
        <p role="status">{{error}}</p>
      </div>
    </section>
  </tk-provider>\`,
})
export class AppComponent {
  readonly options = {modeStorage:false as const};
  readonly pickerOptions = {roles:['primary'] as const};
  readonly applied = createThemeStore({theme:generateTheme('#5268E0'),...this.options});
  readonly editor = createThemeEditor(this.applied);
  error = '';
  constructor() {inject(DestroyRef).onDestroy(() => this.editor.destroy());}
  save() {try {this.editor.apply();this.error='';} catch(e) {this.error=String(e);}}
}`:e==="Astro"?`---
import ThemeProvider from '@salyra-ui/theme-studio/astro/ThemeProvider.astro';
import ThemeRoot from '@salyra-ui/theme-studio/astro/ThemeRoot.astro';
import ThemeVariableScope from '@salyra-ui/theme-studio/astro/ThemeVariableScope.astro';
import ThemePickerRoot from '@salyra-ui/theme-studio/astro/ThemePickerRoot.astro';
import ColorField from '@salyra-ui/color-picker/astro/ColorField.astro';
import { generateTheme } from '@salyra-ui/theme-studio';
const value = '#5268E0';
const options = {theme:generateTheme(value),modeStorage:false as const};
---
<ThemeProvider {...options} scopeProps={{id:'applied-preview'}}>
  <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Applied theme</button>
  <ThemeRoot id="draft-root" {options}>
    <ThemeVariableScope {options} class="draft-preview">
      <ThemePickerRoot roles={['primary']}>
        <label>Draft primary<ColorField {value} format="hex" /></label>
      </ThemePickerRoot>
      <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Draft theme</button>
      <button id="save-draft">Save</button><button id="cancel-draft">Cancel</button>
      <p id="draft-error" role="status"></p>
    </ThemeVariableScope>
  </ThemeRoot>
</ThemeProvider>
<script>
  import { createThemeEditor, type ThemeRootElement } from '@salyra-ui/theme-studio/vanilla';
  const applied = document.querySelector('#applied-preview')!.closest('tk-root') as ThemeRootElement;
  const root = document.querySelector('#draft-root') as ThemeRootElement;
  if (!applied.store) throw new Error('The app theme root has not initialized');
  const editor = createThemeEditor(applied.store);
  root.setStore(editor.store,{modeStorage:false});
  const error = document.querySelector('#draft-error')!;
  document.querySelector('#save-draft')!.addEventListener('click',() => {
    try {editor.apply();error.textContent='';} catch(e) {error.textContent=String(e);}
  });
  document.querySelector('#cancel-draft')!.addEventListener('click',() => {editor.cancel();error.textContent='';});
  window.addEventListener('pagehide',event => {if (!event.persisted) editor.destroy();});
<\/script>`:`<section id="app-theme">
  <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Applied theme</button>
  <section id="draft-preview">
    <label>Draft primary<input data-cp-control="input" data-format="hex" /></label>
    <button style="background:hsl(var(--primary));color:hsl(var(--primary-foreground))">Draft theme</button>
    <button id="save-draft">Save</button><button id="cancel-draft">Cancel</button>
    <p id="draft-error" role="status"></p>
  </section>
</section>
<script src="./assets/theme-studio.min.js"><\/script>
<script>
  const {createThemeStore,createThemeEditor,generateTheme,mountThemeStore,bindThemeScope,mountThemeControls} = ThemeStudio;
  const applied = createThemeStore({theme:generateTheme('#5268E0'),modeStorage:false});
  const editor = createThemeEditor(applied);
  const stopApp = mountThemeStore(applied,undefined,{modeStorage:false});
  const appScope = bindThemeScope(document.querySelector('#app-theme'),applied);
  const draftScope = bindThemeScope(document.querySelector('#draft-preview'),editor.store);
  const controls = mountThemeControls(document.querySelector('#draft-preview'),editor.store,{roles:['primary']});
  const error = document.querySelector('#draft-error');
  const save = () => {try {editor.apply();error.textContent='';} catch(e) {error.textContent=String(e);}};
  const cancel = () => {editor.cancel();error.textContent='';};
  const saveButton = document.querySelector('#save-draft'), cancelButton = document.querySelector('#cancel-draft');
  saveButton.addEventListener('click',save);
  cancelButton.addEventListener('click',cancel);
  window.addEventListener('pagehide',event => {
    if (event.persisted) return;
    saveButton.removeEventListener('click',save);
    cancelButton.removeEventListener('click',cancel);
    controls.destroy();draftScope();appScope();stopApp();editor.destroy();
  });
<\/script>`}const Ho=`import { useState } from 'react';
import { ColorPicker } from '@salyra-ui/color-picker/react';
export default function ColorExample() {
  const [value, setValue] = useState('#5268E080');
  return (
    <ColorPicker.Root value={value} onValueChange={setValue}>
      <div className="composition-editor" data-composition="color">
        <ColorPicker.Wheel className="composition-wheel">
          <ColorPicker.Thumb className="composition-dot">
            <span className="composition-dot-text">Pick</span>
          </ColorPicker.Thumb>
        </ColorPicker.Wheel>
        <div className="composition-fields">
          <label>
            <span>Brightness</span>
            <ColorPicker.Slider channel="v" />
          </label>
          <label>
            <span>Opacity</span>
            <ColorPicker.Slider channel="alpha" />
          </label>
          <div className="composition-channels">
            {(['Red', 'Green', 'Blue'] as const).map((label, index) => (
              <label key={label}>
                <span>{label}</span>
                <ColorPicker.ChannelInput
                  format="rgb"
                  index={index as 0 | 1 | 2}
                />
              </label>
            ))}
          </div>
          <label>
            <span>Color value</span>
            <ColorPicker.Input />
          </label>
          <ColorPicker.FormatTrigger
            render={(color) =>
              \`Show next format (\${color.format.toUpperCase()})\`
            }
          />
          <ColorPicker.EyeDropper>Pick from screen</ColorPicker.EyeDropper>
          <output>{value}</output>
        </div>
      </div>
    </ColorPicker.Root>
  );
}
`,No=`<script lang="ts">
  import { ColorPicker } from '@salyra-ui/color-picker/svelte';
  let value = $state('#5268E080');
<\/script>

<ColorPicker.Root bind:value>
  <div class="composition-editor" data-composition="color">
    <ColorPicker.Wheel class="composition-wheel">
      <ColorPicker.Thumb class="composition-dot"
        ><span class="composition-dot-text">Pick</span></ColorPicker.Thumb
      >
    </ColorPicker.Wheel>
    <div class="composition-fields">
      <label><span>Brightness</span><ColorPicker.Slider channel="v" /></label>
      <label><span>Opacity</span><ColorPicker.Slider channel="alpha" /></label>
      <div class="composition-channels">
        <label
          ><span>Red</span><ColorPicker.ChannelInput
            format="rgb"
            index={0}
          /></label
        >
        <label
          ><span>Green</span><ColorPicker.ChannelInput
            format="rgb"
            index={1}
          /></label
        >
        <label
          ><span>Blue</span><ColorPicker.ChannelInput
            format="rgb"
            index={2}
          /></label
        >
      </div>
      <label><span>Color value</span><ColorPicker.Input /></label>
      <ColorPicker.FormatTrigger
        >{#snippet children(color)}Show next format ({color.format.toUpperCase()}){/snippet}</ColorPicker.FormatTrigger
      >
      <ColorPicker.EyeDropper
        >{#snippet children(state)}{state.pending
            ? 'Picking…'
            : 'Pick from screen'}{/snippet}</ColorPicker.EyeDropper
      >
      <output>{value}</output>
    </div>
  </div>
</ColorPicker.Root>
`,Io=`<script setup lang="ts">
import { ref } from 'vue';
import { ColorPicker } from '@salyra-ui/color-picker/vue';
const value = ref('#5268E080');
<\/script>
<template>
  <ColorPicker.Root v-model="value"
    ><div class="composition-editor" data-composition="color">
      <ColorPicker.Wheel class="composition-wheel"
        ><ColorPicker.Thumb class="composition-dot"
          ><span class="composition-dot-text">Pick</span></ColorPicker.Thumb
        ></ColorPicker.Wheel
      >
      <div class="composition-fields">
        <label><span>Brightness</span><ColorPicker.Slider channel="v" /></label
        ><label
          ><span>Opacity</span><ColorPicker.Slider channel="alpha"
        /></label>
        <div class="composition-channels">
          <label v-for="(label, index) in ['Red', 'Green', 'Blue']" :key="label"
            ><span>{{ label }}</span
            ><ColorPicker.ChannelInput format="rgb" :index="index as 0 | 1 | 2"
          /></label>
        </div>
        <label><span>Color value</span><ColorPicker.Input /></label
        ><ColorPicker.FormatTrigger v-slot="{ state }"
          >Show next format ({{
            state.format.toUpperCase()
          }})</ColorPicker.FormatTrigger
        ><ColorPicker.EyeDropper>Pick from screen</ColorPicker.EyeDropper>
        <output>{{ value }}</output>
      </div>
    </div></ColorPicker.Root
  >
</template>
`,Fo=`import { Component } from '@angular/core';
import {
  ColorRoot,
  ColorPlane,
  ColorThumb,
  ColorRange,
  ColorField,
  ColorEyeDropper,
  ColorFormatTrigger,
  createColorStore,
} from '@salyra-ui/color-picker/angular';
@Component({
  selector: 'color-composition',
  standalone: true,
  imports: [
    ColorRoot,
    ColorPlane,
    ColorThumb,
    ColorRange,
    ColorField,
    ColorEyeDropper,
    ColorFormatTrigger,
  ],
  template: \` <section cpRoot [store]="store">
    <div class="composition-editor" data-composition="color">
      <div cpWheel class="composition-wheel" aria-label="Brand color">
        <span cpThumb class="composition-dot"
          ><span class="composition-dot-text">Pick</span></span
        >
      </div>
      <div class="composition-fields">
        <label><span>Brightness</span><input cpSlider="v" /></label
        ><label><span>Opacity</span><input cpSlider="alpha" /></label>
        <div class="composition-channels">
          <label
            ><span>Red</span><input cpInput format="rgb" [index]="0" /></label
          ><label
            ><span>Green</span><input cpInput format="rgb" [index]="1" /></label
          ><label
            ><span>Blue</span><input cpInput format="rgb" [index]="2"
          /></label>
        </div>
        <label><span>Color value</span><input cpInput /></label
        ><button cpFormatTrigger>Show next format</button>
        <button cpEyeDropper>Pick from screen</button>
      </div>
    </div>
  </section>\`,
})
export class ColorComposition {
  readonly store = createColorStore('#5268E080');
}
`,Do=`---
import ColorEyeDropper from '@salyra-ui/color-picker/astro/ColorEyeDropper.astro';
import ColorRoot from '@salyra-ui/color-picker/astro/ColorRoot.astro';
import ColorWheel from '@salyra-ui/color-picker/astro/ColorWheelSurface.astro';
import ColorThumb from '@salyra-ui/color-picker/astro/ColorThumb.astro';
import ColorSlider from '@salyra-ui/color-picker/astro/ColorRange.astro';
import ColorInput from '@salyra-ui/color-picker/astro/ColorField.astro';
import ColorFormatTrigger from '@salyra-ui/color-picker/astro/ColorFormatTrigger.astro';
const value = '#5268E080';
---

<ColorRoot {value}>
  <div class="composition-editor" data-composition="color">
    <ColorWheel {value} class="composition-wheel">
      <ColorThumb {value} view="wheel" class="composition-dot">
        <span class="composition-dot-text">Pick</span>
      </ColorThumb>
    </ColorWheel>
    <div class="composition-fields">
      <label>
        <span>Brightness</span>
        <ColorSlider {value} channel="v" />
      </label>
      <label>
        <span>Opacity</span>
        <ColorSlider {value} channel="alpha" />
      </label>
      <div class="composition-channels">
        {['Red', 'Green', 'Blue'].map((label, index) => (
          <label>
            <span>{label}</span>
            <ColorInput {value} format="rgb" index={index as 0 | 1 | 2} />
          </label>
        ))}
      </div>
      <label>
        <span>Color value</span>
        <ColorInput {value} />
      </label>
      <ColorFormatTrigger>Show next format</ColorFormatTrigger>
      <ColorEyeDropper>Pick from screen</ColorEyeDropper>
    </div>
  </div>
</ColorRoot>
`,Bo=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Custom color picker</title>
  </head>
  <body>
    <div class="composition-editor" data-composition="color">
      <div
        class="composition-wheel"
        data-cp-control="wheel"
        role="group"
        aria-label="Brand color"
      >
        <span data-cp-part="thumb" class="composition-dot"
          ><span class="composition-dot-text">Pick</span></span
        >
      </div>
      <div class="composition-fields">
        <label
          ><span>Brightness</span
          ><input
            type="range"
            min="0"
            max="100"
            data-cp-control="slider"
            data-channel="v" /></label
        ><label
          ><span>Opacity</span
          ><input
            type="range"
            min="0"
            max="100"
            step=".1"
            data-cp-control="slider"
            data-channel="alpha"
        /></label>
        <div class="composition-channels">
          <label
            ><span>Red</span
            ><input
              type="number"
              data-cp-control="input"
              data-format="rgb"
              data-index="0" /></label
          ><label
            ><span>Green</span
            ><input
              type="number"
              data-cp-control="input"
              data-format="rgb"
              data-index="1" /></label
          ><label
            ><span>Blue</span
            ><input
              type="number"
              data-cp-control="input"
              data-format="rgb"
              data-index="2"
          /></label>
        </div>
        <label><span>Color value</span><input data-cp-control="input" /></label
        ><button type="button" data-cp-control="format">Show next format</button
        ><button type="button" data-cp-control="eyedropper">
          Pick from screen
        </button>
        <output></output>
      </div>
    </div>
    <script src="/assets/color-picker.min.js"><\/script>
    <script>
      const root = document.querySelector('[data-composition="color"]');
      const store = ColorPicker.createColorStore('#5268E080');
      const controls = ColorPicker.mountColorControls(root, store);
      const render = () =>
        (root.querySelector('output').textContent = store.getSnapshot().value);
      render();
      const unsubscribe = store.subscribe(render);
      // When this editor is removed, call controls.destroy() and unsubscribe().
    <\/script>
  </body>
</html>
`,Vo=`import { ColorPicker } from '@salyra-ui/color-picker/react';
import {
  ThemeStudio,
  ThemeExport,
  ThemePalette,
  generateTheme,
} from '@salyra-ui/theme-studio/react';
const options = {
  theme: generateTheme('#5268E0'),
  mode: 'dark' as const,
  modeStorage: false as const,
  selection: {
    roles: ['primary', 'accent'] as const,
    radius: ['card'] as const,
    width: ['button'] as const,
  },
};
export default function ThemeExample() {
  return (
    <ThemeStudio.Root options={options}>
      <ThemeStudio.Scope>
        <ThemeStudio.PickerRoot roles={['primary', 'accent']}>
          <div className="composition-editor" data-composition="theme">
            <ThemeStudio.Wheel className="composition-wheel" />
            <div className="composition-fields">
              <div className="composition-roles">
                <ThemeStudio.RoleTrigger role="primary">
                  Brand color
                </ThemeStudio.RoleTrigger>
                <ThemeStudio.RoleTrigger role="accent">
                  Highlight
                </ThemeStudio.RoleTrigger>
              </div>
              <label>
                <span>Brightness</span>
                <ColorPicker.Slider channel="v" />
              </label>
              <label>
                <span>Active color</span>
                <ColorPicker.Input format="hex" />
              </label>
              <label>
                <span>Card corners in rem</span>
                <ThemeStudio.GeometryInput kind="radius" target="card" />
              </label>
              <label>
                <span>Button border in px</span>
                <ThemeStudio.GeometryInput kind="width" target="button" />
              </label>
              <ColorPicker.EyeDropper>
                Pick active color from screen
              </ColorPicker.EyeDropper>
              <article className="composition-preview">
                <h3>Live theme</h3>
                <button type="button">Continue</button>
              </article>
            </div>
          </div>
        </ThemeStudio.PickerRoot>
        <ThemePalette role="primary" shape="joined" />
        <details>
          <summary>Selected configuration</summary>
          <ThemeExport />
        </details>
      </ThemeStudio.Scope>
    </ThemeStudio.Root>
  );
}
`,Oo=`<script lang="ts">
  import { ColorPicker } from '@salyra-ui/color-picker/svelte';
  import {
    ThemeStudio,
    ThemeExport,
    ThemePalette,
    generateTheme,
  } from '@salyra-ui/theme-studio/svelte';
  const options = {
    theme: generateTheme('#5268E0'),
    mode: 'dark' as const,
    modeStorage: false as const,
    selection: {
      roles: ['primary', 'accent'] as const,
      radius: ['card'] as const,
      width: ['button'] as const,
    },
  };
<\/script>

<ThemeStudio.Root {options}>
  <ThemeStudio.Scope>
    <ThemeStudio.PickerRoot roles={['primary', 'accent']}>
      <div class="composition-editor" data-composition="theme">
        <ThemeStudio.Wheel class="composition-wheel" />
        <div class="composition-fields">
          <div class="composition-roles">
            <ThemeStudio.RoleTrigger role="primary"
              >Brand color</ThemeStudio.RoleTrigger
            ><ThemeStudio.RoleTrigger role="accent"
              >Highlight</ThemeStudio.RoleTrigger
            >
          </div>
          <label
            ><span>Brightness</span><ColorPicker.Slider channel="v" /></label
          >
          <label
            ><span>Active color</span><ColorPicker.Input format="hex" /></label
          >
          <label
            ><span>Card corners in rem</span><ThemeStudio.GeometryInput
              kind="radius"
              target="card"
            /></label
          >
          <label
            ><span>Button border in px</span><ThemeStudio.GeometryInput
              kind="width"
              target="button"
            /></label
          >
          <ColorPicker.EyeDropper
            >Pick active color from screen</ColorPicker.EyeDropper
          >
          <article class="composition-preview">
            <h3>Live theme</h3>
            <button type="button">Continue</button>
          </article>
        </div>
      </div>
    </ThemeStudio.PickerRoot>
    <ThemePalette role="primary" shape="joined" />
    <details><summary>Selected configuration</summary><ThemeExport /></details>
  </ThemeStudio.Scope>
</ThemeStudio.Root>
`,jo=`<script setup lang="ts">
import { ColorPicker } from '@salyra-ui/color-picker/vue';
import {
  ThemeStudio,
  ThemeExport,
  ThemePalette,
  generateTheme,
} from '@salyra-ui/theme-studio/vue';
const options = {
  theme: generateTheme('#5268E0'),
  mode: 'dark' as const,
  modeStorage: false as const,
  selection: {
    roles: ['primary', 'accent'] as const,
    radius: ['card'] as const,
    width: ['button'] as const,
  },
};
<\/script>
<template>
  <ThemeStudio.Root :options="options"
    ><ThemeStudio.Scope>
      <ThemeStudio.PickerRoot :roles="['primary', 'accent']"
        ><div class="composition-editor" data-composition="theme">
          <ThemeStudio.Wheel class="composition-wheel" />
          <div class="composition-fields">
            <div class="composition-roles">
              <ThemeStudio.RoleTrigger role="primary"
                >Brand color</ThemeStudio.RoleTrigger
              ><ThemeStudio.RoleTrigger role="accent"
                >Highlight</ThemeStudio.RoleTrigger
              >
            </div>
            <label
              ><span>Brightness</span><ColorPicker.Slider channel="v" /></label
            ><label
              ><span>Active color</span><ColorPicker.Input format="hex"
            /></label>
            <label
              ><span>Card corners in rem</span
              ><ThemeStudio.GeometryInput kind="radius" target="card" /></label
            ><label
              ><span>Button border in px</span
              ><ThemeStudio.GeometryInput kind="width" target="button"
            /></label>
            <ColorPicker.EyeDropper
              >Pick active color from screen</ColorPicker.EyeDropper
            >
            <article class="composition-preview">
              <h3>Live theme</h3>
              <button type="button">Continue</button>
            </article>
          </div>
        </div></ThemeStudio.PickerRoot
      ><ThemePalette role="primary" shape="joined" />
      <details>
        <summary>Selected configuration</summary>
        <ThemeExport />
      </details> </ThemeStudio.Scope
  ></ThemeStudio.Root>
</template>
`,Uo=`import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  ColorEyeDropper,
  ColorField,
  ColorRange,
  ColorPlane,
  thumbPosition,
} from '@salyra-ui/color-picker/angular';
import {
  ThemeRoot,
  ThemeVariableScope,
  ThemePickerRoot,
  ThemeRoleTrigger,
  ThemeGeometryInput,
  ThemeExport,
  generateTheme,
  createThemeStore,
  createThemePickerStore,
  themePickerMarkers,
} from '@salyra-ui/theme-studio/angular';
@Component({
  selector: 'theme-composition',
  standalone: true,
  imports: [
    ThemeRoot,
    ThemeVariableScope,
    ThemePickerRoot,
    ThemeRoleTrigger,
    ThemeGeometryInput,
    ThemeExport,
    ColorEyeDropper,
    ColorField,
    ColorRange,
    ColorPlane,
  ],
  template: \` <section tkRoot [store]="store">
    <div tkScope>
      <div tkPickerRoot [picker]="picker">
        <div class="composition-editor" data-composition="theme">
          <div
            cpWheel
            class="composition-wheel"
            [cpMarkers]="markers()"
            [cpActiveId]="state().activeRole"
            (markerSelect)="select($event)"
            (markerChange)="change($event)"
          >
            @for (marker of markers(); track marker.id) {
              <button
                type="button"
                class="cp-wheel-marker"
                [attr.data-marker-id]="marker.id"
                [attr.aria-label]="marker.ariaLabel"
                [attr.aria-pressed]="state().activeRole === marker.id"
                [disabled]="state().colors[state().activeRole].disabled"
                [style.position]="'absolute'"
                [style.transform]="'translate(-50%,-50%)'"
                [style.left]="position(marker).left"
                [style.top]="position(marker).top"
                [style.background]="marker.color.hex"
              >
                {{ marker.label }}
              </button>
            }
          </div>
          <div class="composition-fields">
            <div class="composition-roles">
              <button tkRoleTrigger="primary">Brand color</button
              ><button tkRoleTrigger="accent">Highlight</button>
            </div>
            <label><span>Brightness</span><input cpSlider="v" /></label
            ><label
              ><span>Active color</span><input cpInput format="hex"
            /></label>
            <label
              ><span>Card corners in rem</span
              ><input tkGeometry="radius" target="card" /></label
            ><label
              ><span>Button border in px</span
              ><input tkGeometry="width" target="button"
            /></label>
            <button cpEyeDropper>Pick active color from screen</button>
            <article class="composition-preview">
              <h3>Live theme</h3>
              <button type="button">Continue</button>
            </article>
          </div>
        </div>
        <details>
          <summary>Selected configuration</summary>
          <tk-export />
        </details>
      </div>
    </div>
  </section>\`,
})
export class ThemeComposition {
  readonly store = createThemeStore({
    theme: generateTheme('#5268E0'),
    mode: 'dark',
    modeStorage: false,
    selection: {
      roles: ['primary', 'accent'],
      radius: ['card'],
      width: ['button'],
    },
  });
  readonly picker = createThemePickerStore(this.store, {
    roles: ['primary', 'accent'],
  });
  readonly state = signal(this.picker.getSnapshot());
  constructor() {
    inject(DestroyRef).onDestroy(
      this.picker.subscribe(() => this.state.set(this.picker.getSnapshot())),
    );
  }
  readonly markers = () => themePickerMarkers(this.state());
  readonly position = (marker: ReturnType<typeof themePickerMarkers>[number]) =>
    thumbPosition(marker.color, 'wheel');
  select(id: string) {
    this.picker.selectRole(id as 'primary' | 'accent');
  }
  change(event: {
    id: string;
    hsv: Partial<{ h: number; s: number; v: number }>;
  }) {
    this.picker.setHSV(event.id as 'primary' | 'accent', event.hsv);
  }
}
`,Wo=`---
import ColorEyeDropper from '@salyra-ui/color-picker/astro/ColorEyeDropper.astro';
import ThemeVariableScope from '@salyra-ui/theme-studio/astro/ThemeVariableScope.astro';
import ThemeRoot from '@salyra-ui/theme-studio/astro/ThemeRoot.astro';
import ThemePickerRoot from '@salyra-ui/theme-studio/astro/ThemePickerRoot.astro';
import ThemeRoleTrigger from '@salyra-ui/theme-studio/astro/ThemeRoleTrigger.astro';
import ThemeWheel from '@salyra-ui/theme-studio/astro/ThemePickerWheel.astro';
import ThemeGeometryInput from '@salyra-ui/theme-studio/astro/ThemeGeometryInput.astro';
import ThemeExport from '@salyra-ui/theme-studio/astro/ThemeExport.astro';
import ColorSlider from '@salyra-ui/color-picker/astro/ColorRange.astro';
import ColorInput from '@salyra-ui/color-picker/astro/ColorField.astro';
import { generateTheme } from '@salyra-ui/theme-studio';
const value = '#5268E0',
  theme = generateTheme(value),
  roles = ['primary', 'accent'] as const;
const options = {
  theme,
  mode: 'dark' as const,
  modeStorage: false as const,
  selection: { roles, radius: ['card'] as const, width: ['button'] as const },
};
---

<ThemeRoot {options}>
  <ThemeVariableScope {options}>
    <ThemePickerRoot {roles}>
      <div class="composition-editor" data-composition="theme">
        <ThemeWheel {theme} {roles} class="composition-wheel" />
        <div class="composition-fields">
          <div class="composition-roles">
            <ThemeRoleTrigger role="primary">Brand color</ThemeRoleTrigger>
            <ThemeRoleTrigger role="accent">Highlight</ThemeRoleTrigger>
          </div>
          <label>
            <span>Brightness</span>
            <ColorSlider {value} channel="v" />
          </label>
          <label>
            <span>Active color</span>
            <ColorInput {value} format="hex" />
          </label>
          <label>
            <span>Card corners in rem</span>
            <ThemeGeometryInput {theme} kind="radius" target="card" />
          </label>
          <label>
            <span>Button border in px</span>
            <ThemeGeometryInput {theme} kind="width" target="button" />
          </label>
          <ColorEyeDropper>Pick active color from screen</ColorEyeDropper>
          <article class="composition-preview">
            <h3>Live theme</h3>
            <button type="button">Continue</button>
          </article>
        </div>
      </div>
      <details>
        <summary>Selected configuration</summary>
        <ThemeExport {theme} selection={options.selection} />
      </details>
    </ThemePickerRoot>
  </ThemeVariableScope>
</ThemeRoot>
`,Go=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="./styles.css" />
    <title>Custom theme editor</title>
  </head>
  <body>
    <section data-composition="theme">
      <div class="composition-editor">
        <div
          class="composition-wheel"
          data-tk-control="wheel"
          role="group"
          aria-label="Theme colors"
        >
          <button
            type="button"
            data-marker-id="primary"
            data-cp-part="marker"
            aria-label="Brand color"
          >
            P</button
          ><button
            type="button"
            data-marker-id="accent"
            data-cp-part="marker"
            aria-label="Highlight"
          >
            A
          </button>
        </div>
        <div class="composition-fields">
          <div class="composition-roles">
            <button type="button" data-tk-control="role" data-role="primary">
              Brand color</button
            ><button type="button" data-tk-control="role" data-role="accent">
              Highlight
            </button>
          </div>
          <label
            ><span>Brightness</span
            ><input
              type="range"
              min="0"
              max="100"
              data-cp-control="slider"
              data-channel="v" /></label
          ><label
            ><span>Active color</span
            ><input data-cp-control="input" data-format="hex"
          /></label>
          <label
            ><span>Card corners in rem</span
            ><input
              type="number"
              min="0"
              max="1000"
              step=".125"
              data-tk-control="geometry"
              data-kind="radius"
              data-target="card" /></label
          ><label
            ><span>Button border in px</span
            ><input
              type="number"
              min="0"
              max="1000"
              data-tk-control="geometry"
              data-kind="width"
              data-target="button"
          /></label>
          <button type="button" data-cp-control="eyedropper">
            Pick active color from screen
          </button>
          <article class="composition-preview">
            <h3>Live theme</h3>
            <button type="button">Continue</button>
          </article>
        </div>
      </div>
      <details>
        <summary>Selected configuration</summary>
        <pre data-configuration></pre>
      </details>
    </section>
    <script src="/assets/theme-studio.min.js"><\/script>
    <script>
      const root = document.querySelector('[data-composition="theme"]');
      const store = ThemeStudio.createThemeStore({
        theme: ThemeStudio.generateTheme('#5268E0'),
        mode: 'dark',
        modeStorage: false,
      });
      const scope = ThemeStudio.bindThemeScope(root, store);
      const controls = ThemeStudio.mountThemeControls(root, store, {
        roles: ['primary', 'accent'],
      });
      const render = () =>
        (root.querySelector('[data-configuration]').textContent =
          controls.getConfiguration().json);
      render();
      const unsubscribe = store.subscribe(render);
      // On removal, call controls.destroy(), scope() and unsubscribe().
    <\/script>
  </body>
</html>
`,zo=`.composition-editor {
  display: grid;
  grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
  padding: 24px;
  border: 1px solid #dcdce2;
  background: #fff;
  color: #17171a;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
.composition-wheel {
  width: 100%;
  max-width: 240px;
}
.composition-dot {
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #17171a;
}
.composition-dot-text {
  position: absolute;
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
  font-size: 11px;
  background: #17171a;
  color: #fff;
  padding: 3px 6px;
  white-space: nowrap;
}
.composition-fields {
  display: grid;
  gap: 16px;
  min-width: 0;
}
.composition-fields label {
  display: grid;
  gap: 8px;
  min-width: 0;
  font-size: 13px;
}
.composition-fields input:not([type='range']) {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 8px 10px;
  border: 1px solid #dcdce2;
  border-radius: 6px;
  background: #fff;
  color: #17171a;
  font: inherit;
}
.composition-fields input[aria-invalid='true'] {
  outline: 2px solid #e4002b;
}
.composition-fields input[type='range'] {
  width: 100%;
  accent-color: #e4002b;
}
.composition-channels {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.composition-fields button {
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid #dcdce2;
  border-radius: 6px;
  background: #fff;
  color: #17171a;
  font: inherit;
  cursor: pointer;
}
.composition-roles {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.composition-roles [aria-pressed='true'] {
  border-color: #17171a;
  background: #17171a;
  color: #fff;
}
.composition-wheel [data-cp-part='marker'] {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 2px solid white;
  border-radius: 6px;
  color: #fff;
  font-size: 11px;
  text-shadow: 0 1px 2px #000;
  box-shadow: 0 0 0 1px #17171a;
}
.composition-wheel [data-cp-part='marker'][data-small='true'] {
  width: 14px;
  height: 14px;
}
.composition-preview {
  padding: 20px;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border-radius: var(--border-radius-card);
}
.composition-preview h3 {
  margin: 0 0 16px;
  font-size: 18px;
}
.composition-preview button {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: var(--border-width-button) solid hsl(var(--accent));
}
.composition-editor :focus-visible {
  outline: 2px solid #e4002b;
  outline-offset: 3px;
}
.composition-editor :disabled {
  opacity: 0.5;
  cursor: default;
}
@media (max-width: 600px) {
  .composition-editor {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px;
  }
  .composition-wheel {
    margin-inline: auto;
  }
}
`,Oe={"color-picker":{React:Ho,Svelte:No,Vue:Io,Angular:Fo,Astro:Do,Vanilla:Bo},"theme-studio":{React:Vo,Svelte:Oo,Vue:jo,Angular:Uo,Astro:Wo,Vanilla:Go}};function Jo(e,t){const o={React:"tsx",Svelte:"svelte",Vue:"vue",Angular:"ts",Astro:"astro",Vanilla:"html"}[t],a=Oe[e][t];return[{name:`${e==="color-picker"?"Color":"Theme"}Example.${o}`,code:a},{name:"styles.css",code:zo},{name:"README.md",code:`# Composable ${e}

This example uses the v1 composition API.

Keep styles.css next to the example and import it in your application entry. The example styles are local to .composition-editor.

${t==="Vanilla"?"Download "+e+".min.js from the documentation downloads and place it at /assets/"+e+".min.js. The standard .js build has the same API. No framework or default stylesheet is required.":"Install @salyra-ui/"+e+" and your framework. Import styles.css once. ThemePalette and ThemeExport are ready-made presets and use @salyra-ui/theme-studio/styles.min.css. Astro receives explicit value/theme seeds for its server-rendered controls."}
`}]}function je(e,t){const o=`composition-${t}`;e.innerHTML=`<div class="composition-example" data-example="composition"><div class="example-toolbar"><div class="view-tabs" role="tablist" aria-label="Composition view"><button type="button" role="tab" aria-selected="true" data-composition-view="preview" aria-controls="${o}-preview">Preview</button><button type="button" role="tab" aria-selected="false" data-composition-view="code" aria-controls="${o}-code">Code</button></div></div><div id="${o}-preview" role="tabpanel" data-preview></div><div id="${o}-code" role="tabpanel" data-code hidden></div></div>`;const a=e.querySelector("[data-preview]"),n=e.querySelector("[data-code]");z(n,p=>Oe[t][p],{label:"Composable controls",files:p=>Jo(t,p),downloadName:()=>t+"-composition"});const i=new DOMParser().parseFromString(Oe[t].Vanilla,"text/html");i.querySelectorAll("script").forEach(p=>p.remove()),a.append(...Array.from(i.body.children));const s=a.firstElementChild,l=[];if(t==="color-picker"){const p=$e("#5268E080"),c=jt(s,p),m=()=>{s.querySelector("output").textContent=p.getSnapshot().value};m(),l.push(p.subscribe(m),c.destroy)}else{const p=le({theme:D("#5268E0"),mode:"dark",modeStorage:!1}),c=Ut(s,p),m=Wt(s,p,{roles:["primary","accent"]}),u=()=>{s.querySelector("[data-configuration]").textContent=m.getConfiguration().json};u(),l.push(p.subscribe(u),m.destroy,c)}const h=e.querySelectorAll(".example-toolbar button[data-composition-view]");return h.forEach(p=>p.addEventListener("click",()=>{const c=p.dataset.compositionView==="preview";a.hidden=!c,n.hidden=c,h.forEach(m=>m.setAttribute("aria-selected",String(m===p)))})),()=>{l.reverse().forEach(p=>p()),e.replaceChildren()}}const Ko=`import {
  createColorStore,
  mountColorPicker,
} from '@salyra-ui/color-picker/vanilla';
import './color-popover.css';
let sequence = 0;
/** The docs use our picker for supporting colors as well as the primary editor. */
export function mountColorPopover(
  host: HTMLElement,
  options: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    alpha?: boolean;
  },
) {
  const store = createColorStore(options.value),
    id = \`supporting-color-\${++sequence}\`;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'supporting-color-trigger';
  trigger.setAttribute('aria-label', \`Choose \${options.label.toLowerCase()}\`);
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', id);
  const swatch = document.createElement('span'),
    value = document.createElement('code');
  swatch.className = 'supporting-color-swatch';
  swatch.setAttribute('aria-hidden', 'true');
  trigger.append(swatch, value);
  const dialog = document.createElement('dialog');
  dialog.id = id;
  dialog.className = 'supporting-color-dialog';
  dialog.setAttribute('aria-label', \`\${options.label} color picker\`);
  const heading = document.createElement('header'),
    title = document.createElement('h3'),
    close = document.createElement('button');
  title.textContent = options.label;
  close.type = 'button';
  close.textContent = 'Close';
  close.setAttribute('aria-label', 'Close color picker');
  heading.append(title, close);
  const editor = document.createElement('div');
  dialog.append(heading, editor);
  host.append(trigger, dialog);
  const picker = mountColorPicker(editor, { store });
  if (!options.alpha) {
    picker.element.querySelector('cp-slider[channel="alpha"]')?.remove();
    picker.element.querySelector('cp-alpha-input')?.remove();
  }
  const render = () => {
    const color = store.getSnapshot();
    swatch.style.background = color.value;
    value.textContent = color.value;
    trigger.dataset.color = color.value;
  };
  render();
  const stop = store.subscribe(() => {
    render();
    options.onChange(store.getSnapshot().value);
  });
  const open = () => {
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
  };
  const hide = () => dialog.close();
  const closed = () => {
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  };
  const outside = (event: MouseEvent) => {
    const box = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom)
    )
      hide();
  };
  trigger.setAttribute('aria-expanded', 'false');
  trigger.addEventListener('click', open);
  close.addEventListener('click', hide);
  dialog.addEventListener('close', closed);
  dialog.addEventListener('click', outside);
  return {
    store,
    element: trigger,
    destroy() {
      stop();
      trigger.removeEventListener('click', open);
      close.removeEventListener('click', hide);
      dialog.removeEventListener('close', closed);
      dialog.removeEventListener('click', outside);
      if (dialog.open) dialog.close();
      picker.destroy();
      dialog.remove();
      trigger.remove();
    },
  };
}
`,Xo=`.supporting-color-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--line, #ddd);
  background: #fff;
  color: #171717;
  text-align: left;
  cursor: pointer;
}
.supporting-color-trigger code {
  font-size: 12px;
}
.supporting-color-swatch {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.supporting-color-dialog {
  width: min(360px, calc(100vw - 32px));
  max-height: calc(100dvh - 48px);
  margin: auto;
  padding: 20px;
  border: 1px solid #d8d8df;
  background: #fff;
  color: #171717;
  overflow: auto;
}
.supporting-color-dialog::backdrop {
  background: rgb(0 0 0 / 0.2);
}
.supporting-color-dialog header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.supporting-color-dialog h3 {
  margin: 0;
  font-size: 18px;
}
.supporting-color-dialog header button {
  padding: 7px 10px;
  border: 1px solid #d8d8df;
  background: #fff;
  color: #171717;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.supporting-color-dialog .cp-picker {
  gap: 16px;
}
.supporting-color-dialog .cp-picker .cp-mode {
  min-height: 38px;
}
.customization-color-field {
  display: grid;
  gap: 8px;
  font-size: 12px;
}
`,Ue="#5268E0",Z=e=>`<div class="recipe-actions">${e}</div>`,L=(e,t)=>`<button type="button" data-action="${e}">${t}</button>`,Ae=(e,t,o)=>`<label>${e}<select aria-label="${e}" data-${t}>${o}</select></label>`,q=(e,t,o)=>{e.querySelector(`[data-action="${t}"]`).onclick=o},G=(e,t)=>{e.querySelector("[data-result]").textContent=t};function Yo(e,t){e.classList.add("workflow-preview");const o=[],a=(l,h)=>{o.push(l.subscribe(h))},n=$e("#5268E080");e.innerHTML='<div data-picker></div><div data-controls></div><pre data-result aria-live="polite"></pre>';const i=ze(e.querySelector("[data-picker]"),{store:n});o.push(i.destroy);const s=e.querySelector("[data-controls]");if(t==="history"){const l=pt(n,{limit:20});s.innerHTML=Z(L("undo","Undo")+L("redo","Redo")),q(e,"undo",l.undo),q(e,"redo",l.redo);const h=()=>{const p=l.getSnapshot();e.querySelector('[data-action="undo"]').disabled=!p.canUndo,e.querySelector('[data-action="redo"]').disabled=!p.canRedo,G(e,`${n.getSnapshot().value}
History position ${p.index+1} of ${p.length}`)};a(l,h),a(n,h),o.push(Ce(e,l),l.destroy),h()}else if(t==="collections"){const l=mt({limit:8,favorites:[Ue,"#277D59"],storage:ut("examples:recent-colors")});l.load(),s.innerHTML=Z(L("remember","Save to recent")+L("favorite","Toggle favorite")+L("clear","Clear recent"))+"<div data-recent></div><div data-favorites></div>";const h=Le(e.querySelector("[data-recent]"),n,l,{label:"Recent colors"}),p=Le(e.querySelector("[data-favorites]"),n,l,{kind:"favorites",label:"Favorite colors",classes:{item:"workflow-swatch"}});o.push(h.destroy,p.destroy),q(e,"remember",()=>l.remember(n.getSnapshot().value)),q(e,"favorite",()=>l.toggleFavorite(n.getSnapshot().value)),q(e,"clear",l.clearRecent);const c=()=>G(e,JSON.stringify(l.getSnapshot(),null,2));a(l,c),c()}else if(t==="contrast"){s.innerHTML='<div class="workflow-field"><span>Background</span><div data-background></div></div>'+Ae("Text size","text",'<option value="normal">Normal</option><option value="large">Large</option>')+"<article data-text-sample>Text on the selected background</article>"+Z(L("suggest","Use suggested foreground"));const l=e.querySelector("[data-text]"),h=Xe(e.querySelector("[data-background]"),{label:"Background",value:"#FFFFFF",onChange:()=>c()});o.push(h.destroy);const p=()=>Ke(n.getSnapshot().value,h.store.getSnapshot().value,{text:l.value}),c=()=>{const m=p(),u=e.querySelector("[data-text-sample]");u.style.color=n.getSnapshot().value,u.style.background=h.store.getSnapshot().value,G(e,`Contrast ${m.ratio.toFixed(2)}:1
AA ${m.aa?"passes":"fails"}
AAA ${m.aaa?"passes":"fails"}
Suggested foreground ${m.suggestedForeground}`)};l.onchange=c,q(e,"suggest",()=>n.setHex(p().suggestedForeground)),a(n,c),c()}return()=>{o.forEach(l=>l()),e.replaceChildren()}}function _o(e,t){e.classList.add("workflow-preview");const o=[],a=(n,i)=>{o.push(n.subscribe(i))};if(t==="schema"){const n=D(Ue);e.innerHTML=Z(L("legacy","Unversioned theme")+L("v0","Version 0")+L("future","Future version"))+'<label class="workflow-field">Saved theme JSON<textarea data-json rows="10" spellcheck="false"></textarea></label>'+Z(L("validate","Validate & migrate"))+'<pre data-result role="status"></pre>';const i=e.querySelector("[data-json]"),s=l=>{const h={...n};delete h.schemaVersion,l!==void 0&&(h.schemaVersion=l),i.value=JSON.stringify(h,null,2),G(e,"Choose Validate & migrate to read this data.")};q(e,"legacy",()=>s()),q(e,"v0",()=>s(0)),q(e,"future",()=>s(99)),q(e,"validate",()=>{try{const l=Jt(JSON.parse(i.value));G(e,`Loaded ${l.name}
schemaVersion: ${l.schemaVersion}`)}catch(l){G(e,l instanceof Error?l.message:"Invalid theme data")}}),s()}else{const n=le({theme:D(Ue),mode:"light",modeStorage:!1}),i=t==="locks"||t==="conflict"?ct(n):void 0,s=i?.store??n;e.innerHTML='<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>',t==="locks"&&(e.querySelector("[data-theme-sample] h3").textContent="Generated theme");const l=e.querySelector("[data-controls]"),h=Je(e.querySelector("[data-picker]"),{store:s,modeStorage:!1,picker:{view:"area",roles:["primary","secondary","accent"],controls:!1},radius:["card"],width:["button"],backgroundControl:t==="locks"});h.element.querySelector("details")?.remove(),o.push(h.destroy);const p=()=>{e.querySelector("[data-theme-sample]").style.cssText=n.getSnapshot().style};if(a(n,p),p(),t==="history"){const c=Gt(s,{limit:20});l.innerHTML=Z(L("undo","Undo")+L("redo","Redo")),q(e,"undo",c.undo),q(e,"redo",c.redo);const m=()=>{const u=c.getSnapshot();e.querySelector('[data-action="undo"]').disabled=!u.canUndo,e.querySelector('[data-action="redo"]').disabled=!u.canRedo,G(e,`${s.getSnapshot().theme.name}
History position ${u.index+1} of ${u.length}`)};a(c,m),o.push(Ce(e,c),c.destroy),m()}else if(t==="locks"){l.innerHTML='<fieldset class="workflow-locks"><legend>Keep during generation</legend>'+[...Pe,"background"].map(u=>`<label><input type="checkbox" data-lock="${u}">${u}</label>`).join("")+'</fieldset><div class="workflow-field"><span>New primary</span><div data-seed></div></div>'+Z(L("generate","Generate theme"));for(const u of l.querySelectorAll("[data-lock]"))u.onchange=()=>i.setLocked(u.dataset.lock,u.checked);const c=Xe(e.querySelector("[data-seed]"),{label:"New primary",value:"#C25D3D",onChange:()=>{}});o.push(c.destroy),q(e,"generate",()=>s.generate(c.store.getSnapshot().value));const m=()=>{const u=s.getSnapshot();G(e,JSON.stringify({locked:i.getSnapshot().locked,colors:Object.fromEntries(Pe.map(d=>[d,Be(u.theme,d)])),background:u.theme.structure.websitePreset.background},null,2)),e.querySelector("[data-theme-sample]").style.cssText=u.style};a(s,m),a(i,m),m()}else if(t==="collections"){const c=dt({limit:8,favorites:[D("#277D59",{name:"Forest"})],storage:ht("examples:saved-themes")});c.load(),l.innerHTML=Z(L("remember","Save to recent")+L("favorite","Toggle favorite"))+Ae("Recent themes","recent","")+Ae("Favorite themes","favorites",""),q(e,"remember",()=>c.remember(s.getSnapshot().theme)),q(e,"favorite",()=>c.toggleFavorite(s.getSnapshot().theme));const m=()=>{const u=c.getSnapshot();for(const d of["recent","favorites"]){const b=e.querySelector(`[data-${d}]`);b.replaceChildren(new Option("Choose a theme",""));for(const f of u[d])b.add(new Option(f.name,f.id));b.disabled=!u[d].length}G(e,JSON.stringify({recent:u.recent.map(d=>({id:d.id,name:d.name})),favorites:u.favorites.map(d=>({id:d.id,name:d.name}))},null,2))};for(const u of["recent","favorites"])e.querySelector(`[data-${u}]`).onchange=d=>{const b=c.getSnapshot()[u].find(f=>f.id===d.currentTarget.value);b&&s.setTheme(b)};a(c,m),m()}else if(t==="contrast"){l.innerHTML='<div data-pairs class="workflow-pairs"></div>';const c=()=>{const m=s.getSnapshot(),u=e.querySelector("[data-pairs]");u.replaceChildren();const d=Pe.map(b=>{const f=zt(m,b),T=document.createElement("article");return T.style.background=Be(m.theme,b),T.style.color=f.foreground,T.textContent=`${b} ${f.ratio.toFixed(2)}:1`,u.append(T),`${b}
AA ${f.aa?"passes":"fails"} · AAA ${f.aaa?"passes":"fails"}`});G(e,d.join(`

`))};a(s,c),c()}else if(t==="tailwind"){l.innerHTML='<fieldset class="workflow-locks"><legend>Export fields</legend>'+Pe.map(u=>`<label><input type="checkbox" data-role="${u}" ${u==="primary"?"checked":""}>${u}</label>`).join("")+'<label><input type="checkbox" data-radius>Card radius</label><label><input type="checkbox" data-width>Button border width</label><label><input type="checkbox" data-background>Background</label></fieldset>'+Ae("Appearance","appearance",'<option value="light">Light</option><option value="dark">Dark</option><option value="both">Light & dark</option>')+Z(L("copy","Copy Tailwind CSS"))+'<p data-copy-status role="status"></p>';const c=()=>({roles:[...l.querySelectorAll("[data-role]:checked")].map(u=>u.dataset.role),radius:e.querySelector("[data-radius]").checked?["card"]:[],width:e.querySelector("[data-width]").checked?["button"]:[],background:e.querySelector("[data-background]").checked,modes:e.querySelector("[data-appearance]").value==="both"?["light","dark"]:[e.querySelector("[data-appearance]").value]}),m=()=>G(e,Y(s.getSnapshot(),c()).tailwind);l.onchange=m,a(s,m),m(),q(e,"copy",()=>{navigator.clipboard.writeText(Y(s.getSnapshot(),c()).tailwind).then(()=>{e.querySelector("[data-copy-status]").textContent="Tailwind CSS copied."},()=>{e.querySelector("[data-copy-status]").textContent="Select the CSS and copy it with your keyboard."})})}else if(t==="conflict"){l.innerHTML=Z(L("external","Simulate external update")+L("apply","Apply draft")+L("cancel","Load newer theme")+L("force","Replace with draft"))+'<p data-conflict role="status"></p>';let c=0;q(e,"external",()=>n.setTheme(D(++c%2?"#C25D3D":"#277D59",{name:`External theme ${c}`}))),q(e,"apply",()=>i.apply()),q(e,"cancel",i.cancel),q(e,"force",()=>i.apply({force:!0}));const m=()=>{const u=i.getSnapshot();e.querySelector('[data-action="apply"]').disabled=!u.dirty||u.conflict,e.querySelector('[data-action="force"]').hidden=!u.conflict,e.querySelector('[data-action="cancel"]').disabled=!u.dirty&&!u.conflict,e.querySelector("[data-conflict]").textContent=u.conflict?"The applied theme changed. Load it or explicitly replace it.":u.dirty?"Unapplied draft":"Up to date",G(e,JSON.stringify({draft:s.getSnapshot().theme.name,applied:n.getSnapshot().theme.name,conflict:u.conflict},null,2))};a(i,m),a(s,m),a(n,m),o.push(Ce(e,i.history)),m()}i&&o.push(i.destroy)}return()=>{o.forEach(n=>n()),e.replaceChildren()}}const Et={"color-picker":[{id:"history",title:"Undo & redo",description:"Drag the picker or enter a color. Each drag is one history step. Undo restores color and alpha together."},{id:"collections",title:"Recent & favorite colors",description:"Save a color to recent colors or add it to favorites. Click a swatch to select it. Each list is limited to eight colors and saved in this browser."},{id:"contrast",title:"Text contrast",description:"Set a text color, opacity and background. Inspect the contrast ratio, AA and AAA results. Apply the suggested black or white only when you choose to."}],"theme-studio":[{id:"history",title:"Theme history",description:"Undo color, theme name, radius and border changes. A drag or field edit is recorded as one step."},{id:"locks",title:"Generation locks",description:"Lock any color or the background, then generate from a new primary. Locked fields stay unchanged. You can still edit them manually."},{id:"collections",title:"Recent & favorite themes",description:"Save the current theme, edit it and save again. A theme with the same ID replaces its earlier revision in the list."},{id:"contrast",title:"Palette contrast",description:"Inspect the foreground and default color of each palette. The checker reports contrast without changing your theme."},{id:"tailwind",title:"Selected Tailwind tokens",description:"Choose colors, radius, border width and appearance. The stylesheet contains utilities only for the fields you select."},{id:"conflict",title:"External changes",description:"Edit a draft, then simulate a theme change from another application. Cancel loads the newer theme. Replace explicitly applies your draft over it."},{id:"schema",title:"Saved theme versions",description:"Load an older unversioned theme or a version 0 theme. Both migrate to version 1. An unsupported future version is rejected."}]},Zo={"color-picker":{history:`import {
  createColorStore,
  createColorHistory,
  mountColorPicker,
  mountHistory,
} from '@salyra-ui/color-picker/vanilla';
import { actions, button, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  const store = createColorStore('#5268E080');
  host.innerHTML =
    '<div data-picker></div><div data-controls></div><pre data-result aria-live="polite"></pre>';
  const picker = mountColorPicker(
    host.querySelector<HTMLElement>('[data-picker]')!,
    { store },
  );
  cleanup.push(picker.destroy);
  const controls = host.querySelector<HTMLElement>('[data-controls]')!;
  {
    const history = createColorHistory(store, { limit: 20 });
    controls.innerHTML = actions(
      button('undo', 'Undo') + button('redo', 'Redo'),
    );
    listenButton(host, 'undo', history.undo);
    listenButton(host, 'redo', history.redo);
    const update = () => {
      const state = history.getSnapshot();
      host.querySelector<HTMLButtonElement>('[data-action="undo"]')!.disabled =
        !state.canUndo;
      host.querySelector<HTMLButtonElement>('[data-action="redo"]')!.disabled =
        !state.canRedo;
      output(
        host,
        \`\${store.getSnapshot().value}\\nHistory position \${state.index + 1} of \${state.length}\`,
      );
    };
    subscribe(history, update);
    subscribe(store, update);
    cleanup.push(mountHistory(host, history), history.destroy);
    update();
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,collections:`import {
  createColorStore,
  createColorCollection,
  browserColorStorage,
  mountColorPicker,
  mountColorCollection,
} from '@salyra-ui/color-picker/vanilla';
import { seed, actions, button, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  const store = createColorStore('#5268E080');
  host.innerHTML =
    '<div data-picker></div><div data-controls></div><pre data-result aria-live="polite"></pre>';
  const picker = mountColorPicker(
    host.querySelector<HTMLElement>('[data-picker]')!,
    { store },
  );
  cleanup.push(picker.destroy);
  const controls = host.querySelector<HTMLElement>('[data-controls]')!;
  {
    const collection = createColorCollection({
      limit: 8,
      favorites: [seed, '#277D59'],
      storage: browserColorStorage('examples:recent-colors'),
    });
    collection.load();
    controls.innerHTML =
      actions(
        button('remember', 'Save to recent') +
          button('favorite', 'Toggle favorite') +
          button('clear', 'Clear recent'),
      ) + '<div data-recent></div><div data-favorites></div>';
    const recent = mountColorCollection(
      host.querySelector<HTMLElement>('[data-recent]')!,
      store,
      collection,
      { label: 'Recent colors' },
    );
    const favorites = mountColorCollection(
      host.querySelector<HTMLElement>('[data-favorites]')!,
      store,
      collection,
      {
        kind: 'favorites',
        label: 'Favorite colors',
        classes: { item: 'workflow-swatch' },
      },
    );
    cleanup.push(recent.destroy, favorites.destroy);
    listenButton(host, 'remember', () =>
      collection.remember(store.getSnapshot().value),
    );
    listenButton(host, 'favorite', () =>
      collection.toggleFavorite(store.getSnapshot().value),
    );
    listenButton(host, 'clear', collection.clearRecent);
    const update = () =>
      output(host, JSON.stringify(collection.getSnapshot(), null, 2));
    subscribe(collection, update);
    update();
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,contrast:`import { mountColorPopover } from './color-popover';
import {
  createColorStore,
  mountColorPicker,
  colorContrast,
} from '@salyra-ui/color-picker/vanilla';
import { actions, button, field, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  const store = createColorStore('#5268E080');
  host.innerHTML =
    '<div data-picker></div><div data-controls></div><pre data-result aria-live="polite"></pre>';
  const picker = mountColorPicker(
    host.querySelector<HTMLElement>('[data-picker]')!,
    { store },
  );
  cleanup.push(picker.destroy);
  const controls = host.querySelector<HTMLElement>('[data-controls]')!;
  {
    controls.innerHTML =
      '<div class="workflow-field"><span>Background</span><div data-background></div></div>' +
      field(
        'Text size',
        'text',
        '<option value="normal">Normal</option><option value="large">Large</option>',
      ) +
      '<article data-text-sample>Text on the selected background</article>' +
      actions(button('suggest', 'Use suggested foreground'));
    const text = host.querySelector<HTMLSelectElement>('[data-text]')!;
    const background = mountColorPopover(
      host.querySelector<HTMLElement>('[data-background]')!,
      {
        label: 'Background',
        value: '#FFFFFF',
        onChange: () => update(),
      },
    );
    cleanup.push(background.destroy);
    const result = () =>
      colorContrast(
        store.getSnapshot().value,
        background.store.getSnapshot().value,
        {
          text: text.value as 'normal' | 'large',
        },
      );
    const update = () => {
      const c = result(),
        sample = host.querySelector<HTMLElement>('[data-text-sample]')!;
      sample.style.color = store.getSnapshot().value;
      sample.style.background = background.store.getSnapshot().value;
      output(
        host,
        \`Contrast \${c.ratio.toFixed(2)}:1\\nAA \${c.aa ? 'passes' : 'fails'}\\nAAA \${c.aaa ? 'passes' : 'fails'}\\nSuggested foreground \${c.suggestedForeground}\`,
      );
    };
    text.onchange = update;
    listenButton(host, 'suggest', () =>
      store.setHex(result().suggestedForeground),
    );
    subscribe(store, update);
    update();
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`},"theme-studio":{history:`import {
  createThemeStore,
  createThemeHistory,
  mountThemeKit,
  generateTheme,
  roles,
} from '@salyra-ui/theme-studio/vanilla';
import { mountHistory } from '@salyra-ui/color-picker';
import { seed, actions, button, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const target = createThemeStore({
      theme: generateTheme(seed),
      mode: 'light',
      modeStorage: false,
    });
    const store = target;
    host.innerHTML =
      '<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>';
    const controls = host.querySelector<HTMLElement>('[data-controls]')!;
    const picker = mountThemeKit(
      host.querySelector<HTMLElement>('[data-picker]')!,
      {
        store,
        modeStorage: false,
        picker: {
          view: 'area',
          roles: ['primary', 'secondary', 'accent'],
          controls: false,
        },
        radius: ['card'],
        width: ['button'],
        backgroundControl: false,
      },
    );
    picker.element.querySelector('details')?.remove();
    cleanup.push(picker.destroy);
    const updateSample = () => {
      host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
        target.getSnapshot().style;
    };
    subscribe(target, updateSample);
    updateSample();
    {
      const history = createThemeHistory(store, { limit: 20 });
      controls.innerHTML = actions(
        button('undo', 'Undo') + button('redo', 'Redo'),
      );
      listenButton(host, 'undo', history.undo);
      listenButton(host, 'redo', history.redo);
      const update = () => {
        const s = history.getSnapshot();
        host.querySelector<HTMLButtonElement>(
          '[data-action="undo"]',
        )!.disabled = !s.canUndo;
        host.querySelector<HTMLButtonElement>(
          '[data-action="redo"]',
        )!.disabled = !s.canRedo;
        output(
          host,
          \`\${store.getSnapshot().theme.name}\\nHistory position \${s.index + 1} of \${s.length}\`,
        );
      };
      subscribe(history, update);
      cleanup.push(mountHistory(host, history), history.destroy);
      update();
    }
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,locks:`import { mountColorPopover } from './color-popover';
import {
  createThemeStore,
  createThemeEditor,
  mountThemeKit,
  themeColor,
  generateTheme,
  roles,
  type Role,
} from '@salyra-ui/theme-studio/vanilla';
import { seed, actions, button, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const target = createThemeStore({
      theme: generateTheme(seed),
      mode: 'light',
      modeStorage: false,
    });
    const editor = createThemeEditor(target);
    const store = editor?.store ?? target;
    host.innerHTML =
      '<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>';
    host.querySelector('[data-theme-sample] h3')!.textContent =
      'Generated theme';
    const controls = host.querySelector<HTMLElement>('[data-controls]')!;
    const picker = mountThemeKit(
      host.querySelector<HTMLElement>('[data-picker]')!,
      {
        store,
        modeStorage: false,
        picker: {
          view: 'area',
          roles: ['primary', 'secondary', 'accent'],
          controls: false,
        },
        radius: ['card'],
        width: ['button'],
        backgroundControl: true,
      },
    );
    picker.element.querySelector('details')?.remove();
    cleanup.push(picker.destroy);
    const updateSample = () => {
      host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
        target.getSnapshot().style;
    };
    subscribe(target, updateSample);
    updateSample();
    {
      controls.innerHTML =
        '<fieldset class="workflow-locks"><legend>Keep during generation</legend>' +
        [...roles, 'background']
          .map(
            (role) =>
              \`<label><input type="checkbox" data-lock="\${role}">\${role}</label>\`,
          )
          .join('') +
        '</fieldset><div class="workflow-field"><span>New primary</span><div data-seed></div></div>' +
        actions(button('generate', 'Generate theme'));
      for (const input of controls.querySelectorAll<HTMLInputElement>(
        '[data-lock]',
      ))
        input.onchange = () =>
          editor!.setLocked(
            input.dataset.lock as Role | 'background',
            input.checked,
          );
      const seed = mountColorPopover(
        host.querySelector<HTMLElement>('[data-seed]')!,
        {
          label: 'New primary',
          value: '#C25D3D',
          onChange: () => {},
        },
      );
      cleanup.push(seed.destroy);
      listenButton(host, 'generate', () =>
        store.generate(seed.store.getSnapshot().value),
      );
      const update = () => {
        const state = store.getSnapshot();
        output(
          host,
          JSON.stringify(
            {
              locked: editor!.getSnapshot().locked,
              colors: Object.fromEntries(
                roles.map((role) => [role, themeColor(state.theme, role)]),
              ),
              background: state.theme.structure.websitePreset.background,
            },
            null,
            2,
          ),
        );
        host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
          state.style;
      };
      subscribe(store, update);
      subscribe(editor!, update);
      update();
    }
    if (editor) cleanup.push(editor.destroy);
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,collections:`import {
  createThemeStore,
  createThemeCollection,
  browserThemeCollectionStorage,
  mountThemeKit,
  generateTheme,
  roles,
} from '@salyra-ui/theme-studio/vanilla';
import {
  seed,
  actions,
  button,
  field,
  listenButton,
  output,
} from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const target = createThemeStore({
      theme: generateTheme(seed),
      mode: 'light',
      modeStorage: false,
    });
    const store = target;
    host.innerHTML =
      '<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>';
    const controls = host.querySelector<HTMLElement>('[data-controls]')!;
    const picker = mountThemeKit(
      host.querySelector<HTMLElement>('[data-picker]')!,
      {
        store,
        modeStorage: false,
        picker: {
          view: 'area',
          roles: ['primary', 'secondary', 'accent'],
          controls: false,
        },
        radius: ['card'],
        width: ['button'],
        backgroundControl: false,
      },
    );
    picker.element.querySelector('details')?.remove();
    cleanup.push(picker.destroy);
    const updateSample = () => {
      host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
        target.getSnapshot().style;
    };
    subscribe(target, updateSample);
    updateSample();
    {
      const collection = createThemeCollection({
        limit: 8,
        favorites: [generateTheme('#277D59', { name: 'Forest' })],
        storage: browserThemeCollectionStorage('examples:saved-themes'),
      });
      collection.load();
      controls.innerHTML =
        actions(
          button('remember', 'Save to recent') +
            button('favorite', 'Toggle favorite'),
        ) +
        field('Recent themes', 'recent', '') +
        field('Favorite themes', 'favorites', '');
      listenButton(host, 'remember', () =>
        collection.remember(store.getSnapshot().theme),
      );
      listenButton(host, 'favorite', () =>
        collection.toggleFavorite(store.getSnapshot().theme),
      );
      const update = () => {
        const state = collection.getSnapshot();
        for (const kind of ['recent', 'favorites'] as const) {
          const select = host.querySelector<HTMLSelectElement>(
            \`[data-\${kind}]\`,
          )!;
          select.replaceChildren(new Option('Choose a theme', ''));
          for (const theme of state[kind])
            select.add(new Option(theme.name, theme.id));
          select.disabled = !state[kind].length;
        }
        output(
          host,
          JSON.stringify(
            {
              recent: state.recent.map((t) => ({ id: t.id, name: t.name })),
              favorites: state.favorites.map((t) => ({
                id: t.id,
                name: t.name,
              })),
            },
            null,
            2,
          ),
        );
      };
      for (const kind of ['recent', 'favorites'] as const)
        host.querySelector<HTMLSelectElement>(\`[data-\${kind}]\`)!.onchange = (
          e,
        ) => {
          const theme = collection
            .getSnapshot()
            [kind].find(
              (t) => t.id === (e.currentTarget as HTMLSelectElement).value,
            );
          if (theme) store.setTheme(theme);
        };
      subscribe(collection, update);
      update();
    }
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,contrast:`import {
  createThemeStore,
  mountThemeKit,
  themeColor,
  themeContrast,
  generateTheme,
  roles,
} from '@salyra-ui/theme-studio/vanilla';
import { seed, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const target = createThemeStore({
      theme: generateTheme(seed),
      mode: 'light',
      modeStorage: false,
    });
    const store = target;
    host.innerHTML =
      '<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>';
    const controls = host.querySelector<HTMLElement>('[data-controls]')!;
    const picker = mountThemeKit(
      host.querySelector<HTMLElement>('[data-picker]')!,
      {
        store,
        modeStorage: false,
        picker: {
          view: 'area',
          roles: ['primary', 'secondary', 'accent'],
          controls: false,
        },
        radius: ['card'],
        width: ['button'],
        backgroundControl: false,
      },
    );
    picker.element.querySelector('details')?.remove();
    cleanup.push(picker.destroy);
    const updateSample = () => {
      host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
        target.getSnapshot().style;
    };
    subscribe(target, updateSample);
    updateSample();
    {
      controls.innerHTML = '<div data-pairs class="workflow-pairs"></div>';
      const update = () => {
        const state = store.getSnapshot(),
          pairs = host.querySelector<HTMLElement>('[data-pairs]')!;
        pairs.replaceChildren();
        const values = roles.map((role) => {
          const result = themeContrast(state, role),
            item = document.createElement('article');
          item.style.background = themeColor(state.theme, role);
          item.style.color = result.foreground;
          item.textContent = \`\${role} \${result.ratio.toFixed(2)}:1\`;
          pairs.append(item);
          return \`\${role}\\nAA \${result.aa ? 'passes' : 'fails'} · AAA \${result.aaa ? 'passes' : 'fails'}\`;
        });
        output(host, values.join('\\n\\n'));
      };
      subscribe(store, update);
      update();
    }
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,tailwind:`import {
  createThemeStore,
  mountThemeKit,
  themeConfiguration,
  generateTheme,
  roles,
  type Role,
  type TokenSelection,
} from '@salyra-ui/theme-studio/vanilla';
import {
  seed,
  actions,
  button,
  field,
  listenButton,
  output,
} from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const target = createThemeStore({
      theme: generateTheme(seed),
      mode: 'light',
      modeStorage: false,
    });
    const store = target;
    host.innerHTML =
      '<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>';
    const controls = host.querySelector<HTMLElement>('[data-controls]')!;
    const picker = mountThemeKit(
      host.querySelector<HTMLElement>('[data-picker]')!,
      {
        store,
        modeStorage: false,
        picker: {
          view: 'area',
          roles: ['primary', 'secondary', 'accent'],
          controls: false,
        },
        radius: ['card'],
        width: ['button'],
        backgroundControl: false,
      },
    );
    picker.element.querySelector('details')?.remove();
    cleanup.push(picker.destroy);
    const updateSample = () => {
      host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
        target.getSnapshot().style;
    };
    subscribe(target, updateSample);
    updateSample();
    {
      controls.innerHTML =
        '<fieldset class="workflow-locks"><legend>Export fields</legend>' +
        roles
          .map(
            (role) =>
              \`<label><input type="checkbox" data-role="\${role}" \${role === 'primary' ? 'checked' : ''}>\${role}</label>\`,
          )
          .join('') +
        '<label><input type="checkbox" data-radius>Card radius</label><label><input type="checkbox" data-width>Button border width</label><label><input type="checkbox" data-background>Background</label></fieldset>' +
        field(
          'Appearance',
          'appearance',
          '<option value="light">Light</option><option value="dark">Dark</option><option value="both">Light & dark</option>',
        ) +
        actions(button('copy', 'Copy Tailwind CSS')) +
        '<p data-copy-status role="status"></p>';
      const selection = (): TokenSelection => ({
        roles: [
          ...controls.querySelectorAll<HTMLInputElement>('[data-role]:checked'),
        ].map((e) => e.dataset.role as Role),
        radius: host.querySelector<HTMLInputElement>('[data-radius]')!.checked
          ? ['card']
          : [],
        width: host.querySelector<HTMLInputElement>('[data-width]')!.checked
          ? ['button']
          : [],
        background:
          host.querySelector<HTMLInputElement>('[data-background]')!.checked,
        modes:
          host.querySelector<HTMLSelectElement>('[data-appearance]')!.value ===
          'both'
            ? ['light', 'dark']
            : [
                host.querySelector<HTMLSelectElement>('[data-appearance]')!
                  .value as 'light' | 'dark',
              ],
      });
      const update = () =>
        output(
          host,
          themeConfiguration(store.getSnapshot(), selection()).tailwind,
        );
      controls.onchange = update;
      subscribe(store, update);
      update();
      listenButton(host, 'copy', () => {
        navigator.clipboard
          .writeText(
            themeConfiguration(store.getSnapshot(), selection()).tailwind,
          )
          .then(
            () => {
              host.querySelector('[data-copy-status]')!.textContent =
                'Tailwind CSS copied.';
            },
            () => {
              host.querySelector('[data-copy-status]')!.textContent =
                'Select the CSS and copy it with your keyboard.';
            },
          );
      });
    }
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,conflict:`import {
  createThemeStore,
  createThemeEditor,
  mountThemeKit,
  generateTheme,
  roles,
} from '@salyra-ui/theme-studio/vanilla';
import { mountHistory } from '@salyra-ui/color-picker';
import { seed, actions, button, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const target = createThemeStore({
      theme: generateTheme(seed),
      mode: 'light',
      modeStorage: false,
    });
    const editor = createThemeEditor(target);
    const store = editor?.store ?? target;
    host.innerHTML =
      '<div data-picker></div><div data-controls></div><div data-theme-sample class="recipe-preview"><h3>Applied theme</h3><button type="button">Save changes</button></div><pre data-result aria-live="polite"></pre>';
    const controls = host.querySelector<HTMLElement>('[data-controls]')!;
    const picker = mountThemeKit(
      host.querySelector<HTMLElement>('[data-picker]')!,
      {
        store,
        modeStorage: false,
        picker: {
          view: 'area',
          roles: ['primary', 'secondary', 'accent'],
          controls: false,
        },
        radius: ['card'],
        width: ['button'],
        backgroundControl: false,
      },
    );
    picker.element.querySelector('details')?.remove();
    cleanup.push(picker.destroy);
    const updateSample = () => {
      host.querySelector<HTMLElement>('[data-theme-sample]')!.style.cssText =
        target.getSnapshot().style;
    };
    subscribe(target, updateSample);
    updateSample();
    {
      controls.innerHTML =
        actions(
          button('external', 'Simulate external update') +
            button('apply', 'Apply draft') +
            button('cancel', 'Load newer theme') +
            button('force', 'Replace with draft'),
        ) + '<p data-conflict role="status"></p>';
      let externalRevision = 0;
      listenButton(host, 'external', () =>
        target.setTheme(
          generateTheme(++externalRevision % 2 ? '#C25D3D' : '#277D59', {
            name: \`External theme \${externalRevision}\`,
          }),
        ),
      );
      listenButton(host, 'apply', () => editor!.apply());
      listenButton(host, 'cancel', editor!.cancel);
      listenButton(host, 'force', () => editor!.apply({ force: true }));
      const update = () => {
        const state = editor!.getSnapshot();
        host.querySelector<HTMLButtonElement>(
          '[data-action="apply"]',
        )!.disabled = !state.dirty || state.conflict;
        host.querySelector<HTMLButtonElement>('[data-action="force"]')!.hidden =
          !state.conflict;
        host.querySelector<HTMLButtonElement>(
          '[data-action="cancel"]',
        )!.disabled = !state.dirty && !state.conflict;
        host.querySelector('[data-conflict]')!.textContent = state.conflict
          ? 'The applied theme changed. Load it or explicitly replace it.'
          : state.dirty
            ? 'Unapplied draft'
            : 'Up to date';
        output(
          host,
          JSON.stringify(
            {
              draft: store.getSnapshot().theme.name,
              applied: target.getSnapshot().theme.name,
              conflict: state.conflict,
            },
            null,
            2,
          ),
        );
      };
      subscribe(editor!, update);
      subscribe(store, update);
      subscribe(target, update);
      cleanup.push(mountHistory(host, editor!.history));
      update();
    }
    if (editor) cleanup.push(editor.destroy);
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`,schema:`import { generateTheme, parseTheme } from '@salyra-ui/theme-studio/vanilla';
import { seed, actions, button, listenButton, output } from './workflow-ui';
export function mountWorkflow(host: HTMLElement): () => void {
  host.classList.add('workflow-preview');
  const cleanup: (() => void)[] = [];
  const subscribe = (
    source: {
      subscribe: (fn: () => void) => () => void;
    },
    update: () => void,
  ) => {
    cleanup.push(source.subscribe(update));
  };
  {
    const initial = generateTheme(seed);
    host.innerHTML =
      actions(
        button('legacy', 'Unversioned theme') +
          button('v0', 'Version 0') +
          button('future', 'Future version'),
      ) +
      '<label class="workflow-field">Saved theme JSON<textarea data-json rows="10" spellcheck="false"></textarea></label>' +
      actions(button('validate', 'Validate & migrate')) +
      '<pre data-result role="status"></pre>';
    const area = host.querySelector<HTMLTextAreaElement>('[data-json]')!;
    const show = (version?: number) => {
      const saved = { ...initial } as Record<string, unknown>;
      delete saved.schemaVersion;
      if (version !== undefined) saved.schemaVersion = version;
      area.value = JSON.stringify(saved, null, 2);
      output(host, 'Choose Validate & migrate to read this data.');
    };
    listenButton(host, 'legacy', () => show());
    listenButton(host, 'v0', () => show(0));
    listenButton(host, 'future', () => show(99));
    listenButton(host, 'validate', () => {
      try {
        const theme = parseTheme(JSON.parse(area.value));
        output(
          host,
          \`Loaded \${theme.name}\\nschemaVersion: \${theme.schemaVersion}\`,
        );
      } catch (error) {
        output(
          host,
          error instanceof Error ? error.message : 'Invalid theme data',
        );
      }
    });
    show();
  }
  return () => {
    cleanup.forEach((stop) => stop());
    host.replaceChildren();
  };
}
`}},Qo=`export const seed = '#5268E0';
export const actions = (buttons: string) =>
  \`<div class="recipe-actions">\${buttons}</div>\`;
export const button = (id: string, label: string) =>
  \`<button type="button" data-action="\${id}">\${label}</button>\`;
export const field = (label: string, selector: string, options: string) =>
  \`<label>\${label}<select aria-label="\${label}" data-\${selector}>\${options}</select></label>\`;
export const listenButton = (
  host: HTMLElement,
  id: string,
  run: () => void,
) => {
  host.querySelector<HTMLButtonElement>(\`[data-action="\${id}"]\`)!.onclick = run;
};
export const output = (host: HTMLElement, value: string) => {
  host.querySelector('[data-result]')!.textContent = value;
};
`,at=`@import '@salyra-ui/color-picker/styles.min.css';
@import '@salyra-ui/theme-studio/styles.min.css';
body { font-family: Helvetica, Arial, sans-serif; max-width: 860px; margin: 40px auto; padding: 0 20px; }
.workflow-preview { display: grid; gap: 24px; }
.workflow-preview > [data-picker] { max-width: 360px; }
.recipe-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0; }
button, input, select, textarea { font: inherit; }
button { padding: 8px 12px; border: 1px solid #ddd; background: white; cursor: pointer; }
button:disabled { opacity: .4; cursor: default; }
.workflow-field { display: grid; gap: 8px; margin: 16px 0; }
.workflow-locks { display: flex; flex-wrap: wrap; gap: 16px; }
[data-controls] > label { display: flex; gap: 12px; margin: 12px 0; align-items: center; }
[data-text-sample] { padding: 24px; font-size: 24px; }
.workflow-pairs { display: flex; gap: 12px; }
.workflow-pairs article { padding: 24px; flex: 1; }
.recipe-preview { background: hsl(var(--background)); color: hsl(var(--foreground)); padding: 24px; border-radius: var(--border-radius-card); border: var(--border-width-card) solid currentColor; }
.recipe-preview button { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border: var(--border-width-button) solid currentColor; }
pre { overflow: auto; max-height: 400px; white-space: pre-wrap; background: #f7f7f8; padding: 20px; }
textarea { width:100%; box-sizing:border-box; }
`;function er(e,t){return[{name:"workflow.ts",code:Zo[e][t]},{name:"main.ts",code:`import { mountWorkflow } from './workflow';
import './styles.css';

const cleanup = mountWorkflow(document.querySelector<HTMLElement>('#example')!);
// Call cleanup() when removing this view.
window.addEventListener('pagehide', cleanup, { once: true });`},{name:"workflow-ui.ts",code:Qo},{name:"color-popover.ts",code:Ko},{name:"color-popover.css",code:Xo},{name:"styles.css",code:e==="color-picker"?at.replace(`@import '@salyra-ui/theme-studio/styles.min.css';
`,""):at.replace(`@import '@salyra-ui/color-picker/styles.min.css';
`,"")},{name:"index.html",code:'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Salyra UI workflow</title></head><body><main id="example"></main><script type="module" src="/main.ts"><\/script></body></html>'},{name:"package.json",code:JSON.stringify({private:!0,type:"module",scripts:{dev:"vite",build:"vite build"},dependencies:{[`@salyra-ui/${e}`]:"^1.0.1"},devDependencies:{vite:"^6.1.0",typescript:"~5.8.3"}},null,2)},{name:"README.md",code:`# ${Et[e].find(o=>o.id===t).title}

Run npm install, then npm run dev.

This example uses Vanilla controls and framework-independent helpers. The same helpers work with every native framework provider. See the ${e==="color-picker"?"Forms & saved colors":"Draft & Apply"} example for complete native framework components.
`}]}function nt(e,t){const o=Et[t];let a=o[0].id,n;e.classList.add("workflow-gallery"),e.innerHTML=`<div class="workflow-selector"><label>Workflow<select aria-label="${t==="color-picker"?"Color picker":"Theme studio"} workflow">${o.map(c=>`<option value="${c.id}">${R(c.title)}</option>`).join("")}</select></label><div class="view-tabs" role="group" aria-label="Workflow display"><button type="button" data-workflow-view="preview" aria-pressed="true">Preview</button><button type="button" data-workflow-view="code" aria-pressed="false">Code</button></div></div><div class="workflow-summary"><h3></h3><p></p><span>Vanilla controls · Framework-independent core</span></div><div data-workflow-preview></div><div data-workflow-code hidden></div>`;const i=e.querySelector("[data-workflow-preview]"),s=e.querySelector("[data-workflow-code]"),l=z(s,()=>"",{file:"TypeScript",baseName:t+"-workflow",downloadName:()=>`${t}-${a}`,files:()=>er(t,a)}),h=()=>{n?.();const c=o.find(m=>m.id===a);e.querySelector("h3").textContent=c.title,e.querySelector(".workflow-summary p").textContent=c.description,n=(t==="color-picker"?Yo:_o)(i,a),l.refresh()};e.querySelector("select").onchange=c=>{a=c.currentTarget.value,h()};const p=e.querySelectorAll(".workflow-selector button[data-workflow-view]");for(const c of p)c.onclick=()=>{const m=c.dataset.workflowView==="code";i.hidden=m,s.hidden=!m;for(const u of p)u.setAttribute("aria-pressed",String(u===c))};return h(),()=>{n?.(),e.replaceChildren()}}function tr(e){const t=["React","Svelte","Vue","Angular","Astro"];return/^use(Color|Theme)/.test(e)?t.filter(o=>o!=="Astro"):/^provide/.test(e)?["Svelte","Vue"]:/^watch/.test(e)?["Vue"]:e.endsWith("Context")||e.endsWith("Primitives")?["Angular"]:["ColorPicker","ThemeStudio","ColorMarkerThumb"].includes(e)?["React","Svelte","Vue"]:["ColorWheelSurface","ThemePickerWheel","ColorFormatTrigger"].includes(e)?t.filter(o=>o!=="Angular"||e==="ColorFormatTrigger"):["ThemeWheel"].includes(e)?t.filter(o=>o!=="Astro"):e==="ThemeColor"?t.filter(o=>o!=="Angular"):t}const O=(e,t,o,a,n)=>({key:e,type:t,default:o,description:a,example:n}),or=[{id:"coloreyedropper",name:"ColorEyeDropper / ColorPicker.EyeDropper",kind:"Component",description:"An optional button that samples an opaque sRGB pixel from the screen and updates the closest color store. Detects support after mounting and keeps existing alpha by default.",note:'Requires a browser with EyeDropper in a secure context and a direct user click. Unsupported and pending buttons are disabled. Escape cancels without changing the color. React uses render(state), Svelte a children(state) snippet and Vue a state slot. Angular uses button[cpEyeDropper], colorPick and colorPickError outputs. Astro uses ColorEyeDropper.astro inside cp-compose. Vanilla uses cp-eye-dropper or data-cp-control="eyedropper". Button labels, icons, classes and native attributes belong to your markup.',fields:[O("preserveAlpha","boolean","true","Screen colors have no alpha channel. Preserve the current store opacity, or set false to make the sampled color opaque.","preserveAlpha={false}"),O("disabled","boolean","false","Disables this button. The parent color context, missing browser support and a pending request also disable it. Disabling during a request cancels sampling.","disabled={saving}"),O("onPick","(hex: string) => void","undefined","React and Svelte callback after the store updates. Returns opaque #RRGGBB from the screen. Read store.value for the color with preserved alpha. Vue emits pick and Angular emits colorPick.","onPick={hex => console.log(hex)}"),O("onPickError","(error: Error) => void","undefined","React and Svelte callback for failures. Cancellation is not an error. Vue emits pickError and Angular emits colorPickError. Vanilla dispatches color-pick-error.","onPickError={error => console.error(error)}"),O("children / render","ReactNode | (state: ColorEyeDropperState) => ReactNode","Pick from screen","Own the text or icon. React render, Svelte snippet and Vue slot receive supported, pending and error. Angular projects your native button content. Astro and Vanilla preserve their child markup.",'render={state => state.pending ? "Picking…" : "Pick from screen"}'),O("ref / native attributes","button attributes and native button ref","undefined","Forward your classes, accessible label and event handlers. Prevent the click default to skip sampling.",'aria-label="Sample brand color" className="my-pipette"')],example:{file:"Usage.tsx",code:`import { ColorPicker as Color } from '@salyra-ui/color-picker/react';
export function ScreenPicker() {
  return <Color.Root defaultValue="#5268E080">
    <Color.EyeDropper preserveAlpha onPick={hex => console.log(hex)}
      render={state => state.pending ? 'Picking…' : 'Pick from screen'} />
  </Color.Root>;
}`}},{id:"createcoloreyedropper",name:"createColorEyeDropper / bindColorEyeDropper",kind:"Function",description:"Headless screen sampling and a native button binding. Create per owner and destroy on unmount. Both helpers use the same cancellation and store update logic as the framework components.",fields:[O("store","ColorStore","Required","The selected color context. Sampling respects its disabled state.","createColorEyeDropper(store)"),O("mount()","() => void","Explicit client mount","Detects browser support and subscribes to context disablement. Initial supported is false for deterministic SSR. The DOM binding mounts automatically.","eye.mount()"),O("pick(options?)","({preserveAlpha?:boolean}) => Promise<string | undefined>","preserveAlpha: true","Call directly from a user click. Resolves with opaque #RRGGBB, or undefined on cancellation, disablement or a repeated pending request. Other failures reject and populate state.error.","await eye.pick({preserveAlpha:false})"),O("getSnapshot() / subscribe(listener)","ColorEyeDropperState / () => void","supported:false, pending:false","Read supported, pending and error. subscribe returns an unsubscribe function.","const stop = eye.subscribe(() => console.log(eye.getSnapshot()))"),O("cancel() / destroy()","() => void","Explicit","Cancel aborts a pending request. Destroy also removes the store subscription and listeners. Late responses cannot modify a disposed context.","eye.cancel(); eye.destroy()"),O("bindColorEyeDropper(button, store, options?)","HTMLButtonElement, ColorStore, ColorEyeDropperBindingOptions","Required button and store","Keeps your button markup. Options include preserveAlpha, disabled getter, onPick, onError and onStateChange. Returns controller, refresh and destroy. Refresh after changing local disabled state.","const binding = bindColorEyeDropper(button, store, {disabled:()=>saving})"),O("isEyeDropperSupported(host?)","boolean","Current browser","Feature detection with an optional host for iframes. False on servers, unavailable browsers and insecure contexts.","isEyeDropperSupported()")],example:{file:"Usage.ts",code:`import {createColorStore,bindColorEyeDropper} from '@salyra-ui/color-picker';
const store=createColorStore('#5268E080');
const button=document.createElement('button');
button.textContent='Pick from screen';
const binding=bindColorEyeDropper(button,store,{onPick:hex=>console.log(hex)});
// When removing this control:
binding.destroy();`}}],Re=(e,t,o,a,n)=>({key:e,type:t,default:o,description:a,example:n}),rr={"ColorPicker.Root":["[cpRoot], [store], [value], [disabled], (valueChange)","ColorStore, HEX string, boolean, string event",'<section cpRoot [value]="color" (valueChange)="color=$event">...</section>'],"ColorPicker.Area / Wheel":["[cpArea] or [cpWheel], [cpMarkers], [cpActiveId], (markerSelect), (markerChange)","ColorMarker[], string, string event, {id, hsv} event",'<div cpWheel [cpMarkers]="markers" [cpActiveId]="active" (markerSelect)="active=$event">...</div>'],"ColorPicker.Thumb / Marker":["cpThumb","Native span directive",'<span cpThumb class="my-dot"></span>'],"ColorPicker.Slider":["[cpSlider], [disabled], aria-label","'h' | 's' | 'v' | 'alpha', boolean, string",'<input cpSlider="alpha" aria-label="Opacity" />'],"ColorPicker.Input / ChannelInput":["cpInput, [format], [index], [disabled], aria-label","ColorFormat, 0 | 1 | 2, boolean, string",'<input cpInput format="rgb" [index]="0" aria-label="Red" />'],"ColorPicker.FormatTrigger":["cpFormatTrigger, [format], [disabled]","ColorFormat, boolean",'<button cpFormatTrigger format="rgb">RGB channels</button>'],"ThemeStudio.Root / Scope":["tkRoot with [store] / [options], tkScope","ThemeStore / ThemeOptions",'<section tkRoot [store]="store"><div tkScope>...</div></section>'],"ThemeStudio.PickerRoot":["tkPickerRoot with [picker] / [options]","ThemePickerStore / ThemePickerOptions",`<section tkPickerRoot [options]="{roles:['primary']}">...</section>`],"ThemeStudio.RoleTrigger":["[tkRoleTrigger], [disabled]","'primary' | 'secondary' | 'accent', boolean",'<button tkRoleTrigger="accent">Highlight</button>'],"ThemeStudio.GeometryInput":["[tkGeometry], [target], [disabled], aria-label","'radius' | 'width', Target, boolean, string",'<input tkGeometry="width" target="card" aria-label="Card border" />']};function ar(e){const t=rr[e.name],o=[];return t&&o.push(Re("Angular bindings",t[0]+" / "+t[1],"Declared directive defaults",e.name==="ColorPicker.Thumb / Marker"?"cpThumb positions a single thumb. Angular has no ColorMarkerThumb export. Put your own buttons with data-marker-id inside a cpWheel with cpMarkers for multiple markers.":"Import the named directive in the standalone component imports array. Angular bindings use these names rather than the React compound component syntax. Put classes, styles, ARIA labels and event handlers on your native host element.",t[2])),e.name==="ColorPicker.Root"&&o.push(Re("Astro Root props","value?: HEX string, disabled?: boolean, native div attributes","'#6366F1' / false","ColorRoot.astro seeds a cp-provider and a cp-compose binding boundary. It accepts serializable props and a slot, not a store or change callback. Use the custom element store in browser code. Angular uses value rather than defaultValue. Vue also accepts modelValue through v-model.",'<ColorRoot value="#5268E080"><ColorField value="#5268E080" /></ColorRoot>')),["ColorPicker.Slider","ColorPicker.Input / ChannelInput"].includes(e.name)&&o.push(Re("Astro value","HEX string","'#6366F1'","Seeds the native range or input during server rendering. Match the root seed. A form value attribute is a color seed here, rather than the slider channel number.",'value="#5268E080"')),e.name==="ThemeStudio.Wheel"&&o.push(Re("Angular / Vanilla wheel",'data-tk-control="wheel" with data-marker-id buttons',"Your own markup","There is no Angular ThemePickerWheel directive. Use the ready ThemeWheel with an explicit picker, or mountThemeControls() on an owned DOM subtree with wheel and marker attributes. Destroy those bindings with the owning component.",'<div data-tk-control="wheel"><button data-marker-id="primary">Brand</button></div>')),o.length?{...e,fields:[...e.fields,...o]}:e}const S=(e,t,o,a,n)=>({key:e,type:t,default:o,description:a,example:n,required:o==="Required"}),J=(e,t,o,a,n)=>({id:e.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name:e,kind:"Component",description:t,fields:o,example:{file:"Composition.tsx",code:`import { ${n==="color-picker"?"ColorPicker":"ThemeStudio"}, create${n==="color-picker"?"Color":"Theme"}Store } from '@salyra-ui/${n}/react';

${a}`}}),te=S("native attributes","HTML attributes, events and ref","No extra attributes","Forwards classes, style, id, name, ARIA attributes and events to the actual control or scope. React, Svelte and Vue context roots render no element. Angular uses a directive on your element, while Astro uses a custom element. Svelte uses class and bind:ref, React uses className and ref, Vue exposes element on the component ref.",'id="brand" aria-describedby="brand-help"');function nr(e){return e==="color-picker"?[J("ColorPicker.Root","Shares one color store without rendering a wrapper or fieldset.",[S("store","ColorStore","Created internally","Uses an existing store. Keep its identity stable for the lifetime of the root.","store={store}"),S("value","HEX string","Uses defaultValue","Synchronizes external value changes. React uses value/onValueChange, Svelte supports bind:value, Vue supports v-model. The value includes alpha when present.",'value="#5268E080"'),S("defaultValue","HEX string","'#6366F1'","Seeds an internally created store once. Use this for uncontrolled editing.",'defaultValue="#277D59"'),S("disabled","boolean","Store setting","Disables the native primitive controls and pointer surfaces. Does not prevent programmatic store changes.","disabled={true}"),S("onValueChange","(value: string) => void","No callback","Receives actual color/alpha changes, excluding format and view changes. Vue emits valueChange as well as update:modelValue.","onValueChange={setValue}"),S("children","Framework content","Required","Arrange any elements and primitive controls inside this context.","<ColorPicker.Input />")],`const store=createColorStore("#5268E080");
<ColorPicker.Root store={store}><label>Brand<ColorPicker.Input /></label></ColorPicker.Root>`,e),J("ColorPicker.Area / Wheel","Interactive color surface. Add a Thumb yourself or supply Marker components for a multi-color wheel.",[te,S("view (Area / ColorPlane only)","'area' | 'wheel'","'area'","Changes the surface geometry. ColorPicker.Wheel and ColorWheelSurface always use wheel geometry.",'view="wheel"'),S("children","Framework content","No thumb","Owns the complete surface content. No selection dot is inserted automatically. Give the surface dimensions and the thumb a visible size.",'<ColorPicker.Thumb className="my-dot" />'),S("markers","readonly ColorMarker[]","Single store color","Enables generic multi-marker interaction. Supply marker nodes with matching ids. Theme roles are not part of color picker.","markers={markers}"),S("activeId","string","First marker id","Identifies the marker moved by an empty-surface interaction.",'activeId="brand"'),S("onSelect","(id: string) => void","No callback","Selects the clicked marker without relocating either color.","onSelect={setActiveId}"),S("onMarkerChange","(id: string, hsv: Partial<HSV>) => void","No callback","Receives pointer and keyboard edits for one marker. Update the source markers.","onMarkerChange={updateMarker}"),S("Astro value","HEX string","'#6366F1'","Seeds the server-rendered surface. Pass the same value to ColorRoot, ColorPlane and ColorThumb. The browser follows the root store. Astro surfaces do not accept the React multi-marker callbacks.",'value="#5268E080"')],'<ColorPicker.Root><ColorPicker.Wheel style={{width:240}}><ColorPicker.Thumb style={{width:16,height:16,border:"2px solid white"}} /></ColorPicker.Wheel></ColorPicker.Root>',e),J("ColorPicker.Thumb / Marker","Positions your own selection element. Thumb follows the nearest surface. Marker represents an explicitly supplied color.",[te,S("Astro value / view","HEX string / 'area' | 'wheel'","'#6366F1' / 'area'","Seeds the position of ColorThumb.astro during SSR. Match the parent surface. Browser bindings update the thumb from context.",'value="#5268E080" view="wheel"'),S("marker","ColorMarker","Required for Marker","Object with id, color: {h,s,v,hex}, optional label and ariaLabel. Marker emits no color updates by itself.","marker={markers[0]}"),S("active","boolean","false","Sets aria-pressed and data-state on a Marker.","active={activeId === marker.id}"),S("children","Framework content","No content for Thumb, marker.label for Marker","Use text, an icon or any custom content inside the element. Classes control its shape and decoration.","<span>Brand</span>")],'<ColorPicker.Root><ColorPicker.Area style={{height:180}}><ColorPicker.Thumb className="square-dot">Pick</ColorPicker.Thumb></ColorPicker.Area></ColorPicker.Root>',e),J("ColorPicker.Slider","A native range input with color-store behavior. Labels and layout belong to your application.",[te,S("channel","'h' | 's' | 'v' | 'alpha'","'h'","Hue uses degrees from 0 to 359. Saturation and brightness use 0 to 100. Alpha uses 0 to 100 percent with a 0.1 step. The store keeps alpha from 0 to 1.",'channel="alpha"'),S("disabled","boolean","false","Disables this input independently of the root. A disabled root also disables it.","disabled={true}")],'<ColorPicker.Root><label>Opacity<ColorPicker.Slider channel="alpha" /></label></ColorPicker.Root>',e),J("ColorPicker.Input / ChannelInput","A native input with validated local drafts. Invalid or incomplete text never enters the store.",[te,S("format","'hex' | 'rgb' | 'hsl' | 'hsv' | 'oklch' | 'oklab'","Current store format","Chooses the text syntax. Changing the store format updates inputs without a fixed format.",'format="hsl"'),S("index","0 | 1 | 2","Formatted text input","Enables a numeric channel field. Requires an explicit non-hex format. RGB channels use 0–255, HSL/HSV use degrees and percentages, OKLCH/OKLab lightness uses percentages.",'format="rgb" index={0}')],'<ColorPicker.Root><label>Red<ColorPicker.ChannelInput format="rgb" index={0} /></label><label>HEX<ColorPicker.Input format="hex" /></label></ColorPicker.Root>',e),J("ColorPicker.FormatTrigger","A native button for changing format, with your own content and events.",[te,S("format","'hex' | 'rgb' | 'hsl' | 'hsv' | 'oklch' | 'oklab'","Next supported format","Selects a fixed format when supplied, otherwise cycles through all formats.",'format="oklch"'),S("children / render","Framework content / React render callback","Current format in uppercase","React supports render(snapshot), Svelte accepts a children(snapshot) snippet, Vue exposes state in its default slot.","render={state => `Next after ${state.format}`}"),S("event cancellation","event.preventDefault()","Changes format after your handler","Cancel the click to keep the current format.","onClick={event => event.preventDefault()}")],'<ColorPicker.Root><ColorPicker.FormatTrigger format="rgb">RGB channels</ColorPicker.FormatTrigger></ColorPicker.Root>',e)]:[J("ThemeStudio.Root / Scope","Root provides theme state and lifecycle. Scope applies variables to a container you can style. ThemeProvider composes both with a disabled controls boundary.",[S("store","ThemeStore","Created internally","Root only. Uses the supplied store. Keep its identity stable for the lifetime of Root. Scope uses the nearest Root context and has no store prop in React, Svelte or Vue.","store={store}"),S("options","ThemeOptions","{}","Root only. Uses the same ThemeOptions documented under ThemeProvider. Initial theme, fallback, loader, storage, appearance and selection options initialize the store. Use its methods for subsequent updates.",'options={{theme,mode:"dark",modeStorage:false}}'),te,S("Astro Scope options","AstroThemeOptions","{}","Pass the same serializable options to ThemeRoot and ThemeVariableScope for matching server-rendered variables and loading state. Browser Scope follows the nearest Root. Vanilla uses tk-root and tk-scope, or bindThemeScope(element, store) for ordinary HTML.","<ThemeRoot options={options}><ThemeVariableScope options={options}>...</ThemeVariableScope></ThemeRoot>"),S("Scope children","Framework content","No content","Place themed elements inside Scope. You can use more than one Scope under a Root. Portalled content needs its own scope or copied variables.",'<ThemeStudio.Scope className="application">...</ThemeStudio.Scope>')],`const store=createThemeStore({modeStorage:false});
<ThemeStudio.Root store={store}><ThemeStudio.Scope><button>Continue</button></ThemeStudio.Scope></ThemeStudio.Root>`,e),J("ThemeStudio.PickerRoot","Connects color-picker primitives to the selected theme roles. Renders no role selectors, labels or surfaces.",[S("roles","readonly ('primary' | 'secondary' | 'accent')[]","All three roles","Registers only these roles for exports and limits role selection to them. Requires at least one unique role.",'roles={["primary","accent"]}'),S("activeRole","'primary' | 'secondary' | 'accent'","First selected role","Chooses which color feeds the shared slider and input controls. It must be included in roles.",'activeRole="accent"'),S("picker","ThemePickerStore","Created internally","Shares an existing picker controller.","picker={picker}"),S("disabled","boolean","false","Disables the active color controls and wheel. Theme-level disabled also applies.","disabled={true}"),S("view","'area' | 'wheel' | 'shared-wheel'","'shared-wheel'","Keeps picker view state for your own layout. PickerRoot never renders or switches surfaces by itself.",'view="wheel"'),S("controls","boolean","No rendering effect","Preset option accepted for compatibility with ThemePickerOptions. PickerRoot renders no controls regardless of this value. Arrange your own primitives in its children.","controls={false}"),S("children","Framework content","Required","Receives the picker context and active color context. ColorPicker.Input and Slider inside it edit only the active theme role.",'<ColorPicker.Input format="hex" />')],'<ThemeStudio.Root><ThemeStudio.PickerRoot roles={["primary"]}><ThemeStudio.Wheel /></ThemeStudio.PickerRoot></ThemeStudio.Root>',e),J("ThemeStudio.RoleTrigger","A native button that selects one theme role without moving its color.",[te,S("role","'primary' | 'secondary' | 'accent'","Required","Role to select. A role outside PickerRoot.roles is disabled.",'role="accent"'),S("children","Framework content","Role name","Use your own label or icon. Selection is exposed through aria-pressed and data-state.","Highlight")],'<ThemeStudio.Root><ThemeStudio.PickerRoot><ThemeStudio.RoleTrigger role="accent">Highlight</ThemeStudio.RoleTrigger></ThemeStudio.PickerRoot></ThemeStudio.Root>',e),J("ThemeStudio.Wheel","A color-picker wheel connected to the current theme picker, with optional custom marker markup.",[te,S("Astro theme / roles","Theme / readonly ('primary' | 'secondary' | 'accent')[]","Default theme / all three roles","ThemePickerWheel.astro uses these seeds to render initial markers. Pass the same theme and roles as Root and PickerRoot. React, Svelte and Vue read them from context instead.",'theme={theme} roles={["primary"]}'),S("children","Framework content","Markers for the selected roles","Supply ColorPicker.Marker elements to replace the default markers. useThemePicker() exposes their colors and active role. One selected role uses an unlabeled small dot.","<CustomThemeMarkers />")],'<ThemeStudio.Root><ThemeStudio.PickerRoot roles={["primary","accent"]}><ThemeStudio.Wheel className="my-wheel" /></ThemeStudio.PickerRoot></ThemeStudio.Root>',e),J("ThemeStudio.GeometryInput","A native numeric input that registers only its own geometry field for export.",[te,S("kind","'radius' | 'width'","'radius'","Radius is measured in rem. Border width is measured in px. Valid values are from 0 to 1000.",'kind="width"'),S("target","'DEFAULT' | 'input' | 'card' | 'popover' | 'button' | 'table' | 'picker'","'DEFAULT'","Selects the component token edited by this input. Mounting card radius does not register other radius or width tokens.",'target="card"'),S("Astro theme","Theme","Generated default theme","ThemeGeometryInput.astro reads this seed for its initial value. Pass the same theme used by ThemeRoot options. Browser updates follow context.","theme={theme}")],'<ThemeStudio.Root><label>Card corners<ThemeStudio.GeometryInput kind="radius" target="card" /></label></ThemeStudio.Root>',e)]}const g=(e,t,o,a,n)=>({key:e,type:t,default:o,description:a,example:n,required:o==="Required",readOnly:o!=="Required"&&["ratio / aa / aaa","suggestedForeground","history","Theme.schemaVersion","ThemeConfiguration.schemaVersion"].includes(e)||e==="store"&&o==="Isolated draft"}),X=(e,t,o,a,n,i)=>({id:e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-$/,""),name:e,kind:"Function",description:t,fields:o,example:{file:"Usage.ts",code:`import { ${n} } from '@salyra-ui/${a}';

${i}`}}),At=[X("createColorHistory","Keeps undo and redo steps for color and alpha edits. Changing the displayed format or surface does not add a step.",[g("store","ColorStore","Required","The color store to observe and restore.","createColorHistory(store)"),g("options.limit","positive integer","100","Maximum undo steps retained in memory. Older steps are dropped.","{ limit: 50 }"),g("begin() / end()","() => void","No transaction","Group several updates into one step. Transactions may be nested.","history.begin(); store.setAlpha(.5); history.end();"),g("undo() / redo()","() => void","No effect at the end of history","Restore color and alpha without changing format, view or disabled state. New edits discard the redo branch.","history.undo()"),g("getSnapshot()","{ canUndo, canRedo, length, index }","One initial entry","Read button availability. Subscribe to receive a new immutable snapshot after a history change.","history.getSnapshot().canUndo"),g("clear() / destroy()","() => void","Explicit cleanup","clear keeps the current value as the starting point. destroy releases subscriptions.","history.destroy()")],"color-picker","createColorStore, createColorHistory",`const store = createColorStore("#5268E080");
const history = createColorHistory(store, { limit: 50 });
history.begin();
store.setHex("#123456");
store.setAlpha(.5);
history.end();
history.undo();
history.redo();
history.destroy();`),X("mountHistory","Groups pointer drags, held arrow keys and text-field edits on an editor root. Works with every framework.",[g("root","HTMLElement","Required","The editor element whose gestures belong to this history. Mount after the DOM exists.","mountHistory(element, history)"),g("history","HistoryController","Required","A color or theme history controller.","createColorHistory(store)"),g("return value","() => void","Cleanup","Remove root/document listeners and finish any open transaction. Call on unmount.","detach()"),g("keyboard shortcut","Ctrl/Cmd+Z, Shift+Ctrl/Cmd+Z","Enabled outside editable fields","Undo and redo on surfaces/buttons. Text inputs retain their native editing shortcuts.","Focus the surface, then press Ctrl+Z.")],"color-picker","createColorStore, createColorHistory, mountHistory",`const history = createColorHistory(createColorStore());
const element = document.getElementById("editor")!;
const detach = mountHistory(element, history);
// On unmount:
detach();
history.destroy();`),X("bindColorForm","Adds one real form field for the selected color. Handles native validation, disabled state and form reset.",[g("root","HTMLElement","Required","An element inside the form, or the form itself.","bindColorForm(form, store, options)"),g("options.name","nonempty string","Required","Key included in FormData and normal form submission.",'{ name: "brandColor" }'),g("options.format","'hex' | 'rgb' | 'hsl' | 'hsv' | 'oklch' | 'oklab'","'hex'","Serialization format. HEX includes alpha. Other formats use the same strings as formatColor.",'{ format: "hsl" }'),g("options.defaultValue","HEX string","Current RGBA color at mount","Color restored by an uncancelled form reset.",'{ defaultValue: "#5268E080" }'),g("options.required / disabled","boolean","false","Native field constraints. Store disabled state also excludes the field from submission.","{ required: true }"),g("options.validate","(value: string) => string | undefined","No custom validation","Return an error message to make the field invalid, or undefined to accept the value.",'{ validate: value => value === "#000000" ? "Choose another color" : undefined }'),g("return value","{ input, getValue(), destroy() }","Mounted field","Read the submitted string or clean up the field and reset listener.","field.destroy()")],"color-picker","createColorStore, bindColorForm",`const store = createColorStore("#5268E080");
const form = document.querySelector<HTMLFormElement>("form")!;
const field = bindColorForm(form, store, { name: "brandColor", required: true });
console.log(new FormData(form).get("brandColor"));
// On unmount:
field.destroy();`),X("colorContrast","Measures text contrast after compositing alpha over the background and canvas. It does not change the selected color.",[g("foreground / background","HEX strings with optional alpha","Required","Text color and the surface behind it.",'colorContrast("#00000080", "#FFFFFF")'),g("options.canvas","opaque HEX string","'#FFFFFF'","Surface below a transparent background. Transparent canvases are rejected.",'{ canvas: "#171717" }'),g("options.text","'normal' | 'large'","'normal'","Uses AA/AAA thresholds for normal or large text.",'{ text: "large" }'),g("ratio / aa / aaa","number / boolean / boolean","Calculated","Full-precision contrast ratio and pass/fail results. Rounding is for display only.","result.ratio.toFixed(2)"),g("suggestedForeground","opaque HEX string","Black or white","The stronger of black and white on the rendered background. Apply only after user choice.","store.setHex(result.suggestedForeground)")],"color-picker","colorContrast",`const result = colorContrast("#5268E080", "#FFFFFF");
console.log(result.ratio, result.aa, result.aaa, result.suggestedForeground);`),X("createColorCollection","Keeps bounded recent and favorite colors independently of theme roles. Persistence is optional and begins on load().",[g("options.limit","integer from 1 to 1000","12","Maximum colors in each list. HEX values are normalized and deduplicated.","{ limit: 8 }"),g("options.favorites","readonly HEX string[]","[]","Initial favorites before a valid saved collection is loaded.",'{ favorites: ["#5268E0", "#277D59"] }'),g("options.storage","{ read(), write(snapshot) }","No persistence","Supply browserColorStorage(key) or your own synchronous storage adapter. Storage failures keep in-memory state usable.",'{ storage: browserColorStorage("app:colors") }'),g("load()","() => void","Explicit mount step","Reads persistence. Call on the client so server and hydration snapshots remain identical.","collection.load()"),g("remember(color)","(HEX string) => void","Explicit action","Moves a color to the front of recent colors. Call after selection or Save, rather than on every drag sample.","collection.remember(store.getSnapshot().value)"),g("toggleFavorite(color)","(HEX string) => void","Explicit action","Adds or removes a favorite color.",'collection.toggleFavorite("#5268E0")'),g("getSnapshot() / subscribe()","ColorCollectionSnapshot / subscription","Immutable arrays","Read recent and favorites arrays. Subscribe for UI updates. clearRecent() removes only recent colors.","collection.getSnapshot().favorites")],"color-picker","createColorCollection, browserColorStorage",`const collection = createColorCollection({ favorites: ["#5268E0"], storage: browserColorStorage("app:colors") });
// On client mount:
collection.load();
collection.remember("#12345680");
collection.toggleFavorite("#12345680");`)];At.push({id:"colorcollection",name:"ColorCollection",kind:"Component",description:"Displays recent or favorite swatches and applies the selected value to the nearest color context.",fields:[g("collection","ColorCollectionStore","Required","Collection whose colors this component renders.","collection={collection}"),g("kind","'recent' | 'favorites'","'recent'","Selects one list. Use two components to show both lists.",'kind="favorites"'),g("label","string","'Recent colors'","Visible legend. Set your own label when showing favorites.",'label="Saved brand colors"'),g("classes","{ root?, item?, label? }","{}","Classes for the fieldset, each swatch container/button and legend. Color fill comes from the selected HEX value.",'classes={{ root: "brand-list", item: "brand-swatch", label: "brand-label" }}'),g("renderLabel","(color: string) => ReactNode","No item text","React only. Supplies custom content for each color button. Vanilla mountColorCollection accepts a callback returning text. The Svelte, Vue and Angular presets support classes but do not accept a custom item renderer. Compose your own list with ColorSwatch when you need custom content.","renderLabel={value => value}"),g("Astro colors","readonly HEX string[]","[]","Astro renders serializable initial colors. On the client, cp-collection.setCollection(collection) connects a live collection.",'colors={["#5268E0"]}')],example:{file:"Collection.tsx",code:`import { useState } from 'react';
import { ColorProvider, ColorCollection, createColorCollection } from '@salyra-ui/color-picker/react';
export default function Collection() {
  const [collection] = useState(() => createColorCollection({favorites:['#5268E0','#277D59']}));
  return <ColorProvider><ColorCollection collection={collection} kind="favorites" label="Saved colors" classes={{item:'brand-swatch'}} /></ColorProvider>;
}`}});const sr=[X("createThemeEditor","Creates a separate draft store that works with every provider. The applied store changes only on Apply unless live editing is enabled.",[g("target","ThemeStore","Required","Applied context to edit. Pass editor.store to the editor provider and keep target around the application preview.","createThemeEditor(target)"),g("options.live","boolean","false","Apply each draft change immediately. setLive(true) commits the current draft first.","{ live: true }"),g("options.historyLimit","positive integer","100","Maximum undo steps in editor.history.","{ historyLimit: 50 }"),g("options.locked","readonly ThemeLock[]","[]","Initial generation locks. primary, secondary, accent and background affect regeneration. Radius/width are already preserved by generation.",'{ locked: ["accent", "background"] }'),g("store","ThemeStore","Isolated draft","Use existing picker, name, mode and geometry components against this store. Draft persistence is disabled by default.","<ThemeProvider store={editor.store}>...</ThemeProvider>"),g("history","HistoryController","One initial entry","Undo or redo draft edits. Use mountHistory(root, editor.history) to group drags and field edits.","editor.history.undo()"),g("setLive(live)","(boolean) => void","false","Enable immediate application or return to draft editing. Enabling commits the current draft.","editor.setLive(true)"),g("subscribe(listener)","(listener: () => void) => () => void","Explicit subscription","Observe dirty, conflict, live and locked state. The returned function unsubscribes.","const unsubscribe = editor.subscribe(renderButtons)"),g("apply({ force? })","({ force?: boolean }) => void","force: false","Commit theme and mode. A remote change during editing raises conflict. force explicitly replaces that newer applied theme.","editor.apply({ force: true })"),g("cancel()","() => void","Explicit action","Load the latest applied theme and mode, clear dirty/conflict state and reset draft history.","editor.cancel()"),g("setLocked(field, locked?)","(ThemeLock, boolean) => void","locked: true","Exclude a field from regeneration. Manual color editing remains available.",'editor.setLocked("accent", true)'),g("getSnapshot()","{ dirty, conflict, live, locked }","No edits","State for Apply/Cancel buttons, conflict text and lock controls. Subscribe for changes.","editor.getSnapshot().dirty"),g("destroy()","() => void","Explicit cleanup","Remove source/draft subscriptions and dispose history. Detach mounted gesture listeners separately.","editor.destroy()")],"theme-studio","createThemeStore, createThemeEditor",`const target = createThemeStore({modeStorage:false});
const editor = createThemeEditor(target, {locked:["accent"]});
editor.store.setColor("primary", "#123456");
editor.apply();
editor.store.setName("Another draft");
editor.cancel();
editor.destroy();`),X("createThemeHistory","Tracks theme and appearance preference changes. Loading status, disabled state, export field registration and system appearance changes do not add history steps.",[g("store","ThemeStore","Required","Applied or draft store whose editable values should be restored.","createThemeHistory(store)"),g("options.limit","positive integer","100","Maximum undo steps. Methods and gesture mounting match createColorHistory.","{limit:50}"),g("begin() / end() / undo() / redo()","() => void","No transaction","Group a drag or multiple setters and restore it as one action.",'history.begin(); store.setName("Brand"); history.end();')],"theme-studio","createThemeStore, createThemeHistory",`const store = createThemeStore();
const history = createThemeHistory(store);
history.begin();
store.setName("Brand");
store.setBorder("radius", "card", .75);
history.end();
history.undo();
history.destroy();`),X("themeTailwind","Exports selected runtime variables and Tailwind 4 utility mappings. Colors map to bg/text utilities, radius to rounded utilities and width to custom border utilities.",[g("state","ThemeSnapshot","Required","Current theme and resolved appearance.","themeTailwind(store.getSnapshot())"),g("options.selection","TokenSelection","Store selection, otherwise all tokens","Only the configured roles, geometry and background are included. modes selects one or both appearance modes.",'{selection:{roles:["primary"],radius:["card"],width:["button"]}}'),g("options.selector","CSS selector","':root'","Scope for runtime variables of the first exported appearance mode.",'{selector:".app-theme"}'),g("options.darkSelector","CSS selector","'.dark'","Scope for dark variables when both modes are exported. Match the application class or data attribute.",`{darkSelector:'.app-theme[data-mode="dark"]'}`),g("return value","string","Tailwind CSS","Import after Tailwind. bg-primary, text-primary-foreground, rounded-card and border-button exist only for exported fields.","config.tailwind")],"theme-studio","createThemeStore, themeTailwind",`const store = createThemeStore({selection:{roles:["primary"],radius:["card"],width:["button"],background:true,modes:["light","dark"]}});
const css = themeTailwind(store.getSnapshot(), {selector:".app-theme",darkSelector:'.app-theme[data-mode="dark"]'});
console.log(css);`),X("themeContrast","Checks a theme role foreground against its default palette color using the same contrast result as colorContrast.",[g("state","ThemeSnapshot","Required","Theme to inspect.","themeContrast(store.getSnapshot())"),g("role","'primary' | 'secondary' | 'accent'","'primary'","Palette whose text/surface pair should be measured.",'themeContrast(store.getSnapshot(), "accent")'),g("return value","ContrastResult","Calculated","ratio, aa, aaa and suggestedForeground. This helper does not modify the theme.","result.aa")],"theme-studio","createThemeStore, themeContrast",`const store = createThemeStore();
const result = themeContrast(store.getSnapshot(), "primary");
console.log(result.ratio, result.aa);`),X("createThemeCollection","Keeps recent and favorite complete themes for your existing preset selector. Themes with the same ID replace the previous saved value.",[g("options.limit","integer from 1 to 1000","12","Maximum themes in each list.","{limit:8}"),g("options.favorites","readonly Theme[]","[]","Initial complete themes. Inputs are validated and frozen.",'{favorites:[generateTheme("#5268E0")]}'),g("options.storage","ThemeCollectionStorage","No persistence","Use browserThemeCollectionStorage(key) or synchronous read/write methods. Call load() on client mount.",'{storage:browserThemeCollectionStorage("app:theme-library")}'),g("remember(theme) / toggleFavorite(theme)","(Theme) => void","Explicit action","Store the applied theme after Apply, or toggle a favorite by its ID.","collection.remember(store.getSnapshot().theme)"),g("getSnapshot()","{ recent: readonly Theme[], favorites: readonly Theme[] }","Immutable arrays","Pass the favorites or recent list to ThemeSelect. Subscribe to keep a reactive list current.","collection.getSnapshot().favorites")],"theme-studio","createThemeCollection, browserThemeCollectionStorage, generateTheme",`const collection = createThemeCollection({favorites:[generateTheme("#5268E0")],storage:browserThemeCollectionStorage("app:theme-library")});
// On client mount:
collection.load();
collection.remember(generateTheme("#277D59"));`),X("Theme schema version","Current themes and configuration exports use schemaVersion: 1. Older unversioned and version 0 themes are upgraded by parseTheme.",[g("Theme.schemaVersion","1","Added by parseTheme","Stored format version. Missing values on old input are accepted. Unsupported versions fail before being applied.","parseTheme(saved).schemaVersion"),g("ThemeConfiguration.schemaVersion","1","Always present","Version of exported configuration JSON. Partial exports still contain only selected fields.","JSON.parse(config.json).schemaVersion"),g("mergeThemeConfiguration(base, saved)","Theme","Validated merge","Load partial JSON over a full base. Version validation also applies to the merged theme.","mergeThemeConfiguration(base, saved)")],"theme-studio","generateTheme, parseTheme",`const theme = generateTheme("#5268E0");
const saved = JSON.stringify(theme);
const restored = parseTheme(JSON.parse(saved));
console.log(restored.schemaVersion);`)];function ir(e){return e==="color-picker"?At:sr}const lr={"color-picker":{"ColorPicker.Root":["ColorRoot","ColorPicker"],"ColorPicker.Area / Wheel":["ColorPlane","ColorWheelSurface"],"ColorPicker.Thumb / Marker":["ColorThumb","ColorMarkerThumb"],"ColorPicker.Slider":["ColorRange"],"ColorPicker.Input / ChannelInput":["ColorField"],"ColorPicker.FormatTrigger":["ColorFormatTrigger"],ColorProvider:["ColorProvider"],ColorArea:["ColorArea"],ColorWheel:["ColorWheel"],ColorSlider:["ColorSlider"],ColorInput:["ColorInput"],ColorChannelInput:["ColorChannelInput"],ColorTextInput:["ColorTextInput"],ColorAlphaInput:["ColorAlphaInput"],ColorFormatSelect:["ColorFormatSelect"],ColorMode:["ColorMode"],"ColorEyeDropper / ColorPicker.EyeDropper":["ColorEyeDropper"],"ColorViewSelect / ColorSurface":["ColorViewSelect","ColorSurface"],"ColorSwatch / ColorPreview":["ColorSwatch","ColorPreview"],ColorCollection:["ColorCollection"],"useColorStore / useColor":["useColorStore","useColor"],"Context setup":["provideColor","watchColor","ColorContext","ColorSurfaceContext","colorPickerPrimitives"]},"theme-studio":{"ThemeStudio.Root / Scope":["ThemeRoot","ThemeVariableScope","ThemeStudio"],"ThemeStudio.PickerRoot":["ThemePickerRoot"],"ThemeStudio.RoleTrigger":["ThemeRoleTrigger"],"ThemeStudio.Wheel":["ThemePickerWheel"],"ThemeStudio.GeometryInput":["ThemeGeometryInput"],ThemeProvider:["ThemeProvider"],ThemePicker:["ThemePicker"],"ThemeGenerator / ThemeColor":["ThemeGenerator","ThemeColor"],ThemeHarmony:["ThemeHarmony"],ThemeBackground:["ThemeBackground"],"ThemeBorder / ThemeRadius / ThemeBorderWidth":["ThemeBorder","ThemeRadius","ThemeBorderWidth"],ThemePalette:["ThemePalette"],ThemeMode:["ThemeMode"],useThemeMode:["useThemeMode"],ThemeName:["ThemeName"],"ThemeSelect / ThemeSwatch":["ThemeSelect","ThemeSwatch"],"ThemeLoading / ThemeReady / ThemeError":["ThemeLoading","ThemeReady","ThemeError"],ThemeExport:["ThemeExport"],ThemeWheel:["ThemeWheel"],"useThemeStore / useTheme":["useThemeStore","useTheme"],"useThemePickerStore / useThemePicker":["useThemePickerStore","useThemePicker"],"Context setup":["provideTheme","watchTheme","provideThemePicker","ThemeContext","ThemePickerContext","themeStudioPrimitives"]}},x=(e,t,o,a,n)=>({key:e,type:t,default:o,description:a,example:n,required:o==="Required"}),me=(e,t,o,a,n,i,s,l)=>({id:e.toLowerCase().replace(/[^a-z0-9]+/g,"-"),name:e,kind:t,description:o,fields:a,note:l,example:{file:"Context.tsx",code:`import { ${i} } from '@salyra-ui/${n}/react';

${s}`}}),st="Call context helpers inside a descendant component, not the component that creates the Root. React returns a snapshot and rerenders on changes. Svelte returns a readable store, accessed with $state in markup. Vue returns a shallow ref, accessed with state.value in setup and unwrapped in templates. Angular returns a readonly signal, read with state(). Call Svelte helpers during component initialization, Vue helpers in setup and Angular helpers in an injection context. Astro and Vanilla use store.getSnapshot() and store.subscribe() in browser code instead of these hooks.";function cr(e){const t=e==="color-picker",o=t?"Color":"Theme",a=[me(`use${o}Store / use${o}`,"Function",`Read the nearest ${t?"ColorProvider or ColorPicker.Root":"ThemeProvider or ThemeStudio.Root"} context. The store provides actions and the snapshot provides reactive values.`,[x(`use${o}Store()`,`${o}Store`,"Nearest root","Returns the stable context store. Calling outside a root throws. This helper does not subscribe or create a store.",`const store = use${o}Store()`),x(`use${o}()`,`${o}Snapshot (adapter-specific reactive wrapper)`,"Current snapshot","Subscribes to changes and cleans up with the framework component. See the adapter rules below.",`const state = use${o}()`)],e,`use${o}Store, use${o}`,t?`export function SelectedColor() {
  const state = useColor();
  const store = useColorStore();
  return <button onClick={() => store.setHex("#277D59")}>{state.value}</button>;
}`:`export function SelectedTheme() {
  const state = useTheme();
  const store = useThemeStore();
  return <button onClick={() => store.setMode("dark")}>{state.theme.name}</button>;
}`,st)];if(t||a.push(me("useThemePickerStore / useThemePicker","Function","Read the active role and controller inside ThemeStudio.PickerRoot. Theme context alone is not a picker context.",[x("useThemePickerStore()","ThemePickerStore","Nearest PickerRoot","Returns actions such as selectRole(), setRoles(), setHSV() and activeColor. Throws outside a picker root.","const picker = useThemePickerStore()"),x("useThemePicker()","ThemePickerSnapshot (adapter-specific reactive wrapper)","Current picker snapshot","Reads roles, activeRole, view and colors. Each color snapshot contains its own disabled state. Uses the same adapter subscription rules as useTheme().","const state = useThemePicker()")],e,"useThemePickerStore, useThemePicker",`export function ActiveRole() {
  const picker = useThemePickerStore();
  const state = useThemePicker();
  return <button onClick={() => picker.selectRole(state.roles[0])}>{state.activeRole}</button>;
}`,st),me("ThemeWheel","Component","Ready-made shared wheel driven by an explicit picker controller. Use ThemeStudio.Wheel when you want native attributes, custom classes and marker children.",[x("picker","ThemePickerStore","Required","Use the same mounted picker as your role controls. This component subscribes to it but does not mount it or own its lifecycle.","picker={picker}")],e,"ThemeStudio, ThemeWheel, useThemePickerStore",`function Wheel() {
  const picker = useThemePickerStore();
  return <ThemeWheel picker={picker} />;
}
export function Editor() {
  return <ThemeStudio.Root><ThemeStudio.PickerRoot roles={["primary", "accent"]}><Wheel /></ThemeStudio.PickerRoot></ThemeStudio.Root>;
}`,'Available in React, Svelte, Vue and Angular. Astro uses ThemePickerWheel.astro. Vanilla uses data-tk-control="wheel" under mountThemeControls(). ThemeWheel is a preset and uses the optional package CSS.')),a.push(me("Context setup","Function","Advanced adapter helpers for supplying context from your own wrapper. Root is the usual entry point because it also owns lifecycle.",[x(`provide${o}(store)`,`Svelte / Vue: ${o}Store`,"No context until supplied","Call during Svelte initialization or Vue setup. Supplies context only. Does not mount loading, storage or browser listeners.",`provide${o}(store)`),x(`watch${o}(store)`,`Vue: ShallowRef<${o}Snapshot>`,"Current snapshot","Subscribes to an explicit store in Vue setup and unsubscribes on scope disposal. Does not require an injected root.",`const state = watch${o}(store)`),x(`${o}Context`,"Angular injectable","Provided by the matching Root or Provider","Infrastructure for directives and components. configure(store) changes its backing store. Use use"+o+"Store() in application code rather than configuring a shared service.",`const store = use${o}Store()`),...t?[x("ColorSurfaceContext","Angular injectable","Provided by cpArea / cpWheel","Shares the surface view with cpThumb. Provided by the surface directive, not the color root.","<div cpWheel><span cpThumb></span></div>")]:[x("provideThemePicker(picker)","Svelte / Vue: ThemePickerStore","No picker context until supplied","Provides picker context only. A custom wrapper must also provide the active color store and mount/clean up the picker. Prefer ThemeStudio.PickerRoot.","provideThemePicker(picker)"),x("ThemePickerContext","Angular injectable","Provided by tkPickerRoot","Holds the nearest picker controller. configure(picker) changes the backing controller. Prefer useThemePickerStore() for actions.","const picker = useThemePickerStore()")],x(t?"colorPickerPrimitives":"themeStudioPrimitives","Angular: readonly directive array","All headless directives","Spread into a standalone component imports array to register the primitive directives. Ready-made components are imported separately.",`imports: [...${t?"colorPickerPrimitives":"themeStudioPrimitives"}]`)],e,`use${o}Store`,`export function CustomAction() {
  const store = use${o}Store();
  return <button onClick={() => store.setDisabled(true)}>Lock editing</button>;
}`,"These are adapter-specific exports. provide*/watch* are Svelte or Vue helpers, injectable context classes and primitive arrays belong to Angular. React context hooks need a matching Root above the calling component. They are not Astro or Vanilla APIs."),me(t?"mountColorControls":"mountThemeControls","Function","Bind existing HTML without generating a layout. Your application owns labels, classes, content and teardown.",[x("root","HTMLElement","Required","Container holding the data attributes below. Mount once and destroy before remounting or replacing its markup.",'document.querySelector<HTMLElement>("#editor")!'),x("store",`${o}Store`,"Required","Existing store shared with the rest of your application.",`create${o}Store()`),...t?[]:[x("options","ThemePickerOptions","{}","roles, activeRole, view, disabled and controls options for the picker controller. The function registers roles and each mounted geometry field for export.",'{roles:["primary"],activeRole:"primary"}')],x("data-cp-control","'area' | 'wheel' | 'slider' | 'input' | 'format'","No behavior without an attribute",'Surfaces contain data-cp-part="thumb". Sliders use data-channel h/s/v/alpha. Inputs optionally use data-format and data-index. A format button with no data-format cycles formats.','<input data-cp-control="slider" data-channel="alpha" />'),...t?[]:[x("data-tk-control","'wheel' | 'role' | 'geometry'","No behavior without an attribute","Role buttons use data-role. Geometry inputs use data-kind radius/width and data-target. Wheel children use data-marker-id matching selected roles. Other color controls connect to the active role.",'<input data-tk-control="geometry" data-kind="radius" data-target="card" />')],x("return value",t?"{store, destroy()}":"{store, picker, getConfiguration(), destroy()}","One bound editor","destroy() removes subscriptions and handlers. It does not remove your HTML or stop the externally owned theme store. Theme getConfiguration() exports only registered or explicitly selected fields.","controls.destroy()")],e,`create${o}Store`,`const store = create${o}Store();
console.log(store.getSnapshot());`,"Vanilla export. Astro primitives use these bindings internally. Native attributes and your own click handlers stay on the actual elements. Call preventDefault() to cancel the default format or role action.")),!t){const s=me("ThemePickerSnapshot","Return value","Reactive picker state returned by getSnapshot() and useThemePicker(). All colors are available internally, while roles controls the visible and exported subset.",[x("roles","readonly ('primary' | 'secondary' | 'accent')[]","Configured roles","Nonempty unique list of visible roles. Switching roles does not recolor their palettes.","state.roles"),x("activeRole","'primary' | 'secondary' | 'accent'","First configured role","The selected role edited by activeColor. Always belongs to roles.","state.activeRole"),x("view","'area' | 'wheel' | 'shared-wheel'","'shared-wheel'","The selected view state. Custom compositions decide what markup to render for it.","state.view"),x("colors","Readonly<Record<Role, ColorSnapshot>>","All three role snapshots","Color, alpha, format, view and disabled state for each role. These internal snapshots are not an export selection.","state.colors[state.activeRole].hex")],e,"createThemeStore, createThemePickerStore",`const store = createThemeStore({modeStorage:false});
const picker = createThemePickerStore(store,{roles:["primary"]});
console.log(picker.getSnapshot().colors.primary.hex);`);s.example.file="PickerSnapshot.ts",a.push(s)}const n=a.find(s=>s.name===(t?"mountColorControls":"mountThemeControls"));n.example={file:"NativeControls.ts",code:`import { create${o}Store, mount${o}Controls${t?"":", bindThemeScope"} } from '@salyra-ui/${e}/vanilla';

const root = document.createElement('section');
root.innerHTML = '${t?'<label>Opacity<input data-cp-control="slider" data-channel="alpha" /></label>':'<label>Primary<input data-cp-control="input" data-format="hex" /></label><label>Card corners<input data-tk-control="geometry" data-kind="radius" data-target="card" /></label>'}';
const store = create${o}Store(${t?"'#5268E080'":"{modeStorage:false}"});
${t?"":"const detachScope = bindThemeScope(root, store);"}
const controls = mount${o}Controls(root, store${t?"":', {roles:["primary"]}'});
document.body.append(root);
// When this editor is removed:
controls.destroy();
${t?"":"detachScope();"}
root.remove();`},t||a.push(me("bindThemeScope","Function","Apply the theme variables to an existing HTML container independently of editor controls.",[x("element","HTMLElement","Required","CSS inheritance is limited to this subtree. Portals outside it need a separate scope binding.",'document.querySelector<HTMLElement>("#preview")!'),x("store","ThemeStore","Required","The state used for CSS variables and data-mode, data-mode-preference, data-theme, data-theme-status and data-disabled attributes. Binding a scope does not create an isolated store.","bindThemeScope(element, store)"),x("return value","() => void","Active subscription","Call to unsubscribe and restore previous values of theme-owned CSS properties. Other inline styles are preserved. Scope data attributes are left on the element.","detach()")],e,"createThemeStore, bindThemeScope",`const store = createThemeStore({modeStorage:false});
const element = document.createElement("section");
const detach = bindThemeScope(element, store);
store.setMode("dark");
detach();`));const i=a.find(s=>s.name==="bindThemeScope");return i&&(i.example.file="Scope.ts",i.example.code=i.example.code.replace("/react","/vanilla")),a}const r=(e,t,o,a,n,i=!1)=>({key:e,type:t,default:o,description:a,example:n,required:i}),he="'hex' | 'rgb' | 'hsl' | 'hsv' | 'oklch' | 'oklab'",ie="'primary' | 'secondary' | 'accent'",Se="'DEFAULT' | 'input' | 'card' | 'popover' | 'button' | 'table' | 'picker'",se="'system' | 'light' | 'dark'",Me="'analogous' | 'triadic' | 'split-complementary'",Mt="50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950",K=r("className","string","''","Adds a CSS class to the component root. The existing component class stays in place.",'className="brand-picker"'),ue=r("classes","ColorPartClasses","{}","Assigns classes to individual parts. See ColorPartClasses below for the supported keys.","classes={{ root: 'brand-area', thumb: 'brand-dot', text: 'dot-label' }}"),ne=r("className","string","''","Adds your CSS class to the root element.",'className="brand-theme"'),xe=r("disabled","boolean","false","Blocks pointer, keyboard and form editing. Values stay visible and programmatic store updates remain available.","disabled={true}"),it=r("role",ie,"'primary'","Chooses the theme palette this component reads or edits. Primary is the main color, secondary is the supporting color and accent is the emphasis color.",'role="accent"'),C=(e,t,o)=>({file:"Usage.tsx",code:`import { ${[e==="color-picker"?"ColorProvider":"ThemeProvider",...e==="theme-studio"?["generateTheme"]:[],...t].filter((a,n,i)=>i.indexOf(a)===n).join(", ")} } from '@salyra-ui/${e}/react';
import '@salyra-ui/${e}/styles.min.css';

export function Example() {
  return ${e==="color-picker"?'<ColorProvider value="#5268E0">':'<ThemeProvider theme={generateTheme("#5268E0")} modeStorage={false}>'}
    ${o}
  </${e==="color-picker"?"ColorProvider":"ThemeProvider"}>;
}`}),j=(e,t,o)=>({file:"usage.ts",code:`import { ${t.join(", ")} } from '@salyra-ui/${e}';

${o}`}),y=(e,t,o,a,n,i)=>({id:e==="ThemeConfiguration"?"theme-configuration":e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/-$/,""),name:e,kind:t,description:o,fields:a,example:n,note:i}),We=[y("ColorProvider","Component","Shares one selected color with its surfaces, sliders, inputs and format controls.",[r("value","HEX string","'#6366F1'","Sets the initial color. React also applies subsequent value changes. Accepts short or full hex, with optional alpha.",'value="#5268E080"'),r("store","ColorStore","Created internally","Uses an existing store instead of creating one. Supply it when several consumers must share state or you need a starting format other than hex.","store={createColorStore('#5268E0', 'hsl')}"),r("view","'area' | 'wheel'","'area'","Sets the initial surface for a new store. area shows a rectangle and wheel shows a circle. With a supplied store, its own view is used.",'view="wheel"'),{...xe,default:"false for a new store",description:`${xe.description} Omitting this property preserves the state of a supplied store.`},r("onChange","(hex: string) => void","No callback","Receives RGBA hex after an actual color change. Format and view changes do not call it. It does not emit the initial value.","onChange={(hex) => console.log(hex)}"),r("children","ReactNode","None","The controls that share this color context. A nested ColorProvider creates an independent context.","<ColorProvider><ColorArea /></ColorProvider>",!0)],C("color-picker",["ColorWheel","ColorSlider","ColorInput"],'<ColorWheel /><ColorSlider channel="v" /><ColorSlider channel="alpha" /><ColorInput />'),"Use useColorStore() and useColor() inside a child of the provider. Svelte and Vue expose reactive store reads. Vanilla uses cp-provider.setStore(store) and the color-change DOM event."),y("ColorArea","Component","A rectangle that edits saturation horizontally and brightness vertically. Hue and alpha stay unchanged.",[K,ue,r("label","string","'Saturation and brightness'","Names the surface for assistive technology. Current saturation and brightness are appended to this label.",'label="Brand color"'),r("style","React.CSSProperties","{}","Overrides root dimensions or adds CSS variables. In Svelte and Astro, style is a CSS string.","style={{ minHeight: 200 }}"),r("thumbText","ReactNode","No text","Renders content inside the single selection dot. Svelte and Astro accept a string. Vue also supports its thumb slot.",'thumbText="C"'),r("renderThumb","(state: ColorSnapshot) => ReactNode","Uses thumbText","React render callback for dynamic dot content. Svelte uses a thumb snippet and Vue uses a thumb slot.","renderThumb={(state) => Math.round(state.s)}")],C("color-picker",["ColorArea","ColorSlider"],'<ColorArea thumbText="C" classes={{ thumb: "brand-dot" }} /><ColorSlider channel="h" />')),y("ColorWheel","Component","A circle that edits hue by angle and saturation by distance from the center. Pair it with a brightness slider.",[K,ue,r("label","string","'Hue and saturation wheel'","Accessible name for the picking surface.",'label="Choose a color"'),r("style","React.CSSProperties","{}","Adds root styling and CSS variables. It does not change color calculations.","style={{ maxWidth: 280 }}"),r("thumbText","ReactNode","No text","Content inside the single color dot. It is used when markers is omitted.",'thumbText="C"'),r("markers","readonly ColorMarker[]","One store-controlled dot","Enables multiple independently controlled markers. Each marker needs a unique id and a color. This is a generic color-picker capability, with no theme roles built in.",'markers={[{ id: "brand", color: { h: 220, s: 60, v: 80, hex: "#527ACC" }, label: "B" }]}'),r("activeId","string","First marker for keyboard editing","Identifies the active marker. Pass this explicitly to keep visual selection and keyboard editing in sync.",'activeId="brand"'),r("onSelect","(id: string) => void","No callback","Receives the clicked marker id. Update your activeId in response. Selecting a marker does not move it.","onSelect={(id) => setActiveId(id)}"),r("onMarkerChange","(id: string, hsv: Partial<HSV>) => void","No callback","Receives marker edits from a drag or keyboard action. Update that marker in your state.","onMarkerChange={(id, hsv) => updateMarker(id, hsv)}"),r("renderMarker","(marker: ColorMarker, active: boolean) => ReactNode","Uses marker.label","Replaces marker text in React. Svelte uses a marker snippet and Vue a marker slot. A single marker has a small dot by default.","renderMarker={(marker) => marker.label}")],C("color-picker",["ColorWheel","ColorSlider"],'<ColorWheel thumbText="C" /><ColorSlider channel="v" /><ColorSlider channel="alpha" />')),y("ColorSlider","Component","Edits one HSV or alpha channel while keeping the other channels. Brightness and saturation tracks reflect the selected color.",[r("channel","'h' | 's' | 'v' | 'alpha'","'h'","h edits hue from 0 to 359 degrees. s edits saturation, v edits brightness and alpha edits opacity, each from 0 to 100 in the UI.",'channel="alpha"'),r("label","string","Hue / Saturation / Brightness / Alpha","Replaces the visible and accessible label for the selected channel.",'label="Opacity"'),K,ue],C("color-picker",["ColorSlider"],'<ColorSlider channel="alpha" label="Opacity" classes={{ track: "opacity-track" }} />')),y("ColorInput","Component","Displays one HEX field or three separate numeric channel fields for the selected format.",[r("format",he,"Current store format","Locks this input to one format. Omit it to follow ColorFormatSelect or ColorMode. Does not change the store format.",'format="rgb"'),r("label","string","Uppercase format name","Labels the HEX input or the numeric field group. Individual numeric labels remain R/G/B, H/S/L and the corresponding channel names.",'label="Brand RGB"'),K,ue],C("color-picker",["ColorInput","ColorFormatSelect"],'<ColorFormatSelect /><ColorInput /><ColorInput format="rgb" label="Fixed RGB fields" />')),y("ColorChannelInput","Component","Displays one numeric channel from a fixed format. Alpha has its own component.",[r("format","'rgb' | 'hsl' | 'hsv' | 'oklch' | 'oklab'","None","Selects the channel model. HEX is excluded because it has no separate numeric channels. See Channel values for index mappings and ranges.",'format="hsl"',!0),r("index","0 | 1 | 2","None","Selects a channel in format order. For RGB, 0 is red, 1 is green and 2 is blue.","index={1}",!0),K,ue],C("color-picker",["ColorChannelInput"],'<ColorChannelInput format="hsl" index={0} /><ColorChannelInput format="hsl" index={1} /><ColorChannelInput format="hsl" index={2} />')),y("ColorTextInput","Component","An optional single text field for a full formatted color. Use ColorInput for separate numeric channel fields.",[r("format",he,"Current store format","Chooses how the text is parsed and displayed. Invalid input is marked and restored on blur or Enter.",'format="oklch"'),r("label","string","Uppercase format name","Sets the visible input label.",'label="CSS color"'),K,ue],C("color-picker",["ColorTextInput"],'<ColorTextInput format="hex" label="Color value" />')),y("ColorAlphaInput","Component","Edits opacity numerically as a percentage. The stored alpha uses 0 to 1.",[r("label","string","'Alpha'","Replaces the visible and accessible label. The percent unit remains visible.",'label="Opacity"'),K,ue,r("value range","number: 0 to 100","Store alpha × 100","The input uses a 0.1 step. Empty, non-finite or out-of-range drafts are invalid and restore on blur.","50% in this field equals store.setAlpha(0.5)")],C("color-picker",["ColorAlphaInput"],'<ColorAlphaInput label="Opacity" />'),"value range describes the input constraint. It is not a component prop."),y("ColorFormatSelect","Component","Chooses which format the following ColorInput displays. The selected color does not change.",[r("label","string","'Color format'","Replaces the dropdown label. The six format choices remain HEX, RGB, HSL, HSV, OKLCH and OKLAB.",'label="Display format"'),K],C("color-picker",["ColorFormatSelect","ColorInput"],'<ColorFormatSelect label="Display format" /><ColorInput />')),y("ColorMode","Component","A button that cycles through hex, rgb, hsl, hsv, oklch and oklab, then returns to hex.",[K,r("children","ReactNode | ((format: ColorFormat) => ReactNode)","Current format + switch indicator","Replaces the button content with text, an icon or dynamic markup. The callback receives the lowercase format key.","<ColorMode>{(format) => `Change ${format.toUpperCase()}`}</ColorMode>")],C("color-picker",["ColorMode","ColorInput"],"<ColorInput /><ColorMode>{(format) => `Change ${format.toUpperCase()}`}</ColorMode>"),"Svelte: children(format) snippet. Vue: default slot with format. Angular: projected template with let-format. Astro: slot content. Vanilla: cp-mode data-custom with your button, and data-color-format on the span that should follow the format."),y("ColorViewSelect / ColorSurface","Component","ColorViewSelect chooses a layout. ColorSurface renders the chosen surface and its matching hue or brightness slider.",[r("label","string on ColorViewSelect","'Picker view'","Labels the view dropdown. area is displayed as Rectangle and wheel as Wheel.",'label="Layout"'),{...K,description:"Adds a root class to ColorViewSelect. ColorSurface has no React props and uses the current store view."}],C("color-picker",["ColorViewSelect","ColorSurface","ColorInput"],'<ColorViewSelect label="Layout" /><ColorSurface /><ColorInput />')),y("ColorSwatch / ColorPreview","Component","ColorSwatch applies a supplied color on click. ColorPreview displays the selected RGBA value.",[r("value","HEX string on ColorSwatch","None","The preset color applied by the swatch. ColorPreview reads the store instead of taking a value.",'value="#277D59"',!0),r("label","string on ColorSwatch","The value string","Accessible name for the swatch button.",'label="Forest green"'),K],C("color-picker",["ColorSwatch","ColorPreview"],'<ColorSwatch value="#277D59" label="Forest green" /><ColorPreview />')),y("ColorPartClasses","Styling","Part-level CSS class names used by the surface, slider and input components. Unsupported keys are ignored by that component.",[r("root","string","''","Adds a class to the control root. Supported by surfaces, sliders and inputs.","classes={{ root: 'brand-control' }}"),r("thumb","string","''","Styles the single selection dot in ColorArea or ColorWheel.","classes={{ thumb: 'square-dot' }}"),r("marker","string","''","Styles each interactive marker in a multi-marker ColorWheel.","classes={{ marker: 'brand-marker' }}"),r("text","string","''","Styles surface dot/marker text or a numeric channel label.","classes={{ text: 'dot-text' }}"),r("label","string","''","Adds a class to the label wrapper in sliders and inputs.","classes={{ label: 'field-label' }}"),r("track","string","''","Adds a class to the range input in ColorSlider.","classes={{ track: 'wide-track' }}"),r("input","string","''","Adds a class to the actual text, numeric or range input.","classes={{ input: 'brand-input' }}")],C("color-picker",["ColorArea","ColorSlider"],'<ColorArea classes={{ root: "brand-area", thumb: "square-dot", text: "dot-text" }} thumbText="C" /><ColorSlider classes={{ label: "field-label", track: "wide-track" }} />')),y("Channel values","Return value","The accepted input ranges and channel order for numeric controls. OKLCH and OKLab lightness is displayed as a percentage but returned as a 0 to 1 number.",[r("rgb","{ r, g, b, alpha }","Current color","Indexes 0/1/2 map to R/G/B, each from 0 to 255. Input step is 1. Returned alpha is 0 to 1.","store.getValue('rgb').r"),r("hsl","{ h, s, l, alpha }","Current color","Indexes 0/1/2 map to H/S/L. Hue is 0 to 360 degrees, saturation and lightness are 0 to 100%. Percent input step is 0.1.","store.getValue('hsl').l"),r("hsv","{ h, s, v, alpha }","Current color","Indexes 0/1/2 map to H/S/V. Hue is 0 to 360 degrees, saturation and brightness are 0 to 100%. HSV is a picker model, not a CSS color function.","store.getValue('hsv').v"),r("oklch","{ l, c, h, alpha }","Current color","Indexes 0/1/2 map to L/C/H. Input L is 0 to 100%, C is 0 to 0.4 and H is 0 to 360 degrees. Returned l is 0 to 1.","store.getValue('oklch').l"),r("oklab","{ l, a, b, alpha }","Current color","Indexes 0/1/2 map to L/a/b. Input L is 0 to 100%, a and b are -0.4 to 0.4. Returned l is 0 to 1. Chroma-axis input step is 0.001.","store.getValue('oklab').a")],j("color-picker",["createColorStore"],`const store = createColorStore('#5268E080');
const rgb = store.getValue('rgb');
const oklch = store.getValue('oklch');
console.log(rgb.r, rgb.alpha, oklch.l);`)),y("createColorStore","Function","Creates color state without mounting a UI. Arguments are positional.",[r("value (argument 1)","HEX string","'#6366F1'","Seeds the selected color and alpha. The opaque RGB base and alpha are stored separately.","createColorStore('#5268E080')"),r("format (argument 2)",he,"'hex'","Seeds the displayed format. Use lowercase keys.","createColorStore('#5268E0', 'hsl')"),r("view (argument 3)","'area' | 'wheel'","'area'","Seeds the initial surface layout.","createColorStore('#5268E0', 'hex', 'wheel')"),r("disabled (argument 4)","boolean","false","Seeds the interaction state. You can change it later with setDisabled().","createColorStore('#5268E0', 'hex', 'area', true)")],j("color-picker",["createColorStore"],`const store = createColorStore('#5268E080', 'hsl', 'wheel');
console.log(store.getValue('hsl'));`)),y("ColorStore","Methods","Read color state, subscribe to changes or update it programmatically.",[r("getColor()","() => ColorInfo","Current color","Returns the nearest name, matching metadata, all numeric formats and formatted strings. See ColorInfo for every field.","const color = store.getColor()"),r("getValue(format)",`(format: ${he}) => string | channel object`,"None","Reads only the requested format. hex returns RGBA hex. Other formats return numeric channel objects with alpha.","store.getValue('hex')"),r("getSnapshot()","() => ColorSnapshot","Current state","Reads h, s, v, alpha, hex, value, format, view and disabled. hex is opaque RGB, value includes alpha when needed.","const { value, alpha } = store.getSnapshot()"),r("getServerSnapshot()","() => ColorSnapshot","Initial state","Returns the immutable initial seed for server rendering and hydration.","store.getServerSnapshot().value"),r("subscribe(listener)","(() => void) => unsubscribe","None","Runs after a state update, including format or disabled changes. Call the returned function when removing the consumer.","const unsubscribe = store.subscribe(() => console.log(store.getSnapshot()))"),r("setHex(value)","(HEX string) => void","None","Replaces RGB and alpha. Opaque hex resets alpha to 1.","store.setHex('#277D5980')"),r("setHSV(patch)","(Partial<{ h: number, s: number, v: number }>) => void","None","Updates only supplied HSV channels. Hue wraps around 360, saturation and brightness clamp to 0 to 100. Alpha stays unchanged.","store.setHSV({ h: 140, s: 60 })"),r("setAlpha(alpha)","(number: 0 to 1) => void","None","Changes only opacity. Rejects non-finite or out-of-range values.","store.setAlpha(0.5)"),r("setFormat(format)",`(${he}) => void`,"None","Changes the displayed format without changing the color.","store.setFormat('oklch')"),r("setView(view)","('area' | 'wheel') => void","None","Switches layout for components that follow the store view.","store.setView('wheel')"),r("setDisabled(disabled)","(boolean) => void","None","Disables editing. Programmatic methods still work so external data can update a disabled preview.","store.setDisabled(true)")],j("color-picker",["createColorStore"],`const store = createColorStore('#5268E0');
const unsubscribe = store.subscribe(() => console.log(store.getColor()));
store.setHSV({ h: 140 });
store.setAlpha(0.5);
unsubscribe();`)),y("ColorInfo","Return value","The object returned by getColor(). Naming compares the opaque color against the bundled list and does not depend on alpha.",[r("name","string","Nearest named color","Display name from the bundled color list.","store.getColor().name"),r("slug","string","Normalized name","Lowercase name with spaces replaced by hyphens and apostrophes/slashes removed.","store.getColor().slug"),r("matchedHex","HEX string","Nearest named RGB color","The named color used for the match. It can differ from the selected hex.","store.getColor().matchedHex"),r("exact","boolean","Computed","True when the opaque selected RGB color exactly matches the named entry.","store.getColor().exact"),r("hex","string","Current RGBA color","Returns #RRGGBB for full opacity or #RRGGBBAA when alpha is below 1.","store.getColor().hex"),r("alpha","number: 0 to 1","Current opacity","Opacity as a numeric fraction.","store.getColor().alpha"),...["rgb","hsl","hsv","oklch","oklab"].map(e=>r(e,"Numeric channel object + alpha","Current color","Returns the numeric channels for this format. See Channel values for the individual field names and units.",`store.getColor().${e}`)),r("formats","Record<ColorFormat, string>","Current formatted values","Formatted channel strings. Wrap hsl, oklch, oklab and rgb in the matching CSS function when using them in styles. HSV has no CSS function.","`hsl(${store.getColor().formats.hsl})`")],j("color-picker",["createColorStore"],"const color = createColorStore('#5268E080').getColor();\nconsole.log(color.name, color.exact, color.hex);\nconst background = `hsl(${color.formats.hsl})`;\nconsole.log(background);")),y("mountColorPicker","Function","Mounts a complete Vanilla picker into a DOM element and returns its store, value readers and cleanup.",[r("element (argument 1)","HTMLElement","None","The DOM container that receives the generated provider and controls.","document.querySelector<HTMLElement>('#picker')!",!0),r("options.value","HEX string","'#6366F1'","Initial color for an internally created store.","{ value: '#5268E0' }"),r("options.format",he,"'hex'","Initial input format for an internally created store.","{ format: 'rgb' }"),r("options.view","'area' | 'wheel'","'area'","Initial layout for an internally created store.","{ view: 'wheel' }"),r("options.store","ColorStore","Created internally","Shares an existing store. Its value, view and format take priority over the initial options.","{ store }"),r("options.disabled","boolean","Supplied store state / false","Overrides disabled when provided. Omitting it preserves a supplied store state.","{ disabled: true }"),r("options.className","string","''","Class applied to the generated cp-provider.","{ className: 'brand-picker' }"),r("options.onChange","(color: ColorInfo) => void","No callback","Receives the initial ColorInfo immediately and then actual color changes. Unlike ColorProvider, this callback receives the full object.","{ onChange: (color) => console.log(color.name, color.hex) }"),r("return value","{ element, store, getColor, getValue, destroy }","Mounted instance","Call destroy() to remove the generated provider and its listeners before mounting again into the same container.","picker.destroy()")],{file:"usage.ts",code:`import { mountColorPicker } from '@salyra-ui/color-picker/vanilla';
import '@salyra-ui/color-picker/vanilla/styles.css';

const picker = mountColorPicker(document.querySelector<HTMLElement>('#picker')!, {
  value: '#5268E080', format: 'rgb', view: 'wheel',
  onChange: (color) => console.log(color.name, color.hex),
});
// When the host is removed:
picker.destroy();`})],dr=[r("theme","Theme","Built-in Indigo theme","Supplies a complete theme that renders immediately. It takes priority over the stored cache. Use store.setTheme() for later changes to an initialized provider.","theme={generateTheme('#277D59')}"),r("fallbackTheme","Theme","Built-in Indigo theme","Applies when loading rejects, returns invalid theme data or times out. It must be a complete valid Theme. It does not define loading content.","fallbackTheme={generateTheme('#5268E0')}"),r("loadTheme","(signal: AbortSignal) => unknown | Promise<unknown>","No request","Loads a complete theme. Pass the signal to fetch so stop() and superseded requests can cancel it. Invalid responses use fallbackTheme.",'loadTheme={createHttpThemeLoader("/api/theme")}'),r("mode",se,"'system'","system follows the device after mount. light and dark force a fixed appearance. Saved mode storage can replace this seed when the provider mounts.",'mode="dark"'),r("systemMode","'light' | 'dark'","'light'","Provides a deterministic SSR appearance when mode is system. Browser media preference replaces it after mount. Has no visible effect while mode is fixed.",'systemMode="dark"'),r("modeStorage","ModeStorage | false","browserModeStorage('theme-studio:mode')","Saves the appearance preference independently from theme data. false disables storage, while system still follows the device. See ModeStorage for its methods.","modeStorage={false}"),r("storage","ThemeStorage","No theme cache","Reads and writes full theme data. With no supplied theme, the cache can seed the context before the loader revalidates. See ThemeStorage for its methods.",'storage={browserStorage("app:theme")}'),r("background","'neutral' | 'tinted'","Uses the supplied theme","neutral generates grayscale surfaces. tinted gives light and dark surfaces a subtle hue from primary. Omitting it preserves the supplied background configuration.",'background="tinted"'),r("selection","TokenSelection","Mounted fields, or full export","Limits theme, JSON and CSS exports. Explicit selection takes priority over automatically registered fields and is available during SSR. See TokenSelection for each key.",'selection={{ roles: ["primary"], radius: ["card"], width: ["button"] }}'),xe,r("timeoutMs","Positive finite number, milliseconds","10000","Maximum loader duration. A request that never completes uses the fallback when this timer expires.","timeoutMs={5000}"),r("revalidateOnFocus","boolean","false","Reloads through loadTheme when the page becomes active again. The current usable theme stays visible during refresh.","revalidateOnFocus={true}"),r("revalidateIntervalMs","Positive finite number, milliseconds","No polling","Reloads at this interval while the page is visible. The HTTP loader can use ETag and 304 responses to avoid downloading unchanged themes.","revalidateIntervalMs={60000}")],pr="const store = createThemeStore({ theme: generateTheme('#5268E0'), mode: 'light', modeStorage: false });",oe=(e,t=[])=>j("theme-studio",["createThemeStore","generateTheme",...t],`${pr}
${e}`),Ze=[y("ThemeProvider","Component","Ready composition of ThemeStudio.Root and ThemeStudio.Scope with a disabled controls boundary.",[...dr,r("store","ThemeStore","Created from options","Uses an existing store. Its snapshot seeds the provider. Pass matching lifecycle options for loading, cache and mode persistence.","store={store}"),ne,r("scopeProps","React HTMLAttributes<HTMLDivElement> | Astro HTMLAttributes<div>","{}","Native id, ARIA attributes, events, classes and style for the actual scope. Svelte and Vue accept these attributes directly on ThemeProvider. React ref and Svelte bind:ref target the scope element.",'scopeProps={{ id: "app-theme", "aria-label": "Themed app" }}'),r("style","React.CSSProperties","{}","Adds root styling. Explicit style properties override generated CSS variables on this scope.","style={{ padding: 24 }}"),r("children","ReactNode","None","The application and controls that share this theme. A nested provider creates an independent scope.","<ThemeProvider><ThemePicker /></ThemeProvider>",!0)],C("theme-studio",["ThemePicker","ThemePalette","ThemeExport"],'<ThemePicker roles={["primary"]} controls={false} /><ThemePalette /><ThemeExport />'),"React passes ThemeOptions directly as props. Svelte, Vue and Angular pass an options object. Initial options seed the store once. Root owns loading, storage and cleanup. Scope owns CSS variables. For later edits use store methods. Use Root and Scope directly when you want your own markup. Astro replaces loader and cache functions with src, storageKey and modeStorageKey."),y("Astro provider options","Options","Astro supports the serializable ThemeOptions plus these browser loading and persistence keys.",[r("src","URL string","No client fetch","Starts a browser request for theme JSON. It replaces loadTheme, which cannot be serialized into HTML.",'src="/api/theme"'),r("storageKey","string","No theme cache","Creates a browser theme cache with this key. It replaces a custom ThemeStorage object.",'storageKey="app:theme"'),r("modeStorageKey","string","'theme-studio:mode'","Chooses the appearance persistence key for the browser.",'modeStorageKey="app:mode"'),r("modeStorage","false","Browser persistence enabled","Disables browser appearance persistence. Custom function-based ModeStorage is not an Astro prop.","modeStorage={false}"),r("class","string","''","Adds a class to the generated Astro theme scope.",'class="brand-theme"')],{file:"options.ts",code:`import { generateTheme } from '@salyra-ui/theme-studio';

const props = {
  fallbackTheme: generateTheme('#5268E0'),
  src: '/api/theme', storageKey: 'app:theme', modeStorageKey: 'app:mode',
};
// Pass these serializable props to Astro ThemeProvider.
console.log(props);`}),y("ThemePicker","Component","Edits the selected theme roles with a rectangle, separate wheel or shared wheel.",[r("roles",`readonly (${ie})[]`,"['primary', 'secondary', 'accent']","Chooses editable palettes. At least one unique role is required. A one-role picker uses a small unlabeled dot and hides role tabs.",'roles={["primary", "accent"]}'),r("activeRole",ie,"First selected role","Chooses the color initially connected to brightness and format fields. It must be included in roles.",'activeRole="accent"'),r("view","'area' | 'wheel' | 'shared-wheel'","'shared-wheel'","area shows a rectangle for the active role. wheel shows one active color on a circle. shared-wheel shows all selected role markers together.",'view="shared-wheel"'),r("controls","boolean","false for one role, true otherwise","Shows or hides the view and visible-role selectors. Set false for a fixed editor composition.","controls={false}"),xe,r("picker","ThemePickerStore","Created internally","Uses a picker controller created with createThemePickerStore(themeStore, options). It keeps role, active-role and view state separate from the theme.","picker={picker}"),r("children","ReactNode","Slider, format select, inputs and format button","Replaces the default lower control group. The role controls and picking surface still render.",'<ThemePicker><ColorSlider channel="v" /><ColorInput /></ThemePicker>')],C("theme-studio",["ThemePicker"],'<ThemePicker roles={["primary", "accent"]} activeRole="accent" view="shared-wheel" controls={false} />'),"React creates its picker controller from initial props. Use picker.setRoles(), selectRole() and setView() for programmatic changes after mount. Disabled can be local to this picker or inherited from ThemeProvider."),y("ThemeGenerator / ThemeColor","Component","Connects a color-picker composition to one theme palette. ThemeColor is an alias of ThemeGenerator.",[it,r("wheel","boolean","false","Chooses the initial wheel instead of area when the generator creates its color context.","wheel={true}"),xe,ne,r("children","ReactNode","View selector, surface and format controls","Replaces the default composition. Put color-picker components inside to use the linked color store.",'<ThemeGenerator role="accent"><ColorWheel /><ColorInput /></ThemeGenerator>')],C("theme-studio",["ThemeGenerator"],'<ThemeGenerator role="accent" wheel disabled={false} />'),'Import custom color controls from the matching color-picker adapter. In Angular, set [custom]="true" when projecting your own generator composition. Mounted generators register their role for automatic export selection.'),y("ThemeHarmony","Component","Selects a color harmony. The Generate action derives secondary and accent from primary.",[r("label","string","'Color harmony'","Replaces the harmony dropdown label.",'label="Palette relationship"'),r("harmony values",Me,"Theme harmony / 'analogous'","analogous rotates secondary by -30° and accent by +30°. triadic uses +120° and +240°. split-complementary uses +150° and +210°. Choosing a formula alone does not regenerate the colors.",'store.setHarmony("triadic"); store.generateHarmony()')],C("theme-studio",["ThemeHarmony"],'<ThemeHarmony label="Palette relationship" />'),"harmony values describes the dropdown choices, not a component prop. For programmatic control, use setHarmony() followed by generateHarmony(). Manual edits remain possible afterward."),y("ThemeBackground","Component","A checkbox that enables a primary-tinted surface palette or restores neutral surfaces.",[r("label","string","'Tint background with primary'","Replaces the checkbox text. Checked applies tinted and unchecked applies neutral.",'label="Use brand-colored surfaces"'),ne],C("theme-studio",["ThemeBackground"],'<ThemeBackground label="Use brand-colored surfaces" />'),"Mounting this control registers background and foreground fields for export. The active appearance is exported unless selection.modes includes both light and dark."),y("ThemeBorder / ThemeRadius / ThemeBorderWidth","Component","Edits one radius or border-width token. Each target is independent and each mounted field is registered for export. Incomplete input stays in the field while focused. Blur, Enter or Escape restores the current valid value.",[r("kind","'width' | 'radius'","'width' on ThemeBorder","width uses px with step 1. radius uses rem with step 0.125. ThemeRadius fixes kind to radius and ThemeBorderWidth fixes it to width.",'kind="radius"'),r("target",Se,"'DEFAULT'","Chooses the token to edit. DEFAULT is the shared default token. The named targets affect their own CSS variables, not the other targets.",'target="button"'),r("label","string","Target + radius or border width","Replaces the input label. Units still appear next to the field.",'label="Button corner radius"'),r("numeric range","number: 0 to 1000","Current theme token","Rejects negative, non-finite and out-of-range edits. A newly generated theme starts at 0.5 rem radius and 1 px width for every target.",'store.setBorder("radius", "button", 0.75)')],C("theme-studio",["ThemeRadius","ThemeBorderWidth"],'<ThemeRadius target="button" label="Button corner radius" /><ThemeBorderWidth target="card" label="Card border width" />'),"numeric range describes the input constraint. It is not a prop. Geometry selection uses the same targets as the controls and does not export omitted fields."),y("ThemePalette","Component","Displays eleven generated shades for one role. Color values always come from the current theme.",[it,r("shape","'square' | 'circle' | 'joined'","'square'","square gives separate swatches. circle makes round swatches. joined removes the gap and rounds only the strip ends.",'shape="joined"'),ne,r("classes","PaletteClasses","{}","Assigns root, item, swatch and label classes. See Palette styling for each nested key.",'classes={{ root: "brand-palette", label: "shade-label" }}'),r("labels","Partial<Record<Shade, string>>","Shade number",`Replaces the text for individual shade labels. Shade keys are ${Mt}. Unspecified shades keep their numbers.`,'labels={{ 500: "Brand", 950: "Ink" }}'),r("shadeClasses","Partial<Record<Shade, string>>","{}","Adds a class to the item wrapper for a specific shade, including its label and swatch.",'shadeClasses={{ 500: "featured-shade" }}')],C("theme-studio",["ThemePalette"],'<ThemePalette role="primary" shape="joined" labels={{ 500: "Brand" }} classes={{ root: "brand-palette", label: "shade-label" }} />')),y("Palette styling","Styling","Nested PaletteClasses keys and CSS variables. Class names are strings, while geometry is set with CSS variables.",[r("classes.root","string","''","Styles the palette grid and hosts its sizing variables.",'classes={{ root: "brand-palette" }}'),r("classes.item","string","''","Styles every shade wrapper, including the label and swatch.",'classes={{ item: "shade-item" }}'),r("classes.swatch","string","''","Styles the color surface shape, outline and size. The background color is supplied by the theme.",'classes={{ swatch: "shade-surface" }}'),r("classes.label","string","''","Styles the shade label text.",'classes={{ label: "shade-caption" }}'),r("--tk-palette-gap","CSS length","4px","Spacing between separate swatches. joined always uses zero gap.",".brand-palette { --tk-palette-gap: 8px; }"),r("--tk-swatch-height","CSS length","48px","Height of each swatch. Circle width is limited to this height.",".brand-palette { --tk-swatch-height: 64px; }"),r("--tk-swatch-radius","CSS length","4px square / 8px joined","Corner radius for square swatches and joined strip ends. Circle stays round.",".brand-palette { --tk-swatch-radius: 10px; }"),r("--tk-shade-label-size","CSS font-size","11px","Font size of the shade labels.",".brand-palette { --tk-shade-label-size: 12px; }")],C("theme-studio",["ThemePalette"],'<ThemePalette shape="circle" classes={{ root: "brand-palette", item: "shade-item", swatch: "shade-surface", label: "shade-caption" }} />')),y("ThemeMode","Component","A customizable appearance button. Give it a value for a fixed choice or omit value to cycle.",[r("value",se,"Cycle on click","With value, the button selects that mode and indicates whether it is active. Without value, clicks cycle system, light, dark and back to system.",'value="dark"'),r("labels","Record<ModePreference, ReactNode>","System / Light mode / Dark mode","Replaces the default content for each mode when children is omitted.",'labels={{ system: "Device", light: "Day", dark: "Night" }}'),r("children","ReactNode | ((mode: ReturnType<typeof useThemeMode>) => ReactNode)","Uses labels","Replaces button content with text, an icon or a render callback. The callback can read preference and resolvedMode.",'<ThemeMode value="dark">Night</ThemeMode>'),ne],C("theme-studio",["ThemeMode"],'<ThemeMode value="system">Device</ThemeMode><ThemeMode value="light">Day</ThemeMode><ThemeMode value="dark">Night</ThemeMode>'),"Svelte uses a children(mode) snippet and Vue a scoped slot. React labels is a convenience prop. Angular and Astro use projected content or slots. The provider owns mode persistence."),y("useThemeMode","Return value","Reads the current appearance and provides actions for your own buttons, toggles or dropdowns.",[r("preference",se,"Provider preference","The saved user choice. system remains system even when resolvedMode is dark.","const mode = useThemeMode(); mode.preference"),r("resolvedMode","'light' | 'dark'","Resolved appearance","The mode currently applied to CSS variables and color-scheme.","mode.resolvedMode"),r("setMode(value)",`(${se}) => void`,"None","Applies a specific preference and persists it through the provider mode storage.",'mode.setMode("system")'),r("cycle()","() => void","None","Advances system to light, light to dark and dark to system.","mode.cycle()")],{file:"Usage.tsx",code:`import { useThemeMode } from '@salyra-ui/theme-studio/react';

// Render inside ThemeProvider.
export function AppearanceButton() {
  const mode = useThemeMode();
  return <button aria-pressed={mode.preference === 'dark'} onClick={() => mode.setMode('dark')}>Night</button>;
}`}),y("ThemeName","Component","Edits the theme name while keeping a suggested name based on primary available.",[r("label","string","'Theme name'","Replaces the input label.",'label="Theme title"'),ne,r("children","(value: { name, suggestedName, setName }) => ReactNode","Default name input","React callback for a custom input. name is the current title, suggestedName is the primary color name and setName changes the title. Empty string is a custom name until reset.","<ThemeName>{({ name }) => <span>{name}</span>}</ThemeName>")],C("theme-studio",["ThemeName"],'<ThemeName label="Theme title" />'),"Custom names survive later color edits. Calling store.setName() with no argument restores automatic naming. The default input limits names to 200 characters and resets an empty name on blur."),y("ThemeSelect / ThemeSwatch","Component","Applies a complete theme from a dropdown or a preset button.",[r("themes","readonly Theme[] on ThemeSelect","None","Preset list. Each theme must have a unique id. Empty lists disable the dropdown. Presets apply full theme data but keep the appearance preference.",'themes={[generateTheme("#5268E0"), generateTheme("#277D59")]}',!0),r("theme","Theme on ThemeSwatch","None","The full theme applied when this button is clicked.",'theme={generateTheme("#277D59", { name: "Forest" })}',!0),r("label","string on ThemeSelect","'Saved themes'","Replaces the dropdown label.",'label="Choose a theme"'),r("children","ReactNode on ThemeSwatch","theme.name","Custom preset button content. ThemeSelect uses theme names for its options.","<ThemeSwatch theme={theme}>Use this theme</ThemeSwatch>"),ne],C("theme-studio",["ThemeSelect","ThemeSwatch"],'<ThemeSelect themes={[generateTheme("#5268E0"), generateTheme("#277D59")]} /><ThemeSwatch theme={generateTheme("#277D59", { name: "Forest" })}>Forest</ThemeSwatch>')),y("ThemeLoading / ThemeReady / ThemeError","Component","Separates loading content, usable theme content and error recovery. Ready and Error can be visible together when a fallback is applied.",[r("ThemeLoading.children","ReactNode","None","Renders only while status is loading and no usable theme is available. A background refresh keeps current content visible.","<ThemeLoading><p>Loading theme</p></ThemeLoading>",!0),r("ThemeReady.children","ReactNode","None","Renders when status is ready or fallback. It includes the application that should use the theme.","<ThemeReady><p>Application content</p></ThemeReady>",!0),r("ThemeError.children","(error: Error, retry: () => Promise<void>) => ReactNode","None","Renders when the context has an error. retry runs store.reload(). Use it for your own message and retry button.","<ThemeError>{(error, retry) => <button onClick={() => void retry()}>Retry</button>}</ThemeError>",!0)],C("theme-studio",["ThemeLoading","ThemeReady","ThemeError"],"<ThemeLoading><p>Loading theme</p></ThemeLoading><ThemeReady><p>Application content</p></ThemeReady><ThemeError>{(error, retry) => <button onClick={() => void retry()}>{error.message}: Retry</button>}</ThemeError>"),"In Svelte and Vue, error and retry are snippet/slot values. Angular exposes a projected error template. Vanilla uses tk-loading, tk-ready and tk-error, with data-tk-retry on your retry button."),y("ThemeExport","Component","Displays the selected JSON, CSS or Tailwind output, or passes the full configuration to your own UI.",[r("format","'json' | 'css' | 'tailwind'","'json'","Chooses which string is displayed by the default output. Does not affect the fields in the configuration.",'format="css"'),r("selection","TokenSelection","Provider selection / mounted fields","Overrides the export selection for this component. Omitted selection uses the snapshot selection, or full output when no fields are registered.",'selection={{ roles: ["primary"], radius: ["card"] }}'),r("onChange","(configuration: ThemeConfiguration) => void","No callback","React callback receives the initial configuration and subsequent theme or appearance updates.","onChange={(config) => console.log(config.json)}"),r("children","(configuration: ThemeConfiguration) => ReactNode","pre containing output string","Renders your own export UI. configuration includes selected theme data, tokens, JSON and CSS.","<ThemeExport>{(config) => <pre>{config.json}</pre>}</ThemeExport>"),ne],C("theme-studio",["ThemeExport"],'<ThemeExport format="json" selection={{ roles: ["primary"], radius: ["card"], width: ["button"] }} />')),y("TokenSelection","Options","Chooses which fields are exported. A selection filters theme, JSON and CSS without discarding the full internal theme.",[r("roles",`readonly (${ie})[]`,"['primary']","Includes these palettes. [] excludes all color palettes. Each included role still contains its shades, DEFAULT and foreground.",'{ roles: ["primary", "accent"] }'),r("radius",`readonly (${Se})[]`,"[]","Includes only these radius tokens. Each target is independent.",'{ radius: ["card", "input"] }'),r("width",`readonly (${Se})[]`,"[]","Includes only these border-width tokens.",'{ width: ["button"] }'),r("background","boolean","false","Includes background, foreground and color-scheme. Without it, website surface colors are omitted.","{ background: true }"),r("mode","'light' | 'dark'","Resolved active mode","Chooses the surface mode used by CSS and by a single-mode JSON export. Does not change the active context.",'{ background: true, mode: "dark" }'),r("modes","readonly ('light' | 'dark')[]","Only mode / resolved active mode","Select one or both background/foreground branches for JSON. An empty array is invalid. Both modes keep mode preference and systemMode metadata. CSS declarations still describe one mode.",'{ background: true, modes: ["light", "dark"] }')],oe(`const config = themeConfiguration(store.getSnapshot(), {
  roles: ["primary"], radius: ["card"], width: ["button"],
  background: true, modes: ["dark"], mode: "dark",
});
console.log(config.json);`,["themeConfiguration"]),"These defaults apply when a selection object is supplied. Without a selection or registered editor fields, themeConfiguration returns the full theme. Explicit provider selection is the reliable way to seed a partial SSR export."),y("ThemeConfiguration","Return value","Call themeConfiguration(snapshot, selection?) to read export data. The result retains the full theme separately from the selected output.",[r("theme","SelectedTheme","Selected fields / full theme","The theme fields chosen by selection. Omitted roles, geometry and appearance branches are absent.","config.theme.structure.userPreset?.primary"),r("sourceTheme","Theme","Full internal theme","Complete context for application rendering. It is not serialized into config.json.","config.sourceTheme.structure.userPreset.accent"),r("mode","'light' | 'dark'","Snapshot resolved mode","The current resolved context appearance. selection.mode can override exported surface values without changing this field.","config.mode"),r("modePreference",se,"Snapshot preference","The selected system/light/dark preference.","config.modePreference"),r("systemMode","'light' | 'dark'","Snapshot system appearance","Device appearance, or the server seed before mount.","config.systemMode"),r("tokens","Readonly<Record<string, string>>","Selected CSS tokens","Map of variable names to values, such as --primary and --border-radius-card. Values retain their CSS units.",'config.tokens["--border-radius-card"]'),r("css","string","Selected declarations","CSS declarations without a selector. Wrap them in your chosen scope or apply them as an inline style.","`.app { ${config.css} }`"),r("schemaVersion","1","Current schema","Format version written into saved configuration JSON.","config.schemaVersion"),r("tailwind","string","Selected tokens with utility mappings","Tailwind 4 stylesheet for the configured fields. Import after Tailwind CSS.","config.tailwind"),r("json","string","Selected theme + mode metadata","Serialized export. A partial theme must be merged into a full base before loading it as a complete Theme.","mergeThemeConfiguration(config.sourceTheme, config.json)")],oe(`const config = themeConfiguration(store.getSnapshot(), { roles: ["primary"] });
const updated = mergeThemeConfiguration(config.sourceTheme, config.json);
store.setTheme(updated);`,["themeConfiguration","mergeThemeConfiguration"])),y("ThemeStore","Methods","The framework-independent state shared by providers, editors and application consumers.",[r("getSnapshot()","() => ThemeSnapshot","Current state","Reads full theme, mode, modePreference, systemMode, background, status, pending, error, style, selection and disabled.","const { theme, pending } = store.getSnapshot()"),r("getServerSnapshot()","() => ThemeSnapshot","Initial immutable snapshot","Reads the original seed used for server rendering and hydration. Create a separate store for each request.","store.getServerSnapshot().style"),r("subscribe(listener)","(() => void) => unsubscribe","None","Notifies after state changes. Call the returned cleanup when removing the consumer.","const stop = store.subscribe(() => console.log(store.getSnapshot()))"),r("start()","() => Promise<void>","None","Reads the cache and runs the loader. Framework providers mount this automatically.","await store.start()"),r("reload()","() => Promise<void>","None","Runs the loader again without restoring cache. Keeps the current usable theme visible while pending.","await store.reload()"),r("stop()","() => void","None","Cancels in-flight loading. Provider cleanup also removes browser listeners.","store.stop()"),r("setTheme(theme)","(Theme) => void","None","Validates and applies a complete theme. Keeps the current appearance preference.",'store.setTheme(generateTheme("#277D59"))'),r("setColor(role, hex)",`(${ie}, HEX string) => void`,"None","Regenerates only that role palette. Changing primary updates automatic naming and generated backgrounds, but does not regenerate sibling colors.",'store.setColor("accent", "#C25D3D")'),r("setBorder(kind, target, value)","('radius' | 'width', Target, number: 0 to 1000) => void","None","Updates one geometry token. radius is rem and width is px. See geometry controls for target names.",'store.setBorder("radius", "card", 0.75)'),r("setName(name?)","(string | undefined) => void","Suggested name when omitted","Sets a custom name or resets it to the primary color suggestion.",'store.setName("Project theme")'),r("setMode(mode)",`(${se}) => void`,"None","Changes appearance preference. Persistence is handled by the mounted provider.",'store.setMode("dark")'),r("setSystemMode(mode)","('light' | 'dark') => void","None","Updates the resolved system appearance. Affects visible mode only when preference is system.",'store.setSystemMode("dark")'),r("setBackground(mode)","('neutral' | 'tinted') => void","None","Regenerates surface colors using the current primary color.",'store.setBackground("tinted")'),r("setHarmony(harmony)",`(${Me}) => void`,"None","Stores a harmony choice without changing palette colors.",'store.setHarmony("triadic")'),r("generateHarmony()","() => void","None","Regenerates secondary and accent from current primary using the chosen harmony.","store.generateHarmony()"),r("generate(seed, options?)","(HEX string, { roles?, harmony?, name? }) => void","All roles when roles omitted","Generates new palettes against the current theme base. Omitted roles keep their palettes when roles is supplied. Existing geometry remains.",'store.generate("#277D59", { roles: ["primary"], name: "Forest" })'),r("setSelection(selection)","(TokenSelection) => void","None","Sets an explicit export scope that takes priority over mounted field registrations.",'store.setSelection({ roles: ["primary"], width: ["button"] })'),r("registerFields(selection)","(TokenSelection) => { update, destroy }","None","Registers mounted editor fields for automatic export scope. update changes its fields and destroy removes the registration.",'const fields = store.registerFields({ radius: ["card"], roles: [] })'),r("setDisabled(disabled)","(boolean) => void","None","Changes global editing state while keeping theme data available.","store.setDisabled(true)")],oe(`store.setColor("primary", "#277D59");
store.setBorder("radius", "card", 0.75);
store.setName("Forest");
store.setSelection({ roles: ["primary"], radius: ["card"] });`)),y("ThemeSnapshot","Return value","State read through getSnapshot(), useTheme() or the adapter reactive context.",[r("theme","Theme","Current full theme","The complete internal theme even when exports select only some fields.","store.getSnapshot().theme"),r("mode","'light' | 'dark'","Resolved appearance","The appearance currently used by the scope.","store.getSnapshot().mode"),r("modePreference",se,"Initial 'system' unless configured","The selected appearance preference, before system resolution.","store.getSnapshot().modePreference"),r("systemMode","'light' | 'dark'","Initial 'light' unless configured","The server seed or mounted browser preference.","store.getSnapshot().systemMode"),r("background","'neutral' | 'tinted' | 'preserve'","Theme background mode","preserve means supplied surface colors are kept. neutral and tinted regenerate surfaces when primary changes.","store.getSnapshot().background"),r("status","'loading' | 'ready' | 'fallback'","Determined by options","loading has no usable resolved theme. ready uses supplied, cached or loaded data. fallback uses fallbackTheme after a failure.",'store.getSnapshot().status === "fallback"'),r("pending","boolean","Loader state","True while a request is running, including background refresh. It can be true while status is ready.","store.getSnapshot().pending"),r("error","Error | null","null","The last loader failure when present. A fallback theme can remain usable while this is non-null.","store.getSnapshot().error?.message"),r("style","string","Full theme CSS declarations","Declarations for the complete active theme scope. Export filtering does not limit application styling.","store.getSnapshot().style"),r("selection","TokenSelection | undefined","Explicit or mounted selection","Current export scope. undefined means no explicit or registered selection.","store.getSnapshot().selection?.roles"),r("disabled","boolean","false","Whether user editing is blocked by this context.","store.getSnapshot().disabled")],oe(`const { status, pending, error, mode } = store.getSnapshot();
console.log(status, pending, error?.message, mode);`)),y("createThemeStore","Function","Creates theme state without a DOM scope. Accepts the ThemeOptions documented under ThemeProvider.",[r("options","ThemeOptions","{}","Includes theme, fallbackTheme, loader, mode, storage, selection and disabled options. Constructing a store does not start a fetch or read browser storage.",'createThemeStore({ theme: generateTheme("#5268E0"), mode: "dark" })'),r("return value","ThemeStore","New isolated state","Use with a provider, or mount its lifecycle manually through mountThemeStore(). Core generation and read methods work on the server.","const cleanup = mountThemeStore(store, options.storage, options)")],j("theme-studio",["createThemeStore","generateTheme"],`const store = createThemeStore({
  theme: generateTheme("#5268E0"), mode: "dark", modeStorage: false,
  selection: { roles: ["primary"], radius: ["card"] },
});
console.log(store.getSnapshot().theme.name);`)),y("generateTheme","Function","Builds a full Theme from a seed color. Export selection is a separate step.",[r("seed (argument 1)","Opaque HEX string","None","The primary color used to generate the theme. Theme palettes use opaque HSL channels.",'generateTheme("#5268E0")',!0),r("options.id","string","custom- + seed hex","Stable theme identifier for selection and persistence.",'{ id: "brand-blue" }'),r("options.name","string","Suggested color name / custom base name","Sets a custom theme name. Omit to use the primary color suggestion or preserve a custom base name.",'{ name: "Brand blue" }'),r("options.harmony",Me,"Base harmony / 'analogous'","Formula used to generate secondary and accent. See ThemeHarmony for exact hue offsets.",'{ harmony: "triadic" }'),r("options.base","Theme","New default geometry and surfaces","Keeps existing geometry and unselected palettes. Used with roles to update part of a full theme.",'{ base: existingTheme, roles: ["primary"] }'),r("options.roles",`readonly (${ie})[]`,"All three roles","Selects palettes to regenerate. With a base, unselected roles stay unchanged. This does not create a partial exported Theme.",'{ roles: ["primary"] }'),r("options.background","'neutral' | 'tinted' | 'preserve'","Base setting / 'neutral'","neutral creates grayscale surfaces, tinted uses primary hue and preserve keeps supplied base surfaces.",'{ background: "tinted" }')],j("theme-studio",["generateTheme"],`const theme = generateTheme("#5268E0", {
  id: "brand-blue", name: "Brand blue", harmony: "triadic", background: "tinted",
});
console.log(theme.structure.userPreset.primary[500]);`)),y("ThemeStorage / ModeStorage","Options","Storage contracts passed to ThemeProvider. ThemeStorage saves complete themes, while ModeStorage saves system/light/dark preferences.",[r("ThemeStorage.read","() => unknown | Promise<unknown>","None","Returns a cached theme or saved snapshot. Invalid data is ignored and loading can continue.",'read: () => JSON.parse(localStorage.getItem("app:theme") ?? "null")',!0),r("ThemeStorage.write","(theme: Theme) => void | Promise<void>","None","Persists a complete theme after changes. It receives full context data, not a partial editor export.",'write: (theme) => localStorage.setItem("app:theme", JSON.stringify(theme))',!0),r("ThemeStorage.subscribe","(listener: (value: unknown) => void) => cleanup","No remote notifications","Passes external cache changes into the mounted context. The browser adapter uses same-origin storage events.","subscribe: (listener) => subscribeToThemeCache(listener)"),r("ModeStorage.read","() => unknown","None","Returns system, light or dark. Invalid values are ignored.",'read: () => localStorage.getItem("app:mode")',!0),r("ModeStorage.write",`(mode: ${se}) => void`,"None","Saves appearance preference when it changes.",'write: (mode) => localStorage.setItem("app:mode", mode)',!0),r("ModeStorage.subscribe","(listener: (value: unknown) => void) => cleanup","No remote notifications","Notifies the context when another tab changes the saved preference.","subscribe: (listener) => subscribeToModeCache(listener)")],oe(`const options = {
  theme: store.getSnapshot().theme, storage: browserStorage("app:theme"),
  modeStorage: browserModeStorage("app:mode"),
};
console.log(options);`,["browserStorage","browserModeStorage"]),"browserStorage(key) defaults to @salyra-ui/theme-studio. browserModeStorage(key) defaults to theme-studio:mode. Both are safe to construct during SSR because browser access is deferred until mount."),y("createHttpThemeLoader","Function","Creates an abortable HTTP loader with ETag revalidation and 304 support. Instantiate one loader per context.",[r("url (argument 1)","URL string","None","Endpoint that returns a complete Theme as JSON. Invalid JSON, invalid themes and unsuccessful responses reject and use provider fallback.",'createHttpThemeLoader("/api/theme")',!0),r("options.fetch","typeof fetch","Global fetch","Overrides the request function, for example for a supplied fetch implementation.","{ fetch: customFetch }"),r("options.headers","HeadersInit","No extra headers","Adds request headers. The loader supplies If-None-Match when a previous ETag is available.",'{ headers: { Accept: "application/json" } }'),r("options.credentials","'omit' | 'same-origin' | 'include'","Browser fetch default","Controls whether cookies and credentials are sent.",'{ credentials: "include" }'),r("invalidate()","() => void on returned loader","None","Clears the in-memory cached theme and ETag. The next call makes a fresh request.","loader.invalidate()")],j("theme-studio",["createThemeStore","createHttpThemeLoader","generateTheme"],`const loader = createHttpThemeLoader("/api/theme", { credentials: "same-origin" });
const store = createThemeStore({ loadTheme: loader, fallbackTheme: generateTheme("#5268E0") });
// A provider mounts this lifecycle automatically.
void store.start();`)),y("watchThemeUpdates","Function","Connects refresh to focus, polling or external notifications and returns a cleanup function.",[r("store (argument 1)","ThemeStore","None","Context reloaded by the watcher. It should have a loadTheme function.","watchThemeUpdates(store)",!0),r("options.onFocus","boolean","true","Refreshes when the page becomes active and is not hidden. This helper defaults to true, unlike ThemeOptions.revalidateOnFocus.","{ onFocus: false }"),r("options.intervalMs","Positive finite number, milliseconds","No polling","Refreshes at this interval while the page is visible.","{ intervalMs: 60000 }"),r("options.subscribe","(invalidate: () => void) => cleanup","No external notifications","Calls invalidate when another application, SSE stream or WebSocket reports a theme change. Returns your subscription cleanup.","{ subscribe: (invalidate) => connectThemeEvents(invalidate) }"),r("return value","() => void","Cleanup","Removes timers, focus listeners and the external subscription.","stopWatching()")],oe(`const stopWatching = watchThemeUpdates(store, { onFocus: true, intervalMs: 60000 });
// When the consumer unmounts:
stopWatching();`,["watchThemeUpdates"])),y("mountThemeKit","Function","Mounts the complete Vanilla editor. ThemeOptions are accepted alongside these composition options.",[r("element (argument 1)","HTMLElement","None","DOM container for the generated tk-provider and editor.",'document.querySelector<HTMLElement>("#theme-editor")!',!0),r("options.store","ThemeStore","Created internally","Connects the editor to an existing theme context.","{ store }"),r("options.themes","readonly Theme[]","[]","Supplies preset dropdown entries. With one picker role, the default complete layout hides presets and harmony controls.",'{ themes: [generateTheme("#5268E0"), generateTheme("#277D59")] }'),r("options.picker","ThemePickerOptions","All roles, shared-wheel","Sets picker roles, activeRole, view, controls and local disabled. See ThemePicker for these keys.",'{ picker: { roles: ["primary"], view: "wheel", controls: false } }'),r("options.radius",`readonly (${Se})[]`,"['card']","Adds exactly these radius fields. [] adds none.",'{ radius: ["card", "button"] }'),r("options.width",`readonly (${Se})[]`,"['card']","Adds exactly these border-width fields. [] adds none.",'{ width: ["input"] }'),r("options.backgroundControl","boolean","true","Shows the surface tint checkbox. false omits it and its automatic export registration.","{ backgroundControl: false }"),r("options.className","string","''","Adds a CSS class to the generated tk-provider scope.",'{ className: "brand-editor" }'),r("options.onChange","(configuration: ThemeConfiguration) => void","No callback","Receives configuration after theme-change events. It does not emit the initial configuration. Read getConfiguration() for the initial output.","{ onChange: (config) => console.log(config.json) }"),r("return value","{ element, store, getConfiguration, destroy }","Mounted instance","getConfiguration(selection?) returns the selected output. destroy() removes the generated provider and listeners.",'editor.getConfiguration({ roles: ["primary"] })')],{file:"usage.ts",code:`import { mountThemeKit, generateTheme } from "@salyra-ui/theme-studio/vanilla";
import "@salyra-ui/theme-studio/vanilla/styles.css";

const editor = mountThemeKit(document.querySelector<HTMLElement>("#theme-editor")!, {
  theme: generateTheme("#5268E0"), modeStorage: false,
  picker: { roles: ["primary"], controls: false },
  radius: ["card"], width: ["button"], backgroundControl: false,
});
console.log(editor.getConfiguration().json);
// When the host is removed:
editor.destroy();`})];We.push(y("ColorMarker","Options","One controlled marker supplied to ColorWheel.markers. Position follows HSV, while hex supplies its displayed background.",[r("id","string","None","Unique identifier used by activeId and marker callbacks.",'{ id: "brand" }',!0),r("color.h","number: hue in degrees","None","Controls the marker angle. Use normalized hue from 0 to 360.",'{ color: { h: 220, s: 60, v: 80, hex: "#527ACC" } }',!0),r("color.s","number: 0 to 100","None","Controls distance from the center. Zero sits in the center and 100 on the edge.",'{ color: { h: 220, s: 60, v: 80, hex: "#527ACC" } }',!0),r("color.v","number: 0 to 100","None","Brightness retained when the marker is edited.",'{ color: { h: 220, s: 60, v: 80, hex: "#527ACC" } }',!0),r("color.hex","Opaque HEX string","None","Color displayed on the marker. Keep it in sync with its HSV coordinates.",'{ color: { h: 220, s: 60, v: 80, hex: "#527ACC" } }',!0),r("label","string","No text","Text inside a marker. An omitted label or a single-marker list uses the smaller dot shape.",'{ label: "B" }'),r("ariaLabel","string","Select + id + marker","Accessible button name independent of the visible marker label.",'{ ariaLabel: "Edit brand color" }')],j("color-picker",["createColorStore","type ColorMarker"],`const store = createColorStore("#527ACC");
const markers: ColorMarker[] = [{ id: "brand", color: store.getSnapshot(), label: "B", ariaLabel: "Edit brand color" }];
console.log(markers);`)),y("ColorSnapshot","Return value","Immutable state returned by getSnapshot() and read by useColor(). hex is opaque and value includes alpha.",[r("h","number: 0 to 360","Initial color hue","HSV hue in degrees. Hue is retained for gray colors where it cannot be inferred from RGB.","store.getSnapshot().h"),r("s","number: 0 to 100","Initial color saturation","HSV saturation as a percentage.","store.getSnapshot().s"),r("v","number: 0 to 100","Initial color brightness","HSV brightness as a percentage.","store.getSnapshot().v"),r("hex","Opaque #RRGGBB string","Initial RGB color","Opaque base used for channel conversions and gradient rendering.","store.getSnapshot().hex"),r("value","#RRGGBB or #RRGGBBAA string","Initial color including alpha","Full selected color ready for a CSS hex value.","store.getSnapshot().value"),r("alpha","number: 0 to 1","Parsed from initial hex","Opacity fraction. Independent from HSV channels.","store.getSnapshot().alpha"),r("format",he,"'hex'","The format followed by ColorInput and format controls.","store.getSnapshot().format"),r("view","'area' | 'wheel'","'area'","The layout followed by ColorSurface.","store.getSnapshot().view"),r("disabled","boolean","false","Editing state used by the provider and picking surface.","store.getSnapshot().disabled")],j("color-picker",["createColorStore"],`const store = createColorStore("#5268E080", "rgb", "wheel");
const { hex, value, alpha, format, view } = store.getSnapshot();
console.log(hex, value, alpha, format, view);`)));Ze.push(y("Theme","Return value","The complete data object used by providers, presets, loaders and persistence. Generate one with generateTheme(), or validate supplied data with parseTheme().",[r("id","Non-empty string, at most 128 characters","Generated from seed","Stable identifier used by preset selection.","theme.id"),r("name","string, at most 200 characters","Suggested color name","Human-readable theme title. It may be customized.","theme.name"),r("nameSource","'suggested' | 'custom' | undefined","Set by generation / naming","custom preserves the name as primary changes. suggested allows automatic naming.","theme.nameSource"),r("backgroundMode","'neutral' | 'tinted' | 'preserve' | undefined","neutral for a new generated theme","Controls how surface colors respond to primary edits. Missing mode is treated as preserve by the context.","theme.backgroundMode"),r("harmony",Me+" | undefined","'analogous' for a new theme","Formula used when secondary and accent are explicitly regenerated.","theme.harmony"),r("structure.userPreset.primary","Palette","Generated primary shades","Main color palette, including shade keys, DEFAULT and foreground.","theme.structure.userPreset.primary[500]"),r("structure.userPreset.secondary","Palette","Generated secondary shades","Supporting palette with the same keys as primary.","theme.structure.userPreset.secondary.DEFAULT"),r("structure.userPreset.accent","Palette","Generated accent shades","Emphasis palette with the same keys as primary.","theme.structure.userPreset.accent.foreground"),r("Palette shade keys",Mt,"Generated HSL channels","Each numeric shade contains HSL channels without the hsl() wrapper. DEFAULT is the base color, and foreground is its contrasting text color.","`hsl(${theme.structure.userPreset.primary[500]})`"),r("structure.websitePreset.background","Record<'light' | 'dark', string>","Generated surfaces","Light and dark background colors stored as HSL channel strings.","theme.structure.websitePreset.background.dark"),r("structure.websitePreset.foreground","Record<'light' | 'dark', string>","Generated text colors","Light and dark foreground colors stored as HSL channel strings.","theme.structure.websitePreset.foreground.light"),r("structure.websitePreset.border.radius","Record<Target, number: 0 to 1000>","0.5 for every target","Corner radius in rem for DEFAULT, input, card, popover, button, table and picker.","theme.structure.websitePreset.border.radius.card"),r("structure.websitePreset.border.width","Record<Target, number: 0 to 1000>","1 for every target","Border thickness in px for DEFAULT, input, card, popover, button, table and picker.","theme.structure.websitePreset.border.width.button")],j("theme-studio",["generateTheme","parseTheme"],`const theme = parseTheme(generateTheme("#5268E0", { name: "Brand blue" }));
console.log(theme.name, theme.structure.userPreset.primary.DEFAULT);`)),y("createThemePickerStore / ThemePickerStore","Methods","A controller for active role, visible roles and layout. Create it with createThemePickerStore(themeStore, options), using the options documented under ThemePicker.",[r("mount()","() => cleanup","Not mounted","Starts theme synchronization and registers editable roles. The ThemePicker component handles this automatically.","const unmount = picker.mount()"),r("getSnapshot()","() => ThemePickerSnapshot","Current picker state","Returns roles, activeRole, view and colors. colors is a record of ColorSnapshot values for all theme roles, even when some are not visible.","picker.getSnapshot().activeRole"),r("getServerSnapshot()","() => ThemePickerSnapshot","Initial picker state","Returns the original seed for server rendering and hydration.","picker.getServerSnapshot().roles"),r("subscribe(listener)","(() => void) => cleanup","None","Notifies after role, view, selection or color changes.","const stop = picker.subscribe(() => console.log(picker.getSnapshot()))"),r("setRoles(roles)",`readonly (${ie})[]`,"None","Replaces the visible editable roles. Requires at least one unique role. If activeRole is removed, the first remaining role becomes active.",'picker.setRoles(["primary", "accent"])'),r("selectRole(role)",ie,"None","Changes which color feeds the shared brightness and input controls. The role must be currently selected.",'picker.selectRole("accent")'),r("setView(view)","'area' | 'wheel' | 'shared-wheel'","None","Changes surface layout without changing theme colors.",'picker.setView("wheel")'),r("setHSV(role, patch)","(Role, Partial<{ h, s, v }>) => void","None","Edits one role and synchronizes its palette with the theme store.",'picker.setHSV("accent", { h: 30 })'),r("activeColor","ColorStore","Current active role","A stable color-store bridge used by the input and slider composition. It follows role changes.",'picker.activeColor.getValue("hex")')],oe(`const picker = createThemePickerStore(store, { roles: ["primary", "accent"], view: "shared-wheel" });
const unmount = picker.mount();
picker.selectRole("accent");
picker.setHSV("accent", { h: 30 });
unmount();`,["createThemePickerStore"])));Ze.push(y("themeConfiguration","Function","Builds export data from a theme snapshot, using an explicit selection or the current context selection.",[r("snapshot (argument 1)","ThemeSnapshot","None","The state to export. Use getSnapshot() for current data or getServerSnapshot() for the initial server seed.","themeConfiguration(store.getSnapshot())",!0),r("selection (argument 2)","TokenSelection","snapshot.selection / full theme","Overrides context export fields. See TokenSelection for each nested key and its accepted values.",'themeConfiguration(store.getSnapshot(), { roles: ["primary"], width: ["button"] })'),r("return value","ThemeConfiguration","Selected export","Contains schemaVersion, theme, sourceTheme, mode, modePreference, systemMode, tokens, css, tailwind and json.","const config = themeConfiguration(store.getSnapshot())")],oe(`const config = themeConfiguration(store.getSnapshot(), { roles: ["primary"], width: ["button"] });
console.log(config.json, config.css);`,["themeConfiguration"])),y("mergeThemeConfiguration","Function","Applies selected export fields to a complete base theme, preserving fields absent from the export.",[r("base (argument 1)","Theme","None","Full theme that supplies omitted palettes, geometry and appearance data.","mergeThemeConfiguration(store.getSnapshot().theme, config.json)",!0),r("value (argument 2)","JSON string | { theme: SelectedTheme }","None","Serialized editor output or a parsed object with a theme field. Unsupported roles, geometry keys or invalid values are rejected.","mergeThemeConfiguration(base, JSON.parse(config.json))",!0),r("return value","Theme","Validated merged theme","A complete theme ready for setTheme(), presets or persistence. The separate appearance preference is not applied by this function.","store.setTheme(mergeThemeConfiguration(base, config.json))")],oe(`const base = store.getSnapshot().theme;
const config = themeConfiguration(store.getSnapshot(), { roles: ["primary"] });
store.setTheme(mergeThemeConfiguration(base, config.json));`,["themeConfiguration","mergeThemeConfiguration"])),y("browserStorage / browserModeStorage","Function","Creates lazy browser localStorage adapters. Constructing either adapter during SSR does not access the browser.",[r("browserStorage key","string","'@salyra-ui/theme-studio'","Storage key for the full versioned theme payload. It receives changes from other tabs on the same origin.",'browserStorage("app:theme")'),r("browserModeStorage key","string","'theme-studio:mode'","Independent storage key for the system, light or dark preference.",'browserModeStorage("app:mode")'),r("browserStorage return value","ThemeStorage","New storage adapter","Supplies read(), write(theme) and subscribe(listener). Access happens when the provider lifecycle mounts.",'storage: browserStorage("app:theme")'),r("browserModeStorage return value","ModeStorage","New storage adapter","Supplies read(), write(mode) and subscribe(listener). Pass false instead of this adapter to disable appearance persistence.",'modeStorage: browserModeStorage("app:mode")')],j("theme-studio",["createThemeStore","generateTheme","browserStorage","browserModeStorage"],`const options = {
  fallbackTheme: generateTheme("#5268E0"),
  storage: browserStorage("app:theme"), modeStorage: browserModeStorage("app:mode"),
};
const store = createThemeStore(options);
console.log(store.getSnapshot());`)),y("mountThemeStore","Function","Mounts cache writes, loading, mode persistence and refresh listeners for consumers without a framework provider.",[r("store (argument 1)","ThemeStore","None","Store whose lifecycle should start. Framework providers call this helper automatically.","mountThemeStore(store)",!0),r("storage (argument 2)","ThemeStorage","Store creation storage","Theme cache used for writes and same-origin subscription. Omitting it inherits the adapter passed to createThemeStore.","mountThemeStore(store, options.storage)"),r("options (argument 3)","{ modeStorage?, revalidateOnFocus?, revalidateIntervalMs? }","Store creation options","Overrides appearance persistence and refresh behavior. Omitted values inherit createThemeStore options, including modeStorage: false. Loader options belong to createThemeStore.","mountThemeStore(store, options.storage, options)"),r("return value","() => void","Cleanup","Stops requests, timers and listeners, then flushes any queued theme write. Call on unmount.","cleanup()")],j("theme-studio",["createThemeStore","generateTheme","browserStorage","mountThemeStore"],`const options = { theme: generateTheme("#5268E0"), storage: browserStorage("app:theme"), modeStorage: false as const };
const store = createThemeStore(options);
const cleanup = mountThemeStore(store, options.storage, options);
// When the consumer unmounts:
cleanup();`)));function Lt(e){return[...nr(e),...e==="color-picker"?We:Ze,...ir(e),...e==="color-picker"?or:[],...cr(e)].map(t=>{if(["ColorArea","ColorWheel","ColorSlider","ColorTextInput","ColorChannelInput"].includes(t.name)&&(t={...t,fields:[...t.fields,r("native attributes","HTML attributes, events and ref","No extra attributes","The React wrapper forwards native attributes to its primitive surface or input. Use aria-describedby, id, name or placeholder as appropriate. Input disabled is local and combines with root disabled. Other adapters follow their own declared props. For fully owned markup use the composition primitives.",'aria-describedby="color-help"')]}),t.name==="createThemePickerStore / ThemePickerStore"&&(t={...t,fields:[...t.fields,r("setDisabled(disabled)","boolean","Initial options.disabled or theme disabled","Disables the picker color controls independently. Theme disabled still applies. Programmatic picker updates remain available.","picker.setDisabled(true)")]}),t.name==="ColorArea"){const o=We.find(a=>a.name==="ColorWheel");t={...t,fields:[...t.fields,...o.fields.filter(a=>["markers","activeId","onSelect","onMarkerChange"].includes(a.key))],note:"This preset renders its own thumb and does not use children for layout. React also accepts marker callbacks inherited from ColorPlane, but use ColorPicker.Wheel with explicit Marker children for a custom multi-marker layout."}}return{...ar(t),exports:lr[e][t.name]??[]}})}const Ge=e=>`api-${e.id}`,mr=(e,t,o,a)=>a?"Read only":t.includes("return value")?"Returned":t.includes("range")||t==="harmony values"?"Input constraint":/\w+\(/.test(t)?"Method":e.kind==="Return value"||t==="activeColor"?"Read only":o?"Required":"Optional",ur={Theme:"Theme",ThemeStore:"ThemeStore",ThemeSnapshot:"ThemeSnapshot",ThemePickerSnapshot:"ThemePickerSnapshot",ThemePickerStore:"createThemePickerStore / ThemePickerStore",TokenSelection:"TokenSelection",ThemeConfiguration:"ThemeConfiguration",SelectedTheme:"ThemeConfiguration",Palette:"Theme",PaletteClasses:"Palette styling",ThemeStorage:"ThemeStorage / ModeStorage",ModeStorage:"ThemeStorage / ModeStorage",ColorStore:"ColorStore",ColorSnapshot:"ColorSnapshot",ColorInfo:"ColorInfo",ColorMarker:"ColorMarker",ColorPartClasses:"ColorPartClasses"},hr=(e,t)=>e.split(/(\b[A-Z][A-Za-z]+\b)/).map(o=>{const a=t.find(n=>n.name===ur[o]);return a?`<a href="#${Ge(a)}">${R(o)}</a>`:R(o)}).join("");function gr(e){const t=Lt(e);return`<div class="api-reference" data-api-reference>
    <div class="api-reference-intro"><p>Look up a component, property or method. Each entry shows its accepted values, default behavior and an example.</p><label class="api-search">Find an API entry<input type="search" placeholder="Try disabled, roles or setColor" data-api-search autocomplete="off" aria-controls="api-entries"></label></div>
    <p class="api-conventions">Component properties and usage examples use React names. Svelte uses <code>class</code> and snippets, Vue uses <code>class</code> and slots, and Angular uses inputs and templates. See Working examples for complete implementations in all six adapters. Core methods use the same TypeScript API in every adapter.</p>
    <p class="api-search-status" data-api-status role="status" hidden></p>
    <div id="api-entries">${t.map(o=>`<article class="api-entry" id="${Ge(o)}" data-api-entry="${o.id}">
      <header class="api-entry-heading"><div><p class="api-kind">${R(o.kind)}</p><h3>${R(o.name)}</h3></div><a href="#${Ge(o)}" aria-label="Link to ${R(o.name)}">#</a></header>
      <p class="api-purpose">${R(o.description)}</p>${o.exports?.length?`<p class="api-note">Related exports: ${o.exports.map(a=>`<code>${R(a)}</code> <small>(${tr(a).join(", ")})</small>`).join(", ")}. Astro components use individual <code>/astro/Name.astro</code> paths. Other exports use the adapter entry.</p>`:""}${o.note?`<p class="api-note">${R(o.note)}</p>`:""}
      <table class="api-properties"><caption>${R(o.name)} ${o.kind==="Methods"?"methods":o.kind==="Return value"?"returned fields":"properties and parameters"}</caption><thead><tr><th scope="col">Key</th><th scope="col">Type / accepted values</th><th scope="col">Default</th><th scope="col">Behavior & example</th></tr></thead><tbody>${o.fields.map(a=>`<tr data-api-property><th scope="row" data-label="Key"><code>${R(a.key)}</code><span class="api-requirement">${mr(o,a.key,a.required,a.readOnly)}</span></th><td data-label="Type / accepted values"><code class="api-type">${hr(a.type,t)}</code></td><td data-label="Default"><code>${R(a.default)}</code></td><td data-label="Behavior & example"><p>${R(a.description)}</p><code class="api-inline-example">${R(a.example)}</code></td></tr>`).join("")}</tbody></table>
      <details class="api-usage"><summary>Usage example <span>${o.example.file.endsWith("tsx")?"React":"TypeScript"}</span></summary><div data-api-code="${o.id}"></div></details>
    </article>`).join("")}</div></div>`}function br(e,t){const o=Lt(t);for(const l of o)z(e.querySelector(`[data-api-code="${l.id}"]`),()=>l.example.code,{file:l.example.file,label:`${l.name} usage`});const a=e.querySelector("[data-api-search]"),n=e.querySelector("[data-api-status]"),i=()=>{const l=a.value.trim().toLowerCase();let h=0;for(const p of o){const c=e.querySelector(`[data-api-entry="${p.id}"]`),m=`${p.name} ${p.description} ${p.exports?.join(" ")??""}`.toLowerCase().includes(l);let u=0;c.querySelectorAll("[data-api-property]").forEach(d=>{d.hidden=!!l&&!m&&!d.textContent.toLowerCase().includes(l),d.hidden||u++}),c.hidden=u===0,c.hidden||h++}n.hidden=!l,n.textContent=h?`${h} matching ${h===1?"entry":"entries"}`:"No matching entries. Try a component name, property or accepted value."};a.addEventListener("input",i);const s=l=>{l.target.closest('a[href^="#api-"]')&&a.value&&(a.value="",i())};return e.addEventListener("click",s),()=>{a.removeEventListener("input",i),e.removeEventListener("click",s)}}const Ie=document.querySelector("#app"),re=document.body.dataset.page??"docs",Te="/docs/";document.body.dataset.siteRoot??=Te;document.body.dataset.docsVersion??=ve.current;const fr=`v${ve.current}${ve.versions.find(e=>e.version===ve.current)?.status==="preview"?" preview":""}`,be=e=>{if(e==="site.html")return`${Te}index.html`;if(e.startsWith("docs.html")){const t=e.slice(9),o=new URLSearchParams(t.split("#")[0]),a=o.get("kit"),n=a!==null?a==="theme-studio":document.body.dataset.component==="theme-studio";o.delete("kit");const i=o.size?"?"+o:"",s=t.includes("#")?"#"+t.split("#")[1]:"";return`${Te}${n?"theme-studio":"color-picker"}.html${i}${s}`}return`${Te}${e}`},Fe=qt(document.body.dataset.component??(re==="color"?"color-picker":re==="generator"?"theme-studio":"")),De=Ht(),W=[];window.addEventListener("pagehide",e=>{e.persisted||W.forEach(t=>t())});if(re==="changelog"){const e=(new URLSearchParams(location.search).get("kit")??document.body.dataset.component)==="theme-studio"?"theme-studio":"color-picker";Ie.innerHTML=`${Fe}${Lo(Te.replace(/versions\/[^/]+\/$/,""),e)}${De}`}else if(re==="color"||re==="generator"){const e=re==="color",t=e?"color-picker":"theme-studio";Ie.innerHTML=`${Fe}<main id="main" class="catalog-page"><header class="page-heading"><div><p class="product-label">${e?"Standalone color components":"Theme components & generator"}</p><h1>${e?"color<span>/</span>picker":"theme<span>/</span>studio"}</h1></div><div class="page-intro"><p>${e?"Use the rectangle, wheel or channel inputs to choose a color. Each example includes opacity controls and returns the color name and values in six formats.":"Build an editor for the colors and dimensions your application uses. Try primary on its own, edit three colors together or choose individual radius and border fields."}</p><a class="text-link" href="${be("docs.html?kit="+t)}">${e?"Color picker":"Theme studio"} API & installation</a></div></header><section class="examples-section" aria-labelledby="examples-title"><div class="section-heading"><h2 id="examples-title">Component examples</h2><p>Try each layout in the preview. Open Code to choose a framework and copy the component and its styles.</p></div><div id="kit-explorer"></div></section><section id="workflows" class="examples-section"><div class="section-heading"><h2>Workflow examples</h2><p>Try each helper on its own. Open Code to copy or download the complete Vanilla example. ${e?"Forms &amp; saved colors":"Draft &amp; Apply"} in Working examples includes native components for all six integrations.</p></div><div id="workflow-gallery"></div></section>${e?'<section class="reference-band"><article><h3>One color, six formats</h3><p>Each numeric channel has its own input. Switch formats to read the same color as HEX, RGB, HSL, HSV, OKLCH or OKLab.</p></article><article><h3>Names & alpha</h3><p>Read the nearest name from the bundled color list and check whether it is an exact match. Set opacity with a slider, a numeric input or the store.</p></article><article><h3>Compose your controls</h3><p>Add only the controls your layout needs. In Custom controls, change the dot text, colors and sizes, then copy the component and updated CSS.</p></article></section>':'<section id="rendering" class="examples-section"><div class="section-heading"><h2>Loading & fallback</h2><p>See what appears when a theme is supplied directly, loads successfully, fails to load or times out.</p></div><div id="rendering-lab"></div></section><section class="reference-band"><article><h3>Custom theme names</h3><p>The primary color provides a suggested name. Enter your own name and it stays the same as you edit the theme.</p></article><article><h3>Only the tokens you need</h3><p>JSON and CSS include the selected colors and fields. Primary only exports primary. Radius & borders lets you choose individual fields and one or both appearance modes.</p></article><article><h3>System, light & dark</h3><p>Choose system, light or dark and keep that preference after a refresh. Use the mode hook if you want to build your own buttons or dropdown.</p></article></section>'}<section id="composition" class="examples-section"><div class="section-heading"><h2>Build your own editor</h2><p>${e?"ColorPicker.Root shares the color state. Add only the surfaces, sliders and fields you need, with your own labels and classes.":"ThemeProvider supplies context and a CSS scope in one component. Use Root and Scope separately when the editor and preview need different boundaries. PickerRoot connects your color controls to a theme role."}</p></div><div id="composition-example"></div><p><a class="text-link" href="${be("docs.html?kit="+t+"#composition")}">Composition guide and API</a></p></section><section class="install-section"><div><h2>Install ${e?"color picker":"theme studio"}</h2><p>Install the package, then choose the import for your framework. ${e?"It includes the color core and stylesheet. It does not depend on theme studio.":"It includes the theme core, framework components and styles, with color picker as its dependency."}</p></div><div id="installation"></div></section></main>${De}`,W.push(Ne(document.querySelector("#kit-explorer"),t)),e||W.push(ot(document.querySelector("#rendering-lab"))),W.push(nt(document.querySelector("#workflow-gallery"),t)),W.push(je(document.querySelector("#composition-example"),t)),lt(document.querySelector("#installation"),t)}else{const e=["theme-studio","theme-kit"].includes(new URLSearchParams(location.search).get("kit")??document.body.dataset.component??"")?"theme-studio":"color-picker",t=e==="color-picker";Ie.innerHTML=`${Fe}<div class="docs-layout"><aside class="docs-sidebar"><div class="docs-kit-tabs"><a ${t?'aria-current="page"':""} href="${be("docs.html?kit=color-picker")}">Color picker</a><a ${t?"":'aria-current="page"'} href="${be("docs.html?kit=theme-studio")}">Theme studio</a></div><nav aria-label="Documentation sections"><a href="#overview">Overview</a><a href="#installation">Installation</a><a href="#examples">Examples</a><a href="#workflows">Workflow examples</a><a href="#composition">Composition</a><a href="#output">Output</a><a href="#workflow">${t?"Forms & history":"Draft & history"}</a><a href="#customization">Customization</a>${t?"":'<a href="#rendering">Rendering & fallback</a><a href="#persistence">Persistence & freshness</a>'}<a href="#reference">API reference</a></nav></aside><main id="main" class="docs-content"><section id="overview"><p class="api-note">${fr}</p><p class="product-label">${t?"Color picker":"Theme studio"} documentation</p><h1>${t?"Color picker":"Theme studio"}</h1><p class="lead">${t?"Build a color editor with a rectangle or wheel, sliders and separate channel inputs. The store gives you the selected color in every supported format.":"Set up a shared theme context, then add the editors and controls your application needs. You can supply a theme, choose a preset or load one from an API."}</p><div class="docs-callout">${t?"ColorPicker.Root shares one selected color across its surfaces, sliders and inputs. Arrange those parts in your own layout.":"Theme studio uses color picker for its color controls. Primary, secondary and accent belong to the theme context."}</div></section><section id="installation"><h2>Installation</h2><p>Install the package once. Choose your framework below for the import and stylesheet setup.</p><div id="docs-installation"></div><p>The ready-made components use <code>styles.min.css</code>. Load it once in your application entry or root layout. A custom composition can use only your own CSS. For Angular, add the <code>@import</code> to your <code>styles.css</code> file. The <code>styles.css</code> package export loads the same minified CSS.</p><p>Frameworks are optional peer dependencies. Install the framework your application uses. Importing its entry does not load the other implementations. ${t?"The core can also be used without a UI adapter.":"Theme studio depends on color picker. Its stylesheet includes the color picker styles."}</p><div class="asset-downloads"><table aria-label="Vanilla downloads"><thead><tr><th scope="col">File</th><th scope="col">Standard</th><th scope="col">Minified</th></tr></thead><tbody>${["js","css"].map(a=>`<tr><th scope="row">${a==="js"?"JavaScript":"Stylesheet"}</th><td><a href="${be("downloads/"+e+"."+a)}" download><code>${e}.${a}</code></a></td><td><a href="${be("downloads/"+e+".min."+a)}" download><code>${e}.min.${a}</code></a></td></tr>`).join("")}</tbody></table></div><p class="muted">The Vanilla build runs without a framework. Copy the downloads to your public assets directory. The examples use minified files under /assets/. Use .js and .css filenames for the Standard versions. With a bundler, import the Vanilla module instead of loading the downloaded script. Choose Standard for readable files or Minified for smaller production assets. Both versions have the same API. ${t?"":"Theme studio CSS includes the color picker styles."}</p></section><section id="examples"><h2>Working examples</h2><p>Choose a layout and try its controls. Open Code for the implementation in your framework. For labels, classes and styling, see <a href="#customization">Customization</a>.</p><div id="docs-explorer"></div></section><section id="workflows" class="examples-section"><div class="section-heading"><h2>Workflow examples</h2><p>Try each helper on its own. Open Code to copy or download the complete Vanilla example. ${t?"Forms &amp; saved colors":"Draft &amp; Apply"} in Working examples includes native components for all six integrations.</p></div><div id="workflow-gallery"></div></section><section id="composition"><h2>Composition</h2>${t?'<p>Use ColorPicker.Root for a custom editor with your own markup. Use ColorProvider with the styled components for a ready-made layout. Both share one color store with their descendants. A second Root or Provider with its own store creates an independent picker. In React, importing <code>ColorPicker as Color</code> lets you write <code>Color.Root</code> and <code>Color.Input</code>. <code>Color.ChannelInput</code> edits one numeric channel.</p><div class="docs-diagram"><strong>Custom layout: ColorPicker.Root</strong><div><span>Area / Wheel + Thumb</span><span>Slider</span><span>Input / ChannelInput</span><span>FormatTrigger</span></div></div><p>Use createColorStore() for programmatic updates and subscriptions. React, Svelte, Vue and Angular also expose useColorStore() and useColor() inside a child of ColorPicker.Root or ColorProvider. Vanilla and Astro use the native element’s store and bubbling DOM events.</p>':'<p>Choose one entry point. ThemeProvider includes context, a CSS scope and a disabled controls boundary. ThemeStudio.Root provides context without a layout. Put ThemeStudio.Scope below it wherever the theme variables should apply.</p><div class="docs-diagram"><strong>Ready layout</strong><div><span>ThemeProvider → controls and application</span></div></div><div class="docs-diagram"><strong>Your own layout</strong><div><span>ThemeStudio.Root → ThemeStudio.Scope → controls and application</span></div></div><p>You do not need to put Root and Scope inside a Provider for the same theme. Multiple scopes under one Root share its store. A nested Root with a different store creates independent state. Scope alone only changes where CSS variables apply. Portalled content needs its own scope or copied variables.</p>'}<h3>Build the layout yourself</h3><p>The v1 primitives provide behavior and state. Your markup owns labels, spacing, thumb content and controls. ${t?"This example uses a square marker, custom format text and separate native inputs.":"This example uses square markers, custom role buttons and separate native inputs."} Open Code to choose a framework and download the component and its styles.</p><div id="composition-example"></div><p>React, Svelte and Vue expose ColorPicker.Root and ThemeStudio.Root as context-only components. ThemeStudio.Scope applies the CSS variables to your chosen container. Angular provides directives on native elements. Vanilla binds your existing DOM. Astro renders native controls with explicit server seeds and connects them in the browser.</p><div id="composition-code"></div>${t?"":'<h3>Preview a draft inside your application</h3><p>The outer Provider uses the applied store. The nested Root uses editor.store, so edits appear only in the inner Scope. Save calls editor.apply() to update the applied store. Cancel calls editor.cancel() to restore the latest applied theme.</p><div id="draft-scope-code"></div><p>These examples keep appearance storage off so the draft cannot overwrite an app preference. For persistence, configure storage on the applied store and its Provider only. Save here commits local state, it does not send a backend request. If your API must confirm the change first, save editor.store.getSnapshot().theme to your backend before calling apply(). A conflicting external update makes apply() throw. Only use apply({force:true}) when overwriting that update is intentional.</p><p>Keep stores per component instance or server request. Never share a user theme through a server module variable. Every editor is destroyed when its owner is removed. The React example creates its editor in an effect and shows a short loading message before the draft controls mount.</p><p>For undo, generation locks, saved themes and full runnable projects, open <a href="#examples">Working examples</a> and choose Draft &amp; Apply.</p>'}</section><section id="output"><h2>${t?"Names, formats & values":"Theme configuration & tokens"}</h2><p>${t?"Call getColor() to read the name, match status, channels and formatted strings. Use getValue(format) for numeric values in a specific format, or color.formats for a string ready to display. RGB uses 0–255. HSL and HSV use degrees and percentages. OKLCH and OKLab lightness uses 0–1 in the store and 0–100% in the inputs. HSV describes the picker color and is not a CSS color function.":"Pass a selection to themeConfiguration() or ThemeExport to get only the colors and dimensions your editor handles. Mounted editor components register their color and geometry fields automatically. An explicit selection takes priority and also seeds the server export. The same selection applies to theme, JSON and CSS. Backgrounds include only the active appearance unless you explicitly select both modes. Use mergeThemeConfiguration() to apply a partial export to an existing theme."}</p><div id="output-code"></div></section><section id="workflow"><h2>${t?"Forms, history & saved colors":"Draft editing & history"}</h2>${t?"<p>Use bindColorForm to submit the selected color with a normal form. It handles reset, validation and disabled fields. Mount the binding on the client and destroy it on unmount.</p><p>createColorHistory tracks color and alpha changes. mountHistory groups each drag into one undo step. Format and view changes stay outside the color history. Recent and favorite lists are optional, with your own labels and classes.</p>":'<p>createThemeEditor creates a separate store for the draft. Put it around the editing controls and keep the applied store around your application. Apply commits the theme and appearance preference. Cancel reloads the latest applied theme.</p><p>Undo and redo operate on the draft. Lock a color to preserve it when generating a harmony. A locked color can still be edited manually. Live mode applies every change immediately.</p><p>If the applied theme changes while a draft has edits, the editor reports a conflict. Cancel loads the new theme. apply({ force: true }) explicitly replaces it with the draft.</p><p>ThemeExport accepts format="tailwind". The stylesheet maps selected tokens to Tailwind 4 utilities. Radius and border width are exported only when configured. Saved themes and configuration JSON use schemaVersion: 1. parseTheme also accepts older unversioned themes.</p>'}<p>Choose ${t?"Forms & saved colors":"Draft & Apply"} in Working examples. Open Code for a complete project, then use Download files to get the component, controller, styles and project configuration.</p></section><section id="customization"><h2>Customization</h2><p>${t?"Start with the composition example above when you need full control. Put your classes and content directly on each primitive. Root adds no layout. The complete presets also offer classes, labels and render hooks for smaller adjustments.":"Use ThemeStudio.PickerRoot to share the active color across only the controls you mount. Place your own labels around GeometryInput and use RoleTrigger for custom text or icons. ThemeMode accepts custom content, and useThemeMode() lets you build buttons or a dropdown. Call context hooks in a child of ThemeProvider so they can access its store."}</p><h3>${t?"Labels, classes and controls":"Labels, classes and swatches"}</h3><p>Edit the labels and dimensions, then copy the updated component and CSS.</p><div id="custom-explorer"></div><h3>${t?"Styling variables":"Custom appearance buttons"}</h3><div id="custom-code"></div>${t?'<table><thead><tr><th>CSS variable / selector</th><th>Controls</th></tr></thead><tbody><tr><td>--cp-thumb-size / --cp-thumb-radius</td><td>Single color dot size and shape</td></tr><tr><td>--cp-track-height / --cp-track-radius</td><td>Hue and alpha track geometry</td></tr><tr><td>--cp-hue-gradient</td><td>Hue bar background</td></tr><tr><td>[data-cp-part="surface"]</td><td>Picking surface</td></tr><tr><td>[data-cp-part="thumb-text"]</td><td>Thumb content</td></tr></tbody></table>':""}</section>${t?"":'<section id="rendering"><h2>Rendering & fallback</h2><p>A supplied theme renders immediately. If no theme is available, ThemeLoading shows your content while loadTheme() runs. A rejected request, invalid response or timeout applies fallbackTheme. ThemeReady displays the loaded or fallback theme, and ThemeError lets you show a retry action. During revalidation, the current theme stays visible.</p><div id="docs-rendering"></div><h3>Server rendering</h3><p>For server rendering, create a store for each request and supply the theme and resolved mode. Use those same values when hydrating the client. Supply selection on the provider and ThemeExport when the server must return a partial configuration. React, Svelte, Vue, Angular and Astro support this setup. Vanilla elements mount in the browser, while their core can generate CSS on the server. Browser storage and the system preference are read after mount.</p><div id="ssr-code"></div></section><section id="persistence"><h2>Persistence & freshness</h2><p>Use browserStorage() to save the full context and browserModeStorage() to save the appearance preference. A supplied theme takes priority over the browser cache. To restore a cached theme on startup, pass storage and a fallbackTheme.</p><p>A cached theme can appear while the loader checks for an update. The HTTP loader supports ETag and 304 responses. Storage events update other tabs on the same origin. Use focus revalidation, polling or watchThemeUpdates() when changes can come from another application.</p><div id="cache-code"></div><h3>HTTP response</h3><p>Return a full Theme object from the endpoint. Send an ETag that changes whenever the theme changes. Return 304 when If-None-Match matches that revision, or return the updated theme otherwise. For partial editor exports, merge them into the stored theme before returning it to the loader.</p><p>Redis is optional server infrastructure. The browser still needs an HTTP revision/ETag or a notification through SSE/WebSocket to know that a theme changed.</p></section>'}<section id="reference"><h2>API reference</h2>${gr(e)}</section></main></div>${De}`,W.push(je(document.querySelector("#composition-example"),e)),W.push(nt(document.querySelector("#workflow-gallery"),e)),W.push(br(document.querySelector("#reference"),e)),lt(document.querySelector("#docs-installation"),e),W.push(Ne(document.querySelector("#docs-explorer"),e,void 0,"examples")),W.push(Ne(document.querySelector("#custom-explorer"),e,"custom","customization")),t||z(document.querySelector("#draft-scope-code"),qo,{label:"Nested draft preview",baseName:"DraftPreview"});const o=a=>`@salyra-ui/${e}`;z(document.querySelector("#composition-code"),a=>t?`import { createColorStore } from '${o()}';

const store = createColorStore('#5268E080', 'rgb');
store.setHex('#277D59');
store.setHSV({ h: 140 });
store.setAlpha(0.5);
const unsubscribe = store.subscribe(() => console.log(store.getColor()));
// unsubscribe() when the consumer is removed.`:`import { createThemeStore, generateTheme } from '${o()}';

const store = createThemeStore({
  theme: generateTheme('#5268E0'),
  mode: 'system', systemMode: 'light',
});
store.setColor('primary', '#277D59');
store.setName('Project theme');
store.setBorder('radius', 'card', 0.75);
store.setMode('dark');`,{label:"Store updates",file:"store.ts"}),z(document.querySelector("#output-code"),a=>t?`import { createColorStore } from '${o()}';
const store = createColorStore('#5268E080');
const color = store.getColor();

color.name;        // nearest name from the bundled list
color.exact;       // true only for an exact named match
color.hex;         // #RRGGBB or #RRGGBBAA
color.rgb;         // { r, g, b, alpha }
color.hsl;         // { h, s, l, alpha }
color.hsv;         // { h, s, v, alpha }
color.oklch;       // { l, c, h, alpha }
color.oklab;       // { l, a, b, alpha }
color.formats;     // strings for all supported formats
store.getValue('hsl');`:`import { createThemeStore, generateTheme, themeConfiguration,
  mergeThemeConfiguration } from '${o()}';

const store = createThemeStore({ theme: generateTheme('#5268E0'), mode: 'light' });
const config = themeConfiguration(store.getSnapshot(), {
  roles: ['primary'], radius: ['card'], width: ['button'],
});
config.theme;         // primary palette and the two selected fields
config.mode;          // resolved light/dark
config.modePreference;// saved system/light/dark preference
config.css;           // selected tokens as CSS declarations
config.tailwind;      // selected Tailwind 4 utilities
config.schemaVersion;// saved configuration format version
config.json;          // the same selected fields as JSON

const updated = mergeThemeConfiguration(store.getSnapshot().theme, config.json);
store.setTheme(updated);`,{label:"Read values",file:"output.ts"}),z(document.querySelector("#custom-code"),a=>t?`.custom-picker {
  --cp-thumb-size: 22px;
  --cp-thumb-radius: 0;
  --cp-thumb-border: 2px solid white;
  --cp-track-height: 12px;
  --cp-track-radius: 0;
}
.custom-picker [data-cp-part="thumb-text"] { font-size: 10px; }`:To(a),t?{label:"Styles",file:"styles.css"}:{label:"Appearance controls",baseName:"AppearanceControls"}),t||(W.push(ot(document.querySelector("#docs-rendering"))),z(document.querySelector("#ssr-code"),()=>`import { createThemeStore, generateTheme, themeConfiguration } from '@salyra-ui/theme-studio';

// Call once per request with the user's theme and saved mode.
export function createThemeSeed() {
  const store = createThemeStore({
    theme: generateTheme('#5268E0'), mode: 'dark', systemMode: 'dark',
    modeStorage: false,
  });
  const { theme, modePreference: mode, systemMode } = store.getServerSnapshot();
  return { options: { theme, mode, systemMode },
    css: themeConfiguration(store.getServerSnapshot()).css };
}

// Pass seed.options to the server and client provider.
// Use seed.css as inline declarations for a server-rendered scope.`,{label:"Server seed",file:"theme-seed.ts"}),z(document.querySelector("#cache-code"),a=>`import { createThemeStore, browserStorage, browserModeStorage,
  generateTheme, createHttpThemeLoader } from '${o()}';

const options = {
  fallbackTheme: generateTheme('#5268E0'),
  storage: browserStorage('app:theme'),
  modeStorage: browserModeStorage('app:mode'),
  loadTheme: createHttpThemeLoader('/api/theme'),
  revalidateOnFocus: true,
  revalidateIntervalMs: 60000,
};
const store = createThemeStore(options);
// Pass options/store to the framework provider.
// Native DOM consumers call mountThemeStore(store, options.storage, options).`,{label:"Cache configuration",file:"theme-options.ts"}))}function lt(e,t){z(e,()=>"",{label:"Installation",files:o=>[{name:"Terminal",code:`npm install @salyra-ui/${t}@${ve.current}`},{name:"Imports",code:o==="Astro"?`import ${t==="color-picker"?"ColorRoot":"ThemeProvider"} from '${Q(t,o)}/${t==="color-picker"?"ColorRoot":"ThemeProvider"}.astro';`:`import { ${o==="Vanilla"?t==="color-picker"?"mountColorPicker":"mountThemeKit":t==="color-picker"?o==="Angular"?"ColorRoot, ColorField, ColorRange, createColorStore":"ColorPicker as Color, createColorStore":"ThemeProvider, generateTheme"} } from '${Q(t,o)}';`},{name:o==="Angular"?"styles.css":"Global styles",code:o==="Angular"?`@import '@salyra-ui/${t}/styles.min.css';`:o==="Vanilla"?`import '@salyra-ui/${t}/styles.min.css';

// Readable CSS alternative (use one stylesheet):
// import '@salyra-ui/${t}/styles.standard.css';`:`import '@salyra-ui/${t}/styles.min.css';`},...o==="Vanilla"?[{name:"Downloaded assets",code:`<link rel="stylesheet" href="/assets/${t}.css">
<script src="/assets/${t}.js"><\/script>`},{name:"Downloaded assets (minified)",code:`<link rel="stylesheet" href="/assets/${t}.min.css">
<script src="/assets/${t}.min.js"><\/script>`}]:[]]})}location.hash&&requestAnimationFrame(()=>{document.getElementById(location.hash.slice(1))?.scrollIntoView()});if(re==="color"||re==="generator"){const e=re==="color"?"color-picker":"theme-studio",t=document.createElement("section");t.id="composition",t.className="examples-section",t.innerHTML='<div class="section-heading"><h2>Build your own layout</h2><p>Choose the parts you need. Labels, marker content and spacing belong to your application. Open Code for all six integrations.</p></div><div data-composition-example></div>',document.querySelector("main").append(t),W.push(je(t.querySelector("[data-composition-example]"),e))}requestAnimationFrame(()=>{const e=window.location.hash.slice(1);e&&document.getElementById(e)?.scrollIntoView()});
