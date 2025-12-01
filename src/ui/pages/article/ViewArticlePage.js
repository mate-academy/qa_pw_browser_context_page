import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('.banner').getByRole('heading');
    this.editArticleLink = page
      .getByRole('link', { name: 'Edit Article' })
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
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async clickFollowUserButton(user) {
    await test.step(`Clcik Follow User Button`, async () => {
      const followButton = this.page
        .getByRole('button', { name: `Follow ${user}` })
        .first();
      await followButton.click();
    });
  }

  async clickUnfollowUserButton(user) {
    await test.step(`Clcik Unfollow User Button`, async () => {
      const unfollowButton = this.page
        .getByRole('button', { name: `Unfollow ${user}` })
        .first();
      await unfollowButton.click();
    });
  }
}
