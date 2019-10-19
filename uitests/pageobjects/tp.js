const commands = {};

module.exports = {
    commands: [commands],
    url: function() {
        return this.globals.baseUrl;
    },
    elements: {
        // Global stuff
        splashLoading: {
            selector: '#loadingContent'
        },

        // Header
        settings: {
            selector: '.header-nav-bar #settingDropdown'
        },
        cycleConfig: {
            selector: '.cycle-configuration-settings'
        },
        notificationButton: {
            selector: '.notification-count'
        },
        notificationModal: {
            selector: '.notification-view'
        },
        overviewButton: {
            selector: "//a[text()='Overview']",
            locateStrategy: 'xpath'
        },

        // Menu
        openMenuButton: {
            selector: '.navbar-toggler'
        },

        logout: {
            selector: '//a[text()="Logout"]',
            locateStrategy: 'xpath'
        }
    }
}