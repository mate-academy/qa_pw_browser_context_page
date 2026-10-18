import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { editArticle } from '../../../src/ui/actions/articles/editArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags, articleWithOneTag }) => {
  await signUpUser(new SignUpPage(page1), new HomePage(page1), user1);
  await signUpUser(new SignUpPage(page2), new HomePage(page2), user2);

  await createArticle(page1, articleWithoutTags);
  await editArticle(page1, articleWithoutTags.url, articleWithOneTag);
});

test('View an article updated by another user', async ({
  page2,
  user2,
  articleWithOneTag,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});
