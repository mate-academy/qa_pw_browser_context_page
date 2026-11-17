import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  followButton(username) {
    return this.page.getByRole('button', {
      name: new RegExp(`\\bFollow ${username}$`, 'i'),
    });
  }

  unfollowButton(username) {
    return this.page.getByRole('button', {
      name: new RegExp(`\\bUnfollow ${username}$`, 'i'),
    });
  }

  async open(username) {
    await test.step(`Open '${username}' profile page`, async () => {
      // the app stores usernames in lower case, so the profile URL is too
      await this.page.goto(`/profile/${username.toLowerCase()}`);
    });
  }

  async clickFollowButton(username) {
    await test.step(`Click the 'Follow ${username}' button`, async () => {
      await this.followButton(username).click();
    });
  }

  async clickUnfollowButton(username) {
    await test.step(`Click the 'Unfollow ${username}' button`, async () => {
      await this.unfollowButton(username).click();
    });
  }

  async assertUnfollowButtonIsVisible(username) {
    await test.step(`Assert the 'Unfollow ${username}' button is visible`,
      async () => {
        await expect(this.unfollowButton(username)).toBeVisible();
      });
  }

  async assertFollowButtonIsVisible(username) {
    await test.step(`Assert the 'Follow ${username}' button is visible`,
      async () => {
        await expect(this.followButton(username)).toBeVisible();
      });
  }
}
