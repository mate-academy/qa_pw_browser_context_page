import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

});

test('Follow an article created by another user', async ({ page2, user1, articleWithoutTags }) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertFollowButtonIsVisible(user1.username);
  await viewArticlePage.clickFollowButton(user1.username);
  await viewArticlePage.assertUnfollowButtonIsVisible(user1.username);

});
