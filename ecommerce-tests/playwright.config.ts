// This file is used to configure Playwright for end-to-end testing of the e-commerce application.
// It sets the test directory, base URL, viewport size, and other settings for the tests.
// It also includes a setup file to initialize the testing environment before running the tests.
// Import necessary modules from Playwright

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
