import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { updatePassword } from '../../src/ui/actions/auth/updatePassword';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

let signInPage;
let homePage;
let newPassword = 'Qwerty1!';

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  await updatePassword(page1, newPassword);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in` with new password flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
