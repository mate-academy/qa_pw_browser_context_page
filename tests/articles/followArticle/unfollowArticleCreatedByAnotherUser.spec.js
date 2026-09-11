import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { MyProfilePage } from '../../../src/ui/pages/auth/MyProfilePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('User can unfollow the article created by another user.', async ({
  page2,
  user2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePageOnPage2 = new ViewArticlePage(page2);
  const myProfilePageOnPage2 = new MyProfilePage(page2, user2);

  await viewArticlePageOnPage2.open(articleWithoutTags.url);

  await viewArticlePageOnPage2.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );
  await viewArticlePageOnPage2.assertArticleTextIsVisible(
    articleWithoutTags.text,
  );
  await viewArticlePageOnPage2.assertArticleAuthorNameIsVisible(
    user1.username.toLowerCase(),
  );
  await viewArticlePageOnPage2.clickFavoriteArticleButton();
  await myProfilePageOnPage2.clickMyProfileButton();
  await myProfilePageOnPage2.clickFavoritedPostsButton();
  await myProfilePageOnPage2.assertArticleTitleIsVisible(
    articleWithoutTags.title,
  );
  await myProfilePageOnPage2.clickUnfollowButton();
  await page2.reload();
  await myProfilePageOnPage2.assertArticleTitleIsNotVisible(
    articleWithoutTags.title,
  );
});
