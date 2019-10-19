const modalMessage = 'Are you sure you want to delete budgetName budget?';

const commands = {
    createBudget: function(budgetType) {
        return this
                .waitForElementVisible('@createNewBudgetButton')
                .click('@createNewBudgetButton')
                .waitForElementVisible('@createBudgetModal')
                .setValue('@budgetName', budgetType.budgetName)
                .click(budgetType.pillSelector)
                .click('@createBudgetButton')
                .waitForElementNotPresent('@createBudgetModal')
                .assert.containsText(budgetType.budgetPanelText, budgetType.budgetName)
                .assert.containsText(budgetType.budgetPanelAssociatedFieldsText, budgetType.budgetName)
    },
    deleteBudget: function(budgetType) {
        return this
                .api
                .page.budgetConfiguration()
                .waitForElementVisible(budgetType.panel)
                .click(budgetType.panel)
                .waitForElementVisible('@budgetSettingsButton')
                .click('@budgetSettingsButton')
                .waitForElementVisible('@createBudgetModal')
                .click('@deleteBudgetButton')
                .waitForElementVisible('@okButton')
                .assert.containsText('@modalBody', modalMessage.replace('budgetName', budgetType.budgetName))
                .click('@okButton')
                .waitForElementNotPresent('@okButton')
    }
};

module.exports = {
    commands: [commands],
    url: function() {
        return this.globals.baseUrl;
    },
    props: {
        budgetType: {
            Increase: {
                budget: 'Increase',
                budgetName: 'Increase',
                pillSelector: '@increasePill',
                panel: '@budgetIncreasePanel',
                budgetPanelText: '@budgetIncreasePanelText',
                budgetPanelAssociatedFieldsText: '@budgetIncreasePanelAssociatedFieldsText'
            },
            Bonus: {
                budget: 'Bonus',
                budgetName: 'Bonus',
                pillSelector: '@bonusPill',
                panel: '@budgetBonusPanel',
                budgetPanelText: '@budgetBonusPanelText',
                budgetPanelAssociatedFieldsText: '@budgetBonusPanelAssociatedFieldsText'            
            },
            Promo: {
                budget: 'Promo',
                budgetName: 'Promo',
                pillSelector: '@promotionPill',
                panel: '@budgetPromotionPanel',
                budgetPanelText: '@budgetPromotionPanelText',
                budgetPanelAssociatedFieldsText: '@budgetPromotionPanelAssociatedFieldsText'            
            },
            LumpSum: {
                budget: 'Lump Sum',
                budgetName: 'Lump Sum',
                pillSelector: '@lumpSumPill',
                panel: '@budgetLumpSumPanel',
                budgetPanelText: '@budgetLumpSumPanelText',
                budgetPanelAssociatedFieldsText: '@budgetLumpSumPanelAssociatedFieldsText'
            },
            Stock: {
                budget: 'Stock',
                budgetName: 'Stock',
                pillSelector: '@stockPill',
                panel: '@budgetStockPanel',
                budgetPanelText: '@budgetStockPanelText',
                budgetPanelAssociatedFieldsText: '@budgetStockPanelAssociatedFieldsText'
            },
            MarketAdjustment: {
                budget: 'Market Adjustment',
                budgetName: 'Market Adj',
                pillSelector: '@marketAdjustmentPill',
                panel: '@budgetMarketAdjustmentPanel',
                budgetPanelText: '@budgetMarketAdjustmentPanelText',
                budgetPanelAssociatedFieldsText: '@budgetMarketAdjustmentPanelAssociatedFieldsText'
            },
            VariablePay: {
                budget: 'Variable Pay',
                budgetName: 'Variable Pay',
                pillSelector: '@variablePayPill',
                panel: '@budgetVariablePayPanel',
                budgetPanelText: '@budgetVariablePayPanelText',
                budgetPanelAssociatedFieldsText: '@budgetVariablePayPanelAssociatedFieldsText'
            }
        }
    },
    elements: {
        createNewBudgetButton: {
            selector: '.new-tile'
        },
        createBudgetModal: {
            selector: '.budget-config-modal'
        },
        budgetName: {
            selector: '#budgetName'
        },
        stockPill: {
            selector: '//div[contains(text(), "Stock")]',
            locateStrategy: 'xpath'
        },
        increasePill: {
            selector: '//div[contains(text(), "Increase")]',
            locateStrategy: 'xpath'
        },
        lumpSumPill: {
            selector: '//div[contains(text(), "Lump Sum")]',
            locateStrategy: 'xpath'
        },
        promotionPill: {
            selector: '//div[contains(text(), "Promotion")]',
            locateStrategy: 'xpath'
        },
        bonusPill: {
            selector: '//div[contains(text(), "Bonus")]',
            locateStrategy: 'xpath'
        },
        marketAdjustmentPill: {
            selector: '//div[contains(text(), "Market Adj")]',
            locateStrategy: 'xpath'
        },
        variablePayPill: {
            selector: '//div[contains(text(), "Variable Pay")]',
            locateStrategy: 'xpath'
        },
        createBudgetButton: {
            selector: '//button[contains(text(), "Create Budget")]',
            locateStrategy: 'xpath'
        },
        budgetTitleText: {
            selector: '.budget-stock h2'
        },
        budgetAssociatedFieldsText: {
            selector: '.budget-stock h3'
        },
        listOfBudgets: {
            selector: '.amount-text'
        },
        budgetIncreasePanel: {
            selector: '.budget-increase'
        },
        budgetMarketAdjustmentPanel: {
            selector: '.budget-market'
        },
        budgetVariablePayPanel: {
            selector: '.budget-variable'
        },
        budgetIncreasePanelText: {
            selector: '.budget-increase h2'
        },
        budgetIncreasePanelAssociatedFieldsText: {
            selector: '.budget-increase h3'
        },
        budgetBonusPanel: {
            selector: '.budget-bonus'
        },
        budgetBonusPanelText: {
            selector: '.budget-bonus h2'
        },
        budgetBonusPanelAssociatedFieldsText: {
            selector: '.budget-bonus h3'
        },
        budgetPromotionPanel: {
            selector: '.budget-promotion'
        },
        budgetPromotionPanelText: {
            selector: '.budget-promotion h2'
        },
        budgetPromotionPanelAssociatedFieldsText: {
            selector: '.budget-promotion h3'
        },
        budgetLumpSumPanel: {
            selector: '.budget-lump'
        },
        budgetLumpSumPanelText: {
            selector: '.budget-lump h2'
        },
        budgetLumpSumPanelAssociatedFieldsText: {
            selector: '.budget-lump h3'
        },
        budgetStockPanel: {
            selector: '.budget-stock'
        },
        budgetStockPanelText: {
            selector: '.budget-stock h2'
        },
        budgetStockPanelAssociatedFieldsText: {
            selector: '.budget-stock h3'
        },
        budgetMarketAdjustmentPanelText: {
            selector: '.budget-market h2'
        },
        budgetMarketAdjustmentPanelAssociatedFieldsText: {
            selector: '.budget-market h3'
        },
        budgetVariablePayPanelText: {
            selector: '.budget-variable h2'
        },
        budgetVariablePayPanelAssociatedFieldsText: {
            selector: '.budget-variable h3'
        },
        budgetSettingsButton: {
            selector: '.page-header .icon-cog'
        },
        stockMonetaryValueRadioButton: {
            selector: '#Monetary\\ Value + .pxl-option__icon'
        },
        stockMonetaryValueRadioButtonChecked: {
            selector: '#Monetary\\ Value + .pxl-option__icon .icon-dot-circled'
        },
        stockValue: {
            selector: '#stockValueInput'
        },
        allowManagerToOverBudgetCheckbox: {
            selector: '#allowManagerToOverBudgetCheckbox + .pxl-option__icon'
        },
        allowManagerToOverBudgetCheckboxChecked: {
            selector: '#allowManagerToOverBudgetCheckbox + .pxl-option__icon .icon-square'
        },
        saveChangesButton: {
            selector: '//button[contains(text(), "Save Changes")]',
            locateStrategy: 'xpath'
        },
        deleteBudgetButton: {
            selector: '//a[contains(text(), " Delete This Budget")]',
            locateStrategy: 'xpath'
        },
        okButton: {
            selector: '.confirmation-modal__confirm-button'
        },
        modalBody: {
            selector: '.confirmation-modal__body > div'
        },
        groupEmployeesByCountryEnable: {
            selector: '//a[contains(text(), "On")]',
            locateStrategy: 'xpath'
        },
        groupEmployeesByCountryDisable: {
            selector: '//a[contains(text(), "Off")]',
            locateStrategy: 'xpath'
        },
        groupEmployeesByCountryEnabled: {
            selector: '.pxl-segmented.pxl-margin-bottom-large.pxl-segmented-secondary a:nth-child(1).active'
        },
        groupEmployeesByCountryDisabled: {
            selector: '.pxl-segmented.pxl-margin-bottom-large.pxl-segmented-secondary a:nth-child(2).active'
        },
        loading: {
            selector: '.status-overlay.fade-container.show'
        }
    }
}