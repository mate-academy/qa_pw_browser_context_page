import { test } from '../_fixtures/fixtures';

test('Successful `Sign up` flow test', async ({
  user,
  signUpPage,
  homePage,
  page,
}) => {
  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await page.waitForURL('/');
  await page.waitForLoadState('networkidle');

  await homePage.assertYourFeedTabIsVisible();
});
