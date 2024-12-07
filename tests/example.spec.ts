import { expect } from "@playwright/test";
import { test } from "../core/base-test";

test.describe("Sample", () => {
  test("TA-001: Failed Test 2", async ({ page }) => {
    await page.goto("https://www.google.com");
    expect(page.url()).toBe("https://www.failed.com");
    expect(2).toBe(1);
  });

  test("TA-002: Passed Test", async () => {
    expect(1).toBe(2);
  });
});
