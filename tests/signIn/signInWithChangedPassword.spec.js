import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';
import { faker } from '@faker-js/faker';

let signInPage;
let homePage1;
let homePage2;
let profilePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  homePage1 = new HomePage(page1);
  homePage2 = new HomePage(page2);
  profilePage = new ProfilePage(page1);
  signInPage = new SignInPage(page2);
});

test('User can sign in with changed in profile password.',
  async ({ user }) => {
  const password = faker.internet.password();

  await homePage1.open();
  await profilePage.clickProfileLink(user.username);
  await profilePage.clickEditProfileButton();
  await profilePage.fillNewPasswordField(password);
  await profilePage.clickUpdateSettingsButton();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(password);
  await signInPage.clickSignInButton();

  await homePage2.assertYourFeedTabIsVisible();
});
