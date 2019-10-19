const { setup, BrowserMode} = require('../src/testsetup');

const listOfBudgets = 'Increase, Bonus, Promotion, Lump Sum, Stock';
const numberOfShareStockText = '# of share stock';

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
        
        // Create budgets
        .api
        .page.budgetConfiguration()
        .createBudget(budgetType.Increase)
        .createBudget(budgetType.Bonus)
        .createBudget(budgetType.Promo)
        .createBudget(budgetType.LumpSum)
        .createBudget(budgetType.Stock)
        .assert.containsText('@listOfBudgets', listOfBudgets)

        // Modify cycle settings
        .api
        .page.cycleConfiguration()
        .saveWorkflowSettings(browser.globals.userLogin.userEmail)
        .saveCycleSettings()
}

const testCreateDeleteBudgets = browser => {
    browser
        // Open the employee view
        .page.tp()
        .click('@overviewButton')
        .api
        .page.dashboard()
        .waitForElementNotPresent('@summaryOpenValueZero')
        .waitForElementVisible('@summaryOpen')
        .click('@summaryOpen')
        
        // Verify budget details
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.elementPresent('@amountIncreasePercentageInput')
        .assert.elementPresent('@amountIncreaseValueInput')
        .assert.elementPresent('@amountBonusPercentageInput')
        .assert.elementPresent('@amountBonusValueInput')
        .assert.elementPresent('@amountLumpSumPercentageInput')
        .assert.elementPresent('@amountLumpSumValueInput')
        .assert.elementPresent('@amountStockSharesInput')
        .assert.elementPresent('@budgetIncreaseHeader')
        .assert.elementPresent('@budgetBonusHeader')
        .assert.elementPresent('@budgetLumpSumHeader')
        .assert.elementPresent('@budgetPromotionHeader')
        .assert.elementPresent('@budgetStockHeader')
        
        // Change budget stock settings
        .api
        .page.tp()
        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@budgetsSettings')
        .click('@budgetsSettings')
        .api
        .page.budgetConfiguration()
        .waitForElementVisible('@budgetStockPanel')
        .click('@budgetStockPanel')
        .waitForElementVisible('@budgetSettingsButton')
        .click('@budgetSettingsButton')
        .waitForElementVisible('@createBudgetModal')
        .click('@stockMonetaryValueRadioButton')
        .assert.visible('@stockMonetaryValueRadioButtonChecked')
        .setValue('@stockValue', 5)
        .click('@allowManagerToOverBudgetCheckbox')
        .assert.visible('@allowManagerToOverBudgetCheckboxChecked')
        .click('@saveChangesButton')
        .waitForElementNotPresent('@createBudgetModal')

        .api
        .page.tp()
        .click('@overviewButton')
        .api
        .page.dashboard()
        .waitForElementNotPresent('@summaryOpenValueZero')
        .waitForElementVisible('@summaryOpen')
        .click('@summaryOpen')
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.elementPresent('@amountStockValueInput')

        // Go to cycle config
        .api
        .page.tp()
        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@budgetsSettings')
        .click('@budgetsSettings')
};

const testCleanup = browser => {
    browser
        // Delete budgets
        .page.budgetConfiguration()
        .deleteBudget(budgetType.Increase)
        .deleteBudget(budgetType.Bonus)
        .deleteBudget(budgetType.Promo)
        .deleteBudget(budgetType.LumpSum)
        .deleteBudget(budgetType.Stock)

        // Close cycle
        .api
        .page.cycleConfiguration()
        .closeCycle()

        .api
        .end();
};

module.exports = {
    'Test setup': browser => {
        testSetup(browser, BrowserMode.desktop);
    },
    'Test create and delete all budgets': browser => {
        testCreateDeleteBudgets(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};