import { test } from '../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { createArticle } from '../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, page2, user1, user2 }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
});

test('Successful `Sign in` flow test', async ({ user2, page2 }) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

test('User can sign in with changed in profile password', async ({
  page2,
  user2,
  articleWithOneTag,
}) => {
  const signInPage = new SignInPage(page2);
  const homePage = new HomePage(page2);
  const settingsPage = new SettingsPage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();

  await settingsPage.open();
  const newPassword = 'NewSecurePassword123!';
  await settingsPage.fillNewPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();

  await page2.getByRole('button', { name: 'Or click here to logout.' }).click();

  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

test("User can see own article in 'Global feed' when not logged in", async ({
  page1,
  user1,
  articleWithoutTags,
}) => {
  const settingsPage = new SettingsPage(page1);

  await createArticle(page1, articleWithoutTags);

  await settingsPage.open();
  await page1.getByRole('button', { name: 'Or click here to logout.' }).click();

  const response = await page1.request.get(
    `https://conduit.mate.academy/api/articles?author=${user1.username.toLowerCase()}`,
  );
  const body = await response.json();

  const articleTitles = body.articles.map(a => a.title);
  expect(articleTitles).toContain(articleWithoutTags.title);
});
п;
