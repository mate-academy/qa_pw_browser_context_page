import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.fieldGlobalFeed = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await test.step('Open Home Page', async () => {
      await this.page.goto('/');
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickFieldGlobalFeed() {
    await test.step('Click the "Global Feed" field', async () => {
      await this.fieldGlobalFeed.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert article title '${title}' is NOT visible`, async () => {
      const articleLocator = this.page
        .locator('.article-preview')
        .filter({ hasText: title });

      await expect(articleLocator).toBeHidden();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert article title '${title}' is visible in feed`, async () => {
      const articleLocator = this.page
        .locator('.article-preview')
        .filter({ hasText: title })
        .first();

      try {
        await expect(articleLocator).toBeVisible({ timeout: 5000 });
      } catch {
        await this.page.reload();
        await expect(articleLocator).toBeVisible({ timeout: 10000 });
      }
    });
  }
}
