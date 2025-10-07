import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button', { name: /Follow/ });
  }

  async open(username) {
    await test.step(`Open profile of ${username}`, async () => {
      await this.page.goto(`/@${username}`);
    });
  }

  async clickFollowButton() {
    await test.step('Click follow button', async () => {
      await this.followButton.click();
    });
  }

  async clickUnfollowButton() {
    await test.step('Click unfollow button', async () => {
      await this.followButton.click();
    });
  }

  async assertFollowingState(expectedState) {
    await test.step(`Assert following state is ${expectedState}`, async () => {
      if (expectedState) {
        await expect(this.followButton).toHaveText(/Unfollow/);
      } else {
        await expect(this.followButton).toHaveText(/Follow/);
      }
    });
  }
}
