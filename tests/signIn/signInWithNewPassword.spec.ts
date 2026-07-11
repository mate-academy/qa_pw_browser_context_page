import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test('User can sign in with changed in profile password.', async ({
  page,
  user,
  signInPage,
  signInPage2,
  homePage,
  settingsPage,
  profilePage,
}) => {
  const newPassword = '7jYUycSNtw*Q';

  await test.step('Register user', async () => {
    await signUpUser(page, user);
  });

  await test.step('Sign in with original password', async () => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();

    await homePage.assertYourFeedTabIsVisible();
  });

  await test.step('Change password in settings', async () => {
    await homePage.clickNewSettingsLink();

    await settingsPage.assertHeadingIsVisible();

    await settingsPage.fillPasswordField(newPassword);
    await settingsPage.clickUpdateButton();

    await profilePage.assertAuthorizedUserNameIsVisible(user.username);
  });

  await test.step('Log out', async () => {
    await profilePage.clickSettingsLink();

    await settingsPage.assertHeadingIsVisible();

    await settingsPage.clickLogoutButton();

    await homePage.assertHeadingConduitIsVisible();
  });

  await test.step('Sign in with new password in fresh context', async () => {
    await signInPage2.open();
    await signInPage2.fillEmailField(user.email);
    await signInPage2.fillPasswordField(newPassword);
    await signInPage2.clickSignInButton();

    await homePage.assertHeadingConduitIsVisible();
  });
});
