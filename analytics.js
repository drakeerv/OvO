if (window.localStorage) {
    var allowAnalytics = window.localStorage.getItem("allowAnalytics");
    if (null === allowAnalytics && (allowAnalytics = "true"), "true" === allowAnalytics) {
        function gtag() {
            dataLayer.push(arguments)
        }
        window.dataLayer = window.dataLayer || [], gtag("js", new Date);
        gtag("config", "G-ZSPL1SPBYM")
    }
}