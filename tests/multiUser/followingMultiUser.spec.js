import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can see other user`s new articles in `Your Feed` after following their profile.', async ({
  page1,
  page2,
  articleWithoutTags,
  logger,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowUserButton();

  const secondArticle = generateNewArticleData(logger);
  await createArticle(page1, secondArticle);

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleTitleIsVisible(secondArticle.title);
});

test('User does not see other user articles in Your Feed after unfollowing their profile', async ({
  page1,
  page2,
  articleWithoutTags,
  logger,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowUserButton();
  await viewArticlePage.clickFollowUserButton();

  const secondArticle = generateNewArticleData(logger);
  await createArticle(page1, secondArticle);

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleTitleIsNotVisible(secondArticle.title);
});
