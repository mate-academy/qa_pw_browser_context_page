import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteArticleButton = page
      .getByRole('button', { name: ' Favorite Article' })
      .nth(1);
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.followUserButton = page
      .getByRole('button', { name: '   Follow ' })
      .first();
    this.unfollowUserButton = page
      .getByRole('button', { name: '   Unfollow ' })
      .first();
  }

  authorLinkInArticleHeader(username) {
    return this.page
      .locator('.banner .article-meta')
      .getByRole('link', { name: username, exact: true });
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickFavoriteArticleButton() {
    await test.step('Click on "Favorite Article" Button', async () => {
      await this.favoriteArticleButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step('Click on "Edit Article" button', async () => {
      await this.editArticleButton.click();
    });
  }

  async clickFollowUserButton() {
    await test.step('Click on "Follow User" button', async () => {
      await this.followUserButton.click();
    });
  }

  async clickUnfollowUserButton() {
    await test.step('Click on "Unfollow User" button', async () => {
      await this.unfollowUserButton.click();
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
