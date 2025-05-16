import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
  await signUpUser(page2, user2);
});

test('View an article updated by another user', async ({
  page1,
  page2,
  articleWithoutTags,
}) => {
  const updatedTitle = 'Updated Title';
  const updatedText = 'Updated body for old article.';

  const editArticlePage = new EditArticlePage(page1);
  await page1.goto(
    `https://conduit.mate.academy/editor/${articleWithoutTags.slug}`,
  );
  await editArticlePage.updateTitleAndText(updatedTitle, updatedText);

  const viewArticlePage = new ViewArticlePage(page2);
  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(updatedTitle);
  await viewArticlePage.assertArticleTextIsVisible(updatedText);
});
