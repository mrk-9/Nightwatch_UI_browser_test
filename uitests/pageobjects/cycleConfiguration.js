const { format } = require('date-fns');

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const payEffectiveDate = format(new Date(year, month, day+14), 'MM/DD/YYYY');
const endDate = format(new Date(year, month, day+7), 'MM/DD/YYYY');
const cycleChangesSavedText = 'Cycle changes saved';
const closeCycleText = 'Close Cycle';

const commands = {
    createCycle: function() {
        return this
                .api
                .page.tp()
                .waitForElementVisible('@settings')
                .click('@settings')
                .waitForElementVisible('@cycleConfig')
                .click('@cycleConfig')
                .api
                .page.cycleConfiguration()

                .waitForElementVisible('@newCycle')
                .click('@newCycle')
                .waitForElementVisible('@createCycleModal')
                .waitForElementVisible('@payEffectiveDate')
                .setValue('@endDate', endDate)
                .setValue('@payEffectiveDate', payEffectiveDate)
                .click('@createCycleButton')
                .waitForElementVisible('@currentCycle')
    },
    saveWorkflowSettings: function(hrAdminEmail) {
        return this
                .waitForElementVisible('@workflowSettings')
                .click('@workflowSettings')
                .waitForElementVisible('@addHrAdminButton')
                .click('@addHrAdminButton')
                .waitForElementVisible('@hrAdminSearchBox')
                .setValue('@hrAdminSearchBox', hrAdminEmail)
                .waitForElementVisible('@mailSuggestionWindow')
                .click('@mailSuggestionWindow')
                .click('@hrAdminSaveButton')
    },
    waitForWorkflowStepPresent: function(stepNumber) {
        return this
                .waitForElementPresent(`.rules > div:nth-child(${stepNumber}) > div > button`)
    },
    removeWorkflowStep: function(stepNumber) {
        return this
                .click(`.rules > div:nth-child(${stepNumber}) > div > button`)
    },
    waitForWorkflowStepNotPresent: function(stepNumber) {
        return this
                .waitForElementNotPresent(`.rules > div:nth-child(${stepNumber}) > div > button`)
    },
    selectWorkflowMenuItem: function(menuText) {
        return this
                .useXpath()
                .waitForElementPresent(`//button[text()='${menuText}']`)
                .click(`//button[text()='${menuText}']`)
                .useCss()
    },
    saveCycleSettings: function() {
        return this
                .api
                .page.cycleConfiguration()
                .waitForElementVisible('@cycleSettings')
                .click('@cycleSettings')
                .waitForElementVisible('@openCycleButton')
                .click('@openCycleButton')
                .waitForElementVisible('@okButton')
                .click('@okButton')
                .waitForElementVisible('@cycleAlertView')
                .assert.containsText('@cycleAlertText', cycleChangesSavedText)
                .waitForElementVisible('@closeCycleButton')
                .assert.containsText('@closeCycleButton', closeCycleText)
    },
    closeCycle: function() {
        return this
                .api
                .page.tp()
                .waitForElementVisible('@settings')
                .click('@settings')
                .waitForElementVisible('@cycleConfig')
                .click('@cycleConfig')
                .api
                .page.cycleConfiguration()
                .waitForElementVisible('@cycleSettings')
                .click('@cycleSettings')
                .waitForElementVisible('@closeCycleButton')
                .click('@closeCycleButton')
                .waitForElementVisible('@okButton')
                .click('@okButton')
                .waitForElementVisible('.cycle-closing-message')
    },
    saveCycleChanges: function() {
        return this
                .assert.hidden('@cycleAlertView')
                .click('@cycleSaveChangesButton')
                .waitForElementVisible('@cycleAlertView')
                .assert.containsText('@cycleAlertText', cycleChangesSavedText)
    }
};

module.exports = {
    commands: [commands],
    url: function() {
        return this.globals.baseUrl + '/configuration/cycle';
    },
    elements: {
        newCycle: {
            selector: '.new-cycle-button'
        },
        createCycleModal: {
            selector: '.create-cycle-dialog-content'
        },
        payEffectiveDate: {
            selector: '#payEffectiveDate'
        },
        endDate: {
            selector: '#endDate'
        },
        createCycleButton: {
            selector: '.create-cycle-button'
        },
        currentCycle: {
            selector: 'li.selected-cycle'
        },
        budgetsSettings: {
            selector: '.selected-cycle .selected-cycle__budget-settings '
        },
        workflowSettings: {
            selector: '.selected-cycle .selected-cycle__workflow-settings'

        },
        cycleSettings: {
            selector: '.selected-cycle .selected-cycle__cycle-settings '
        },
        deleteCycle: {
            selector: '.delete-cycle'
        },
        okButton: {
            selector: '.confirmation-modal__confirm-button'
        },
        cycleSaveChangesButton: {
            selector: '.cycle-config-view__save-changes'
        },
        cycleAlertView: {
            selector: '.alert'
        },
        cycleAlertText: {
            selector: '.alert span:last-child'
        },
        showTccCheckbox: {
            selector: '#show-tcc-checkbox + .pxl-option__icon'
        },
        tccCheckboxUnchecked: {
            selector: '#show-tcc-checkbox + .pxl-option__icon .icon-check-empty'
        },
        showPerformanceRatingCheckbox: {
            selector: '#show-performance-rating-checkbox + .pxl-option__icon'
        },
        performanceRatingCheckboxUnchecked: {
            selector: '#show-performance-rating-checkbox + .pxl-option__icon .icon-check-empty'
        },
        showIncreaseRecommendationCheckbox: {
            selector: '#show-increase-recommendation-checkbox + .pxl-option__icon'
        },
        increaseRecommendationCheckboxUnchecked: {
            selector: '#show-increase-recommendation-checkbox + .pxl-option__icon .icon-check-empty'
        },
        showInternalPayRangeCheckbox: {
            selector: '#show-internal-pay-range-checkbox + .pxl-option__icon'
        },
        internalPayRangeCheckboxUnchecked: {
            selector: '#show-internal-pay-range-checkbox + .pxl-option__icon .icon-check-empty'
        },
        rangePenetrationRadioButton: {
            selector: '#Range\\ Penetration + .pxl-option__icon'
        },
        rangePenetrationRadioButtonSelected: {
            selector: '#Range\\ Penetration + .pxl-option__icon .icon-dot-circled'
        },
        compaRatioRadioButton: {
            selector: '#Compa\\ -\\ Ratio + .pxl-option__icon'
        },
        compaRatioRadioButtonSelected: {
            selector: '#Compa\\ -\\ Ratio + .pxl-option__icon .icon-dot-circled'
        },
        compaRatioShowAsHundredRadioButton: {
            selector: '#compa-ratio-options > div:nth-child(1) .pxl-option__icon'
        },
        compaRatioShowAsHundredRadioButtonSelected: {
            selector: '#compa-ratio-options > div:nth-child(1) .pxl-option__icon .icon-dot-circled'
        },
        compaRatioShowAsOneRadioButton: {
            selector: '#compa-ratio-options > div:nth-child(2) .pxl-option__icon'
        },
        compaRatioShowAsOneRadioButtonSelected: {
            selector: '#compa-ratio-options > div:nth-child(2) .pxl-option__icon .icon-dot-circled'
        },
        displayFieldsInCompSummaryCheckbox: {
            selector: '#compFieldsCheckbox + .pxl-option__icon'
        },
        displayFieldsInCompSummaryCheckboxUnchecked: {
            selector: '#compFieldsCheckbox + .pxl-option__icon .icon-check-empty'
        },
        lockTeamViewForManagers: {
            selector: "//a[text()='On']",
            locateStrategy: 'xpath'
        },
        unlockTeamViewForManagers: {
            selector: "//a[text()='Off']",
            locateStrategy: 'xpath'
        },
        addHrAdminButton: {
            selector: '//section[@class="workflow-hr-roles__administrator"]//a[text()="+ Assign User"]',
            locateStrategy: 'xpath'
        },
        hrAdminSearchBox: {
            selector: '.workflow-hr-roles__administrator input'
        },
        hrAdminSaveButton: {
            selector: '//section[@class="workflow-hr-roles__administrator"]//button[text()="Save"]',
            locateStrategy: 'xpath'
        },
        openCycleButton: {
            selector: '.cycle-button-container button'
        },
        closeCycleButton:{
            selector: '.close-cycle-button'
        },
        mailSuggestionWindow: {
            selector: '.react-autosuggest__suggestions-container--open'
        },
        workflowTab: {
            selector: '//a[text()="Workflow"]',
            locateStrategy: 'xpath'
        },
        workflowExportButton: {
            selector: '.workflow-rules__export-btn'
        },
        workflowTabSaveButton: {
            selector: '.workflow-rules__save-btn'
        },
        workflowTabDisabledSaveButton: {
            selector: '.workflow-rules__save-btn.pxl-btn--disabled'
        },
        workflowAddButton: {
            selector: '.workflow-menu__toggle-menu-btn'
        }
    }
};