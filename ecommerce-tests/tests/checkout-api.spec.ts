// This test checks the checkout functionality of the ecommerce application
// by dynamically fetching a product ID from the database and using it to create a Stripe checkout session.

import { test, expect } from '@playwright/test';

test('POST /checkout returns valid Stripe session URL for real product', async ({ request }) => {
  // ✅ Dynamically fetch first product instead of hardcoding ID
  const productsRes = await request.get('/products');
  expect(productsRes.status()).toBe(200);
  
  const products = await productsRes.json();
  expect(products.length).toBeGreaterThan(0); // ✅ Ensure seeded data is present

  const productId = products[0].id;

  // ✅ Send checkout request using fetched product ID
  const response = await request.post('/checkout', {
    data: { product_id: productId }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('checkout_url');
  expect(body.checkout_url).toMatch(/^https:\/\/checkout\.stripe\.com/);

  console.log('✅ Stripe Checkout URL:', body.checkout_url);
});
