import { SignInPage } from '../../pages/auth/SignInPage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function signInUser(page, user) {
  await test.step(`Sign in user`, async () => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);

    await signInPage.open();
    await signInPage.submitSignInForm(user);

    await homePage.assertYourFeedTabIsVisible();
  });
}
