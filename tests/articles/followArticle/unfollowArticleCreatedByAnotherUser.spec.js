import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('Unfollow the article created by another user', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertFollowUserIsVisible(user1.username);
  await viewArticlePage.clickFollowButton(user1.username);

  await viewArticlePage.open();
  await homePage.assertUserIsVisibleInYourFeed(user1.username);

  await homePage.open(articleWithoutTags.url);
  await viewArticlePage.clickUnfollowButton(user1.username);

  await viewArticlePage.open();
  await viewArticlePage.assertFollowUserIsNotVisible(user1.username);
});
