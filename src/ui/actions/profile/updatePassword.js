import { SettingsPage } from '../../pages/SettingsPage';
import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function updatePassword(page, newUserPassword) {
  await test.step(`Update password`, async () => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.clickMyProfileLink();
    await settingsPage.clickEditProfileSettingsButton();
    await settingsPage.fillNewPasswordField(newUserPassword);
    await settingsPage.clickUpdateSettingsButton();
    await settingsPage.clickEditProfileSettingsButton();
    await settingsPage.clickLogoutButton();
  });
}