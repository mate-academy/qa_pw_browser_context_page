import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.favoriteButton = page.locator('//*[@id="__next"]/div/div[1]/div/div/span/button[2]');
    this.followButton = page.locator('//*[@id="__next"]/div/div[1]/div/div/span/button[1]');
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

  async addArticleToFavorites() {
    await test.step(`Add the article to favorites`, async () => {
      await this.favoriteButton.click();
    }); 
}

 async addAndDeleteArticleToFavorites() {
    await test.step(`Add and delete the article from favorites`, async () => {
      await this.favoriteButton.click();
      await this.favoriteButton.click();
    }); 
}

async followArticleAuthor() {
    await test.step(`Follow the article author`, async () => {
      await this.followButton.click();
    });
  }

  async unfollowArticleAuthor() {
    await test.step(`Unfollow the article author`, async () => {
    await this.followButton.click();
    await this.followButton.click();
    });
  }
}