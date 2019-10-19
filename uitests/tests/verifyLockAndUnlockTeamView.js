const { setup, BrowserMode} = require('../src/testsetup');

const runTheTest = (browser, browserMode) => {
    setup(browser, browserMode);
    browser.page.sso()
        .initLoginState()
        .url(browser.globals.baseUrl)
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@cycleSettings')
        .click('@cycleSettings')
        .click('@lockTeamViewForManagers')
        
        .saveCycleChanges()

        .api
        .page.tp()
        .click('@logout')

        .api
        .page.sso()
        .login(browser.globals.managerLogin.userEmail, browser.globals.managerLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        .api
        .page.dashboard()
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')
        
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.elementNotPresent('@employeeInputControls')
        .api
        .page.tp()
        .click('@logout')

        .api
        .page.sso()
        .login(browser.globals.userLogin.userEmail, browser.globals.userLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        .waitForElementVisible('@settings')
        .click('@settings')
        .waitForElementVisible('@cycleConfig')
        .click('@cycleConfig')
        .api
        .page.cycleConfiguration()
        .waitForElementVisible('@cycleSettings')
        .click('@cycleSettings')
        .click('@unlockTeamViewForManagers')
        
        .saveCycleChanges()

        .api
        .page.tp()
        .click('@logout')

        .api
        .page.sso()
        .login(browser.globals.managerLogin.userEmail, browser.globals.managerLogin.userPassword)
        .waitForElementNotPresent('@emailInput')
        .api
        .page.tp()
        .waitForElementNotPresent('@splashLoading')

        .api
        .page.dashboard()
        .waitForElementVisible('@summaryInProgress')
        .click('@summaryInProgress')
        
        .api
        .page.managerDecisionView()
        .waitForElementVisible('@chatIcon')
        .assert.elementPresent('@employeeInputControls')

        .api
        .end();
};

module.exports = {
    'Verify Lock and Unlock Team View' : function (browser) {
        runTheTest(browser, BrowserMode.desktop);
    }
};