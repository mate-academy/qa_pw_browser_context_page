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

test('View an article created by another user',
  async ({ user1, articleWithoutTags, }) => {
  await viewArticlePage.open(articleWithoutTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
});

test('View an article created by another user in the Global Feed',
  async ({ user1, articleWithoutTags}) => {

    await homePage.open();
    await homePage.clickGlobalFeedTab();

    await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await homePage.assertArticleDescriptionIsVisible(
      articleWithoutTags.title, articleWithoutTags.description);
    await homePage.assertArticleAuthorNameIsVisible(articleWithoutTags.title,
      user1.username);
  });



