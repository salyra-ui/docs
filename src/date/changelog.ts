import { base as siteBase } from "../catalog";
import { mountDocumentationVersion } from "../versions";
const base = document.body.dataset.dateBase ?? siteBase;
import { siteHeader, siteFooter } from "../shell";
import "./site.css";
import changelog from "../../documentation/date-changelog.md?raw";
const lines = changelog.split("\n").filter(Boolean);
const escape = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
document.querySelector("#app")!.innerHTML =
  `${siteHeader()}<main class="docs-content"><div class="documentation-version" data-documentation-version></div>${lines.map((line) => (line.startsWith("# ") ? `<h1>${escape(line.slice(2))}</h1>` : line.startsWith("## ") ? `<h2>${escape(line.slice(3))}</h2>` : line.startsWith("- ") ? `<p>${escape(line.slice(2))}</p>` : `<p>${escape(line)}</p>`)).join("")}<a href="${base}date-time-picker.html">Read the 0.1.0 documentation</a></main>${siteFooter()}`;

mountDocumentationVersion("calendar", "date-changelog.html");
