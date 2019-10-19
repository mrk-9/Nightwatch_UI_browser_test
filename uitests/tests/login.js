const { setup, BrowserMode} = require('../src/testsetup');

const runTheTest = (browser, browserMode) => {
    setup(browser, browserMode);
    browser.page.sso()
        .initLoginState()
        .url(browser.globals.baseUrl)
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .api
        .waitForElementPresent('#team-app')
        .end();
};

module.exports = {
    'Mobile Login/Logout Test' : function (browser) {
        runTheTest(browser, BrowserMode.mobile);
    },
    'Desktop Login/Logout Test' : function (browser) {
        runTheTest(browser, BrowserMode.desktop);
    }
};