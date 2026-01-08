import { test } from '../../_fixtures/fixtures';
import { expect as test_expect } from '@playwright/test';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User doesn\'t see other user\'s articles in "Your Feed" after unfollowing their profile', async ({
  page2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowButton();

  await homePage.open();
  await homePage.clickYourFeedTab();
  await homePage.assertArticleIsVisible(articleWithoutTags.title);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickUnfollowButton();

  await homePage.open();
  await page2.waitForLoadState('networkidle');
  await homePage.clickYourFeedTab();
  await page2.waitForTimeout(1000);
  
  const noArticlesMessage = page2.getByText('No articles are here... yet.');
  await test_expect(noArticlesMessage).toBeVisible();
});
