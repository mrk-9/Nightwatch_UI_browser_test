
const BrowserMode = Object.freeze({'mobile':1, 'desktop': 2});

module.exports = {
    setup: (browser, browserMode) => {
        if (browserMode == BrowserMode.mobile) 
            browser.resizeWindow(412, 732);
        else
            browser.resizeWindow(1400, 800);
            
    },
    BrowserMode
}