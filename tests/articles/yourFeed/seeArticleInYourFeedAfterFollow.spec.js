import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

const testTitle =
  'User can see other user\'s new articles in "Your Feed" after following';

test(testTitle, async ({ page1, page2, articleWithoutTags, logger }) => {
  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.clickFollowButton();

  const newArticle = generateNewArticleData(logger);

  await createArticle(page1, newArticle);

  const homePage2 = new HomePage(page2);

  await homePage2.open();
  await homePage2.clickYourFeedTab();
  await homePage2.assertArticleIsVisibleInFeed(newArticle.title);
});
