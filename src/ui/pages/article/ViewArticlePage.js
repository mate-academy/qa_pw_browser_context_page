import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
    this.logoLink = page.getByRole('navigation').getByRole('link', {
      name: 'conduit',
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
    // eslint-disable-next-line max-len
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  findFollowButton(username) {
    return this.page
      .getByRole('button', { name: `Follow ${username}` })
      .first();
  }

  findUnfollowButton(username) {
    return this.page
      .getByRole('button', { name: `Unfollow ${username}` })
      .first();
  }

  async clickFollowAuthorButton(username) {
    await test.step(`Click on the 'Follow' button`, async () => {
      await this.findFollowButton(username).click();
    });
  }
  async clickUnfollowAuthorButton(username) {
    await test.step(`Click on the 'Unfollow' button`, async () => {
      await this.findUnfollowButton(username).click();
    });
  }

  async assertAuthorIsFollowed(username) {
    await test.step(`Assert the follow on the Author`, async () => {
      await expect(this.findUnfollowButton(username)).toBeVisible();
    });
  }

  async assertAuthorIsUnfollowed(username) {
    await test.step(`Assert the unfollow on the Author`, async () => {
      await expect(this.findFollowButton(username)).toBeVisible();
    });
  }
  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickLogoLing() {
    await test.step(`Click on the 'Logo' link`, async () => {
      await this.logoLink.click();
    });
  }
}
