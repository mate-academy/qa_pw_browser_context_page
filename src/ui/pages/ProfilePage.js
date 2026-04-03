import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.myPostsTab = page.getByRole('link', { name: 'My Posts' });
    this.favoritedPostsTab = page.getByRole('link', { name: 'Favorited Posts' });
    this.followButton = page.getByRole('button', { name: /Follow/ });
    this.unfollowButton = page.getByRole('button', { name: /Unfollow/ });
  }

  async open(username) {
    await test.step(`Open 'Profile' page`, async () => {
      await this.page.goto(`/profile/${username.toLowerCase()}`, { waitUntil: 'domcontentloaded' });
    });
  }

  async clickMyPostsTab() {
    await test.step(`Click the 'My Posts' tab`, async () => {
      await this.myPostsTab.click();
    });
  }

  async clickFavoritedPostsTab() {
    await test.step(`Click the 'Favorited Posts' tab`, async () => {
      await this.favoritedPostsTab.click();
    });
  }

  getArticleBlock(articleTitle) {
    return this.page.locator('.article-preview', { hasText: articleTitle });
  }

  getTag(articleTitle, tagName) {
    return this.getArticleBlock(articleTitle).locator('.tag-default', { hasText: tagName });
  }
  async clickLikeButton(articleTitle) {
    await test.step(`Click the 'Like' button`, async () => {
      await this.getArticleBlock(articleTitle).locator('button').click();
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.click();
    });
  }
  async clickUnfollowButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.unfollowButton.click();
    });
  }
  async assertMyPostsTabIsVisible() {
    await test.step(`Assert the 'My Posts' tab is visible`, async () => {
      await expect(this.myPostsTab).toBeVisible();
    });
  }

  async assertFavoritedPostsTabIsVisible() {
    await test.step(`Assert the 'Favorited Posts' tab is visible`, async () => {
      await expect(this.favoritedPostsTab).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(
        this.getArticleBlock(title).locator('h1')
      ).toContainText(title);
    });
  }

  async assertArticleDescriptionIsVisible(title, description) {
    await test.step(`Assert the article has correct description`, async () => {
      await expect(
        this.getArticleBlock(title).locator('p')
      ).toContainText(description);
    });
  }

  async assertArticleAuthorNameIsVisible(title, username) {
    await test.step(`Assert the article has correct author`, async () => {
      await expect(
        this.getArticleBlock(title).locator('.author')
      ).toContainText(username.toLowerCase());
    });
  }

  async assertArticleTagIsVisible(title, tagName) {
    await test.step(`Assert the article has correct tag`, async () => {
      await expect(this.getTag(title, tagName)).toBeVisible();
    });
  }

  async assertArticleBlockIsHidden(title) {
    await test.step(`Assert the article is hidden`, async () => {
      await expect(this.getArticleBlock(title)).toBeHidden();
    });
  }
}
