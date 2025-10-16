import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';

let signInPage2;
let homePage1;
let homePage2;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage2 = new SignInPage(page2);
  homePage1 = new HomePage(page1);
  homePage2 = new HomePage(page2);
});

test('Successful `Sign in` flow test', async ({ user }) => {
  const newPassword = faker.internet.password();

  await homePage1.clickSettingsButton();
  await homePage1.fillNewPasswordField(newPassword);
  await homePage1.clickUpdateSettingsButton();

  await signInPage2.open();
  await signInPage2.fillEmailField(user.email);
  await signInPage2.fillPasswordField(newPassword);
  await signInPage2.clickSignInButton();

  await homePage2.assertYourFeedTabIsVisible();
});

