import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.articlePreview = page.locator('.article-preview');
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticleIsVisibleInFeed(title) {
    await test.step(`Assert the article '${title}' is visible in feed`, async () => {
      await expect(
        this.articlePreview.filter({ hasText: title }),
      ).toBeVisible();
    });
  }

  async assertArticleIsNotVisibleInFeed(title) {
    await test.step(`Assert the article '${title}' is NOT visible in feed`, async () => {
      await expect(this.articlePreview.filter({ hasText: title })).toHaveCount(
        0,
      );
    });
  }
}
