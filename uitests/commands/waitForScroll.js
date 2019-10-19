//WE're using this package because it allows us to make an ES6 class and not have to generate a 
//bunch of garbage filler
const nightwatchify = require('nightwatchify');

class WaitForScroll {
    constructor() {
        this.timeoutRetryInMilliseconds = 100;
        this.defaultTimeoutInMilliseconds = 5000;
        this.startTimeInMilliseconds = null;
    }

    //Because of of the magic in nightwatchify, "this" is actually bound to the browser control 
    //object. this.cmd refers to the instance of the class. Yay javascript.
    command(expectedScrollPosition, timeoutInMilliseconds, defaultMessage) {
        
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
        this.cmd.check(this, expectedScrollPosition, (result, loadedTimeInMilliseconds) => {
            let message = '';
            if (defaultMessage) {
                message = defaultMessage;
            } else if (result == expectedScrollPosition) {
                message = `waitForScroll: expected ${expectedScrollPosition}. Expression was true after ${loadedTimeInMilliseconds - this.cmd.startTimeInMilliseconds} ms.`;
            } else {
                message = `waitForScroll: expected ${expectedScrollPosition}. Found ${result} after ${timeoutInMilliseconds} ms.`;
            }

            this.client.assertion(result == expectedScrollPosition, 'expression false', 'expression true', message, true);
            //The emit is inserted by nightwatchify - it makes this class inherit from EventEmitter so that we
            //can let the test engine know we're all done.
            return this.emit('complete');
        }, timeoutInMilliseconds);

        return this;
    }

    check(client, expectedScrollPosition, callback, maxTimeInMilliseconds) {
        return client.api.execute('return Math.round(document.getElementsByClassName(\'page-container\')[0].scrollTop);', [], result => {
            let scrollPosition = result.value;
            var now = Date.now();
            if (expectedScrollPosition == scrollPosition) {
                return callback(scrollPosition, now);
            } else if (now - this.startTimeInMilliseconds < maxTimeInMilliseconds) {
                return setTimeout(function () {
                    return client.cmd.check(client, expectedScrollPosition, callback, maxTimeInMilliseconds);
                }, this.timeoutRetryInMilliseconds);
            } else {
                return callback(scrollPosition);
            }
        });
        
    }

}

const waitForScroll = nightwatchify.Command(WaitForScroll);
exports.default = waitForScroll;
module.exports = waitForScroll