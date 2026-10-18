import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button', { name: /^\W*Follow\s+\S+/ });
    this.unfollowButton = page.getByRole('button', { name: /^\W*Unfollow\s+\S+/ });
  }

  async open(username) {
    await test.step(`Open the profile page for ${username}`, async () => {
      await this.page.goto(`/profile/${username}`);
    });
  }

  async reload() {
    await test.step(`Reload the profile page`, async () => {
      await this.page.reload();
    });
  }

  async clickFollowButton() {
    await test.step(`Click the 'Follow' button`, async () => {
      await this.followButton.click();
    });
  }

  async clickUnfollowButton() {
    await test.step(`Click the 'Unfollow' button`, async () => {
      await this.unfollowButton.click();
    });
  }

  async assertFollowButtonIsVisible() {
    await test.step(`Assert the 'Follow' button is visible`, async () => {
      await expect(this.followButton).toBeVisible();
    });
  }

  async assertUnfollowButtonIsVisible() {
    await test.step(`Assert the 'Unfollow' button is visible`, async () => {
      await expect(this.unfollowButton).toBeVisible();
    });
  }

  async assertFollowButtonChangesToUnfollow() {
    await test.step(`Assert the 'Follow' button changes to 'Unfollow'`, async () => {
      await expect(this.unfollowButton).toContainText(/Unfollow\s+\S+/);
    });
  }

  async assertNicknameTitleIsVisible(username) {
    await test.step(`Assert the nickname title is visible`, async () => {
      await expect(this.page.getByRole('heading', { name: username })).toBeVisible();
    });
  }
}
