import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followAuthorButton = page.getByRole('button').filter({hasText: 'Follow' }).first();
    this.unfollowAuthorButton = page.getByRole('button').filter({hasText: 'Unfollow' }).first(); 
    this.editArticleButton = page.getByText('Edit Article').first();
  }

  async clickEditArticleButton() {
    await test.step(`Click on 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertAuthorIsUnfollowed(username) {
    await test.step(`Assert the author: ${username} is unfollowed`, async () => {
      await this._assertFollowAuthorButtonContainText('Follow');
      await this._assertFollowAuthorButtonContainText(username.toLowerCase());
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click on 'Unfollow' button`, async () => {
      await this.unfollowAuthorButton.click();
    });
  }

  async assertAuthorIsFollowed(username) {
    await test.step(`Assert the author: ${username} is followed`, async () => {
      await this._assertFollowAuthorButtonContainText('Unfollow');
      await this._assertFollowAuthorButtonContainText(username.toLowerCase());
    });
  }

  async _assertFollowAuthorButtonContainText(text) {
    await expect(this.followAuthorButton).toContainText(text);
  }

  async clickFollowButton() {
    await test.step(`Click on 'Follow' button`, async () => {
      await this.followAuthorButton.click();
    });
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
