import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import {HomePage} from '../../../src/ui/pages/HomePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';


test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});

test(`User2 can view/follow/unfollow User1's profile and see the article update`, async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePageAsReader = new ViewArticlePage(page2);
  const viewArticlePageAsAuthor = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);
  const homePageReader = new HomePage(page2);

  const updatedTitle = `${articleWithoutTags.title} updated`;

  await viewArticlePageAsReader.clickGlobalFeedTab();
  await viewArticlePageAsReader.openArticleFromFeed(articleWithoutTags.title);
  await viewArticlePageAsReader.assertArticleAuthorNameIsVisible(user1.username);

  await viewArticlePageAsReader.followUser(user1.username);


  await homePageReader.clickConduitIcon();
  await homePageReader.clickYouFeedTab();

  // "Your Feed" is the default active tab on Home, so it's rendered from
  // data fetched before the follow action and doesn't refetch on click —
  // a reload is needed to see the newly-followed user's articles.
  await page2.reload();
  await homePageReader.assertArticleIsVisibleInFeed(articleWithoutTags.title);
  await homePageReader.openArticleFromFeed(articleWithoutTags.title);


  
  await viewArticlePageAsAuthor.clickEditArticleLink();
  await editArticlePage.fillTitle(updatedTitle);
  await editArticlePage.clickUpdateArticleButton();

  // The redirect from /editor/{slug} to /article/{slug} happens
  // asynchronously after the update succeeds, so wait for it before
  // reloading — otherwise the reload can hit the editor page instead
  // of the article page, which has no heading at all.
  await page1.waitForURL(/\/article\//);
  await page1.reload();
  await viewArticlePageAsAuthor.assertArticleTitleIsVisible(updatedTitle);

  await viewArticlePageAsReader.open(articleWithoutTags.url);
  await viewArticlePageAsReader.assertArticleTitleIsVisible(updatedTitle);

  await viewArticlePageAsReader.unfollowUser(user1.username);
  await homePageReader.clickConduitIcon();
  await homePageReader.clickYouFeedTab();
  await page2.reload();
  await viewArticlePageAsReader.assertArticleIsNotVisibleInFeed(updatedTitle);
});



test(`User changed password and see own article`, async ({
  page1,
  page2,
  user1,
}) => {
  const settingsPageAsAuthor = new SettingsPage(page1);
  const settingsPageOnPage2 = new SettingsPage(page2);
  const signInPageOnPage2 = new SignInPage(page2);
  const homePageOnPage2 = new HomePage(page2);
  const viewArticlePage2 = new ViewArticlePage(page2)

  const newPassword = 'updatedpass123';

  await settingsPageAsAuthor.open();
  await settingsPageAsAuthor.fillNewPasswordField(newPassword);
  await settingsPageAsAuthor.clickUpdateSettingsButton();


  // page2 is already signed in as user2 (from the shared beforeEach),
  // so it must log out before signing in as user1 with the new password.
  await settingsPageOnPage2.open();
  await settingsPageOnPage2.clickLogOutButton();

  
  await viewArticlePage2.clickGlobalFeedTab()
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username)

  await signInPageOnPage2.open();
  await signInPageOnPage2.fillEmailField(user1.email);
  await signInPageOnPage2.fillPasswordField(newPassword);
  await signInPageOnPage2.clickSignInButton();

  await homePageOnPage2.assertYourFeedTabIsVisible();
});
