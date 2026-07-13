import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let withOneTag;
let withTwoTags;

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

    withOneTag = await createArticle(page, articleWithOneTag);
    withTwoTags = await createArticle(page, articleWithTwoTags);
  },
);

test(
  `User can see other user's new articles in "Your Feed" ` +
  `after following their profile.`,
   async ({
  viewArticlePage2,
  homePage2,
  user,
}) => {
  await viewArticlePage2.open(withOneTag.url);

  await viewArticlePage2.assertFollowButtonIsVisible(user.username);

  await viewArticlePage2.clickFollowButton(user.username);

  await viewArticlePage2.assertUnfollowButtonIsVisible(user.username);

  await homePage2.open();

  await homePage2.assertArticleIsVisibleInYourlFeed(withOneTag.title);
  await homePage2.assertArticleIsVisibleInYourlFeed(withTwoTags.title);
});
