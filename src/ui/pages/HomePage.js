import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.locator('a:has-text("Your Feed")').first();
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      // Debug: Check current URL
      console.log('Current URL:', this.page.url());
      
      await this.yourFeedTab.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
}
