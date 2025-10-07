import { test } from '@playwright/test';
import { SettingsPage } from '../../pages/auth/SettingsPage';
import { HomePage } from '../../pages/HomePage';

export async function changePassword(page, newPassword) {
  await test.step(`Change user password`, async () => {
    const settingsPage = new SettingsPage(page);
    const homePage = new HomePage(page);

    await settingsPage.open();
    await settingsPage.submitChangePasswordForm(newPassword);

    await homePage.assertYourFeedTabIsVisible();
  });
}
