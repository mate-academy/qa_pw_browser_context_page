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

test("User can see other user's new articles in Your Feed "
  + "after following their profile", async ({
    page1,
    page2,
    user1,
    user2,
    articleWithoutTags,
    articleWithOneTag,
  }) => {
  const homePage = new HomePage(page2);
  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage2.open(articleWithoutTags.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
  await viewArticlePage2.clickOnFollowBtn();
  await viewArticlePage2.assertUnfollowBtnIsVisible();

  await createArticle(page1, articleWithOneTag);

  await homePage.open();
  await homePage.clickYourFeedTabLink();
  await homePage.assertYourFeedTabIsVisible();

  await homePage.assertArticleInFeedTabIsVisible(articleWithoutTags.title)
  await homePage.assertArticleInFeedTabIsVisible(articleWithOneTag.title)
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
  await homePage.assertUsernameIsVisible(user2.username);
});
