const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
    it("should login with valid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("admin", "123456@");
        await expect(SecurePage.breadcumbs).toBeExisting();
        await expect(SecurePage.breadcumbs).toHaveText(expect.stringContaining("Bảng điều khiển"));
    });

    it("should login with invalid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("admin", "123");

        await expect(SecurePage.notification).toBeExisting();
        await expect(SecurePage.notification).toHaveText(expect.stringContaining("Đăng nhập thất bại"));
    });
});
