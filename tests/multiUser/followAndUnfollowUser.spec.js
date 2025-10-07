import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ProfilePage } from '../../src/ui/pages/auth/ProfilePage';
import { HomePage } from '../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can follow and unfollow another user', async ({ page2, user1 }) => {
  const profilePage = new ProfilePage(page2);
  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.openGlobalFeed();
  await homePage.openAuthorProfile(user1.username);

  await profilePage.clickFollowButton();
  await profilePage.assertFollowingState(true);

  await profilePage.clickUnfollowButton();
  await profilePage.assertFollowingState(false);
});
