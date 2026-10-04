import { categories, components, base, componentURL } from "./catalog";
import { siteHeader, siteFooter } from "./shell";
import "./components.css";

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

function mountCatalog() {
  document.querySelector("#app")!.innerHTML =
    `${siteHeader("components")}<main class="components-main"><header class="components-heading"><p>Documentation</p><h1>Components.</h1><p>Find the controls you need. Each guide includes installation, working examples, customization and the API.</p></header><div class="components-layout"><aside class="components-sidebar"><fieldset><legend>Browse by category</legend><button type="button" data-category="all" aria-pressed="true">All components <span>${components.length}</span></button>${categories.map((category) => `<button type="button" data-category="${category.id}" aria-pressed="false">${category.name}<span>${components.filter((item) => item.category === category.id).length}</span></button>`).join("")}</fieldset></aside><div class="components-content"><div class="components-search"><label for="component-search">Search components</label><div><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" id="component-search" placeholder="Search by name or feature" autocomplete="off"><button type="button" id="clear-search" aria-label="Clear search" hidden>Clear</button></div></div><div class="components-results"><p id="component-count" role="status" aria-live="polite"></p><button type="button" id="reset-filters" hidden>Reset filters</button></div>${categories
      .map(
        (category) =>
          `<section class="component-category" data-category-section="${category.id}" aria-labelledby="category-${category.id}"><header><h2 id="category-${category.id}">${category.name}</h2><p>${category.description}</p></header><div class="component-grid">${components
            .filter((item) => item.category === category.id)
            .map(
              (item) =>
                `<article data-component-card="${item.slug}" data-card-category="${item.category}"><div class="component-card-heading"><code>@salyra-ui/${item.slug}</code><small>v${item.version}</small></div><h3><a href="${componentURL(item.slug)}">${item.name}</a></h3><p>${item.description}</p><div class="component-card-links"><a href="${componentURL(item.slug)}">Documentation</a><a href="${base}${item.examples}">Examples</a></div></article>`,
            )
            .join("")}</div></section>`,
      )
      .join(
        "",
      )}<div class="components-empty" hidden><h2>No matching components.</h2><p>Try another name or reset the category and search filters.</p><button type="button" id="reset-empty">Show all components</button></div><section id="installation" class="components-installation"><h2>Start with a component.</h2><p>Open its guide for the npm command and the imports for your framework. Each package has React, Svelte, Vue, Angular, Astro and Vanilla entries.</p><p>Default styles are optional. Vanilla also has standalone JavaScript and CSS downloads, with standard and minified builds.</p><a href="${base}color-picker.html#installation">See an installation example</a></section></div></div></main>${siteFooter()}`;
  const search = document.querySelector<HTMLInputElement>("#component-search")!;
  const clear = document.querySelector<HTMLButtonElement>("#clear-search")!;
  const reset = document.querySelector<HTMLButtonElement>("#reset-filters")!;
  const categoryButtons = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-category]"),
  ];
  const cards = [
    ...document.querySelectorAll<HTMLElement>("[data-component-card]"),
  ];
  const metadata = new Map(
    components.map((item) => [
      item.slug as string,
      `${item.name} ${item.slug} ${item.description} ${item.keywords}`.toLowerCase(),
    ]),
  );
  let category = "all";

  function update(writeURL = true) {
    const words = search.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    let count = 0;
    for (const card of cards) {
      const text = metadata.get(card.dataset.componentCard!)!;
      const visible =
        (category === "all" || card.dataset.cardCategory === category) &&
        words.every((word) => text.includes(word));
      card.hidden = !visible;
      if (visible) count++;
    }
    for (const section of document.querySelectorAll<HTMLElement>(
      "[data-category-section]",
    ))
      section.hidden = ![
        ...section.querySelectorAll<HTMLElement>("[data-component-card]"),
      ].some((card) => !card.hidden);
    for (const button of categoryButtons)
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === category),
      );
    document.querySelector("#component-count")!.textContent =
      `${count} component${count === 1 ? "" : "s"}${category === "all" ? "" : " in " + categories.find((item) => item.id === category)!.name.toLowerCase()}`;
    document.querySelector<HTMLElement>(".components-empty")!.hidden =
      count !== 0;
    clear.hidden = !search.value;
    reset.hidden = !search.value && category === "all";
    if (writeURL) {
      const url = new URL(location.href);
      if (search.value.trim()) url.searchParams.set("q", search.value.trim());
      else url.searchParams.delete("q");
      if (category !== "all") url.searchParams.set("category", category);
      else url.searchParams.delete("category");
      history.replaceState(history.state, "", url);
    }
  }
  function restore() {
    const params = new URLSearchParams(location.search);
    search.value = params.get("q") ?? "";
    const requested = params.get("category");
    category = categories.some((item) => item.id === requested)
      ? requested!
      : "all";
    update(false);
  }
  const handlers = new AbortController();
  search.addEventListener("input", () => update(), { signal: handlers.signal });
  search.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        search.value = "";
        update();
      }
    },
    { signal: handlers.signal },
  );
  clear.addEventListener(
    "click",
    () => {
      search.value = "";
      update();
      search.focus();
    },
    { signal: handlers.signal },
  );
  for (const button of categoryButtons)
    button.addEventListener(
      "click",
      () => {
        category = button.dataset.category!;
        update();
      },
      { signal: handlers.signal },
    );
  const resetFilters = () => {
    search.value = "";
    category = "all";
    update();
    search.focus();
  };
  reset.addEventListener("click", resetFilters, { signal: handlers.signal });
  document
    .querySelector("#reset-empty")!
    .addEventListener("click", resetFilters, { signal: handlers.signal });
  window.addEventListener("popstate", restore, { signal: handlers.signal });
  window.addEventListener("pagehide", (event) => {
    if (!event.persisted) handlers.abort();
  });
  restore();
}
