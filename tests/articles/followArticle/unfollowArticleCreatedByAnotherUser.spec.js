import { test } from '../../_fixtures/fixtures';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can unfollow the article created by another user', async ({
  page2,
  user1,
}) => {
  const profilePage = new ProfilePage(page2);

  await profilePage.open(user1.username);
  await profilePage.clickFollowButton();
  await profilePage.clickFollowButton();
  await profilePage.assertFollowButtonHasText('Follow');
});