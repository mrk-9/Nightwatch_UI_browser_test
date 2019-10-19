const commands = {};

module.exports = {
    commands: [commands],
    elements: {
        conversationTextbox: {
            selector: '.conversation-container textarea'
        },
        lastMessageText: {
            selector: '.messages li:last-child .message > p'
        },
        conversationHistoryLoading: {
            selector: '.people-chat .icon-animate-spin.icon-spin'
        },
        newMessageLoading: {
            selector: '.message.message-mine.sending .icon-animate-spin.icon-spin'
        },
        lastMessageTime: {
            selector: '.messages li:last-child .sender-name span:last-child'
        },
        perfPayRangeView: {
            selector: '.perf-pay-range > .perf-rating-wrapper'
        },
        tccView: {
            selector: '.employees-container > div > div.col-xs-12.col-md-10 > div > div > div:nth-child(1) > div > div.col-xs-12.col-md-8.col-lg-9 > div.row.flex-row.input-groups > div:nth-child(1) > div > div:nth-child(2) > div > div > span'
        },
        increaseRecommendationView: { 
            selector: '.employees-container > div > div.col-xs-12.col-md-10 > div > div > div:nth-child(1) > div > div.col-xs-12.col-md-8.col-lg-9 > div.row.flex-row.pay-totals > div:nth-child(3) > div'
        },
        closeConversationWindow: {
            selector: '.conversation-close a'
        }
    }
};