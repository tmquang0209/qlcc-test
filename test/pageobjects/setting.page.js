const Page = require("./page");
const { $, browser } = require("@wdio/globals");

class SettingPage extends Page {
    get teachingScheduleTab() {
        return $("//div[text()='LỊCH GIẢNG DẠY']");
    }

    get teachingScheduleInput() {
        return $("input[id='setting-schedule_maxChangeLecturer']");
    }

    get timekeepingTab() {
        return $("//div[text()='CHẤM CÔNG']");
    }

    get timekeepingEarlyCheckInInput() {
        return $("input[id='setting-timekeeping_earlyCheckInAllowMinute']");
    }

    get timekeepingLateCheckInInput() {
        return $("input[id='setting-timekeeping_lateCheckInAllowMinute']");
    }

    get timekeepingEarlyCheckOutInput() {
        return $("input[id='setting-timekeeping_earlyCheckOutAllowMinute']");
    }

    get timekeepingLateCheckOutInput() {
        return $("input[id='setting-timekeeping_lateCheckOutAllowMinute']");
    }

    // setting-timekeeping_allowCheckOutAfterCheckIn
    get timekeepingAllowCheckOutAfterCheckInInput() {
        return $("input[id='setting-timekeeping_allowCheckOutAfterCheckIn']");
    }

    get notebookTab() {
        return $("//text()='SỔ ĐIỂM']");
    }

    get retestProcessingDeadlineTab() {
        return $("//div[text()='HẠN XỬ LÝ LẠI, HỌC LẠI THEO CTĐT']");
    }

    get studentAttendanceTab() {
        return $("div[text()='ĐIỂM DANH SINH VIÊN']");
    }

    get applicationForLeaveTab() {
        return $("div[text()='ĐƠN XIN NGHỈ']");
    }

    get btnSubmit() {
        // type="submit" and text="Lưu"
        return $("button[type='submit']");
    }

    async teachingSchedule(value) {
        // const btn =  this.teachingScheduleTab;
        // await btn.click();

        const input = this.teachingScheduleInput;
        await this.clearInputField(input);
        await input.setValue(value);

        const save = this.saveBtn;
        await save.click();
    }

    async timekeeping(checkInEarly, checkInLate, checkOutEarly, checkOutLate, allowCheckOutAfterCheckIn) {
        // Switch to Timekeeping tab
        await this.timekeepingTab.waitForClickable({ timeout: 5000 });
        await this.timekeepingTab.click();

        // Add a small pause to ensure the tab content loads
        await browser.pause(1000);

        // // Input for early check-in
        // const earlyCheckIn = this.timekeepingEarlyCheckInInput;
        // await this.clearInputField(earlyCheckIn);
        // await earlyCheckIn.setValue(checkInEarly);

        // // Input for late check-in
        // const lateCheckIn = this.timekeepingLateCheckInInput;
        // await this.clearInputField(lateCheckIn);
        // await lateCheckIn.setValue(checkInLate);

        // // Input for early check-out
        // const earlyCheckOut = this.timekeepingEarlyCheckOutInput;
        // await this.clearInputField(earlyCheckOut);
        // await earlyCheckOut.setValue(checkOutEarly);

        // // Input for late check-out
        // const lateCheckOut = this.timekeepingLateCheckOutInput;
        // await this.clearInputField(lateCheckOut);
        // await lateCheckOut.setValue(checkOutLate);

        // // Input for allowCheckOutAfterCheckIn
        // const allowCheckOut = this.timekeepingAllowCheckOutAfterCheckInInput;
        // await this.clearInputField(allowCheckOut);
        // await allowCheckOut.setValue(allowCheckOutAfterCheckIn);

        // Wait for the save button to be clickable
        const saveButton = await $(`button[type='submit']`);
        console.log("tagName:", await saveButton.getTagName());
        console.log("class:", await saveButton.getAttribute("class"));
        console.log("isDisplayed: ", await saveButton.isDisplayed());
        console.log("isClickable:", await saveButton.isClickable());
        console.log("isExisting", await saveButton.isExisting());
        console.log("isFocused", await saveButton.isFocused());
        await saveButton.waitForClickable({ timeout: 5000 });
        await saveButton.click();
    }

    async notebook() {}
    async retestProcessingDeadline() {}
    async studentAttendance() {}
    async applicationForLeave() {}

    open() {
        return super.open("admin/settings");
    }
}

module.exports = new SettingPage();
