import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.followArticleButton = page.getByRole('button', {name: 'Favorite Article', exact : true}).nth(0);
    this.unfollowArticleButton = page.getByRole('button', {name: 'Unfavorite Article', exact : true}).nth(0);
    this.editArticleButton = page
    .getByRole('link', { name: 'Edit Article' }).nth(0);
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

  async followArticle() {
    await test.step(`Follow the article`, async() => {
      await this.followArticleButton.click();
    });
  }

  async assertUnfavoriteArticleIsVisible() {
    await test.step(`'Unfavorite Article' button is visible`, async() => {
      await expect(this.unfollowArticleButton).toBeVisible();
    });
  }
  
  async unfollowArticle() {
    await test.step(`Unfollow the article`, async() => {
      await this.unfollowArticleButton.click();
    })
  }

  async assertFavoriteArticleIsVisible() {
    await test.step(`'Favorite Article' button is visible`, async() => {
      await expect(this.followArticleButton).toBeVisible();
    });
  }

  async openEditArticlePage() {
    await test.step(`Open 'Edit Article' page`, async() => {
      await this.editArticleButton.click();
    })
  }
}
