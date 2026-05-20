import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { UserSettingsPage } from '../../src/ui/pages/userProfile/UserSettingsPage';
import { UserProfilePage } from '../../src/ui/pages/userProfile/UserProfilePage';

test('signIn after password change', async ({user, homePage, page, signInPage}) => {
    const userSettingsPage = new UserSettingsPage(page);
    const userProfile = new UserProfilePage(page);

    await signUpUser(page, user)

    const changedPassword = `${user.password}!`

    await homePage.clickUserProfile()
    await userProfile.clickEditProfileSettings()
    await userSettingsPage.inputNewPassword(changedPassword);
    await userSettingsPage.clickUpdateSettings()

    await userProfile.clickEditProfileSettings()
    await userSettingsPage.clickLogout()

    await signInPage.open()
    await signInPage.fillEmailField(user.email)
    await signInPage.fillPasswordField(changedPassword)
    await signInPage.clickSignInButton()

    await homePage.assertYourFeedTabIsVisible()
})