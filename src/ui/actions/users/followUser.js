import { test } from '@playwright/test';
import { ProfilePage } from '../../pages/auth/ProfilePage';

export async function followUser(page, username) {
  await test.step(`Follow user: ${username}`, async () => {
    const profilePage = new ProfilePage(page);

    await profilePage.open(username);
    await profilePage.clickFollowButton();
    await profilePage.assertFollowingState(true);
  });
}
