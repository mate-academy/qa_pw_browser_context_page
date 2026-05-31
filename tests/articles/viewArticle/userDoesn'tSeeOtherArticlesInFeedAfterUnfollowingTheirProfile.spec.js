import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  await createArticle(page1, articleWithoutTags);
});

test('User can see other users new articles in "Your Feed" after following their profile', async ({
  page2,
  user1,
  
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);


  await homePage.openGlobalFeed();
  
  await expect(homePage.page.getByRole('link', { name: articleWithoutTags.title }).first()).toBeVisible();
  await homePage.followAuthorProfile();
  await homePage.clickOnFollowButton();
  await homePage.page.waitForTimeout(1000);
  await homePage.clickOnFollowButton();
  await homePage.openYourHomeTab();
  await homePage.page.reload();
  await homePage.page.waitForTimeout(1000);
  await homePage.assertArticlePreviewIsEmpty();
});