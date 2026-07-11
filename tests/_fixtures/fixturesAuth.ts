import { test as base, Page } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/auth/SettingsPage';
import { ProfilePage } from '../../src/ui/pages/auth/ProfilePage';

export const test = base.extend<{
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  signInPage2: SignInPage;
  page2: Page;
  homePage: HomePage;
  homePage2: HomePage;
  settingsPage: SettingsPage;
  profilePage: ProfilePage;
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  signInPage2: async ({ page2 }, use) => {
    const signInPage2 = new SignInPage(page2);

    await use(signInPage2);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  homePage2: async ({ page2 }, use) => {
    const homePage2 = new HomePage(page2);

    await use(homePage2);
  },
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);

    await use(settingsPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);

    await use(profilePage);
  },
});
