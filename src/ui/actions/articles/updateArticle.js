import { test } from '@playwright/test';
import { EditArticlePage } from '../../pages/article/EditArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export async function updateArticle(page, articleUrl, updatedArticle) {
  await test.step(`Update article: ${updatedArticle.title}`, async () => {
    const editArticlePage = new EditArticlePage(page);
    const viewArticlePage = new ViewArticlePage(page);

    await editArticlePage.open(articleUrl);
    await editArticlePage.submitEditArticleForm(updatedArticle);
    await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  });

  updatedArticle.url = articleUrl;
  return updatedArticle;
}
