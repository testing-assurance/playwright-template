import test, { expect } from "@playwright/test";

test.describe('Login', {tag: ['@smoke', '@TA-004']}, () => {
    test('TA-004:as a user, I must be able to login with my correct credentials and be redirected to list page', async ({ page }, testInfo) => { 
        testInfo.annotations.push({ type: 'ID', description: 'TC001' });
        expect(1, 'this is ok').toBe(1);
        expect(2, 'not ok').toBe(1);
    });
});
