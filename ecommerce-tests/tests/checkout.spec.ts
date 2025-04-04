// This test checks the /checkout endpoint of the ecommerce API
// to ensure it returns a valid Stripe session URL for a given product ID.
// It uses Playwright's request API to send a POST request to the endpoint
// and verifies the response status and structure.

import { test, expect } from '@playwright/test';

test('POST /checkout returns Stripe session URL', async ({ request }) => {
  const productId = 1;

  const response = await request.post('/checkout', {
    data: { product_id: productId }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('checkout_url');
  expect(body.checkout_url).toMatch(/^https:\/\/checkout\.stripe\.com/);

  console.log('Stripe Checkout URL:', body.checkout_url);
});
