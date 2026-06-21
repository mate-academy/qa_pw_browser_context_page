import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';

let signInPage;
let homePage;
let settingsPage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  settingsPage = new SettingsPage(page1);

  await settingsPage.clickSettingsButton();
  await settingsPage.fillNewPasswordField('newpassword');
  await settingsPage.clickUpdateSettingsButton();

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Sign in with changed in profile password', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField('newpassword');
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});
