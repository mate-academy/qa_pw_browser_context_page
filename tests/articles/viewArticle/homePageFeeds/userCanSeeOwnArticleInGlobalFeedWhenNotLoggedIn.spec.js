import { createArticle } from "../../../../src/ui/actions/articles/createArticle";
import { signUpUser } from "../../../../src/ui/actions/auth/signUpUser";
import { ViewArticlePage } from "../../../../src/ui/pages/article/ViewArticlePage";
import { HomePage } from "../../../../src/ui/pages/HomePage";
import { test} from "../../../_fixtures/fixtures";
import { expect } from "@playwright/test";

test.beforeEach(async ({page1, page2, user1, user2, articleWithoutTags}) =>{
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
  await page1.waitForLoadState('networkidle');
});

test('User can see own article in "Global feed" when not logged in', async({
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

  await homePage.open();

  await expect(async () => {
    await homePage.page.reload();
    
    const articlePreviewTitle = homePage.page.getByRole('heading', { name: articleWithoutTags.title });
    await expect(articlePreviewTitle).toBeVisible();
  }).toPass({ 
    timeout: 20000, 
    intervals: [2000]
  });
  await homePage.asserArticlePreviewHasCorectTitle(articleWithoutTags.url, articleWithoutTags.title);
  await homePage.asserArticlePreviewHasCorectDescription(articleWithoutTags.url, articleWithoutTags.description);
  await homePage.asserArticlePreviewHasCorectUserName(articleWithoutTags.url, user1.username);
  await homePage.asserArticlePreviewHasCorectDate(articleWithoutTags.url, expectedDate);
})