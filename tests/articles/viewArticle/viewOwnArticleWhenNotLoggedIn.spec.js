import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
  await expect(page1).toHaveURL(/\/article\//);
});

test('User can see own article in "Global feed" when not logged in', async ({
  page2,
  articleWithoutTags
}) => {
  const homePageUser2 = new HomePage(page2);

  await homePageUser2.open();

  await expect(async () => {
  await homePageUser2.reload();
  await homePageUser2.assertArticleIsVisibleInFeed(articleWithoutTags.title);
}).toPass({ timeout: 20000 });
});
