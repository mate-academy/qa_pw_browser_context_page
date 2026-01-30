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

test('User can follow the article created by another user', async ({
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await homePage.clickGlobalFeedTabLink()
  await homePage.assertArticleInFeedTabIsVisible(articleWithoutTags.title)
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
  await homePage.assertUsernameIsVisible(user2.username);
  await homePage.clickOnArticle(articleWithoutTags.title);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  await viewArticlePage.clickOnFollowBtn();
  await viewArticlePage.assertUnfollowBtnIsVisible();
  await homePage.assertUsernameIsVisible(user2.username);
});
