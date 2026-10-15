import { expect, test } from '@playwright/test';

export class UserProfile {
  constructor(page) {
    this.page = page;
    this.profileButton = page.getByRole('link', { name: 'your profile image' });
    this.favoritePostsButton = page.getByRole('link', {
      name: 'Favorited Posts',
    });
    this.emptyFavoriteList = page.getByText('No articles are here... yet.');
  }

  async reload() {
    await test.step('reload', async () => {
      await this.page.reload();
    });
  }

  async profileButtonClick() {
    await test.step('Click profile', async () => {
      await this.profileButton.click();
    });
  }
  async favoritePostsButtonClick() {
    await test.step('Click favorited posts button', async () => {
      await this.favoritePostsButton.click();
    });
  }

  async assertFavoritedPostIsVisible(title) {
    await test.step('Assert favorited post is visible', async () => {
      await expect(
        this.page.getByRole('link', { name: `Article title: ${title}` }),
      ).toBeVisible();
    });
  }

  async assertFavoritedPostsListAreEmpty() {
    await test.step('Assert favorite posts list are empty', async () => {
      await expect(this.emptyFavoriteList).toBeVisible();
    });
  }
}
