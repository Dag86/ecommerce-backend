// This file is used to configure Playwright for end-to-end testing of the e-commerce application.
// It sets the test directory, base URL, viewport size, and other settings for the tests.
// It also includes a setup file to initialize the testing environment before running the tests.
// Import necessary modules from Playwright

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://127.0.0.1:8000',
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});