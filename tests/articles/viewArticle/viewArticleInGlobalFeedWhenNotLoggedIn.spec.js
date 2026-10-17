import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { UserProfile } from '../../../src/ui/pages/UserProfile';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

test('See own article in "Global feed" when not logged in.', async ({
  page1,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page1);
  const userProfile = new UserProfile(page1);
  await userProfile.profileButtonClick();
  await userProfile.editProfileButtonClick();
  await userProfile.logout();
  await homePage.assertArticleTitleInGlobalFeed(articleWithoutTags.title);
  await homePage.assertArticleAuthor(user1.username);
});
