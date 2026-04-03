import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
});

test('User can see own article in "Global feed" when not logged in', async ({
  page2,
  user,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const signInPage = new SignInPage(page2);
  const settingsPage = new SettingsPage(page2);

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  
  await homePage.clickSettingsLink();
  await settingsPage.clickLogoutButton();
  
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleDescriptionIsVisible(articleWithoutTags.title, articleWithoutTags.description);
  await homePage.assertArticleAuthorNameIsVisible(articleWithoutTags.title, user.username);
});
