import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in` flow test', async ({
  user,
  page1,
  settingsPage,
  logger,
}) => {
  const homePage1 = new HomePage(page1);
  const newUser = new generateNewUserData(logger);

  await homePage1.clickSettingsButton();
  await settingsPage.fillNewPasswordField(newUser.password);
  await settingsPage.clickUpdateSettingsButton();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newUser.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
