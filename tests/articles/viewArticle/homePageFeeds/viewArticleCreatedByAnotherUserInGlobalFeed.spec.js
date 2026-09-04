import { createArticle } from "../../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../../src/ui/pages/article/ViewArticlePage";
import { HomePage } from "../../../../src/ui/pages/HomePage";
import { test } from "../../../_fixtures/fixtures";

test.beforeEach(async ({page1, page2, user1, user2, articleWithoutTags}) =>{
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user in the Global Feed', async({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const expectedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  await homePage.assertYourFeedTabIsVisible()
  await homePage.clickOnGlobalFeedTab()
  await homePage.asserArticlePreviewHasCorectTitle(articleWithoutTags.url, articleWithoutTags.title);
  await homePage.asserArticlePreviewHasCorectDescription(articleWithoutTags.url, articleWithoutTags.description);
  await homePage.asserArticlePreviewHasCorectUserName(articleWithoutTags.url, user1.username);
  await homePage.asserArticlePreviewHasCorectDate(articleWithoutTags.url, expectedDate);
})