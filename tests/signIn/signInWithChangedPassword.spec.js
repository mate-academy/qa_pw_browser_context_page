import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../src/ui/pages/HomePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/profile/SettingsPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';

let newPassword;

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);

  const homePage = new HomePage(page1);

  await homePage.clickSettingsPageLink();

  newPassword = faker.internet.password();
  const settingsPage = new SettingsPage(page1);

  await settingsPage.changePassword(newPassword);
  await settingsPage.clickUpdateSettingsButton();
});

test('User can sign in with changed in profile password', async ({
  page2,
  user,
}) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});
