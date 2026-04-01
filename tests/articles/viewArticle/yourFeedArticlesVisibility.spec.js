import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

let homePage;
let viewArticlePage;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test.describe(`Article visibility in 'Your Feed'`, () => {
  test(`View newly created articles by another user in “Your Feed”
     after following them`, async ({
    page1,
    page2,
    user1,
    articleWithoutTags,
    articleWithOneTag,
  }) => {
    viewArticlePage = new ViewArticlePage(page2);
    homePage = new HomePage(page2);
    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.followUserArticle(user1.username);
    await viewArticlePage.assertArticleFollowed(user1.username);

    await createArticle(page1, articleWithOneTag);

    await page2.goto('/', { waitUntil: 'commit' });
    await homePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await homePage.assertArticleAuthorNameIsVisible(user1.username);
  });

  test(`No articles created by another user appear in “Your Feed”
     after unfollowing them'`, async ({
    page1,
    page2,
    user1,
    articleWithoutTags,
    articleWithOneTag,
  }) => {
    viewArticlePage = new ViewArticlePage(page2);
    homePage = new HomePage(page2);
    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.followUserArticle(user1.username);
    await viewArticlePage.assertArticleFollowed(user1.username);

    await createArticle(page1, articleWithOneTag);

    await page2.goto('/', { waitUntil: 'commit' });
    await homePage.assertArticleTitleIsVisible(articleWithOneTag.title);
    await homePage.assertArticleAuthorNameIsVisible(user1.username);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.unfollowUserArticle(user1.username);
    await viewArticlePage.assertArticleUnfollowed(user1.username);

    await page2.goto('/', { waitUntil: 'commit' });
    await homePage.assertNoArticlesInYourFeed();
  });
});
