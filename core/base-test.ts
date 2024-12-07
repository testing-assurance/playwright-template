import { test as base, expect } from "@playwright/test";

const test = base.extend({});

test.afterEach(async ({}) => {});

export { test, expect };