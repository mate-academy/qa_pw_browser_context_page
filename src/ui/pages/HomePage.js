import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articlesList = page.locator('.article-preview');
    this.articleTitle = page.locator('a.preview-link h1');
    this.articleDescription = page.locator('a.preview-link p');
    this.articleTags = page.locator('ul.tag-list > li');
    this.emptyState = page.getByText('No articles are here... yet.');
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickYourFeedTab() {
    await test.step(`Click on the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await test.step(`Click on the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async getArticleByAuthor(authorName, index = 0) {
    return await test.step('Find Article in Feed by Author', async () => {
      const article = this.articlesList
        .filter({ has: this.page.locator('.author', { hasText: authorName }) })
        .nth(index);
      return article;
    });
  }

  async assertArticleTitleContainsText(authorName, index = 0, title) {
    await test.step(`Article 'Title' is shown`, async () => {
      const article = await this.getArticleByAuthor(authorName, index);
      await expect(article.locator('h1')).toContainText(title);
    });
  }

  async assertArticleDescriptionContainsText(
    authorName,
    index = 0,
    description,
  ) {
    await test.step(`Article 'Description' is shown`, async () => {
      const article = await this.getArticleByAuthor(authorName, index);
      await expect(article.locator('p')).toContainText(description);
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertEmptyStateIsVisible() {
    await test.step(`Assert check 'No articles..' empty state`, async () => {
      await expect(this.emptyState).toBeVisible();
    });
  }
}
