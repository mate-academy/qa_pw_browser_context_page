import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { updateArticle } from '../../../src/ui/actions/articles/updateArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let newArticle;
test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  newArticle = generateNewArticleData(console, 2);
  await updateArticle(page1, newArticle);
});

test('View updated article created by another user', async ({
  page2,
  user1,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(newArticle.url);
  await viewArticlePage.assertArticleTitleIsVisible(newArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(newArticle.text);
  await viewArticlePage.assertArticleAuthorNameIsCorrect(user1.username);
});
