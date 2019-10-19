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

        .api
        .page.cycleConfiguration()
        .saveWorkflowSettings(browser.globals.userLogin.userEmail)
        .saveCycleSettings()
        
        .api
        .page.dashboard()
        .moveEmployeeToInProgress()
}

const testCreateModifyDeletePromo = browser => {
    browser
        // Open summary-in-progress
        .page.dashboard()
        .waitForElementNotPresent('@summaryInProgressValueZero')
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')

        // Open conversation section and test it
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .click('@selectEmployeeButton')

        // create a new promotion
        .api
        .page.promotion()
        .createNewPromotion(browser)

        // modify the promotion
        .api
        .page.promotion()
        .updatePromotion(browser)
  
        // delete the promotion
        .api
        .page.promotion()
        .deletePromotion(browser)
};

const testCleanup = browser => {
    browser
        .page.cycleConfiguration()
        .closeCycle()

        .api
        .end();
};

module.exports = {
    'Test setup': browser => {
        testSetup(browser, BrowserMode.desktop);
    },
    'Test create modify delete promo': browser => {
        testCreateModifyDeletePromo(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};
