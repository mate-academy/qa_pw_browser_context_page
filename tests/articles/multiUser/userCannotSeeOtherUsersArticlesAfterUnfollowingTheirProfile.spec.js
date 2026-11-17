import { test } from '../../_fixtures/fixtures';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test(`User doesn't see other user's articles in 'Your Feed' after unfollowing their profile`,
  async ({ page2, user1, articleWithoutTags }) => {
    // the feed is cached on the server, waiting for it takes extra time
    test.slow();

    const profilePage = new ProfilePage(page2);
    const homePage = new HomePage(page2);

    // precondition: user2 follows user1 and sees the article in 'Your Feed'
    await profilePage.open(user1.username);
    await profilePage.clickFollowButton(user1.username);
    await profilePage.assertUnfollowButtonIsVisible(user1.username);

    await homePage.open();
    await homePage.assertArticleIsVisibleInFeed(
      'Your Feed',
      articleWithoutTags.title,
    );

    // user2 unfollows user1
    await profilePage.open(user1.username);
    await profilePage.clickUnfollowButton(user1.username);
    await profilePage.assertFollowButtonIsVisible(user1.username);

    // 'Your Feed' no longer has user1's articles
    await homePage.open();
    await homePage.assertFeedIsEmpty('Your Feed');
  });
