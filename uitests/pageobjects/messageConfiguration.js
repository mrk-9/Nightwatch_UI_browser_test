const commands = {};

module.exports = {
    commands: [commands],
    elements: {
        summaryInProgress: {
            selector: '.progress-sum > div:nth-child(2) > span'
        },
        chatIcon: {
            selector: '.employees-container > div > div.col-xs-12.col-md-10 > div > div > div:nth-child(1) > div > div.col-xs-12.col-md-4.col-lg-3 > div.convo-link-tablet > span > button > i',
        },
        conversationTextbox: {
            selector: '.conversation-container textarea'
        },
        conversationHistory: {
            selector: '.messages'
        }
    }
}