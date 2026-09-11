import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test("User doesn't see other users articles in 'Your Feed' after unfollowing their profile", async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(
    user1.username.toLowerCase(),
  );
  await viewArticlePage.clickFollowUserButton();
  await expect(viewArticlePage.unfollowUserButton).toBeVisible();
  await homePage.clickHomeButton();
  await page2.reload();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.assertArticleAuthorLinkInFeedIsVisible(
    user1.username.toLowerCase(),
    articleWithoutTags.title,
  );
  await homePage.assertarticleTitleHeadingInFeedIsVisible(
    articleWithoutTags.title,
  );
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.clickUnfollowUserButton();
  await expect(viewArticlePage.followUserButton).toBeVisible();
  await homePage.clickHomeButton();
  await page2.reload();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.assertarticleTitleHeadingInFeedNotVisible(
    articleWithoutTags.title,
  );
});
