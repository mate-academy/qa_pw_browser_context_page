import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';

let signInPage;
let homePage;
let settingsPage;

test.beforeEach(async ({ page1, page2,user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
  settingsPage = new SettingsPage(page2);
});

test('User can sign in with changed in profile password', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
  await homePage.openSettingsTab();
  await signInPage.page.waitForTimeout(1000);
  await settingsPage.fillNewPasswordField('j+#H00]2TF');
  await settingsPage.clickSaveChangesButton();
  await settingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField('j+#H00]2TF');
  await signInPage.clickSignInButton();
 await signInPage.page.waitForTimeout(1000);

});
