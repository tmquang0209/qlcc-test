const { $ } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() {
        return $("#loginForm_username");
    }

    get inputPassword() {
        return $("#loginForm_password");
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async loginByRole(roleName = "admin") {
        let username, password;
        switch (roleName) {
            case "admin":
                username = "admin";
                password = "123456@";
                break;

            case "teacher":
                username = "ngocnt";
                password = "1";
                break;

            case "academicAffairs":
                username = "ngocbekute";
                password = "1";
                break;

            default:
                username = "admin";
                password = "123456@";
                break;
        }
        await this.open();
        await this.login(username, password);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open("admin/login");
    }
}

module.exports = new LoginPage();
