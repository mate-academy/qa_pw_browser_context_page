import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { UserProfile } from '../../src/ui/pages/profile/UserProfile';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page1, user1 }) => {
  await signUpUser(page1, user1);

});

test('User can change and login with new password', async ({
  user1,
  page1,
  browser
}) => {
  const userProfile = new UserProfile(page1);
  const newPassword = faker.internet.password();

  await userProfile.openProfileSettingsPage();
  await userProfile.fillPasswordField(newPassword);
  await userProfile.clickUpdateSettingsButton();
  await userProfile.assertUsernameIsVisible(user1.username);

  const newContext = await browser.newContext();
  const newPage = await newContext.newPage();
  const signInPage = new SignInPage(newPage);
  
  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  const homePage = new HomePage(newPage);
  await homePage.assertYourFeedTabIsVisible();
})