import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export async function updateArticle(page, articleUpdateData) {
  await test.step(`Update an article`, async () => {
    
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.updateArticle(articleUpdateData);
    await editArticlePage.clickUpdateArticleButton();
  });
}
