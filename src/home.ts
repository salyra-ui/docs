import { base } from "./catalog";
import { siteHeader, siteFooter } from "./shell";
import { mountShowcase } from "./showcase";
import "./home.css";

const frameworks = ["React", "Svelte", "Vue", "Angular", "Astro", "Vanilla"];
document.querySelector("#app")!.innerHTML =
  `${siteHeader()}<main class="home-main">
  <section class="home-hero"><div class="home-intro"><p class="home-label">Salyra UI</p><h1>Components.<br>On your terms.</h1><p class="home-lead">Use complete controls or assemble their parts. Bring your own markup, styles and content, with shared logic behind the interface.</p><div class="home-actions"><a class="home-button home-button-primary" href="${base}components.html">Explore components</a><a class="home-button" href="https://github.com/salyra-ui">View on GitHub</a></div><p class="home-tagline">Components in harmony with your stack.</p></div><div class="home-showcase"><header><span>One composition</span><span>Calendar + Theme Studio</span></header><div id="home-showcase" aria-busy="true"><p role="status">Loading the example…</p></div><div class="home-showcase-caption"><span>Change the theme. Keep the selection.</span><a href="${base}calendar.html#composition">See the components</a></div></div></section>
  <div class="home-frameworks"><span>Choose your adapter</span><ul>${frameworks.map((name) => `<li>${name}</li>`).join("")}</ul></div>
  <section class="home-principles"><div class="home-section-title"><p class="home-label">Composition</p><h2>The logic is shared.<br>The interface is yours.</h2></div><div class="home-principle-grid"><article><h3>Keep the parts you need.</h3><p>A calendar cell can hold a date, an event button or both. A color editor can be a wheel, three fields or a full picker. Start with a root and add your controls.</p><a href="${base}calendar.html#customization">Customize a calendar</a></article><article><h3>Bring your own styles.</h3><p>Set classes, labels and content on each part. Use the optional default CSS or style the components with Tailwind and your existing design system.</p><a href="${base}color-picker.html#composition">Compose a color picker</a></article><article><h3>Use your framework.</h3><p>One package per component, with separate framework entries. Import the adapter you use. The calculations and selection state stay in the shared core.</p><a href="${base}components.html#installation">Choose an adapter</a></article></div></section>
  <section id="components" class="home-discover"><div><p class="home-label">Component library</p><h2>Find the controls<br>for your next project.</h2><p>Browse the library by category. Each component has its own examples, customization guide and API reference.</p></div><div class="home-discover-actions"><a class="home-button home-button-primary" href="${base}components.html">Browse components</a><a class="home-text-link" href="${base}components.html#installation">Installation &amp; framework setup</a></div></section>
</main>${siteFooter()}`;

const host = document.querySelector<HTMLElement>("#home-showcase")!;
let disposed = false;
let cleanup: (() => void) | undefined;
void mountShowcase(host)
  .then((stop) => {
    if (disposed) stop();
    else cleanup = stop;
  })
  .catch(() => {
    if (disposed) return;
    host.setAttribute("aria-busy", "false");
    host.innerHTML =
      '<p role="status">The example could not load. Reload the page to try again.</p>';
  });
window.addEventListener("pagehide", (event) => {
  if (event.persisted) return;
  disposed = true;
  cleanup?.();
});
