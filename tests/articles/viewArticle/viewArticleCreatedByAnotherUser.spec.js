import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an updated article from another user', async ({
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const updatedArticle = {
    ...articleWithoutTags,
    title: `${articleWithoutTags.title} (Updated)`,
    text: `${articleWithoutTags.text} — edited version.`,
  };

  await updateArticle(page1, articleWithoutTags.url, updatedArticle);

  const viewArticlePage = new ViewArticlePage(page2);
  await viewArticlePage.open(updatedArticle.url);

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});
