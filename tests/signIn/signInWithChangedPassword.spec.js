import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';

const newPassword = 'newPassword123';

test.beforeEach(async ({ page1, user1 }) => {
  const homePage = new HomePage(page1);
  const settingsPage = new SettingsPage(page1);

  await signUpUser(page1, user1);

  await homePage.clickSettingsLink();
  await settingsPage.fillNewPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();
});

test('User can sign in with changed password', async ({ page2, user1 }) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
