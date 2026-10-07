import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' });
    this.favoriteArticleButton = page.getByRole('button', {
      name: /Favorite Article/,
    });
    this.unfavoriteArticleButton = page.getByRole('button', {
      name: /Unfavorite Article/,
    });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  followAuthorButton(username) {
    return this.page.getByRole('button', {
      name: `Follow ${username}`,
    });
  }

  unfollowAuthorButton(username) {
    return this.page.getByRole('button', {
      name: `Unfollow ${username}`,
    });
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.first().click();
    });
  }

  async clickFavoriteArticleButton() {
    await test.step(`Click the 'Favorite Article' button`, async () => {
      await this.favoriteArticleButton.first().click();
    });
  }

  async clickUnfavoriteArticleButton() {
    await test.step(`Click the 'Unfavorite Article' button`, async () => {
      await this.unfavoriteArticleButton.first().click();
    });
  }

  async clickFollowAuthorButton(username) {
    await test.step(`Click the 'Follow ${username}' button`, async () => {
      await this.followAuthorButton(username).first().click();
    });
  }

  async clickUnfollowAuthorButton(username) {
    await test.step(`Click the 'Unfollow ${username}' button`, async () => {
      await this.unfollowAuthorButton(username).first().click();
    });
  }

  async assertFavoriteArticleButtonIsVisible() {
    await test.step(`Assert the 'Favorite Article' button is visible`,
       async () => {
      await expect(this.favoriteArticleButton.first()).toBeVisible();
    });
  }

  async assertUnfavoriteArticleButtonIsVisible() {
    await test.step(`Assert the 'Unfavorite Article' button is visible`,
       async () => {
      await expect(this.unfavoriteArticleButton.first()).toBeVisible();
    });
  }

  async assertUnfollowAuthorButtonIsVisible(username) {
    await test.step(`Assert the 'Unfollow ${username}' button is visible`,
       async () => {
      await expect(this.unfollowAuthorButton(username).first()).toBeVisible();
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
}
