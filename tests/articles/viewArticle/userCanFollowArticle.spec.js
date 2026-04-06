import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('Follow user and check button state', async ({
  user1,
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);
  await homePage.clickGlobalFeedTab();
  await homePage.clickOnArticleWithTitle(articleWithoutTags.title);
  await viewArticlePage.clickFollowAuthorButton(user1.username);
  await viewArticlePage.checkUnfollowButtonVisibleWithUsername(user1.username);
});
