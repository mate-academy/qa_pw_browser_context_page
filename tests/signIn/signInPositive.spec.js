import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { signInUser } from '../../src/ui/actions/auth/signInUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';

test.beforeEach(async ({ signUpPage, homePage, user }) => {
  await signUpUser(signUpPage, homePage, user);
});

test('Successful `Sign in` flow test', async ({ signInPage, user }) => {
  await signInUser(signInPage, user);
});

test('User can sign in with changed in profile password.', async ({
  settingsPage,
  user,
  page2,
  profilePage,
}) => {
  const newPassword = user.password + '1';
  await settingsPage.open();
  await settingsPage.fillPasswordField(newPassword);
  await settingsPage.clickUpdateButton();

  await test.step(`Sign in with new password in new tab`, async () => {
  const newSignInPage = new SignInPage(page2);
    await signInUser(newSignInPage, { email: user.email, password: newPassword });
  });
  await profilePage.assertNicknameTitleIsVisible(user.username);
});
