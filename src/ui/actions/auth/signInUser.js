import { SignUpPage } from '../../pages/auth/SignUpPage';
import { HomePage } from '../../pages/HomePage';
import { test } from '@playwright/test';

export async function signInUser(signInPage, user) {
  await test.step(`Sign in user`, async () => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();
  });
}
