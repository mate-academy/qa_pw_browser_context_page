import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading').first();
    this.usernameInArticleInfo = page.locator('.article-meta .info').first();
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { username }).first();
  }

  async clisckAuthorLinkInArticleHeader(username) {
    await this.usernameInArticleInfo.getByRole('link', { username }).click();
  }

  url() {
    return this.page.url();
  }

  async open(url) {
    await test.step(`Open 'View Article' page`, async () => {
      await this.page.goto(url);
    });
  }

  async clickFollowArticle(username) {
    await test.step('follow the article created by another user', async () => {
      await this.page.getByRole('button', {name: username}).first().click();
    });
  }

  async openArticleFromGlobalFeed(title) {
    await test.step('open article from global feed', async () => {
      await this.page.getByRole('heading', { name: title }).click();
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

  async assertUserFollowedTheArticle() {
    await test.step('assert user followed the article', async () => {
      await expect(
        this.page.getByRole('button', { name: /Unfollow/i }).first()
      ).toBeVisible();
    });
  }

  async assertUserUnfollowedTheArticle() {
    await test.step('assert user followed the article', async () => {
      await expect(
        this.page.getByRole('button', { name: /Follow/i }).first()
      ).toBeVisible();
    });
  }
}
