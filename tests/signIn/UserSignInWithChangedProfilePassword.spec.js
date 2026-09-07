import { test } from '../_fixtures/fixtures';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user, homePage }) => {
  await signUpUser(page, user);

  await homePage.clickSetingButton();
  await homePage.fillNewPassword();
  await homePage.clickUpdateSetingButton();
  await homePage.clickSetingButton();
  await homePage.clickLogoutButton();
});

test('View an article created by another user', async ({
  user,
  signInPage,
  homePage,
}) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField('12345678Qq');
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
