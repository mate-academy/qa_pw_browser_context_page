import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  usernameHeader(username) {
    return this.page.getByRole('heading', { name: username });
  }

  followUserButton(username) {
    return this.page.getByRole('button', {
      name: new RegExp(`Follow ${username.toLowerCase()}`),
    });
  }

  unfollowUserButton(username) {
    return this.page.getByRole('button', {
      name: new RegExp(`Unfollow ${username.toLowerCase()}`),
    });
  }

  async assertUsernameIsVisible(username) {
    await test.step(`Assert the '${username}' profile is opened`, async () => {
      await expect(this.usernameHeader(username)).toBeVisible();
    });
  }

  async clickFollowUserButton(username) {
    await test.step(`Click the 'Follow ${username}' button`, async () => {
      await this.followUserButton(username).click();
    });
  }

  async assertUnfollowUserButtonIsVisible(username) {
    await test.step(
      `Assert the 'Unfollow ${username}' button is visible`, 
      async () => {
      await expect(this.unfollowUserButton(username)).toBeVisible();
    });
  }

  async clickUnfollowUserButton(username) {
    await test.step(`Click the 'Unfollow ${username}' button`, async () => {
      await this.unfollowUserButton(username).click();
    });
  }

  async assertFollowUserButtonIsVisible(username) {
    await test.step(
      `Assert the 'Follow ${username}' button is visible`, 
      async () => {
      await expect(this.followUserButton(username)).toBeVisible();
    });
  }
}
