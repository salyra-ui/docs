import { categories, components, base, componentURL } from "./catalog";
import { siteHeader, siteFooter } from "./shell";
import { versionURL } from "./versions";
import "./components.css";

type Environment = "all" | "frontend" | "backend";
const environments = [
  {
    id: "frontend",
    name: "Frontend",
    description:
      "Controls for your application. Choose a framework, compose the parts and style the UI.",
  },
  {
    id: "backend",
    name: "Backend",
    description:
      "Server libraries and adapters. Connect your routes, authentication and storage.",
  },
] as const;
const legacyKit = location.pathname.endsWith("/docs.html")
  ? new URLSearchParams(location.search).get("kit")
  : null;
if (
  legacyKit === "color-picker" ||
  legacyKit === "theme-studio" ||
  legacyKit === "theme-kit"
) {
  const params = new URLSearchParams(location.search);
  params.delete("kit");
  location.replace(
    `${componentURL(legacyKit === "theme-kit" ? "theme-studio" : legacyKit)}${params.size ? "?" + params : ""}${location.hash}`,
  );
} else {
  mountCatalog();
}

function renderCard(item: (typeof components)[number]) {
  const backend = item.environment === "backend";
  const frozen = versionURL(
    item.family,
    item.version,
    item.family === "color"
      ? `docs.html?kit=${item.slug}`
      : `${item.slug}.html`,
  );
  return `<article data-component-card="${item.slug}" data-card-category="${item.category}" data-card-environment="${item.environment}">
    <div class="component-card-heading"><code>@salyra-ui/${item.slug}</code><a href="${frozen}" aria-label="${item.name} version ${item.version}">v${item.version}</a></div>
    <div class="component-card-title"><h3><a href="${componentURL(item.slug)}">${item.name}</a></h3><span class="component-environment">${backend ? "Backend" : "Frontend"}</span></div>
    <p>${item.description}</p><p class="component-platforms">${item.platforms}</p>
    <div class="component-card-links"><a href="${componentURL(item.slug)}">Documentation</a><a href="${base}${item.examples}">${backend ? "Route examples" : "Examples"}</a>${backend ? `<a href="${base}upload-server.html#storage">Storage adapters</a>` : ""}</div>
  </article>`;
}

function renderEnvironment(environment: (typeof environments)[number]) {
  const groups = categories
    .map((category) => {
      const items = components.filter(
        (item) =>
          item.environment === environment.id && item.category === category.id,
      );
      if (!items.length) return "";
      return `<section class="component-category" data-category-section="${category.id}" aria-labelledby="category-${environment.id}-${category.id}">
      <header><h3 id="category-${environment.id}-${category.id}">${category.name}</h3><p>${environment.id === "backend" ? "Upload protocols, session management and storage adapters." : category.description}</p></header>
      <div class="component-grid">${items.map(renderCard).join("")}</div></section>`;
    })
    .join("");
  return `<section class="component-environment-section" id="${environment.id}" data-environment-section="${environment.id}" aria-labelledby="environment-${environment.id}">
    <header class="component-environment-heading"><h2 id="environment-${environment.id}">${environment.name}</h2><p>${environment.description}</p></header>${groups}</section>`;
}

function mountCatalog() {
  document.querySelector("#app")!.innerHTML =
    `${siteHeader("components")}<main class="components-main">
    <header class="components-heading"><p>Documentation</p><h1>Find your package.</h1><p>UI controls live in Frontend. Server libraries live in Backend. Open a guide for installation, examples and the API, or select its version for a fixed reference.</p></header>
    <nav class="components-overview" aria-label="Documentation areas">${environments.map((area) => `<a href="#${area.id}" data-area-link="${area.id}"><div><strong>${area.name}</strong><span>${components.filter((item) => item.environment === area.id).length} package${area.id === "backend" ? "" : "s"}</span></div><p>${area.id === "frontend" ? "Color, themes, dates and file uploads." : "Upload sessions, routes and file storage."}</p></a>`).join("")}</nav>
    <div class="components-layout"><aside class="components-sidebar">
    <fieldset><legend>Runs in</legend><button type="button" data-environment="all" aria-pressed="true">Frontend &amp; backend</button>${environments.map((area) => `<button type="button" data-environment="${area.id}" aria-pressed="false">${area.name}<span>${components.filter((item) => item.environment === area.id).length}</span></button>`).join("")}</fieldset>
    <fieldset><legend>Browse by category</legend><button type="button" data-category="all" aria-pressed="true">All components <span>${components.length}</span></button>${categories.map((category) => `<button type="button" data-category="${category.id}" aria-pressed="false">${category.name}<span>${components.filter((item) => item.category === category.id).length}</span></button>`).join("")}</fieldset></aside>
    <div class="components-content"><div class="components-search"><label for="component-search">Search components</label><div><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" id="component-search" placeholder="Search by name, feature or runtime" autocomplete="off"><button type="button" id="clear-search" aria-label="Clear search" hidden>Clear</button></div></div>
    <div class="components-results"><p id="component-count" role="status" aria-live="polite"></p><button type="button" id="reset-filters" hidden>Reset filters</button></div>
    ${environments.map(renderEnvironment).join("")}
    <div class="components-empty" hidden><h2>No matching packages.</h2><p>Try another name or reset the filters.</p><button type="button" id="reset-empty">Show all components</button></div>
    <section id="installation" class="components-installation"><h2>Install where it runs.</h2><div class="components-install-grid"><div><h3>Frontend</h3><p>Install the component package, then import its React, Svelte, Vue, Angular, Astro or Vanilla entry. Default styles are optional. Vanilla also has standard and minified JavaScript and CSS downloads.</p><a href="${base}color-picker.html#installation">Frontend setup</a></div><div><h3>Backend</h3><p>Install Upload Server in your Node.js application, or use a native server adapter. Set your routes, connect your authentication and choose filesystem, S3, R2 or custom storage.</p><a href="${base}upload-server.html#installation">Backend setup</a></div></div></section>
    </div></div></main>${siteFooter()}`;
  const search = document.querySelector<HTMLInputElement>("#component-search")!;
  const clear = document.querySelector<HTMLButtonElement>("#clear-search")!;
  const reset = document.querySelector<HTMLButtonElement>("#reset-filters")!;
  const categoryButtons = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-category]"),
  ];
  const environmentButtons = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-environment]"),
  ];
  const cards = [
    ...document.querySelectorAll<HTMLElement>("[data-component-card]"),
  ];
  const metadata = new Map(
    components.map((item) => [
      item.slug as string,
      `${item.name} ${item.slug} ${item.environment} ${item.description} ${item.keywords} ${item.platforms}`.toLowerCase(),
    ]),
  );
  let category = "all";
  let environment: Environment = "all";
  function update(writeURL = true) {
    const words = search.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    let count = 0;
    for (const card of cards) {
      card.hidden = !(
        (category === "all" || card.dataset.cardCategory === category) &&
        (environment === "all" ||
          card.dataset.cardEnvironment === environment) &&
        words.every((word) =>
          metadata.get(card.dataset.componentCard!)!.includes(word),
        )
      );
      if (!card.hidden) count++;
    }
    for (const section of document.querySelectorAll<HTMLElement>(
      "[data-category-section], [data-environment-section]",
    ))
      section.hidden = ![
        ...section.querySelectorAll<HTMLElement>("[data-component-card]"),
      ].some((card) => !card.hidden);
    for (const button of categoryButtons)
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category),
      );
    for (const button of environmentButtons)
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.environment === environment),
      );
    document.querySelector("#component-count")!.textContent =
      `${count} package${count === 1 ? "" : "s"}${environment === "all" ? "" : ` for ${environment}`}${category === "all" ? "" : " in " + categories.find((item) => item.id === category)!.name.toLowerCase()}`;
    document.querySelector<HTMLElement>(".components-empty")!.hidden =
      count !== 0;
    clear.hidden = !search.value;
    reset.hidden = !search.value && category === "all" && environment === "all";
    if (writeURL) {
      const url = new URL(location.href);
      for (const [key, value] of [
        ["q", search.value.trim()],
        ["category", category === "all" ? "" : category],
        ["environment", environment === "all" ? "" : environment],
      ])
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      history.replaceState(history.state, "", url);
    }
  }
  function restore() {
    const params = new URLSearchParams(location.search);
    search.value = params.get("q") ?? "";
    category = categories.some((item) => item.id === params.get("category"))
      ? params.get("category")!
      : "all";
    environment = environments.some(
      (item) => item.id === params.get("environment"),
    )
      ? (params.get("environment") as Environment)
      : "all";
    update(false);
  }
  const handlers = new AbortController();
  const options = { signal: handlers.signal };
  search.addEventListener("input", () => update(), options);
  search.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        search.value = "";
        update();
      }
    },
    options,
  );
  clear.addEventListener(
    "click",
    () => {
      search.value = "";
      update();
      search.focus();
    },
    options,
  );
  for (const button of categoryButtons)
    button.addEventListener(
      "click",
      () => {
        category = button.dataset.category!;
        update();
      },
      options,
    );
  for (const button of environmentButtons)
    button.addEventListener(
      "click",
      () => {
        environment = button.dataset.environment as Environment;
        update();
      },
      options,
    );
  for (const link of document.querySelectorAll<HTMLAnchorElement>(
    "[data-area-link]",
  ))
    link.addEventListener(
      "click",
      () => {
        environment = link.dataset.areaLink as Environment;
        category = "all";
        search.value = "";
        update();
      },
      options,
    );
  const resetFilters = () => {
    search.value = "";
    category = "all";
    environment = "all";
    update();
    search.focus();
  };
  reset.addEventListener("click", resetFilters, options);
  document
    .querySelector("#reset-empty")!
    .addEventListener("click", resetFilters, options);
  window.addEventListener("popstate", restore, options);
  window.addEventListener("pagehide", (event) => {
    if (!event.persisted) handlers.abort();
  });
  restore();
}
