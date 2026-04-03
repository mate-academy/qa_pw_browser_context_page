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

test('User doesn\'t see other user\'s new articles in "Your Feed" after following their profile', 
  async ({ page2, articleWithoutTags }) => {
  const homePage = new HomePage(page2);
  const profilePage = new ProfilePage(page2);

  await page2.reload({ waitUntil: 'domcontentloaded' });
  await profilePage.clickUnfollowButton();

  await homePage.open();
  await homePage.clickYourFeedTab();

  await homePage.assertArticleBlockIsHidden(articleWithoutTags.title);
  await homePage.assertArticleAuthorNameIsHidden(articleWithoutTags.title);
});
