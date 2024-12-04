import { test, expect } from '@playwright/test';

test.describe('3 tests inside', () => {

  test('TA-001:has title or not', { tag: ['@smoke', '@TA-001'] }, async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'ID', description: 'TC002' });
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('TA-002:get started link', async ({ page }, testInfo) => {
    testInfo.annotations.push({ type: 'ID', description: 'TC003' });
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test.skip('TA-003: this test 2', async () => {
    test.info().annotations.push({ type: 'ID', description: 'TC004' });
  });
})