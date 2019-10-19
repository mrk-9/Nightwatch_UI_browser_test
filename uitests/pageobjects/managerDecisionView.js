const commands = {
    sendForReview: function() {
        return this
                .click('@sendForReviewButton')
                .waitForElementVisible('@sendForReviewConfirmationButton')
                .click('@sendForReviewConfirmationButton')
                .waitForElementVisible('@sendForReviewButton')
                .waitForElementNotPresent('@sendForReviewButton')
    },
    sendBack: function() {
        return this
                .click('@sendBackButton')
                .waitForElementVisible('@sendBackConfirmationButton')
                .click('@sendBackConfirmationButton')
                .waitForElementVisible('@sendBackButton')
                .waitForElementNotPresent('@sendBackButton')
    }
};

module.exports = {
    commands: [commands],
    elements: {
        chatIcon: {
            selector: '.employee-card-list:nth-child(1) > div:nth-child(1) > div > div.right-box > div.flex-row.pay-totals > div.conversation-badge-container > span > button > i',
        },
        selectEmployeeButton: {
            selector: '.employee-card:first-child>div>div'
        },
        internalPayRangeView: {
            selector: '.nomst-range-penetration__chart-svg'
        },
        currentPayRowView: {
            selector: '.summary-table__current-pay'
        },
        increaseRowView: {
            selector: '.summary-table__merit'
        },
        promotionRowView: {
            selector: '.summary-table__promotion'
        },
        lumpSumRowView: {
            selector: '.summary-table__lumpSum'
        },
        bonusRowView: {
            selector: '.summary-table__bonus'
        },
        lastPaidStiRowView: {
            selector: '.summary-table__last-paid-sti.tcc-component'
        },
        otherCashRowView: {
            selector: '.summary-table__other-cash.tcc-component'
        },
        commissonsRowView: {
            selector: '.summary-table__commissions.tcc-component'
        },
        currentCycleTab: {
            selector: '.employee-tab--cycleinfo'
        },
        promotionRequestButton: {
            selector: '.employee-tab--promotionrequest',
        },
        promotionResetButton: {
            selector: "//button[text()='Reset']",
            locateStrategy: 'xpath'
        },
        promotionSaveButton: {
            selector: "//button[text()='Save']",
            locateStrategy: 'xpath'
        },
        promotionUpdateButton: {
            selector: "//button[text()='Update Request']",
            locateStrategy: 'xpath'
        },
        promoDeleteButton: {
            selector: "//button[text()='Delete Request']",
            locateStrategy: 'xpath'
        },
        promotionJobTitleInput: {
            selector: '#newJobTitleInput'
        },
        promotionAmount: {
            selector: '.amount__promotion--percentage > input'
        },
        promotionComment: {
            selector: '#postcomment'
        },
        promotionJobTitle: {
            selector: '#selectPromotionJob'
        },
        promotionJobTitleRequestNewJob: {
            selector: '#selectId option[value="-"]'
        },
        promotionLoadingIcon: {
            selector: '.icon-animate-spin.icon-spin.update-request'
        },
        employeeDetailsButton: {
            selector: '.employee-tab--employeeinfo'
        },
        commentViewer: {
            selector: '.message.message-mine > p'
        },
        promotionRangeChartView: {
            selector: '.range-chart-header'
        },
        compRatioText: {
            selector: '.perf-pay-range > div > div'
        },
        rangePenetrationText: {
            selector: '.perf-pay-range > div > div'
        },
        stockIncreaseByAmountTextBox: {
            selector: '#increaseByAmount'
        },
        employeeInputControls: {
            selector: '.employee-card__row input[type="text"]'
        },
        nextTeam: {
            selector: '.manager-list-card.manager-selected + div'
        },
        increaseCurrentPayTextbox: {
            selector: '.employee-card-list:nth-child(1) .amount-container--merit .amount__merit-percentage input'
        },
        historyButton: {
            selector: "//span[text()='History']",
            locateStrategy: 'xpath'
        },
        returnToTeamViewButton: {
            selector: '.change-history .link-icon a'
        },
        historyLoadingOverlay: {
            selector: '.status-overlay'
        },
        searchBar: {
            selector: '.employee-search-container input'
        },
        searchResult: {
            selector: '.react-autosuggest__suggestions-container.react-autosuggest__suggestions-container--open'
        },
        amountIncreasePercentageInput: {
            selector: '.employee-card:nth-child(1) .amount__merit--percentage input'
        },
        amountIncreaseValueInput: {
            selector: '.employee-card:nth-child(1) .amount__merit--value input'
        },
        amountIncreaseEligibilityText: {
            selector: '.eligibility-tooltip--merit .pxl-tooltip'
        },
        amountBonusPercentageInput: {
            selector: '.employee-card:nth-child(1) .amount__bonus-percentage input'
        },
        amountBonusValueInput: {
            selector: '.employee-card:nth-child(1) .amount__bonus-value input'
        },
        amountBonusEligibilityText: {
            selector: '.eligibility-tooltip--bonus .pxl-tooltip'
        },
        amountLumpSumPercentageInput: {
            selector: '.employee-card:nth-child(1) .amount__lumpSum--percentage input'
        },
        amountLumpSumValueInput: {
            selector: '.employee-card:nth-child(1) .amount__lumpSum--value input'
        },
        amountLumpSumEligibilityText: {
            selector: '.eligibility-tooltip--lumpSum .pxl-tooltip'
        },
        amountMarketAdjustmentPercentageInput: {
            selector: '.employee-card:nth-child(1) .amount__marketAdjustment-percentage input'
        },
        amountMarketAdjustmentValueInput: {
            selector: '.employee-card:nth-child(1) .amount__marketAdjustment-value input'
        },
        amountMarketAdjustmentEligibilityText: {
            selector: '.eligibility-tooltip--marketAdjustment .pxl-tooltip'
        },
        amountVariablePayPercentageInput: {
            selector: '.employee-card:nth-child(1) .amount__variablePay--percentage input' 
        },
        amountVariablePayValueInput: {
            selector: '.employee-card:nth-child(1) .amount__variablePay--value input' 
        },
        amountVariablePayEligibilityText: {
            selector: '.eligibility-tooltip--variablePay .pxl-tooltip'
        },
        amountStockSharesInput: {
            selector: '.employee-card:nth-child(1) .amount__stock--shares input'
        },
        amountStockValueInput: {
            selector: '.employee-card:nth-child(1) .amount__stock--value input'
        },
        amountStockEligibilityText: {
            selector: '.eligibility-tooltip--stock .pxl-tooltip'
        },
        budgetIncreaseHeader: {
            selector: '.budget-increase'
        },
        budgetBonusHeader: {
            selector: '.budget-bonus'
        },
        budgetLumpSumHeader: {
            selector: '.budget-lump'
        },
        budgetPromotionHeader: {
            selector: '.budget-promotion'
        },
        budgetStockHeader: {
            selector: '.budget-stock'
        },
        sendForReviewButton: {
            selector: '//button[text()="Send for Review"]',
            locateStrategy: 'xpath'
        },
        sendForReviewConfirmationButton: {
            selector: '//div[@class="btn-options"]//button[text()="Send for Review"]',
            locateStrategy: 'xpath'
        },
        sendBackButton: {
            selector: '//button[text()="Send Back"]',
            locateStrategy: 'xpath'
        },
        sendBackConfirmationButton: {
            selector: '//div[@class="btn-options"]//button[text()="Send Back"]',
            locateStrategy: 'xpath'
        },
        promotionCurrentPay: {
            selector: '.promotion-request-container .pay-text__pay'
        },
        promotionNewPay: {
            selector: '.promotion-request-container .pay-text--new-pay'
        },
        promotionPromotionAmount: {
            selector: '.promotion-request-container .comp-summary-row--promotion .converted-pay'
        },
        budgetPromotionSpent: {
            selector: '.country-budget-card__budget-promotion .budget-sub-container:nth-child(2)>.budget-data'
        },
        teamIsLockedText: {
            selector: '.right-team-header>span'
        },
        eligibilityAndProrationOverrideButton: {
            selector: '.employee-detail-view .pxl-padding-right-large > a > span'
            //selector: '//span[text()="Eligibility & Proration Override"]//ancestor::a',
            //locateStrategy: 'xpath'
        },
        eligibilityAndProrationOverrideModal:{
            selector: '.eligibility-modal'
        },
        eligibilityAndProrationModalIncreaseCheckbox: {
            selector: '.eligibility-modal tr:nth-child(1) label'
        },
        eligibilityAndProrationModalBonusCheckbox: {
            selector: '.eligibility-modal tr:nth-child(2) label'
        },
        eligibilityAndProrationModalPromotionCheckbox: {
            selector: '.eligibility-modal tr:nth-child(3) label'
        },
        eligibilityAndProrationModalLumpSumCheckbox: {
            selector: '.eligibility-modal tr:nth-child(4) label'
        },
        eligibilityAndProrationModalMarketAdjCheckbox: {
            selector: '.eligibility-modal tr:nth-child(5) label'
        },
        eligibilityAndProrationModalVariablePayCheckbox: {
            selector: '.eligibility-modal tr:nth-child(6) label'
        },
        eligibilityAndProrationModalStockCheckbox: {
            selector: '.eligibility-modal tr:nth-child(7) label'
        },
        eligibilityAndProrationModalSaveButton: {
            selector: '//button[text()="Save Changes"]',
            locateStrategy: 'xpath'
        },
        countrySeparator: {
            selector: '.pxl-box collapse__header:nth-child(1)'
        },
        promotionIneligible: {
            selector: '.promotion-ineligible'
        }
    }
};