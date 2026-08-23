import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

// KNOWN ISSUE: newly created articles do not appear in the Global Feed list
// (even after page reload / pagination) for a noticeable period after
// creation, while the same article IS immediately accessible via its direct
// URL. This suggests the Global Feed list page uses stale server-side
// cached data (Next.js ISR) that isn't invalidated on article creation.
// Test is marked as fixme until this is confirmed/fixed on the app side.
test.fixme(
  'User can see own article in Global feed when not logged in',
  async ({ page2, articleWithoutTags }) => {
    const homePage = new HomePage(page2);

    await homePage.open();
    await homePage.clickGlobalFeedTab();
    await homePage.assertArticleIsVisibleInFeedWithPagination(
      articleWithoutTags.title,
    );
  },
);