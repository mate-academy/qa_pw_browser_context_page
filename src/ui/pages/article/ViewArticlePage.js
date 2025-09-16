import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link')
      .filter({ hasText: 'Edit Article' })
      .first();
    this.deleteArticleButton = page
      .getByRole('link')
      .filter({ hasText: 'Delete Article' })
      .first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click on the 'Edit' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickDeleteArticleButton() {
    await test.step(`Click on the 'Delete' button`, async () => {
      await this.deleteArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(`Assert the article author username is visible`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertArticleAuthorNameIsCorrect(username) {
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toContainText(
        username,
      );
    });
  }
}
