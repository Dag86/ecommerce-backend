// Playwright configuration file for E2E tests
// This file is used to configure Playwright's test runner and settings


import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000, // Global timeout per test
  retries: process.env.CI ? 1 : 0,

  // ✅ Global expect settings (must be top-level, not in `use`)
  expect: {
    timeout: 5000, // 5 seconds max for each expect()
  },

  use: {
    baseURL: 'http://127.0.0.1:8000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});
