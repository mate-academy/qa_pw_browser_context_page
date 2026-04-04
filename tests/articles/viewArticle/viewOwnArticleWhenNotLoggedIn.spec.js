import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

let homePage;

test.beforeEach(async ({ page1, user1, page2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await createArticle(page1, articleWithoutTags);
  homePage = new HomePage(page2);

});

test('User can see own article in "Global feed" when not logged in.',
  async ({ user2, articleWithoutTags}) => {
    await homePage.open();
    await homePage.clickGlobalFeedTab();
    await homePage.reload();

    await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await homePage.assertArticleDescriptionIsVisible(
      articleWithoutTags.description);
    await homePage.assertArticleAuthorNameIsVisible(user2.username);
  });



