import { test, expect } from "@playwright/test";

test.describe("configured contact form, with network delivery intercepted", () => {
  test.skip(!process.env.CONTACT_TEST_URL, "Run a local server with dummy contact configuration to test the enabled form.");
  for (const locale of ["en", "ar"]) {
    test(`${locale}: validation, duplicate taps, offline error and retained draft`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 700 });
      await page.goto(`${process.env.CONTACT_TEST_URL}/${locale}`);
      await expect(page.locator("#name")).toBeVisible();
      let posts = 0;
      let release!: () => void;
      const gate = new Promise<void>(resolve => { release = resolve; });
      await page.route("**/*", async route => {
        if (route.request().method() !== "POST") return route.continue();
        posts++;
        await gate;
        await route.abort("failed");
      });
      await page.locator("#name").fill("Visitor");
      await page.locator("#email").fill("invalid");
      await page.locator("#message").fill("A message to test the contact form.");
      await page.locator('button[type="submit"]').click();
      expect(await page.locator("#email").evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
      expect(posts).toBe(0);
      await page.locator("#email").fill("visitor@example.com");
      await page.setViewportSize({ width: 375, height: 360 });
      await page.locator("#message").focus();
      await page.locator("#message").scrollIntoViewIfNeeded();
      await expect(page.locator("#message")).toBeInViewport();
      await page.locator("form").evaluate((form: HTMLFormElement) => { form.requestSubmit(); form.requestSubmit(); });
      await expect.poll(() => posts).toBe(1);
      await expect(page.locator('button[type="submit"]')).toBeDisabled();
      release();
      await expect(page.locator('form [role="alert"]')).toContainText("Mohammedaldani03@gmail.com");
      await expect(page.locator("#name")).toHaveValue("Visitor");
      await expect(page.locator("#message")).toHaveValue("A message to test the contact form.");
      await expect(page.locator('button[type="submit"]')).toBeEnabled();
      expect(posts).toBe(1);
    });
  }
});
