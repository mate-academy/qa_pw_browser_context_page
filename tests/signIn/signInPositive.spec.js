import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in` flow test', async ({ page2, user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await page2.waitForURL('/', { waitUntil: 'networkidle' });

  await homePage.assertYourFeedTabIsVisible();
});

test('User can sign in with changed in profile password.', async ({ page2, user }) => {
  const newPassword = 'NewPassword123!';
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await page2.waitForURL('/', { waitUntil: 'networkidle' });
  await homePage.updatePassword(newPassword);

  await homePage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton(); 
  await page2.waitForURL('/', { waitUntil: 'networkidle' });
});
