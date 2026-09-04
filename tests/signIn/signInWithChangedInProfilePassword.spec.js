import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';

let signInPage2;
let homePage2;
let newPassword;

test.beforeEach(async ({ page1, page2, user }) => {
  const homePage1 = new HomePage(page1);
  const settingsPage = new SettingsPage(page1);
  newPassword = faker.internet.password();

  await signUpUser(page1, user);
  await homePage1.clickOnSettingsLink();
  await settingsPage.fillNewPassword(newPassword);
  await settingsPage.clickOnUpdateSettingsButton();

  signInPage2 = new SignInPage(page2);
  homePage2 = new HomePage(page2);
});

test('User can sign in with changed in profile password', async ({ user }) => {
  await signInPage2.open();
  await signInPage2.fillEmailField(user.email);
  await signInPage2.fillPasswordField(newPassword);
  await signInPage2.clickSignInButton();

  await homePage2.assertYourFeedTabIsVisible();
});
