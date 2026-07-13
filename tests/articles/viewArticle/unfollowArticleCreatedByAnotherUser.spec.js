import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let article;

test.beforeEach(async ({ page, page2, user, user2, articleWithoutTags }) => {
  await signUpUser(page, user);

  await signUpUser(page2, user2);

  article = await createArticle(page, articleWithoutTags);
});

test('User can unfollow the article created by another user', async ({
  viewArticlePage2,
  user,
}) => {

  await viewArticlePage2.open(article.url);
  await viewArticlePage2.clickFollowButton(user.username);

  await viewArticlePage2.assertUnfollowButtonIsVisible(user.username);

  await viewArticlePage2.clickUnfollowButton(user.username);

  await viewArticlePage2.assertFollowButtonIsVisible(user.username);
});
