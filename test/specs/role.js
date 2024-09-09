const loginPage = require("../pageobjects/login.page");
const rolePage = require("../pageobjects/role.page");
const securePage = require("../pageobjects/secure.page");
const { browser } = require("@wdio/globals");

describe("Role", () => {
    beforeEach(async () => {
        await loginPage.loginByRole();
        await browser.pause(1000);
        await rolePage.open();
    });

    describe("Check display", () => {
        it("Screen display", async () => {
            await expect(securePage.breadcumbs).toBeDisplayed();
            await expect(rolePage.roleCreateBtn).toBeDisplayed();
            await expect(rolePage.roleNameTable).toBeDisplayed();
            await expect(rolePage.roleDescriptionTable).toBeDisplayed();
            await expect(rolePage.roleCreatedDateTable).toBeDisplayed();
            await expect(rolePage.rolePermissionTable).toBeDisplayed();
            await expect(rolePage.roleActionTable).toBeDisplayed();
        });
    });

    describe("Create role", () => {
        it("[CREATE] Create new role successfully", async () => {
            const currentDate = new Date();
            const roleName = "Auto test " + currentDate.getTime();
            await rolePage.createNewRole(roleName, "Test Role Description", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tạo vai trò mới thành công!"));
        });

        it("[CREATE] Role name is required while creating", async () => {
            await rolePage.createNewRole("", "Test Role Description", "Root");

            await expect(securePage.explainError).toBeExisting();
            await expect(securePage.explainError).toHaveText(expect.stringContaining("Tên là bắt buộc"));
        });

        it("[CREATE] Role name is exists while creating", async () => {
            const roleName = "Giảng viên";
            await rolePage.createNewRole(roleName, "Test Role Description", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tên nhóm vai trò đã tồn tại!"));
        });

        it("[CREATE] Role name have special characters", async () => {
            const roleName = "Auto test @#";
            await rolePage.createNewRole(roleName, "Test Role Description", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tên nhóm vai trò không được chứa ký tự đặc biệt!"));
        });

        it("[CREATE] Role description have special characters", async () => {
            const roleName = "Auto test " + new Date().getTime();
            await rolePage.createNewRole(roleName, "Test Role Description @#", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Mô tả không được chứa ký tự đặc biệt!"));
        });

        it("[CREATE] Role too long (max length is 50)", async () => {
            const roleName = "ALOALOALOALOALOALASDJKHWIEAJKSDHQWHEKJasdasdweasmdn" + new Date().getTime();
            await rolePage.createNewRole(roleName, "Test Role Description", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tên nhóm vai trò không được quá 50 ký tự!"));
        });
    });

    describe("Update role", () => {
        it("[UPDATE] Update role successfully", async () => {
            const currentDate = new Date();
            const roleName = "Auto test " + currentDate.getTime();
            await rolePage.updateRoleBtn();
            await browser.pause(5000);

            await rolePage.updateRole(roleName, "Test Role Description Updated", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Cập nhật vai trò thành công!"));
        });

        it("[UPDATE] Role name is exists", async () => {
            const roleName = "Giảng viên";
            await rolePage.updateRoleBtn();
            await browser.pause(1000);

            await rolePage.updateRole(roleName, "Test Role Description Updated", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tên nhóm vai trò đã tồn tại!"));
        });

        it("[UPDATE] Role name is empty", async () => {
            await rolePage.updateRoleBtn();
            await browser.pause(1000);

            await rolePage.updateRole("", "Test Role Description Updated", "Root");

            await expect(securePage.explainError).toBeExisting();
            await expect(securePage.explainError).toHaveText(expect.stringContaining("Tên là bắt buộc"));
        });

        it("[UPDATE] Role name have special characters", async () => {
            await rolePage.updateRoleBtn();
            await browser.pause(1000);

            await rolePage.updateRole("Auto update test @#", "Test Role Description Updated", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tên nhóm vai trò không được chứa ký tự đặc biệt!"));
        });

        it("[UPDATE] Role description have special characters", async () => {
            await rolePage.updateRoleBtn();
            await browser.pause(1000);

            await rolePage.updateRole("Auto test", "Test Role Description Updated @#", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Mô tả không được chứa ký tự đặc biệt!"));
        });

        it("[UPDATE] Role too long (max length is 50)", async () => {
            const roleName = "ALOALOALOALOALOALASDJKHWIEAJKSDHQWHEKJasdasdweasmdn" + new Date().getTime();
            await rolePage.updateRoleBtn();
            await browser.pause(1000);

            await rolePage.updateRole(roleName, "Test Role Description Updated", "Root");

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Tên nhóm vai trò không được quá 50 ký tự!"));
        });
    });

    describe("It will update permissions for role", () => {
        it("Set permissions for role", async () => {
            await rolePage.permissionRoleBtn("Giảng viên");
            await rolePage.setPermissionForRole();

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Cập nhật quyền thành công!"));
        });
    });

    describe("Delete role", () => {
        it("Delete role successfully", async () => {
            await rolePage.updateRoleBtn();
            await browser.pause(1000);

            await rolePage.roleDeleteBtn.click();
            await browser.pause(1000);

            await rolePage.agreeDeleteBtn.click();
            await browser.pause(500);

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Xóa vai trò thành công!"));
        });

        it("Delete role failure because role is using", async () => {
            await rolePage.updateRoleBtn("Giảng viên");
            await browser.pause(1000);

            await rolePage.roleDeleteBtn.click();
            await browser.pause(1000);

            await rolePage.agreeDeleteBtn.click();
            await browser.pause(500);

            await expect(securePage.notification).toBeExisting();
            await expect(securePage.notification).toHaveText(expect.stringContaining("Vai trò chứa người dùng không thể bị xóa. Bạn không thể xóa!"));
        });
    });
});
