import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../src/ui/constants/authErrorMessages';

test.beforeEach(async ({ page1, user1 }) => {
  await signUpUser(page1, user1);
});

test('Sign in with changed in profile password', async ({
  page1,
  page2,
  user1,
  newPassword,
}) => {
  const settingsPage = new SettingsPage(page1);
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  const oldPassword = user1.password;
  const newUserPassword = newPassword.password;

  await settingsPage.open(user1.username);
  await settingsPage.assertProfileNameTitle(user1.username);
  await settingsPage.clickEditProfileButton();
  await settingsPage.assertProfileTitleIsVisible();
  await settingsPage.fillNewPasswordField(newUserPassword);
  await settingsPage.clickUpdateSettingsButton();

  await signInPage.open(user1.username);
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(oldPassword);
  await signInPage.clickSignInButton();
  await signInPage.assertErrorMessageContainsText(
    INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  );

  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(newUserPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
