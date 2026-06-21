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

test("User can see other user's new articles \
  in Your Feed after following their profile", async ({
  page1,
  page2,
  articleWithoutTags,
}) => {
  const homePage = new HomePage(page2);
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithoutTags.url);
  await page2
    .getByRole('button', { name: /Follow/ })
    .first()
    .click();
  await page2
    .getByRole('button', { name: /Unfollow/ })
    .first()
    .waitFor();

  const newArticle = {
    ...articleWithoutTags,
    title: 'New article after following',
    description: 'New article after following description',
    text: 'New article after following text',
  };

  await createArticle(page1, newArticle);

  await page2.goto('/');
  await homePage.clickYourFeedTab();
  await page2.getByText(newArticle.title).first().waitFor();
});
