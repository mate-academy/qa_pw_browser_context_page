import { test } from '../_fixtures/fixtures';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
});

test('User can see own article in "Global feed" when not logged in', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.clickGlobalFeedTab();
  await homePage.waitAndReload();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
});
