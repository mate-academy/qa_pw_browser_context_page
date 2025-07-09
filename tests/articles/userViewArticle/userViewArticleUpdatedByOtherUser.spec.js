import { test } from '../../_fixtures/fixtures'
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser'
import { createArticle } from '../../../src/ui/actions/articles/createArticle'
import { HomePage } from '../../../src/ui/pages/HomePage'
import { updateArticle } from '../../../src/ui/actions/articles/updateArticle'


let homePage;
let article;
let newArticleDataForUpdate;

test.beforeEach(async ({ 
    page1, 
    page2, 
    user1, 
    user2, 
    articleWithoutTags, 
    articleWithOneTag,

  }) => {

    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    article = await createArticle(page1, articleWithoutTags);
    newArticleDataForUpdate = articleWithOneTag;
    await updateArticle(page1, newArticleDataForUpdate);
    homePage = new HomePage(page2);

});

test(
  'User can view an article updated by another user', 
  async ({ viewArticlePage }) => {
    
    await homePage.clickGlobalFeedTab();
    await homePage.assertArticleVisibleInGlobalFeed(
      newArticleDataForUpdate.title
    );
    await homePage.clickArticleFromGlobalFeedList(
      newArticleDataForUpdate.title
    );
    await viewArticlePage.assertArticleLinkEqualTo(
      article.url
    );
    
});