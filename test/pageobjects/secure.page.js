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

    get notHaveAccess() {
        // <div class="ant-result-title">Bạn không có quyền truy cập</div>;
        return $("div.ant-result-title");
    }
}

module.exports = new SecurePage();
