import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
});

test('View own article in Global Feed when not logged in', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await homePage.open();
  await page2.reload();
  await homePage.assertGlobalFeedTabIsVisible();
  await page2.reload();
  await homePage.assertArticleIsVisibleInGlobalFeed(articleWithoutTags.title);

});



/*User signs up on page1 and creates an article
On page2 (not logged in) — navigate to home page
Check Global Feed
Assert the article is visible*/