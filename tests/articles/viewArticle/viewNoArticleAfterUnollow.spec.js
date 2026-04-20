import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';


test.beforeEach(async ({ page1, user1, page2, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test(`User can't see articles in "Your Feed" after unfollowing`, async ({
  page2, articleWithoutTags, user1
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickfollowArticleButon();
  await viewArticlePage.clickHomeButon();
  await console.log(user1.username);
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
  await homePage.clickFirstAricleGlobalFeed();
  await viewArticlePage.clickUnfollowArticleButon();
  await viewArticlePage.clickHomeButon();
  await homePage.assertNoAriclesTextIsVisible();
});