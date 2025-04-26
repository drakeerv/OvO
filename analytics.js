if (window.localStorage) {
    const storage = window.localStorage;
    let allowAnalytics = storage.getItem("allowAnalytics");

    if (allowAnalytics === null) {
        allowAnalytics = "true";
        storage.setItem("allowAnalytics", allowAnalytics);
    }

    if (allowAnalytics === "true") {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date);
        gtag("config", "G-ZSPL1SPBYM");
    }
}