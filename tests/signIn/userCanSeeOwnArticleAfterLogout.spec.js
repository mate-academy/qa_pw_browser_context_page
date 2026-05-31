import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { SettingsPage } from '../../src/ui/pages/SettingsPage';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';


let signInPage;
let homePage;
let settingsPage;
let viewArticlePage;

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
  

  signInPage = new SignInPage(page1);
  homePage = new HomePage(page1);
  settingsPage = new SettingsPage(page1);
  viewArticlePage = new ViewArticlePage(page1);
});

test('User can see own article in "Global feed" when not logged in', async ({ user, articleWithoutTags }) => {
  await viewArticlePage.page.waitForTimeout(1000);
  await viewArticlePage.openSettingsTab();
  await settingsPage.clickLogoutButton();
  await signInPage.page.waitForTimeout(1000);
  await homePage.openGlobalFeed();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTextIsVisible(articleWithoutTags.description);
  await homePage.assertArticleAuthorNameIsVisible(user.username);

});