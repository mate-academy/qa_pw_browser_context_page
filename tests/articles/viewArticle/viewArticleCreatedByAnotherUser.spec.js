import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';

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

test('Follow the article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertFollowButtonText(user1.username, 'Unfollow');
});

test('Unfollow the article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertFollowButtonText(user1.username, 'Unfollow');

  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertFollowButtonText(user1.username, 'Follow');
});

test('View an article updated by another user', async ({
  page1,
  page2,
  articleWithoutTags,
}) => {
  const newTitle = 'Update Title ' + Date.now();
  const newText = 'Update article body text';

  const editArticlePage = new EditArticlePage(page1);

  await page1.getByRole('link', { name: 'Edit Article' }).first().click();
  await page1.waitForURL('**/editor/**');

  await editArticlePage.fillTitleField(newTitle);
  await editArticlePage.fillBodyField(newText);
  await editArticlePage.clickUpdateArticleButton();
  await page1.waitForURL('**/article/**');

  const viewArticlePage = new ViewArticlePage(page2);
  await viewArticlePage.open(page1.url());

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTextIsVisible(newText);
});

test("See other user's new articles in Your Feed after following their profile", async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertFollowButtonText(user1.username, 'Unfollow');

  await page2.goto('/');
  await homePage.clickYourFeedTab();
  await homePage.assertArticleIsVisibleInFeed(articleWithoutTags.title);
});

test("User doesn't see other user's articles in 'Your Feed' after unfollowing their profile", async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.clickFollowButton();
  await viewArticlePage.clickFollowButton();

  await page2.goto('/');

  await homePage.clickYourFeedTab();
  await expect(page2.getByText(articleWithoutTags.title)).toBeHidden();
});
