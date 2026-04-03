import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  const homePage = new HomePage(page2);
  const profilePage = new ProfilePage(page2);
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
  await homePage.clickGlobalFeedTab();
  await homePage.clickAuthorName(articleWithoutTags.title);
  await profilePage.clickFollowButton();
});

test('User can see other user\'s new articles in "Your Feed" after following their profile', 
  async ({ page2, articleWithoutTags, user1 }) => {
  const homePage = new HomePage(page2);
  
  await homePage.open();
  await homePage.clickYourFeedTab();

  await homePage.assertArticleAuthorNameIsVisible(articleWithoutTags.title, user1.username);
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleDescriptionIsVisible(articleWithoutTags.title, articleWithoutTags.description);
});
