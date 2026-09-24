/* eslint-disable max-len */
import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.favoritePostsTab = page.getByRole('link', { name: 'Favorited Posts' });

  }

  userProfilePageName(username) {
    return this.page.locator('.user-info').getByRole('heading', { name: username });
  }

  async goToFavoritePosts() {
    await test.step(`Click Favorite Posts tab`, async () => {
      await this.favoritePostsTab.click();
    });
  }

  async assertProfileIsVisible(username) {
    await test.step(`Assert profile page is opened for ${username}`, async () => {
      await expect(this.page).toHaveURL(`/profile/${username}`);
      await expect(this.userProfilePageName(username)).toBeVisible();
    })
  }

  async assertFavoritePostsTabIsSelected() {
    await test.step(`Assert "Favorite Posts' tab is selected`, async () => {
      await expect(this.favoritePostsTab).toHaveClass(/active/);
    });
  }
}