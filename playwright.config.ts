import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  workers: 2,
  timeout: 45000,
  use: { baseURL: process.env.E2E_BASE_URL || "http://localhost:3000" },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  reporter: "list",
});
