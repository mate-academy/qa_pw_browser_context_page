import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.noArticlesMessage = page.getByText('No articles are here... yet.');
  }

  articlePreviewLink(title) {
    return this.page.getByRole('link', { name: title });
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

  async open() {
    await test.step(`Open 'Home' page`, async () => {
      await this.page.goto('/');
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click the 'Your feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async assertArticlePreviewLinkIsVisible(title) {
    await test.step(`Assert the article '${title}' is visible in the feed`, async () => {
      await expect(this.articlePreviewLink(title)).toBeVisible();
    });
  }

  async assertNoArticlesMessageIsVisible() {
    await test.step(`Assert the message 'No articles are here... yet.' is visible in the feed`, async () => {
      await expect(this.noArticlesMessage).toBeVisible();
    });
  }

  async assertArticlePreviewLinkIsHidden(title) {
    await test.step(`Assert the article '${title}' is not in the feed`, async () => {
      await expect(this.articlePreviewLink(title)).toBeHidden();
    });
  }
}
