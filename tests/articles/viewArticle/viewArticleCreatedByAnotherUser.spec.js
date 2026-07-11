import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, page2, user, user2, articleWithoutTags }) => {
  await signUpUser(page, user);
  await signUpUser(page2, user2);

  article = await createArticle(page, articleWithoutTags);
});

test('View an article created by another user', async ({
  viewArticlePage2,
  user,
}) => {
  await viewArticlePage2.open(article.url);

  await viewArticlePage2.assertArticleTitleIsVisible(article.title);
  await viewArticlePage2.assertArticleTextIsVisible(article.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user.username);
});
