
// File: StripeCheckoutPage.ts
// Description: This file contains the StripeCheckoutPage class, which provides methods to interact with the Stripe checkout page in a Playwright test suite. 
// It includes methods for filling in the email address, cardholder name, card details, selecting a country, and clicking the Pay button.

import { Page, expect } from '@playwright/test';

export class StripeCheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Fill in the email address field
  async fillEmail(email: string) {
    await this.page.locator('input[name="email"]').fill(email);
  }

  // Fill in the cardholder name field
  async fillCardholderName(name: string) {
    await this.page.getByLabel('Cardholder name').fill(name);
  }

  // Fill card details by accessing nested Stripe iframes
  async fillCardDetails(card: string, exp: string, cvc: string, zip: string) {
    await this.page.locator('input[placeholder="1234 1234 1234 1234"]').waitFor({ timeout: 15000 });
    await this.page.locator('input[placeholder="1234 1234 1234 1234"]').fill(card);
    await this.page.locator('input[placeholder="MM / YY"]').fill(exp);
    await this.page.locator('input[placeholder="CVC"]').fill(cvc);
    await this.page.locator('input[placeholder="ZIP"]').fill(zip);
  }

  // Select a country from a combobox
  async selectCountry(country: string) {
    await this.page.getByRole('combobox', { name: 'Country or region' }).selectOption({ label: country });
  }

  // ✅ NEW: Unified method to set checkbox state
  async setSaveInfoCheckbox(checked: boolean) {
    const box = this.page.getByRole('checkbox', { name: 'Save my info for 1-click' });
    if (checked) {
      await box.check();
    } else {
      await box.uncheck();
    }
  }

  // Click the Pay button
  async clickPayButton() {
    const payButton = this.page.getByRole('button', { name: /pay/i });
    await payButton.click();
  }
}
