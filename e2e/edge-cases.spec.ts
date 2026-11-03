import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "ar"]) {
  for (const width of [320, 360, 428, 820, 1024, 1280, 1920]) {
    test(`${locale} reflows at ${width}px and 200% text`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await page.evaluate(() => document.documentElement.style.fontSize = "200%");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(page.locator("#personal")).toContainText(locale === "ar" ? "السالمية" : "Salmiya");
      await expect(page.locator("#certificates")).toBeVisible();
      await expect(page.locator("#skills")).toContainText("TypeScript");
      await page.screenshot({ path: `artifacts/edge-${locale}-${width}-text-200.png` });
    });
  }
  for (const theme of ["light", "dark"] as const) {
    for (const width of [375, 1440]) {
      test(`${locale} ${theme} ${width}: accessibility audit`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: theme });
        await page.goto(`/${locale}`);
        const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
        expect(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
      });
    }
  }
  test(`${locale}: small-height menu, keyboard dialog and malformed URL`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 400 });
    await page.goto(`/${locale}`);
    const menu = page.locator(".nav-menu");
    await menu.click();
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
    await page.locator('a[href="#certificates"]').first().click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Control+k");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("combobox").fill("zzzzzzz");
    await page.keyboard.press("ArrowDown");
    await page.getByRole("combobox").fill(locale === "ar" ? "الشهادات" : "Certificates");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("#certificates")).toBeInViewport();
    await page.keyboard.press("Control+k");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.locator("#phish-url-input").fill("javascript:alert(1)");
    await page.locator(".phish-submit").click();
    await expect(page.locator("#url-error")).toBeVisible();
    await expect(page.locator(".risk-label")).toHaveCount(0);
    await page.locator("#phish-url-input").fill("https://github.com");
    await expect(page.locator("#url-error")).toHaveCount(0);
    await page.locator(".phish-submit").click();
    await expect(page.locator(".risk-label")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
  });
}

test("system preference changes apply until explicitly overridden", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await page.emulateMedia({ colorScheme: "light" });
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("storage denied does not break initial theme or controls", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage unavailable"); } });
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("theme synchronizes across two tabs", async ({ context }) => {
  const first = await context.newPage();
  const second = await context.newPage();
  await first.goto("/en"); await second.goto("/ar");
  await first.getByRole("button", { name: "Switch color theme" }).click();
  const theme = await first.locator("html").getAttribute("data-theme");
  await expect(second.locator("html")).toHaveAttribute("data-theme", theme!);
});
