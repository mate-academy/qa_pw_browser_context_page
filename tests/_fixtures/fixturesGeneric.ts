import { test as base, Page } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

// 1. Отримуємо тип даних користувача з функції генерації
type UserData = ReturnType<typeof generateNewUserData>;

// 2. Описуємо типи для Test Fixtures (кожен член МАЄ мати вказаний тип)
type CustomTestFixtures = {
  page1: Page;
  page2: Page;
  user: UserData;
  user1: UserData;
  user2: UserData;
  infoTestLog: void; // Фікстури без повернення значення позначаємо як void
};

// 3. Описуємо типи для Worker Fixtures
type CustomWorkerFixtures = {
  logger: Logger;
};

// 4. Передаємо створені типи в base.extend
export const test = base.extend<CustomTestFixtures, CustomWorkerFixtures>({
  page1: async ({ page }, use) => {
    await use(page);
  },

  page2: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page2 = await context.newPage();

    await use(page2);

    await context.close();
  },

  user: async ({ logger }, use) => {
    const user = generateNewUserData(logger);
    await use(user);
  },

  user1: async ({ logger }, use) => {
    const user1 = generateNewUserData(logger);
    await use(user1);
  },

  user2: async ({ logger }, use) => {
    const user2 = generateNewUserData(logger);
    await use(user2);
  },

  logger: [
    async ({}, use) => {
      const logger = new Logger('error');
      await use(logger);
    },
    { scope: 'worker' },
  ],

  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const indexOfTestSubfolderStart = testInfo.file.indexOf('/tests') + 7;
      const fileName = testInfo.file.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use();

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
});
