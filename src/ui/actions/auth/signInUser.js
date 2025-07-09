import { SignInPage } from '../../pages/auth/SignInPage';
import { test } from '@playwright/test';

export async function signInUser(page, user) {
  await test.step(`Sign up user`, async () => {
    const signInPage = new SignInPage(page);
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();
  });
}
