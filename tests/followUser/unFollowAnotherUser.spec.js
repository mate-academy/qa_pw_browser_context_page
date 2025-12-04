import { test } from '../_fixtures/fixtures';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ 
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('Unfollow the article created by another user', async ({
  articleWithoutTags,
  page2,
  user1,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url)
  await viewArticlePage.assertArticleTitleIsVisible(
    articleWithoutTags.title
  );
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertAuthorIsFollowed(user1.username)
  await viewArticlePage.clickUnfollowButton();
  await viewArticlePage.assertAuthorIsUnfollowed(user1.username)
});

test.afterEach(async ({ page1, page2 }) => {
  await page1.context().close();
  await page2.context().close();
});
