import { test } from '../_fixtures/fixtures';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can see other user\'s new articles in "Your Feed" after following their profile', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  await viewArticlePage.clickFollowButton(user1.username);
  await viewArticlePage.assertAuthorIsFollowed(user1.username);

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
});
