import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ProfilePage } from '../../src/ui/pages/auth/ProfilePage';
import { HomePage } from '../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2 }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
});

test('Followed user’s new article appears in "Your Feed"', async ({
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const profilePage = new ProfilePage(page2);
  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.openGlobalFeed();
  await homePage.openAuthorProfile(user1.username);
  await profilePage.clickFollowButton();

  await createArticle(page1, articleWithoutTags);

  await homePage.openYourFeed();
  await homePage.assertArticleVisible(articleWithoutTags.title);
});

test('Unfollowed user’s new article does not appear in "Your Feed"', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const profilePage = new ProfilePage(page2);

  await homePage.open();
  await homePage.openGlobalFeed();
  await homePage.openAuthorProfile(user1.username);
  await profilePage.clickUnfollowButton();

  const newArticle = { ...articleWithoutTags, title: 'Unseen Article' };
  await createArticle(page1, newArticle);

  await homePage.openYourFeed();
  await homePage.assertArticleNotVisible(newArticle.title);
});
