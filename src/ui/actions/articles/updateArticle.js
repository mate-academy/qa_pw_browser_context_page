import { test } from '@playwright/test';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { EditArticlePage } from '../../pages/article/EditArticlePage';

export async function updateArticle(page, articleUrl, updates) {
  let newUrl = articleUrl;
  
  await test.step(`Update an article`, async () => {
    const viewArticlePage = new ViewArticlePage(page);
    const editArticlePage = new EditArticlePage(page);

    await viewArticlePage.open(articleUrl);
    await viewArticlePage.clickEditArticleButton();
    
    await page.waitForURL(/\/editor\//);
    await page.waitForLoadState('networkidle');
    
    await editArticlePage.updateArticle(updates);

    await page.waitForTimeout(1000);
    
    newUrl = page.url();
  });
  
  return newUrl;
}
