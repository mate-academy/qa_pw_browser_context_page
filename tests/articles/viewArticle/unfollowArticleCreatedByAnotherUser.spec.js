import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
  await signUpUser(page2, user2);
});

test('Unfollow an article created by another user', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.clickGlobalFeedLink();
  await homePage.assertGlobalFeedTabIsVisible();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.clickYourFeedLink();
  await homePage.clickGlobalFeedLink();
  await homePage.clickArticleFollowButtonByTitle(articleWithoutTags.title);
  await homePage.assertArticleIsFollowed(articleWithoutTags.title);
  await homePage.clickArticleFollowButtonByTitle(articleWithoutTags.title);
  await homePage.assertArticleIsUnfollowed(articleWithoutTags.title);
});
