const { setup, BrowserMode} = require('../src/testsetup');
const { format } = require('date-fns');

const today = Date.now();
const message = format(today, '[Test on] MMM DD [at] HH:mma');
const todayDate = format(today, 'MM/DD/YYYY');
let lastMessageTime, currentMessageTime;
const ineligibleText = 'Ineligible';


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
        .createBudget(budgetType.MarketAdjustment)
        .createBudget(budgetType.VariablePay)
        .createBudget(budgetType.Stock)

        .api
        .page.cycleConfiguration()
        .saveWorkflowSettings(browser.globals.userLogin.userEmail)
        .saveCycleSettings()
        
        .api
        .page.dashboard()
        .moveEmployeeToInProgress()
}

const testPostNewMessage = browser => {
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
        .click('@chatIcon')
        .api
        .page.conversation()
        .waitForElementVisible('@conversationHistoryLoading')
        .waitForElementNotPresent('@conversationHistoryLoading')
        .getText('@lastMessageTime', function(text) {
            lastMessageTime = text.value;
        })

        .setValue('@conversationTextbox', [message, browser.Keys.ENTER])
        .waitForElementVisible('@newMessageLoading')
        .waitForElementNotPresent('@newMessageLoading')
        .assert.containsText('@lastMessageText', message)
        .getText('@lastMessageTime', function(text) {
            currentMessageTime = text.value;
            let lastMessageDateTime = new Date(`${todayDate} ${lastMessageTime}`).getTime();
            let currentMessageDateTime = new Date(`${todayDate} ${currentMessageTime}`).getTime();
            browser.assert.ok(lastMessageDateTime < currentMessageDateTime);
        })

        .click('@closeConversationWindow')
        .waitForElementNotPresent('@conversationTextbox')
}

const testEligibilityOverride = browser => {
    browser
        .page.managerDecisionView()
        .assert.elementNotPresent('@stockIncreaseByAmountTextBox')
        .click('@selectEmployeeButton')

        .api
        .page.managerDecisionView()    
        .waitForElementPresent('@eligibilityAndProrationOverrideButton')
        .click('@eligibilityAndProrationOverrideButton')
        .waitForElementVisible('@eligibilityAndProrationOverrideModal')

        .click('@eligibilityAndProrationModalIncreaseCheckbox')
        .click('@eligibilityAndProrationModalBonusCheckbox')
        .click('@eligibilityAndProrationModalPromotionCheckbox')
        .click('@eligibilityAndProrationModalLumpSumCheckbox')
        .click('@eligibilityAndProrationModalMarketAdjCheckbox')
        .click('@eligibilityAndProrationModalVariablePayCheckbox')
        .click('@eligibilityAndProrationModalStockCheckbox')
        .click('@eligibilityAndProrationModalSaveButton')
        .waitForElementNotPresent('@eligibilityAndProrationOverrideModal')

        .assert.elementNotPresent('@amountIncreasePercentageInput')
        .assert.elementNotPresent('@amountBonusPercentageInput')
        .assert.elementNotPresent('@amountLumpSumPercentageInput')
        .assert.elementNotPresent('@amountMarketAdjustmentPercentageInput')
        .assert.elementNotPresent('@amountVariablePayPercentageInput')
        .assert.elementNotPresent('@amountStockValueInput')

        .assert.containsText('@amountIncreaseEligibilityText', ineligibleText)
        .assert.containsText('@amountBonusEligibilityText', ineligibleText)
        .assert.containsText('@amountLumpSumEligibilityText', ineligibleText)
        .assert.containsText('@amountMarketAdjustmentEligibilityText', ineligibleText)
        .assert.containsText('@amountVariablePayEligibilityText', ineligibleText)
        .assert.containsText('@amountStockEligibilityText', ineligibleText)

        .waitForElementPresent('@promotionRequestButton')
        .click('@promotionRequestButton')
        .waitForElementPresent('@promotionIneligible')
        .assert.elementPresent('@promotionIneligible')

        .waitForElementVisible('@currentCycleTab')
        .click('@currentCycleTab')
        .waitForElementPresent('@eligibilityAndProrationOverrideButton')
        .click('@eligibilityAndProrationOverrideButton')
        .waitForElementVisible('@eligibilityAndProrationOverrideModal')

        .click('@eligibilityAndProrationModalIncreaseCheckbox')
        .click('@eligibilityAndProrationModalBonusCheckbox')
        .click('@eligibilityAndProrationModalPromotionCheckbox')
        .click('@eligibilityAndProrationModalLumpSumCheckbox')
        .click('@eligibilityAndProrationModalMarketAdjCheckbox')
        .click('@eligibilityAndProrationModalVariablePayCheckbox')
        .click('@eligibilityAndProrationModalStockCheckbox')
        .click('@eligibilityAndProrationModalSaveButton')
        .waitForElementNotPresent('@eligibilityAndProrationOverrideModal')

        .assert.elementPresent('@amountIncreasePercentageInput')
        .assert.elementPresent('@amountBonusPercentageInput')
        .assert.elementPresent('@amountLumpSumPercentageInput')
        .assert.elementPresent('@amountMarketAdjustmentPercentageInput')
        .assert.elementPresent('@amountVariablePayPercentageInput')
        .assert.elementPresent('@amountStockValueInput')

        .waitForElementPresent('@promotionRequestButton')
        .click('@promotionRequestButton')
        .waitForElementVisible('@promotionRangeChartView')
        .assert.elementPresent('@promotionRangeChartView')
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
    'Test post new message': browser => {
        testPostNewMessage(browser);
    },
    'Test eligibility override': browser => {
        testEligibilityOverride(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};