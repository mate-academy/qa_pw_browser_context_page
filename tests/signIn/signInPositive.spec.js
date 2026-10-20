import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let signInPage;
let homePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);

  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
});

test('Successful `Sign in` flow test', async ({ user }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

test('User can sign in with changed in profile password', async ({
  user, 
  page1, 
}) => {
  const homePageUser1 = new HomePage(page1);
  const newPassword = 'qwerty123';
  
  await homePageUser1.clickSettingButton();
  await homePageUser1.fillNewPassword(newPassword);
  await homePageUser1.clickUpdateSettingsButton();
  await expect(page1).toHaveURL(/\/profile\//);
  
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourProfileIsVisible();
});

test('User can see own article in "Global feed" when not logged in', async ({
  page1,
  page2,
  articleWithoutTags
}) => {
  await createArticle(page1, articleWithoutTags);
  await expect(page1).toHaveURL(/\/article\//);

  const homePageUser2 = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePageUser2.open();

  await viewArticlePage.assertArticleIsNotVisibleInFeed(
    articleWithoutTags.title);
});
