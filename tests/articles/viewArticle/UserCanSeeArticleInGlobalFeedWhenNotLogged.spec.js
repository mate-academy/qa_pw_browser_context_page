import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page, user, articleWithoutTags, homePage }) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags);

  await homePage.clickSetingButton();
  await homePage.clickLogoutButton();
});

test('View an article created by another user in the Global Feed', async ({
  viewArticlePage,
  articleWithoutTags,
  page,
  user,
}) => {
  await viewArticlePage.clickInArticleLinkGlobalFeed(
    articleWithoutTags.title,
    page,
  );

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user.username);
});
