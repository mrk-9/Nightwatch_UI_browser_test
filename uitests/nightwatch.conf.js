var parseArgs = require('minimist');

// This is a global called when the tests start. This parses the commands looking 
// for a --browser flag. Valid options right now are "chrome", "firefox", "MicrosoftEdge"

module.exports = (function(settings) {
    var args = parseArgs(process.argv);
    settings.test_settings.default.desiredCapabilities.browserName = args['browser'] || 'chrome';
    console.log(settings.test_settings.default.desiredCapabilities.browserName);
    return settings;
})(require('./nightwatch.json'));