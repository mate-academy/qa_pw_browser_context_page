import { test } from '@playwright/test';
import { ProfilePage } from '../../pages/profile/ProfilePage';

export async function unfollowUser(page, username) {
  await test.step(`Unfollow user: ${username}`, async () => {
    const profilePage = new ProfilePage(page);

    await profilePage.open(username);
    await profilePage.clickUnfollowButton();
    await profilePage.assertFollowingState(false);
  });
}
