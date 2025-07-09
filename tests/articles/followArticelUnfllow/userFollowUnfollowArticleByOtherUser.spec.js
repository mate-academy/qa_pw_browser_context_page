import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle'
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser'
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage'


const UNFAVORITE_BUTTON_STATE = 'unfavorite';
const FAVORITE_BUTTON_STATE = 'favorite';

test.describe('Follow and Unfollow positive tests', () => {

  let article;
  let viewArticlePage;

  test.beforeEach(async (
    { page1, page2, user1, user2, articleWithoutTags }) => {

      await signUpUser(page1, user1);
      await signUpUser(page2, user2);

      article = await createArticle(page1, articleWithoutTags);
      viewArticlePage = new ViewArticlePage(page2);
  });


  test('User can follow the article created by another user', async ({}) =>{
    
    await viewArticlePage.open(article.url);
    await viewArticlePage.clickFavoriteButton();
    await viewArticlePage.assertButtonStateUnfavoriteFavoriteIsVisible(
      UNFAVORITE_BUTTON_STATE
    );
  
  });

  test('User can unfollow the article created by another user.', async ({}) => {
      await viewArticlePage.open(article.url);
      await viewArticlePage.clickFavoriteButton();
          await viewArticlePage.assertButtonStateUnfavoriteFavoriteIsVisible(
      UNFAVORITE_BUTTON_STATE
    );
      await viewArticlePage.clickUnfavoriteButton();
      await viewArticlePage.assertButtonStateUnfavoriteFavoriteIsVisible(
        FAVORITE_BUTTON_STATE
      );
  });

});
