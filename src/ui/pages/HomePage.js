import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.navigation = page.getByRole('navigation');
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.articleTitle = page.getByRole('heading', { level: 1 });
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

  async clickGlobalFeedTabLink() {
    await test.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async clickYourFeedTabLink() {
    await test.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickOnArticle(title) {
    await test.step(`Assert the user can click on a created article`,
      async () => {
        await this.articleTitle.filter({ hasText: title }).click();
      });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertGlobalFeedTabIsVisible() {
    await test.step(`Assert the 'Global Feed' tab is visible`, async () => {
      await expect(this.globalFeedTab).toBeVisible();
    });
  }

  async assertArticleInFeedTabIsVisible(title) {
    await test.step(`Assert an article is visible`,
      async () => {
        await expect(this.articleTitle.filter(
          { hasText: title }
        )).toBeVisible();
      });
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article has correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
      });
  }

  async assertUsernameIsVisible(username) {
    await test.step(`Assert the logged in username`,
      async () => {
        await expect(this.navigation.filter(
          { hasText: username }
        )).toBeVisible();
      });
  }

  async assertArticleInFeedTabIsNotVisible(title) {
    await test.step(`Assert an article is not visible`,
      async () => {
        await expect(this.articleTitle.filter(
          { hasText: title }
        )).toBeHidden();
      });
  }

  async assertArticleAuthorNameIsNotVisible(username) {
    await test.step(`Assert the article doesn't have correct author username`,
      async () => {
        await expect(this.authorLinkInArticleHeader(username)).toBeHidden();
      });
  }
}
