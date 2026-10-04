import { components, base, componentURL } from "./catalog";
import "./shell.css";
export function siteHeader(current = "") {
  return `<header class="salyra-header"><a class="salyra-brand" href="${base}index.html" aria-label="Salyra UI home">salyra<span>/</span>ui</a><nav aria-label="Main navigation"><details class="salyra-components"><summary>Components</summary><div class="salyra-component-menu">${components.map((item) => `<a href="${componentURL(item.slug)}" ${item.slug === current ? 'aria-current="page"' : ""}><strong>${item.name}</strong><small>${item.version}</small></a>`).join("")}</div></details><a href="${base}index.html#components">Documentation</a><a href="https://github.com/salyra-ui/docs">GitHub</a></nav></header>`;
}
export function siteFooter() {
  return `<footer class="salyra-footer"><a class="salyra-brand" href="${base}index.html">salyra<span>/</span>ui</a><span>Color, theme and date components</span><a href="https://github.com/salyra-ui/docs">Documentation source</a></footer>`;
}
export function catalogMarkup() {
  return `<section id="components" class="salyra-catalog"><div class="salyra-catalog-heading"><h2>Choose a component.</h2><p>Installation, working examples and API reference for each package.</p></div><div class="salyra-catalog-grid">${components.map((item, index) => `<article><div class="salyra-component-heading"><span>${String(index + 1).padStart(2, "0")}</span><small>${item.version}</small></div><h3>${item.name}</h3><p>${item.description}</p><div><a href="${componentURL(item.slug)}">Documentation</a><a href="${base}${item.examples}">Examples</a></div></article>`).join("")}</div></section>`;
}
