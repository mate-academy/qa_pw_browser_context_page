import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(
  async ({
    page,
    page2,
    user,
    user2,
    articleWithOneTag,
    articleWithTwoTags,
  }) => {
    await signUpUser(page, user);
    await signUpUser(page2, user2);

    await createArticle(page, articleWithOneTag);
    await createArticle(page, articleWithTwoTags);
  },
);

test(`User can see other user's new articles in "Your Feed" after following their profile.`, async ({
  page2,
  user,
  articleWithOneTag,
  articleWithTwoTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertFollowButtonIsVisible(user.username);

  await viewArticlePage.clickFollowButton(user.username);

  await viewArticlePage.assertUnfollowButtonIsVisible(user.username);

  const homePage = new HomePage(page2);

  await homePage.open();

  await homePage.assertArticleIsVisibleInYourlFeed(articleWithOneTag.title);
  await homePage.assertArticleIsVisibleInYourlFeed(articleWithTwoTags.title);
});
