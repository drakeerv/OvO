let allowAnalyticsElement = document.getElementById("allowAnalytics");
let allowAdsElement = document.getElementById("allowAds");

if (window.localStorage) {
    let storage = window.localStorage;
    
    if (!!allowAnalyticsElement) {
        let alreadyAllowedAnalytics = storage.getItem("allowAnalytics");

        if (alreadyAllowedAnalytics === null) {
            storage.setItem("allowAnalytics", true);
            allowAnalyticsElement.checked = true;
        } else {
            allowAnalyticsElement.checked = (alreadyAllowedAnalytics === "true");
        }

        allowAnalyticsElement.addEventListener("change", (event) => {
            storage.setItem("allowAnalytics", event.currentTarget.checked);
        });
    }

    if (!!allowAdsElement) {
        let alreadyAllowedAds = storage.getItem("allowAds");

        if (alreadyAllowedAds === null) {
            storage.setItem("allowAds", true);
            allowAdsElement.checked = true;
        } else {
            allowAdsElement.checked = (alreadyAllowedAds === "true");
        }

        allowAdsElement.addEventListener("change", (event) => {
            storage.setItem("allowAds", event.currentTarget.checked);
        });
    }
}