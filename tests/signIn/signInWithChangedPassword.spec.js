import { faker } from '@faker-js/faker';
import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { SettingsPage } from '../../src/ui/pages/settings/SettingsPage';
import { HomePage } from '../../src/ui/pages/HomePage';

let newPassword;

test.beforeEach(async ({ page1, user }) => {
  const settingsPage = new SettingsPage(page1);
  newPassword = faker.internet.password();

  await signUpUser(page1, user);

  await settingsPage.open();
  await settingsPage.assertEmailFieldHasValue(user.email);
  await settingsPage.fillNewPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();
});

test('Sign in with the password changed in profile settings', async ({
  page2, user 
}) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});