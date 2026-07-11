import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

let newTitle;
let newDescription;
let newBody;
let newTags;

test.beforeEach(
  async ({
    page,
    page2,
    user,
    user2,
    articleWithTwoTags,
    viewArticlePage,
    editArticlePage,
  }) => {
    newTitle = 'Updated title';
    newDescription = 'Updated description';
    newBody = 'Updated body';
    newTags = ['tag1', 'tag2'];

    await signUpUser(page, user);
    await signUpUser(page2, user2);

    await createArticle(page, articleWithTwoTags);

    await viewArticlePage.clickEditButton();
    await editArticlePage.updateTitleField(newTitle);
    await editArticlePage.updateDescriptionField(newDescription);
    await editArticlePage.updateBodyField(newBody);
    await editArticlePage.updateTagsField(newTags);
    await editArticlePage.clickUpdateArticleButton();

    await page.waitForTimeout(1000);
    await page.reload();

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  },
);

test('User can view an article updated by another user', async ({
  page2,
  user,
  articleWithTwoTags,
}) => {
  const viewArticlePage = new ViewArticlePage(page2);

  await viewArticlePage.open(articleWithTwoTags.url);

  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  await viewArticlePage.assertArticleTagsAreVisible(newTags);
  await viewArticlePage.assertArticleAuthorNameIsVisible(user.username);
});
