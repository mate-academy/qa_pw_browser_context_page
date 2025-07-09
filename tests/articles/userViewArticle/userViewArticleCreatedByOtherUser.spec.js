import { test } from '../../_fixtures/fixtures'
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser'
import { createArticle } from '../../../src/ui/actions/articles/createArticle'
import { HomePage } from '../../../src/ui/pages/HomePage'

let homePage;
let article

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  article = await createArticle(page1, articleWithoutTags);
  homePage = new HomePage(page2);

});

test(
  'User can view an article created by another user in the Global Feed', 
  async ({ viewArticlePage }) => {
    await homePage.clickGlobalFeedTab();
    await homePage.assertArticleVisibleInGlobalFeed(article.title);
    await homePage.clickArticleFromGlobalFeedList(article.title);
    await viewArticlePage.assertArticleLinkEqualTo(
      article.url
    );
    
});
