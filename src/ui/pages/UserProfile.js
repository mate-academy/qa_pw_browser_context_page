import { expect, test } from '@playwright/test';

export class UserProfile {
  constructor(page) {
    this.page = page;
    this.profileButton = page.getByRole('link', { name: 'your profile image' });
    this.favoritePostsButton = page.getByRole('link', {
      name: 'Favorited Posts',
    });
    this.emptyFavoriteList = page.getByText('No articles are here... yet.');
    this.editProfileButton = page.getByRole('link', {
      name: ' Edit Profile Settings',
    });
    this.newPasswordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async reload() {
    await test.step('reload', async () => {
      await this.page.reload();
    });
  }
  async logout() {
    await test.step('logout', async () => {
      await this.page
        .getByRole('button', { name: 'Or click here to logout.' })
        .click();
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
  async editProfileButtonClick() {
    await test.step('Click edit profile button', async () => {
      await this.editProfileButton.click();
    });
  }
  async updateSettingsButtonClick() {
    await test.step('Click update settings button', async () => {
      await this.updateSettingsButton.click();
    });
  }

  async fillNewPasswordField(password) {
    await test.step(`Fill the 'New Password' field`, async () => {
      await this.newPasswordField.fill(password);
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
