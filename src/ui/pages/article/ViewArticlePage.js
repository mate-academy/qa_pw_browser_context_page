import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followButton = page.getByRole('button', {
      name: /Follow/,
    });
    this.unfollowButton = page.getByRole('button', {
      name: /Unfollow/,
    });
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .nth(1);
  }

  async clickEditArticleButton() {
    await test.step(`Click 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async clickFollow() {
    await this.followButton.nth(1).click();
  }

  async clickUnfollow() {
    await this.unfollowButton.nth(1).click();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async assertUserFollowed() {
    await test.step(`Assert 'User Followed'`, async () => {
      await expect(this.unfollowButton.nth(1)).toBeVisible();
    });
  }

  async assertUserUnfollowed() {
    await test.step(`Assert 'User Followed'`, async () => {
      await expect(this.followButton.nth(1)).toBeVisible();
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
}
