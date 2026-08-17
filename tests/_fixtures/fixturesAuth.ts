import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ProfilePage } from '../../src/ui/pages/profile/ProfilePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';

export const test = base.extend<{
  signUpPage;
  signInPage;
  homePage;
  profilePage;
  settingsPage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);

    await use(profilePage);
  },

  settingsPage: async ({ page }, use) => {
  const settingsPage = new SettingsPage(page);

  await use(settingsPage);
}
});
