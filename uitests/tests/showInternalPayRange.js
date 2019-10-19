const { setup, BrowserMode} = require('../src/testsetup');
const compaRatioText = 'Compa Ratio';
const rangePenetrationText = 'Range Penetration';

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

const testShowInternalPayRange = browser => {
    browser
        .page.dashboard()
        // Navigate to cycle configuration
        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@cycleSettings')
        .click('@cycleSettings')
        .assert.elementNotPresent('@internalPayRangeCheckboxUnchecked')
        .click('@rangePenetrationRadioButton')
        .assert.visible('@rangePenetrationRadioButtonSelected')
        
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
        .assert.containsText('@rangePenetrationText', rangePenetrationText)

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
        .assert.elementNotPresent('@internalPayRangeCheckboxUnchecked')
        .click('@compaRatioRadioButton')
        .assert.visible('@compaRatioRadioButtonSelected')
        .click('@compaRatioShowAsHundredRadioButton')
        .assert.visible('@compaRatioShowAsHundredRadioButtonSelected')
        
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
        .assert.containsText('@rangePenetrationText', compaRatioText)

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
        .assert.elementNotPresent('@internalPayRangeCheckboxUnchecked')
        .click('@compaRatioRadioButton')
        .assert.visible('@compaRatioRadioButtonSelected')
        .click('@compaRatioShowAsOneRadioButton')
        .assert.visible('@compaRatioShowAsOneRadioButtonSelected')
        
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
        .assert.containsText('@rangePenetrationText', compaRatioText)
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
    'Test show internal pay range': browser => {
        testShowInternalPayRange(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};
