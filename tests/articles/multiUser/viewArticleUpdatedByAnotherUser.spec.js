import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article updated by another user', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
  logger,
}) => {
  const updatedArticle = generateNewArticleData(logger);

  // user1 (author) edits the article in the first browser context
  const authorViewArticlePage = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);

  await authorViewArticlePage.open(articleWithoutTags.url);
  await authorViewArticlePage.clickEditArticleButton();
  await editArticlePage.submitEditArticleForm(updatedArticle);
  await authorViewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);

  // user2 opens the same article in the second browser context
  const readerViewArticlePage = new ViewArticlePage(page2);

  await readerViewArticlePage.open(articleWithoutTags.url);

  await readerViewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await readerViewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  await readerViewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});
