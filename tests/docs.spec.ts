import { test, expect } from "@playwright/test";
const pages = [
  "color-picker",
  "theme-studio",
  "calendar",
  "date-picker",
  "time-picker",
  "date-time-picker",
];
for (const slug of pages)
  test(`${slug} has a separate documentation page`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/${slug}.html`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toHaveText(
      {
        "color-picker": "Color picker",
        "theme-studio": "Theme studio",
        calendar: "Calendar.",
        "date-picker": "Date Picker.",
        "time-picker": "Time Picker.",
        "date-time-picker": "Date Time Picker.",
      }[slug]!,
    );
    if (slug === "theme-studio") {
      await expect(page.locator("#reference")).toContainText("ThemeProvider");
      await expect(page.locator("#docs-installation")).toContainText(
        "@salyra-ui/theme-studio",
      );
    }
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Components", exact: true })
      .click();
    await expect(page).toHaveURL(/components\.html$/);
    await expect(page.locator("[data-component-card]")).toHaveCount(8);
    expect(errors).toEqual([]);
  });
test("date package snippets follow the component instead of always using DateTimePicker", async ({
  page,
}) => {
  for (const slug of pages.slice(2)) {
    await page.goto(`/${slug}.html`);
    await expect(page.locator("#source")).toContainText(
      `@salyra-ui/${slug}/react`,
    );
    if (slug === "calendar") {
      await expect(page.locator("#source")).toContainText("Picker.View");
      await expect(page.locator("#source")).not.toContainText("Picker.Field");
    }
    if (slug === "time-picker") {
      await expect(page.locator("#source")).toContainText("Picker.Time");
      await expect(page.locator("#source")).not.toContainText("Picker.Field");
    }
    await page.getByRole("tab", { name: "Vanilla", exact: true }).click();
    await expect(page.locator("#source")).toContainText(
      `@salyra-ui/${slug}/vanilla`,
    );
  }
});
test("Vanilla scripts and styles are available in standard and minified forms without maps", async ({
  page,
}) => {
  await page.goto("/calendar.html#vanilla-assets");
  for (const slug of pages.slice(2)) {
    for (const asset of [
      `${slug}.js`,
      `${slug}.min.js`,
      "styles.css",
      "styles.min.css",
    ]) {
      const response = await page.request.get(`/downloads/${slug}/${asset}`);
      expect(response.ok()).toBe(true);
      expect(await response.text()).not.toContain("sourceMappingURL");
    }
    const result = await page.evaluate(
      async ({ slug }) => {
        const script = document.createElement("script");
        script.src = `/downloads/${slug}/${slug}.min.js`;
        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(Error("Script failed"));
          document.head.append(script);
        });
        const name =
          "Salyra" +
          slug
            .split("-")
            .map((s) => s[0].toUpperCase() + s.slice(1))
            .join("");
        const api = (window as unknown as Record<string, any>)[name];
        const host = document.createElement("div");
        host.innerHTML = '<div data-calendar class="sp-calendar"></div>';
        document.body.append(host);
        const picker = api.mountPicker(host, { referenceDate: "2010-03-01" });
        const kind = picker.store.getSnapshot().options.kind;
        picker.destroy();
        host.remove();
        return { kind };
      },
      { slug },
    );
    expect(result.kind).toBe(
      slug === "time-picker"
        ? "time"
        : slug === "date-time-picker"
          ? "datetime"
          : "date",
    );
  }
});
test("examples still have Preview/Code and preserve interval edits", async ({
  page,
}) => {
  await page.goto("/date-examples.html");
  const picker = page.locator("#picker");
  await picker
    .locator('[data-day-trigger][data-date="2026-10-09"]')
    .first()
    .click();
  await expect(page.locator("#draft")).toContainText("2026-10-09");
  const draft = await page.locator("#draft").textContent();
  await picker.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(picker.locator(".example-source")).toContainText(
    "mountIntervalPicker",
  );
  await picker.getByRole("tab", { name: "Preview", exact: true }).click();
  await expect(page.locator("#draft")).toHaveText(draft!);
});
test("six-component navigation and documentation fit a phone viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/calendar.html",
    "/color-picker.html",
    "/date-examples.html",
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("homepage has one composition whose selection survives theme changes", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Components.On your terms.");
  await expect(
    page.locator("[data-component-card], [data-demo], #install-package"),
  ).toHaveCount(0);
  const showcase = page.locator("#home-showcase");
  await expect(showcase).toHaveAttribute("aria-busy", "false");
  await showcase.locator('[data-day-trigger][data-date="2026-10-14"]').click();
  await showcase.locator('[data-day-trigger][data-date="2026-10-17"]').click();
  await expect(showcase.locator("output")).toContainText(
    "2026-10-14 to 2026-10-17",
  );
  const selection = await showcase.locator("output").innerText();
  const scope = showcase.locator(".showcase-scope");
  const initial = await scope.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await expect
    .poll(() => scope.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(initial);
  const selected = showcase.locator(
    '[data-day-trigger][data-date="2026-10-14"]',
  );
  const color = await selected.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await page.getByRole("button", { name: "Blue theme" }).click();
  await expect
    .poll(() => selected.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(color);
  await expect(showcase.locator("output")).toHaveText(selection);
  await expect
    .poll(() =>
      page.locator("body").evaluate((el) => getComputedStyle(el).color),
    )
    .toBe("rgb(24, 24, 24)");
  await page
    .getByRole("link", { name: "Explore components", exact: true })
    .click();
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(8);
});

test("component installation uses npm package names and contains no archive or preview instructions", async ({
  page,
}) => {
  for (const slug of pages.slice(2)) {
    await page.goto(`/${slug}.html`);
    await expect(page.locator("#setup")).toContainText(
      `npm install @salyra-ui/${slug}`,
    );
    await expect(page.locator("#setup")).not.toContainText(".tgz");
    await expect(page.locator("main")).not.toContainText("Development preview");
    await expect(page.locator("main")).not.toContainText("not published");
  }
});

test("homepage composition and component catalog fit a phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    "/",
    "/components.html",
    "/components.html?category=date-time&q=range",
  ]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    if (path === "/")
      await expect(page.locator("#home-showcase")).toHaveAttribute(
        "aria-busy",
        "false",
      );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.getByRole("button", { name: "Color & themes" }).click();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(8);
});

test("component search combines categories and features and preserves shared URLs", async ({
  page,
}) => {
  await page.goto("/components.html");
  const cards = page.locator("[data-component-card]:visible");
  await expect(cards).toHaveCount(8);
  await page.getByRole("button", { name: "Dates & time" }).click();
  await expect(cards).toHaveCount(4);
  await expect(page).toHaveURL(/category=date-time/);
  const search = page.getByRole("searchbox", { name: "Search components" });
  await search.fill("clock");
  await expect(cards).toHaveCount(2);
  await expect(page.locator("#component-count")).toContainText("2 packages");
  await page.reload();
  await expect(search).toHaveValue("clock");
  await expect(
    page.getByRole("button", { name: "Dates & time" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(2);
  await page
    .locator('[data-component-card="time-picker"]')
    .getByRole("link", { name: "Documentation", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Time Picker.");
  await page.goBack();
  await expect(search).toHaveValue("clock");
  await expect(cards).toHaveCount(2);
  await search.focus();
  await search.press("Escape");
  await expect(cards).toHaveCount(4);
  await expect(
    page.getByRole("button", { name: "Dates & time" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(cards).toHaveCount(8);
  await expect(page).toHaveURL(/components\.html$/);
});

test("empty search is safe and its reset restores the catalog", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(
    "/components.html?category=missing&q=%3Csvg%20onload%3Dalert(1)%3E",
  );
  const search = page.getByRole("searchbox", { name: "Search components" });
  await expect(search).toHaveValue("<svg onload=alert(1)>");
  await expect(
    page.getByRole("heading", { name: "No matching packages." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /^All components/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[onload]")).toHaveCount(0);
  await page.getByRole("button", { name: "Show all components" }).click();
  await expect(search).toBeFocused();
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(8);
  await search.fill("OKLCH");
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(1);
  await expect(
    page.locator('[data-component-card="color-picker"]'),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(search).toBeFocused();
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(8);
  expect(errors).toEqual([]);
});

test("documentation discovery and legacy package links still work", async ({
  page,
}) => {
  await page.goto("/docs.html");
  await expect(page.locator("h1")).toHaveText("Find your package.");
  await page.goto("/docs.html?kit=theme-studio#reference");
  await expect(page).toHaveURL(/theme-studio\.html#reference$/);
  await expect(page.locator("h1")).toHaveText("Theme studio");
});

test("overview separates frontend packages from the backend and keeps runtime filters in the URL", async ({
  page,
}) => {
  await page.goto("/components.html");
  await expect(
    page.locator('[data-environment-section="frontend"] [data-component-card]'),
  ).toHaveCount(7);
  const backend = page.locator('[data-environment-section="backend"]');
  await expect(backend).toContainText("@salyra-ui/upload-server");
  await expect(backend).toContainText("Node.js");
  await page
    .getByRole("navigation", { name: "Documentation areas" })
    .getByRole("link", { name: /Backend/ })
    .click();
  await expect(page).toHaveURL(/environment=backend.*#backend/);
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(1);
  await page.reload();
  await expect(page.locator('[data-environment="backend"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await backend
    .getByRole("link", { name: "Documentation", exact: true })
    .click();
  await expect(page).toHaveURL(/upload-server\.html$/);
  await expect(page.locator(".upload-kicker")).toContainText("Backend");
  await page
    .getByRole("link", { name: "Frontend: File Uploader", exact: true })
    .click();
  await expect(page.locator(".upload-kicker")).toContainText("Frontend");
});

test("each package has a version permalink to a working snapshot in the central docs", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/components.html");
  const links = await page
    .locator(".component-card-heading > a")
    .evaluateAll((elements) =>
      elements.map((element) => (element as HTMLAnchorElement).href),
    );
  expect(links).toHaveLength(8);
  for (const link of links) expect((await request.get(link)).ok()).toBe(true);
  await page
    .locator('[data-component-card="date-picker"] .component-card-heading > a')
    .click();
  await expect(page).toHaveURL(
    /versions\/calendar\/0\.1\.0\/date-picker\.html$/,
  );
  await expect(
    page.getByRole("combobox", { name: "Documentation version" }),
  ).toHaveValue("0.1.0");
  await expect(page.locator("#setup")).toContainText(
    "npm install @salyra-ui/date-picker@0.1.0",
  );
  await page.getByRole("link", { name: "Try the working examples." }).click();
  await expect(page).toHaveURL(
    /versions\/calendar\/0\.1\.0\/date-examples\.html#picker$/,
  );
  await expect(
    page.locator("#picker [data-day-trigger]").first(),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Latest documentation", exact: true })
    .click();
  await expect(page).toHaveURL(/\/date-examples\.html#picker$/);
});

test("version navigation covers client, server and existing color docs", async ({
  page,
}) => {
  for (const path of [
    "/file-uploader.html",
    "/upload-server.html",
    "/calendar.html",
    "/color-picker.html",
    "/theme-studio.html",
  ]) {
    await page.goto(path);
    const version = page.getByRole("combobox", {
      name: "Documentation version",
    });
    await expect(version).toHaveCount(1);
    await expect(version).toBeVisible();
  }
  await page.goto("/upload-server.html#storage");
  await page
    .getByRole("combobox", { name: "Documentation version" })
    .selectOption("0.1.0");
  await expect(page).toHaveURL(
    /versions\/file-uploader\/0\.1\.0\/upload-server\.html#storage$/,
  );
  await expect(page.locator("#installation")).toContainText(
    "npm install @salyra-ui/upload-server@0.1.0",
  );
  await page
    .getByRole("link", { name: "Frontend: File Uploader", exact: true })
    .click();
  await expect(page).toHaveURL(
    /versions\/file-uploader\/0\.1\.0\/file-uploader\.html$/,
  );
  await page
    .getByRole("link", { name: "Latest documentation", exact: true })
    .click();
  await expect(page).toHaveURL(/\/file-uploader\.html$/);
});

test("an archived guide discovers later versions without replacing its content", async ({
  page,
}) => {
  await page.route("**/package-versions.json", async (route) => {
    const response = await route.fetch();
    const catalog = await response.json();
    catalog.upload.versions = ["0.2.0", "0.1.0"];
    await route.fulfill({ response, json: catalog });
  });
  await page.goto("/versions/file-uploader/0.1.0/upload-server.html");
  const version = page.getByRole("combobox", { name: "Documentation version" });
  await expect(version).toHaveValue("0.1.0");
  await expect(version.locator("option")).toHaveText(["v0.2.0", "v0.1.0"]);
  await expect(page.locator("#installation")).toContainText(
    "@salyra-ui/upload-server@0.1.0",
  );
});
