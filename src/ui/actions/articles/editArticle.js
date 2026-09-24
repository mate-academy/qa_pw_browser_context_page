import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export async function editArticle(page, article) {
  await test.step(`Update article`, async () => {
    const createArticlePage = new CreateArticlePage(page);
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(article.title);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(article.title);
  });

  article['url'] = page.url();
  return article;
}