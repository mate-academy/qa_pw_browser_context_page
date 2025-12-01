import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/Settings';
import { faker } from '@faker-js/faker';

let signInPage;
let homePage;
let updatedPassword = faker.internet.password();
let settingsPage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  settingsPage = new SettingsPage(page1);
  user.password = updatedPassword;
  settingsPage.updateUserPassword(user.password);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in` with changed in profile password test', async ({
  user,
}) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
