import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2 }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
});

test('Follow the article created by another user.', async ({
  page1,
  user1,
  page2,
  articleWithoutTags,
}) => {
  await createArticle(page1, articleWithoutTags);

  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  await viewArticlePage.clickFollow();
  await viewArticlePage.clickUnfollow();
  await viewArticlePage.assertUserUnfollowed();

  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.asserArticleIsHidden(articleWithoutTags.title);
});
