import { expect } from '@playwright/test';
import { test } from '../core/base-test';

test.describe('Sample', () => {
  test.skip('TA-001: Failed Test', async ({ page }) => {
    await page.goto('https://www.google.com');
    expect(page.url()).toBe('https://www.failed.com');
  });

  test.skip('TA-002: Passed Test', async () => {
    expect(1).toBe(1);
  });
});
