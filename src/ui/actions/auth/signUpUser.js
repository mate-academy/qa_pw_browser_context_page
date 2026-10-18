import { test } from '@playwright/test';

export async function signUpUser(signUpPage, homePage, user) {
  await test.step(`Sign up user`, async () => {
    await signUpPage.open();
    await signUpPage.submitSignUpForm(user);

    await homePage.assertYourFeedTabIsVisible();  
  });
}
