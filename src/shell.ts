import { base } from "./catalog";
import "./shell.css";
export function siteHeader(current = "") {
  return `<header class="salyra-header"><a class="salyra-brand" href="${base}index.html" aria-label="Salyra UI home">salyra<span>/</span>ui</a><nav aria-label="Main navigation"><a href="${base}components.html" ${current === "components" ? 'aria-current="page"' : ""}>Components</a><a href="${base}components.html#installation">Installation</a><a href="https://github.com/salyra-ui/docs">GitHub</a></nav></header>`;
}
export function siteFooter() {
  return `<footer class="salyra-footer"><a class="salyra-brand" href="${base}index.html">salyra<span>/</span>ui</a><span>Composable UI components</span><a href="https://github.com/salyra-ui/docs">Documentation source</a></footer>`;
}
