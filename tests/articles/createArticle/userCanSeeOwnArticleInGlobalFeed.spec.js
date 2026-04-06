import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
  const homePage = new HomePage(page1);
  await homePage.goToProfileSettings();
  await homePage.clickLogoutButton();
});

test('User can see own article in global feed', async ({
  page1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page1);
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
