import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

test.beforeEach(async ({ page1, user, articleWithoutTags }) => {
  // context 1: the user signs up and publishes an article
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);
});

test(`User can see own article in 'Global Feed' when not logged in`,
  async ({ page2, user, articleWithoutTags }) => {
    // the feed is cached on the server, waiting for it takes extra time
    test.slow();

    // context 2: the same user is not logged in here
    const homePage = new HomePage(page2);
    const viewArticlePage = new ViewArticlePage(page2);

    await homePage.open();
    await homePage.assertArticleIsVisibleInFeed(
      'Global Feed',
      articleWithoutTags.title,
    );

    await homePage.clickArticleInFeed(articleWithoutTags.title);

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.assertArticleAuthorNameIsVisible(user.username);
  });
