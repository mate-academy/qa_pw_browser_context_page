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
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createArticle(page, articleWithoutTags);

    const newTitle = faker.lorem.words();
    const editPage = new EditArticlePage()

    await viewArticlePage.clickEditArticleLink();
    await editPage(page, { title: newTitle });

    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit the article description for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createArticle(page, articleWithoutTags);

    const newDescription = faker.lorem.sentence(6);
    const editPage = new EditArticlePage()

    await viewArticlePage.clickEditArticleLink();
    await editPage(page, { description: newDescription });

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  });

  test('Edit the article text for the existing article', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createArticle(page, articleWithoutTags);

    const newText = faker.lorem.paragraphs(2);
    const editPage = new EditArticlePage()

    await viewArticlePage.clickEditArticleLink();
    await editPage(page, { text: newText });

    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add a tag for the existing article without tags', async ({
    page,
    homePage,
    viewArticlePage,
    articleWithoutTags,
  }) => {
    await homePage.clickNewArticleLink();
    await createArticle(page, articleWithoutTags);

    const newTag = faker.lorem.word();
    const editPage = new EditArticlePage()

    await viewArticlePage.clickEditArticleLink();
    await editPage(page, { addTag: newTag });

    await viewArticlePage.assertArticleHasTag(newTag);
  });

 
});
