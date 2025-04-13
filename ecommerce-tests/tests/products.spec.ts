// ✅ Test: Validate GET /products returns correct seeded data
// // This test checks the GET /products endpoint to ensure it returns the seeded product data correctly.
// // It verifies that the response contains the expected product names and structure, ensuring that the API is functioning as intended.

import { test, expect } from '@playwright/test';
import { seededProducts } from '../utils/testData';

test('GET /products returns seeded items with correct structure', async ({ request }) => {
  const response = await test.step('Fetch /products and verify 200 response', async () => {
    const res = await request.get('/products');
    expect(res.status()).toBe(200);
    return res;
  });

  const body = await test.step('Parse response JSON body', async () => {
    return await response.json();
  });

  await test.step('Validate seeded product names are present', async () => {
    const productNames = body.map((item: any) => item.name);
    seededProducts.forEach(name => expect(productNames).toContain(name));
  });

  await test.step('Ensure all products have required structure', async () => {
    for (const item of body) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('price');
    }
  });
});
