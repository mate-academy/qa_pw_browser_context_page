import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article updated by another user', async ({
  page1,
  page2,
  articleWithoutTags,
  logger,
}) => {
  const updatedArticle = generateNewArticleData(logger);

  const viewArticlePage1 = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);

  await viewArticlePage1.open(articleWithoutTags.url);
  await viewArticlePage1.clickEditArticleLink();
  await editArticlePage.submitEditArticleForm(updatedArticle);

  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage2.assertArticleTextIsVisible(updatedArticle.text);
});