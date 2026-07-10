import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/auth/SettingsPage';
import { ProfilePage } from '../../src/ui/pages/auth/ProfilePage';

let signInPage;
let homePage;
let settingsPage;
let profilePage;

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);
});

test('Successful `Sign in`', async ({ user, page2 }) => {
  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
  settingsPage = new SettingsPage(page2);
  profilePage = new ProfilePage(page2);

  const newPassword = '7jYUycSNtw*Q';

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();

  await homePage.clickNewSettingsLink();

  await settingsPage.assertHeadingIsVisible();

  await settingsPage.fillPassswordField(newPassword);
  await settingsPage.clickUpdateButton();

  await profilePage.assertAuthorizedUserNameIsVisible(user.username);
});
