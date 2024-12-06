import { expect } from "@playwright/test";
import { test } from "../core/base-test";

test.describe("Sample", () => {
  test("TA-001:As a user, I must be able to login with my correct credentials and be redirected to list page", async ({
    page,
  }) => {
    await page.goto("https://www.google.com");
    expect(page.url()).toBe("https://www.failed.com");
  });
});
