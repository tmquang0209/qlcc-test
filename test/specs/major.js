const loginPage = require("../pageobjects/login.page");
const majorPage = require("../pageobjects/major.page");
const securePage = require("../pageobjects/secure.page");
const { browser } = require("@wdio/globals");

describe("Major", () => {
    beforeEach(async () => {
        await loginPage.loginByRole();
        await browser.pause(1000);
        await majorPage.open();
    });

    it("Screen major display", async () => {
        await browser.pause(1000);
        await expect(securePage.breadcumbs).toBeDisplayed();
        await expect(majorPage.majorCreateBtn).toBeDisplayed();
        await expect(majorPage.majorNameTable).toBeDisplayed();
        await expect(majorPage.majorCodeTable).toBeDisplayed();
        await expect(majorPage.majorCreatedDateTable).toBeDisplayed();
        await expect(majorPage.majorActionTable).toBeDisplayed();
    });

    it("Sync major data", async () => {
        await majorPage.syncDataBtn.click();
        await browser.pause(1000);
        await majorPage.agreeSyncDataBtn.click();
        await browser.pause(1000);
        await browser.saveScreenshot("../screenshots/[Major]_Sync_data_successfully.png");

        await expect(securePage.notification).toBeDisplayed();
        await expect(securePage.notification).toHaveText("Đồng bộ dữ liệu thành công");
    });

    describe("Update major", () => {
        it("Update successfully", async () => {
            await majorPage.updateMajorBtn("Khoa Cơ Bản");
            await browser.pause(1000);

            await majorPage.updateMajor("Khoa Cơ Bản", true);
            await browser.pause(1000);

            await expect(securePage.notification).toBeDisplayed();
            await expect(securePage.notification).toHaveText("Cập nhật khoa thành công!");
        });

        it("Major name is exists", async () => {
            await majorPage.updateMajorBtn();
            await browser.pause(1000);

            await majorPage.updateMajor("Khoa Cơ Khí", true);
            await browser.pause(1000);

            await expect(securePage.notification).toBeDisplayed();
            await expect(securePage.notification).toHaveText("Tên Khoa đã tồn tại!");
        });

        it("Major name contain HTML", async () => {
            await majorPage.updateMajorBtn();
            await browser.pause(1000);

            await majorPage.updateMajor("Khoa Cơ Bản <script>alert('xss')</script>", true);
            await browser.pause(1000);

            await expect(securePage.explainError).toBeDisplayed();
            await expect(securePage.explainError).toHaveText("Tên Khoa không được chứa thẻ HTML!");
        });

        it("Major name contain special characters", async () => {
            await majorPage.updateMajorBtn();
            await browser.pause(1000);

            await majorPage.updateMajor("Khoa Cơ Bản <script>alert('xss')</script>", true);
            await browser.pause(1000);

            await expect(securePage.explainError).toBeDisplayed();
            await expect(securePage.explainError).toHaveText("Tên Khoa không được chứa ký tự đặc biệt!");
        });

        it("Major name is empty", async () => {
            await majorPage.updateMajorBtn();
            await browser.pause(1000);

            await majorPage.updateMajor("", true);
            await browser.pause(1000);

            await expect(securePage.explainError).toBeDisplayed();
            await expect(securePage.explainError).toHaveText("Tên khoa là bắt buộc");
        });

        it("Check status on", async () => {
            await majorPage.updateMajorBtn("Khoa Cơ Bản");
            await browser.pause(1000);

            await majorPage.updateMajor("Khoa Cơ Bản", true);
            await browser.pause(1000);

            await expect(securePage.notification).toBeDisplayed();
            await expect(securePage.notification).toHaveText("Cập nhật khoa thành công!");
        });

        it("Check status off", async () => {
            await majorPage.updateMajorBtn("Khoa Cơ Bản");
            await browser.pause(1000);

            await majorPage.updateMajor("Khoa Cơ Bản", false);
            await browser.pause(1000);

            await expect(securePage.notification).toBeDisplayed();
            await expect(securePage.notification).toHaveText("Cập nhật khoa thành công!");
        });
    });

    describe("Delete major", () => {
        it("Delete successfully", async () => {
            await majorPage.updateMajorBtn();
            await majorPage.deleteMajor();

            await expect(securePage.notification).toBeDisplayed();
            await expect(securePage.notification).toHaveText("Xóa khoa thành công!");
        });

        it("Delete failure because it assigned to other user", async () => {
            await majorPage.updateMajorBtn("Khoa Cơ Bản");
            await majorPage.deleteMajor();

            await expect(securePage.notification).toBeDisplayed();
            await expect(securePage.notification).toHaveText("Không thể xóa vì có nhân viên, lớp học trong khoa!");
        });
    });
});
