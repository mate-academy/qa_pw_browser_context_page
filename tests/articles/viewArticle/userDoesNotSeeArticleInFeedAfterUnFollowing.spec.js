import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

let homePage2;
let viewArticlePage2;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  homePage2 = new HomePage(page2);
  viewArticlePage2 = new ViewArticlePage(page2);

  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  await homePage2.clickGlobalFeedTab();
  await homePage2.clickOnArticleWithTitle(articleWithoutTags.title);
  await viewArticlePage2.clickFollowAuthorButton(user1.username);
});

test('UnFollow user from article and check non-visibility in the feed', async ({
  user1,
  articleWithoutTags,
}) => {
  await viewArticlePage2.clickUnfollowAuthorButton(user1.username);

  await homePage2.open();
  await homePage2.clickYourFeedTab();
  await homePage2.assertArticleTitleIsNotVisible(articleWithoutTags.title);
});
