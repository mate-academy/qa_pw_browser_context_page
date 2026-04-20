import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { faker } from '@faker-js/faker';

let newPassword = faker.internet.password();

test.beforeEach(async ({ page1, user1 }) => {
  await signUpUser(page1, user1);
});

test(`User can sign in with changed in profile password`, async ({
  page1, user1
}) => {
  const homePage = new HomePage(page1);
  const settingsPage = new SettingsPage(page1);
  const signInPage = new SignInPage(page1);

  await homePage.clickOnSettingseButon();
  await settingsPage.fillPasswordField(newPassword);
  await settingsPage.clickOnUpdateSettingsButon();
  await settingsPage.clickOnLogoutButon();
  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});