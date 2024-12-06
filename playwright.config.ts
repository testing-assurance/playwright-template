import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["json", { outputFile: "results.json" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: "retain-on-failure",
          size: {
            width: 1920,
            height: 1080,
          },
        },
      },
      outputDir: "videos/desktop-chrome",
    },
    {
      name: "Desktop Firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: "retain-on-failure",
          size: {
            width: 1920,
            height: 1080,
          },
        },
      },
      outputDir: "videos/desktop-firefox",
    },
    {
      name: "Desktop Safari",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: "retain-on-failure",
          size: {
            width: 1920,
            height: 1080,
          },
        },
      },
      outputDir: "videos/desktop-safari",
    },

    /* Test against mobile viewport. */
    {
      name: "Mobile Pixel 7",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 412, height: 915 },
        video: {
          mode: "retain-on-failure",
          size: {
            width: 412,
            height: 915,
          },
        },
      },
      outputDir: "videos/mobile-pixel-7",
    },
    {
      name: "Mobile iPhone 15",
      use: {
        ...devices["iPhone 15"],
        viewport: { width: 393, height: 852 },
        video: {
          mode: "retain-on-failure",
          size: {
            width: 393,
            height: 852,
          },
        },
      },
      outputDir: "videos/mobile-iphone-15",
    },

    /* Test against branded browsers. */
    // {
    //   name: "Desktop Edge",
    //   use: {
    //     ...devices["Desktop Edge"],
    //     channel: "msedge",
    //     viewport: { width: 1920, height: 1080 },
    //     video: {
    //       mode: "retain-on-failure",
    //       size: {
    //         width: 1920,
    //         height: 1080,
    //       },
    //     },
    //   },
    //   outputDir: "videos/desktop-edge",
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
