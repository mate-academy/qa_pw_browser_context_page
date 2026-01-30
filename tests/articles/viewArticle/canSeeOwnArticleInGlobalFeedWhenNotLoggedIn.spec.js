import { test } from '../../_fixtures/fixtures.ts';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async (
  { page1, user1, articleWithoutTags, articleWithOneTag }
) => {
  await signUpUser(page1, user1);

  await createArticle(page1, articleWithoutTags);
  await createArticle(page1, articleWithOneTag);
});

test('User can see own article in "Global feed" when not logged in',
  async ({
    user1,
    page2,
    articleWithoutTags,
    articleWithOneTag
  }) => {
    const homePage2 = new HomePage(page2);
    await homePage2.open();
    await homePage2.clickGlobalFeedTabLink();
    await homePage2.assertArticleInFeedTabIsVisible(articleWithoutTags.title)
    await homePage2.assertArticleInFeedTabIsVisible(articleWithOneTag.title)
    await homePage2.assertArticleAuthorNameIsVisible(user1.username);
    await homePage2.assertGlobalFeedTabIsVisible();
  });
