import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page2, articleWithoutTags);
});

test('User can view an article created by another user in the Global Feed', async ({
  user2,
  homePage,
  viewArticlePage,
  articleWithoutTags,
}) => {
  await homePage.assertYourFeedTabIsVisible();
  await homePage.clickGlobalFeedTab();
  await homePage.clickArticleByTitle(articleWithoutTags.title);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});
