const loginPage = require("../pageobjects/login.page");
const securePage = require("../pageobjects/secure.page");
const settingPage = require("../pageobjects/setting.page");

describe("Setting", () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.loginByRole();
        await browser.pause(1000);
        await settingPage.open();
    });

    // describe("Teaching schedule", () => {
    //     it("Change teaching schedule successfully", async () => {
    //         const value = 0;
    //         await settingPage.teachingSchedule(value);

    //         await expect(securePage.notification).toBeExisting();
    //         await expect(securePage.notification).toHaveText(expect.stringContaining("Cập nhật cài đặt thành công!"));
    //     });

    //     it("Change teaching schedule with invalid value", async () => {
    //         const value = -1;
    //         await settingPage.teachingSchedule(value);

    //         await expect(securePage.explainError).toBeExisting();
    //         await expect(securePage.explainError).toHaveText(expect.stringContaining("Giá trị không hợp lệ"));
    //     });

    //     it("Change teaching schedule with invalid value", async () => {
    //         const value = 1;
    //         await settingPage.teachingSchedule(value);

    //         await expect(securePage.notification).toBeExisting();
    //         await expect(securePage.notification).toHaveText(expect.stringContaining("Giá trị không hợp lệ"));
    //     });
    // });

    describe("Timekeeping", () => {
        it("Change timekeeping successfully", async () => {
            const earlyCheckIn = 0;
            const lateCheckIn = 0;
            const earlyCheckOut = 0;
            const lateCheckOut = 0;
            const allowCheckOutAfterCheckIn = 0;
            await settingPage.timekeeping(earlyCheckIn, lateCheckIn, earlyCheckOut, lateCheckOut, allowCheckOutAfterCheckIn);

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Cập nhật cài đặt thành công!"));
        });

        // it("Change timekeeping with invalid value", async () => {
        //     const earlyCheckIn = -1;
        //     const lateCheckIn = 0;
        //     const earlyCheckOut = 0;
        //     const lateCheckOut = 0;
        //     const allowCheckOutAfterCheckIn = 0;
        //     await settingPage.timekeeping(earlyCheckIn, lateCheckIn, earlyCheckOut, lateCheckOut, allowCheckOutAfterCheckIn);

        //     await expect(securePage.explainError).toBeExisting();
        //     await expect(securePage.explainError).toHaveText(expect.stringContaining("Giá trị không hợp lệ"));
        // });

        // it("Change timekeeping with invalid value", async () => {
        //     const earlyCheckIn = 0;
        //     const lateCheckIn = -1;
        //     const earlyCheckOut = 0;
        //     const lateCheckOut = 0;
        //     const allowCheckOutAfterCheckIn = 0;
        //     await settingPage.timekeeping(earlyCheckIn, lateCheckIn, earlyCheckOut, lateCheckOut, allowCheckOutAfterCheckIn);

        //     await expect(securePage.explainError).toBeExisting();
        //     await expect(securePage.explainError).toHaveText(expect.stringContaining("Giá trị không hợp lệ"));
        // });

        // it("Change timekeeping with invalid value", async () => {
        //     const earlyCheckIn = 0;
        //     const lateCheckIn = 0;
        //     const earlyCheckOut = -1;
        //     const lateCheckOut = 0;
        //     const allowCheckOutAfterCheckIn = 0;
        //     await settingPage.timekeeping(earlyCheckIn, lateCheckIn, earlyCheckOut, lateCheckOut, allowCheckOutAfterCheckIn);

        //     await expect(securePage.explainError).toBeExisting();
        //     await expect(securePage.explainError).toHaveText(expect.stringContaining("Giá trị không hợp lệ"));
        // });
    });

    describe("Notebook", () => {});

    describe("Retest processing deadline", () => {});

    describe("Student attendance", () => {});

    describe("Application for leave", () => {});
});
