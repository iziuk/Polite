import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  expect: {
    timeout: 5_000,
  },
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  retries: process.env.CI ? 2 : 0,
  testDir: "tests/e2e/web",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn workspace polite-mvp dev --hostname 127.0.0.1 --port 3000",
    reuseExistingServer: !process.env.CI,
    stderr: "pipe",
    stdout: "ignore",
    timeout: 120_000,
    url: BASE_URL,
  },
  workers: process.env.CI ? 1 : undefined,
});
