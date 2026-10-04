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
    await expect(page.locator("[data-component-card]")).toHaveCount(7);
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
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(7);
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
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(7);
});

test("component search combines categories and features and preserves shared URLs", async ({
  page,
}) => {
  await page.goto("/components.html");
  const cards = page.locator("[data-component-card]:visible");
  await expect(cards).toHaveCount(7);
  await page.getByRole("button", { name: "Dates & time" }).click();
  await expect(cards).toHaveCount(4);
  await expect(page).toHaveURL(/category=date-time/);
  const search = page.getByRole("searchbox", { name: "Search components" });
  await search.fill("clock");
  await expect(cards).toHaveCount(2);
  await expect(page.locator("#component-count")).toContainText("2 components");
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
  await expect(cards).toHaveCount(7);
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
    page.getByRole("heading", { name: "No matching components." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /^All components/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[onload]")).toHaveCount(0);
  await page.getByRole("button", { name: "Show all components" }).click();
  await expect(search).toBeFocused();
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(7);
  await search.fill("OKLCH");
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(1);
  await expect(
    page.locator('[data-component-card="color-picker"]'),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(search).toBeFocused();
  await expect(page.locator("[data-component-card]:visible")).toHaveCount(7);
  expect(errors).toEqual([]);
});

test("documentation discovery and legacy package links still work", async ({
  page,
}) => {
  await page.goto("/docs.html");
  await expect(page.locator("h1")).toHaveText("Components.");
  await page.goto("/docs.html?kit=theme-studio#reference");
  await expect(page).toHaveURL(/theme-studio\.html#reference$/);
  await expect(page.locator("h1")).toHaveText("Theme studio");
});
