import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.articleTitleHeader = page.getByRole('heading');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeedLink = page.getByText('Global Feed');
  }

  async clickYourFeedTab() {
    await this.yourFeedTab.click();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  async open() {
    await this.page.goto('/');
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickGlobalFeed() {
    await test.step(`Click the 'Global Feed link`, async () => {
      await this.globalFeedLink.click();
    });
  }

  async asserArticleIsVisible(title) {
    await test.step(`Assert the 'Article' is visible`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: `Article title: ${title}`,
        }),
      ).toBeVisible();
    });
  }

  async asserArticleIsHidden(title) {
    await test.step(`Assert the 'Article' is hidden`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: `Article title: ${title}`,
        }),
      ).toBeHidden();
    });
  }

  async clickArtilce(title) {
    await test.step(`Click on the 'Article' on Global Feed`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: `Article title: ${title}`,
        }),
      ).click();
    });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
}
