import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { updateArticle } from '../../../src/ui/actions/articles/updateArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});

test('View an article created by another user in the Global Feed', async ({
  user1,
  page2,
  articleWithoutTags
}) => {
  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.assertGlobalFeedTabIsVisible();
  await homePage.clickGlobalFeedTabButton();
  await homePage.assertArticleOnGlobalFeedTabIsVisible(articleWithoutTags.title, user1.username);
});

test('View article updated by another user', async ({
  page1,
  user1,
  page2,
  articleWithOneTag,
  articleWithoutTags
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  // Assert the non updated article is visible
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);

  // Update article
  await updateArticle(page1, articleWithOneTag, articleWithoutTags.url);

  // Assert the updated article is visible
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});