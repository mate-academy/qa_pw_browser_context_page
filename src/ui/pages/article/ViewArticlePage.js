import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followButton = page.getByRole('button', { name: /Follow/ });
    this.unfollowButton = page.getByRole('button', { name: /Unfollow/ });
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
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
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.first().click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.unfollowButton.first().click();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton.first()).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowButton.first()).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }
}
