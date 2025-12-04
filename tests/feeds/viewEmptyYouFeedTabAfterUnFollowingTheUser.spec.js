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

test('View an empty "Your Feed" after unfollowing another user', async ({
  articleWithoutTags,
  page2,
  user1,
}) => {
  const viewArticlePage2 = new ViewArticlePage(page2);
  const homePage2 = new HomePage(page2);
  //follow the author of the article
  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.assertArticleTitleIsVisible(
    articleWithoutTags.title
  );
  await viewArticlePage2.clickFollowButton();
  await viewArticlePage2.assertAuthorIsFollowed(user1.username)
  //check if the article is in the feed
  await homePage2.open();
  await homePage2.clickYourFeedTab()
  await homePage2.assertFeedContainsArticleTitle(articleWithoutTags.title);
  //unfollow the author of the article
  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.clickUnfollowButton();
  await viewArticlePage2.assertAuthorIsUnfollowed(user1.username);
  //check if the article is not in the feed
  await homePage2.open();
  await homePage2.clickYourFeedTab()
  await homePage2.assertNoArticlesMessageIsVisible();
});

test.afterEach(async ({ page1, page2 }) => {
  await page1.context().close();
  await page2.context().close();
});
