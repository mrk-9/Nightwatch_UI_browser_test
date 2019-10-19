const { setup, BrowserMode} = require('../src/testsetup');

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
}

const testCreateDeleteCycle = browser => {
    browser
        // Navigate to cycle configuration
        .page.cycleConfiguration()
        .click('@showTccCheckbox')
        .assert.visible('@tccCheckboxUnchecked')

        .click('@showPerformanceRatingCheckbox')
        .assert.visible('@performanceRatingCheckboxUnchecked')

        .click('@showIncreaseRecommendationCheckbox')
        .assert.visible('@increaseRecommendationCheckboxUnchecked')

        .click('@showInternalPayRangeCheckbox')
        .assert.visible('@internalPayRangeCheckboxUnchecked')

        .click('@displayFieldsInCompSummaryCheckbox')
        .assert.visible('@displayFieldsInCompSummaryCheckboxUnchecked')

        .saveCycleChanges()

        .api
        .page.tp()
        .click('@overviewButton')
        .api
        .page.dashboard()
        .waitForElementVisible('@summaryOpen')
        .click('@summaryOpen')
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .api
        .page.conversation()
        .assert.elementNotPresent('@perfPayRangeView')
        .assert.elementNotPresent('@tccView')
        .assert.elementNotPresent('@increaseRecommendationView')
        .api
        .page.managerDecisionView()
        .click('@selectEmployeeButton')
        .assert.elementNotPresent('@internalPayRangeView')
        .assert.elementNotPresent('@increaseRowView')
        .assert.elementNotPresent('@promotionRowView')
        .assert.elementNotPresent('@lumpSumRowView')
        .assert.elementNotPresent('@bonusRowView')
        .assert.elementNotPresent('@lastPaidStiRowView')
        .assert.elementNotPresent('@otherCashRowView')
        .assert.elementNotPresent('@commissonsRowView')
        .click('@promotionRequestButton')
        .assert.elementNotPresent('@promotionRangeChartView')
        .api
        .page.tp()
        .click('@overviewButton')
        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@cycleSettings')
        .click('@cycleSettings')
        .click('@showTccCheckbox')
        .assert.elementNotPresent('@tccCheckboxUnchecked')

        .click('@showPerformanceRatingCheckbox')
        .assert.elementNotPresent('@performanceRatingCheckboxUnchecked')

        .click('@showIncreaseRecommendationCheckbox')
        .assert.elementNotPresent('@increaseRecommendationCheckboxUnchecked')

        .click('@showInternalPayRangeCheckbox')
        .assert.elementNotPresent('@internalPayRangeCheckboxUnchecked')

        .click('@displayFieldsInCompSummaryCheckbox')
        .assert.elementNotPresent('@displayFieldsInCompSummaryCheckboxUnchecked')

        .saveCycleChanges()
        
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
        .api
        .page.conversation()
        .assert.elementPresent('@perfPayRangeView')
        .assert.elementPresent('@tccView')
        .assert.elementPresent('@increaseRecommendationView')
        .api
        .page.managerDecisionView()
        .click('@selectEmployeeButton')
        .assert.elementPresent('@internalPayRangeView')
        .assert.elementPresent('@currentPayRowView')
        .assert.elementPresent('@increaseRowView')
        .assert.elementPresent('@promotionRowView')
        .assert.elementPresent('@lumpSumRowView')
        .assert.elementPresent('@bonusRowView')
        .assert.elementPresent('@lastPaidStiRowView')
        .assert.elementPresent('@otherCashRowView')
        .assert.elementPresent('@commissonsRowView')
        .click('@promotionRequestButton')
        .waitForElementVisible('@promotionRangeChartView')
        .assert.elementPresent('@promotionRangeChartView')
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
    'Test Create/Delete Cycle': browser => {
        testCreateDeleteCycle(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};