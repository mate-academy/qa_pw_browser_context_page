import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;
let viewArticlePageUser2;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  article = articleWithoutTags;

  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  article = await createArticle(page1, articleWithoutTags);

  viewArticlePageUser2 = new ViewArticlePage(page2);
});

test('View an article created by another user', async ({}) => {
  await viewArticlePageUser2.open(article.url);

  await viewArticlePageUser2.assertArticleTitleIsVisible(article.title);
  await viewArticlePageUser2.assertArticleTextIsVisible(article.text);
});
