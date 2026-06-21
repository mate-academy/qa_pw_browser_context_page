import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteButton = page
      .getByRole('button', { name: 'Favorite Article (0)' })
      .first();
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
    await test.step(`Assert article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async clickFavoriteButton() {
    await test.step(`Click the 'Favorite Article' button`, async () => {
      await this.favoriteButton.click();
    });
  }

  async clickUnfavoriteButton() {
    await test.step(`Click the 'Unfavorite Article' button`, async () => {
      const unfavoriteButton = this.page
        .getByRole('button', { name: 'Unfavorite Article (1)' })
        .first();
      await unfavoriteButton.click();
    });
  }

  async assertArticleIsFavorited() {
    await test.step(`Assert the article is favorited`, async () => {
      const unfavoriteButton = this.page
        .getByRole('button', { name: 'Unfavorite Article (1)' })
        .first();
      await expect(unfavoriteButton).toBeVisible();
    });
  }

  async assertArticleIsNotFavorited() {
    await test.step(`Assert the article is not favorited`, async () => {
      const favoriteButton = this.page
        .getByRole('button', { name: 'Favorite Article (0)' })
        .first();
      await expect(favoriteButton).toBeVisible();
    });
  }
}
