import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page1, user }) => {
  await signUpUser(page1, user);
});

test('User can sign in with changed in profile password', async ({
  user,
  page2,
  homePage,
  settingsPage,
}) => {
  const newPassword = faker.internet.password();
  await homePage.clickSettingsButton();
  await settingsPage.assertNewPasswordFieldIsVisible();
  await settingsPage.updateNewPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();

  const signInPageOnPage2 = new SignInPage(page2);
  const homePageOnPage2 = new HomePage(page2);

  await signInPageOnPage2.open();
  await signInPageOnPage2.fillEmailField(user.email);
  await signInPageOnPage2.fillPasswordField(newPassword);
  await signInPageOnPage2.clickSignInButton();
  await homePageOnPage2.assertYourFeedTabIsVisible();
});
