import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('See another user new article in Your Feed after following their profile',
     async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
  secondArticleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.clickFollowAuthorButton(user1.username);
  await viewArticlePage.assertUnfollowAuthorButtonIsVisible(user1.username);

  await createArticle(page1, secondArticleWithoutTags);

  await page2.goto('/');
  await homePage.clickYourFeedTab();

  await homePage.assertArticleTitleIsVisible(secondArticleWithoutTags.title);
});
