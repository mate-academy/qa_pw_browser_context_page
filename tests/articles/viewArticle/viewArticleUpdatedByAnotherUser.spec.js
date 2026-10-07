import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article updated by another user', async ({
  page1,
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePageUser1 = new ViewArticlePage(page1);
  const viewArticlePageUser2 = new ViewArticlePage(page2);
  const editArticlePage = new EditArticlePage(page1);

  await viewArticlePageUser2.open(articleWithoutTags.url);
  await viewArticlePageUser2.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );

  await viewArticlePageUser1.open(articleWithoutTags.url);
  await viewArticlePageUser1.clickEditArticleLink();

  const updatedText = `Updated ${articleWithoutTags.text}`;

  await editArticlePage.fillTextField(updatedText);
  await editArticlePage.clickUpdateArticleButton();

  await page1.waitForURL('**/article/**');
  await page1.reload();

  await viewArticlePageUser1.assertArticleTextIsVisible(updatedText);

  await viewArticlePageUser2.open(articleWithoutTags.url);
  await page2.reload();

  await viewArticlePageUser2.assertArticleTextIsVisible(updatedText);
});
