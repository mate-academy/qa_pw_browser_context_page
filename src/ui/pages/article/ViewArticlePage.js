import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followButton = page.getByRole('button', { name: /follow/i }).first();
    this.editArticleLink = page.getByRole('link', 
      { name: 'Edit Article' }).first();
  }

  authorLinkInArticleHeader(username) {
  return this.page.getByRole('link', { name: username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.click();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async assertFollowButtonHasText(text) {
    const stepName = `Assert the follow button shows '${text}'`;

    await test.step(stepName, async () => {
      await expect(this.followButton).toContainText(text, { timeout: 10000 });
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

  async assertArticleAuthorNameIsVisible(username) {
    const stepName = `Assert the article has correct author username`;

    await test.step(stepName, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }
}