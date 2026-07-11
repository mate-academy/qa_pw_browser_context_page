import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let viewArticlePage;

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

    viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithOneTag.url);

    await viewArticlePage.assertFollowButtonIsVisible(user.username);

    await viewArticlePage.clickFollowButton(user.username);

    await viewArticlePage.assertUnfollowButtonIsVisible(user.username);
  },
);

test(`User doesn't see other user's articles in "Your Feed" after unfollowing their profile.`, async ({
  page2,
  user,
  articleWithOneTag,
  articleWithTwoTags,
}) => {
  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertUnfollowButtonIsVisible(user.username);

  await viewArticlePage.clickUnfollowButton(user.username);

  await viewArticlePage.assertFollowButtonIsVisible(user.username);

  const homePage = new HomePage(page2);

  await homePage.open();

  await homePage.assertArticleIsNotVisibleInYourlFeed(articleWithOneTag.title);
  await homePage.assertArticleIsNotVisibleInYourlFeed(articleWithTwoTags.title);
});
