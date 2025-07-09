import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { signInUser } from '../../src/ui/actions/auth/signInUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';


let secondPage;

test.beforeEach(async ({page1, user1, browser}) => {

  const secondContext = await browser.newContext();
  secondPage = await secondContext.newPage();
  await signUpUser(page1, user1);

});

test(
  'User can sign in with changed in profile password.',
   async ({page1, newPassword, user1}) => {

    const homePage = new HomePage(page1);
    const settingsPage = new SettingsPage(page1);

    await homePage.clickSettingsLink();
    await settingsPage.changePassword(newPassword);
    await settingsPage.open();
    await settingsPage.assertPasswordFieldIsVisible();

    user1.password = newPassword;

    await signInUser(secondPage, user1);
    await homePage.assertUserNameIsVisible();
});
