const currentPayIncreaseValue = '1';

const commands = {
    moveEmployeeToInProgress: function() {
        return this
                .api
                .page.tp()
                .click('@overviewButton')
                .api
                .page.dashboard()
                .waitForElementNotPresent('@summaryOpenValueZero')
                .waitForElementVisible('@summaryOpen')
                .click('@summaryOpen')
                .api
                .page.managerDecisionView()
                .waitForElementVisible('@chatIcon')
                .clearValue('@increaseCurrentPayTextbox')
                .setValue('@increaseCurrentPayTextbox', currentPayIncreaseValue)
                .pause(5000) // TEAMEXT-29 Remove pause() which only exists for waiting for processing
                .click('@nextTeam')
                
                .api
                .page.managerDecisionView()
                .waitForElementNotPresent('@chatIcon')
                .waitForElementVisible('@chatIcon')
                .clearValue('@increaseCurrentPayTextbox')
                .setValue('@increaseCurrentPayTextbox', currentPayIncreaseValue)
                .pause(5000) // TEAMEXT-29 Remove pause() which only exists for waiting for processing

                .api
                .page.tp()
                .click('@overviewButton')
    }
};

module.exports = {
    commands: [commands],
    elements: {
        summaryOpenValueZero: {
            selector: '.progress-sum__open.num-zero'
        },
        summaryOpen: {
            selector: '.progress-sum__open'
        },  
        summaryInProgressValueZero: {
            selector: '.progress-sum__in-progress.num-zero'
        },
        summaryInProgress: {
            selector: '.progress-sum__in-progress'
        },
        summaryPendingReviewValueZero: {
            selector: '.progress-sum__pending-review.num-zero'
        },
        summaryPendingReview: {
            selector: '.progress-sum__pending-review'
        }
    }
};