import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.followButton = page.getByRole('button', { name: /follow/i });
  }

  async open(username) {
    await test.step(`Open profile page of ${username}`, async () => {
      await this.page.goto(`/#/@${username}`);
      await expect(this.page).toHaveURL(`/#/@${username}`);
    });
  }

  async clickFollowButton() {
    await test.step('Click Follow button', async () => {
      await this.followButton.click();
    });
  }

  async clickUnfollowButton() {
    await test.step('Click Unfollow button', async () => {
      await this.followButton.click();
    });
  }

  async assertFollowingState(isFollowing) {
    await test.step(`Assert following state: ${isFollowing}`, async () => {
      const buttonText = await this.followButton.textContent();
      if (isFollowing) {
        expect(buttonText).toMatch(/unfollow/i);
      } else {
        expect(buttonText).toMatch(/follow/i);
      }
    });
  }
}
