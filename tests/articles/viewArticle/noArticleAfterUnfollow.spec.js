import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

let viewArticlePage;
let homePage;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  viewArticlePage = new ViewArticlePage(page2);
  homePage = new HomePage(page2);
});

test('User can see other user\'s new articles in' +
  ' "Your Feed" after following their profile.',
  async ({ articleWithoutTags, }) => {
    await viewArticlePage.open(articleWithoutTags.url);
    await viewArticlePage.clickFollowArticleButton();
    await viewArticlePage.clickUnfollowArticleButton();
    await homePage.open();
    await homePage.clickYourFeedTab();

    await homePage.assertArticleTitleIsNotVisible(articleWithoutTags.title);
  });
