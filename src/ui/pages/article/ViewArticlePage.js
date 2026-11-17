import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', { level: 1 });
  }

  authorLinkInArticleHeader(username) {
    return this.page.getByRole('link', { name: username }).first();
  }

  editArticleButton() {
    return this.page.getByRole('link', { name: 'Edit Article' }).first();
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton().click();
    });
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
    await test.step(`Assert the article has correct author username`,
       async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  followButton(username) {
    return this.page
      .getByRole('button', { name: new RegExp(`\\bFollow ${username}$`, 'i') })
      .first();
  }

  unfollowButton(username) {
    return this.page
      .getByRole('button', { name: new RegExp(`\\bUnfollow ${username}$`, 'i') })
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

  async assertUnfollowButtonIsVisible(username) {
    await test.step(`Assert the 'Unfollow ${username}' button is visible`,
       async () => {
      await expect(this.unfollowButton(username)).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible(username) {
    await test.step(`Assert the 'Follow ${username}' button is visible`,
       async () => {
      await expect(this.followButton(username)).toBeVisible();
    });
  }

}
