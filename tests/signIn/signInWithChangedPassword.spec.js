import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);
});

test('User can sign in with changed in profile password', async ({
  page1,
  page2,
  user,
  profilePage,
}) => {
  const newPassword = 'NewPassword123!';

  await profilePage.open();
  await profilePage.fillNewPasswordField(newPassword);
  await profilePage.clickUpdateSettingsButton();

  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
