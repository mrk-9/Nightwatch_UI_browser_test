const { setup, BrowserMode} = require('../src/testsetup');
const firstBonusPercentageAmount = '2';
const secondBonusPercentageAmount = '10';

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
        
        // change Bonus %
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .click('@amountBonusPercentageInput')
        .clearValue('@amountBonusPercentageInput')
        .setValue('@amountBonusPercentageInput', [firstBonusPercentageAmount, browser.Keys.ENTER])
        // it's associated with TEAMEXT-17
        .pause(5000)
        .click('@historyButton')
        .waitForElementVisible('@historyLoadingOverlay')
        .waitForElementNotVisible('@historyLoadingOverlay')
        .waitForElementVisible('@returnToTeamViewButton')
        .click('@returnToTeamViewButton')

        // change Bonus %
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .click('@amountBonusPercentageInput')
        .clearValue('@amountBonusPercentageInput')
        .setValue('@amountBonusPercentageInput', [secondBonusPercentageAmount, browser.Keys.ENTER])
        // it's associated with TEAMEXT-17
        .pause(5000)
        .click('@historyButton')
        .waitForElementVisible('@historyLoadingOverlay')
        .waitForElementNotVisible('@historyLoadingOverlay')
        .waitForElementVisible('@returnToTeamViewButton')
        .click('@returnToTeamViewButton')
        .api
        .end();
};

module.exports = {
    'Verify bonus change' : function (browser) {
        runTheTest(browser, BrowserMode.desktop);
    }
};
