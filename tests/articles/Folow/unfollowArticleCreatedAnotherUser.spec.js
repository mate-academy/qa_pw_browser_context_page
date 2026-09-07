import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);

  await signUpUser(page2, user2);
});

test('View an article created by another user in the Global Feed', async ({
  page2,
  user2,
  homePage,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.assertYourFeedTabIsVisible(page2);
  await homePage.clickGlobalFeedButton(page2);
  await viewArticlePage.clickInArticleLinkGlobalFeed(
    articleWithoutTags.title,
    page2,
  );

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);

  await viewArticlePage.clickFolowUserButton();
  await homePage.clickHomePageButton(page2);

  await viewArticlePage.clickInArticleLinkGlobalFeed(
    articleWithoutTags.title,
    page2,
  );
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);

  await viewArticlePage.clickUnfollowUserButton(page2);
  await homePage.clickHomePageButton(page2);
  await viewArticlePage.assertArticleNotVisible(page2);
});
