import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editButton = page.getByRole('link', { name: 'Edit Article' }).first();
    this.homeLink = page.getByRole('link', { name: 'Home' });
  }

  async clickEditButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editButton.click();
    });
  }

  async clickHomeLink() {
    await test.step(`Click the 'Home' link`, async () => {
      await this.homeLink.click();
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

  followButton(username) {
    return this.page
      .getByRole('button', { name: `Follow ${username}` })
      .first();
  }

  unfollowButton(username) {
    return this.page
      .getByRole('button', { name: `Unfollow ${username}` })
      .first();
  }

  async clickFollowButton(username) {
    await test.step(`Click the 'Follow ${username}' button`, async () => {
      await this.followButton(username).click();
    });
  }

  async clickUnfollowButton(username) {
    await test.step(`Click the 'Unfollow ${username}' button`, async () => {
      await this.unfollowButton(username).click();
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

  async assertArticleTagsAreVisible(tags) {
    for (const tag of tags) {
      await test.step(
        `Assert the article tag "${tag}" is visible`,
        async () => {
        await expect(this.page.getByText(tag)).toBeVisible();
      });
    }
  }

  async assertArticleAuthorNameIsVisible(username) {
    await test.step(
      `Assert the article has correct author ${username}`,
      async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible(username) {
    await test.step(
      `Assert the 'Follow ${username}' button is visible`,
      async () => {
      await expect(this.followButton(username)).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible(username) {
    await test.step(
      `Assert the 'Unfollow ${username}' button is visible`,
      async () => {
      await expect(this.unfollowButton(username)).toBeVisible();
    });
  }
}
