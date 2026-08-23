import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

const testTitle =
  'User doesn\'t see other user\'s articles in "Your Feed" after unfollowing';

test(testTitle, async ({ page2, user1, articleWithoutTags }) => {
  const profilePage = new ProfilePage(page2);

  await profilePage.open(user1.username);
  await profilePage.clickFollowButton();
  await profilePage.clickFollowButton();

  const homePage2 = new HomePage(page2);

  await homePage2.open();
  await homePage2.clickYourFeedTab();
  await homePage2.assertArticleIsHiddenInFeed(articleWithoutTags.title);
});