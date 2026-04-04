import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articleTitleHeader = page.locator('.container.page')
      .getByRole('heading').first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  async open() {
    await test.step(`Open the home page`, async () => {
      await this.page.goto('/', { waitUntil: 'commit' });
    });
  }

  async reload() {
    await test.step(`Reload the page`, async () => {
      await this.page.reload({ waitUntil: 'commit' });
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
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

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert the article with title '${title}' is not visible`,
      async () => {
      await expect(this.articleTitleHeader).toBeHidden();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(this.page.getByText(description)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      });
  }
}
