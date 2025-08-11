/* eslint-disable max-len */
import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleHeader = page.getByRole('heading');
    this.followButton = page.locator('button', { hasText: 'Follow' }).first();
    this.unfollowButton = page.locator('button', { hasText: 'Unfollow' }).first();  
  }

  authorLinkInArticleHeader(username) {
    // Corrected to match by accessible name instead of "username" property
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

  async clickFollowAuthorButton() {
    await test.step(`Click 'Follow Author' button`, async () => {
      await this.followButton.click();
    });
  }

  async assertAuthorIsFollowed() {
    await test.step(`Assert the author is followed`, async () => {
      await expect(this.unfollowButton).toBeVisible();
    });
  }

  async clickUnfollowAuthorButton() {
    await test.step(`Click 'Unfollow Author'`, async () => {
      await this.unfollowButton.click();
    });
  }

  async assertAuthorIsUnfollowed() {
    await test.step(`Assert unfollowed`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }

}