const { $, browser } = require("@wdio/globals");
const loginPage = require("./login.page");
const Page = require("./page");

class RolePage extends Page {
    get roleCreateBtn() {
        return $("//span[text()='Tạo']");
    }

    get roleNameTable() {
        return $("//span[text()='Tên']");
    }

    get roleDescriptionTable() {
        return $("//span[text()='Mô tả']");
    }

    get roleCreatedDateTable() {
        return $("//span[text()='Ngày tạo']");
    }

    get rolePermissionTable() {
        return $("//span[text()='Phân quyền']");
    }

    get roleActionTable() {
        return $("//th[text()='Thao tác']");
    }

    get roleCreateTile() {
        return $("//h4[text()='Tạo vai trò mới']");
    }

    get roleNameLbl() {
        return $("//label[text()='Tên']");
    }

    get roleNameTxt() {
        return $("input[id='createRole_name']");
    }

    get roleDescriptionLbl() {
        return $("//label[text()='Mô tả']");
    }

    get roleDescriptionTxt() {
        return $("input[id='createRole_description']");
    }

    get roleMainGroupLbl() {
        return $("//label[text()='Nhóm chính']");
    }

    get roleMainGroupSelect() {
        return $("input[id='createRole_parentId']");
    }

    get roleSaveBtn() {
        return $("button[type='submit']");
    }

    get roleDeleteBtn() {
        return $("span.anticon-delete");
    }

    get agreeDeleteBtn() {
        return $("//button/span[text()='Đồng ý']");
    }

    get roleEditGroupName() {
        return $("input[id='editRoleGroup_name']");
    }

    get roleEditGroupDescription() {
        return $("input[id='editRoleGroup_description']");
    }

    async updateRoleBtn(rowValue = "") {
        browser.pause(1000);
        if (rowValue !== "") {
            const row = $("//td[text()='" + rowValue + "']").parentElement();
            const updateBtn = row.$("span.anticon-edit");

            await updateBtn.click();
            return;
        }
        // first span element with class 'anticon-edit'
        const updateBtn = $("span.anticon-edit");
        await updateBtn.click();
    }

    async createNewRole(roleName, roleDescription, roleMainGroup) {
        await this.roleCreateBtn.click();
        await this.roleNameTxt.setValue(roleName);
        await this.roleDescriptionTxt.setValue(roleDescription);
        await this.roleMainGroupSelect.click();
        await $(`//div[text()="${roleMainGroup}"]`).click();
        await this.roleSaveBtn.click();
    }

    async updateRole(roleName, roleDescription, roleMainGroup) {
        await super.clearInputField(this.roleEditGroupName);
        await this.roleEditGroupName.setValue(roleName);

        await super.clearInputField(this.roleEditGroupDescription);
        await this.roleEditGroupDescription.setValue(roleDescription);

        // await $("input[id='editRoleGroup_parentId']").click();
        // await $(`//div[text()="${roleMainGroup}"]`).click();

        await $("button[type='submit']").click();
        browser.pause(1000);
    }

    async permissionRoleBtn(rowValue = "") {
        browser.pause(1000);
        if (rowValue !== "") {
            const row = $("//td[text()='" + rowValue + "']").parentElement();
            const permissionBtn = row.$("//button/span[text()='Phân quyền']");

            await permissionBtn.click();
            return;
        }

        const permissionBtn = $("//button/span[text()='Phân quyền']");
        await permissionBtn.click();
    }

    async setPermissionForRole() {
        const element = $("//td[text()='Cài đặt chung']").nextElement().nextElement();
        // get td 3rd element
        const permission = element.$("input[type='checkbox']");
        await permission.click();

        await $("button[type='submit']").click();
    }

    open() {
        return super.open("admin/roles");
    }
}

module.exports = new RolePage();
