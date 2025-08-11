/* eslint-disable max-len */
import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

let signInPage;
let homePage;
let viewArticlePage;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  // Arrange: register two users
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  // Arrange: user1 creates an article
  await createArticle(page1, articleWithoutTags);

  // POMs for user2 session
  signInPage = new SignInPage(page2);
  homePage = new HomePage(page2);
  viewArticlePage = new ViewArticlePage(page2);
});

test('User can view another user’s article from Global Feed', async ({ user1, user2, articleWithoutTags }) => {
  // Act: user2 signs in
  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  // Act: switch to Global Feed and open the article created by user1
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticleCardVisible(articleWithoutTags.title);
  await homePage.openArticleCardByTitle(articleWithoutTags.title);

  // Assert: article content & author are correct
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username); // author is the creator (user1)
});

test('User can follow the article created by another user', async ({ user1, user2, articleWithoutTags }) => {
  // Act: user2 signs in
  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  // Act: open Global Feed article from user1
  await homePage.clickGlobalFeedTab();
  await homePage.openArticleCardByTitle(articleWithoutTags.title);

  // Act: follow the author
  await viewArticlePage.clickFollowAuthorButton();

  // Assert: follow button state updated
  await viewArticlePage.assertAuthorIsFollowed();
});

test('User can unfollow the article created by another user', async ({ user1, user2, articleWithoutTags }) => {
  // sign in as user2
  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  // open user1's articlet
  await homePage.clickGlobalFeedTab();
  await homePage.openArticleCardByTitle(articleWithoutTags.title);

  await viewArticlePage.clickFollowAuthorButton();
  await viewArticlePage.assertAuthorIsFollowed();

  await viewArticlePage.clickUnfollowAuthorButton();
  await viewArticlePage.assertAuthorIsUnfollowed();
});

test('User can view an article updated by another user', async ({ page1, user1, user2, articleWithoutTags }) => {
  // Arrange: author (user1) updates the article on page1
  const editArticlePage = new EditArticlePage(page1);
  const updated = {
    title: `${articleWithoutTags.title} (updated)`,
    text: `${articleWithoutTags.text} — updated`,
  };

  await page1.goto(articleWithoutTags.url);
  await editArticlePage.updateArticle(updated);

  // Act: viewer (user2) signs in on page2
  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  // Act: open the updated article from Global Feed (by new title)
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticleCardVisible(updated.title);
  await homePage.openArticleCardByTitle(updated.title);

  // Assert: updated content + correct author
  await viewArticlePage.assertArticleTitleIsVisible(updated.title);
  await viewArticlePage.assertArticleTextIsVisible(updated.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});


test('User can see other user’s new articles in "Your Feed" after following', async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  // 1) Author creates an initial article so the follower can follow from it
  await createArticle(page1, articleWithoutTags);

  // 2) user2 signs in and follows user1 from that article
  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  await homePage.clickGlobalFeedTab();
  await homePage.openArticleCardByTitle(articleWithoutTags.title);
  await viewArticlePage.clickFollowAuthorButton();
  await viewArticlePage.assertAuthorIsFollowed();

  // 3) user1 publishes a NEW article after being followed
  const newArticle = {
    ...articleWithoutTags,
    title: `${articleWithoutTags.title} (new)`,
    text: `${articleWithoutTags.text} (new)`,
  };
  await createArticle(page1, newArticle);

  // 4) user2 checks "Your Feed" and sees the new article
  await page2.goto('/');                     // back to home
  await homePage.clickYourFeedTab();         // open "Your Feed"
  await homePage.assertArticleCardVisible(newArticle.title);
  await homePage.openArticleCardByTitle(newArticle.title);

  // 5) verify content & author
  await viewArticlePage.assertArticleTitleIsVisible(newArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(newArticle.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});

test(`User doesn't see other user's new articles in "Your Feed" after unfollowing`, async ({ page1, user1, user2, articleWithoutTags }) => {
  // author publishes an article so follower can open profile from it
  await createArticle(page1, articleWithoutTags);

  // user2 signs in and follows, then unfollows user1 from the article page
  await signInPage.open();
  await signInPage.fillEmailField(user2.email);
  await signInPage.fillPasswordField(user2.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  await homePage.clickGlobalFeedTab();
  await homePage.openArticleCardByTitle(articleWithoutTags.title);

  await viewArticlePage.clickFollowAuthorButton();
  await viewArticlePage.assertAuthorIsFollowed();
  await viewArticlePage.clickUnfollowAuthorButton();
  await viewArticlePage.assertAuthorIsUnfollowed();

  // author publishes a NEW article after being unfollowed
  const postUnfollowArticle = {
    ...articleWithoutTags,
    title: `${articleWithoutTags.title} (after unfollow)`,
    text: `${articleWithoutTags.text} (after unfollow)`,
  };
  await createArticle(page1, postUnfollowArticle);

  // user2 checks "Your Feed" — the new article should NOT appear
  await homePage.page.goto('/');      // go to home
  await homePage.clickYourFeedTab();
  await homePage.assertArticleCardNotPresent(postUnfollowArticle.title);
});
