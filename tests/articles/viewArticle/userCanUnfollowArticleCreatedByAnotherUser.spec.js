import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can unfavorite an article created by another user', async ({ page2, articleWithoutTags, user1, user2 }) => {
  const homePage = new HomePage(page2);
  const profilePage = new ProfilePage(page2);

  await homePage.clickGlobalFeedTab();

  await homePage.assertArticleAuthorNameIsVisible(articleWithoutTags.title, user1.username);
  await homePage.clickLikeButton(articleWithoutTags.title);

  await profilePage.open(user2.username);
  await profilePage.assertFavoritedPostsTabIsVisible();
  await profilePage.clickFavoritedPostsTab();

  await profilePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await profilePage.assertArticleDescriptionIsVisible(articleWithoutTags.title, articleWithoutTags.description);
  await profilePage.assertArticleAuthorNameIsVisible(articleWithoutTags.title, user1.username);

  await profilePage.clickLikeButton(articleWithoutTags.title);
  await page2.reload({ waitUntil: 'domcontentloaded' });
  await profilePage.assertArticleBlockIsHidden(articleWithoutTags.title);
});
