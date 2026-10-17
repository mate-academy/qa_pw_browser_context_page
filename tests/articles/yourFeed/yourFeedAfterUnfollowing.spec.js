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

test('Your Feed after unfollowing user profile', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.followUserButtonClick(user1.username);
  const homePage = new HomePage(page2);
  await homePage.clickHomeButton();
  await homePage.reload();
  await homePage.assertFollovingUserIsVisible(user1.username);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.unfollowUserButtonClick(user1.username);
  await homePage.clickHomeButton();
  await homePage.reload();
  await homePage.assertYourFeedTabIsEmpty();
});
