import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

const testTitle =
  'User doesn\'t see other user\'s articles in "Your Feed" after unfollowing';

test(testTitle, async ({ page2, articleWithoutTags }) => {
  const viewArticlePage2 = new ViewArticlePage(page2);

  await viewArticlePage2.open(articleWithoutTags.url);
  await viewArticlePage2.clickFollowButton();
  await viewArticlePage2.clickFollowButton();

  const homePage2 = new HomePage(page2);

  await homePage2.open();
  await homePage2.clickYourFeedTab();
  await homePage2.assertArticleIsHiddenInFeed(articleWithoutTags.title);
});
