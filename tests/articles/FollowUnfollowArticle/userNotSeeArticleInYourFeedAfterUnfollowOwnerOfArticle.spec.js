import { test } from '../../_fixtures/fixtures'
import { createArticle } from '../../../src/ui/actions/articles/createArticle'
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser'
import { openArticlePage } from '../../../src/ui/actions/articles/openArticlePage'
import { HomePage } from '../../../src/ui/pages/HomePage'
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage'


let homePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ user1, user2, page1, page2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  article = await createArticle(page1, articleWithoutTags);
  await openArticlePage(page2, article.url);

  homePage = new HomePage(page2);
  viewArticlePage = new ViewArticlePage(page2);
});

test(
  `User can see other user's new articles in 
  "Your Feed" after following their profile.`,
  async ({page2}) => {
    
    await viewArticlePage.clickFollowButton();
    await viewArticlePage.assertUnfollowButtonIsVisible();
    await homePage.open();
    await homePage.assertArticleVisibleInYourFeed(article.title);
    await openArticlePage(page2, article.url);
    await viewArticlePage.clickUnfollowButton();
    await viewArticlePage.assertFollowButtonIsVisible();
    await homePage.open();
    await homePage.assertArticleToBeHiddenInYourFeed(article.title);

  }
);
