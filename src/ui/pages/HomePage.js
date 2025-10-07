import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' }).or(page.locator('a:has-text("Global Feed")'));
    this.yourFeedTab = page.getByRole('button', { name: 'Your Feed' }).or(page.locator('a:has-text("Your Feed")'));
    this.articlePreview = (title) => page.locator(`.article-preview h1:has-text("${title}")`);
  }

  async open() {
  await test.step('Open Home page', async () => {
    await this.page.goto('/');
    // Accept both hash-based and clean URLs
    await expect(this.page).toHaveURL(/conduit\.mate\.academy\/?$/);
  });
}

  async openGlobalFeed() {
    await test.step('Open Global Feed tab', async () => {
      await this.globalFeedTab.click();
      await expect(this.globalFeedTab).toHaveClass(/active/);
    });
  }

  async openYourFeed() {
    await test.step('Open Your Feed tab', async () => {
      await this.yourFeedTab.click();
      await expect(this.yourFeedTab).toHaveClass(/active/);
    });
  }

  async openAuthorProfile(username) {
    await test.step(`Open author profile: ${username}`, async () => {
      await this.page.locator(`a:has-text("${username}")`).first().click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step('Assert Your Feed tab is visible', async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleVisible(title) {
    await test.step(`Assert article "${title}" is visible`, async () => {
      await expect(this.articlePreview(title)).toBeVisible();
    });
  }

  async assertArticleNotVisible(title) {
    await test.step(`Assert article "${title}" is not visible`, async () => {
      await expect(this.articlePreview(title)).toHaveCount(0);
    });
  }
}
