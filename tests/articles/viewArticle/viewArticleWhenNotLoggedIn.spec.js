import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, user1 }) => {
  await signUpUser(page1, user1);
});

test('User can see own article in "Global feed" when not logged in', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
}) => {
  await createArticle(page1, articleWithoutTags);

  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeed();
  await page2.waitForTimeout(5000);
  await page2.reload();
  await page2.waitForTimeout(5000);
  await homePage.asserArticleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
});
