import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/profile/ProfilePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  const profilePage = new ProfilePage(page2);
  await profilePage.openProfilePage(user1.username);
  await profilePage.clickFollowButton();
  await profilePage.assertUnfollowButtonIsVisible();

  await createArticle(page1, articleWithoutTags);

  await profilePage.clickUnfollowButton();
  await profilePage.assertFollowButtonIsVisible();
});

test(`Other user's new article is not visible in "Your Feed" after unfollowing their profile`, async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleIsNotVisibleInHomeFeed(articleWithoutTags.title);
});
