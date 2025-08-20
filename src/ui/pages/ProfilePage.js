import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.favoritedPostsTab = page.getByRole('link', { name: 'Favorited Posts' });
    this.emptyFavoritedPostsTabMessage = page.getByText('No articles are here... yet.');
  }

  async clickFavoritedPostsTab() {
    await test.step(`Click the 'Favorited Posts' tab`, async () => {
      await this.favoritedPostsTab.click();
    });
  }

  async assertArticleOnFavoritedPostsTabIsVisible(articleTitle, articleCreator) {
    const article = this.page.getByText(articleTitle);
    const creator = this.page.getByRole('link', { name: articleCreator }).first();

    await test.step(`Assert the '${articleTitle}' article is visible`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        await this.clickFavoritedPostsTab()
        return await article.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(creator).toBeVisible();
      await expect(article).toBeVisible();
    });
  }

  async assertFavoritedlPostsTabIsEmpty() {
    await test.step(`Assert the 'Favorited Posts' tab is empty`, async () => {
      await expect.poll(async () => {
        await this.page.reload();
        return await this.emptyFavoritedPostsTabMessage.isVisible();
      }, {
        timeout: 15000,
        intervals: [500, 1000, 2000],
      }).toBe(true);
      await expect(this.emptyFavoritedPostsTabMessage).toBeVisible();
    });
  }
}