import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { createArticle } from '../../src/ui/actions/articles/createArticle';

const newPassword = 'Newpassword123';

test.beforeEach(async ({ 
  user1,
  page1,
  articleWithoutTags,
}) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

test('View own article in "Global Feed" when logged out', async ({
  page2,
  articleWithoutTags,
}) => {
  //Seems like a problem with the tab. Article appears only after ~10 seconds and reloading the page
  const homePage = new HomePage(page2);
  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.assertFeedContainsArticleTitle(articleWithoutTags.title);
});

test.afterEach(async ({ page1, page2 }) => {
  await page1.context().close();
  await page2.context().close();
});
