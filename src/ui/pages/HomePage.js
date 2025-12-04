import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedTab = page.getByText('Global Feed');
    this.articlePreview = page.locator('.article-preview');
    this.articleTitle = this.articlePreview.locator('h1');
    this.yourFeedTab = page.getByText('Your Feed');
    this.url = '/';
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  async reload() {
    await test.step(`Reload the page`, async () => {
      await this.page.reload();
    });
  }

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async assertNoArticlesMessageIsVisible() {
    await test.step(`Assert the tab is empty`, async () => {
      const emptyFeedMessage = this.page.getByText('No articles are here... yet.');
      await expect(emptyFeedMessage).toBeVisible();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertFeedContainsArticleTitle(articleTitle) {
    await test.step(`Assert the feed contains article title: ${articleTitle}`, async () => {
      const articleTitleLocator = this.articlePreview.locator('h1', { hasText: articleTitle });
      await expect(articleTitleLocator).toBeVisible();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async open() {
    await test.step(`Navigate to the home page`, async () => {
      await this.page.goto(this.url);
    });
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
}
