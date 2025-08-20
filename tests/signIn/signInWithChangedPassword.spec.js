import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { updatePassword } from '../../src/ui/actions/profile/updatePassword';

let signInPage;
let homePage;
let newUserPassword;

test.beforeEach(async ({ page1, page2, user }) => {
  newUserPassword = `${faker.internet.password}`;
  
  await signUpUser(page1, user);
  await updatePassword(page1, newUserPassword);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in with changed password` flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newUserPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});