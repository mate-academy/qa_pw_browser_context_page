import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
});

test.describe.configure({ retries: 2 });
test('User can see own article in "Global feed" when not logged in', async ({
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticleIsVisibleInGlobalFeedEventually(
    articleWithoutTags.title,
  );
});
