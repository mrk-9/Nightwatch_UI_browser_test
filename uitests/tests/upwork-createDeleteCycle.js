const { setup, BrowserMode} = require('../src/testsetup');
const { format } = require('date-fns');

const runTheTest = (browser, browserMode) => {
    setup(browser, browserMode);
    browser.page.sso()
        .initLoginState()
        .url(browser.globals.baseUrl)
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        // Upwork code start
        // Tip: might be able to find existing pageobjects (for example, @splashloading on the line above) but for cycles in /uitests/pageobjects
        // Cycle start date should be (today + 7 days)
        // Cycle end date should be (today + 14 days)

        // Navigate to cycle configuration

        // Create a new cycle

        // Delete the cycle

        // Upwork code end
        // Test is completed by calling this
        .end();
};

module.exports = {
    'Desktop Create/Delete Cycle Test' : function (browser) {
        runTheTest(browser, BrowserMode.desktop);
    }
};