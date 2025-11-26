import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let homePage;

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

test('View an own article when logged out', async ({
  user1,
  page2,
  articleWithoutTags,
}) => {
  homePage = new HomePage(page2);

  await test.step(`Assert the ${articleWithoutTags.title} article is visible`, async () => {
    await homePage.open();
    await homePage.assertGlobalFeedTabIsVisible();
    await homePage.clickGlobalFeedTabButton();
    await homePage.assertArticleOnGlobalFeedTabIsVisible(articleWithoutTags.title, user1.username);
  });
});