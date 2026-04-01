import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.openGlobalFeed = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async goToGlobalFeed() {
    await test.step(`Open 'Global feed' page`, async () => {
      await this.openGlobalFeed.click();
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
        this.page.getByRole('heading', { name: title }),
      ).toContainText(title);
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(
        this.page.getByRole('link', { name: username }).first(),
      ).toBeVisible();
    });
  }

  async assertNoArticlesInYourFeed() {
    await test.step(`Assert there is an empty 'Your Feed' tab`, async () => {
      const emptyState = this.page.getByText('No articles are here... yet.');
      await expect(emptyState).toBeVisible();
    });
  }
}
