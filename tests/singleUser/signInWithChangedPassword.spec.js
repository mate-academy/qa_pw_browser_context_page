import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { changePassword } from '../../src/ui/actions/auth/changePasswrod';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

test('User can sign in with changed password', async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  const newPassword = 'newPass123!';
  await changePassword(page1, user.password, newPassword);

  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
