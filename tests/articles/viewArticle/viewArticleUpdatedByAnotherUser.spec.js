import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

test.beforeEach(
  async ({
    page1,
    page2,
    user1,
    user2,
    articleWithoutTags,
    updatedArticleWithoutTags,
  }) => {
    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await createArticle(page1, articleWithoutTags);
    const viewArticlePage = new ViewArticlePage(page1);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.clickEditArticleLink();
    const editArticlePage = new EditArticlePage(page1);
    await editArticlePage.updateArticle(updatedArticleWithoutTags);
  },
);

test('View an article updated by another user', async ({
  page2,
  user2,
  articleWithoutTags,
  updatedArticleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(
    updatedArticleWithoutTags.title,
  );
  await viewArticlePage.assertArticleTextIsVisible(
    updatedArticleWithoutTags.text,
  );
  await viewArticlePage.assertArticleAuthorNameIsVisible(user2.username);
});
