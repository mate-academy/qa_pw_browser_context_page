import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article in feed updated by another user in feed', async ({
  page1,
  page2,
  articleWithOneTag,
}) => {
  const viewArticlePage = new ViewArticlePage(page1);
  const editArticlePage = new EditArticlePage(page1);

  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.editArticleTitle(articleWithOneTag);
  await editArticlePage.clickUpdateArticleButton();

  const homePage = new HomePage(page2);
  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleTitleIsVisible(articleWithOneTag.title);
});
