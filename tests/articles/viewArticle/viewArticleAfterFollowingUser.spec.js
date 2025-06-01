import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.beforeEach(async ({ page1, page2, user, user2, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View Article After Following User', async ({
  user,
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  await homePage.expectLoaded();
  await homePage.goToGlobalFeedTab();
  await homePage.assertCreatedArticleOfAnotherUserIsVisible(
    articleWithoutTags.title,
  );
  await homePage.clickOnArticleTitle(articleWithoutTags.title);
  await homePage.clickFollowButton(user.username);
  await homePage.assertUnfollowButtonIsVisible();
  await homePage.clickHomeButton();
  await homePage.assertCreatedArticleOfAnotherUserIsVisible(
    articleWithoutTags.title,
  );
});
