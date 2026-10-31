import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
});

test(`View own article in 'Global Feed' when not logged in`, async ({
  page2,
  articleWithoutTags,
}) => {
  test.slow();

  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticlePreviewLinkIsVisibleAfterReload(
    articleWithoutTags.title,
  );
});
