import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user', async ({
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.clickGlobalFeedTabLink()
  await homePage.assertArticleInFeedTabIsVisible(articleWithoutTags.title)
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
  await homePage.assertUsernameIsVisible(user2.username);
});
