import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let viewArticlePage;

test.beforeEach(
  async ({
    page1,
    page2,
    user1,
    user2,
    articleWithOneTag,
    articleWithTwoTags,
  }) => {
    await signUpUser(page1, user1);
    await signUpUser(page2, user2);

    await createArticle(page1, articleWithOneTag);
    await createArticle(page1, articleWithTwoTags);

    viewArticlePage = new ViewArticlePage(page2);

    await viewArticlePage.open(articleWithOneTag.url);

    await viewArticlePage.assertFollowButtonIsVisible(user1.username);

    await viewArticlePage.clickFollowButton(user1.username);

    await viewArticlePage.assertUnfollowButtonIsVisible(user1.username);
  },
);

test(`User doesn't see other user's articles in "Your Feed" after unfollowing their profile.`, async ({
  page2,
  user1,
  articleWithOneTag,
  articleWithTwoTags,
}) => {
  await viewArticlePage.open(articleWithOneTag.url);

  await viewArticlePage.assertUnfollowButtonIsVisible(user1.username);

  await viewArticlePage.clickUnfollowButton(user1.username);

  await viewArticlePage.assertFollowButtonIsVisible(user1.username);

  const homePage = new HomePage(page2);

  await homePage.open();

  await homePage.assertArticleIsNotVisibleInYourlFeed(articleWithOneTag.title);
  await homePage.assertArticleIsNotVisibleInYourlFeed(articleWithTwoTags.title);
});
