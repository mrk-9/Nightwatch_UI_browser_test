const { setup, BrowserMode} = require('../src/testsetup');
const partialName = 'car';
const fullName = 'Carl Sanders';

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
        .api
        .page.dashboard()
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')
        
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .setValue('@searchBar', [partialName, browser.Keys.ENTER])
        .waitForElementVisible('@searchResult')
        .assert.attributeEquals('@searchBar', 'value', partialName)
        .setValue('@searchBar', [browser.Keys.ENTER])
        .assert.attributeEquals('@searchBar', 'value', fullName)

        .api
        .end();
};

module.exports = {
    'Verify employee search' : function (browser) {
        runTheTest(browser, BrowserMode.desktop);
    }
};
