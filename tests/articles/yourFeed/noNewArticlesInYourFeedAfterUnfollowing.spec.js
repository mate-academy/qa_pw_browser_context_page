import { test } from '../../_fixtures/fixtures';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test("User doesn't see other user's articles in  Your Feed \
  after unfollowing their profile", async ({
  page2,
  user1,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await page2
    .getByRole('button', { name: /Follow/ })
    .first()
    .click();

  await page2.getByRole('link', { name: user1.username }).first().click();
  await page2
    .getByRole('button', { name: /Unfollow/ })
    .first()
    .click();

  await page2.goto('/');
  await homePage.clickYourFeedTab();
  await page2
    .getByText(articleWithoutTags.title)
    .first()
    .waitFor({ state: 'detached' });
});
