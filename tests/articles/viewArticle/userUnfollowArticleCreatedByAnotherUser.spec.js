import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can unfollow the article created by another user.', async ({
  page2,
  user1,
  
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);


  await homePage.openGlobalFeed();
  
  await expect(homePage.page.getByRole('link', { name: articleWithoutTags.title })).toBeVisible();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTextIsVisible(articleWithoutTags.description);
  await homePage.assertArticleAuthorNameIsVisible(user1.username);
  await homePage.clickFollowButtonOnGlobalFeed();
  await homePage.clickFollowButtonOnGlobalFeed();
  await homePage.assertFollowCounterIsZero();

});