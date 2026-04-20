import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle'


test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
});

test(`User can see own article in "Global feed" when not logged in`, async ({
  page1, user1, articleWithoutTags
}) => {
  const homePage = new HomePage(page1);
  const settingsPage = new SettingsPage(page1);
  const viewArticlePage = new ViewArticlePage(page1);

  await homePage.clickOnSettingseButon();
  await settingsPage.clickOnLogoutButon();
  await homePage.clickGlobalFeedTab();
  await homePage.clickFirstAricleGlobalFeed();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});