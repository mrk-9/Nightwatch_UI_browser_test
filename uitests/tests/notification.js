const { setup, BrowserMode} = require('../src/testsetup');

const runTheTest = (browser, browserMode) => {
    setup(browser, browserMode);
    browser.page.sso()
        .initLoginState()
        .url(browser.globals.baseUrl)
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')
        .waitForElementVisible('@notificationButton')
        .click('@notificationButton')
        .waitForElementVisible('@notificationModal')
        .click('@notificationButton')
        .waitForElementNotPresent('@notificationModal')
        .api
        .end();
};

module.exports = {
    // TODO PSP-20957: Add a mobile version of the test once notifications work in the mobile menu
    'Desktop Notification Test' : function (browser) {
        runTheTest(browser, BrowserMode.desktop);
    }
};