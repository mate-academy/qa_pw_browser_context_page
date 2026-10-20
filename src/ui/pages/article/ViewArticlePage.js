import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading').first();
    this.followButton = page.getByRole('button', { name: /Follow/i })
    .first();
    this.unfollowButton = page.getByRole('button', { name: /Unfollow/i })
    .first();
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
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

  async clickFollowAuthorButton() {
  await test.step(`Click 'Follow' author button`, async () => {
    await this.followButton.click();
    });
  }

  async clickUnfollowAuthorButton() {
    await test.step(`Click 'Unfollow' author button`, async () => {
      await this.unfollowButton.click();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert 'Follow' button is visible`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowButton).toBeVisible();
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

  async assertArticleIsVisibleInFeed(title) {
    await test.step(`Assert article '${title}' is visible in feed`, 
      async () => {
      await expect(this.page.getByRole('heading', 
        { name: title })).toBeVisible();
    });
  }

  async assertArticleIsNotVisibleInFeed(title) {
    await test.step(`Assert article '${title}' is not visible in feed`,
      async () => {
      await expect(this.page.getByRole('heading', 
        { name: title })).toBeHidden();
      });
    }
}
