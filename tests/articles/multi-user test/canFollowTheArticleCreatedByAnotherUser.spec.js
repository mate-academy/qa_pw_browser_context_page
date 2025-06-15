import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';

let article;
let viewArticlePageUser2;
let homePageUser2;

test.beforeEach(async ({ page, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page, user1);
  await signUpUser(page2, user2);

  article = await createArticle(page, articleWithoutTags);
  viewArticlePageUser2 = new ViewArticlePage(page2);
  homePageUser2 = new HomePage(page2);
});

test('can follow the article created by another user', async ({ user1 }) => {
  await homePageUser2.clickGlobalFeed();
  await viewArticlePageUser2.openArticleFromGlobalFeed(article.title);
  await viewArticlePageUser2.clickFollowArticle(user1.username);

  await viewArticlePageUser2.assertArticleTitleIsVisible(article.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(article.text);
  await viewArticlePageUser2.assertUserFollowedTheArticle(article.username);
});

