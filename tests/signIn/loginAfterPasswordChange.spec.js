import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';

let signInPage;
let settingsPage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  settingsPage = new SettingsPage(page1);
  signInPage = new SignInPage(page2);
});

test('Successful `Sign in` after updating the password', async ({
  user,
  page2,
}) => {
  const newPassword = faker.internet.password();
  const settingsPage2 = new SettingsPage(page2);

  await settingsPage.clickSettingsTab();
  await settingsPage.fillNewPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();
  await settingsPage.assertProfilePage(user.username);

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await settingsPage2.assertProfilePage(user.username);
});
