import { expect } from '@playwright/test';
import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

test('User can see own article in "Global Feed" when not logged in', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage2 = new HomePage(page2);
  await homePage2.open();

  await homePage2.assertArticleIsVisible(articleWithoutTags.title);
});
