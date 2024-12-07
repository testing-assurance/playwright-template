import results from "../results.json";
import { Spec } from "./types";
import { getIdFromTitle } from "./utils";

/**
[] - go through results
[] - return a list of failed tests: {testId, envName, video-location}
[] - store them in an external db "/{projectId}/{testId}/{envs}/{video}"
 */

type FailedTests = {
  testId: string;
  environment: string;
  videoLocation: string | null;
};

type Suites = (typeof results)["suites"];

function generateItemBySpec(spec: Spec): FailedTests {
  return {
    testId: getIdFromTitle(spec.title),
    environment: spec.tests[0].projectId,
    videoLocation:
      spec.tests[0].results[0].attachments.find((item) => item.name === "video")
        ?.path || null,
  };
}

function getList(suites: Suites): FailedTests[] {
  let failedTests: FailedTests[] = [];

  suites.forEach((suite) => {
    suite.suites.forEach((_suite) => {
      _suite.specs.forEach((spec) => {
        if (spec.ok) {
          return;
        }
        failedTests.push(generateItemBySpec(spec));
      });
    });
  });

  return failedTests;
}

console.log(getList(results.suites));
