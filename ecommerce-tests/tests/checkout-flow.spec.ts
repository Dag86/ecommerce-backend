// Description: This test verifies the Stripe checkout flow by simulating a payment process and checking for a successful redirect.
// It uses Playwright's request API to initiate the checkout and then fills in the payment details using the StripeCheckoutPage class.
// The test checks that the checkout URL contains 'stripe.com', fills in the card details, and verifies that the page redirects to a success URL after payment.   

// ecommerce-tests/tests/checkout-flow.spec.ts

import { test, expect } from '@playwright/test';
import { StripeCheckoutPage } from '../pages/StripeCheckoutPage';

test('Stripe Checkout Flow – complete payment and redirect', async ({ page, request }) => {
  const res = await request.post('/checkout', { data: { product_id: 1 } });
  const { checkout_url } = await res.json();
  expect(checkout_url).toContain('stripe.com');

  await page.goto(checkout_url);

  const stripePage = new StripeCheckoutPage(page);
  await stripePage.fillCardDetails('4242 4242 4242 4242', '12 / 34', '123', '90210');
  await stripePage.fillName('Amir QA');
  await stripePage.clickPayButton();
  await stripePage.waitForSuccessRedirect();

  expect(page.url()).toContain('/success');
});
