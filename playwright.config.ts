import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  workers: 2,
  timeout: 45000,
  use: { baseURL: "http://localhost:3000", browserName: "chromium" },
  reporter: "list",
});
