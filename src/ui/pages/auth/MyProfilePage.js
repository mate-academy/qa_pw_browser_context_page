import { expect, test } from '@playwright/test';

export class MyProfilePage {
  constructor(page, user) {
    this.page = page;
    this.myProfileButton = page.getByRole('link', {
      name: `your profile image ${user.username}`,
    });
    this.favoritedPostsButton = page.getByRole('link', {
      name: 'Favorited Posts',
    });
    this.unfollowButton = page.getByRole('button', { name: '' });
  }

  async clickMyProfileButton() {
    await test.step(`Click on "My Profile" button`, async () => {
      await this.myProfileButton.click();
    });
  }

  async clickFavoritedPostsButton() {
    await test.step('Click on the "Favorited Posts" button', async () => {
      await this.favoritedPostsButton.click();
    });
  }

  async clickUnfollowButton() {
    await test.step('Click on the "Heart" button to unfollow', async () => {
      await this.unfollowButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      const articleTitle = this.page.getByRole('link', {
        name: title,
      });

      await expect(articleTitle).toContainText(title);
    });
  }

  async assertArticleTitleIsNotVisible(title) {
    await test.step(`Assert the article is Not visible`, async () => {
      const articleTitle = this.page.getByRole('link', { name: title });
      await expect(articleTitle).toBeHidden();
    });
  }
}
