import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
});

test('User can see own article in "Global feed" when not logged in', async ({
  page1,
  page2,
  homePage,
  settingsPage,
  articleWithoutTags,
}) => {
  await homePage.clickSettingsButton();
  await settingsPage.assertLogoutButtonIsVisible();
  await settingsPage.clickLogoutButton();
  await page1.reload();
  const viewArticlePageOnPage2 = new ViewArticlePage(page2);
  await viewArticlePageOnPage2.open(articleWithoutTags.url);

  await viewArticlePageOnPage2.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );
  await viewArticlePageOnPage2.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
});
