import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

});

// eslint-disable-next-line max-len
test('User can see new articles in Your Feed after following other users profile', async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  const homePage = new HomePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertFollowButtonIsVisible(user1.username);
  await viewArticlePage.clickFollowButton(user1.username);
  await viewArticlePage.assertUnfollowButtonIsVisible(user1.username);

  await homePage.open();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.clickYourFeed();

  await homePage.assertArticleInYourFeedIsVisible(articleWithoutTags.title);
  

});




/*User 1 signs up and creates article
User 2 signs up, opens User 1's article, clicks Follow
User 2 navigates to Home page
User 2 clicks "Your Feed" tab
User 2 sees User 1's article in Your Feed*/