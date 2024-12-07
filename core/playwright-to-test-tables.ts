import { CustomTest, PlaywrightTestResults, Status, TestRow2 } from "./types";

function getStatus(test): Status {
  return test.tests.length && test.tests[0].results[0]
    ? test.tests[0].results[0].status
    : "NA";
}

function getDuration(test): number {
  return test.tests.length && test.tests[0].results[0]
    ? test.tests[0].results[0].duration
    : 0;
}

function getTotalStatus(
  environment: CustomTest[number]["environments"]
): Status {
  const someFailed = environment.some((item) => item.status === "failed");
  const allPassed = environment.every((item) => item.status === "passed");
  const someSkipped = environment.some((item) => item.status === "skipped");

  if (someFailed) {
    return "failed";
  }
  if (allPassed) {
    return "passed";
  }
  if (someSkipped) {
    return "skipped";
  }
  return "NA";
}

function removeIdFromTitle(title: string): string {
  const index = title.indexOf(":");
  return index >= 0 ? title.substring(index + 1) : title;
}

function convertPlaywrightToTestTable2(
  tests: PlaywrightTestResults["suites"]
): TestRow2[] {
  let temp: TestRow2[] = [];

  tests.forEach((test) => {
    test.suites.forEach((suite) => {
      const _temp: TestRow2 = {} as TestRow2;
      _temp.tests = {} as CustomTest;
      _temp.groupTitle = suite.title;

      suite.specs.forEach((test) => {
        const customId = test.title.split(":")[0];
        if (!(customId in _temp.tests)) {
          _temp.tests[customId] = {
            id: "",
            title: "",
            environments: [],
            status: "NA",
            duration: 0,
          };
        }

        _temp.tests[customId].id = test.id;
        _temp.tests[customId].title = removeIdFromTitle(test.title);

        _temp.tests[customId].environments.push({
          name: test.tests.length ? test.tests[0].projectName : "NA",
          status: getStatus(test),
          duration: getDuration(test),
        });

        _temp.tests[customId].duration = _temp.tests[
          customId
        ].environments.reduce((prev, curr) => curr.duration + prev, 0);
        _temp.tests[customId].status = getTotalStatus(
          _temp.tests[customId].environments
        );
      });
      temp.push(_temp);
    });
  });
  return temp;
}

export { convertPlaywrightToTestTable2 };
