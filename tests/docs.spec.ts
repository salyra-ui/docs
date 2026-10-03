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
