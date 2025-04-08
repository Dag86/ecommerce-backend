import { test, expect } from '@playwright/test';
import { StripeCheckoutPage } from '../pages/StripeCheckoutPage';

test('Stripe Checkout Flow – complete payment and redirect', async ({ page, request }) => {
  // 1. Create checkout session
  const response = await request.post('/checkout', { data: { product_id: 1 } });
  const body = await response.json();
  const checkoutUrl = body.checkout_url;
  console.log('Stripe Checkout URL:', checkoutUrl);

  // 2. Navigate to Stripe checkout page
  await page.goto(checkoutUrl);
  await expect(page).toHaveURL(/stripe\.com/);

  // 3. Initialize page object and fill form fields
  const stripePage = new StripeCheckoutPage(page);
  await stripePage.fillEmail('test@example.com');
  await stripePage.fillCardholderName('Amir QA');
  await stripePage.fillCardDetails('4242 4242 4242 4242', '12 / 34', '123', '90210');
  await stripePage.selectCountry('United States');
  
  //4. Uncheck the checkbox for saving info
  await stripePage.checkboxInputUncheck();

  // 5. Click the Pay button and wait for redirect
  await stripePage.clickPayButton();
  await page.waitForTimeout(5000); // Wait for the redirect to complete
  expect(page).toHaveURL('/success');
  
});
