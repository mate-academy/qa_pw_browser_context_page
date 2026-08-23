import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { HeaderPage } from '../../../src/ui/pages/HeaderPage';
import { ViewProfilePage } from '../../../src/ui/pages/profile/ViewProfilePage';
import { SettingsProfilePage } from '../../../src/ui/pages/profile/SettingsProfilePage';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('User can `Sign in` with a changed password', async ({ page1, user }) => {
  const headerPage = new HeaderPage(page1);
  const viewProfilePage = new ViewProfilePage(page1);
  const settingsProfilePage = new SettingsProfilePage(page1);

  await headerPage.clickProfileLink();
  await viewProfilePage.clickSettingsButton();
  await settingsProfilePage.fillNewPasswordField(user.newPassword);
  await settingsProfilePage.clickUpdateButton();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
