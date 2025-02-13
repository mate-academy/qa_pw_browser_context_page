import { test } from '../_fixtures/fixtures';

test.describe('Sign up positive tests', () => {
  let user;

  test.beforeEach(async ({}) => {
    user = {
      email: 'test_new_user@gmail.com',
      password: 'newpass123!',
    };
  });

  test('Successful `Sign in` flow test', async ({ signInPage, homePage }) => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();

    await homePage.assertYourFeedTabIsVisible();
  });
});
