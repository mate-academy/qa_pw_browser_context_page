import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';
import { faker } from '@faker-js/faker';

let viewArticlePage1;
let editArticlePage;
let viewArticlePage2;

test.beforeEach(async ({ page1, page2, user1, user2, articleWithoutTags }) => {
  await signUpUser(page1, user1);
  await signUpUser(page2, user2);

  await createArticle(page1, articleWithoutTags);

  viewArticlePage1 = new ViewArticlePage(page1);
  editArticlePage = new EditArticlePage(page1);
  viewArticlePage2 = new ViewArticlePage(page2);
});

test('View an article updated by another user',
  async ({ user1, articleWithoutTags, }) => {
    const title = faker.lorem.words()
    const text = faker.lorem.sentences(2);

    await viewArticlePage1.clickEditArticleButton();
    await editArticlePage.fillTitleField(title);
    await editArticlePage.fillTextField(text);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage2.open(articleWithoutTags.url);

    await viewArticlePage2.assertArticleTitleIsVisible(title);
    await viewArticlePage2.assertArticleTextIsVisible(text);
    await viewArticlePage2.assertArticleAuthorNameIsVisible(user1.username);
  });
