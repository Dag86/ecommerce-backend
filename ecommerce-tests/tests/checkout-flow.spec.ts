// Description: This test automates the Stripe checkout flow for an e-commerce application.
// It includes fetching a product, creating a checkout session, filling out the Stripe form, and confirming the payment.  
// The test uses Playwright for browser automation and includes assertions to validate each step.
// The test is structured to be reusable and maintainable, with clear separation of concerns for each step in the checkout process.


import { test, expect } from '@playwright/test';
import { StripeCheckoutPage } from '../pages/StripeCheckoutPage';

test('Stripe Checkout Flow – complete payment and redirect', async ({ page, request }) => {
  // 🔁 Step 1: Fetch product dynamically
  const products = await request.get('/products').then(res => res.json());
  expect(products.length).toBeGreaterThan(0);

  const productId = products[0].id;

  // 🚀 Step 2: Create Stripe checkout session
  const response = await request.post('/checkout', { data: { product_id: productId } });
  const body = await response.json();
  const checkoutUrl = body.checkout_url;
  console.log('Stripe Checkout URL:', checkoutUrl);

  // 🌐 Step 3: Navigate to Stripe and validate
  await page.goto(checkoutUrl);
  await expect(page).toHaveURL(/stripe\.com/);

  // 📄 Step 4: Fill out Stripe form
  const stripePage = new StripeCheckoutPage(page);
  await stripePage.fillEmail('test@example.com');
  await stripePage.fillCardholderName('Amir QA');
  await stripePage.fillCardDetails('4242 4242 4242 4242', '12 / 34', '123', '90210');
  await stripePage.selectCountry('United States');
  await stripePage.checkboxInputUncheck();

  // 💳 Step 5: Submit payment and confirm redirect
  await stripePage.clickPayButton();
  await page.waitForURL('**/success', { timeout: 10000 });
  expect(page.url()).toContain('/success');
});
