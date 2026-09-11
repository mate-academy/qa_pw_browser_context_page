import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleMeta = page.locator('.article-meta').first();
    this.editArticleLink = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.favoriteArticleButton = this.articleMeta.getByRole('button', {
      name: /Favorite/i,
    });
    this.followUserButton = this.articleMeta.getByRole('button', {
      name: /Follow|Unfollow/i,
    });
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
      await expect(
        this.page.getByRole('heading', { name: title }).first(),
      ).toBeVisible();
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

  async clickEditArticleButton() {
    await test.step(`Click 'Edit Article' button`, async () => {
      await this.editArticleLink.click();
    });
  }

  async clickFavoriteArticleButton() {
    await test.step(`Click 'Favorite Article' button`, async () => {
      await this.favoriteArticleButton.click();
    });
  }

  async assertArticleIsFavorited() {
    await test.step(`Assert article is favorited`, async () => {
      await expect(this.favoriteArticleButton).toContainText(
        'Unfavorite Article',
      );
    });
  }

  async assertArticleIsNotFavorited() {
    await test.step(`Assert article is not favorited`, async () => {
      await expect(this.favoriteArticleButton).toContainText(
        'Favorite Article',
      );
    });
  }

  async clickFollowUserButton() {
    await test.step(`Click 'Follow User' button`, async () => {
      await this.followUserButton.click();
    });
  }
}
