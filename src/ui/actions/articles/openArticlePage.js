import { test } from '@playwright/test';

export async function openArticlePage(page, articleURL) {
  await test.step('Open article page', async () => {
    await page.goto(articleURL);
    await page.waitForURL(articleURL);
  });
}