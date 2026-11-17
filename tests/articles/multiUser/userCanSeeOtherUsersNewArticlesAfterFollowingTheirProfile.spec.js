import { test } from '../../_fixtures/fixtures';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2 }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
});

test(`User can see other user's new articles in 'Your Feed' after following their profile`,
  async ({ page1, page2, user1, articleWithoutTags }) => {
    // the feed is cached on the server, waiting for it takes extra time
    test.slow();

    // user2 follows user1 on the profile page
    const profilePage = new ProfilePage(page2);

    await profilePage.open(user1.username);
    await profilePage.clickFollowButton(user1.username);
    await profilePage.assertUnfollowButtonIsVisible(user1.username);

    // user1 publishes a new article
    await createArticle(page1, articleWithoutTags);

    // user2 sees the new article in 'Your Feed'
    const homePage = new HomePage(page2);

    await homePage.open();
    await homePage.assertArticleIsVisibleInFeed(
      'Your Feed',
      articleWithoutTags.title,
    );
  });
