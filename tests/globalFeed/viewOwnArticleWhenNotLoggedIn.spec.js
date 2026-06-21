import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { expect } from '@playwright/test';

test('View own article in Global feed when not logged in', async ({
  page1,
  page2,
  user,
  articleWithoutTags,
}) => {
  const createdArticle = {
    ...articleWithoutTags,
    title: `My article ${Date.now()} in Global feed`,
  };

  await signUpUser(page1, user);
  await createArticle(page1, createdArticle);

  await page2.goto('/');

  await expect(
    page2.getByRole('link', { name: createdArticle.title }),
  ).toBeVisible();

  await expect(page2.getByRole('link', { name: user.username })).toBeVisible();
});
