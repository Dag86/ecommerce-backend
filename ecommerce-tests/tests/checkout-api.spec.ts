// Description: This test checks the /checkout API endpoint for a valid Stripe session URL.
// It verifies that the response contains a valid URL and that the product ID used is valid. The test uses Playwright for API testing and includes assertions to validate the response structure and content.
// It also includes a helper function to fetch the first product ID from the API, ensuring that the test is reusable and maintainable.

import { test, expect } from '@playwright/test';
import { getFirstProductId } from '../helpers/apiHelpers';

test('POST /checkout returns valid Stripe session URL for real product', async ({ request }) => {
  const productId = await test.step('Fetch first product ID', async () => {
    return await getFirstProductId(request);
  });

  let checkoutUrl: string;

  await test.step('Post to /checkout with productId', async () => {
    const response = await request.post('/checkout', {
      data: { product_id: productId },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('checkout_url');
    expect(body.checkout_url).toMatch(/^https:\/\/checkout\.stripe\.com/);
    checkoutUrl = body.checkout_url;
  });

  await test.step('Log the Stripe Checkout URL', async () => {
    console.log('✅ Stripe Checkout URL:', checkoutUrl);
  });
});
