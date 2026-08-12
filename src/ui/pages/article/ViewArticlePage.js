import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.locator('.banner h1');
    // eslint-disable-next-line max-len
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).first();
  
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
    // eslint-disable-next-line max-len
    await test.step(`Assert the article has correct author username`, async () => {
      await expect(this.authorLinkInArticleHeader(username)).toBeVisible();
    });
  }

  followButton(username) {
  return this.page.locator(`button:has-text("Follow ${username}")`).first();
}

  unfollowButton(username) {
    return this.page.locator(`button:has-text("Unfollow ${username}")`).first();
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

  async assertFollowButtonIsVisible(username) {
    // eslint-disable-next-line max-len
    await test.step(`Assert the 'Follow ${username}' button is visible`, async () => {
      await expect(this.followButton(username)).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible(username) {
    // eslint-disable-next-line max-len
    await test.step(`Assert the 'Unfollow ${username}' button is visible`, async () => {
      await expect(this.unfollowButton(username)).toBeVisible();
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });

  }

  

}