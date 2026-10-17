import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { CreateArticlePage } from '../../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);
});

test('View an article updated by another user', async ({
  page1,
  page2,
  user1,
  articleWithoutTags,
  articleWithOneTag,
}) => {
  const viewArticlePage2 = new ViewArticlePage(page2);
  const viewArticlePage1 = new ViewArticlePage(page1);

  await viewArticlePage2.open(articleWithoutTags.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithoutTags.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
  //page1 edit article
  await viewArticlePage1.editArticleButtonClick();
  const createArticlePage1 = new CreateArticlePage(page1);
  await createArticlePage1.fillTitleField(articleWithOneTag.title);
  const editArticlePage1 = new EditArticlePage(page1);
  await editArticlePage1.updateArticleButtonClick();
  //page2 assert article was updated
  await viewArticlePage2.open(articleWithoutTags.url);

  await viewArticlePage2.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage2.assertArticleTextIsVisible(articleWithoutTags.text);
  await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
});
