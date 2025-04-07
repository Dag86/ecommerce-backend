import { Page, Locator, FrameLocator } from '@playwright/test';

export class StripeCheckoutPage {
  private page: Page;
  private outerFrame: FrameLocator;
  private innerFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.outerFrame = page.frameLocator('iframe[name^="privateStripeFrame"]');
    this.innerFrame = this.outerFrame.frameLocator('iframe');
  }

  async fillCardDetails(card: string, exp: string, cvc: string, zip: string) {
    await this.innerFrame.locator('input[name="cardnumber"]').fill(card);
    await this.innerFrame.locator('input[name="exp-date"]').fill(exp);
    await this.innerFrame.locator('input[name="cvc"]').fill(cvc);
    await this.innerFrame.locator('input[name="postal"]').fill(zip);
  }

  async fillName(name: string) {
    await this.page.getByLabel('Name on card').fill(name);
  }

  async clickPayButton() {
    const payButton = this.page.getByRole('button', { name: /pay/i });
    await payButton.click();
  }

  async waitForSuccessRedirect() {
    await this.page.waitForURL('**/success');
  }
}
