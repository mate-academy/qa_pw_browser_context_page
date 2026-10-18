import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteArticleButtonTop = page.getByRole('button', { name: 'Favorite Article' }).nth(0);
    this.favoriteArticleButtonBottom = page.getByRole('button', { name: 'Favorite Article' }).nth(1);
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

  async reload() {
    await test.step(`Reload 'View Article' page`, async () => {
      await this.page.reload();
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

  async assertButtonIsVisible(button) {
    await expect(button).toBeVisible();
  }

  async assertFavoriteArticleButtonTopIsVisible() {
    await test.step(`Assert the top favorite article button is visible`, async () => {
      await this.assertButtonIsVisible(this.favoriteArticleButtonTop);
    });
  }

  async assertFavoriteArticleButtonBottomIsVisible() {
    await test.step(`Assert the bottom favorite article button is visible`, async () => {
      await this.assertButtonIsVisible(this.favoriteArticleButtonBottom);
    });
  }

  async clickFavoriteArticleButton(button, text) {
    await test.step(`Click the ${text} button`, async () => {
      await button.click();
    });
  }

  async assertFavoriteArticleButtonChangesToUnfavoriteWhenClicked(button) {
    await test.step(`Assert the favorite article button changes to unfavorite when clicked`, async () => {
      await expect(button).toHaveText(/^\s*Unfavorite Article\s+\(\d+\)\s*$/);
    });
  }

  async assertUnfavoriteArticleButtonChangesToFavoriteWhenClicked(button) {
    await test.step(`Assert the unfavorite article button changes to favorite when clicked`, async () => {
      await expect(button).toHaveText(/^\s*Favorite Article\s+\(\d+\)\s*$/);
    });
  }

  favoriteCounter(button) {
    return button.locator('span.counter');
  }
  
  async getFavoritesCount(button) {
    const text = await this.favoriteCounter(button).innerText();
    return Number(text.replace(/\D/g, ''));
  }
  
  async assertFavoritesCount(button, expected) {
    await test.step(`Assert favorites count is ${expected}`, async () => {
      await expect(this.favoriteCounter(button)).toHaveText(`(${expected})`);
    });
  }
}
