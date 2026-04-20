import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';


test.beforeEach(async ({ page1, user1, page2, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can unfollow the article created by another user', async ({
  page2, articleWithoutTags
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickfollowArticleButon();
  await viewArticlePage.clickUnfollowArticleButon();
  await viewArticlePage.assertfollowArticleButonIsVisible();
});