import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteBtn = page.getByRole('button',
      {
        name: /Favorite Article'/
      }).first();
    this.unfavoriteBtn = page.getByRole('button',
      {
        name: /Unfavorite Article/
      }).first();
    this.followBtn = page.getByRole('button',
      {
        name: /Follow/
      }).first();
    this.unfollowBtn = page.getByRole('button',
      {
        name: /Unfollow/
      }).first();
    this.editBtn = page.getByRole('link', { name: 'Edit Article' }).first();
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

  async clickOnFavoriteBtn() {
    await test.step(`Click on the Favorite button`, async () => {
      await this.favoriteBtn.click();
    });
  }

  async clickOnUnfavoriteBtn() {
    await test.step(`Click on the Unfavorite button`, async () => {
      await this.unfavoriteBtn.click();
    });
  }

  async clickOnFollowBtn() {
    await test.step(`Click on the Follow button`, async () => {
      await this.followBtn.click();
    });
  }

  async clickOnUnfollowBtn() {
    await test.step(`Click on the Unfollow button`, async () => {
      await this.unfollowBtn.click();
    });
  }

  async clickOnEditBtn() {
    await test.step(`Click on the Edit button`, async () => {
      await this.editBtn.click();
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

  async assertFavoriteBtnIsVisible() {
    await test.step(`Assert the Favorite button is visible`, async () => {
      await expect(this.favoriteBtn).toBeVisible();
    });
  }

  async assertUnfavoriteBtnIsVisible() {
    await test.step(`Assert the Unfavorite button is visible`, async () => {
      await expect(this.unfavoriteBtn).toBeVisible();
    });
  }

  async assertFollowBtnIsVisible() {
    await test.step(`Assert the Follow button is visible`, async () => {
      await expect(this.followBtn).toBeVisible();
    });
  }

  async assertUnfollowBtnIsVisible() {
    await test.step(`Assert the Unfollow button is visible`, async () => {
      await expect(this.unfollowBtn).toBeVisible();
    });
  }
}
