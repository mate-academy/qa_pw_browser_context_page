import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, page2, user, user2, articleWithoutTags }) => {
  await signUpUser(page, user);
  
  await signUpUser(page2, user2);

  await createArticle(page, articleWithoutTags);
});

test('User can view an article created by another user in the Global Feed', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleIsVisibleInGlobalFeed(articleWithoutTags.title);
});
