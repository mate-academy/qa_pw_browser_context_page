import { test } from '../_fixtures/fixtures';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ 
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article in "Your Feed" after following another user', async ({
  articleWithoutTags,
  page2,
  user1,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage2 = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url)
  await viewArticlePage.assertArticleTitleIsVisible(
    articleWithoutTags.title
  );
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertAuthorIsFollowed(user1.username)
  await homePage2.open();
  await homePage2.clickYourFeedTab()
  await homePage2.assertFeedContainsArticleTitle(articleWithoutTags.title);
});

test.afterEach(async ({ page1, page2 }) => {
  await page1.context().close();
  await page2.context().close();
});
