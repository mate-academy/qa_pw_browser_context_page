import { SignUpPage } from '../../pages/auth/SignUpPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { test } from '@playwright/test';

export async function updatePassword(page, newPassword) {
  await test.step(`Update user password`, async () => {
    const signUpPage = new SignUpPage(page);
    const profilePage = new ProfilePage(page);

    await profilePage.clickSettingsButton();
    await signUpPage.fillPasswordField(newPassword);
    await profilePage.clickUpdateProfileButton();
  });
}
