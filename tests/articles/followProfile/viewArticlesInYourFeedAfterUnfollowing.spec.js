import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test("User doesn't see other user articles in 'Your Feed' after unfollowing their profile", async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage2 = new HomePage(page2);
  const viewArticlePage2 = new ViewArticlePage(page2);

  await homePage2.assertYourFeedTabIsVisible();
  await homePage2.clickGlobalFeedTab();
  await homePage2.clickArticleByTitle(articleWithoutTags.title);

  await viewArticlePage2.clickFollowButton();
  await viewArticlePage2.clickUnfollowButton(user1.username);

  await homePage2.clickHomeLink();
  await homePage2.assertYourFeedTabIsVisible();

  await homePage2.clickYourFeedTab();
  await homePage2.assertArticleIsNotVisible(articleWithoutTags.title);
});
