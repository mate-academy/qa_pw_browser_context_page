import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { faker } from '@faker-js/faker';

test('User can sign in with changed in profile password', async ({
  page1,
  page2,
  user1,
}) => {
  const settingsPage = new SettingsPage(page1);
  const signInPage = new SignInPage(page2);

  const newPassword = faker.internet.password();

  await signUpUser(page1, user1);

  await settingsPage.open();
  await settingsPage.fillPassword(newPassword);
  await settingsPage.clickUpdateSettingsButton();

  await signInPage.open();
  await signInPage.signIn({
    email: user1.email,
    password: newPassword,
  });

  await signInPage.assertUserIsLoggedIn(user1.username);
});
