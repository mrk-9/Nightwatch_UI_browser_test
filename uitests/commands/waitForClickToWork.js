//WE're using this package because it allows us to make an ES6 class and not have to generate a 
//bunch of garbage filler
const nightwatchify = require('nightwatchify');

class WaitForClickToWork {
    constructor() {
        this.timeoutRetryInMilliseconds = 100;
        this.defaultTimeoutInMilliseconds = 5000;
        this.locateStrategy = 'css';
        this.startTimeInMilliseconds = null;
        this.atLeastOneClick = false;
    }
    
    restoreLocateStrategy() {
        /*if (this.locateStrategy === 'xpath') {
            this.api.useXpath();
        }
        if (this.locateStrategy === 'css') {
            return this.api.useCss();
        }*/
    }

    //Because of of the magic in nightwatchify, "this" is actually bound to the browser control 
    //object. this.cmd refers to the instance of the class. Yay javascript.
    command(elementToClick, elementToWaitFor, timeoutInMilliseconds, defaultMessage) {

        //Save the original locate strategy, because if this command is used with
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
        this.cmd.check(this, elementToClick, elementToWaitFor, (result, loadedTimeInMilliseconds) => {
            let message = '';
            if (defaultMessage) {
                message = defaultMessage;
            } else if (result) {
                message = `waitForElement: ${elementToClick} expected '${elementToWaitFor}'. Expression was true after ${loadedTimeInMilliseconds - this.cmd.startTimeInMilliseconds} ms.`;
            } else {
                message = `waitForElement: ${elementToClick} expected '${elementToWaitFor}'. Found '${result}' after ${timeoutInMilliseconds} ms.`;
            }

            this.client.assertion(result, 'expression false', 'expression true', message, true);
            //The emit is inserted by nightwatchify - it makes this class inherit from EventEmitter so that we
            //can let the test engine know we're all done.
            return this.emit('complete');
        }, timeoutInMilliseconds);

        return this;
    }

    check(client, elementToClick, elementToWaitFor, callback, maxTimeInMilliseconds) {
        var locateStrategy = this.locateStrategy;
        this.restoreLocateStrategy();
        
        return client.api.elements(locateStrategy, elementToClick, function (result) {
            let now = Date.now();
            if (result.value.length > 0) {
                client.api.click(elementToClick);
                client.cmd.atLeastOneClick = true;
            } else if(!client.cmd.atLeastOneClick) {
                if (now - client.cmd.startTimeInMilliseconds < maxTimeInMilliseconds) {
                    return setTimeout(function () {
                        return client.cmd.check(client, elementToClick, elementToWaitFor, callback, maxTimeInMilliseconds);
                    }, this.timeoutRetryInMilliseconds);
                }
                else {
                    return callback(false);
                }
            }
            if (client.cmd.atLeastOneClick) {
                return client.api.elements(locateStrategy, elementToWaitFor, function (result) {
                    if (result.value.length > 0) {
                        return callback(true, now);
                    } else if (now - client.cmd.startTimeInMilliseconds < maxTimeInMilliseconds) {
                        return setTimeout(function () {
                            return client.cmd.check(client, elementToClick, elementToWaitFor, callback, maxTimeInMilliseconds);
                        }, this.timeoutRetryInMilliseconds);
                    } else {
                        return callback(false);
                    }
                });
            }
            return client.cmd.check(client, elementToClick, elementToWaitFor, callback, maxTimeInMilliseconds);
        })
            
    }
}

const waitForClickToWork = nightwatchify.Command(WaitForClickToWork);
exports.default = waitForClickToWork;
module.exports = waitForClickToWork