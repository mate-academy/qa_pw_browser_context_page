import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article create by other user after the following/unfollowing the Author', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const profilePage = new ProfilePage(page2);

  await homePage.clickYourFeedTab();
  await homePage.assertEmptyStateIsVisible();

  const username = user1.username;

  // Follow
  await profilePage.open(username);
  await profilePage.clickFollowButton(username);
  await profilePage.clickHomeButton();

  await homePage.clickYourFeedTab();
  await homePage.assertArticleTitleContainsText(
    user1.username,
    0,
    articleWithoutTags.title,
  );
  await homePage.assertArticleDescriptionContainsText(
    user1.username,
    0,
    articleWithoutTags.description,
  );

  // Unfollow
  await profilePage.open(username);
  await profilePage.clickUnfollowButton(username);
  await profilePage.clickHomeButton();

  await homePage.clickYourFeedTab();
  await homePage.assertEmptyStateIsVisible();
});
