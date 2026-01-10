import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
    this.globalFeedTab = page.locator('.nav-item', { hasText: 'Global Feed' });
    this.yourFeedTab = page.locator('.nav-item', { hasText: 'Your Feed' });
    this.articleTitle = page.locator('.preview-link h1');
    this.articleDescription = page.getByRole('paragraph');
    this.articleAuthor = page.locator('a.author');
  }

  async open() {
    await test.step(`Open the Home page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSettingsLink() {
    await test.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitle.filter({ hasText: title })).toBeVisible();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(
        this.articleDescription.filter({ hasText: description }),
      ).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(
        this.articleAuthor.filter({ hasText: username }),
      ).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsNotVisible(username) {
    await test.step(`Assert that author: ${username} is not visible on the page`, async () => {
      await expect(
        this.page.getByRole('link', { name: username }),
      ).not.toBeVisible();
    });
  }

  async waitAndReload(retries = 3, delay = 5000) {
    for (let i = 0; i < retries; i++) {
      await this.page.waitForTimeout(delay);
      await this.page.reload();
    }
  }
}
