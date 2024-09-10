const { $, browser } = require("@wdio/globals");
const Page = require("./page");

class MajorPage extends Page {
    get majorCreateBtn() {
        return $("//button/span[text()='Tạo']");
    }
    get majorNameTable() {
        return $("//span[contains(text(),'Tên khoa')]");
    }
    get majorCodeTable() {
        return $("//span[contains(text(),'Mã khoa')]");
    }
    get majorStatusTable() {
        return $("//span[contains(text(),'Trạng thái')]");
    }
    get majorCreatedDateTable() {
        return $("//span[contains(text(),'Ngày tạo')]");
    }
    get majorActionTable() {
        return $("//th[contains(text(),'Thao tác')]");
    }
    get syncDataBtn() {
        return $("//button/span[text()='Đồng bộ dữ liệu']");
    }
    get agreeSyncDataBtn() {
        return $("//button/span[text()='Đồng ý']");
    }

    async updateMajorBtn(majorName = "") {
        browser.pause(1000);
        if (majorName !== "") {
            const row = $("//td[text()='" + majorName + "']").parentElement();
            const updateBtn = row.$("span.anticon-edit");

            await updateBtn.click();
            return;
        }
        // first span element with class 'anticon-edit'
        const updateBtn = $("span.anticon-edit");
        await updateBtn.click();
    }

    async updateMajor(name, status = true) {
        const majorNameTxt = $("input[id='editInstitute_name']");
        const statusSwitch = $("button[id='editInstitute_active']");

        await this.clearInputField(majorNameTxt);
        await majorNameTxt.setValue(name);

        if (status) {
            if ((await statusSwitch.getAttribute("aria-checked")) === "false") await statusSwitch.click();
        } else {
            if ((await statusSwitch.getAttribute("aria-checked")) === "true") await statusSwitch.click();
        }
        const saveBtn = $("button[type='submit']");
        await saveBtn.click();
    }

    get deleteMajorBtn() {
        return $("span.anticon-delete");
    }

    get agreeDeleteBtn() {
        return $("//button/span[text()='Đồng ý']");
    }

    async deleteMajor(majorName = "") {
        await this.deleteMajorBtn.click();
        await browser.pause(1000);

        await this.agreeDeleteBtn.click();
    }

    open() {
        return super.open("admin/institutes");
    }
}

module.exports = new MajorPage();
