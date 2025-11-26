import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let homePage;

test.beforeEach(async ({ page1, page2, user, articleWithoutTags }) => {
  await signUpUser(page1, user);

  await createArticle(page1, articleWithoutTags);

  homePage = new HomePage(page2);
});

test('See own article in "Global feed" when not logged in', async ({
  articleWithoutTags,
  page2,
}) => {
  await homePage.open();
  await page2.reload();
  await homePage.assertArticleIsVisibleInGlobalFeed(articleWithoutTags.title);
});
