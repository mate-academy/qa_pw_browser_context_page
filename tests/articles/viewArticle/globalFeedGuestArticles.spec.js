import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';

let homePage;

test.beforeEach(async ({ page1, page2, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);

  homePage = new HomePage(page2);
  await page2.goto('/');
});

test('User can see own article in "Global feed" when not logged in', async ({
  user,
  articleWithoutTags,
}) => {
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorNameIsVisible(user.username);
});
