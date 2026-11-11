import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { followArticleAuthor } from '../../../src/ui/actions/articles/followArticleAuthor';


test.describe('Your Feed functionality', () => {
  test.beforeEach(
    async ({ page1, page2, user1, user2, articleWithoutTags }) => {
      await signUpUser(page1, user1);
      await signUpUser(page2, user2);

      await createArticle(page1, articleWithoutTags);
    },
  );

  test('Display new articles from a followed author', async ({
    page2,
    user1,
    articleWithoutTags,
    page1,
    logger,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const homePage2 = new HomePage(page2);

    await followArticleAuthor(page2, articleWithoutTags.title, user1.username);
    const newArticle = generateNewArticleData(logger);
    const secondArticle = await createArticle(page1, newArticle);
    await viewArticlePage.clickLogoLing();
    await homePage2.assertYourFeedTabIsActive();
    await page2.reload();
    await homePage2.assertArticleIsVisible(secondArticle.title);
  });

  test('Hide articles after unfollowing an author', async ({
    page2,
    user1,
    articleWithoutTags,
  }) => {
    const viewArticlePage = new ViewArticlePage(page2);
    const homePage2 = new HomePage(page2);

    await followArticleAuthor(page2, articleWithoutTags.title, user1.username);
    await viewArticlePage.clickLogoLing();
    await homePage2.assertYourFeedTabIsActive();
    await page2.reload();
    await homePage2.assertArticleIsVisible(articleWithoutTags.title);
    await homePage2.clickArticleByTitle(articleWithoutTags.title);
    await page2.reload();
    await viewArticlePage.clickUnfollowAuthorButton(user1.username);
    await viewArticlePage.assertAuthorIsUnfollowed(user1.username);
    await viewArticlePage.clickLogoLing();
    await homePage2.assertYourFeedTabIsActive();
    await page2.reload();
    await homePage2.assertArticleIsNotVisible(articleWithoutTags.title);
  });
});
