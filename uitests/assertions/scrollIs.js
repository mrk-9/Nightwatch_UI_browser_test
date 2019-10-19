exports.assertion = function(targetY) {
    /**
       * Prints out the target we're trying to scroll to. Used in the
       * pass/fail message.
       * @type {string}
       */
    this.message = `Asserting that we can scroll to ${targetY}`
    
    /**
       * The percentage we're trying to scroll to
       * @type {function|*}
       */
    this.expected = targetY;
    
    /**
       * Checks the result of the function. Compares "expected" with the results
       * we get from the function.
       * @type {function}
       */
    this.pass = value => value == this.expected;
    
    /**
       * This takes the callback result and tells us how to interpet into the actual
       * value that we're comparing.
       * @type {function}
       */
    this.value = result => 
        result.value;
    
    /**
       * This command is what's actually executed to compare to what is being passed in. It 
       * needs to execute the getScroll and then make sure it returns the API chain
       * @type {function}
       */
    this.command = (callback) => 
        this.api.execute('return Math.round(document.getElementsByClassName(\'page-container\')[0].scrollTop);',
            [],
            callback);
};