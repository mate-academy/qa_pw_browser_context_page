import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
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

  followAuthorButton(username) {
    return this.page
      .getByRole('button', {
        name: new RegExp(`Follow ${username.toLowerCase()}`),
      })
      .first();
  }

  unfollowAuthorButton(username) {
    return this.page
      .getByRole('button', {
        name: new RegExp(`Unfollow ${username.toLowerCase()}`),
      })
      .first();
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
    await test.step(
      `Assert the article has correct author username`, 
      async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  async clickFollowAuthorButton(username) {
    await test.step(`Click the 'Follow ${username}' button`, async () => {
      await this.followAuthorButton(username).click();
    });
  }

  async assertUnfollowAuthorButtonIsVisible(username) {
    await test.step(
      `Assert the 'Unfollow ${username}' button is visible`, 
      async () => {
      await expect(this.unfollowAuthorButton(username)).toBeVisible();
    });
  }

  async clickUnfollowAuthorButton(username) {
    await test.step(`Click the 'Unfollow ${username}' button`, async () => {
      await this.unfollowAuthorButton(username).click();
    });
  }

  async assertFollowAuthorButtonIsVisible(username) {
    await test.step(
      `Assert the 'Follow ${username}' button is visible`, 
      async () => {
      await expect(this.followAuthorButton(username)).toBeVisible();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async clickAuthorLinkInArticleHeader(username) {
    await test.step(`Click the author '${username}' link`, async () => {
      await this.authorLinkInArticleHeader(username).click();
    });
  }
}
