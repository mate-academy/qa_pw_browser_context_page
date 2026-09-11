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

test('User can follow the article created by another user', async ({
  page2,
  user2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const myProfilePage = new MyProfilePage(page2, user2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(
    user1.username.toLowerCase(),
  );
  await viewArticlePage.clickFavoriteArticleButton();
  await myProfilePage.clickMyProfileButton();
  await myProfilePage.clickFavoritedPostsButton();
  await myProfilePage.assertArticleTitleIsVisible(articleWithoutTags.title);
});
