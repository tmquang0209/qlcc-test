const { $ } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    get breadcumbs() {
        return $(".breadcumbs");
    }

    get notification() {
        return $(".ant-notification-notice-message");
    }

    get explainError() {
        return $("//div[@class='ant-form-item-explain-error']");
    }
}

module.exports = new SecurePage();
