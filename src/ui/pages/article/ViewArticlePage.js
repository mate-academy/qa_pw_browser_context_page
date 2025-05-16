import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followButton = page
      .getByRole('button')
      .filter({ hasText: 'Follow' })
      .first();
    this.unfollowButton = page
      .getByRole('button')
      .filter({ hasText: 'Unfollow' })
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
    await test.step(`Click follow button`, async () => {
      await this.followButton.click();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Unfollow button is visible`, async () => {
      await expect(this.unfollowButton).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Follow button is visible`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click unfollow button`, async () => {
      await this.unfollowButton.click();
    });
  }
}
