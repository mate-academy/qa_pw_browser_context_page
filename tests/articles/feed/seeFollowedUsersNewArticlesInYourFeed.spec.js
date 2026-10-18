import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(new SignUpPage(page1), new HomePage(page1), user1);
  await signUpUser(new SignUpPage(page2), new HomePage(page2), user2);

  await createArticle(page2, articleWithoutTags);
});

test.beforeEach(async ({ profilePage, user2 }) => {
  await followAuthor(profilePage, user2.username.toLowerCase());
});

test('See followed user\'s articles in your feed', async ({
  user2,
  articleWithoutTags,
  homePage,
}) => {
  await openYourFeed(homePage);
  await homePage.assertArticleWithAuthorIsVisible(
    articleWithoutTags.title,
    user2.username.toLowerCase(),
  );
});

test('Do not see unfollowed user\'s articles in your feed', async ({
  articleWithoutTags,
  profilePage,
  homePage,
}) => {
  await profilePage.clickUnfollowButton();
  await profilePage.assertFollowButtonIsVisible();

  await openYourFeed(homePage);
  await homePage.assertArticleIsHidden(articleWithoutTags.title);
});

async function followAuthor(profilePage, username) {
  await profilePage.open(username);
  await profilePage.assertFollowButtonIsVisible();
  await profilePage.clickFollowButton();
  await profilePage.assertFollowButtonChangesToUnfollow();
  await profilePage.reload();
  await profilePage.assertUnfollowButtonIsVisible();
}

async function openYourFeed(homePage) {
  await homePage.open();
  await homePage.clickYourFeedTab();
}
