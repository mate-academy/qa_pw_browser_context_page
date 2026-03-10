import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View article updated by another user', async ({
  user1,
  page1,
  page2,
  articleWithoutTags,
}) => {
  const editArticlePage = new EditArticlePage(page1);
  const viewArticlePageAuthor = new ViewArticlePage(page1);
  const viewArticlePageUser = new ViewArticlePage(page2);

  await viewArticlePageUser.open(articleWithoutTags.url);

  await viewArticlePageUser.assertArticleTitleIsVisible(
    articleWithoutTags.title
  );
  await viewArticlePageUser.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePageUser.assertArticleAuthorNameIsVisible(user1.username);

  await viewArticlePageAuthor.clickEditArticleButton();
  const newArticleTitle = 'new article title';
  await editArticlePage.changeArticleTitleField(newArticleTitle);
  await editArticlePage.clickUpdateArticleButton();

  await viewArticlePageUser.reloadArticlePage();
  await viewArticlePageUser.assertArticleTitleIsVisible(newArticleTitle);
});
