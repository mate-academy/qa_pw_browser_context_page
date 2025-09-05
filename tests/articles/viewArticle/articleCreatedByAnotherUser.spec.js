import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.describe('An article created by another user', () => {
  test.beforeEach(
    async ({ page1, page2, user1, user2, articleWithoutTags }) => {
      await signUpUser(page1, user1);
      await signUpUser(page2, user2);

      await createArticle(page1, articleWithoutTags);
    },
  );

  test('View an article created by another user in the Global Feed', async ({
    page2,
    articleWithoutTags,
  }) => {
    const homePage = new HomePage(page2);

    await homePage.clickGlobalFeedTab();
    await homePage.assertArticleIsVisibleInGlobalFeed(articleWithoutTags.title);
  });

  test('Follow the article created by another user', async ({
    page2,
    articleWithoutTags,
  }) => {
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page2);

    await homePage.clickGlobalFeedTab();
    await homePage.clickReadMoreLinkInArticlePreview(articleWithoutTags.title);

    await viewArticlePage.clickFollowButton();
    await viewArticlePage.assertUnfollowButtonIsVisible();
    await viewArticlePage.clickHomeLink();
    await page2.reload();

    await homePage.assertArticleIsVisibleInYourFeed(articleWithoutTags.title);
  });

  test('Unfollow the article created by another user', async ({
    page2,
    articleWithoutTags,
  }) => {
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page2);

    await homePage.clickGlobalFeedTab();
    await homePage.clickReadMoreLinkInArticlePreview(articleWithoutTags.title);

    await viewArticlePage.clickFollowButton();
    await viewArticlePage.clickHomeLink();
    await page2.reload();

    await homePage.clickReadMoreLinkInArticlePreview(articleWithoutTags.title);

    await viewArticlePage.clickUnfollowButton();
    await viewArticlePage.assertFollowButtonIsVisible();
  });

  test('View an article updated by another user', async ({
    page1,
    page2,
    articleWithoutTags,
    logger,
  }) => {
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page1);
    const editArticlePage = new EditArticlePage(page1);
    const newArticle = generateNewArticleData(logger);

    await homePage.clickGlobalFeedTab();
    await homePage.assertArticleIsVisibleInGlobalFeed(articleWithoutTags.title);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTitleField(newArticle.title);
    await editArticlePage.clickUpdateArticleButton();

    await page2.reload();
    await homePage.clickGlobalFeedTab();
    await homePage.assertArticleIsVisibleInGlobalFeed(newArticle.title);
  });
  test(`View other user's new articles in "Your Feed" after following their profile`, async ({
    page1,
    page2,
    articleWithoutTags,
    logger,
  }) => {
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page2);
    const newArticle = generateNewArticleData(logger);

    await homePage.clickGlobalFeedTab();
    await homePage.clickReadMoreLinkInArticlePreview(articleWithoutTags.title);

    await viewArticlePage.clickFollowButton();
    await viewArticlePage.assertUnfollowButtonIsVisible();
    await viewArticlePage.clickHomeLink();
    await page2.reload();

    await homePage.assertArticleIsVisibleInYourFeed(articleWithoutTags.title);

    await createArticle(page1, newArticle);

    await page2.reload();
    await homePage.assertArticleIsVisibleInYourFeed(newArticle.title);
  });
  test(`Doesn't see other user's new articles in "Your Feed" after unfollowing their profile`, async ({
    page2,
    articleWithoutTags,
  }) => {
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page2);

    await homePage.clickGlobalFeedTab();
    await homePage.clickReadMoreLinkInArticlePreview(articleWithoutTags.title);

    await viewArticlePage.clickFollowButton();
    await viewArticlePage.assertUnfollowButtonIsVisible();
    await viewArticlePage.clickHomeLink();
    await page2.reload();

    await homePage.assertArticleIsVisibleInYourFeed(articleWithoutTags.title);
    await homePage.clickReadMoreLinkInArticlePreview(articleWithoutTags.title);

    await viewArticlePage.clickUnfollowButton();
    await viewArticlePage.assertFollowButtonIsVisible();
    await viewArticlePage.clickHomeLink();

    await page2.reload();
    await homePage.assertArticleIsNotVisibleInYourFeed(
      articleWithoutTags.title,
    );
  });
});
