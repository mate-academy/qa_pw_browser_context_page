import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteButton = page.getByRole('button').filter({ hasText: /Favorite|Unfavorite/ });
    this.followButton = page.getByRole('button').filter({ hasText: /Follow|Unfollow/ });
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' });
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

  async clickFavoriteButton() {
    await test.step(`Click the 'Favorite' button`, async () => {
      await this.favoriteButton.first().click();
    });
  }

  async clickUnfavoriteButton() {
    await test.step(`Click the 'Unfavorite' button`, async () => {
      await this.favoriteButton.first().click();
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.first().click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.followButton.first().click();
    });
  }

  async clickAuthorLink(username) {
    await test.step(`Click the author link for '${username}'`, async () => {
      await this.authorLinkInArticleHeader(username).click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.first().click();
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

  async assertFavoriteButtonIsVisible() {
    await test.step(`Assert the 'Favorite' button is visible`, async () => {
      await expect(this.favoriteButton.first()).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton.first()).toBeVisible();
    });
  }
}
