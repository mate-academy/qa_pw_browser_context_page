import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ProfilePage } from '../../../src/ui/pages/profile/ProfilePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test(
  "User can see other user's new articles in 'Your Feed' after following their profile", 
  async ({
  page1,
  page2,
  user1,
  user2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
    const profilePage = new ProfilePage(page2);

    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await profilePage.open(user1.username);
    await profilePage.clickFollowButton();

    const newArticle = await createArticle(page1, articleWithoutTags);

    await homePage.open();
    await homePage.clickYourFeedTab();
    await homePage.assertArticleIsVisible(newArticle.title);
  },
);
