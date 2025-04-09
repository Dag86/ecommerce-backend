// ✅ Test: Validate GET /products returns correct seeded data

import { test, expect } from '@playwright/test';

// Constants – reuse seeded product names
const seededProducts = ['Laptop', 'Smartphone'];

test('GET /products returns seeded items with correct structure', async ({ request }) => {
  const response = await request.get('/products');
  
  // ✅ Validate response status
  expect(response.status()).toBe(200);

  const body = await response.json();

  // ✅ Check that seeded products are present
  const productNames = body.map((item: any) => item.name);
  seededProducts.forEach(name => expect(productNames).toContain(name));

  // ✅ Check that each product has valid structure
  for (const item of body) {
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
  }
});
