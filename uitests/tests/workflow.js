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
};

const testWorkflow = browser => {
    browser
        .page.cycleConfiguration()
        .saveWorkflowSettings(browser.globals.userLogin.userEmail)

        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@workflowTab')
        .click('@workflowTab')
        .waitForElementPresent('@workflowExportButton')

        // remove HR admin
        .waitForWorkflowStepPresent(3)
        .removeWorkflowStep(3)
        .waitForWorkflowStepNotPresent(3)
        .waitForElementPresent('@workflowTabSaveButton')
        .waitForElementNotPresent('@workflowExportButton')

        // remove CEO hierarchy
        .waitForWorkflowStepPresent(2)
        .removeWorkflowStep(2)
        .waitForWorkflowStepNotPresent(2)
        .click('@workflowTabSaveButton')
        .waitForElementNotPresent('@workflowTabSaveButton')
        
        // remove direct manager
        .waitForWorkflowStepPresent(1)
        .removeWorkflowStep(1)
        .waitForWorkflowStepNotPresent(1)
        .waitForElementPresent('@workflowTabDisabledSaveButton')
        
        // add direct manager
        .waitForElementPresent('@workflowAddButton')
        .click('@workflowAddButton')
        .selectWorkflowMenuItem('Direct Manager')
        
        // add CEO hierarchy
        .waitForElementPresent('@workflowAddButton')
        .click('@workflowAddButton')
        .selectWorkflowMenuItem('Follow Hierarchy to')
        .selectWorkflowMenuItem('CEO')

        // add HR admin
        .waitForElementPresent('@workflowAddButton')
        .click('@workflowAddButton')
        .selectWorkflowMenuItem('HR Roles')
        .selectWorkflowMenuItem('HR Administrator')

        // save
        .click('@workflowTabSaveButton')
        .waitForElementNotPresent('@workflowTabSaveButton')
        .waitForElementPresent('@workflowExportButton')

        .saveCycleSettings()
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
    }
    'Test workflow': browser => {
        testWorkflow(browser);
    },
    'Cleanup': browser => {
        testCleanup(browser);
    }
};
