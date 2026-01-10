import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);

  await signUpUser(page2, user2);
});

test('User can follow author and see the article\
   created by another user', async ({ page2, articleWithoutTags }) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertUnfollowButtonIsVisible();

  await homePage.clickHomePageButton();
  await homePage.assertYourFeedTabIsVisible();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});

test('User does not see articles in "Your Feed" after unfollowing the author', async ({
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();
  await viewArticlePage.assertUnfollowButtonIsVisible();

  await viewArticlePage.clickUnfollowButton();
  await viewArticlePage.assertFollowButtonIsVisible();

  await homePage.clickHomePageButton();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.assertArticleIsNotVisible(articleWithoutTags.title);
});
