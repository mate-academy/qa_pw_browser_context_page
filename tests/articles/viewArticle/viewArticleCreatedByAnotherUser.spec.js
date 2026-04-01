import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let viewArticlePage;
let homePage;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test.describe('View an article created by another user', () => {
  test('View an article created by another user via direct article', async ({
    page2,
    user1,
    articleWithoutTags,
  }) => {
    viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.assertArticleAuthorNameIsVisible(user1.username);
  });

  test('View an article created by another user in the Global Feed', async ({
    page2,
    user1,
    articleWithoutTags,
  }) => {
    homePage = new HomePage(page2);

    await homePage.goToGlobalFeed();
    await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await homePage.assertArticleAuthorNameIsVisible(user1.username);
  });
});
