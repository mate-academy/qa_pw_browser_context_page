import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

});

// eslint-disable-next-line max-len
test('User can not see new articles in Your Feed after unfollowing other users profile', async ({ page2, user1, articleWithoutTags }) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertFollowButtonIsVisible(user1.username);
  await viewArticlePage.clickFollowButton(user1.username);
  await viewArticlePage.assertUnfollowButtonIsVisible(user1.username);
  await viewArticlePage.clickUnfollowButton(user1.username);
  await viewArticlePage.assertFollowButtonIsVisible(user1.username);

  await homePage.open();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.clickYourFeed();

  await homePage.assertArticleInYourFeedIsNotVisible(articleWithoutTags.title);
  

});


