import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article'}).first();
    this.favoriteArticleButton = page.getByRole('button', { name: 'Favorite Article' }).first()
    this.unfavoriteArticleButton = page.getByRole('button', { name: 'Unfavorite Article' }).first()
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username.toLowerCase() }).first();
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

  async clickFollowButton(articleCreator) {
    await test.step(`Click the 'Follow ${articleCreator.toLowerCase()}' button`, async () => {
      const button = this.page.getByRole('button', { name: `Follow ${articleCreator.toLowerCase()}` }).first();

      await button.click();
    });
  }

  async clickUnfollowButton(articleCreator) {
    await test.step(`Click the 'Unfollow ${articleCreator.toLowerCase()}' button`, async () => {
      const button = this.page.getByRole('button', { name: `Unfollow ${articleCreator.toLowerCase()}` }).first();

      await button.click();
    });
  }

  async clickFavoriteArticleButton() {
    await test.step(`Click the 'Favorite Artice' button`, async () => {
      await this.favoriteArticleButton.click();
    });
  }

  async clickUnfavoriteArticleButton() {
    await test.step(`Click the 'Unfavorite Artice' button`, async () => {
      await this.unfavoriteArticleButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }
}
