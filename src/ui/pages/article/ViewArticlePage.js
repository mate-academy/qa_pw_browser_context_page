import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteArticleButton = page
      .getByRole('button', { name: ' Favorite Article (0)' })
      .first();
    this.unfavoriteArticleButton = page
      .getByRole('button', { name: ' Unfavorite Article (1)' })
      .first();
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
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
    await test.step('reload', async () => {
      await this.page.reload();
    });
  }

  async editArticleButtonClick() {
    await test.step('Edit article button click', async () => {
      await this.editArticleButton.click();
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
    await test.step(
      `Assert the article has correct author username`, async () => {
        await expect(
          this.page.getByRole('link', { name: username }).first(),
        ).toBeVisible();
      });
  }

  async favoriteArticleButtonClick() {
    await test.step('Click favorite article button', async () => {
      await this.favoriteArticleButton.click();
    });
  }

  async unfavoriteArticleButtonClick() {
    await test.step('Click unfavorite article button', async () => {
      await this.unfavoriteArticleButton.click();
    });
  }

  async followUserButtonClick(username) {
    await test.step('Click follow user button', async () => {
      await this.page
        .getByRole('button', { name: ` Follow ${username}` })
        .first()
        .click();
    });
  }

  async unfollowUserButtonClick(username) {
    await test.step('Click unfollow user button', async () => {
      await this.page
        .getByRole('button', { name: ` Unfollow ${username}` })
        .first()
        .click();
    });
  }
}
