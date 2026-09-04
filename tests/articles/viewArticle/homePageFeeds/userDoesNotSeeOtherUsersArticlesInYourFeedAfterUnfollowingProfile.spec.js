import { createArticle } from "../../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../../src/ui/pages/article/ViewArticlePage";
import { HomePage } from "../../../../src/ui/pages/HomePage";
import { test } from "../../../_fixtures/fixtures";

let viewArticlePage;

test.beforeEach(async ({user1, user2, page1, page2, articleWithoutTags, articleWithOneTag}) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  await createArticle(page1, articleWithOneTag);
  viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickOnTheFollowUserButton(user1.username)
  await viewArticlePage.assertUnfollowUserButtonsAreVisible(user1.username)
});

test(`User doesn't see other user's articles in "Your Feed" after unfollowing their profile.`,
   async ({user1, page2, articleWithoutTags, articleWithOneTag}) => {
  const homePage = new HomePage(page2);

  await homePage.clickHomeLink();
  await homePage.assertArticlePreviewHasCorrectTitle(articleWithoutTags.url, articleWithoutTags.title);
  await homePage.assertArticlePreviewHasCorrectDescription(articleWithoutTags.url, articleWithoutTags.description);
  await homePage.assertArticlePreviewHasCorrectTitle(articleWithOneTag.url, articleWithOneTag.title);
  await homePage.assertArticlePreviewHasCorrectDescription(articleWithOneTag.url, articleWithOneTag.description);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickOnTheUnfollowUserButton(user1.username);
  await homePage.clickHomeLink();
  await homePage.assertNoArticleMessageInYourFeedTabIsVisible();
});

