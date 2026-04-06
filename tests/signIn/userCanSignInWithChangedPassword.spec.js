import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user1, user2 }) => {
  const homePage = new HomePage(page1);

  await signUpUser(page1, user1);
  await homePage.goToProfileSettings();
  await homePage.fillNewPasswordField(user2.password);
  await homePage.clickUpdateSettingsButton();
});

test('User can sign in with changed password', async ({
  page2,
  user1,
  user2,
}) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
