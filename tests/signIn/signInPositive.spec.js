import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in` flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

test('User can sign in with changed in profile password', async ({
  user, 
  page1, 
}) => {
  const homePageUser1 = new HomePage(page1);
  const newPassword = 'qwerty123';
  
  await homePageUser1.clickSettingButton();
  await homePageUser1.fillNewPassword(newPassword);
  await homePageUser1.clickUpdateSettingsButton();
  await expect(page1).toHaveURL(/\/profile\//);
  
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourProfileIsVisible();
});
