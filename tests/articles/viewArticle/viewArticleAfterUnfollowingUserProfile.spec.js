import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test(`View no articles in 'Your Feed' tab after unfollowing user profile`, async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  // Follow user
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton(user1.username);

  // Assert articles appears
  await homePage.clickHomeLink();
  await homePage.assertArticleOnYourlFeedTabIsVisible(articleWithoutTags.title, user1.username);

  // Unfollow user
  await homePage.clickSpecificArticleLink(articleWithoutTags.title);
  await viewArticlePage.clickUnfollowButton(user1.username);

  // Assert the user is unfollowed
  await homePage.clickHomeLink();
  await homePage.assertYourFeedTabIsEmpty();
});