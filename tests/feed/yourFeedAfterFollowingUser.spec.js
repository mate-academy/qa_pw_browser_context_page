import { test } from '../_fixtures/fixtures';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ProfilePage } from '../../src/ui/pages/profile/ProfilePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags, secondArticleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);
  await createArticle(page1, articleWithoutTags);

  const viewArticlePage = new ViewArticlePage(page2);
  const profilePage = new ProfilePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickAuthorLinkInArticleHeader(user1.username);
  await profilePage.assertUsernameIsVisible(user1.username);
  await profilePage.clickFollowUserButton(user1.username);
  await profilePage.assertUnfollowUserButtonIsVisible(user1.username);
  await createArticle(page1, secondArticleWithoutTags);
});

test(`See another user's new article in 'Your Feed' after following their profile`, async ({
  page2,
  secondArticleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  
  await homePage.open();

  await homePage.clickYourFeedTab();
  await homePage.assertArticlePreviewLinkIsVisible(secondArticleWithoutTags.title);
  
});