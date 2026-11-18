import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewPassword } from '../../src/common/testData/generateNewUserData';

test.beforeEach(async ({page, user1}) => {
    await signUpUser(page, user1);
});

test('User can sign in with changed in profile password', async( {page, page2, user1} ) => {
    const homePage = new HomePage(page);
    const newPassword = generateNewPassword();
    await homePage.openSettings();
    await homePage.changePassword(newPassword);
    await homePage.updateSettings();

    const signInPage2 = new SignInPage(page2);
    await signInPage2.open();
    await signInPage2.fillEmailField(user1.email);
    await signInPage2.fillPasswordField(newPassword);
    await signInPage2.clickSignInButton();

    const homePage2 = new HomePage(page2)
    await homePage2.assertYourFeedTabIsVisible();
})