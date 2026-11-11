import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);

  await createArticle(page1, articleWithoutTags);
});

test('View own article in "Global Feed" without authorization', async ({
  page2,
  user,
  articleWithoutTags,
}) => {
  const viewArticlePage2 = new ViewArticlePage(page2);
  const homePage2 = new HomePage(page2);

  await homePage2.open();

  await homePage2.assertSignInLinkIsVisible();
  await expect
    .poll(
      async () => {
        await page2.reload();

        return await homePage2
          .findArticleByTitle(articleWithoutTags.title)
          .count();
      },
      {
        timeout: 20000,
        intervals: [1000, 2000, 3000],
      },
    )
    .toBeGreaterThan(0);
  await homePage2.clickArticleByTitle(articleWithoutTags.title);
  await expect(page2).toHaveURL(/article/);
  await viewArticlePage2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user.username);
});
