import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

let homePage;

test.beforeEach(async ({ page1, page2, user, articleWithoutTags }) => {
  await signUpUser(page1, user);
  await createArticle(page1, articleWithoutTags);

  homePage = new HomePage(page2);
});

test('User can see his own article not log in', async ({
  articleWithoutTags,
}) => {
  await homePage.open();
  await homePage.goToGlobalFeedTab();
  await homePage.reloadPage();
  await homePage.assertCreatedArticleOfAnotherUserIsVisible(
    articleWithoutTags.title,
  );
});
