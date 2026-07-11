import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, page2, user, user2, articleWithoutTags }) => {
  await signUpUser(page, user);
  
  await signUpUser(page2, user2);

  await createArticle(page, articleWithoutTags);
});

test('User can unfollow the article created by another user', async ({
  page2,
  user,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton(user.username);
  
  await viewArticlePage.assertUnfollowButtonIsVisible(user.username);

  await viewArticlePage.clickUnfollowButton(user.username);

  await viewArticlePage.assertFollowButtonIsVisible(user.username);
});
