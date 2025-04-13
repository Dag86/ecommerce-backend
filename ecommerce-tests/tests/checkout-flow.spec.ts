// Description: This test automates the Stripe checkout flow for an e-commerce application.
// It includes fetching a product, creating a checkout session, filling out the Stripe form, and confirming the payment.  
// The test uses Playwright for browser automation and includes assertions to validate each step.
// The test is structured to be reusable and maintainable, with clear separation of concerns for each step in the checkout process.


import { test, expect } from '@playwright/test';
import { StripeCheckoutPage } from '../pages/StripeCheckoutPage';
import { testUser, testCards, address } from '../utils/testData';
test('Stripe Checkout Flow - complete payment and redirect', async ({ page, request }) => {
  let productId: number;
  let checkoutUrl: string;

  await test.step('Fetch products and select first product ID', async () => {
    const res = await request.get('/products');
    const products = await res.json();
    expect(products.length).toBeGreaterThan(0);
    productId = products[0].id;
  });

  await test.step('Create Stripe checkout session', async () => {
    const res = await request.post('/checkout', { data: { product_id: productId } });
    const body = await res.json();
    checkoutUrl = body.checkout_url;
    console.log('Stripe Checkout URL:', checkoutUrl);
  });

  await test.step('Navigate to Stripe and validate URL', async () => {
    await page.goto(checkoutUrl);
    await expect(page).toHaveURL(/stripe\.com/);
  });

  const stripePage = new StripeCheckoutPage(page);

  await test.step('Fill out Stripe payment form', async () => {
    await stripePage.fillEmail(testUser.email);
    await stripePage.fillCardholderName(testUser.name);
    await stripePage.fillCardDetails(
      testCards.visa.number,
      testCards.visa.exp,
      testCards.visa.cvc,
      address.zip
    );
    await stripePage.selectCountry(address.country);
    await stripePage.setSaveInfoCheckbox(false);
  });

  await test.step('Submit payment and confirm redirect', async () => {
    await stripePage.clickPayButton();
    await page.waitForURL('**/success', { timeout: 10000 });
    expect(page.url()).toContain('/success');
  });
});

