import { test } from '../../_fixtures/fixtures'
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser'
import { createArticle } from '../../../src/ui/actions/articles/createArticle'
import { HomePage } from '../../../src/ui/pages/HomePage'


let homePage;
let article;

test.beforeEach(async ({ page1, page2, user1, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  article = await createArticle(page1, articleWithoutTags);
  homePage = new HomePage(page2);

});

test(
  'User can see own article in "Global feed" when not logged in', 
  async ({}) => {
    
    await homePage.open();
    await homePage.assertArticleVisibleInGlobalFeed(article.title);
    
});
