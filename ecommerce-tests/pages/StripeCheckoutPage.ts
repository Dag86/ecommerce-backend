import { Page,expect } from '@playwright/test';

export class StripeCheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Fill in the email address field
  async fillEmail(email: string) {
    // Assumes the email input is directly on the page with placeholder "Email"
    await this.page.locator('input[name="email"]').fill(email);

  }

    // Fill in the cardholder name field
    async fillCardholderName(name: string) {
      // Assumes the cardholder name field is labeled "Cardholder name" on the main page
      await this.page.getByLabel('Cardholder name').fill(name);
    }

  // Fill card details by accessing nested Stripe iframes
  async fillCardDetails(card: string, exp: string, cvc: string, zip: string) {
    await this.page.locator('input[placeholder="1234 1234 1234 1234"]').waitFor({ timeout: 15000 });

    // Fill in card details using appropriate selectors
    await this.page.locator('input[placeholder="1234 1234 1234 1234"]').fill(card);
    await this.page.locator('input[placeholder="MM / YY"]').fill(exp);
    await this.page.locator('input[placeholder="CVC"]').fill(cvc);
    await this.page.locator('input[placeholder="ZIP"]').fill(zip);
  }
  
  // Select a country from a combobox
  async selectCountry(country: string) {
    // Assumes the combobox is labeled "Country or region"
    await this.page.getByRole('combobox', { name: 'Country or region' }).selectOption({ label: country });
  }
  async checkboxInputUncheck() {
    await this.page.getByRole('checkbox', { name: 'Save my info for 1-click' }).uncheck();
  }
  async checkboxInputCheck() {
    await this.page.getByRole('checkbox', { name: 'Save my info for 1-click' }).check();
    
  }

  // Click the Pay button
  async clickPayButton() {
    const payButton = this.page.getByRole('button', { name: /pay/i });
    await payButton.click();
  }
}
