const { setup, BrowserMode} = require('../src/testsetup');
const { format } = require('date-fns');

const testSetup = (browser, browserMode) => {
    setup(browser, browserMode);
    
    const budgetType = browser.page.budgetConfiguration().props.budgetType;

    browser.page.sso()
        .initLoginState()
        .url(browser.globals.baseUrl)
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        .api
        .page.cycleConfiguration()
        .createCycle()
        
        .api
        .page.budgetConfiguration()
        .createBudget(budgetType.Increase)
        .createBudget(budgetType.Bonus)
        .createBudget(budgetType.Promo)
        .createBudget(budgetType.LumpSum)

        // turn on
        .api
        .page.budgetConfiguration()
        .click('@groupEmployeesByCountryEnable')
        .waitForElementPresent('@groupEmployeesByCountryEnabled')
        .assert.elementPresent('@groupEmployeesByCountryEnabled')

        .api
        .page.cycleConfiguration()
        .saveWorkflowSettings(browser.globals.userLogin.userEmail)
        .saveCycleSettings()
        
        .api
        .page.dashboard()
        .moveEmployeeToInProgress()
};

const testVerifyGroupingByCountry = browser => {
    browser
        .page.tp()
        .click('@overviewButton')
        .api
        .page.dashboard()
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')
        
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.elementNotPresent('@countrySeparator')

        // turn off
        .api
        .page.tp()
        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@budgetsSettings')
        .api
        .page.budgetConfiguration()
        .click('@groupEmployeesByCountryDisable')
        .waitForElementPresent('@groupEmployeesByCountryDisabled')
        .assert.elementPresent('@groupEmployeesByCountryDisabled')

        //
        .api
        .page.tp()
        .click('@overviewButton')
        .api
        .page.dashboard()
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')
        
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.elementNotPresent('@countrySeparator')
};

const testCleanup = browser => {
    browser
        .page.cycleConfiguration()
        .closeCycle()

        .api
        .end();
}

module.exports = {
    'Test setup': browser => {
        testSetup(browser, BrowserMode.desktop);
    },
    'Test verify grouping by country': browser => {
        testVerifyGroupingByCountry(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }

};
