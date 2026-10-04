import { base, components } from "./catalog";
import { siteHeader, siteFooter, catalogMarkup } from "./shell";
import "./home.css";

const frameworks = ["React", "Svelte", "Vue", "Angular", "Astro", "Vanilla"];
const demos = [
  { id: "calendar", name: "Calendar", href: "date-examples.html#historical" },
  { id: "color", name: "Color Picker", href: "color.html" },
  { id: "theme", name: "Theme Studio", href: "generator.html" },
] as const;
document.querySelector("#app")!.innerHTML =
  `${siteHeader()}<main class="home-main">
  <section class="home-hero">
    <div class="home-intro"><p class="home-label">Salyra UI</p><h1>Components.<br>On your terms.</h1><p class="home-lead">Color editors, theme controls and calendars. Use the complete component or compose its parts with your own markup and styles.</p><div class="home-actions"><a class="home-button home-button-primary" href="#components">Explore components</a><a class="home-button" href="https://github.com/salyra-ui">View on GitHub</a></div><p class="home-tagline">Components in harmony with your stack.</p></div>
    <div class="home-demo"><div class="home-demo-tabs" role="tablist" aria-label="Component demos">${demos.map((demo, i) => `<button type="button" role="tab" id="demo-tab-${demo.id}" aria-controls="demo-${demo.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-demo="${demo.id}">${demo.name}</button>`).join("")}</div>${demos.map((demo, i) => `<section id="demo-${demo.id}" role="tabpanel" aria-labelledby="demo-tab-${demo.id}" ${i ? "hidden" : ""}><div class="home-demo-content" data-demo-host="${demo.id}" aria-busy="true"><p role="status">Loading ${demo.name.toLowerCase()}…</p></div><div class="home-demo-caption"><span>Live component</span><a href="${base}${demo.href}">Examples &amp; code</a></div></section>`).join("")}</div>
  </section>
  <div class="home-frameworks"><span>Choose your adapter</span><ul>${frameworks.map((name) => `<li>${name}</li>`).join("")}</ul></div>
  ${catalogMarkup()}
  <section class="home-principles"><div class="home-section-title"><p class="home-label">Composition</p><h2>The logic is shared.<br>The interface is yours.</h2></div><div class="home-principle-grid"><article><h3>Keep the parts you need.</h3><p>A calendar cell can hold a date, an event button or both. A color editor can be a wheel, three fields or a full picker. Start with a root and add your controls.</p><a href="${base}calendar.html#customization">Customize a calendar</a></article><article><h3>Bring your own styles.</h3><p>Set classes, labels and content on each part. Use the optional default CSS or style the components with Tailwind and your existing design system.</p><a href="${base}color-picker.html#composition">Compose a color picker</a></article><article><h3>Use your framework.</h3><p>One package per component, with separate framework entries. Import the adapter you use. The calculations and selection state stay in the shared core.</p><a href="${base}date-time-picker.html#setup">Choose an adapter</a></article></div></section>
  <section class="home-install"><div><p class="home-label">Get started</p><h2>Install a component.<br>Make it yours.</h2><p>Pick a package, open its documentation and copy an example for your framework.</p></div><div class="home-install-code"><label for="install-package">Package</label><select id="install-package">${components.map((item) => `<option value="${item.slug}">${item.name}</option>`).join("")}</select><div class="home-command"><code id="install-command"></code><button type="button" id="copy-install">Copy</button></div><div class="home-install-footer"><span role="status" id="install-status"></span><a id="install-docs">Open documentation</a></div></div></section>
</main>${siteFooter()}`;

const controller = new AbortController();
const stops: (() => void)[] = [];
const mounted = new Map<string, Promise<void>>();
let disposed = false;
const hostFor = (id: string) =>
  document.querySelector<HTMLElement>(`[data-demo-host="${id}"]`)!;

async function mountDemo(id: string) {
  const host = hostFor(id);
  if (id === "color") {
    const api = await import("@salyra-ui/color-picker/vanilla");
    if (disposed) return;
    host.innerHTML = `<div class="home-color-editor"><div class="home-color-wheel" data-cp-control="wheel" role="group" aria-label="Hue and saturation"><span data-cp-part="thumb"></span></div><div class="home-color-fields"><label>Brightness<input type="range" min="0" max="100" data-cp-control="slider" data-channel="v"></label><label>Opacity<input type="range" min="0" max="100" data-cp-control="slider" data-channel="alpha"></label><label>HEX<input data-cp-control="input" data-format="hex" aria-label="Color HEX"></label><div class="home-color-value"><span data-color-swatch></span><output aria-live="polite"></output></div></div></div>`;
    const store = api.createColorStore("#5268E0");
    const controls = api.mountColorControls(host, store);
    const update = () => {
      const color = store.getColor();
      host.querySelector<HTMLElement>(
        "[data-color-swatch]",
      )!.style.backgroundColor = color.hex;
      host.querySelector("output")!.textContent = color.name;
    };
    update();
    stops.push(store.subscribe(update), controls.destroy);
  } else if (id === "theme") {
    const api = await import("@salyra-ui/theme-studio/vanilla");
    if (disposed) return;
    const choices = ["#5268E0", "#277D59", "#B4445B"];
    host.innerHTML = `<div class="home-theme-tools"><fieldset><legend>Primary color</legend>${choices.map((value, i) => `<button type="button" data-theme-color="${value}" aria-label="${["Blue", "Green", "Rose"][i]} theme" aria-pressed="${i === 0}" style="--choice:${value}"></button>`).join("")}</fieldset><div role="group" aria-label="Theme appearance"><button type="button" data-theme-mode="light" aria-pressed="true">Light</button><button type="button" data-theme-mode="dark" aria-pressed="false">Dark</button></div></div><article class="home-theme-sample"><div class="home-sample-heading"><span>Theme preview</span><span data-theme-name></span></div><h3>Project settings</h3><p>The same markup, with a different theme.</p><label>Project name<input value="My project" readonly></label><a class="home-theme-primary" href="${base}generator.html">View theme examples</a></article>`;
    const store = api.createThemeStore({
      theme: api.generateTheme(choices[0], { background: "tinted" }),
      mode: "light",
      modeStorage: false,
    });
    const scope = api.bindThemeScope(
      host.querySelector<HTMLElement>(".home-theme-sample")!,
      store,
    );
    const update = () => {
      host.querySelector("[data-theme-name]")!.textContent =
        store.getSnapshot().theme.name;
    };
    update();
    host.addEventListener(
      "click",
      (event) => {
        const target = (event.target as Element).closest<HTMLButtonElement>(
          "[data-theme-color], [data-theme-mode]",
        );
        if (!target) return;
        if (target.dataset.themeColor) {
          store.setTheme(
            api.generateTheme(target.dataset.themeColor, {
              background: "tinted",
            }),
          );
          host
            .querySelectorAll("[data-theme-color]")
            .forEach((button) =>
              button.setAttribute("aria-pressed", String(button === target)),
            );
        } else {
          store.setMode(target.dataset.themeMode as "light" | "dark");
          host
            .querySelectorAll("[data-theme-mode]")
            .forEach((button) =>
              button.setAttribute("aria-pressed", String(button === target)),
            );
        }
      },
      { signal: controller.signal },
    );
    stops.push(store.subscribe(update), scope, () => store.stop());
  } else {
    const [api] = await Promise.all([
      import("@salyra-ui/calendar/vanilla"),
      import("@salyra-ui/calendar/styles.css"),
    ]);
    if (disposed) return;
    host.innerHTML = `<div class="home-calendar-tools"><span>Choose a date range</span><div><button type="button" data-picker-action="previous" aria-label="Previous month"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5"/></svg></button><button type="button" data-picker-action="next" aria-label="Next month"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg></button></div></div><div data-calendar class="sp-calendar"></div><output class="home-date-value" aria-live="polite"></output>`;
    const picker = api.mountPicker(host, {
      referenceDate: "2026-10-04",
      selection: "range",
      defaultValue: {
        start: { date: "2026-10-09" },
        end: { date: "2026-10-12" },
      },
      locale: "en",
      fixedWeeks: true,
    });
    const update = () => {
      const value = picker.store.getSnapshot().value;
      const range = value && "start" in value ? value : null;
      host.querySelector("output")!.textContent = range?.start
        ? `${range.start.date}${range.end ? " to " + range.end.date : " · Choose the end date"}`
        : "Choose a start and end date";
    };
    update();
    stops.push(picker.store.subscribe(update), picker.destroy);
  }
  host.setAttribute("aria-busy", "false");
}

const tabs = [...document.querySelectorAll<HTMLButtonElement>("[data-demo]")];
function showDemo(id: string) {
  for (const tab of tabs) {
    const active = tab.dataset.demo === id;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")!)!.hidden =
      !active;
  }
  if (!mounted.has(id))
    mounted.set(
      id,
      mountDemo(id).catch(() => {
        if (disposed) return;
        const host = hostFor(id);
        host.setAttribute("aria-busy", "false");
        host.innerHTML = `<p role="status">The example could not load. Reload the page to try again.</p>`;
      }),
    );
}
for (const [index, tab] of tabs.entries()) {
  tab.addEventListener("click", () => showDemo(tab.dataset.demo!), {
    signal: controller.signal,
  });
  tab.addEventListener(
    "keydown",
    (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
              tabs.length;
      tabs[next].focus();
      showDemo(tabs[next].dataset.demo!);
    },
    { signal: controller.signal },
  );
}
showDemo("calendar");

const select = document.querySelector<HTMLSelectElement>("#install-package")!;
const command = document.querySelector("#install-command")!;
const status = document.querySelector("#install-status")!;
const updateInstall = () => {
  command.textContent = `npm install @salyra-ui/${select.value}`;
  document.querySelector<HTMLAnchorElement>("#install-docs")!.href =
    `${base}${select.value}.html#${["color-picker", "theme-studio"].includes(select.value) ? "installation" : "setup"}`;
  status.textContent = "";
};
select.addEventListener("change", updateInstall, { signal: controller.signal });
document.querySelector("#copy-install")!.addEventListener(
  "click",
  async () => {
    const text = command.textContent!;
    try {
      await navigator.clipboard.writeText(text);
      if (!disposed && command.textContent === text)
        status.textContent = "Copied.";
    } catch {
      if (!disposed) status.textContent = "Select the command to copy it.";
    }
  },
  { signal: controller.signal },
);
updateInstall();
window.addEventListener(
  "pagehide",
  (event) => {
    if (event.persisted) return;
    disposed = true;
    controller.abort();
    stops.reverse().forEach((stop) => stop());
  },
  { once: true },
);
