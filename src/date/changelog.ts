import { siteHeader, siteFooter } from "../shell";
import "./site.css";
import changelog from "../../documentation/date-changelog.md?raw";
const lines = changelog.split("\n").filter(Boolean);
const escape = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
document.querySelector("#app")!.innerHTML =
  `${siteHeader()}<main class="docs-content">${lines.map((line) => (line.startsWith("# ") ? `<h1>${escape(line.slice(2))}</h1>` : line.startsWith("## ") ? `<h2>${escape(line.slice(3))}</h2>` : line.startsWith("- ") ? `<p>${escape(line.slice(2))}</p>` : `<p>${escape(line)}</p>`)).join("")}<a href="${import.meta.env.BASE_URL}date-time-picker.html">Read the 0.1.0 documentation</a></main>${siteFooter()}`;
