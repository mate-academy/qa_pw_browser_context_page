import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let withOneTag;
let withTwoTags;

test.beforeEach(
  async ({
    page,
    page2,
    viewArticlePage2,
    user,
    user2,
    articleWithOneTag,
    articleWithTwoTags,
  }) => {
    await signUpUser(page, user);
    await signUpUser(page2, user2);

    withOneTag = await createArticle(page, articleWithOneTag);
    withTwoTags = await createArticle(page, articleWithTwoTags);

    await viewArticlePage2.open(withOneTag.url);

    await viewArticlePage2.assertFollowButtonIsVisible(user.username);

    await viewArticlePage2.clickFollowButton(user.username);

    await viewArticlePage2.assertUnfollowButtonIsVisible(user.username);
  },
);

test(
  `User doesn't see other user's articles in "Your Feed"` +
    ` after unfollowing their profile.`,
  async ({ homePage2, user, viewArticlePage2 }) => {
    await viewArticlePage2.open(withOneTag.url);

    await viewArticlePage2.assertUnfollowButtonIsVisible(user.username);

    await viewArticlePage2.clickUnfollowButton(user.username);

    await viewArticlePage2.assertFollowButtonIsVisible(user.username);

    await homePage2.open();

    await homePage2.assertArticleIsNotVisibleInYourlFeed(
      withOneTag.title,
    );
    await homePage2.assertArticleIsNotVisibleInYourlFeed(
      withTwoTags.title,
    );
  },
);
