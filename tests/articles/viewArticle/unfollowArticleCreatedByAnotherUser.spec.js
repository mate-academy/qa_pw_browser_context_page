/* eslint-disable max-len */
import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ProfilePage } from '../../../src/ui/pages/profile/ProfilePage';
import { Favorites } from '../../../src/ui/pages/profile/Favorites';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('Follow the article created by another user', async ({
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const profilePage = new ProfilePage(page2);
  const favoritesPage = new Favorites(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);

  await viewArticlePage.followArticle();
  await viewArticlePage.assertUnfollowButtonIsVisible();

  await viewArticlePage.goToProfile();
  await profilePage.assertProfileIsVisible((user2.username).toLowerCase());
  await profilePage.goToFavoritePosts();
  await profilePage.assertFavoritePostsTabIsSelected();
  await favoritesPage.assertArticleInFeedIsVisible(articleWithoutTags.title, user1.username);
  
  await favoritesPage.clickLikeButton();
  // await favoritesPage.assertLikeButtonDisabled();
  await favoritesPage.reload();
  await favoritesPage.assertArticleInFeedIsInvisible(articleWithoutTags.title);
});
