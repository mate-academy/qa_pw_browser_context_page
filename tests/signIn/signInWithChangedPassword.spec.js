import { test } from '../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/auth/SettingsPage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);
});

test('Sign in with changed in profile password', async ({
  page1,
  logger,
  user,
  page2,
}) => {
  const homePage = new HomePage(page1);
  const settingsPage = new SettingsPage(page1);
  const homePage2 = new HomePage(page2);
  const signInPage = new SignInPage(page2);

  await homePage.clickSettingsLink();
  await expect(page1).toHaveURL(/\/settings$/);
  const newPassword = generateNewUserData(logger).password;
  await settingsPage.fillNewPassword(newPassword);
  await settingsPage.clickUpdateSettingsButton();
  await expect(page1).toHaveURL(
    new RegExp(`/profile/${user.username.toLowerCase()}$`),
  );
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await homePage2.assertYourFeedTabIsVisible();
  await homePage2.assertUserIsLoggedIn(user.username);
});
