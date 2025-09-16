import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article created by another user in Global Feed', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await homePage.clickGlobalFeedTab();
  const username = user1.username;
  await homePage.assertArticleTitleContainsText(
    username,
    0,
    articleWithoutTags.title,
  );
  await homePage.assertArticleDescriptionContainsText(
    username,
    0,
    articleWithoutTags.description,
  );
});
