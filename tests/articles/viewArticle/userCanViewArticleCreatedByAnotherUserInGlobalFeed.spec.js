import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can view an article created by another user in global feed', async ({ page2, articleWithoutTags, user1 }) => {
  const homePage = new HomePage(page2);

  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleAuthorNameIsVisible(articleWithoutTags.title, user1.username);
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleDescriptionIsVisible(articleWithoutTags.title, articleWithoutTags.description);
});
