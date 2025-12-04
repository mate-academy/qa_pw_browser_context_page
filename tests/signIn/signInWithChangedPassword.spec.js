import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';

const newPassword = 'Newpassword123';

test.beforeEach(async ({ 
  user1,
  page1
}) => {
  const homePage = new HomePage(page1);
  const settingsPage = new SettingsPage(page1);
  const profilePage = new ProfilePage(page1);

  await signUpUser(page1, user1);
  await homePage.clickSettingsLink();
  await settingsPage.fillPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();
  await profilePage.assertUsernameIsVisible(user1.username);
});

test('Sign in with changed password', async ({
  page2,
  user1,
}) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);
  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});

test.afterEach(async ({ page1, page2 }) => {
  await page1.context().close();
  await page2.context().close();
});
