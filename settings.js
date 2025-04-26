const allowAnalyticsElement = document.getElementById("allowAnalytics");
/* allowAdsElement removed as it's not in the HTML */

if (window.localStorage && allowAnalyticsElement) {
    const storage = window.localStorage;
    let alreadyAllowedAnalytics = storage.getItem("allowAnalytics");

    if (alreadyAllowedAnalytics === null) {
        storage.setItem("allowAnalytics", "true");
        allowAnalyticsElement.checked = true;
    } else {
        allowAnalyticsElement.checked = (alreadyAllowedAnalytics === "true");
    }

    allowAnalyticsElement.addEventListener("change", (event) => {
        storage.setItem("allowAnalytics", event.currentTarget.checked.toString());
    });
}