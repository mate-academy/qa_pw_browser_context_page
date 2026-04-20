import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';


test.beforeEach(async ({ page1, user1, page2, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created in Global Feed', async ({
  page2, user1
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.clickGlobalFeedTab();
  await homePage.clickFirstAricleGlobalFeed();
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
}); 