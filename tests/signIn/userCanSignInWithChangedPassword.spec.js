import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ProfilePage } from '../../src/ui/pages/ProfilePage';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';

const newPassword = faker.internet.password();

test.beforeEach(async ({ page1, user1 }) => {
  await signUpUser(page1, user1);
});

test('Verify user can log in after password is changed', async ({
  page1,
  user1,
  page2,
}) => {
  const homePage1 = new HomePage(page1);
  const homePage2 = new HomePage(page2);
  const profilePage = new ProfilePage(page1);
  const signInPage = new SignInPage(page2);

  await homePage1.openSettingsPage();
  await profilePage.profilePasswordFieldFill(newPassword);
  await profilePage.updateSettingsButtonClick();

  await signInPage.open();
  await signInPage.fillEmailField(user1.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage2.assertGlobalFeedTabIsVisible();
});
