import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/auth/SettingsPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

test('Sign in with changed profile password', async ({
  page1,
  page2,
  user,
}) => {
  const settingsPage = new SettingsPage(page1);
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signUpUser(page1, user);

  const newPassword = 'NewPassword123!';

  await settingsPage.open();
  await settingsPage.changePassword(newPassword);

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
