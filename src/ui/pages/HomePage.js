import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  articlePreviewByTitle(title) {
    return this.page.locator('.article-preview').filter({ hasText: title });
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
      await expect(
        this.articlePreviewByTitle(title).getByRole('heading'),
      ).toContainText(title);
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert the article with title '${title}' is not visible`,
      async () => {
      await expect(this.articlePreviewByTitle(title)).toBeHidden();
    });
  }

  async assertArticleDescriptionIsVisible(title, description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(
        this.articlePreviewByTitle(title).getByText(description),
      ).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsVisible(title, username) {
    await test.step(`Assert the article has correct author username`,
      async () => {
        await expect(
          this.articlePreviewByTitle(title).getByRole('link',
            { name: username }),
        ).toBeVisible();
      });
  }
}
