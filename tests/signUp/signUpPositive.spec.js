import { test } from '../_fixtures/fixtures';

test.describe('Sign up positive tests', () => {
  test('Successful `Sign up` flow test', async ({
    user,
    signUpPage,
    homePage,
  }) => {
    await signUpPage.open();
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillEmailField(user.email);
    await signUpPage.fillPasswordField(user.password);
    await signUpPage.clickSignUpButton();

    await homePage.assertYourFeedTabIsVisible();
  });
});
