import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { Settings } from '../../src/ui/pages/Settings';

let signInPage;
let homePage;
let settingsPage;
let homePageOnFirstContext;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
  settingsPage = new Settings(page1);
  homePageOnFirstContext = new HomePage(page1);
});

test('User can sign in with changed in profile password', async ({ user }) => {
  const changedPassword = 'NewPassword123!';

  await homePageOnFirstContext.goToSettings();
  await settingsPage.fillNewPassword(changedPassword);
  await settingsPage.clickUpdateSettingsButton();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(changedPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});