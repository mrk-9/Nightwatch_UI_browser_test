const { format } = require('date-fns');

const promotionJobTitleOne = 'SR 2';
const promotionJobTitleTwo = 'SR 3';
const promotionPercentage = 2;

const today = Date.now();
const message = format(today, 'MMM DD, YYYY at HH:mma');
const promotionComment = format(today, 'MM/DD/YYYY');
const promotionNotProvidedText = 'Not provided';

const buttonIsDisabled = 'true';
const buttonIsNotDisabled = function(result) {
    this.assert.equal(result.value, null)
}

const parseAmount = function(amount) {
    return parseInt(amount.replace(/[$,A-Za-z ]/g, ''))
}

let currentPay, promotionAmount, previousNewPay, currentNewPay;

const commands = {
    createNewPromotion: function(browser) {
        return this
                .api
                .page.managerDecisionView()
                .waitForElementVisible('@promotionRequestButton')
                .click('@promotionRequestButton')
                .waitForElementVisible('@promotionRangeChartView')
                .assert.elementPresent('@promotionRangeChartView')
                .assert.attributeEquals('@promotionResetButton', 'disabled', "true")
                .assert.attributeEquals('@promotionSaveButton', 'disabled', "true")
                .click('@promotionJobTitle')
                .click('@promotionJobTitleRequestNewJob')
                .setValue('@promotionJobTitleInput', promotionJobTitleOne)
                .getText('@promotionCurrentPay', function(selector) {
                    currentPay = parseAmount(selector.value);
                })
                .getText('@promotionNewPay', function(selector) {
                    previousNewPay = parseAmount(selector.value);
                })
                .setValue('@promotionAmount', promotionPercentage)
                .setValue('@promotionComment', promotionComment)
                .click('@promotionSaveButton')
                .waitForElementVisible('@promotionLoadingIcon')
                .waitForElementNotVisible('@promotionLoadingIcon')
                .waitForElementVisible('.messages')
                .assert.containsText('@commentViewer', promotionComment)
                .assert.elementNotPresent('@promotionSaveButton')
                .assert.attributeEquals('@promotionResetButton', 'disabled', buttonIsDisabled)
                .assert.attributeEquals('@promotionUpdateButton', 'disabled', buttonIsDisabled)
                .getAttribute('@promoDeleteButton', 'disabled', buttonIsNotDisabled)
                .getText('@promotionPromotionAmount', function(selector) {
                    promotionAmount = parseAmount(selector.value);
                    browser.assert.ok((currentPay*promotionPercentage)/100 === promotionAmount);
                })
                .getText('@promotionNewPay', function(selector) {
                    currentNewPay = parseAmount(selector.value);
                    browser.assert.ok(currentNewPay === previousNewPay + promotionAmount);
                })
                .getText('@budgetPromotionSpent', function(selector) {
                    spentOnPromotion = parseAmount(selector.value);
                    browser.assert.ok(spentOnPromotion === promotionAmount)
                })
    },
    updatePromotion: function(browser) {
        return this
                .api
                .page.managerDecisionView()
                .setValue('@promotionJobTitleInput', promotionJobTitleTwo)
                .assert.elementNotPresent('@promotionSaveButton')
                .getAttribute('@promoDeleteButton', 'disabled', buttonIsNotDisabled)
                .getAttribute('@promotionResetButton', 'disabled', buttonIsNotDisabled)
                .getAttribute('@promotionUpdateButton', 'disabled', buttonIsNotDisabled)
                .click('@promotionUpdateButton')
                .waitForElementVisible('@promotionLoadingIcon')
                .waitForElementNotVisible('@promotionLoadingIcon')
                .assert.elementNotPresent('@promotionSaveButton')
                .assert.attributeEquals('@promotionResetButton', 'disabled', buttonIsDisabled)
                .assert.attributeEquals('@promotionUpdateButton', 'disabled', buttonIsDisabled)
                .getAttribute('@promoDeleteButton', 'disabled', buttonIsNotDisabled)
                .getText('@promotionPromotionAmount', function(selector) {
                    promotionAmount = parseAmount(selector.value);
                    browser.assert.ok((currentPay*promotionPercentage)/100 === promotionAmount);
                })
                .getText('@promotionNewPay', function(selector) {
                    currentNewPay = parseAmount(selector.value);
                    browser.assert.ok(currentNewPay === previousNewPay + promotionAmount);
                })
                .getText('@budgetPromotionSpent', function(selector) {
                    spentOnPromotion = parseAmount(selector.value);
                    browser.assert.ok(spentOnPromotion === promotionAmount)
                })
    },
    deletePromotion: function(browser) {
        return this 
                .api
                .page.managerDecisionView()
                .setValue('@promotionJobTitleInput', promotionJobTitleTwo)
                .waitForElementVisible('@promoDeleteButton')
                .click('@promoDeleteButton')
                .waitForElementVisible('@promotionLoadingIcon')
                .waitForElementNotPresent('@promotionLoadingIcon')
                .assert.elementNotPresent('@commentViewer')
                .assert.elementNotPresent('@promoDeleteButton')
                .assert.elementNotPresent('@promotionUpdateButton')
                .assert.attributeEquals('@promotionResetButton', 'disabled', buttonIsDisabled)
                .assert.attributeEquals('@promotionSaveButton', 'disabled', buttonIsDisabled)
                .assert.containsText('@promotionPromotionAmount', promotionNotProvidedText)
                .getText('@promotionNewPay', function(selector) {
                    currentNewPay = parseAmount(selector.value);
                    browser.assert.ok(currentNewPay === previousNewPay);
                })
                .getText('@budgetPromotionSpent', function(selector) {
                    spentOnPromotion = parseAmount(selector.value);
                    browser.assert.ok(spentOnPromotion === 0)
                })
    }
};

module.exports = {
    commands: [commands],
    url: function() {
        return this.globals.baseUrl;
    },
    props: {
    },
    elements: {
    }
}