import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { EditProfile } from '../../src/ui/pages/auth/EditProfile';

let signInPage;
let homePage;
const newPassword = "qwertY123!";

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('User can sign in with changed in profile password',
  async ({ user, page1, page2 }) => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();

    await homePage.assertYourFeedTabIsVisible();

    const editProfile = new EditProfile(page2);
    await editProfile.open();
    await editProfile.fillNewPasswordField(newPassword);
    await editProfile.clickUpdateSettingsBtn();
    await editProfile.clickLogoutBtn();

    const signInPage1 = new SignInPage(page1);
    await signInPage1.open();
    await signInPage1.fillEmailField(user.email);
    await signInPage1.fillPasswordField(newPassword);
    await signInPage1.clickSignInButton();

    const homePage1 = new HomePage(page1);
    await homePage1.open();
    await homePage1.assertYourFeedTabIsVisible();
  });
