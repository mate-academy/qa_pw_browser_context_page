import { test } from '../../_fixtures/fixtures';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SignUpPage } from '../../../src/ui/pages/auth/SignUpPage';
import { HomePage } from '../../../src/ui/pages/HomePage';

test('User can see own article in "Global feed" when not logged in.', async ({
  page1,
  page2,
  user,
  articleWithoutTags,
}) => {
  await signUpUser(new SignUpPage(page1), new HomePage(page1), user);
  await createArticle(page1, articleWithoutTags);

  await page2.waitForTimeout(20_000);
  const homePage = new HomePage(page2);

  await homePage.open();
  await homePage.assertUserIsNotLoggedIn();
  await homePage.clickGlobalFeedTab();
  await homePage.assertArticleWithAuthorIsVisible(
    articleWithoutTags.title,
    user.username.toLowerCase(),
  );

});
