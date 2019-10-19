const { setup, BrowserMode} = require('../src/testsetup');

const teamIsLockedText = 'Team is locked for review';

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

const testBudgetVerify = browser => {
    browser
        // logout from hr
        .page.tp()
        .waitForElementVisible('@logout')
        .click('@logout')

        // login as manager
        .api
        .page.sso()
        .login(browser.globals.managerLogin.userEmail, browser.globals.managerLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        // Open summary-in-progress
        .api
        .page.dashboard()
        .waitForElementNotPresent('@summaryInProgressValueZero')
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')

        // wait for chat icon to show up
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .click('@selectEmployeeButton')
        .waitForElementVisible('@amountIncreasePercentageInput')
        .assert.elementPresent('@amountIncreasePercentageInput')
        .assert.elementPresent('@amountBonusPercentageInput')

        // create a new promotion
        .api
        .page.promotion()
        .createNewPromotion()

        // Send for review
        .api
        .page.managerDecisionView()
        .sendForReview()

        .assert.elementNotPresent('@amountIncreasePercentageInput')
        .assert.elementNotPresent('@amountBonusPercentageInput')

        .api
        .page.tp()
        .click('@overviewButton')

        .api
        .page.dashboard()
        .waitForElementNotPresent('@summaryPendingReviewValueZero')
        .waitForElementVisible('@summaryPendingReview')
        .click('@summaryPendingReview')

        // wait for chat icon to show up
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.containsText('@teamIsLockedText', teamIsLockedText)

        // logout from manager view
        .api
        .page.tp()
        .waitForElementVisible('@logout')
        .click('@logout')

        // login to hr view
        .api
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        // Open pending-review
        .api
        .page.dashboard()
        .waitForElementNotPresent('@summaryPendingReviewValueZero')
        .waitForElementVisible('@summaryPendingReview')
        .click('@summaryPendingReview')

        // Send back to manager
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .sendBack()

        // logout from hr
        .api
        .page.tp()
        .waitForElementVisible('@logout')
        .click('@logout')

        // login to manager view
        .api
        .page.sso()
        .login(browser.globals.managerLogin.userEmail, browser.globals.managerLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        // Open summary-in-progress
        .api
        .page.dashboard()
        .waitForElementNotPresent('@summaryInProgressValueZero')
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')

        // wait for chat icon to show up
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .click('@selectEmployeeButton')
        .assert.elementPresent('@amountIncreasePercentageInput')
        .assert.elementPresent('@amountBonusPercentageInput')

        // logout from manager view
        .api
        .page.tp()
        .waitForElementVisible('@logout')
        .click('@logout')

        // login to hr view
        .api
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')
}

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
    'Test Budget verify': browser => {
        testBudgetVerify(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};