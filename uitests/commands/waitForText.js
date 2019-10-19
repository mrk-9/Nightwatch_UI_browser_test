//WE're using this package because it allows us to make an ES6 class and not have to generate a 
//bunch of garbage filler
const nightwatchify = require('nightwatchify');

class WaitForCount {
    constructor() {
        this.timeoutRetryInMilliseconds = 100;
        this.defaultTimeoutInMilliseconds = 5000;
        this.locateStrategy = 'css';
        this.startTimeInMilliseconds = null;
    }

    restoreLocateStrategy() {
        if (this.locateStrategy === 'xpath') {
            this.api.useXpath();
        }
        if (this.locateStrategy === 'css') {
            return this.api.useCss();
        }
    }

    //Because of of the magic in nightwatchify, "this" is actually bound to the browser control 
    //object. this.cmd refers to the instance of the class. Yay javascript.
    command(elementSelector, expectedText, timeoutInMilliseconds, defaultMessage) {
        
        //Save the origian locate strategy, because if this command is used with
        //page objects, the "checker" function of this command is wrapped with another
        //function which resets the locate strategy after the function is called,
        //but since the function is called many times, from the second one the locateStrategy
        //is wrong
        this.cmd.locateStrategy = this.client.locateStrategy;

        this.cmd.startTimeInMilliseconds = Date.now();

        if (typeof timeoutInMilliseconds !== 'number') {
            timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
        }
        if (typeof timeoutInMilliseconds !== 'number') {
            timeoutInMilliseconds = this.cmd.defaultTimeoutInMilliseconds;
        }
        if (defaultMessage && typeof defaultMessage !== 'string') {
            this.emit('error', 'defaultMessage is not a string');
            return;
        }

        // After making sure the parameters are valid, call the check function on a timeout.
        this.cmd.check(this, elementSelector, expectedText, (result, loadedTimeInMilliseconds) => {
            let message = '';
            if (defaultMessage) {
                message = defaultMessage;
            } else if (result == expectedText) {
                message = `waitForCount: ${elementSelector} expected '${expectedText}'. Expression was true after ${loadedTimeInMilliseconds - this.cmd.startTimeInMilliseconds} ms.`;
            } else {
                message = `waitForCount: ${elementSelector} expected '${expectedText}'. Found '${result}' after ${timeoutInMilliseconds} ms.`;
            }

            this.client.assertion(result == expectedText, 'expression false', 'expression true', message, true);
            //The emit is inserted by nightwatchify - it makes this class inherit from EventEmitter so that we
            //can let the test engine know we're all done.
            return this.emit('complete');
        }, timeoutInMilliseconds);

        return this;
    }

    check(client, elementSelector, expectedText, callback, maxTimeInMilliseconds) {
        //Restore the origian locate strategy
        this.restoreLocateStrategy();

        return client.api.getText(elementSelector, function (result) {
            var now = Date.now();
            if (result.status === 0 && expectedText == result.value) {
                return callback(result.value, now);
            } else if (now - client.cmd.startTimeInMilliseconds < maxTimeInMilliseconds) {
                return setTimeout(function () {
                    return client.cmd.check(client, elementSelector, expectedText, callback, maxTimeInMilliseconds);
                }, this.timeoutRetryInMilliseconds);
            } else {
                return callback(result.value);
            }
        });
    }

}

const waitForCount = nightwatchify.Command(WaitForCount);
exports.default = waitForCount;
module.exports = waitForCount