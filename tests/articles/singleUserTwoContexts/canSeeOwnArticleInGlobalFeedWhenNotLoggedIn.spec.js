import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

let homePage1;
let homePage2;
let article;
let signInPage;
let viewArticlePageUser2;

test.beforeEach(async ({ page1, page2, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  article = await createArticle(page1, articleWithoutTags);

  homePage1 = new HomePage(page1);
  homePage2 = new HomePage(page2);
  signInPage = new SignInPage(page2);
  viewArticlePageUser2 = new ViewArticlePage(page2);
});

test('User can see own article in "Global feed" when not logged in', async ({ user, page2 }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage2.assertYourFeedTabIsVisible();

  await page2.waitForTimeout(15000);

  await homePage2.clickSettingsButton();
  await homePage2.clickLogoutButton();
  await viewArticlePageUser2.openArticleFromGlobalFeed(article.title);
  await viewArticlePageUser2.assertArticleTitleIsVisible(article.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(article.text);
});
