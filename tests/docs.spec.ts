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
    await page.getByText("Components", { exact: true }).click();
    await expect(page.locator(".salyra-component-menu a")).toHaveCount(6);
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

test("homepage introduces the component library and preserves live demo state", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Components.On your terms.");
  await expect(page.locator("#components article")).toHaveCount(6);
  const calendar = page.locator("#demo-calendar");
  await expect(calendar.locator("[data-calendar] table")).toBeVisible();
  await calendar.locator('[data-day-trigger][data-date="2026-10-14"]').click();
  const selection = await calendar.locator("output").innerText();
  await page.getByRole("tab", { name: "Color Picker", exact: true }).click();
  const hex = page.getByLabel("Color HEX");
  await expect(hex).toBeVisible();
  await hex.fill("#277D59");
  await hex.dispatchEvent("change");
  await page.getByRole("tab", { name: "Theme Studio", exact: true }).click();
  const sample = page.locator(".home-theme-sample");
  await expect(sample).toBeVisible();
  const initial = await sample.evaluate(
    (el) => getComputedStyle(el).backgroundColor,
  );
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await expect
    .poll(() => sample.evaluate((el) => getComputedStyle(el).backgroundColor))
    .not.toBe(initial);
  const name = await page.locator("[data-theme-name]").innerText();
  await page.getByRole("button", { name: "Green theme" }).click();
  await expect(page.locator("[data-theme-name]")).not.toHaveText(name);
  await page.getByRole("tab", { name: "Calendar", exact: true }).click();
  await expect(calendar.locator("output")).toHaveText(selection);
  await page.getByRole("tab", { name: "Color Picker", exact: true }).click();
  await expect(hex).toHaveValue("#277D59");
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
  await page.goto("/");
  for (const slug of pages) {
    await page.getByLabel("Package", { exact: true }).selectOption(slug);
    await expect(page.locator("#install-command")).toHaveText(
      `npm install @salyra-ui/${slug}`,
    );
    await expect(page.locator("#install-docs")).toHaveAttribute(
      "href",
      `/${slug}.html#${["color-picker", "theme-studio"].includes(slug) ? "installation" : "setup"}`,
    );
  }
});

test("homepage demos and installation fit on a phone with keyboard navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const calendarTab = page.getByRole("tab", { name: "Calendar", exact: true });
  await calendarTab.focus();
  await calendarTab.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Color Picker", exact: true }),
  ).toBeFocused();
  await expect(page.getByLabel("Color HEX")).toBeVisible();
  for (const name of ["Color Picker", "Theme Studio", "Calendar"]) {
    await page.getByRole("tab", { name, exact: true }).click();
    await expect(
      page.locator(`[role="tabpanel"]:visible [aria-busy]`),
    ).toHaveAttribute("aria-busy", "false");
    expect(
      await page
        .locator(`[role="tabpanel"]:visible [data-demo-host]`)
        .evaluate((host) => {
          const bounds = host.getBoundingClientRect();
          return [...host.children].every((child) => {
            const rect = child.getBoundingClientRect();
            return rect.top >= bounds.top && rect.bottom <= bounds.bottom;
          });
        }),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByLabel("Package", { exact: true })
    .selectOption("date-time-picker");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
