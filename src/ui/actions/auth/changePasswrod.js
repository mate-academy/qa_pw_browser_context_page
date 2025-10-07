import { test } from '@playwright/test';
import { SettingsPage } from '../../pages/auth/SettingsPage';
import { HomePage } from '../../pages/HomePage';

export async function changePassword(page, oldPassword, newPassword) {
  await test.step(`Change user password`, async () => {
    const settingsPage = new SettingsPage(page);
    const homePage = new HomePage(page);

    await settingsPage.open();
    await settingsPage.submitChangePasswordForm(oldPassword, newPassword);

    await homePage.assertYourFeedTabIsVisible();
  });
}
