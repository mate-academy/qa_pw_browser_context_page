import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { NO_ARTICLE_MESSAGE } from '../../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({
    page1,
    page2,
    user1,
    user2,
    articleWithoutTags,
    updatedArticleWithoutTags,
  }) => {
    await signUpUser(page1, user1);
    await createArticle(page1, articleWithoutTags);
    await createArticle(page1, updatedArticleWithoutTags);
    await signUpUser(page2, user2);

    const viewArticlePage = new ViewArticlePage(page2);
    await viewArticlePage.open(articleWithoutTags.url);
    await viewArticlePage.clickFollowUserButton(user1.username);
  },
);

test(`Doesn't see other user's articles in "Your Feed" after unfollowing their profile.`, async ({
  page2,
  user1,
  articleWithoutTags,
  updatedArticleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.clickHomeLink();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTitleIsVisible(updatedArticleWithoutTags.title);

  const viewArticlePage = new ViewArticlePage(page2);
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickUnfollowUserButton(user1.username);
  await homePage.clickHomeLink();
  await homePage.assertYourFeedTabIsVisible();
  await homePage.assertNoArticleMessageDisplayed(NO_ARTICLE_MESSAGE);
});
