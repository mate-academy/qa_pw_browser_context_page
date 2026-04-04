import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link',
      { name: 'Edit Article' }).first();
    this.followArticleButton = page.getByRole('button',
      { name: 'Follow' }).first();
    this.unfollowArticleButton = page.getByRole('button',
      { name: 'Unfollow' }).first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url, { waitUntil: 'commit' });
    });
  }

  async reload() {
    await test.step(`Reload the page`, async () => {
      await this.page.reload({ waitUntil: 'commit' });
    });
  }

  async clickFollowArticleButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followArticleButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickUnfollowArticleButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.unfollowArticleButton.click();
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
    await test.step(`Assert the article has correct author username`,
      async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertFollowArticleButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followArticleButton).toBeVisible();
    });
  }

  async assertUnfollowArticleButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowArticleButton).toBeVisible();
    });
  }
}
