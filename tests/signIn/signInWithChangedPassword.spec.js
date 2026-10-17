import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Sign in with changed in profile password', async ({
  userProfile,
  user2,
  user,
}) => {
  await userProfile.profileButtonClick();
  await userProfile.editProfileButtonClick();
  await userProfile.fillNewPasswordField(user2.password);
  await userProfile.updateSettingsButtonClick();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
