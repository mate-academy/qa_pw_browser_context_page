import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByText('Edit Article').nth(0);
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url, { waitUntil: 'commit' });
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

  async clickEditArticleButton() {
    await test.step('Click edit article button', async () => {
      await this.editArticleButton.click();
    });
  }

  async clickFollowAuthorButton(username) {
    await test.step('Click follow author button', async () => {
      await this.page
        .getByRole('button', { name: `Follow ${username}` })
        .nth(0)
        .click();
    });
  }

  async clickUnfollowAuthorButton(username) {
    await test.step('Click unfollow author button', async () => {
      await this.page
        .getByRole('button', { name: `Unfollow ${username}` })
        .nth(0)
        .click();
    });
  }

  async checkUnfollowButtonVisibleWithUsername(username) {
    await test.step('Check that unfollow button is visible with username', async () => {
      await expect(
        this.page.getByRole('button', { name: `Unfollow ${username}` }).nth(0),
      ).toBeVisible();
    });
  }

  async checkFollowButtonVisibleWithUsername(username) {
    await test.step('Check that follow button is visible with username', async () => {
      await expect(
        this.page.getByRole('button', { name: `Follow ${username}` }).nth(0),
      ).toBeVisible();
    });
  }
}
