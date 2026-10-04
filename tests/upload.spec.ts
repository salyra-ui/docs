import { test, expect } from "@playwright/test";
test("uploader guide documents options and uses independent framework tabs", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/file-uploader.html");
  await expect(page.locator("h1")).toHaveText("File Uploader");
  await expect(page.locator("#options")).toContainText("maxConcurrentRequests");
  await expect(page.locator("#item")).toContainText("nextRetryAt");
  await page.getByRole("tab", { name: "Svelte", exact: true }).click();
  await expect(page.locator("[data-framework-code]")).toContainText(
    "@salyra-ui/file-uploader/svelte",
  );
  await expect(page.locator("#customization")).toContainText("className");
  expect(errors).toEqual([]);
});
test("backend reference exposes own routes, storage methods and native integration code", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/upload-server.html");
  await expect(page.locator("#storage")).toContainText("inspectResult");
  await expect(page.locator("#sessions")).toContainText("transaction");
  await page.getByRole("tab", { name: "Java", exact: true }).click();
  await expect(page.locator("[data-native-code]")).toContainText(
    "new HttpAdapter",
  );
  await expect(page.locator("[data-native-source]")).toHaveAttribute(
    "href",
    /backend\/jvm$/,
  );
  expect(errors).toEqual([]);
});
test("browser simulation, retry countdown and per-example code tabs work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/upload-examples.html");
  await expect(page.locator(".intro")).toContainText(
    "No file content is uploaded",
  );
  const root = page.locator("#retry");
  await root.locator("[data-upload-input]").setInputFiles({
    name: "docs-retry.txt",
    mimeType: "text/plain",
    buffer: Buffer.alloc(600000, 65),
  });
  await root.getByRole("button", { name: "Reject next request" }).click();
  await root.getByRole("button", { name: "Upload files", exact: true }).click();
  await expect(root.locator("[data-retry-countdown]")).toContainText(
    "Retrying in",
  );
  await root.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(root.locator(".file-status")).toHaveText("canceled");
  await root.getByRole("tab", { name: "Code", exact: true }).click();
  await root.getByRole("tab", { name: "Vue", exact: true }).click();
  await expect(root.locator("pre")).toContainText(
    "@salyra-ui/file-uploader/vue",
  );
  await expect(
    page.locator('#chunked [data-language="React"]'),
  ).toHaveAttribute("aria-selected", "true");
  expect(errors).toEqual([]);
});
test("uploader Vanilla downloads include both builds and no sourcemaps", async ({
  request,
}) => {
  for (const name of [
    "file-uploader.js",
    "file-uploader.min.js",
    "styles.css",
    "styles.min.css",
  ]) {
    const response = await request.get("/downloads/file-uploader/" + name);
    expect(response.ok()).toBe(true);
    expect(await response.text()).not.toContain("sourceMappingURL");
  }
  const schema = await request.get("/protocol/upload-v1.openapi.json");
  expect((await schema.json()).openapi).toBe("3.1.0");
});
test("uploader guide and examples fit a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const url of [
    "/file-uploader.html",
    "/upload-server.html",
    "/upload-examples.html",
  ]) {
    await page.goto(url);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("uploaded history uses the removal callback and keeps a failed removal visible", async ({
  page,
}) => {
  await page.goto("/upload-examples.html");
  const upload = page.locator("#http");
  const name = `history-${Date.now()}.txt`;
  await upload.locator("[data-upload-input]").setInputFiles({
    name,
    mimeType: "text/plain",
    buffer: Buffer.from("History removal"),
  });
  await upload
    .getByRole("button", { name: "Upload files", exact: true })
    .click();
  await expect(upload.locator(".file-status")).toHaveText("completed");
  const history = page.locator("#history");
  await history
    .getByRole("button", { name: "Load uploaded files", exact: true })
    .click();
  const row = history.locator(".history-row").filter({ hasText: name });
  await expect(row).toHaveCount(1);
  await history
    .getByRole("button", { name: "Reject next removal", exact: true })
    .click();
  await row.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(row).toContainText("Could not remove the file");
  await row.getByRole("button", { name: "Remove", exact: true }).click();
  await expect(row).toHaveCount(0);
  await history.getByRole("tab", { name: "Code", exact: true }).click();
  await history.getByRole("tab", { name: "Svelte", exact: true }).click();
  await expect(history.locator("pre")).toContainText("Load more");
  await expect(history.locator("pre")).toContainText("onRemove");
});

test("version archive keeps its examples and downloads inside the same snapshot", async ({
  page,
  request,
}) => {
  const base = "/versions/file-uploader/0.1.0/";
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base + "file-uploader.html");
  await expect(page.locator("#installation")).toContainText(
    "npm install @salyra-ui/file-uploader@0.1.0",
  );
  await expect(
    page.getByRole("link", { name: "Working examples", exact: true }),
  ).toHaveAttribute("href", base + "upload-examples.html");
  await expect(
    page.getByRole("link", { name: "Backend integration", exact: true }),
  ).toHaveAttribute("href", base + "upload-server.html");
  const download = page.getByRole("link", {
    name: "Minified JavaScript",
    exact: true,
  });
  await expect(download).toHaveAttribute(
    "href",
    base + "downloads/file-uploader/file-uploader.min.js",
  );
  expect(
    (
      await request.get(base + "downloads/file-uploader/file-uploader.min.js")
    ).ok(),
  ).toBe(true);
  await page
    .getByRole("link", { name: "Working examples", exact: true })
    .click();
  await expect(page.locator("#http")).toBeVisible();
  expect(errors).toEqual([]);
});
