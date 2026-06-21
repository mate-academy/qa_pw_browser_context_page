import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { editArticle } from '../../../src/ui/actions/articles/editArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let updatedArticle;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  updatedArticle = {
    ...articleWithoutTags,
    title: 'Updated Article Title',
    text: 'Updated Article Text',
  };
  await editArticle(page1, updatedArticle);
});

test('View an article updated by another user', async ({ page2, user1 }) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(updatedArticle.url);

  await viewArticlePage.assertArticleTitleIsVisible('Updated Article Title');
  await viewArticlePage.assertArticleTextIsVisible('Updated Article Text');
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});
