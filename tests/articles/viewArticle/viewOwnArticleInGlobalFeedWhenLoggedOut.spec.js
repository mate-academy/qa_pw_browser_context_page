import { expect } from '@playwright/test';
import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test('See own article in Global Feed when not logged in', async ({
  page1,
  page2,
  user,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);

  await page2.goto('/');
  await homePage.clickGlobalFeedTab();

  await expect
    .poll(
      async () => {
        await page2.reload();

        return homePage.articleTitle(articleWithoutTags.title).isVisible();
      },
      {
        timeout: 15000,
        intervals: [1000],
      },
    )
    .toBe(true);

  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
