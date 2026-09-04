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
  viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickOnTheFollowUserButton(user1.username)

  await createArticle(page1, articleWithOneTag);
})

test(`User can see other user's new articles in "Your Feed" after following their profile`,
   async ({user1, page2, articleWithoutTags, articleWithOneTag}) => {
  const homePage = new HomePage(page2);
  const expectedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  await homePage.clickHomeLink()
  await homePage.asserArticlePreviewHasCorectTitle(articleWithoutTags.url, articleWithoutTags.title);
  await homePage.asserArticlePreviewHasCorectDescription(articleWithoutTags.url, articleWithoutTags.description);
  await homePage.asserArticlePreviewHasCorectUserName(articleWithoutTags.url, user1.username);
  await homePage.asserArticlePreviewHasCorectDate(articleWithoutTags.url, expectedDate);
  await homePage.asserArticlePreviewHasCorectTitle(articleWithOneTag.url, articleWithOneTag.title);
  await homePage.asserArticlePreviewHasCorectDescription(articleWithOneTag.url, articleWithOneTag.description);
  await homePage.asserArticlePreviewHasCorectUserName(articleWithOneTag.url, user1.username);
  await homePage.asserArticlePreviewHasCorectDate(articleWithOneTag.url, expectedDate);
})

