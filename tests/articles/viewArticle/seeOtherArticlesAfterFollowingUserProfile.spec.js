import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

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
  },
);

test(`See other user's new articles in "Your Feed" after following their profile.`, async ({
  page2,
  user1,
  articleWithoutTags,
  updatedArticleWithoutTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);
  await viewArticlePage.open(articleWithoutTags.url);
  await viewArticlePage.clickFollowUserButton(user1.username);

  const homePage = new HomePage(page2);
  await homePage.clickHomeLink();
  await homePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  await homePage.assertArticleTitleIsVisible(updatedArticleWithoutTags.title);
});
