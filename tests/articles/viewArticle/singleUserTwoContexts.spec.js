import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

let signInPage, homePage, viewArticlePage;

test.beforeEach(async ({ page1, page2, user }) => {
  await signUpUser(page1, user);          // create the user in ctx1
  signInPage = new SignInPage(page2);     // work in ctx2
  homePage   = new HomePage(page2);
  viewArticlePage = new ViewArticlePage(page2);
});

test('User can sign in with changed profile password', async ({ page1, user }) => {
  const newPassword = 'newpassword123';

  // Change password in profile (context 1)
  await page1.goto('/settings');
  await page1.locator('[placeholder="New Password"], [placeholder="Password"]').fill(newPassword);
  await page1.getByRole('button', { name: /Update Settings|Save/ }).click();

  // Sign in with new password (context 2)
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('User can see own article in "Global Feed" when not logged in', async ({ page1, page2, articleWithoutTags }) => {
  // Create article while logged in (context 1)
  await createArticle(page1, articleWithoutTags);

  // Anonymous context (just to be safe, clear cookies)
  await page2.context().clearCookies().catch(() => {});
  await page2.goto('/');

  // Global Feed can lag – wait until the new article appears
  await homePage.clickGlobalFeedTab();
  await homePage.waitForArticleInGlobalFeed(articleWithoutTags.title, 20000);

  // Open and verify
  await homePage.openArticleCardByTitle(articleWithoutTags.title);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
});

