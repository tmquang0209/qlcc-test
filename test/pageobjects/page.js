const { browser } = require("@wdio/globals");

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(`http://hactech-qlcc.test.mqsolutions.vn/${path}`);
    }

    async clearInputField(element) {
        await element.waitForEnabled({ timeout: 5000 });
        await element.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Delete");
        await browser.pause(1000);
    }
};
