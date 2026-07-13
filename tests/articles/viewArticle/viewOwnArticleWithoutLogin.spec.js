import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page, user, articleWithoutTags }) => {
  await test.step('Register user and create article', async () => {
    await signUpUser(page, user);

    await createArticle(page, articleWithoutTags);
  });
});

test('User can see own article in Global feed when not logged in', async ({
  homePage2,
  user,
  page2,
}) => {
  await test.step('Open Global feed as unauthenticated user', async () => {
    await homePage2.open();
  });

  await test.step('Assert article is visible in Global feed', async () => {
    await expect(async () => {
      await page2.reload();
      await homePage2.assertArticleAuthorIsVisibleInGlobalFeed(user.username);
    }).toPass({ timeout: 20000 });
  });
});
