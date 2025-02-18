import { test } from '../../_fixtures/fixtures';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';

let createArticlePage;
let viewArticlePage;

test.beforeEach(async ({ page, user }) => {
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);

  await signUpUser(page, user);
});

test('Creat an article with required fields', async ({
  homePage,
  articleWithoutTags,
}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithoutTags.title);
  await createArticlePage.fillDescriptionField(articleWithoutTags.description);
  await createArticlePage.fillTextField(articleWithoutTags.text);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitle(articleWithoutTags.title);
  await viewArticlePage.assertArticleText(articleWithoutTags.text);
});
