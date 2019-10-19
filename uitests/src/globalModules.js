module.exports = {
    // this controls whether to abort the test execution when an assertion failed and skip the rest
    // it's being used in waitFor commands and expect assertions
    abortOnAssertionFailure : true,
  
    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout : 30000,
  
    // this will cause waitFor commands on elements to throw an error if multiple
    // elements are found using the given locate strategy and selector
    throwOnMultipleElementsReturned : true,
};