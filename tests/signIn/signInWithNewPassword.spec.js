import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { faker } from '@faker-js/faker';

let signInPage;
let homePage;
let settingsPage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);
  settingsPage = new SettingsPage(page1);
  user.newPassword = faker.internet.password();
  await settingsPage.open();
  await settingsPage.fillNewPasswordField(user.newPassword);
  await settingsPage.clickUpdateSettingsButton();

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('User can sign in with new password', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

