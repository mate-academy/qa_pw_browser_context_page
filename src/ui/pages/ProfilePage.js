import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button').filter({ hasText: /Follow|Unfollow/ });
    this.editProfileButton = page.getByRole('link', { name: 'Edit Profile Settings' });
  }

  async open(username) {
    await test.step(`Open profile page for '${username}'`, async () => {
      await this.page.goto(`/profile/${username}`);
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.first().click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.followButton.first().click();
    });
  }

  async clickEditProfileButton() {
    await test.step(`Click the 'Edit Profile Settings' button`, async () => {
      await this.editProfileButton.click();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton.first()).toBeVisible();
    });
  }

  async assertFollowButtonContainsText(text) {
    await test.step(`Assert the 'Follow' button contains text '${text}'`, async () => {
      await expect(this.followButton.first()).toContainText(text);
    });
  }
}
