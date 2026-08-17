import { test, expect } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button', { name: /Follow/ }).first();
    this.unfollowButton = page.getByRole('button', { name: /Unfollow/ })
    .first();
  }

  async open(username) {
  await test.step(`Open profile of '${username}'`, async () => {
    await this.page.goto(`/profile/${username.toLowerCase()}`);
  });
}

  async clickFollowButton() {
    await test.step(`Click 'Follow' button`, async () => {
      await this.followButton.first().click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click 'Unfollow' button`, async () => {
      await this.unfollowButton.first().click();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowButton.first()).toBeVisible();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton.first()).toBeVisible();
    });
  }
}
