import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test(`View article after following article`, async ({
  page2,
  user1,
  articleWithoutTags
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);
  const profilePage = new ProfilePage(page2);

  // Following article
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFavoriteArticleButton();

  // Assert articles appears in favorites
  await homePage.clickMyProfileLink();
  await profilePage.clickFavoritedPostsTab();
  await profilePage.assertArticleOnFavoritedPostsTabIsVisible(articleWithoutTags.title, user1.username);
});