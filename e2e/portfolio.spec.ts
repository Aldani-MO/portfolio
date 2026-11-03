import { test, expect } from "@playwright/test";

for (const locale of ["en", "ar"]) {
  for (const width of [375, 768, 1440]) {
    for (const theme of ["light", "dark"]) {
      test(`${locale} ${width}px ${theme}: readable, responsive and interactive`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce", colorScheme: theme as "light" | "dark" });
        const errors: string[] = [];
        page.on("pageerror", err => errors.push(err.message));
        const response = await page.goto(`/${locale}`);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        for (const section of ["depot", "about", "projects", "experience", "skills", "contact"]) {
          await expect(page.locator(`#${section}`)).toBeVisible();
          await page.locator(`#${section}`).screenshot({ path: `artifacts/${locale}-${width}-${theme}-${section}.png` });
        }
        const confidence = page.locator("#confidence-gate");
        await confidence.fill("100");
        await expect(page.locator(".demo-result")).toContainText("SKIP");
        await confidence.fill("0");
        await page.locator("#occupancy").fill("18");
        await expect(page.locator(".demo-result")).toContainText("EARLY-DEPART");
        await page.locator("#occupancy").fill("48");
        await expect(page.locator(".demo-result")).toContainText("STOP");
        await page.locator(".phish-samples button").last().click();
        await expect(page.locator(".rule-list")).toBeVisible();
        await expect(page.locator(".rule-triggered")).not.toHaveCount(0);
        await page.keyboard.press("Control+k");
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.getByRole("combobox").fill("zzzzzz");
        await expect(page.getByRole("option")).toHaveCount(0);
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).toHaveCount(0);
        if (width < 1000) {
          await page.locator(".nav-menu").click();
          await expect(page.locator(".nav-links")).toBeVisible();
          await page.locator('.nav-links a[href="#contact"]').click();
          await expect(page.locator(".nav-menu")).toHaveAttribute("aria-expanded", "false");
        }
        if (await page.locator("#name").count()) {
          await page.locator("#name").fill("Test visitor");
          await page.locator("#email").fill("invalid");
          await page.locator("#message").fill("A test message for validation.");
          await page.locator('button[type="submit"]').click();
          expect(await page.locator("#email").evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
        } else {
          await expect(page.locator('.contact-direct a')).toHaveAttribute("href", "mailto:Mohammedaldani03@gmail.com");
        }
        expect(errors).toEqual([]);
      });
    }
  }
}

test("content is available without JavaScript; CV and credits exist", async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/ar");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#projects h2")).toBeVisible();
  expect((await request.get("/cv.pdf")).status()).toBe(200);
  expect((await request.get("/humans.txt")).status()).toBe(200);
  const socialImage = await request.get("/opengraph-image");
  expect(socialImage.status()).toBe(200);
  expect(socialImage.headers()["content-type"]).toContain("image/png");
  await context.close();
});

test("theme persists after reload and Arabic language switch", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Switch color theme" }).click();
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
  await page.locator('a[hreflang="ar"]').click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme!);
});
