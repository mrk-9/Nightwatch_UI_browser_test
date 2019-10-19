const emailInput = '//input[@id="email"]';

const commands = {

    login: function (userEmail, userPassword) {
        return this
            .waitForElementVisible('@emailInput')
            .clearValue('@emailInput')
            .setValue('@emailInput', userEmail)
            .setValue('@passwordInput', userPassword)
            .click('@loginButton');
    },
    initLoginState: function() {
        return this.api
            .url(this.api.globals.baseUrl)
            .clearLocalStorage();
    }
};

module.exports = {
    commands: [commands],
    url: function() {
        return this.api.launchUrl;
    },
    elements: {

        //Login section
        emailInput: {
            selector: emailInput,
            locateStrategy: 'xpath'
        },
        passwordInput: {
            selector: '//input[@id="password"]',
            locateStrategy: 'xpath'
        },
        loginButton: {
            selector: 'input.login-button'
        }
    }
};