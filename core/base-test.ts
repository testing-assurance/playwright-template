import { test as base, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const test = base.extend({});

test.afterEach(async ({}, testInfo) => {
  const video = testInfo.attachments.find((a) => a.name.endsWith(".webm"));
  const v = testInfo.attachments[0];
  console.log("🚀 ~ test.afterEach ~ video:", v);
  if (video) {
    // const oldPath = video.path!;
    // const newName = `${testInfo.title.replace(/\W+/g, "_")}.webm`;
    // const newPath = path.join(path.dirname(oldPath), newName);
    // await fs.promises.rename(oldPath, newPath);
  }
});

export { test, expect };
