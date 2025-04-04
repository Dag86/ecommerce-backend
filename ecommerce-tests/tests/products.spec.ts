// This test file checks the functionality of the GET /products endpoint.
// It verifies that the endpoint returns a 200 status code and contains seeded items in the response.
// Import necessary modules from Playwright
import { test, expect } from '@playwright/test';


test('GET /products returns seeded items', async ({ request }) => {
  const response = await request.get('/products');
  expect(response.status()).toBe(200);

  const body = await response.json();
  const productNames = body.map((item: any) => item.name);

  expect(productNames).toContain('Laptop');
  expect(productNames).toContain('Smartphone');
});
