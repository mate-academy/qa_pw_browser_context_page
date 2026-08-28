import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser.js';
import { createArticle } from '../../../src/ui/actions/articles/createArticle.js';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage.js';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test.describe('Edit Article Tests', () => {
  test('Edit the article title for the existing article', async ({
    page,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await createArticle(page, articleWithoutTags);

    const newTitle = faker.lorem.words();
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillTitle(newTitle);
    await editArticlePage.clickUpdateArticleButton();

    // The redirect from /editor/{slug} to /article/{slug} happens
    // asynchronously after the update succeeds, so wait for it before
    // reloading — otherwise the reload can hit the editor page instead
    // of the article page, which has no heading at all.
    await page.waitForURL(/\/article\//);
    await page.reload();
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit the article description for the existing article', async ({
    page,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await createArticle(page, articleWithoutTags);

    const newDescription = faker.lorem.sentence(6);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillDescription(newDescription);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  });

  test('Edit the article text for the existing article', async ({
    page,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await createArticle(page, articleWithoutTags);

    const newText = faker.lorem.paragraphs(2);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.fillBody(newText);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add a tag for the existing article without tags', async ({
    page,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await createArticle(page, articleWithoutTags);

    const newTag = faker.lorem.word();
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleLink();
    await editArticlePage.addTag(newTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleHasTag(newTag);
  });
});
