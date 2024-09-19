const { browser } = require("@wdio/globals");

module.exports = class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    async open(path) {
        const currentUrl = await browser.getUrl();

        // If the current URL contains "https", redirect to "http"
        if (currentUrl.includes("https://")) {
            const newUrl = currentUrl.replace("https://", "http://");
            return browser.url(newUrl + path);
        }

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
